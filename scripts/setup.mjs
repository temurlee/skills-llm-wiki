#!/usr/bin/env node
// setup.mjs: initialize llm-wiki vault and update AGENTS.md

import { mkdirSync, writeFileSync, existsSync, readFileSync, appendFileSync } from 'fs';
import { join, resolve } from 'path';

const vaultPath = resolve(process.argv[2]);
const skillDir = process.argv[3] ? resolve(process.argv[3]) : new URL('..', import.meta.url).pathname;

if (!vaultPath) {
  console.error('Usage: node setup.mjs <vault-path> [skill-dir]');
  process.exit(1);
}

// 1. create directories
mkdirSync(join(vaultPath, 'raw'), { recursive: true });
mkdirSync(join(vaultPath, 'wiki'), { recursive: true });
console.log(`✓ Created ${vaultPath}/raw/ and ${vaultPath}/wiki/`);

// 2. create wiki/index.md
const indexPath = join(vaultPath, 'wiki', 'index.md');
if (!existsSync(indexPath)) {
  writeFileSync(indexPath, `# Wiki Index

> 所有知识页目录。每次 ingest 后更新。

## Pages

| 页面 | 标签 | 摘要 |
|------|------|------|
`);
  console.log('✓ Created wiki/index.md');
}

// 3. create wiki/log.md
const logPath = join(vaultPath, 'wiki', 'log.md');
if (!existsSync(logPath)) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(logPath, `# Wiki Log

> 操作日志，append-only，不修改历史记录。

---

## [${today}] init | Wiki 初始化

- vault 路径：${vaultPath}
- 知识页共 0 篇
`);
  console.log('✓ Created wiki/log.md');
}

// 4. append to AGENTS.md
const agentsPath = join(process.env.HOME || '/root', '.openclaw', 'workspace', 'AGENTS.md');
const agentsTemplatePath = join(skillDir, 'references', 'agents-wiki-section.md');

if (existsSync(agentsPath) && existsSync(agentsTemplatePath)) {
  const agentsContent = readFileSync(agentsPath, 'utf8');
  if (!agentsContent.includes('## Wiki 维护规范')) {
    let template = readFileSync(agentsTemplatePath, 'utf8');
    // replace placeholders
    template = template
      .replace(/<vault-path>/g, vaultPath)
      .replace(/<skill-path>/g, skillDir);
    // strip the markdown code fences wrapping the content
    const match = template.match(/```markdown\n([\s\S]+?)\n```/);
    const section = match ? match[1] : template;
    appendFileSync(agentsPath, '\n\n' + section);
    console.log('✓ Appended wiki rules to AGENTS.md');
  } else {
    console.log('⚠ AGENTS.md already has wiki rules, skipping');
  }
} else {
  console.log('⚠ AGENTS.md or template not found, skipping');
}

console.log(`\n✅ llm-wiki initialized at ${vaultPath}`);
