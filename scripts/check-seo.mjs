#!/usr/bin/env node
/**
 * SEO check over the built site (dist/). Run after `npm run build`: `npm run check:seo`.
 * SPEC §7. No dependencies: the HTML is our own build output, so regexes are enough.
 *
 * Errors (exit 1):
 * - JSON-LD that does not parse
 * - Organization/LocalBusiness: not exactly one node per page, a second node with that type, the wrong
 *   @id, or an `{ "@id": … }` reference that points at no node on the page
 * - Product with offers, price, brand, ratings or reviews; Service with a price; WebSite with a SearchAction
 * - more than one FAQPage on a page, or an FAQ question that is not visible on the page
 * - BreadcrumbList missing on an inner page, positions out of order, or items that are not canonical URLs
 * - missing or duplicate <title> / meta description
 * - not exactly one <h1>
 * - canonical missing, not absolute https://www. with a trailing slash, or not the page's own URL
 * - missing Open Graph / Twitter tags
 * - sitemap and noindex out of step (an indexable page missing from the sitemap, or a sitemap URL that
 *   is noindex or does not exist)
 * - robots.txt without the sitemap, or a missing llms.txt
 *
 * Warnings (printed, exit 0): title over 60 characters, description outside 120–155 characters.
 * Copy is not rewritten to clear warnings; that is a separate decision.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://www.sankohtech.com';
const ORG_ID = `${ORIGIN}/#organization`;
const ORG_TYPES = new Set(['Organization', 'LocalBusiness']);
const FORBIDDEN = {
  Product: ['offers', 'price', 'priceCurrency', 'priceRange', 'brand', 'aggregateRating', 'review', 'reviews'],
  Service: ['offers', 'price', 'priceCurrency', 'priceRange', 'priceSpecification', 'aggregateRating', 'review'],
  WebSite: ['potentialAction'],
};
const OG_REQUIRED = ['og:type', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt'];
const TWITTER_REQUIRED = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];

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

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Attributes of every <meta>/<link> tag in the head, as plain objects. */
function tags(head, name) {
  return [...head.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map(([, attrs]) =>
    Object.fromEntries([...attrs.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, k, v]) => [k.toLowerCase(), decode(v)])),
  );
}

const typesOf = (node) => [node['@type']].flat().filter(Boolean);

/** Every object in a JSON-LD tree. */
function* objects(value) {
  if (Array.isArray(value)) for (const v of value) yield* objects(v);
  else if (value && typeof value === 'object') {
    yield value;
    for (const v of Object.values(value)) yield* objects(v);
  }
}

const urlOf = (rel) => {
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}`;
};

// Sitemap URLs
const sitemapUrls = new Set();
for (const f of fs.readdirSync(DIST).filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
  for (const [, loc] of fs.readFileSync(path.join(DIST, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(loc);
}

const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const pages = new Map();
const err = (url, msg) => errors.push(`${url}  ${msg}`);

for (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const url = urlOf(rel);
  const html = fs.readFileSync(file, 'utf8');
  const head = (html.match(/<head\b[\s\S]*?<\/head>/i) ?? [''])[0];
  const body = html.slice(head.length);
  const metas = tags(head, 'meta');
  const meta = (key) => metas.filter((m) => m.name === key || m.property === key).map((m) => m.content);
  const robots = meta('robots').join(',');
  const noindex = /noindex/i.test(robots);
  pages.set(`${ORIGIN}${url}`, { noindex });

  // Title and description
  const titleTags = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map(([, t]) => decode(t).trim());
  const descs = meta('description');
  if (titleTags.length !== 1 || !titleTags[0]) err(url, `needs exactly one non-empty <title> (found ${titleTags.length})`);
  if (descs.length !== 1 || !descs[0]) err(url, `needs exactly one meta description (found ${descs.length})`);
  const title = titleTags[0] ?? '';
  const desc = descs[0] ?? '';
  if (!noindex) {
    if (title) titles.set(title, [...(titles.get(title) ?? []), url]);
    if (desc) descriptions.set(desc, [...(descriptions.get(desc) ?? []), url]);
    if (title.length > 60) warnings.push(`${url}  title ${title.length} chars (max 60): "${title}"`);
    if (desc && (desc.length < 120 || desc.length > 155)) warnings.push(`${url}  description ${desc.length} chars (120–155)`);
  }

  // H1
  const h1s = (body.match(/<h1\b/gi) ?? []).length;
  if (h1s !== 1) err(url, `has ${h1s} <h1> elements (needs 1)`);

  // Canonical
  const canonicals = tags(head, 'link').filter((l) => l.rel === 'canonical').map((l) => l.href);
  const self = `${ORIGIN}${url}`;
  if (!noindex) {
    if (canonicals.length !== 1) err(url, `needs exactly one canonical (found ${canonicals.length})`);
    else if (!/^https:\/\/www\.sankohtech\.com\/(?:[a-z0-9-]+\/)*$/.test(canonicals[0])) err(url, `canonical not absolute www with trailing slash: ${canonicals[0]}`);
    else if (canonicals[0] !== self) err(url, `canonical ${canonicals[0]} is not the page's own URL`);
  }

  // Open Graph / Twitter
  for (const key of [...OG_REQUIRED, ...TWITTER_REQUIRED]) {
    const v = meta(key);
    if (v.length !== 1 || !v[0]) err(url, `needs one ${key} (found ${v.length})`);
  }
  for (const key of ['og:image', 'twitter:image']) {
    const v = meta(key)[0];
    if (v && !v.startsWith(`${ORIGIN}/`)) err(url, `${key} must be absolute on ${ORIGIN}: ${v}`);
  }
  if (!noindex && meta('og:url')[0] && meta('og:url')[0] !== self) err(url, `og:url ${meta('og:url')[0]} is not the page URL`);
  if (meta('twitter:card')[0] && meta('twitter:card')[0] !== 'summary_large_image') err(url, 'twitter:card should be summary_large_image');

  // JSON-LD
  const nodes = [];
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch (e) {
      err(url, `JSON-LD does not parse: ${e.message}`);
      continue;
    }
    if (data['@context'] !== 'https://schema.org') err(url, `JSON-LD @context is ${data['@context']}`);
    nodes.push(...(data['@graph'] ?? [data]));
  }
  const all = [...objects(nodes)];
  const defined = new Set(all.filter((o) => o['@id'] && Object.keys(o).length > 1).map((o) => o['@id']));
  const orgs = all.filter((o) => typesOf(o).some((t) => ORG_TYPES.has(t)));
  if (orgs.length !== 1) err(url, `has ${orgs.length} Organization/LocalBusiness nodes (needs 1)`);
  else if (orgs[0]['@id'] !== ORG_ID) err(url, `Organization @id is ${orgs[0]['@id']} (needs ${ORG_ID})`);
  for (const o of all) {
    if (o['@id'] && Object.keys(o).length === 1 && !defined.has(o['@id'])) err(url, `@id reference ${o['@id']} points at no node on the page`);
    for (const t of typesOf(o)) {
      for (const key of FORBIDDEN[t] ?? []) if (key in o) err(url, `${t} must not have "${key}"`);
    }
  }
  const byType = (t) => all.filter((o) => typesOf(o).includes(t));
  for (const t of ['Product', 'Service']) {
    for (const o of byType(t)) {
      if (o.provider && o.provider['@id'] !== ORG_ID) err(url, `${t} provider is not the organisation @id`);
      if (o.url && o.url !== self) err(url, `${t} url ${o.url} is not the page URL`);
    }
  }
  const faqs = byType('FAQPage');
  if (faqs.length > 1) err(url, `has ${faqs.length} FAQPage nodes (max 1)`);
  const summaries = new Set([...body.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi)].map(([, s]) => text(s)));
  for (const q of faqs.flatMap((f) => f.mainEntity ?? [])) {
    if (!summaries.has(q.name)) err(url, `FAQ question not visible on the page: "${q.name}"`);
    if (!q.acceptedAnswer?.text) err(url, `FAQ question has no answer: "${q.name}"`);
  }
  const crumbs = byType('BreadcrumbList');
  if (url !== '/' && !noindex && crumbs.length !== 1) err(url, `needs one BreadcrumbList (found ${crumbs.length})`);
  for (const list of crumbs) {
    const items = list.itemListElement ?? [];
    items.forEach((it, i) => {
      if (it.position !== i + 1) err(url, `breadcrumb ${i + 1} has position ${it.position}`);
      if (!/^https:\/\/www\.sankohtech\.com\/(?:[a-z0-9-]+\/)*$/.test(it.item ?? '')) err(url, `breadcrumb item is not a canonical URL: ${it.item}`);
    });
    if (items.length && items.at(-1).item !== self) err(url, 'last breadcrumb is not the page itself');
  }
  if (url === '/' && byType('WebSite').length !== 1) err(url, 'home needs one WebSite node');
}

for (const [map, label] of [[titles, 'title'], [descriptions, 'description']]) {
  for (const [value, urls] of map) if (urls.length > 1) errors.push(`duplicate ${label} on ${urls.join(', ')}: "${value.slice(0, 80)}"`);
}

// Sitemap ↔ noindex
for (const [url, { noindex }] of pages) {
  if (!noindex && !sitemapUrls.has(url)) errors.push(`${url}  indexable but missing from the sitemap`);
}
for (const url of sitemapUrls) {
  const page = pages.get(url);
  if (!page) errors.push(`${url}  in the sitemap but not built`);
  else if (page.noindex) errors.push(`${url}  in the sitemap but noindex`);
}

// robots.txt and llms.txt
const robots = fs.existsSync(path.join(DIST, 'robots.txt')) ? fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap-index.xml`)) errors.push('robots.txt does not name the sitemap');
if (!fs.existsSync(path.join(DIST, 'llms.txt'))) errors.push('llms.txt missing');

if (warnings.length) {
  console.log(`Warnings (${warnings.length}), not fixed in this phase:`);
  for (const w of warnings) console.log(`  ! ${w}`);
  console.log('');
}
if (errors.length) {
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error(`\ncheck:seo: ${errors.length} error(s) in ${pages.size} pages (${sitemapUrls.size} in the sitemap).`);
  process.exit(1);
}
console.log(`check:seo: ${pages.size} pages OK, ${sitemapUrls.size} in the sitemap, ${warnings.length} warning(s).`);
