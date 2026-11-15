#!/usr/bin/env node
/**
 * Contact check over the built site (dist/). Run after `npm run build`: `npm run check:contact`.
 *
 * Enforces the phone-number rules (CLAUDE.md §4, SPEC §6.4):
 * 1. On every page except /contact/, the primary number appears in visible text at most twice
 *    (desktop header strip + footer).
 * 2. The sales number appears only in the footer (at most once) and on /contact/.
 * 3. A tel: or wa.me link never prints digits unless it is the PhoneNumber or SalesLine component
 *    (`data-contact-number` / `data-contact-sales`). Buttons never show the number.
 * 4. Every wa.me link and every non-sales tel: link points at the primary number.
 *
 * "Visible text" leaves out <head>, scripts, styles, templates, comments and every attribute
 * (so aria-labels carrying the number are fine). An element marked `data-contact-exempt`
 * (error states, such as the quote form's failure message) is skipped entirely.
 * Exits 1 on any failure. No dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const PRIMARY_E164 = '919888491527';
const SALES_E164 = '919877938373';
const PRIMARY_RE = /(?:\+?\s*91[\s-]*)?98884[\s-]*91527/g;
const SALES_RE = /(?:\+?\s*91[\s-]*)?98779[\s-]*38373/g;
/** Pages where the full reference card may repeat the numbers. */
const CONTACT_PAGES = new Set(['contact/index.html']);
const MAX_PRIMARY = 2;

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

/** Remove every element whose opening tag carries `attr`, balancing nested tags of the same name. */
function removeMarked(html, attr) {
  const open = new RegExp(`<([a-zA-Z][\\w-]*)\\b[^>]*\\s${attr}(?:[\\s=>/])`, 'g');
  let m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    tagRe.lastIndex = m.index;
    let depth = 0;
    let end = html.length;
    let t;
    while ((t = tagRe.exec(html))) {
      if (t[0].endsWith('/>')) { if (depth === 0) { end = tagRe.lastIndex; break; } continue; }
      depth += t[1] ? -1 : 1;
      if (depth === 0) { end = tagRe.lastIndex; break; }
    }
    html = html.slice(0, m.index) + html.slice(end);
    open.lastIndex = m.index;
  }
  return html;
}

const decode = (s) =>
  s
    .replace(/&nbsp;|&#160;|&#xa0;/gi, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&plus;/g, '+')
    .replace(/&amp;/g, '&');

/** Visible text of an HTML fragment. */
const textOf = (html) =>
  decode(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|template)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[\s  ]+/g, ' ');

const count = (text, re) => (text.match(re) ?? []).length;

const failures = [];
const rows = [];

for (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const raw = fs.readFileSync(file, 'utf8');
  const html = removeMarked(raw.replace(/<head\b[\s\S]*?<\/head>/i, ''), 'data-contact-exempt');
  const problems = [];

  // The site footer only: review cards and other components may use <footer> too.
  const footerMatch = html.match(/<footer\b[^>]*class="[^"]*\bsite-footer\b[\s\S]*?<\/footer>/i);
  const footerHtml = footerMatch ? footerMatch[0] : '';
  const outsideFooter = footerMatch ? html.replace(footerHtml, ' ') : html;

  const primary = count(textOf(html), PRIMARY_RE);
  const salesFooter = count(textOf(footerHtml), SALES_RE);
  const salesOutside = count(textOf(outsideFooter), SALES_RE);
  const isContact = CONTACT_PAGES.has(rel);

  if (!isContact) {
    if (primary > MAX_PRIMARY) problems.push(`primary number shown ${primary}× (max ${MAX_PRIMARY})`);
    if (salesOutside > 0) problems.push(`sales number shown ${salesOutside}× outside the footer`);
    if (salesFooter > 1) problems.push(`sales number shown ${salesFooter}× in the footer (max 1)`);
  }

  for (const [, attrs, inner] of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = (attrs.match(/\shref="([^"]*)"/i) ?? [])[1] ?? '';
    const isTel = href.startsWith('tel:');
    const isWa = /^https:\/\/wa\.me\//.test(href);
    if (!isTel && !isWa) continue;
    const isNumber = /\sdata-contact-number\b/.test(attrs);
    const isSales = /\sdata-contact-sales\b/.test(attrs);
    const digits = href.replace(/\?.*$/, '').replace(/\D/g, '');
    const text = textOf(inner).trim();

    if (/\d{4,}/.test(text.replace(/[\s-]/g, '')) && !isNumber && !isSales) {
      problems.push(`link prints digits: "${text}" (${href.slice(0, 40)}): use CallButton / WhatsAppButton`);
    }
    if (isSales) {
      if (!isTel || digits !== SALES_E164) problems.push(`sales link points at ${href}`);
    } else if (digits !== PRIMARY_E164) {
      problems.push(`${isTel ? 'tel:' : 'wa.me'} link does not use the primary number: ${href.slice(0, 60)}`);
    }
  }

  rows.push({ rel, primary, sales: salesFooter + salesOutside, isContact });
  if (problems.length) failures.push({ rel, problems });
}

if (failures.length) {
  for (const { rel, problems } of failures) {
    console.error(`✗ /${rel}`);
    for (const p of [...new Set(problems)]) console.error(`    ${p}`);
  }
  console.error(`\ncheck:contact: ${failures.length} of ${rows.length} pages fail.`);
  process.exit(1);
}

const byCount = rows.reduce((acc, r) => {
  const k = r.isContact ? `contact page (primary ${r.primary}, sales ${r.sales})` : `primary ${r.primary}, sales ${r.sales}`;
  acc[k] = (acc[k] ?? 0) + 1;
  return acc;
}, {});
for (const [k, n] of Object.entries(byCount)) console.log(`  ${String(n).padStart(4)} page(s): ${k}`);
console.log(`check:contact: ${rows.length} pages OK.`);
