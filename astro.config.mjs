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
  integrations: [preact(), sitemap({ filter: (page) => !page.includes('/styleguide/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
