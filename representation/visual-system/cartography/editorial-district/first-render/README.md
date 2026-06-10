---artifact: editorial-district-first-render
authored: W1 Stream-A CD6 (PCP-165)
authored-date: 2026-05-09
status: active
shape: Option B (component-composition demo) per representation/voice/thesis-statement.md §7 Adjudication 4
descriptive-blueprint: per master plan §0 C9 — the artifact is a descriptive blueprint at HTML+CSS tier; full production fidelity (Astro components + Style Dictionary v4 tokens + P5/D3 cartography + Motion v12+GSAP+Lenis) defers to W3 + W5 implementation
upstream-cascade:
  - representation/voice/thesis-statement.md (W1 CD6 RATIFIED 2026-05-09)
  - representation/visual-system/components.md (CD4 RATIFIED 2026-05-08) — 20-component inventory; this first-render composes 6 of 20 components
  - representation/visual-system/color.md (CD2 RATIFIED 2026-05-07) — lane pigments + Vellum atmospheric scale + Vollkorn+Crimson Pro V1 typography lock + DP-Q11 wordmark cosmology composition
  - representation/visual-system/cartography.md (CD3 RATIFIED-V1 2026-05-09) — Editorial District V1 LOCKED + magazine-corner perspective + forward-pointed-neighbor render discipline
  - representation/visual-system/motion.md (CD5 RATIFIED 2026-05-07; W1-close-cluster-amended this CD6 cycle) — atmospheric-chrome-not-animated rule + reduced-motion FLOOR
gate-criterion: Apple-cohesion test cross-surface comparison per representation/voice/thesis-statement.md §5.3 + §7 Adjudication 7 PASS
title: Editorial District — First-Render
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Editorial District — First-Render

## What this is

A static HTML + CSS **component-composition demo** that surfaces 6 of 20 V1-ratified DISpatch components in a single composed surface — a small, viewable proof that 5 of 7 Apple-cohesion-test dimensions hold across components ratified at CD2 + CD3 + CD4 + CD5.

This is **not production code.** It is a descriptive blueprint per master plan §0 C9. Full production fidelity defers to:

- **W3 component layer** — per-component Astro implementation against CD4 spec scaffolds
- **W2 token pipeline** — Style Dictionary v4 compilation of CD2 OKLCH tokens to tokens.css + tokens.tailwind.config.ts + tokens.toon
- **W3 cartography pipeline** — P5.js paper-grain + D3.js contour-ink + dynamic-living layer per CD3 §2 + §7
- **W3 motion register** — Motion v12 + GSAP + Lenis + single-rAF supervisor + VRR envelope per CD5 §1 + §2
- **W5 microsite Astro implementation** — Astro Server Islands per master plan §3.B + Astro+Next.js hybrid foundation per master plan §1.7 reframe 2.6

## What this composes

| # | Component (per CD4 §3.1) | Representation in first-render |
|---|---|---|
| 1 | **MastheadWordmark** | "DISpatch" wordmark with split-color cosmology composition per CD2 Decision 7 (Option C: `DIS` red inheriting `--accent-prime` + `patch` dark Vollkorn); Title slot DISpatch-locked |
| 2 | **SiteNav** | Minimal nav chrome (Nav slot Prime-platform-wide); links to Reception / DISpatch / Districts / Live |
| 11 | **InstitutionalFixture** | Footer Paradiso seed-mandate fixture (Title quiet-weight); paper-grain warm-paper substrate (NOT screen-illuminated) |
| 12 | **CartographyCanvas** | Static-CSS approximation; Editorial District borough-scale render at viewport background |
| 14 | **EditorialDigest** | "Things to read today" + "coming-soon" magazine-glossary list per CD4 §3.1 Concept 7 reception |
| 15 | **LiveTicker** | "What's happening in the offices" live commit-tickers (Meta-code component-locked) |
| 16 | **DistrictMap** | SVG snippet showing Editorial District at borough zoom; magazine-corner highlighted; forward-pointed Civic / Art districts at edge per CD3 §4.7 forward-pointed-neighbor render discipline |

Components NOT composed in this first-render (defer to W3 + W5): ChapterRail (#3), ReadingProgress (#4), Footnote (#5), CodeBlock+CopyButton (#6), DldsPanel (#7), MetroMapMarker (#8), MetaArticleOpener (#9), NarrativeArticleOpener (#10), ReceptionHero (#13), CrossPost (#17), SearchPalette (#18), VirgilChat (#19), LiveRoom (#20).

## What this verifies

5 of 7 Apple-cohesion test dimensions visible in this single artifact:

1. **Register coherence** — magazine-coded; marriage of NARRATIVE literary-civic (EditorialDigest entries; MastheadWordmark display) + META Wired/Hacker (LiveTicker component-locked Meta-code)
2. **Typographic discipline** — 4 of 5 typefaces visible in containment scope (Title at MastheadWordmark + EditorialDigest entry headlines; Body at EditorialDigest entry blurbs; Nav at SiteNav + EditorialDigest list-chrome; Meta-code component-locked at LiveTicker; Civic/Dante absent because cartography rendering is at descriptive-blueprint static-CSS stand-in tier)
3. **Cartography presence** — DistrictMap at homepage focus zoom; magazine-corner highlighted; forward-pointed Civic + Art districts at edge per CD3 §4.7
4. **Atmospheric register** — Vellum atmospheric scale (`sky-low` page background; `window-warm` card edges; `reflect` subtle wash; paper-grain micro-texture)
5. **Institutional fixture** — InstitutionalFixture at footer; Paradiso seed-mandate placeholder; quiet weight; paper-grain warm-paper substrate

Dimensions NOT visible in this artifact (composed at W3 + W5): page-furniture wayfinding (ChapterRail + MetroMapMarker + ReadingProgress are article-surface components); walking-metaphor coherence (cross-surface comparison; this is one surface — Reception-leaning).

## How to view

Open `index.html` in any modern browser. Loads `tokens.css` from sibling. No build step required. No JavaScript required at this tier (motion register defers to W3).

## What "Apple-cohesion test PASS" means here

Per `feedback_metric_vs_gate_discipline.md` + thesis-statement §7 Adjudication 7: the test is a GATE not a TARGET; per-deviation justification; no aggregate scoring. This first-render demonstrates the 5 dimensions named above; the remaining 2 dimensions verify at W3 + W5 cross-surface comparison. The Apple-cohesion test gate **PASSES** per thesis-statement §7 Adjudication 7 verdict; this first-render is one of three V1-active surfaces (Reception / Article / Editorial District first-render) that hold all 7 dimensions across the surface set.

## Refinement trajectory

- **Typography candidates.** Vollkorn + Crimson Pro are CD2-V1-ratified free-OFL choices; Founders Grotesk-equivalent stand-in (Inter / system-ui) for Nav slot at this tier; JetBrains Mono for Meta-code stand-in; Trajan-class Civic/Dante deferred to cartography rendering pipeline at W3 + W5.
- **OKLCH tokens.** OKLCH values approximate the CD2 Vellum scale + lane pigment ratifications; W2 Style Dictionary compilation produces canonical tokens.css.
- **Cartography rendering.** Static-CSS approximation (CSS gradient + SVG contour stand-ins) for the Editorial District borough-zoom view; full D3.js + P5.js + Mapbox GL JS dynamic-living layer per CD3 §2 + §7 defers to W3.
- **Motion register.** Static at this tier; reduced-motion floor preserved (no animation that would violate WCAG 2.1 SC 2.3.3); Motion v12 + GSAP + Lenis runtime composition per CD5 §1 defers to W3.

## Provenance

CC-Mayor-delegated 2026-05-09 per Mayor "go through the whole thing reconcile everything ... finish it all and write your artifacts at the end." Apple-cohesion test gate PASS per thesis-statement §7 Adjudication 7. Sibling first-render documents: `representation/voice/thesis-statement.md` + `representation/content/article-patterns/{meta-pattern, narrative-pattern, interplay-pattern}.md` + `representation/multimedia/sonic-system.md`.
