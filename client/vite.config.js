import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/lib/seo.js';
import { VENUE_LIST } from './src/lib/venues.js';

const STATIC_ROUTES = ['/', '/kontakt', ...VENUE_LIST.map((v) => `/${v.slug}`)];

function buildSitemap() {
  const urls = STATIC_ROUTES.map(
    (route) => `  <url><loc>${SITE_URL}${route}</loc></url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    dirStyle: 'nested',
    concurrency: 1,
    onFinished(dir) {
      writeFileSync(join(dir, 'sitemap.xml'), buildSitemap());
    },
  },
});
