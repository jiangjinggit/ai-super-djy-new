#!/usr/bin/env node
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { basename, dirname, extname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const SKILL_DIRECTORY = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REQUEST_TIMEOUT_MS = 120_000;
const REFERENCE_MIME_TYPES = new Map([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
]);

function usage() {
  return `Usage: node generate.mjs --prompt <text> [options]

Options:
  --out <path>        PNG destination; refuses to overwrite
  --size <WxH>        Defaults to 1024x1024
  --quality <value>   Defaults to auto
  --model <name>      Overrides OPENAI_IMAGE_MODEL
  --reference <path>  Local PNG, JPEG, or WebP; repeat for more references`;
}

function parseOptions(argv) {
  const options = { size: "1024x1024", quality: "auto" };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (!["--prompt", "--out", "--size", "--quality", "--model", "--reference"].includes(argument)) {
      throw new Error(`Unknown option: ${argument}`);
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${argument}`);
    if (argument === "--reference") {
      options.references ??= [];
      options.references.push(value);
    } else {
      options[argument.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value;
    }
    index += 1;
  }
  if (!options.prompt?.trim()) throw new Error("--prompt is required");
  if (!/^\d+x\d+$/i.test(options.size)) throw new Error("--size must use WIDTHxHEIGHT, for example 1024x1024");
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

function parseDotenv(text) {
  const result = {};
  for (const originalLine of text.split(/\r?\n/)) {
    const line = originalLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, name, rawValue] = match;
    let value = rawValue.trim();
    const quote = value[0];
    if ((quote === "\"" || quote === "'") && value.endsWith(quote)) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    result[name] = value;
  }
  return result;
}

function redact(text, secret) {
  return String(text ?? "").replaceAll(secret, "[REDACTED]");
}

function isPng(bytes) {
  return bytes.length >= PNG_SIGNATURE.length && bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE);
}

async function imageBytes(image) {
  if (typeof image?.b64_json === "string") return Buffer.from(image.b64_json, "base64");
  if (typeof image?.url === "string") {
    const response = await fetch(image.url);
    if (!response.ok) throw new Error(`Image download failed with HTTP ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }
  throw new Error("The API response did not contain b64_json or url image data");
}

async function createRequestBody({ model, prompt, size, quality, references }) {
  if (!references?.length) {
    return {
      endpoint: "/images/generations",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, size, quality, output_format: "png" }),
      mode: "generation",
    };
  }

  const form = new FormData();
  form.append("model", model);
  form.append("prompt", prompt);
  form.append("size", size);
  form.append("quality", quality);
  form.append("output_format", "png");
  for (const suppliedPath of references) {
    const path = resolve(process.cwd(), suppliedPath);
    const mimeType = REFERENCE_MIME_TYPES.get(extname(path).toLowerCase());
    if (!mimeType) throw new Error(`Unsupported reference image format: ${suppliedPath}. Use PNG, JPEG, or WebP.`);
    const details = await stat(path);
    if (!details.isFile() || details.size === 0) throw new Error(`Invalid reference image: ${suppliedPath}`);
    const bytes = await readFile(path);
    form.append("image[]", new Blob([bytes], { type: mimeType }), basename(path));
  }
  return {
    endpoint: "/images/edits",
    headers: {},
    body: form,
    mode: "reference-guided edit",
  };
}

function defaultOutputPath() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return resolve(process.cwd(), "output", "imagegen", `proxy-image-${timestamp}.png`);
}

async function main() {
  const options = parseOptions(process.argv.slice(2));
  const envPath = resolve(SKILL_DIRECTORY, ".env");
  if (!(await exists(envPath))) throw new Error("The global image-api-proxy .env file is missing");
  const env = parseDotenv(await readFile(envPath, "utf8"));
  const key = env.OPENAI_API_KEY;
  const baseUrl = env.OPENAI_BASE_URL?.replace(/^['\"]+|['\"]+$/g, "").replace(/\/+$/, "");
  const model = options.model ?? env.OPENAI_IMAGE_MODEL ?? "gpt-image-2";

  if (!key || key.includes("在这里填入")) throw new Error("OPENAI_API_KEY is missing from .env");
  if (!baseUrl || baseUrl.includes("在这里填入")) throw new Error("OPENAI_BASE_URL is missing from .env");

  const output = resolve(process.cwd(), options.out ?? defaultOutputPath());
  if (await exists(output)) throw new Error(`Refusing to overwrite existing file: ${output}`);
  const request = await createRequestBody({
    model,
    prompt: options.prompt,
    size: options.size,
    quality: options.quality,
    references: options.references,
  });

  let response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  console.log(`Image API request started (${request.mode})`);
  try {
    response = await fetch(`${baseUrl}${request.endpoint}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, ...request.headers },
      signal: controller.signal,
      body: request.body,
    });
  } catch (error) {
    const message = controller.signal.aborted
      ? `Proxy request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds without an HTTP response`
      : `Proxy transport failure before an HTTP response: ${error.message}`;
    throw new Error(redact(message, key));
  } finally {
    clearTimeout(timeout);
  }
  console.log(`Image API response: HTTP ${response.status}`);
  const requestId = response.headers.get("x-request-id") ?? response.headers.get("request-id");
  if (requestId) console.log(`Request ID: ${requestId}`);

  const responseText = await response.text();
  let responseJson;
  try {
    responseJson = JSON.parse(responseText);
  } catch {
    responseJson = null;
  }
  if (!response.ok) {
    const providerMessage = responseJson?.error?.message ?? "The proxy returned a non-JSON error response";
    throw new Error(redact(`Proxy returned HTTP ${response.status}: ${providerMessage}`, key));
  }

  const bytes = await imageBytes(responseJson?.data?.[0]);
  if (!isPng(bytes)) throw new Error("The response was not a valid PNG despite requesting output_format=png");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, bytes, { flag: "wx" });
  console.log(`Generated PNG: ${isAbsolute(output) ? output : resolve(output)}`);
  console.log(`Model: ${model}; API response: HTTP ${response.status}`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
