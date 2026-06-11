# CodeTalkers

Marketing site for **CodeTalkers** — a family-owned web design and full-stack
development agency in Oklahoma, building custom React / Vite / FastAPI platforms
for small businesses.

Single-page landing site built with **React 19** and **Vite 8**.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
index.html                  Entry HTML — meta/OG/JSON-LD, font <link>, #root
src/
  main.jsx                  React root
  App.jsx                   Skip link, grain overlay, mounts LandingPage
  components/
    LandingPage.jsx         Section composition + scroll/active-section observers
    Icon.jsx                Inline-SVG icon set (currentColor)
    landing/                Header, Hero, KineticTicker, BentoFeatures,
                            PortfolioGrid, Stats, Testimonials, ROICalculator,
                            BookingTicket, Footer
  hooks/
    useReducedMotion.js     Tracks prefers-reduced-motion
  styles/                   tokens → base → themes → components → animations
                            → landing → utilities (layered, plain CSS)
public/                     Logos, favicons, project images, robots, sitemap
```

## Lead capture

The booking form (`BookingTicket.jsx`) POSTs to **Formspree**. Set your endpoint
in the `FORMSPREE_ENDPOINT` constant at the top of that file
(`https://formspree.io/f/your-form-id`) and configure the destination email in
the Formspree dashboard. Until a real endpoint is set, submissions will fail.

## Deployment

Static build deployed on Vercel.
