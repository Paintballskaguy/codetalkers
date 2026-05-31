# CodeTalkers Landing Page — Full UX Audit Report

**Audited with:** ui-ux-pro-max skill priority framework (1→10)  
**Date:** 2026-05-31  
**Scope:** React + Vite landing page (`src/components/landing/*`, `src/styles/*`, `index.html`)

---

## Executive Summary

| Priority | Category | Issues Found | Severity |
|----------|----------|-------------|----------|
| 1 | Accessibility | 6 | 2 Critical, 4 High |
| 2 | Touch & Interaction | 4 | 1 Critical, 3 High |
| 3 | Performance | 5 | 2 High, 3 Medium |
| 4 | Style Selection | 4 | 2 High, 2 Medium |
| 5 | Layout & Responsive | 4 | 1 High, 3 Medium |
| 6 | Typography & Color | 5 | 1 High, 4 Medium |
| 7 | Animation | 3 | 3 Medium |
| 8 | Forms & Feedback | 5 | 1 High, 4 Medium |
| 9 | Navigation Patterns | 4 | 2 High, 2 Medium |
| 10 | Charts & Data | 0 | — |

**Total: 40 findings** — 3 Critical, 16 High, 21 Medium  
**Strengths:** Good reduced-motion support, visible focus rings, skip link, semantic HTML, lazy-loading on below-fold images.

---

## Priority 1: Accessibility (CRITICAL)

### 🔴 A11Y-1: Emoji Used as Structural Icon
**File:** `BookingTicket.jsx` (lines 47, 131)  
**Rule:** `no-emoji-icons`  
**Issue:** The ticket emoji (`&#127915;`) is used as a decorative/structural element inside the form title and submit button. Even with `aria-hidden="true"`, emojis render inconsistently across platforms and cannot be styled via design tokens.
**Fix:** Replace with an SVG ticket icon from the existing `Icon` component set.

### 🔴 A11Y-2: Hardcoded Hex Colors Break Theming
**Files:** `ROICalculator.jsx`, `landing.css`, `themes.css`, `components.css` (40+ occurrences)  
**Rule:** `color-semantic`  
**Issue:** Raw `#ccff00` is scattered across components and styles. This breaks dark-mode consistency, makes global color changes error-prone, and prevents token-driven theming.
**Fix:** Replace all `#ccff00` with `hsl(var(--accent-lime))` or a dedicated CSS custom property.

### 🟠 A11Y-3: Missing `aria-live` on Dynamic Calculator Results
**File:** `ROICalculator.jsx` (lines 72-91)  
**Rule:** `aria-live-errors`, `voiceover-sr`  
**Issue:** As users drag the sliders, the projected revenue, booking boost, and modernization score update instantly. Screen-reader users receive no announcement of these changes.
**Fix:** Wrap the results container in `<div aria-live="polite" aria-atomic="true">`.

### 🟠 A11Y-4: Portfolio Card Cursor Mismatch
**File:** `PortfolioGrid.jsx` (line 37), `landing.css` (line 527)  
**Rule:** `cursor-pointer`  
**Issue:** The `<article>` has `cursor: pointer`, but only the inner `<a>` wrapping the image is actually clickable. Users may try to click the title or card body and get no response.
**Fix:** Move `cursor: pointer` to the `<a>` element, or make the entire card a link.

### 🟠 A11Y-5: Squad Bio Text Contrast Failure
**File:** `landing.css` (line 470)  
**Rule:** `color-contrast`  
**Issue:** `.squad-member > p` uses `hsl(var(--text-muted))` (35% lightness) on a background of roughly 4% lightness. Estimated contrast ratio: ~2.4:1, failing WCAG AA (4.5:1) for 12px body text.
**Fix:** Lighten `--text-muted` to ~50% lightness, or darken the squad-member background.

### 🟠 A11Y-6: Focus Ring Color on Lime Elements
**File:** `base.css` (lines 21-31)  
**Rule:** `focus-states`  
**Issue:** The focus ring uses `hsl(var(--accent-violet))`, which currently resolves to lime (#ccff00). On elements that are already lime (buttons, badges), the focus ring will be invisible or nearly invisible.
**Fix:** Use a contrasting focus color (e.g., white with 2px offset) on lime-background elements, or ensure `outline-offset` is sufficient.

---

## Priority 2: Touch & Interaction (CRITICAL)

### 🔴 TCH-1: Range Slider Thumb Below Minimum Touch Target
**File:** `utilities.css` (lines 95-110)  
**Rule:** `touch-target-size`  
**Issue:** The custom ROI slider thumb is `20px × 20px`. iOS HIG requires 44×44pt; Material requires 48×48dp.
**Fix:** Expand the hit area via padding or a larger transparent pseudo-element. Minimum 44×44px effective tap area.

### 🟠 TCH-2: Hover-Only Portfolio Affordances
**File:** `PortfolioGrid.jsx`, `landing.css` (lines 529-544)  
**Rule:** `hover-vs-tap`  
**Issue:** The arrow icon, overlay fade, and title color change only appear on `:hover`. Touch users never see these affordances, making the cards feel static and hiding the "clickable" signal.
**Fix:** Always show the arrow on mobile, or use `@media (hover: hover)` to gate hover effects and provide permanent tap affordances.

### 🟠 TCH-3: Vote Button Touch Target Too Small
**File:** `components.css` (lines 284-305)  
**Rule:** `touch-target-size`  
**Issue:** `.vote-btn` has only `padding: 4px` with no min-width/height. If rendered at typical text size, the tap area is roughly 20×20px.
**Fix:** Add `min-width: 44px; min-height: 44px;` and center content.

### 🟠 TCH-4: Disabled Ticket Button Lacks Visual Clarity
**File:** `landing.css` (lines 861-864)  
**Rule:** `disabled-states`  
**Issue:** Disabled state uses `background: #777` but text/icon remain at full opacity. The contrast between enabled and disabled is subtle.
**Fix:** Reduce opacity to 0.38–0.5, change text color to muted, and add `opacity: 0.5` to the entire button.

---

## Priority 3: Performance (HIGH)

### 🟠 PERF-1: Google Fonts Loaded Without `font-display`
**File:** `tokens.css` (line 1)  
**Rule:** `font-loading`  
**Issue:** The `@import` URL does not append `&display=swap`. This causes Flash of Invisible Text (FOIT) on slow connections.
**Fix:** Change import to:  
`@import url('https://fonts.googleapis.com/css2?family=...&display=swap');`

### 🟠 PERF-2: Hero Blur Filters on CPU
**File:** `landing.css` (lines 5-27)  
**Rule:** `main-thread-budget`  
**Issue:** `.hero-blur` uses `filter: blur(100px)` on large 600×500px divs with opacity animation. Blur filters are expensive to composite and can cause frame drops on lower-end devices.
**Fix:** Replace with pre-blurred PNG/WebP assets, or add `will-change: transform; transform: translateZ(0);` to promote to a GPU layer. Consider removing the blur on mobile.

### 🟡 PERF-3: No Responsive Images (srcset)
**File:** `PortfolioGrid.jsx` (lines 46-53)  
**Rule:** `image-optimization`  
**Issue:** Portfolio images load a single 600×450 source regardless of viewport size or DPR.
**Fix:** Provide `srcset` with 1x/2x variants, or use a responsive image service.

### 🟡 PERF-4: No Inline Critical CSS
**File:** `index.html`  
**Rule:** `critical-css`  
**Issue:** All styles load through the JS module graph. The above-fold hero text may render unstyled briefly.
**Fix:** Inline critical above-fold styles (body background, hero typography, header) in `index.html` `<style>`.

### 🟡 PERF-5: Ticker Animation Runs on Main Thread Continuously
**File:** `themes.css` (lines 115-125)  
**Rule:** `main-thread-budget`  
**Issue:** The kinetic ticker uses CSS `@keyframes` with `translateX`, which is composited but still consumes GPU memory and power.
**Fix:** Acceptable for a single element, but pause the animation when the ticker is off-screen using Intersection Observer.

---

## Priority 4: Style Selection (HIGH)

### 🟠 STYLE-1: All Semantic Accents Map to Identical Color
**File:** `tokens.css` (lines 22-25)  
**Rule:** `color-semantic`  
**Issue:** `--accent-violet`, `--accent-pink`, `--accent-emerald`, `--accent-amber` all resolve to `78 100% 50%` (lime). This removes semantic meaning from the token system.
**Fix:** Assign distinct HSL values per token, or consolidate to a single `--accent-primary` token.

### 🟠 STYLE-2: Step Badge Variants Are Visually Identical
**File:** `components.css` (lines 230-233)  
**Rule:** `color-not-decorative-only`  
**Issue:** `step-badge-info`, `step-badge-success`, `step-badge-warning`, and `step-badge-tip` all use the exact same lime styling. Users cannot distinguish information types by color.
**Fix:** Assign unique colors: info = blue, success = green, warning = amber/orange, tip = lime.

### 🟡 STYLE-3: Mixed Design Language
**Files:** Multiple  
**Rule:** `style-match`, `consistency`  
**Issue:** The page mixes brutalist buttons (`btn-brutal`), glassmorphic panels (`glass-panel`), skeuomorphic tickets (perforated stub), and minimalist layout. While intentional, the transitions between these styles feel abrupt without unifying elements.
**Fix:** Ensure at least one common thread ties them together (e.g., consistent border-radius scale, shared accent color, or unified shadow language). Currently the radius jumps from 0 (badge-flat) to 4px (inputs) to 8px (squad) to 10px (inputs) to 16px (glass) to 24px (cards) to 9999px (buttons).

### 🟡 STYLE-4: Raw Hex in `getScoreColor`
**File:** `ROICalculator.jsx` (lines 8-13)  
**Rule:** `color-semantic`  
**Issue:** The modernization score color function returns raw hex strings that bypass the CSS token system.
**Fix:** Use CSS class names or CSS custom properties instead of inline `style={{ color: ... }}`.

---

## Priority 5: Layout & Responsive (HIGH)

### 🟠 LAYOUT-1: Anchor Links Hidden by Sticky Header
**File:** `LandingHeader.jsx` (lines 7-15), `landing.css`  
**Rule:** `fixed-element-offset`  
**Issue:** Clicking a nav anchor (e.g., **Services**) scrolls the section to the top of the viewport, but the 64px sticky header obscures the section heading.
**Fix:** Add `scroll-padding-top: 80px;` to `html` in `base.css`.

### 🟡 LAYOUT-2: `100vh` Instead of `100dvh`
**Files:** `LandingPage.jsx` (line 39), `tokens.css` (line 43)  
**Rule:** `viewport-units`  
**Issue:** `min-height: 100vh` on mobile browsers includes the URL bar, causing layout shifts when the bar collapses/expands.
**Fix:** Replace with `min-height: 100dvh`.

### 🟡 LAYOUT-3: Mobile Nav Anchors Completely Hidden
**File:** `landing.css` (lines 103-107)  
**Rule:** `adaptive-navigation`  
**Issue:** Below 1024px, `.nav-anchor` links are `display: none`. Tablet and small-laptop users lose access to primary navigation sections.
**Fix:** Implement a hamburger menu or collapsible drawer for viewports below 1024px.

### 🟡 LAYOUT-4: `overflow-x: hidden` May Break Sticky
**File:** `LandingPage.jsx` (line 37)  
**Rule:** `scroll-behavior`  
**Issue:** `overflow-x: hidden` on a positioned container can clip `position: sticky` children in some browsers.
**Fix:** Move `overflow-x: hidden` to `<body>` or `<html>` instead of the LandingPage wrapper.

---

## Priority 6: Typography & Color (MEDIUM)

### 🟠 TYPE-1: Step Badges Lack Semantic Color Differentiation
**File:** `components.css` (lines 230-233)  
**Rule:** `color-not-decorative-only`  
**Issue:** Already noted in STYLE-2. From a typography/color perspective, identical badge styling removes information hierarchy.
**Fix:** Differentiate badge types with unique colors and ensure contrast ≥4.5:1.

### 🟡 TYPE-2: Hero Title Line-Height Too Tight
**File:** `landing.css` (line 177)  
**Rule:** `line-height`  
**Issue:** `.hero-title` at `96px` uses `line-height: 0.95`. At large display sizes, descenders/ascenders may clip in certain browsers or fonts.
**Fix:** Increase to `line-height: 1.0` or `1.05` for safety.

### 🟡 TYPE-3: Non-Tabular Numbers in Stats
**File:** `StatsSection.jsx`, `landing.css` (lines 1045-1052)  
**Rule:** `number-tabular`  
**Issue:** Stats values (`120+`, `99%`, `24/7`) use proportional figures. If these were to animate or update, the varying widths would cause layout shift.
**Fix:** Add `font-variant-numeric: tabular-nums;` to `.stats-value`.

### 🟡 TYPE-4: Font Scale Lacks Systematic Rhythm
**Files:** Multiple CSS files  
**Rule:** `font-scale`  
**Issue:** Font sizes appear ad-hoc: 11px, 12px, 13px, 14px, 15px, 16px, 18px, 20px, 22px, 24px, 26px, 28px, 32px, 36px, 38px, 42px, 48px, 72px, 96px. No clear modular scale.
**Fix:** Define a type scale (e.g., 12/14/16/18/20/24/30/36/48/64/96) and map components to scale steps.

### 🟡 TYPE-5: Footer Badge Missing `height` Attribute
**File:** `LandingFooter.jsx` (line 26-31)  
**Rule:** `image-dimension`  
**Issue:** The footer badge `<img>` has `width="180"` but no `height`, which can cause minor CLS.
**Fix:** Add `height` attribute matching the intrinsic aspect ratio.

---

## Priority 7: Animation (MEDIUM)

### 🟡 ANIM-1: Portfolio Hover Animation Respects No Reduced Motion
**File:** `landing.css` (lines 529-562)  
**Rule:** `reduced-motion`  
**Issue:** The 1s image scale and overlay fade on portfolio cards do not have a `@media (prefers-reduced-motion: reduce)` override.
**Fix:** Wrap or duplicate hover transitions inside `prefers-reduced-motion: reduce` to disable or shorten them.

### 🟡 ANIM-2: `will-change` Missing on Key Animated Elements
**Files:** `themes.css`, `landing.css`  
**Rule:** `transform-performance`  
**Issue:** The ticker, blobs, and floating elements animate continuously but lack `will-change`, preventing the browser from preemptively optimizing layers.
**Fix:** Add `will-change: transform;` to `.ticker-content`, `.hero-blur`, and `.floating-element`.

### 🟡 ANIM-3: Reveal Transition Slightly Long for Micro-Interaction
**File:** `animations.css` (lines 39-48)  
**Rule:** `duration-timing`  
**Issue:** Scroll reveals use `800ms`. The skill recommends 150–300ms for micro-interactions; 800ms is acceptable for entrance reveals but feels slow for UI elements.
**Fix:** Consider reducing to `600ms` or using `500ms` max.

---

## Priority 8: Forms & Feedback (MEDIUM)

### 🟠 FORM-1: Required Fields Not Visually Marked
**File:** `BookingTicket.jsx` (lines 57-83)  
**Rule:** `required-indicators`  
**Issue:** Inputs have the `required` attribute but no asterisk or visual indicator on the labels.
**Fix:** Add an asterisk or "(required)" text to the labels.

### 🟡 FORM-2: Validation Only on Submit
**File:** `BookingTicket.jsx` (lines 13-31)  
**Rule:** `inline-validation`  
**Issue:** Validation runs only when the user clicks **Tear Stub to Submit**. Material Design recommends validating on blur.
**Fix:** Run validation on `onBlur` after the user has interacted with a field.

### 🟡 FORM-3: No Helper Text Below Inputs
**File:** `BookingTicket.jsx`  
**Rule:** `input-helper-text`  
**Issue:** Inputs rely solely on placeholder text for guidance. Placeholders disappear once typing begins.
**Fix:** Add persistent helper text below each input (e.g., "We'll use this to send your quote within 24 hours").

### 🟡 FORM-4: `noValidate` Disables Native Browser Validation
**File:** `BookingTicket.jsx` (line 45)  
**Rule:** `form-labels`  
**Issue:** The form uses `noValidate`, which suppresses native validation tooltips. The custom validation is basic but functional.
**Fix:** Keep `noValidate` only if custom validation is robust. Consider re-enabling native validation as a fallback.

### 🟡 FORM-5: Success State Lacks "Undo" or Reset Action
**File:** `BookingTicket.jsx` (lines 89-99)  
**Rule:** `undo-support`  
**Issue:** After submission, the ticket shows a success message but offers no way to submit another request without refreshing.
**Fix:** Add a **Submit Another Request** button that resets the form state.

---

## Priority 9: Navigation Patterns (HIGH)

### 🟠 NAV-1: Mobile Users Lose Primary Navigation
**File:** `landing.css` (lines 103-107)  
**Rule:** `adaptive-navigation`, `persistent-nav`  
**Issue:** At <1024px, Services/Work/Agency links vanish. Only the CTA button remains. This is a significant UX gap on tablets.
**Fix:** Add a hamburger menu with a slide-out drawer for mobile/tablet nav links.

### 🟠 NAV-2: No Active Section Indicator
**File:** `LandingHeader.jsx`  
**Rule:** `nav-state-active`  
**Issue:** As users scroll through the page, there is no visual highlight on the nav item corresponding to the current section.
**Fix:** Use the existing `IntersectionObserver` in `LandingPage.jsx` to track active sections and apply an `.active` class to nav anchors.

### 🟡 NAV-3: No Smooth Scroll for Anchor Links
**File:** `index.html`, `base.css`  
**Rule:** `state-preservation`  
**Issue:** Clicking nav links causes an abrupt jump rather than a smooth scroll.
**Fix:** Add `html { scroll-behavior: smooth; }` to `base.css`.

### 🟡 NAV-4: Footer Badge Link Purpose Unclear
**File:** `LandingFooter.jsx` (lines 24-32)  
**Rule:** `nav-label-icon`  
**Issue:** The footer badge image links to `#mission` (back to top), but there is no text label explaining this. Screen-reader users get "Built by CodeTalkers Footer Badge" which doesn't communicate "Back to top."
**Fix:** Change `aria-label` to "Back to top" or add visible text.

---

## Priority 10: Charts & Data (LOW)

No chart or data-visualization components present. N/A.

---

## Recommended Fix Priority

### Phase 1 — Critical (Do First)
1. **A11Y-1:** Remove emoji icons, replace with SVG
2. **A11Y-2:** Centralize all colors into CSS custom properties
3. **TCH-1:** Expand slider thumb touch target to 44×44px
4. **LAYOUT-1:** Add `scroll-padding-top` for anchor links
5. **STYLE-1:** Fix semantic accent token values

### Phase 2 — High Impact
6. **NAV-1:** Add mobile hamburger menu
7. **NAV-2:** Add active section highlighting
8. **A11Y-3:** Add `aria-live` to ROI calculator
9. **A11Y-4:** Fix portfolio card cursor/clickability
10. **A11Y-5:** Fix squad bio text contrast
11. **PERF-1:** Add `&display=swap` to Google Fonts
12. **TCH-2:** Add permanent tap affordances on portfolio cards
13. **FORM-1:** Mark required fields visually

### Phase 3 — Polish
14. **LAYOUT-2:** Replace `100vh` with `100dvh`
15. **PERF-2:** Optimize hero blur performance
16. **TYPE-2/3/4:** Systematize typography scale
17. **ANIM-1/2:** Add reduced-motion overrides and `will-change`
18. **FORM-2/3/5:** Improve validation UX and add reset button
19. **STYLE-3:** Unify border-radius scale
20. **NAV-3/4:** Smooth scroll + clearer footer link

---

*End of audit.*
