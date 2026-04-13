# llm-wiki

一个基于 [Karpathy LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 模式的 OpenClaw 个人知识库 skill。

## 功能

- 使用 [defuddle](https://github.com/kepano/defuddle) 抓取 URL 内容（与 Obsidian Web Clipper 同等质量）
- 将原文保存到 `raw/`，frontmatter 格式与 Web Clipper 完全兼容
- 提炼核心观点，写入 `wiki/` 知识页
- 自动维护 `wiki/index.md` 目录和 `wiki/log.md` 日志
- 可选同步到 GitHub

## 目录结构

```
vault/
├── raw/        ← 原始资料（保存后只读）
└── wiki/
    ├── index.md    ← 知识页目录
    ├── log.md      ← 操作日志（append-only）
    └── *.md        ← 知识页（平铺）
```

## 使用方式

对 OpenClaw agent 说 `ingest <URL>`，剩下的交给它。

## 安装

1. 将 skill 目录放入 OpenClaw workspace 的 skills 目录
2. 在 skill 目录内执行 `npm install`
3. 创建 vault 目录，包含 `raw/` 和 `wiki/` 子目录
4. 在 `AGENTS.md` 中配置 vault 路径

## 致谢

灵感来自 [Karpathy 的 LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 和 [Obsidian Web Clipper](https://github.com/obsidianmd/obsidian-clipper)。
