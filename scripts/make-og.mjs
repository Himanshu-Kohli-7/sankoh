#!/usr/bin/env node
/**
 * Open Graph cards (SPEC §7): four static 1200×630 images in public/og/, one per division plus a default.
 * No new dependency: the card is an HTML template rendered in a browser, then compressed with sharp
 * (installed transitively by Astro, as in make-favicons.mjs).
 *
 * 1. `node scripts/make-og.mjs serve` serves scripts/og/template.html on http://localhost:4399
 * 2. In a browser at exactly 1200×630 (Playwright or Chrome device mode), screenshot
 *    http://localhost:4399/?d=valves | instruments | repair | default to scripts/og/out/<d>.png
 * 3. `node scripts/make-og.mjs compress` writes public/og/<d>.jpg (mozjpeg) and prints the sizes.
 *
 * Which page uses which card: components/SEO.astro (ogCard).
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const CARDS = ['valves', 'instruments', 'repair', 'default'];
const mode = process.argv[2];

if (mode === 'serve') {
  const files = {
    '/': ['scripts/og/template.html', 'text/html'],
    '/logo.svg': ['public/brand/sankoh-logo-full.svg', 'image/svg+xml'],
    '/fonts/sans-400.woff2': ['node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2', 'font/woff2'],
    '/fonts/sans-600.woff2': ['node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2', 'font/woff2'],
    '/fonts/mono-500.woff2': ['node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2', 'font/woff2'],
  };
  http
    .createServer((req, res) => {
      const hit = files[new URL(req.url, 'http://x').pathname];
      if (!hit) return res.writeHead(404).end();
      res.writeHead(200, { 'content-type': hit[1] }).end(fs.readFileSync(hit[0]));
    })
    .listen(4399, '127.0.0.1', () => console.log('OG template on http://localhost:4399/?d=valves'));
} else if (mode === 'compress') {
  const { default: sharp } = await import('sharp');
  fs.mkdirSync('public/og', { recursive: true });
  for (const card of CARDS) {
    const src = path.join('scripts/og/out', `${card}.png`);
    const out = path.join('public/og', `${card}.jpg`);
    const meta = await sharp(src).metadata();
    if (meta.width !== 1200 || meta.height !== 630) throw new Error(`${src} is ${meta.width}×${meta.height}, needs 1200×630`);
    await sharp(src).flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    console.log(`${out}  ${(fs.statSync(out).size / 1024).toFixed(1)} KB`);
  }
} else {
  console.log('Usage: node scripts/make-og.mjs serve | compress');
  process.exit(1);
}
