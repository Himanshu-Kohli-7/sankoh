#!/usr/bin/env node
/**
 * Claims check (CLAUDE.md §2.4, §2.5, §4): finds wording the site must never ship.
 * Exits 1 on any hit.
 *
 * Modes: `--source` (src/, public/, docs; runs as `prebuild`), `--dist` (the generated files; runs as
 * `postbuild`), and no flag for both (`npm run check:claims`, part of check:all). Any hit fails
 * `npm run build` (and the Netlify build).
 *
 * - BANNED scans the site's own files (src/, public/).
 * - GENERATED (the built dist/llms.txt and dist/robots.txt) gets BANNED + FORMER as well: they are
 *   generated from site.ts and the collections, so the source scan alone would not see the output.
 * - FORMER (the former contact's name, title, number and email) also scans docs, scripts and
 *   CLAUDE.md, because they must not appear anywhere in the project. The docs are spared the
 *   BANNED list because they quote those wordings in order to forbid them.
 * - [CONFIRM] marks text that still needs the company's confirmation. Every occurrence in src/ or public/
 *   must be listed in docs/CONFIRM.md (an entry naming the file path); an unlisted one always fails.
 *   Any [CONFIRM] left in dist/ fails when CONTEXT=production (Netlify's production deploys) and only
 *   warns in previews and local builds.
 * This file is skipped: it holds the lists.
 *
 * "warranty" is allowed: the terms are confirmed and come from src/config/site.ts.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['src', 'public'];
/** Project files scanned for the FORMER bans only. */
const DOC_ROOTS = ['docs', 'scripts', 'CLAUDE.md', 'README.md', 'netlify.toml', 'astro.config.mjs', 'package.json'];
const SELF = path.normalize('scripts/check-claims.mjs');
/** Built text files generated from data rather than written by hand. */
const GENERATED = ['dist/llms.txt', 'dist/robots.txt'];
const mode = process.argv.includes('--source') ? 'source' : process.argv.includes('--dist') ? 'dist' : 'all';
const TEXT = /\.(astro|md|mdx|ya?ml|ts|tsx|js|mjs|css|json|txt|html|webmanifest|svg|toml)$/;

/** [pattern, why]. Case-insensitive unless the pattern says otherwise. */
const BANNED = [
  [/24\s*[/x×]\s*7/i, 'Never "24/7": say "Urgent breakdown support 7 days a week"'],
  [/round[\s-]the[\s-]clock/i, 'Never "round the clock"'],
  [/any time of day/i, 'Never "any time of day"'],
  [/365[\s-]days?/i, 'Never "365 days": say "Urgent breakdown support 7 days a week"'],
  [/service(?: is)?(?: available)? 7 days a week/i, 'Use the support line: "Urgent breakdown support 7 days a week"'],
  [/scientific\s+devices/i, 'Scientific Devices is no longer a partner'],
  [/\bservo\b/i, 'No servo drive repair'],
  [/\bHMIs?\b/, 'No HMI repair'],
  [/drive-repair/i, 'The /drive-repair/ section is gone: link /vfd-repair/'],
  [/vibration sensors?/i, 'Vibration sensors are not sold'],
  [/Stolzel®|own brands/i, 'Sankoh® is the only own brand; Stolzel is an authorised partner'],
];

/** Former contact, no longer with the company. Never his name, title, number or email, anywhere. */
const FORMER = [
  [/piyush/i, 'Former contact: never name him or use his email'],
  [/62834|6283492019|916283492019/, 'Former phone number: the only number is +91 98884 91527'],
  [/marketing head/i, 'Former contact title: there is no Marketing Head contact'],
];

function walk(target, out = []) {
  if (!fs.existsSync(target)) return out;
  if (fs.statSync(target).isFile()) {
    if (TEXT.test(target)) out.push(target);
    return out;
  }
  for (const name of fs.readdirSync(target)) walk(path.join(target, name), out);
  return out;
}

const jobs = [];
if (mode !== 'dist') {
  jobs.push(
    ...ROOTS.flatMap((r) => walk(r)).map((file) => [file, [...BANNED, ...FORMER]]),
    ...DOC_ROOTS.flatMap((r) => walk(r))
      .filter((file) => path.normalize(file) !== SELF)
      .map((file) => [file, FORMER]),
  );
}
if (mode !== 'source') {
  const missing = GENERATED.filter((f) => !fs.existsSync(f));
  if (missing.length) {
    console.error(`Missing ${missing.join(', ')}: run \`npm run build\` first.`);
    process.exit(1);
  }
  jobs.push(...GENERATED.map((file) => [file, [...BANNED, ...FORMER]]));
}

const MARKER = '[CONFIRM]';
const CONFIRM_DOC = 'docs/CONFIRM.md';
const production = process.env.CONTEXT === 'production';
/** Every file under `roots` that contains the marker, with its line numbers. */
function markerHits(roots, textOnly = true) {
  const found = [];
  for (const file of roots.flatMap((r) => walkAll(r, textOnly))) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => line.includes(MARKER) && found.push({ file: file.split(path.sep).join('/'), line: i + 1, text: line.trim().slice(0, 140) }));
  }
  return found;
}
function walkAll(target, textOnly, out = []) {
  if (!fs.existsSync(target)) return out;
  if (fs.statSync(target).isFile()) {
    if (!textOnly || TEXT.test(target)) out.push(target);
    return out;
  }
  for (const name of fs.readdirSync(target)) walkAll(path.join(target, name), textOnly, out);
  return out;
}

let hits = 0;
let confirmFailed = false;
if (mode !== 'dist') {
  const doc = fs.existsSync(CONFIRM_DOC) ? fs.readFileSync(CONFIRM_DOC, 'utf8') : '';
  const sourceHits = markerHits(ROOTS);
  for (const h of sourceHits) {
    if (doc.includes(h.file)) continue;
    confirmFailed = true;
    console.log(`${h.file}:${h.line}  ${MARKER} is not listed in ${CONFIRM_DOC}: add a row naming this file
    ${h.text}`);
  }
  const present = new Set(sourceHits.map((h) => h.file));
  for (const m of doc.matchAll(/`((?:src|public)\/[^`]+)`/g)) {
    if (!present.has(m[1])) console.log(`warning: ${CONFIRM_DOC} lists ${m[1]}, which no longer contains ${MARKER}: remove the row`);
  }
  if (sourceHits.length) console.log(`${sourceHits.length} ${MARKER} marker(s) in src/public (${production ? 'production: these must be gone before the dist check' : 'allowed outside production'}).`);
}
if (mode !== 'source') {
  const distHits = markerHits(['dist']);
  for (const h of distHits) console.log(`${production ? '' : 'warning: '}${h.file}:${h.line}  ${MARKER} in built output
    ${h.text}`);
  if (distHits.length && production) {
    confirmFailed = true;
    console.log(`
CONTEXT=production: ${distHits.length} ${MARKER} marker(s) in dist/. Resolve them (docs/CONFIRM.md) before deploying.`);
  }
}

for (const [file, bans] of jobs) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const [pattern, why] of bans) {
      if (!pattern.test(line)) continue;
      hits++;
      console.log(`${file.split(path.sep).join('/')}:${i + 1}  ${why}\n    ${line.trim().slice(0, 160)}`);
    }
  });
}

console.log(hits ? `\n${hits} banned claim(s) in ${jobs.length} files.` : `No banned claims in ${jobs.length} files.`);
process.exit(hits || confirmFailed ? 1 : 0);
