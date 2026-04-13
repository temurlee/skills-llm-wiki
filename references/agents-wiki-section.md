# AGENTS.md Wiki 配置片段

> 此文件由 `setup.mjs` 自动写入 AGENTS.md，无需手动操作。
> 如需手动配置，将以下内容复制到 AGENTS.md，替换 `<vault-path>` 和 `<skill-path>` 为实际路径。

---

```markdown
## Wiki 维护规范

### 目录结构
vault/
├── raw/     ← 原始资料（只读，不修改）
└── wiki/    ← index.md + log.md + 所有知识页（平铺）

### Ingest 流程
用户说"ingest <URL>"时执行：
1. 运行 clip 脚本抓取并保存原文到 raw/：
   node <skill-path>/scripts/clip.mjs <URL> <vault-path>
2. 读取 raw/ 里保存的文件
3. 在 wiki/ 创建或更新知识页（核心内容改写，时间线追加）
4. 更新相关页面的 related 引用
5. 更新 wiki/index.md
6. 追加 wiki/log.md
7. （可选）git commit + push

### 知识页格式
# 标题

tags: #标签
related: [[其他知识页]]
updated: YYYY-MM-DD
confidence: high / medium / low
sources: N

---

## 核心内容
当前最佳理解，随新资料更新（改写，不追加）。
新资料与现有内容矛盾时，显式标注"已取代旧观点：xxx"。

## 时间线
- YYYY-MM-DD: 首次创建，来源 URL
- YYYY-MM-DD: 更新，来源 URL

confidence 规则：
- high — 多个来源支持，近期确认
- medium — 单一来源，或较早确认
- low — 推测性内容，待验证

### Query
先读 wiki/index.md 定位相关页面，再读具体页面回答。

### Lint（每周 heartbeat）
检查：孤立页面（无 related 引用）、矛盾内容、超过 3 个月未更新的核心页。
```
