# CodeTalkers Operator Guide

Documentation for anyone who runs, changes, or deploys this site. For product
context see the root [README.md](../README.md).

## Guides

| Doc | Covers |
|-----|--------|
| [development.md](development.md) | Local setup, npm scripts, the lint + build gate, prerendering |
| [deployment.md](deployment.md) | Vercel static + serverless model, rewrites, the FastAPI function |
| [site-operations.md](site-operations.md) | Formspree lead capture, design-token rules, accessibility standards, the UX audit backlog |
| [icm-workflow.md](icm-workflow.md) | Making changes through the ICM agent harness (two-phase pipeline, verification, audit trails) |

## Repository map

```
index.html              Entry HTML — meta/OG/JSON-LD, font <link>, #root
src/                    React 19 app (components/, hooks/, styles/)
api/index.py            Serverless FastAPI function (Vercel Python runtime)
prerender.mjs           Post-build static prerender via headless Chrome
public/                 Static assets (logos, favicons, project images)
dist/                   Build output — generated, gitignored, never edit by hand
screenshots/            Local verification screenshots — gitignored
requirements.txt        Python deps for api/index.py (fastapi, uvicorn, pydantic)
vercel.json             Rewrite rules (see deployment.md)
UX_AUDIT.md             Prioritized UX/accessibility backlog (see site-operations.md)
```
