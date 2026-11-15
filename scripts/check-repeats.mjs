#!/usr/bin/env node
/**
 * Repeat check (CLAUDE.md §2.9, SPEC §5.2): finds text shared between content files.
 * Reports every run of 8+ words that appears in two or more files, and every repeated
 * sentence of 6+ words. Exits 1 on any hit.
 *
 * Local only: run `npm run check:repeats` before content commits. It is deliberately NOT part
 * of `npm run build` or the Netlify build, so a false positive can never block a deploy.
 *
 * Scope: prose in src/content (markdown bodies and prose fields in frontmatter / YAML).
 * Skipped by design (allowed boilerplate or not prose): titles, SEO titles, slugs, hrefs,
 * icons, media, images, related links, checklist items (`whatToSend`) and template text
 * rendered by components (fact strip, process steps, CTA band).
 *
 * Typical options tables are short labels and ranges, so single rows may match between products.
 * Whole tables may not: two products with the same table also count as a repeat.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['products', 'categories', 'repair-hubs', 'repair-services'].map((d) => path.join('src/content', d));
const RUN = 8;
const MIN_SENTENCE = 6;

/** Keys whose values (or list items) are not prose, or are boilerplate the spec allows. */
const SKIP_KEYS = new Set([
  'title', 'h1', 'seoTitle', 'slug', 'category', 'order', 'operation', 'icon', 'href', 'src', 'alt', 'updated',
  'division', 'enquiry', 'group', 'serviceType', 'todo', 'media', 'images', 'relatedProducts', 'relatedRepair',
  'whatToSend', 'heroImage', 'typicalOptions', 'label', 'value', 'warranty',
]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (/\.(md|ya?ml)$/.test(name)) out.push(p);
  }
  return out;
}

/** Split a YAML block into prose segments, one per scalar value or list item, tracking the owning key. */
function yamlSegments(yaml) {
  const segs = [];
  const stack = []; // [{indent, key}]
  let cur = null;
  let curIndent = -1;
  const flush = () => { if (cur !== null && cur.trim()) segs.push(cur.trim()); cur = null; curIndent = -1; };
  const ownerKey = (indent) => {
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    return stack.length ? stack[stack.length - 1].key : null;
  };
  for (const raw of yaml.split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) { flush(); continue; }
    const indent = raw.match(/^\s*/)[0].length;
    // continuation of a folded scalar
    if (cur !== null && indent > curIndent && !/^\s*-\s/.test(raw) && !/^\s*[\w]+:(\s|$)/.test(raw)) { cur += ' ' + raw.trim(); continue; }
    flush();
    let line = raw.trim();
    let itemIndent = indent;
    if (line.startsWith('- ')) {
      const owner = ownerKey(indent);
      line = line.slice(2);
      itemIndent = indent + 2;
      if (!/^[\w]+:(\s|$)/.test(line)) {
        if (!SKIP_KEYS.has(owner)) { cur = line; curIndent = indent; }
        continue;
      }
    }
    const kv = line.match(/^([\w]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    ownerKey(itemIndent);
    stack.push({ indent: itemIndent, key });
    if (SKIP_KEYS.has(key)) continue;
    const v = value.replace(/^[>|][-+]?\s*$/, '').replace(/^['"]|['"]$/g, '');
    if (value === '' || /^[>|]/.test(value) || v) { cur = v; curIndent = itemIndent; }
  }
  flush();
  return segs;
}

function segments(text, file) {
  const t = text.replace(/\r/g, '');
  if (/\.ya?ml$/.test(file)) return yamlSegments(t);
  const m = t.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const segs = m ? yamlSegments(m[1]) : [];
  const body = m ? m[2] : t;
  for (const block of body.split(/\n\s*\n/)) {
    for (const part of block.split(/\n(?=\s*[-*] |\s*\d+\. |#)/)) {
      const p = part.replace(/^#+ .*$/gm, '').trim();
      if (p) segs.push(p);
    }
  }
  return segs;
}

const norm = (s) =>
  s.toLowerCase()
    .replace(/\]\([^)]*\)/g, ' ') // markdown link targets
    .replace(/[*_`#>\[\]()]/g, ' ')
    .replace(/[^a-z0-9%/'–-]+/g, ' ')
    .replace(/(^|\s)[-–](?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const runs = new Map();
const sentences = new Map();
const add = (map, key, id) => { if (!map.has(key)) map.set(key, new Set()); map.get(key).add(id); };

const files = ROOTS.flatMap((r) => walk(r));
for (const file of files) {
  const id = file.split(path.sep).join('/').replace('src/content/', '');
  for (const seg of segments(fs.readFileSync(file, 'utf8'), file)) {
    const words = norm(seg).split(' ').filter(Boolean);
    for (let i = 0; i + RUN <= words.length; i++) add(runs, words.slice(i, i + RUN).join(' '), id);
    for (const s of seg.split(/(?<=[.!?])\s+/)) {
      const n = norm(s);
      if (n.split(' ').length >= MIN_SENTENCE) add(sentences, n, id);
    }
  }
}

let hits = 0;

/** Typical options: each product's table must be its own (CLAUDE.md §2.2). */
const tables = new Map();
for (const file of files) {
  const m = fs.readFileSync(file, 'utf8').replace(/\r/g, '').match(/\ntypicalOptions:\n((?:  .*\n)+)/);
  if (m) add(tables, m[1].replace(/\s+/g, ' ').trim(), file.split(path.sep).join('/').replace('src/content/', ''));
}
for (const [, ids] of tables) {
  if (ids.size < 2) continue;
  hits++;
  console.log(`Same Typical options table (${ids.size} files):\n  ${[...ids].join('\n  ')}`);
}

for (const [s, ids] of sentences) {
  if (ids.size < 2) continue;
  hits++;
  console.log(`Repeated sentence (${ids.size} files): "${s}"\n  ${[...ids].join('\n  ')}`);
}
/** Group overlapping 8-word windows by the set of files that share them, so one long run prints once. */
const byFiles = new Map();
for (const [k, ids] of runs) {
  if (ids.size < 2) continue;
  const key = [...ids].sort().join('\n  ');
  if (!byFiles.has(key)) byFiles.set(key, []);
  byFiles.get(key).push(k);
}
for (const [key, list] of byFiles) {
  hits++;
  console.log(`Shared ${RUN}-word run${list.length > 1 ? `s (${list.length})` : ''}: "${list.join('" / "')}"\n  ${key}`);
}

console.log(hits ? `\n${hits} repeat(s) across ${files.length} files.` : `No repeats across ${files.length} files.`);
process.exit(hits ? 1 : 0);
