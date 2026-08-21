# Deployment

The site deploys on **Vercel** as a static build plus one serverless function.

## Build output

`npm run build` produces `dist/` (gitignored). Vercel serves it as static
files. `dist/` is generated — never edit it by hand, never commit it.

## Rewrites (`vercel.json`)

| Source | Destination | Purpose |
|--------|-------------|---------|
| `/api/(.*)` | `/api/index.py` | Serverless API (below) |
| `/(.*)` | `/` | SPA fallback — all other routes serve the app |

## The API function

`api/index.py` is a **FastAPI** app running on Vercel's Python runtime.
Dependencies are pinned in `requirements.txt` (`fastapi`, `uvicorn`,
`pydantic`).

Endpoints:

- `GET /api/health` — liveness check
- `POST /api/clarify` — code-snippet analysis returning annotated steps

CORS is currently open (`allow_origins=["*"]`) to simplify local development.
Tighten this before exposing the API beyond the site's own frontend.

## Prerender in CI

The post-build prerender (`prerender.mjs`) needs headless Chrome. If it is
unavailable in the build container, the script warns and exits 0 — the deploy
continues with the client-rendered SPA. See
[development.md](development.md#prerendering) for why this must stay non-fatal.

## Operational notes

- No environment variables are required for the static site.
- The Formspree endpoint is **not** configured here — it lives in source
  (`BookingTicket.jsx`). See [site-operations.md](site-operations.md).
