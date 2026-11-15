// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sankohtech.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Not in the sitemap: the styleguide, the 404 and the quote thank-you page (SPEC §7).
  integrations: [
    preact(),
    sitemap({ filter: (page) => !/^\/(styleguide|404|request-a-quote\/thank-you)\/?$/.test(new URL(page).pathname) }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
