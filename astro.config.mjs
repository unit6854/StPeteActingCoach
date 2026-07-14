import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://stpeteactingcoach.com',
  // Static output — perfect for Netlify + Decap (git-based) CMS.
  output: 'static',
  trailingSlash: 'always',
  build: {
    // Emit clean, folder-style URLs.
    format: 'directory',
  },
  integrations: [
    sitemap({
      // Exclude the CMS admin and the noindex thank-you page.
      filter: (page) => !page.includes('/admin') && !page.includes('/thanks'),
    }),
  ],
});
