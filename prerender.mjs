// Post-build prerender: serves the built dist/ with Vite's preview server,
// renders each route in headless Chrome, and writes the fully-rendered HTML
// back over the static file. This makes the page's real content visible to
// non-JS crawlers (GPTBot, PerplexityBot, social scrapers) and to Google's
// first-pass indexer. The app then hydrates this markup in the browser
// (see src/main.jsx).
//
// DEPLOY-SAFE: any failure (e.g. headless Chrome unavailable in a CI/Vercel
// build container) is caught and the build continues, shipping the normal
// client-rendered SPA as a fallback. Prerendering never fails the deploy.
import { preview } from 'vite';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const ROUTES = ['/']; // single-page site; add routes here if it grows

let server;
let browser;

try {
  const puppeteer = (await import('puppeteer')).default;

  server = await preview({ preview: { port: 4174, strictPort: false } });
  const baseUrl =
    server.resolvedUrls?.local?.[0] ??
    `http://localhost:${server.config.preview.port}/`;

  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = new URL(route, baseUrl).href;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // Wait until React has rendered the full page (booking section is near the end).
    await page.waitForSelector('#ticket', { timeout: 20000 });
    const html =
      '<!doctype html>\n' + (await page.content()).replace(/^<!DOCTYPE html>/i, '');

    const outPath =
      route === '/'
        ? resolve(DIST, 'index.html')
        : resolve(DIST, route.replace(/^\//, ''), 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf8');
    console.log(`prerendered ${route} -> ${outPath} (${html.length} bytes)`);
    await page.close();
  }
  console.log('Prerender complete.');
} catch (err) {
  console.warn(
    '\n[prerender] WARNING: prerendering was skipped — shipping the client-rendered SPA as a fallback.'
  );
  console.warn('[prerender] Reason:', err?.message || err);
  console.warn(
    '[prerender] The site still works; crawlers will rely on JS rendering until this is resolved.\n'
  );
} finally {
  try {
    if (browser) await browser.close();
  } catch {
    /* ignore cleanup errors */
  }
  try {
    if (server) await server.httpServer.close();
  } catch {
    /* ignore cleanup errors */
  }
}

// Always exit 0 so a prerender failure never breaks the build/deploy.
process.exit(0);
