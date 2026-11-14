/** Build-time helpers for the products, categories and repair content. */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';
import { productGroups, repairGroups, type DivisionKey, type NavLink } from '../config/nav';

export type Product = CollectionEntry<'products'>;
export type Category = CollectionEntry<'categories'>;

const titleSuffix = ` | ${site.name}`;

/** `<Page> | Sankoh Technical Solutions`, shortened when that would pass 60 characters (SPEC §7). */
export const pageTitle = (name: string): string => {
  if ((name + titleSuffix).length <= 60) return name + titleSuffix;
  const short = `${name} | ${site.shortName}`;
  return short.length <= 60 ? short : name;
};

/** `manual-valves/gate-valve` → `gate-valve`. */
export const productSlug = (product: Product): string => product.id.split('/').pop()!;

export const categoryHref = (slug: string): string => `/products/${slug}/`;
export const productHref = (product: Product): string => `${categoryHref(product.data.category)}${productSlug(product)}/`;

/** A product with no body is a stub: shown as a card, but it has no page yet. */
export const isPublished = (product: Product): boolean => Boolean(product.body?.trim());

/** Link for a card: undefined while the product page does not exist. */
export const productLink = (product: Product): string | undefined =>
  isPublished(product) ? productHref(product) : undefined;

export async function productsIn(category: string): Promise<Product[]> {
  const all = await getCollection('products', (p) => p.data.category === category);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function productsById(ids: string[]): Promise<Product[]> {
  const found = await Promise.all(ids.map((id) => getEntry('products', id)));
  return found.filter((p): p is Product => Boolean(p));
}

/** Name, division and icon of a category, from the nav (which lists all ten even before their content exists). */
export function categoryInfo(slug: string): { label: string; division: DivisionKey; icon: string; href: string } {
  for (const group of productGroups) {
    const link = group.links.find((l) => l.href === categoryHref(slug));
    if (link) return { label: link.label, division: group.division, icon: link.icon ?? 'valve', href: link.href };
  }
  throw new Error(`Unknown category "${slug}": add it to config/nav.ts`);
}

/** Repair pages by href, in the order given. Unknown hrefs fail the build rather than ship a dead link. */
export function repairLinks(hrefs: string[]): NavLink[] {
  const all = repairGroups.flatMap((g) => g.links);
  return hrefs.map((href) => {
    const link = all.find((l) => l.href === href);
    if (!link) throw new Error(`Unknown repair page "${href}": add it to config/nav.ts`);
    return link;
  });
}
