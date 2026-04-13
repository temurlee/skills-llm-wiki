# llm-wiki

> 基于 LLM 的个人知识库 skill，适用于 OpenClaw。

将任意网页 URL 一句话转化为结构化知识页，自动维护索引与日志，可选同步 GitHub。灵感来自 [Andrej Karpathy 的 LLM Wiki 方案](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，内容抓取引擎与 [Obsidian Web Clipper](https://github.com/obsidianmd/obsidian-clipper) 一致。

---

## 解决什么问题

你刷 X、看博客、读文章，遇到好东西——收藏了，然后忘了。

llm-wiki 改变这个循环：把链接发给 agent，说一句 `ingest`，它帮你把核心观点提炼成一页结构化笔记，存进你的知识库。原文完整归档在 `raw/`，提炼后的洞察沉淀在 `wiki/`。下次你问相关问题，agent 能直接调用这些知识回答你，而不是让你自己去翻收藏夹。

知识不再是一堆链接，而是真正属于你的、可被检索和复用的资产。

---

## 特性

- **一句话触发**：说 `ingest <URL>`，其余全自动
- **Web Clipper 同等质量**：使用 [defuddle](https://github.com/kepano/defuddle) 抓取，frontmatter 格式与 Obsidian Web Clipper 完全兼容
- **知识提炼，而非复制**：原文存 `raw/`，提炼后的核心观点写入 `wiki/`
- **自动维护索引**：每次 ingest 自动更新 `wiki/index.md` 和 `wiki/log.md`
- **零配置初始化**：首次使用时自动引导，一问一答完成全部配置
- **可选 GitHub 同步**：支持 git commit + push

---

## 工作原理

```
用户说 "ingest <URL>"
        ↓
  defuddle 抓取页面
        ↓
  原文 → raw/<title>.md
        ↓
  LLM 提炼核心观点
        ↓
  知识页 → wiki/<title>.md
        ↓
  更新 index.md + log.md
        ↓
  （可选）git push
```

---

## Vault 目录结构

```
vault/
├── raw/            ← 原始资料（只读存档）
└── wiki/
    ├── index.md    ← 知识页目录
    ├── log.md      ← 操作日志（append-only）
    └── *.md        ← 知识页（平铺）
```

---

## 安装

**前置要求**：[OpenClaw](https://openclaw.ai) + Node.js 18+

```bash
# 1. 克隆到 OpenClaw workspace skills 目录
git clone https://github.com/temurlee/skills-llm-wiki.git \
  ~/.openclaw/workspace/skills/llm-wiki

# 2. 安装依赖
cd ~/.openclaw/workspace/skills/llm-wiki && npm install
```

首次说 `ingest <URL>` 时，agent 会自动引导完成 vault 初始化和 AGENTS.md 配置，无需手动操作。

---

## 使用

| 指令 | 说明 |
|------|------|
| `ingest <URL>` | 抓取页面，提炼知识页，更新索引 |
| `查一下 <URL>` | 仅读取内容回答，不存入知识库 |

---

## 知识页格式

```markdown
# 标题

tags: #标签
related: [[相关页面]]
updated: YYYY-MM-DD
confidence: high / medium / low
sources: N

---

## 核心内容
当前最佳理解，随新资料更新（改写，不追加）。

## 时间线
- YYYY-MM-DD: 首次创建，来源 URL
```

---

## 致谢

- [Andrej Karpathy — LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [kepano — defuddle](https://github.com/kepano/defuddle)
- [Obsidian Web Clipper](https://github.com/obsidianmd/obsidian-clipper)

---

## License

MIT
