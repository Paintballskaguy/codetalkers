# Development

## Setup

Requires Node.js (v20+ recommended).

```bash
npm install
npm run dev      # dev server at http://localhost:5173
```

## Scripts

| Command | Use |
|---------|-----|
| `npm run dev` | Local dev server with HMR |
| `npm run lint` | ESLint over the whole repo |
| `npm run build` | Production build to `dist/`, then prerender (see below) |
| `npm run preview` | Serve the production build locally |

## The lint + build gate

A change is not done until **both** pass cleanly:

```bash
npm run lint && npm run build
```

This is a hard guardrail, not a suggestion — it is also enforced by the ICM
verification workflow (see [icm-workflow.md](icm-workflow.md)).

## Prerendering

`npm run build` triggers `postbuild`, which runs `node prerender.mjs`. The
script starts a preview server, renders each route in headless Chrome
(puppeteer), scrolls through the sections to activate reveal animations, and
writes static HTML into `dist/`.

Prerendering is **intentionally non-fatal**: if headless Chrome is unavailable
(e.g. in a CI/Vercel build container), the script logs a warning and exits 0,
shipping the client-rendered SPA as a fallback. A prerender failure must never
break the deploy — do not "fix" this by making it fatal.

## Visual verification

When making visual changes, take before/after screenshots into `screenshots/`.
This folder is gitignored — it is local evidence for review, not a repo
artifact. Do not commit it.
