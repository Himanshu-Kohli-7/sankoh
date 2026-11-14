/**
 * Content collections (SPEC §4). Collections are added with their content:
 * services, brands, certifications and projects come in later phases.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** The ten category slugs (SPEC §2.2). Also the folder names under content/products/. */
const categorySlugs = [
  'manual-valves',
  'pneumatic-actuated-valves',
  'electric-actuated-valves',
  'solenoid-valves',
  'valve-automation-accessories',
  'flow-meters',
  'pressure-instruments',
  'temperature-instruments',
  'level-instruments',
  'analytical-instruments',
] as const;

const faq = z.object({ question: z.string(), answer: z.string() });

/** Shared SEO fields. `seoTitle` is the part before " | Sankoh Technical Solutions". */
const seo = {
  seoTitle: z.string().max(60),
  metaDescription: z.string().min(120).max(155),
  updated: z.coerce.date(),
};

/** A row of a spec-style table. Confirmed data only (PENDING #13). */
const specRow = z.object({ label: z.string(), value: z.string() });

/** Product categories. The markdown body is the intro (SPEC §5.1). */
const categories = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/categories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      ...seo,
      division: z.enum(['valves', 'instruments']),
      order: z.number(),
      /** Icon name from components/Icon.astro. */
      icon: z.string(),
      /** One line for the hero spec panel: how these products are operated. General knowledge. */
      operationNote: z.string().optional(),
      heroImage: image().optional(),
      howToChoose: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      faqs: z.array(faq).default([]),
      /** Repair page hrefs, as listed in config/nav.ts. */
      relatedRepair: z.array(z.string()).default([]),
      /** From the company only; the table is hidden while empty. */
      commonlySupplied: z.array(specRow).default([]),
    }),
});

/**
 * Products, one folder per category. An entry with no markdown body is a stub:
 * it appears as a card but gets no page until its content is written.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: seo.seoTitle.optional(),
      metaDescription: seo.metaDescription.optional(),
      updated: seo.updated.optional(),
      category: z.enum(categorySlugs),
      order: z.number(),
      images: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      /** 1–2 sentences, used in cards and under the H1. */
      summary: z.string(),
      operation: z.enum(['manual', 'self-acting', 'pneumatic', 'electric', 'solenoid', 'n/a']),
      media: z.array(z.enum(['Air', 'Water', 'Oil', 'Gas', 'Chemicals', 'Steam'])).default([]),
      applications: z.array(z.string()).default([]),
      industries: z.array(z.string()).default([]),
      /** Only confirmed variants. */
      variants: z.array(specRow).default([]),
      /** Product ids, e.g. `manual-valves/gate-valve`. */
      relatedProducts: z.array(z.string()).default([]),
      /** Repair page hrefs, as listed in config/nav.ts. */
      relatedRepair: z.array(z.string()).default([]),
      faqs: z.array(faq).default([]),
      /** Internal note, never rendered. Mirror it in docs/PENDING.md. */
      todo: z.string().optional(),
    }),
});

/** The two repair hubs (SPEC §5.3): valve repair now, drive repair later. */
const repairHubs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/repair-hubs' }),
  schema: z.object({
    title: z.string(),
    h1: z.string(),
    ...seo,
    group: z.enum(['valve', 'drive']),
    /** schema.org serviceType. */
    serviceType: z.string(),
    intro: z.string(),
    /** One line per subpage; `href` must match a link in config/nav.ts. */
    services: z.array(z.object({ href: z.string(), summary: z.string() })),
    repairVsReplace: z.object({
      intro: z.string(),
      repair: z.array(z.string()),
      replace: z.array(z.string()),
    }),
    whySankoh: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
    faqs: z.array(faq),
  }),
});

/** Real repair photos only (CLAUDE.md §2.3). Empty until the company sends some; the gallery hides itself. */
const repairGallery = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/repair-gallery' }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string(),
      caption: z.string().optional(),
      group: z.enum(['valve', 'drive']),
      order: z.number(),
    }),
});

/** Client reviews, migrated verbatim from the legacy site (CLAUDE.md §4). */
const reviews = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/reviews' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      company: z.string(),
      quote: z.string(),
      logo: image().optional(),
      order: z.number(),
    }),
});

/** Clients whose logos we have permission to show (CLAUDE.md §4). */
const clients = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/clients' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image(),
      order: z.number(),
    }),
});

export const collections = { categories, products, repairHubs, repairGallery, reviews, clients };
