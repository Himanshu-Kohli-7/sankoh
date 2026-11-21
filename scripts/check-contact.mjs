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
 * 5. Non-HTML text output (.txt, .xml, .json, .webmanifest) never carries either number, except the
 *    files listed in TEXT_EXEMPT, by exact path. /llms.txt is exempt by decision (17 Nov 2026): it is a
 *    summary for AI assistants, not a page, and must list the primary number as "Phone / WhatsApp"
 *    and the sales line as "Sales", each exactly once and nowhere else in the file.
 * 6. Breakdown support wording (CLAUDE.md §2.5): "breakdown support" appears at most 3 times in a page's
 *    visible text: (1) the header strip, (2) one contextual spot (home repair fact tile, repair / VFD /
 *    service page, Contact card), (3) the footer. Left out of the count: the mobile menu's copy of the header
 *    strip (`data-support-menu`, the same item as the strip) and FAQ blocks (`data-faq`, where an answer may
 *    state the fact when the question is about it).
 * 7. "7-day breakdown" appears nowhere in dist/ (any file, any attribute): it reads as a 7-day turnaround.
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
/** The support-line phrase (both the label and the full sentence contain it) and its per-page cap. */
const SUPPORT_RE = /breakdown support/gi;
const MAX_SUPPORT = 3;
/** Banned everywhere in dist/. */
const OLD_SUPPORT_RE = /7-day breakdown/i;
/** Non-HTML files allowed to carry the numbers, by path relative to dist/, with the exact lines required. */
const TEXT_EXEMPT = {
  'llms.txt': [/^- Phone \/ WhatsApp: \+91 98884 91527$/m, /^- Sales: \+91 98779 38373$/m],
};
const TEXT_FILE = /\.(txt|xml|json|webmanifest)$/;

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found: run `npm run build` first.');
  process.exit(1);
}

function walk(dir, test = (name) => name.endsWith('.html'), out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, test, out);
    else if (test(name)) out.push(p);
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

  const support = count(textOf(removeMarked(removeMarked(html, 'data-support-menu'), 'data-faq')), SUPPORT_RE);
  if (support > MAX_SUPPORT) {
    problems.push(`"breakdown support" shown ${support}× (max ${MAX_SUPPORT}: header strip, one contextual spot, footer)`);
  }
  if (OLD_SUPPORT_RE.test(raw)) problems.push('"7-day breakdown" is banned: use site.service.supportLineShort or supportLine');

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

  rows.push({ rel, primary, sales: salesFooter + salesOutside, isContact, support });
  if (problems.length) failures.push({ rel, problems });
}

// Non-HTML text output
let textFiles = 0;
for (const file of walk(DIST, (name) => TEXT_FILE.test(name))) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const raw = fs.readFileSync(file, 'utf8');
  const primary = count(raw, PRIMARY_RE);
  const sales = count(raw, SALES_RE);
  textFiles++;
  if (OLD_SUPPORT_RE.test(raw)) failures.push({ rel, problems: ['"7-day breakdown" is banned: use site.service.supportLineShort or supportLine'] });
  const exempt = TEXT_EXEMPT[rel];
  if (!exempt) {
    if (primary || sales) failures.push({ rel, problems: [`number in a non-HTML file (primary ${primary}, sales ${sales}); only ${Object.keys(TEXT_EXEMPT).join(', ')} may carry it`] });
    continue;
  }
  const problems = exempt.filter((re) => !re.test(raw)).map((re) => `missing the required line ${re}`);
  if (primary !== 1) problems.push(`primary number ${primary}× (needs exactly 1, on the "Phone / WhatsApp" line)`);
  if (sales !== 1) problems.push(`sales number ${sales}× (needs exactly 1, on the "Sales" line)`);
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
console.log(`  "breakdown support": at most ${Math.max(...rows.map((r) => r.support))} per page (max ${MAX_SUPPORT})`);
console.log(`check:contact: ${rows.length} pages OK; ${textFiles} text files OK (exempt by path: ${Object.keys(TEXT_EXEMPT).join(', ')}).`);
