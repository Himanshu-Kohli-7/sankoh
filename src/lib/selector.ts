/**
 * Build-time index for the product selector (SPEC §6.2), from the products collection.
 *
 * Filters: type (category), operation, media, application. Material and size are not filters:
 * `typicalOptions` holds general prose ranges framed as "available to your specification", not
 * structured or stock data, so filtering on them would turn them into product claims.
 *
 * Application tags are the five applications the company names (site.applications). A product is
 * tagged only when its own `applications` list already says so, matched on whole words.
 */
import { getImage } from 'astro:assets';
import { productGroups, type DivisionKey } from '../config/nav';
import { site } from '../config/site';
import { categoryInfo, isPublished, productHref, productsIn, type Product } from './content';
import { placeholderPath } from './placeholder';

export interface SelectorOption {
  value: string;
  label: string;
  /** Type options only: which division group they sit in. */
  group?: string;
}

export interface SelectorItem {
  title: string;
  href: string;
  summary: string;
  type: string;
  typeLabel: string;
  division: DivisionKey;
  operation: string;
  media: string[];
  applications: string[];
  thumb?: { src: string; width: number; height: number; alt: string };
  /** Placeholder drawing path when there is no photo. */
  placeholder?: string;
}

export interface SelectorFilter {
  key: 'type' | 'operation' | 'media' | 'application';
  label: string;
  options: SelectorOption[];
}

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Whole-word rules for the company-named applications. "atm" never matches inside "treatment". */
const APPLICATION_RULES: Record<string, RegExp> = {
  'Water treatment': /\b(?:waste\s*)?water(?:\s+and\s+\w+)?\s+treatment\b/i,
  HVAC: /\bhvac\b/i,
  'Building automation': /\bbuilding\s+automation\b/i,
  'Industrial automation': /\bindustrial\s+automation\b/i,
  'Water/milk ATMs': /\b(?:water|milk)(?:\s*(?:\/|and|or)\s*(?:water|milk))?\s+atms?\b/i,
};

const OPERATIONS: SelectorOption[] = [
  { value: 'manual', label: 'Manual' },
  { value: 'self-acting', label: 'Self-acting' },
  { value: 'pneumatic', label: 'Pneumatic' },
  { value: 'electric', label: 'Electric' },
  { value: 'solenoid', label: 'Solenoid' },
];

export function applicationsOf(product: Product): string[] {
  const text = product.data.applications.join('\n');
  return site.applications.filter((app) => APPLICATION_RULES[app]?.test(text)).map(slugify);
}

export async function selectorData(): Promise<{ items: SelectorItem[]; filters: SelectorFilter[] }> {
  const items: SelectorItem[] = [];
  const typeOptions: SelectorOption[] = [];

  for (const group of productGroups) {
    for (const link of group.links) {
      const slug = link.href.split('/')[2];
      const info = categoryInfo(slug);
      typeOptions.push({ value: slug, label: info.label, group: group.label });
      for (const product of (await productsIn(slug)).filter(isPublished)) {
        const image = product.data.images[0];
        let thumb: SelectorItem['thumb'];
        if (image) {
          const img = await getImage({ src: image.src, width: 160, format: 'webp', quality: 70 });
          thumb = {
            src: img.src,
            width: Number(img.attributes.width ?? 160),
            height: Number(img.attributes.height ?? 120),
            alt: image.alt,
          };
        }
        items.push({
          title: product.data.title,
          href: productHref(product),
          summary: product.data.summary,
          type: slug,
          typeLabel: info.label,
          division: info.division,
          operation: product.data.operation,
          media: product.data.media.map(slugify),
          applications: applicationsOf(product),
          thumb,
          placeholder: thumb ? undefined : placeholderPath(info.division),
        });
      }
    }
  }

  const filters: SelectorFilter[] = [
    { key: 'type', label: 'Type', options: typeOptions },
    { key: 'operation', label: 'Operation', options: OPERATIONS },
    { key: 'media', label: 'Media', options: site.media.map((m) => ({ value: slugify(m), label: m })) },
    {
      key: 'application',
      label: 'Application',
      // A chip that would match nothing is left out.
      options: site.applications
        .map((a) => ({ value: slugify(a), label: a }))
        .filter((o) => items.some((i) => i.applications.includes(o.value))),
    },
  ];

  return { items, filters };
}
