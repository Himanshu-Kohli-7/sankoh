/**
 * The applications the company names (site.applications, CLAUDE.md §4), as the one list the
 * home page reads. Names come from site.ts; this file only adds the slug, the icon and, once an
 * industry page exists (src/content/industries/, phase 2, CLAUDE.md §8), its URL. With an
 * `industryHref` the chip links to that page; without one it opens the product selector
 * filtered to the application, or stays a plain label when no product is tagged with it.
 */
import { site } from './site';

export interface Application {
  name: string;
  /** Same slug as the selector's `#application=` filter (lib/selector.ts slugify). */
  slug: string;
  /** Name of an icon in components/Icon.astro. */
  icon: string;
  /** Industry page URL, set when the page is published. */
  industryHref?: string;
}

const icons: Record<string, string> = {
  'Water treatment': 'water',
  HVAC: 'fan',
  'Building automation': 'building',
  'Industrial automation': 'factory',
  'Water/milk ATMs': 'dispenser',
};

/** Industry pages by application name. Empty until phase 2. */
const industryPages: Record<string, string> = {};

const slugify = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const applications: Application[] = site.applications.map((name) => ({
  name,
  slug: slugify(name),
  icon: icons[name] ?? 'valve',
  industryHref: industryPages[name],
}));
