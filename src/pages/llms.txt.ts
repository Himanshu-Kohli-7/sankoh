/**
 * /llms.txt (SPEC §7): a plain-text summary for AI assistants, in the llmstxt.org format.
 * Built from site.ts and the content collections, so it states only confirmed facts (CLAUDE.md §4)
 * and cannot drift from the pages. `npm run check:claims` scans the built file; `check:contact`
 * allows the phone numbers here by path (it is not a page).
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, listAnd } from '../config/site';
import { categoryBlurbs, productGroups, repairGroups, serviceLinks, selectorHref, productsHref } from '../config/nav';
import { isPublished, productHref } from '../lib/content';

const abs = (path: string) => new URL(path, site.url).href;
const link = (label: string, href: string, note?: string) => `- [${label}](${abs(href)})${note ? `: ${note}` : ''}`;

export const GET: APIRoute = async () => {
  const { address, hours, service, brands } = site;
  const products = (await getCollection('products', isPublished)).sort(
    (a, b) => a.data.category.localeCompare(b.data.category) || a.data.order - b.data.order,
  );
  const partners = listAnd(brands.authorisedPartners);

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} manufactures (${brands.own.join(', ')}), supplies and sources industrial valves, valve automation and process instruments as an authorised partner of ${partners}, and repairs valves, actuators, positioners and VFDs of any make, on site or in its workshop. Based in ${address.locationWording}, serving buyers across India.`,
    '',
    '## Key facts',
    '',
    `- Address: ${address.oneLine}`,
    `- Service area: ${service.area}`,
    `- Own brand: ${brands.own.join(', ')}. Authorised partner of ${partners}`,
    `- Office hours: ${hours.display}. ${hours.closed}`,
    `- ${service.supportLine}`,
    `- Valve repair: ${service.repairScope.valves}`,
    `- VFD repair: ${service.repairScope.vfds} (${service.vfdBrands})`,
    `- ${service.onSiteRepair}, as well as workshop repair. ${service.repairTurnaround}`,
    `- Warranty: ${service.warranty.repairedValves}; ${service.warranty.repairedVfds}; ${service.warranty.newProducts}`,
    `- Also offers: ${service.alsoOffers.map((s) => s.charAt(0).toLowerCase() + s.slice(1)).join('; ')}`,
    `- Team: ${service.team}`,
    `- Applications: ${site.applications.join(', ')}`,
    '',
    '## Contact',
    '',
    `- Phone / WhatsApp: ${site.phone.display}`,
    `- ${site.salesPhone.label}: ${site.salesPhone.display}`,
    `- Email: ${site.email}`,
    link('Request a quote', '/request-a-quote/'),
    link('Contact page', '/contact/', 'address, map and office hours'),
    '',
    ...productGroups.flatMap((g) => [
      `## ${site.divisions[g.division].name}`,
      '',
      ...g.links.map((l) => link(l.label, l.href, categoryBlurbs[l.href])),
      '',
    ]),
    `## ${site.divisions.repair.name}`,
    '',
    ...repairGroups.flatMap((g) => [link(g.label, g.href, g.note), ...g.links.map((l) => link(l.label, l.href))]),
    link('Services overview', '/services/'),
    ...serviceLinks.map((l) => link(l.label, l.href)),
    '',
    '## Company',
    '',
    link('Home', '/'),
    link('All products', productsHref),
    link('Product selector', selectorHref, 'filter products by type, operation, media and application'),
    link('About', '/about/'),
    link('Brands', '/brands/', `${brands.own.join(', ')} and authorised partners`),
    '',
    '## Optional',
    '',
    ...products.map((p) => link(p.data.title, productHref(p), p.data.summary)),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
