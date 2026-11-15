/**
 * Build-time map of every slug a quote link can carry (`?product=<slug>`) → the title the form prefills:
 * products, categories, services, the valve repair hub and every repair page (including `vfd-repair`).
 * The quote page prints it as JSON; `npm run check:links` fails if a link in dist/ uses a slug missing here.
 */
import { getCollection } from 'astro:content';

export async function quoteProductMap(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  const add = (slug: string, title: string) => {
    if (map[slug] && map[slug] !== title) throw new Error(`Quote slug "${slug}" is used by "${map[slug]}" and "${title}"`);
    map[slug] = title;
  };

  for (const p of await getCollection('products')) add(p.id.split('/').pop()!, p.data.title);
  for (const c of await getCollection('categories')) add(c.id, c.data.title);
  for (const s of await getCollection('services')) add(s.id, s.data.title);
  for (const h of await getCollection('repairHubs')) add(h.id, h.data.title);
  for (const r of await getCollection('repairServices')) add(r.id.split('/').pop()!, r.data.title);

  return Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
}
