// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Used to build the sitemap, canonical URLs, and Open Graph tags.
  // NOTE: deploy/DNS for this domain is a separate, later checkpoint —
  // this value only matters for local URL-generation correctness right now.
  site: 'https://semantickc.com',

  // Plain static output on purpose: no CMS, no admin panel, no SSR.
  // SemanticKC's own site is maintained directly in the repo by
  // Sean + Claude Code, not handed to a non-technical client — see
  // Websites/_site-build-playbook.md for the contrasting EMI-KC pattern
  // this project deliberately deviates from.
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
  ],
});
