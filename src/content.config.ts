/**
 * Content collections (SPEC §4). Only the two the homepage needs exist so far;
 * products, categories, repair services and the rest are added with their content.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

export const collections = { reviews, clients };
