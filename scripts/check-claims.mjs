#!/usr/bin/env node
/**
 * Claims check (CLAUDE.md §2.4, §2.5, §4): finds wording the site must never ship.
 * Scans everything under src/ and public/ that is text. Exits 1 on any hit.
 *
 * Local only: run `npm run check:claims` before commits. Like check:repeats it is NOT part
 * of `npm run build`, so a false positive can never block a deploy.
 *
 * "warranty" is allowed: the terms are confirmed and come from src/config/site.ts.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['src', 'public'];
const TEXT = /\.(astro|md|mdx|ya?ml|ts|tsx|js|mjs|css|json|txt|html|webmanifest|svg)$/;

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

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (TEXT.test(name)) out.push(p);
  }
  return out;
}

let hits = 0;
const files = ROOTS.flatMap((r) => walk(r));
for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const [pattern, why] of BANNED) {
      if (!pattern.test(line)) continue;
      hits++;
      console.log(`${file.split(path.sep).join('/')}:${i + 1}  ${why}\n    ${line.trim().slice(0, 160)}`);
    }
  });
}

console.log(hits ? `\n${hits} banned claim(s) in ${files.length} files.` : `No banned claims in ${files.length} files.`);
process.exit(hits ? 1 : 0);
