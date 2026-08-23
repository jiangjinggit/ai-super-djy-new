---
name: image-api-proxy
description: Generate images, reference-guided image edits, or bounded-concurrency image batches through a user-configured OpenAI-compatible image API proxy. Use only when the user explicitly invokes `$image-api-proxy` or explicitly requires their private proxy, API key, and GPT Image model rather than Codex's built-in image generation.
---

# Image API Proxy

Generate images through the OpenAI-compatible proxy configured only in this Skill's private `.env`. This deterministic API path does not call the built-in `image_gen` tool. With reference images, it uses the OpenAI-compatible image edits endpoint.

## Workflow

1. Confirm whether the request is text-only, uses reference images, or contains multiple independent image jobs. This version supports new images, reference-guided generation, and concurrent batches, but not masks.
2. Use the current workspace only for output files. Always load configuration from the private `.env` beside this Skill; never read a workspace `.env`.
3. Require `OPENAI_API_KEY`, `OPENAI_BASE_URL`, and optionally `OPENAI_IMAGE_MODEL` (defaults to `gpt-image-2`) in the private file. Never display any secret or the contents of `.env`.
4. Turn the user's request into a concise image prompt. For each reference image, state its role (subject/identity, composition, or style) and the properties that must remain unchanged. Preserve exact in-image text and material constraints.
5. For one image, run `generate.mjs`. Use `--reference <path>` once per local reference image. Use `--out` for a requested destination; otherwise it writes a new PNG below `output/imagegen/` without overwriting an existing file.

```bash
node /Users/shinf/.agents/skills/image-api-proxy/scripts/generate.mjs \
  --prompt "<image prompt>" \
  --reference "<reference-image-path>" \
  --size 1024x1024 \
  --quality auto
```

6. Network access may need approval. Report the saved output path and safe HTTP error details. Do not retry a billable request unless the user asks or the failure was clearly before it reached the API.

## Concurrent batches

For two or more independent prompts or reference-image jobs, create a JSONL task file and run `generate-batch.mjs`. Use bounded concurrency: default to `3`; raise it only when the user wants more throughput and the proxy's rate limits are known. Never launch unbounded requests.

Each non-empty line is one JSON object:

```jsonl
{"id":"look-1","prompt":"A cream editorial product scene","size":"1024x1024","quality":"low"}
{"id":"look-2","prompt":"Restyle the outfit while preserving the pose","references":["/absolute/reference.png"],"out":"output/imagegen/look-2.png"}
```

Run:

```bash
node /Users/shinf/.agents/skills/image-api-proxy/scripts/generate-batch.mjs \
  --input tmp/image-api-proxy/jobs.jsonl \
  --concurrency 3
```

The batch runner assigns collision-safe output paths when `out` is omitted, continues after individual failures, and appends durable job records plus a final summary to `results.jsonl`. Report successful outputs, failed job IDs, and the results path. Do not automatically retry failed or ambiguous billable requests.

## Options

- `--out <path>`: output PNG path; refuses to overwrite.
- `--size <WIDTHxHEIGHT>`: defaults to `1024x1024`.
- `--quality <low|medium|high|auto>`: defaults to `auto`.
- `--model <name>`: overrides `OPENAI_IMAGE_MODEL` for one request.
- `--reference <path>`: local PNG, JPEG, or WebP reference image. Repeat for multiple references. Its use changes the endpoint to `/images/edits`.

Batch options:

- `--input <jsonl>`: required task file.
- `--concurrency <1-8>`: bounded worker count; defaults to `3`.
- `--output-dir <path>`: generated output directory when jobs omit `out`.
- `--results <path>`: durable JSONL result log.

Use this Skill only by explicit invocation. Keep its private global `.env` out of Git, plugin packages, and shared archives, and give it mode `600`. Only submit reference images that the user is authorized to use.
