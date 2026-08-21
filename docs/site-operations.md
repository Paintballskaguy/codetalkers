# Site Operations

## Lead capture (Formspree)

The booking form (`src/components/landing/BookingTicket.jsx`) POSTs to
Formspree. The endpoint is the `FORMSPREE_ENDPOINT` constant at the top of
that file:

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';
```

To activate lead capture:

1. Create a form in the Formspree dashboard and set the destination email.
2. Replace `your-form-id` with the real form ID.
3. Rebuild and redeploy.

Until a real endpoint is set, form submissions **will fail** — this is
expected. Never commit a production Formspree ID anywhere else (audit logs,
docs, stage outputs); the constant in `BookingTicket.jsx` is the single
source of truth.

## Design tokens and CSS

Styling is layered plain CSS with a strict load order:

```
tokens.css → base.css → themes.css → components.css → animations.css → landing.css → utilities.css
```

Rules:

- Change values at the **lowest** layer that expresses them (usually
  `tokens.css`), not by overriding downstream.
- No hardcoded hex colors in component styles — use `hsl(var(--token-name))`.
  The brand lime `#ccff00` lives in `--accent-primary` / `--border-accent`.
- Font families are declared in `tokens.css` (`--font-sans`, `--font-display`,
  `--font-mono`) and loaded via the Google Fonts `<link>` in `index.html`.
  **Keep the two in sync** — a stack referencing a font that isn't loaded
  silently falls back.
- Do not introduce UI frameworks or CSS-in-JS. This is an explicit
  architectural guardrail.

## Accessibility standards

Active, non-negotiable guardrails:

- **Contrast:** WCAG AA — 4.5:1 minimum for text. Current tokens:
  `--text-secondary` ≈ 8:1, `--text-muted` ≈ 6:1 on the dark base.
- **Touch targets:** minimum 44×44px on interactive elements (buttons, slider
  thumbs, vote buttons).
- **Motion:** everything animated must respect `prefers-reduced-motion`,
  either via the `useReducedMotion` hook or the reduced-motion block in
  `animations.css` (new animation classes must be added to that block).

## The UX audit backlog

`UX_AUDIT.md` (repo root) is the prioritized findings list (accessibility,
touch, performance, style, layout, typography, animation, forms). Work it
top-down by priority. When you close a finding, verify against the original
recommendation — several past fixes (slider `aria-value*`, 44px vote buttons,
token-based disabled states) came straight from this list.
