/**
 * Content collections (SPEC §4). Collections are added with their content:
 * brands, certifications and projects come in later phases.
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

/** A row of a spec-style table. */
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
      /**
       * General industry ranges for this product type (CLAUDE.md §2.2): sizes, materials, end connections,
       * pressure classes, output signals. Not a stock claim, and specific to the product: `check:repeats`
       * fails if two products carry the same table.
       */
      typicalOptions: z.array(specRow).default([]),
      /** Only variants confirmed by the company. */
      variants: z.array(specRow).default([]),
      /** Product ids, e.g. `manual-valves/gate-valve`. */
      relatedProducts: z.array(z.string()).default([]),
      /** Repair page hrefs, as listed in config/nav.ts. */
      relatedRepair: z.array(z.string()).default([]),
      faqs: z.array(faq).default([]),
      /** Enquiry checklist and spec line. Defaults by division; `accessory` for positioners, switch boxes, coils; `instrument-accessory` for siphons and thermowells; `analytical` for analyzers and their sensors. */
      enquiry: z.enum(['valve', 'instrument', 'accessory', 'instrument-accessory', 'analytical']).optional(),
      /** Internal note for a missing fact, never rendered. Mirror it in docs/PENDING.md. */
      todo: z.string().optional(),
    }),
});

/** A short link shown under "Replacing is the better call when" on a repair hub. */
const link = z.object({ label: z.string(), href: z.string() });

/** The valve repair hub (SPEC §5.3): /valve-repair/. VFD repair is a single page, not a hub. */
const repairHubs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/repair-hubs' }),
  schema: z.object({
    title: z.string(),
    h1: z.string(),
    ...seo,
    group: z.enum(['valve']),
    /** schema.org serviceType. */
    serviceType: z.string(),
    intro: z.string(),
    /** One line per subpage; `href` must match a link in config/nav.ts. */
    services: z.array(z.object({ href: z.string(), summary: z.string() })),
    repairVsReplace: z.object({
      intro: z.string(),
      repair: z.array(z.string()),
      replace: z.array(z.string()),
      /** Where to go instead of a repair. Only offers confirmed in CLAUDE.md §4. */
      links: z.array(link).default([]),
    }),
    whySankoh: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
    /** "What to send us" checklist: short labels, not prose. */
    whatToSend: z.array(z.string()).min(4),
    faqs: z.array(faq),
  }),
});

/**
 * Repair service pages (SPEC §5.4), one folder per group: `valve/ball-valve-repair.md` → /valve-repair/ball-valve-repair/,
 * `vfd/vfd-repair.md` → /vfd-repair/. The markdown body is "How the repair works", described in general terms only.
 */
const repairServices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/repair-services' }),
  schema: z.object({
    title: z.string(),
    ...seo,
    group: z.enum(['valve', 'vfd']),
    /** Answers the page's main question in 2–3 sentences; shown under the H1. */
    summary: z.string(),
    /** schema.org serviceType. */
    serviceType: z.string(),
    whatWeRepair: z.array(z.string()).min(3),
    commonFaults: z.array(z.object({ title: z.string(), text: z.string() })).min(3),
    /** Makes to name, from CLAUDE.md §4 only (VFDs: ABB, Danfoss "and all other makes"). Otherwise "any make". */
    brandsNote: z.string().optional(),
    /** "What to send us" checklist: short labels, not prose. */
    whatToSend: z.array(z.string()).min(4),
    faqs: z.array(faq).min(3),
    /** Product ids, e.g. `manual-valves/ball-valve-flanged-end`. Each must list this page in its `relatedRepair`. */
    relatedProducts: z.array(z.string()).max(4).default([]),
    /** False where the warranty term is not confirmed for this service (docs/PENDING.md): the page then states none. */
    warranty: z.boolean().default(true),
    /** Internal note, never rendered. Mirror it in docs/PENDING.md. */
    todo: z.string().optional(),
  }),
});

/**
 * Service pages (SPEC §2.1): `product-sourcing.md` → /services/product-sourcing/. Company facts come
 * from CLAUDE.md §4 only; how the work is done is described in general terms. The markdown body is the
 * main text under "How we work".
 */
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    ...seo,
    /** Order on the Services overview and in nav.ts. */
    order: z.number(),
    icon: z.string(),
    /** schema.org serviceType. */
    serviceType: z.string(),
    /** Answers the page's main question in 2–3 sentences; shown under the H1. */
    summary: z.string(),
    /** One line for the Services overview card. */
    cardSummary: z.string(),
    /** Short label for the page's main quote button, e.g. "Request sourcing". */
    ctaLabel: z.string().max(28).optional(),
    /** "What we do" list. */
    whatWeDo: z.array(z.string()).min(3),
    /** Short named sections, e.g. "Technical advice" on the advisory page. */
    sections: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    /** Process steps, drawn with ProcessSteps. */
    steps: z.array(z.object({ title: z.string(), text: z.string(), icon: z.string() })).min(3).max(5),
    /** "What to tell us" checklist: short labels, not prose. */
    whatToSend: z.array(z.string()).min(4),
    faqs: z.array(faq).min(3),
    /** Product ids, e.g. `manual-valves/gate-valve`. */
    relatedProducts: z.array(z.string()).max(4).default([]),
    /** Repair page hrefs, as listed in config/nav.ts. */
    relatedRepair: z.array(z.string()).default([]),
    /** Internal note, never rendered. Mirror it in docs/PENDING.md. */
    todo: z.string().optional(),
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
      group: z.enum(['valve', 'vfd']),
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

export const collections = { categories, products, repairHubs, repairServices, services, repairGallery, reviews, clients };
