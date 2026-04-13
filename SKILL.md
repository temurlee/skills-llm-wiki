---
name: llm-wiki
description: Personal knowledge base system using the LLM Wiki pattern (Karpathy-style). Manages a vault with raw/ (original sources) and wiki/ (distilled knowledge pages). Use when user says "ingest URL", "clip URL", or asks to save/store content to the knowledge base. Handles full ingest flow: fetch URL with defuddle, save to raw/, distill to wiki/, update index.md and log.md, optionally push to GitHub.
---

# LLM Wiki

Personal knowledge base built on the [Karpathy LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) pattern.

## Vault Structure

```
vault/
├── raw/        ← original sources (read-only after saving)
└── wiki/
    ├── index.md    ← page directory (update after every ingest)
    ├── log.md      ← append-only operation log
    └── *.md        ← knowledge pages (flat, no subdirectories)
```

## Setup (first time)

1. Create vault directory and initialize git:
   ```bash
   mkdir -p <vault>/raw <vault>/wiki
   cd <vault> && git init && git remote add origin <github-repo>
   ```
2. Install defuddle:
   ```bash
   cd <skill-dir> && npm install defuddle
   ```
3. Create `wiki/index.md` and `wiki/log.md` (see references/templates.md).
4. Set vault path in your AGENTS.md wiki section.

## Ingest Flow

When user says **"ingest \<URL\>"**:

1. Run clip script to fetch and save to `raw/`:
   ```bash
   node <skill-dir>/scripts/clip.mjs <URL> <vault-path>
   ```
   Returns JSON: `{ title, author, published, filename, filePath }`

2. Read the saved `raw/<filename>` for source content.

3. Create or update `wiki/<title>.md` using the knowledge page format (see references/templates.md).
   - Distill core insights — do NOT copy raw content verbatim
   - Set `confidence: high/medium/low` based on source quality
   - Add `related` links to existing wiki pages where relevant

4. Update `wiki/index.md` — add a row for the new page.

5. Append to `wiki/log.md`:
   ```
   ## [YYYY-MM-DD] ingest | <title>
   - 来源：<URL>
   - 现有知识页共 N 篇
   ```

6. (Optional) Git commit and push:
   ```bash
   cd <vault> && git add -A && git commit -m "ingest: <title>" && git push
   ```

## Query Flow

When user asks a question about knowledge base content:
1. Read `wiki/index.md` to locate relevant pages.
2. Read the specific page(s).
3. Answer based on distilled content.

## Lint (weekly heartbeat)

Check for: orphan pages (no `related` links), contradictions, pages not updated in 3+ months.

## Fallback

If defuddle fails (login-required pages, paywalls): use camofox snapshot as fallback, note quality limitation in the raw file frontmatter.
