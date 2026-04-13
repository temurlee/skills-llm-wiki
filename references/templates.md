# Templates

## wiki/index.md

```markdown
# Wiki Index

> All knowledge pages. Update after every ingest.

## Pages

| Page | Tags | Summary |
|------|------|---------|
| [[wiki/page-title]] | #tag1 #tag2 | One-line summary |
```

## wiki/log.md

```markdown
# Wiki Log

> Append-only operation log.
> Format: `## [YYYY-MM-DD] operation | title`

---

## [YYYY-MM-DD] init | Wiki initialized

- Created raw/ and wiki/ structure
- 0 knowledge pages
```

## Knowledge Page Format

```markdown
# Title

tags: #tag1 #tag2
related: [[Other Page]]
updated: YYYY-MM-DD
confidence: high / medium / low
sources: N

---

## Core Content
Current best understanding. Rewrite (don't append) when new sources update this.
When new info contradicts existing: explicitly note "supersedes: old claim".

## Timeline
- YYYY-MM-DD: Created, source [[xxx]] or URL
- YYYY-MM-DD: Updated with new source
```

### confidence rules
- `high` — multiple sources, recently confirmed
- `medium` — single source, or confirmed a while ago
- `low` — speculative, needs verification
