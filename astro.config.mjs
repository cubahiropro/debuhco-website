// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site. Change SITE/BASE when moving to a custom domain.
const SITE = 'https://cubahiropro.github.io';
const BASE = '/debuhco-website';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
