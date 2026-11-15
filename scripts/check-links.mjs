#!/usr/bin/env node
/**
 * Link check over the built site (dist/). Run after `npm run build`: `npm run check:links`.
 * Every root-relative href and src in every HTML page must resolve to a file in dist/
 * (`/x/` → dist/x/index.html, `/x.svg` → dist/x.svg), and every #fragment must match an id
 * on the target page. External links (https:, tel:, mailto:, wa.me) are skipped.
 * Exits 1 on any dead link. No dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
if (!fs.existsSync(DIST)) {
  console.error('dist/ not found: run `npm run build` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = walk(DIST);
const idCache = new Map();
const idsOf = (file) => {
  if (!idCache.has(file)) {
    const html = fs.readFileSync(file, 'utf8');
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
};

/** Root-relative URL path → file in dist/, or null. */
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath);
  const candidates = clean.endsWith('/')
    ? [path.join(DIST, clean, 'index.html')]
    : [path.join(DIST, clean), path.join(DIST, clean, 'index.html'), path.join(DIST, `${clean}.html`)];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

/** Page file → its own URL path, for same-page #fragments and relative links. */
const urlOf = (file) => '/' + path.relative(DIST, file).split(path.sep).join('/').replace(/index\.html$/, '');

const dead = [];
let checked = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const refs = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const raw of refs) {
    const ref = raw.replace(/&amp;/g, '&');
    if (!ref || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(ref)) continue; // external, tel:, mailto:, data:
    checked++;
    const [beforeHash, fragment] = ref.split('#');
    const pathPart = beforeHash.split('?')[0];
    const base = urlOf(page);
    const target = pathPart === '' ? page : resolve(new URL(pathPart, `https://x${base}`).pathname);
    if (!target) {
      dead.push([urlOf(page), ref, 'no such page or file']);
      continue;
    }
    if (fragment && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(fragment))) {
      dead.push([urlOf(page), ref, `no id="${fragment}" on the target page`]);
    }
  }
}

const byLink = new Map();
for (const [from, ref, why] of dead) {
  const key = `${ref}  (${why})`;
  if (!byLink.has(key)) byLink.set(key, []);
  byLink.get(key).push(from);
}
for (const [key, froms] of byLink) {
  console.log(`DEAD ${key}\n    on ${froms.length} page(s): ${froms.slice(0, 5).join(', ')}${froms.length > 5 ? ', …' : ''}`);
}
console.log(
  dead.length
    ? `\n${byLink.size} dead link target(s), ${dead.length} occurrence(s), in ${pages.length} pages (${checked} internal links checked).`
    : `No dead links: ${checked} internal links checked in ${pages.length} pages.`,
);
process.exit(dead.length ? 1 : 0);
