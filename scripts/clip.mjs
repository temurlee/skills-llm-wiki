#!/usr/bin/env node
// web-clipper: fetch URL with defuddle, save to raw/, return metadata

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2];
const vaultPath = process.argv[3] || '/home/node/.openclaw/workspace/obsidian-vault';

if (!url) {
  console.error('Usage: clip.mjs <url> [vault-path]');
  process.exit(1);
}

// fetch with defuddle
let raw;
try {
  const skillDir = new URL('..', import.meta.url).pathname;
  raw = execSync(`node ${skillDir}/node_modules/.bin/defuddle parse "${url}" --markdown --json`, {
    encoding: 'utf8',
    timeout: 30000,
  });
} catch (e) {
  console.error('defuddle failed:', e.message);
  process.exit(1);
}

const data = JSON.parse(raw);
const title = data.title || 'Untitled';
const author = data.author || '';
const published = data.published || '';
const description = data.description || '';
const content = data.content || '';
const today = new Date().toISOString().slice(0, 10);

// build frontmatter
const frontmatter = [
  '---',
  `title: "${title.replace(/"/g, '\\"')}"`,
  `source: "${url}"`,
  `author: "${author}"`,
  `published: "${published}"`,
  `created: "${today}"`,
  `description: "${description.replace(/"/g, '\\"')}"`,
  'tags:',
  '  - clippings',
  '---',
  '',
].join('\n');

const fileContent = frontmatter + content;

// sanitize filename
const filename = title
  .replace(/[\/\\:*?"<>|]/g, '-')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 80) + '.md';

const rawDir = join(vaultPath, 'raw');
mkdirSync(rawDir, { recursive: true });
const filePath = join(rawDir, filename);
writeFileSync(filePath, fileContent, 'utf8');

// output result for skill
console.log(JSON.stringify({ title, author, published, filename, filePath }));
