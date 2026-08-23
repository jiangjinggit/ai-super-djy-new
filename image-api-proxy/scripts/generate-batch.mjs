#!/usr/bin/env node
import { access, appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const GENERATOR_PATH = resolve(SCRIPT_DIRECTORY, "generate.mjs");
const DEFAULT_CONCURRENCY = 3;
const MAX_CONCURRENCY = 8;
const MAX_CAPTURE_CHARS = 32_000;

function usage() {
  return `Usage: node generate-batch.mjs --input <jobs.jsonl> [options]

Options:
  --concurrency <1-8>  Parallel workers; defaults to 3
  --output-dir <path>  Default output directory for jobs without out
  --results <path>     Durable JSONL result log`;
}

function parseOptions(argv) {
  const options = { concurrency: DEFAULT_CONCURRENCY };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (!["--input", "--concurrency", "--output-dir", "--results"].includes(argument)) {
      throw new Error(`Unknown option: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${argument}`);
    const key = argument.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    options[key] = value;
    index += 1;
  }
  if (!options.input) throw new Error("--input is required");
  options.concurrency = Number(options.concurrency);
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > MAX_CONCURRENCY) {
    throw new Error(`--concurrency must be an integer from 1 to ${MAX_CONCURRENCY}`);
  }
  return options;
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function safeId(value, index) {
  const normalized = String(value ?? "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return normalized || `job-${String(index + 1).padStart(3, "0")}`;
}

function parseJobs(text) {
  const jobs = [];
  for (const [lineIndex, originalLine] of text.split(/\r?\n/).entries()) {
    const line = originalLine.trim();
    if (!line || line.startsWith("#")) continue;
    let job;
    try {
      job = JSON.parse(line);
    } catch (error) {
      throw new Error(`Invalid JSON on line ${lineIndex + 1}: ${error.message}`);
    }
    if (!job || typeof job !== "object" || Array.isArray(job)) {
      throw new Error(`Line ${lineIndex + 1} must be a JSON object`);
    }
    if (typeof job.prompt !== "string" || !job.prompt.trim()) {
      throw new Error(`Line ${lineIndex + 1} requires a non-empty prompt`);
    }
    if (job.references !== undefined && (!Array.isArray(job.references) || job.references.some((item) => typeof item !== "string"))) {
      throw new Error(`Line ${lineIndex + 1} references must be an array of paths`);
    }
    jobs.push({ ...job, sourceLine: lineIndex + 1 });
  }
  if (!jobs.length) throw new Error("The batch file contains no jobs");
  return jobs;
}

function appendLimited(current, chunk) {
  const combined = current + chunk.toString("utf8");
  return combined.length > MAX_CAPTURE_CHARS ? combined.slice(-MAX_CAPTURE_CHARS) : combined;
}

function lastMessage(stdout, stderr) {
  const lines = `${stderr}\n${stdout}`.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return lines.at(-1) ?? "No child-process output";
}

function runChild(job, output) {
  const args = [GENERATOR_PATH, "--prompt", job.prompt, "--out", output];
  if (job.size) args.push("--size", String(job.size));
  if (job.quality) args.push("--quality", String(job.quality));
  if (job.model) args.push("--model", String(job.model));
  for (const reference of job.references ?? []) {
    args.push("--reference", resolve(process.cwd(), reference));
  }

  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout = appendLimited(stdout, chunk); });
    child.stderr.on("data", (chunk) => { stderr = appendLimited(stderr, chunk); });
    child.on("error", (error) => {
      resolvePromise({ code: null, stdout, stderr: `${stderr}\n${error.message}` });
    });
    child.on("close", (code) => resolvePromise({ code, stdout, stderr }));
  });
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const inputPath = resolve(process.cwd(), options.input);
  const jobs = parseJobs(await readFile(inputPath, "utf8"));
  const runStamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDirectory = resolve(process.cwd(), options.outputDir ?? `output/imagegen/batch-${runStamp}`);
  const resultsPath = resolve(process.cwd(), options.results ?? resolve(outputDirectory, "results.jsonl"));
  const plannedJobs = jobs.map((job, index) => {
    const id = safeId(job.id, index);
    const output = resolve(process.cwd(), job.out ?? resolve(outputDirectory, `${String(index + 1).padStart(3, "0")}-${id}.png`));
    return { ...job, id, output };
  });

  if (extname(inputPath).toLowerCase() !== ".jsonl") throw new Error("--input must be a .jsonl file");
  if (await exists(resultsPath)) throw new Error(`Refusing to overwrite existing results file: ${resultsPath}`);
  const seenOutputs = new Set();
  for (const job of plannedJobs) {
    if (seenOutputs.has(job.output)) throw new Error(`Duplicate batch output path: ${job.output}`);
    seenOutputs.add(job.output);
    if (await exists(job.output)) throw new Error(`Refusing to overwrite existing output: ${job.output}`);
  }
  await mkdir(outputDirectory, { recursive: true });
  await mkdir(dirname(resultsPath), { recursive: true });
  await writeFile(resultsPath, `${JSON.stringify({
    type: "batch-start",
    startedAt: new Date().toISOString(),
    input: inputPath,
    concurrency: Math.min(options.concurrency, jobs.length),
    total: plannedJobs.length,
  })}\n`, { flag: "wx" });

  let writeQueue = Promise.resolve();
  const record = (value) => {
    writeQueue = writeQueue.then(() => appendFile(resultsPath, `${JSON.stringify(value)}\n`));
    return writeQueue;
  };
  let nextIndex = 0;
  let completed = 0;
  let failed = 0;

  async function worker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= plannedJobs.length) return;
      const job = plannedJobs[index];
      const { id, output } = job;
      const startedAt = new Date();
      console.log(`[${index + 1}/${plannedJobs.length}] started ${id}`);
      const childResult = await runChild(job, output);
      const outputExists = await exists(output);
      const ok = childResult.code === 0 && outputExists;
      const finishedAt = new Date();
      completed += 1;
      if (!ok) failed += 1;
      await record({
        type: "job-result",
        index,
        sourceLine: job.sourceLine,
        id,
        ok,
        output,
        exitCode: childResult.code,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        message: lastMessage(childResult.stdout, childResult.stderr),
      });
      console.log(`[${index + 1}/${plannedJobs.length}] ${ok ? "completed" : "failed"} ${id}`);
    }
  }

  const workerCount = Math.min(options.concurrency, plannedJobs.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  await writeQueue;
  await record({
    type: "batch-summary",
    finishedAt: new Date().toISOString(),
    total: plannedJobs.length,
    completed,
    succeeded: completed - failed,
    failed,
    results: resultsPath,
  });
  await writeQueue;
  console.log(`Batch complete: ${completed - failed} succeeded, ${failed} failed`);
  console.log(`Results: ${resultsPath}`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
