// Post-build prerender: serves the built dist/ with Vite's preview server,
// renders each route in headless Chrome, and writes the fully-rendered HTML
// back over the static file. This makes the page's real content visible to
// non-JS crawlers (GPTBot, PerplexityBot, social scrapers) and to Google's
// first-pass indexer. The app then hydrates this markup in the browser
// (see src/main.jsx).
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const ROUTES = ['/']; // single-page site; add routes here if it grows

const server = await preview({ preview: { port: 4174, strictPort: false } });
const baseUrl =
  server.resolvedUrls?.local?.[0] ??
  `http://localhost:${server.config.preview.port}/`;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = new URL(route, baseUrl).href;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait until React has rendered the full page (booking section is near the end).
    await page.waitForSelector('#ticket', { timeout: 20000 });
    const html = '<!doctype html>\n' + (await page.content()).replace(/^<!DOCTYPE html>/i, '');

    const outPath =
      route === '/'
        ? resolve(DIST, 'index.html')
        : resolve(DIST, route.replace(/^\//, ''), 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf8');
    console.log(`prerendered ${route} -> ${outPath} (${html.length} bytes)`);
    await page.close();
  }
} finally {
  await browser.close();
  await server.httpServer.close();
}

// Ensure the process exits even if a handle is left open.
process.exit(0);
