# llm-wiki

An OpenClaw skill for managing a personal knowledge base using the [Karpathy LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) pattern.

## What it does

- Fetches URLs using [defuddle](https://github.com/kepano/defuddle) (same engine as Obsidian Web Clipper)
- Saves original content to `raw/` with Web Clipper-compatible frontmatter
- Distills core insights into `wiki/` knowledge pages
- Maintains `wiki/index.md` and `wiki/log.md` automatically
- Optionally syncs to GitHub

## Vault structure

```
vault/
├── raw/        ← original sources (read-only after saving)
└── wiki/
    ├── index.md    ← page directory
    ├── log.md      ← append-only operation log
    └── *.md        ← knowledge pages (flat)
```

## Usage

Say `ingest <URL>` to your OpenClaw agent — it handles the rest.

## Setup

1. Install the skill into your OpenClaw workspace skills directory
2. Run `npm install` inside the skill directory
3. Create your vault directory with `raw/` and `wiki/` subdirectories
4. Set the vault path in your `AGENTS.md`

## Credits

Inspired by [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and [Obsidian Web Clipper](https://github.com/obsidianmd/obsidian-clipper).
