#!/usr/bin/env node
/**
 * IndexNow (SPEC §7): tell Bing, Yandex and the other IndexNow engines which URLs changed.
 * Shared by the Netlify plugin (netlify/plugins/indexnow/) and the manual command:
 *
 *   npm run indexnow -- --all                   ping every sitemap URL in dist/
 *   npm run indexnow -- <url> [<url> …]         ping these URLs
 *   npm run indexnow -- --all --dry-run         list what would be sent
 *
 * The key is read from dist/ (the /<key>.txt file built from site.ts), so it is set in one place.
 * No dependencies; Node's fetch.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ORIGIN = 'https://www.sankohtech.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** The IndexNow key: the dist/<32 hex>.txt file whose content is its own name. */
export function readKey(dist = 'dist') {
  for (const name of fs.readdirSync(dist)) {
    const m = name.match(/^([a-f0-9]{32})\.txt$/);
    if (m && fs.readFileSync(path.join(dist, name), 'utf8').trim() === m[1]) return m[1];
  }
  throw new Error('No IndexNow key file in dist/: check site.integrations.indexNowKey');
}

/** Every URL in the built sitemap (indexable pages only). */
export function sitemapUrls(dist = 'dist') {
  const urls = [];
  for (const f of fs.readdirSync(dist).filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
    for (const [, loc] of fs.readFileSync(path.join(dist, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(loc);
  }
  return urls;
}

/** URL → sha256 of its built HTML, for every sitemap URL. */
export function pageHashes(dist = 'dist') {
  const hashes = {};
  for (const url of sitemapUrls(dist)) {
    const file = path.join(dist, new URL(url).pathname, 'index.html');
    if (fs.existsSync(file)) hashes[url] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  }
  return hashes;
}

/** URLs that are new or whose HTML changed since `previous` (all of them when there is no previous). */
export function changedUrls(current, previous) {
  if (!previous) return Object.keys(current);
  return Object.keys(current).filter((url) => previous[url] !== current[url]);
}

/** POST the URLs to api.indexnow.org (max 10,000 per request). Returns the HTTP status. */
export async function ping(urls, key, { dryRun = false, log = console.log } = {}) {
  if (!urls.length) {
    log('IndexNow: nothing changed, no ping.');
    return 0;
  }
  const body = { host: new URL(ORIGIN).host, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: urls.slice(0, 10000) };
  if (dryRun) {
    log(`IndexNow (dry run): would send ${body.urlList.length} URL(s):\n  ${body.urlList.join('\n  ')}`);
    return 0;
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  log(`IndexNow: sent ${body.urlList.length} URL(s), HTTP ${res.status} ${res.statusText}`);
  return res.status;
}

// CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const listed = args.filter((a) => !a.startsWith('--'));
  const urls = args.includes('--all') ? sitemapUrls() : listed;
  if (!urls.length) {
    console.log('Usage: npm run indexnow -- --all | <url> [<url> …] [--dry-run]');
    process.exit(1);
  }
  const bad = urls.filter((u) => !u.startsWith(`${ORIGIN}/`));
  if (bad.length) {
    console.error(`Only ${ORIGIN} URLs can be sent: ${bad.join(', ')}`);
    process.exit(1);
  }
  const status = await ping(urls, readKey(), { dryRun });
  process.exit(status === 0 || (status >= 200 && status < 300) ? 0 : 1);
}
