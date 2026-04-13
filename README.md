# llm-wiki

> 基于 LLM 的个人知识库 skill，适用于 OpenClaw。

你刷 X、看博客、读文章，遇到好东西——收藏了，然后忘了。

llm-wiki 改变这个循环：把链接发给 agent，说一句 `ingest`，它帮你把核心观点提炼成一页结构化笔记，存进你的知识库。原文完整归档在 `raw/`，提炼后的洞察沉淀在 `wiki/`。下次你问相关问题，agent 能直接调用这些知识回答你，而不是让你自己去翻收藏夹。

知识不再是一堆链接，而是真正属于你的、可被检索和复用的资产。

---

## 为什么选择 llm-wiki？

| | 浏览器书签 / 稍后读 | Notion / Obsidian 手动整理 | **llm-wiki** |
|---|---|---|---|
| **操作成本** | 零成本收藏，但找不到 | 需要手动写笔记 | **一句话触发，全自动** |
| **知识密度** | 原始链接，无提炼 | 取决于你写多少 | **LLM 提炼核心观点** |
| **可检索性** | 靠记忆或全文搜索 | 靠标签和目录 | **agent 直接调用回答** |
| **原文存档** | 链接可能失效 | 需手动复制 | **自动归档到 raw/** |
| **维护成本** | 越堆越多，无人整理 | 需要持续维护 | **自动更新索引和日志** |

---

## 它会自动做什么？

你说一句 `ingest <URL>`，agent 自动完成以下全部步骤：

```
1. 用 defuddle 抓取页面内容（Web Clipper 同等质量）
        ↓
2. 原文保存到 raw/<title>.md（含标准 frontmatter）
        ↓
3. LLM 提炼核心观点，写入 wiki/<title>.md
        ↓
4. 更新 wiki/index.md 目录
        ↓
5. 追加 wiki/log.md 操作日志
        ↓
6. （可选）git commit + push 同步 GitHub
```

首次使用时，agent 还会自动：
- 询问 vault 存放路径
- 创建 `raw/` 和 `wiki/` 目录结构
- 生成初始 `index.md` 和 `log.md`
- 将 wiki 维护规范写入你的 `AGENTS.md`

---

## 特性

- **一句话触发**：`ingest <URL>`、`加入知识库 <URL>`、`存知识库 <URL>` 均可
- **Web Clipper 同等质量**：使用 [defuddle](https://github.com/kepano/defuddle) 抓取，frontmatter 格式与 Obsidian Web Clipper 完全兼容
- **知识提炼，而非复制**：原文存 `raw/`，提炼后的核心观点写入 `wiki/`
- **自动维护索引**：每次 ingest 自动更新 `wiki/index.md` 和 `wiki/log.md`
- **零配置初始化**：首次使用时自动引导，一问一答完成全部配置
- **可选 GitHub 同步**：支持 git commit + push

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
| `加入知识库 <URL>` | 同上，自然语言触发 |
| `存知识库 <URL>` | 同上 |
| `记录这个 <URL>` | 同上 |
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
