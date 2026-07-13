import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://stpeteactingcoach.com',
  // Static output — perfect for Netlify + Decap (git-based) CMS.
  output: 'static',
  build: {
    // Emit clean, folder-style URLs.
    format: 'directory',
  },
});
