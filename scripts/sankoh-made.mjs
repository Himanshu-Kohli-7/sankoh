/**
 * Products confirmed as Sankoh® own make (`sankohMade: true` in their frontmatter), read straight from
 * src/content/products/. Shared by check-claims ("Manufactured by Sankoh" allowed only there) and check-seo
 * (brand Sankoh + manufacturer only there). Published products only: a stub with no body gets no page.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'src/content/products';

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

/** Site paths of sankohMade product pages, e.g. "/products/manual-valves/gate-valve/". */
export const sankohMadeUrls = new Set(
  walk(ROOT).flatMap((file) => {
    const src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m || !/^sankohMade:\s*true\s*$/m.test(m[1]) || !m[2].trim()) return [];
    const rel = path.relative(ROOT, file).split(path.sep).join('/').replace(/\.md$/, '');
    return [`/products/${rel}/`];
  }),
);

/** The same pages as dist/ files, e.g. "dist/products/manual-valves/gate-valve/index.html". */
export const sankohMadeDistFiles = new Set([...sankohMadeUrls].map((u) => `dist${u}index.html`));
