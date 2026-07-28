// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/config/site.js';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  vite: {
    plugins: [tailwindcss()]
  }
});
