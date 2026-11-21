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
  const { address, hours, service, brands, company } = site;
  const products = (await getCollection('products', isPublished)).sort(
    (a, b) => a.data.category.localeCompare(b.data.category) || a.data.order - b.data.order,
  );
  const partners = listAnd(brands.authorisedPartners);

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} manufactures ${brands.manufactured} under its own brand ${brands.own.join(', ')}, supplies automated valves and process instruments as an authorised partner of ${partners}, and repairs valves, actuators, positioners and VFDs of any make, on site or in its workshop. Based in ${address.locationWording}, serving buyers across India since ${company.foundingDisplay}.`,
    '',
    '## Key facts',
    '',
    `- Founded: ${company.foundingDisplay}`,
    `- Address: ${address.oneLine}`,
    `- Manufactures: ${brands.manufactured} only, under the ${brands.own.join(', ')} brand`,
    `- Authorised partner (traded, not manufactured): ${brands.authorisedPartners.map((n) => `${n} (${brands.partnerLines[n.split(' ')[0].toLowerCase()]})`).join('; ')}`,
    `- Calibration: ${service.calibrationScope.toLowerCase()}. Instruments are sold, never calibrated or repaired`,
    `- Clients: ${company.clientCount}`,
    `- Team: ${service.team}`,
    `- Valves supplied a year: ${company.valvesSuppliedPerYear}`,
    `- Valves repaired a year: ${service.repairsPerYear}`,
    `- ${company.udyam.number ? `Udyam registration: ${company.udyam.number}` : 'Udyam-registered'}`,
    `- Office hours: ${hours.display}. ${hours.closed}`,
    `- ${service.supportLine}`,
    `- Valve repair: ${service.repairScope.valves}. Makes include ${listAnd(service.repairedMakes)}`,
    `- VFD repair: ${service.repairScope.vfds} (${service.vfdBrands})`,
    `- ${service.onSiteRepair}, as well as workshop repair. ${service.repairTurnaround}`,
    `- Stock and lead times: ${service.stockNote} ${service.leadTimeRows.map((r) => `${r.key}: ${r.value.charAt(0).toLowerCase()}${r.value.slice(1)}`).join('. ')}`,
    `- Warranty: ${service.warranty.repairedValves}; ${service.warranty.repairedVfds}; ${service.warranty.newProducts}`,
    `- Supplied to: ${listAnd(service.supplyRegions)}, and all over India`,
    `- Site work: ${listAnd(service.siteWorkRegions)}; can be done anywhere in India`,
    `- Industries: ${company.industriesLine}`,
    `- Also offers: ${service.alsoOffers.map((s) => s.charAt(0).toLowerCase() + s.slice(1)).join('; ')}`,
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
    ...repairGroups.flatMap((g) => [link(g.label, g.href, g.note ?? (g.links.length ? undefined : service.vfdBrands)), ...g.links.map((l) => link(l.label, l.href))]),
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
