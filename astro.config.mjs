// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { gitLastmod } from './scripts/lastmod.mjs';

/** Not in the sitemap: the styleguide, the 404 and the quote form's /thank-you/ page (SPEC §7; all noindex). */
const NOT_IN_SITEMAP = /^\/(styleguide|404|thank-you)\/?$/;
const lastmod = gitLastmod();

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sankohtech.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    preact(),
    sitemap({
      filter: (page) => !NOT_IN_SITEMAP.test(new URL(page).pathname),
      // lastmod only from real git history; left out in a shallow clone (scripts/lastmod.mjs).
      serialize: (item) => {
        const date = lastmod?.(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
    {
      name: 'sitemap-lastmod-report',
      hooks: { 'astro:build:done': () => lastmod?.report() },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
