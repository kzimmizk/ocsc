// @ts-check
import { defineConfig } from 'astro/config';

// Static site. Set `site` to the production URL once the domain is final;
// it enables correct absolute URLs for canonical links, sitemaps, and OG tags.
export default defineConfig({
  site: 'https://ouraysoccerclub.com',
  build: {
    // Emit /about/index.html style pages for clean URLs on Netlify.
    format: 'directory',
  },
});
