#!/usr/bin/env node
/**
 * Claims check (CLAUDE.md §2.4, §2.5, §4): finds wording the site must never ship.
 * Exits 1 on any hit.
 *
 * Runs as `prebuild`, so any hit fails `npm run build` (and the Netlify build).
 * Run it on its own with `npm run check:claims`.
 *
 * - BANNED scans the site's own files (src/, public/).
 * - FORMER (the former contact's name, title, number and email) also scans docs, scripts and
 *   CLAUDE.md, because they must not appear anywhere in the project. The docs are spared the
 *   BANNED list because they quote those wordings in order to forbid them.
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

const jobs = [
  ...ROOTS.flatMap((r) => walk(r)).map((file) => [file, [...BANNED, ...FORMER]]),
  ...DOC_ROOTS.flatMap((r) => walk(r))
    .filter((file) => path.normalize(file) !== SELF)
    .map((file) => [file, FORMER]),
];

let hits = 0;
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
process.exit(hits ? 1 : 0);
