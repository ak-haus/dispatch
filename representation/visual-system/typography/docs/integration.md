---artifact: typography-integration-runbook
authored: W2-S-E 2026-05-10
authored-against: |
  representation/visual-system/color.md §3 APCA framework + §3.2 V1 pairing inventory + §3.3 δ hybrid Lc minimums
  representation/visual-system/typography/css/fonts.css (the integration target)
  representation/visual-system/typography/manifest.md (subset inventory)
  cc-ledger/dispatches/W2/cc7-dispatch-brief-w2.md §3.1 W2-S-A scope (Astro+Next.js hybrid bedrock)
status: active
title: Integration runbook — typography → Astro+Next.js bedrock
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Integration runbook — typography → Astro+Next.js bedrock

This runbook is the W2-S-E → W2-S-A handoff specification. It tells the W2-S-A bedrock instance how to wire the canon typography directory into the Astro + Next.js hybrid platform foundation.

## §1 — What W2-S-A receives from W2-S-E

A complete canon-side typography stack at `v1-dev-diary-microsite/representation/visual-system/typography/`:

| Artifact | Role at runtime |
|---|---|
| `subsets/<surface>/*.woff2` (14 cuts) | Static binaries to be served at `/fonts/<surface>/<file>` |
| `css/fonts.css` | Imported as a global stylesheet (or inlined into `<head>`) |
| `css/preload.html` | Inserted into the shared `<head>` partial verbatim |
| `tokens/typography.tokens.json` | Consumed by W2-S-D Style Dictionary v4 — produces `tokens.css` font-family vars |
| `licenses/*-OFL.txt` | Bundled in deployment for OFL-1.1 attribution compliance (served at `/legal/fonts/<family>-OFL.txt`) |

`sources/` is gitignored and not relevant to runtime — it's the upstream procurement cache.

## §2 — Wiring path A (recommended): Astro asset pipeline

Astro 6 ships native asset import + `<link rel="preload">` insertion. Recommended path because it integrates with Cloudflare Pages alt + Vercel primary deployment lanes (W2-S-C) without runtime CDN dependence.

### Step 1 — Copy subsets into Astro public directory

In `astro.config.mjs` (or W2-S-A's chosen config location), point the public assets path at the typography directory's `subsets/`:

```js
// astro.config.mjs (W2-S-A authors; this is a recommendation pattern)
import { defineConfig } from "astro/config";

export default defineConfig({
  publicDir: "public",
  vite: {
    publicDir: "public",
  },
});
```

Then either:

- **(2a) Symlink at build time** — `0-terra/fonts/` → `../representation/visual-system/typography/subsets/` (cleanest; single source of truth)
- **(2b) Build-step copy** — add a npm script `cp -R representation/visual-system/typography/subsets/ 0-terra/fonts/` (simple; reproducible)

W2-S-A's choice. Option 2a is preferred for monorepo coherence; option 2b survives Windows-host dev environments where symlinks are awkward.

### Step 2 — Import fonts.css globally

In Astro's shared layout (`src/layouts/BaseLayout.astro` per Astro convention):

```astro
---
import "../../representation/visual-system/typography/css/fonts.css";
---
<html>
  <head>
    <!-- preload critical-weight cuts -->
    {/* Insert contents of typography/css/preload.html here verbatim */}
  </head>
  <body>
    <slot />
  </body>
</html>
```

Astro inlines the CSS at build; no runtime FOUT.

### Step 3 — Verify asset paths resolve

After build, `dist/fonts/body/crimson-pro-400.woff2` must exist and be HEAD-200-able. CI smoke test pseudocode:

```bash
for cut in $(ls representation/visual-system/typography/subsets/**/*.woff2); do
  rel="fonts/${cut#*/subsets/}"
  curl --head "http://localhost:4321/$rel" | head -1
done
```

Expected: 14 lines, each `HTTP/1.1 200 OK`.

### Step 4 — Adjust `--woff2-base-path` if needed

If W2-S-A serves fonts from a path other than `/fonts/`, override the CSS variable in the shared layout's inline style:

```html
<style>:root { --woff2-base-path: "/static/fonts"; }</style>
```

W2-S-E's `fonts.css` references absolute paths starting with `/fonts/` by default; the variable is provided as a future override hook. Most installations won't need it.

## §3 — Wiring path B: Next.js `next/font/local` (App Router)

If W2-S-A has Next.js handle a route segment that needs CLS-free font loading and prefers Next.js's bundling over Astro's, the canonical pattern is:

```ts
// app/fonts.ts (W2-S-A authors per Next.js App Router pattern)
import localFont from "next/font/local";

export const vollkorn = localFont({
  src: [
    {
      path: "../representation/visual-system/typography/subsets/title/vollkorn-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../representation/visual-system/typography/subsets/title/vollkorn-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../representation/visual-system/typography/subsets/title/vollkorn-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-title",
  display: "swap",
});
// Repeat for crimson-pro, inter, jetbrains-mono, im-fell-english.
```

Then in `app/layout.tsx`, add the variables to `<html className={`${vollkorn.variable} …`}>` so the CSS variables flow through.

**Trade-off:** path B duplicates the `@font-face` mapping in TypeScript that path A keeps in CSS. Path A is preferred when both Astro and Next.js coexist (the W2-S-A hybrid case) because the `@font-face` block is the single source of truth and works for both.

## §4 — APCA contrast verification matrix

W2-S-E's done criterion includes APCA verification against CD2 color tokens. The matrix below maps each surface's typography to its background token and the required Lc threshold per CD2 §3.3 δ hybrid framework.

| Pairing | Foreground (typography) | Background | Required Lc | CD2 reference |
|---|---|---|---|---|
| **#1 Body × Vellum** | Crimson Pro 400 / `--text-body-strong` | `--sky-high` Vellum chrome `oklch(0.99 0.012 88)` | β ≥ 85 (principal-grade body) | §3.2(1), §3.3 |
| **#2 Title × Vellum** | Vollkorn 700 / `--text-display-strong` | `--sky-high` Vellum | β ≥ 70 (principal-grade display) | §3.2(2), §3.3 |
| **#3 Nav × Vellum** | Inter 400 / `--text-nav` | `--sky-high` Vellum | β ≥ 55 (principal-grade incidental) | §3.2(3), §3.3 |
| **#4 Lane Editorial × Vellum** | Crimson Pro 400 in `--lane-editorial-strong` `oklch(0.55 0.16 41°)` | `--sky-high` Vellum | β ≥ 85 (body register) | §3.2(4), §4.2 |
| **#5 Wordmark × Vellum** | DIS portion `--accent-prime` `oklch(0.51 0.20 27°)` + patch portion `--text-body-strong` | `--sky-high` Vellum | γ ≥ 90 (concept-cited; Decision 4c) | §3.2(5), §5.2, §6.4 |
| **#6 State × Vellum** | error/warn pigment | `--sky-high` Vellum | γ ≥ 90 (concept-cited) | §3.2(6), §3.3 |
| **#7 Cartography × map** | `--asset-cartography-pulse` `oklch(0.45 0.18 22°)` (IM Fell English at far zoom) | atmospheric contour-ink | γ ≥ 60 (concept-cited; cartography exception) | §3.2(7), §4.5 |
| **#8 Code/Meta × component** | JetBrains Mono 400 / `--text-meta` | component bg | γ ≥ 75 (concept-cited; meta-code exception) | §3.2(8), §3.3 |

### Verification responsibilities

- **W2-S-E (this dispatch):** identifies pairings + cites Lc thresholds (this matrix). Math-only verification is independent of runtime; any pre-shipping APCA drift surfaces here.
- **W2-S-D (tokens):** ships `tokens.css` with the platform tokens (`--accent-prime`, `--sky-high`, `--text-body-strong`, etc.) at numeric values; APCA computation can run once foreground + background are both numeric.
- **W2-S-A integration re-fire:** runs the actual APCA computation per CD2 §3.5 tooling chain (Leonardo Color · chroma.js · Realtime Colors · Mayor cascade) against the bundled `tokens.css` + `fonts.css` and produces a pass/fail row per pairing in `$extensions.prime.apca-validated-pairs` per CD2 §2.5 token shape.

### Pre-screen verdicts (CD2 §3.6 + §6.4)

CD2 ratified the following pairing pre-screen verdicts. W2-S-E's typography choices preserve all of them — no font-side change can shift APCA Lc by more than ±2-3 units per CD2 §10 Decision 6 cost-ROI note (free-OFL stroke metrics vs Klim premium).

- Pairings #1, #2, #4 → **β principal-grade pre-screen pass** (CD2 §10 Decision 6 6c)
- Pairing #5 (Wordmark) → **pending §5 wordmark resolution**; Decision 7 ratified Option C split-color; Vellum × accent-prime achieves Lc ≥90 per CD2 §3.4 §3.5 framework
- Pairings #3, #6, #7, #8 → **γ exception pre-screen pass** per CD2 §3.3

## §5 — Forward-arc handshake with W2-S-F

W2-S-F procures Pangram Pangram Editorial New (wordmark) + Pangram Pangram Sans heaviest weight (nav). Cross-stream integration spec:

| W2-S-F deliverable | W2-S-E touch-point | Re-key shape |
|---|---|---|
| Pangram Editorial New (1 style) | `tokens/typography.tokens.json` `font.family.wordmark.$value` | Replace `"{font.family.title}"` reference with `["Editorial New", "Vollkorn", "Georgia", "serif"]` |
| Pangram Sans heaviest weight (1 style) | `tokens/typography.tokens.json` `font.family.nav.$value` | Replace `["Inter", ...]` with `["Pangram Sans", "Inter", "-apple-system", ...]` (Inter retained as standing-history fallback per `feedback_documentation_lifecycle.md`) |
| Pangram Editorial New WOFF2 | `subsets/wordmark/editorial-new-<weight>.woff2` (new surface dir) | W2-S-F adds; W2-S-E unaware until handoff |
| Pangram Sans WOFF2 | `subsets/nav/pangram-sans-<weight>.woff2` (existing nav dir) | W2-S-F adds alongside `inter-*.woff2` |
| Pangram Editorial New `@font-face` | `css/fonts.css` (new block) | W2-S-F appends one block; same shape as Vollkorn block in current file |
| Pangram Sans `@font-face` | `css/fonts.css` (new block) | W2-S-F appends one block |
| Updated preload | `css/preload.html` | W2-S-F amends third preload `<link>` to point at Pangram Sans (was Inter) |

**License caveat for W2-S-F.** Pangram Pangram licenses are commercial-foundry per-style licenses; the EULA may restrict modification including subsetting. W2-S-F instance:

1. Reviews EULA at procurement time
2. If subsetting permitted: subsets per `manifest.md` discipline; ships WOFF2
3. If subsetting NOT permitted: ships full WOFF2 conversion (no subsetting); accepts ~80-150 KB per cut; documents in manifest as a known-larger family with EULA-driven rationale

**Re-key cost estimate.** ~10 lines diff in `css/fonts.css` + ~5 lines diff in `tokens/typography.tokens.json` + 2-4 new WOFF2 binaries. Zero component-CSS impact across DISpatch.

## §6 — Things this runbook does NOT cover

- **CSS-side `font-size-adjust` calibration** — adds at the W2-S-A integration measurement step if first-paint reflow is visible to user; not a W2-S-E concern at canon-staging time.
- **Variable-font fallback chains** — at V1 we ship instanced static cuts only; if W2-S-A wants a single variable cut per family for size optimization, that's a future amendment; W2-S-E flagged the trade-off in `manifest.md` "Forward-arc."
- **Subresource Integrity (SRI) for self-hosted fonts** — same-origin doesn't require SRI; if W2-S-A elects to serve from a CDN-fronted edge, SRI is W2-S-A's add (using `subset-checksums.txt` SHA-256 values produced by `build/subset.py`).
- **Web Vitals impact measurement (CLS, LCP)** — W2-S-A integration measures; if measurement shows CLS > 0.1 from font swap, `font-display: swap` becomes `font-display: optional` per Web Vitals best practice; documented in `runbook/sop/typography-integration.md` (W2-S-A authoring).

## §7 — Quick reference for W2-S-A instance

When you (W2-S-A) read this runbook at integration re-fire time:

1. **Procure if needed** — `cd v1-dev-diary-microsite/representation/visual-system/typography && python build/procure.py` (one-time; idempotent)
2. **Build subsets if needed** — `python build/subset.py` (already produced by W2-S-E; re-run if subsetting profile changes)
3. **Wire fonts** — Path A (Astro symlink/copy) recommended; Path B (Next.js `next/font/local`) for route segments that need it
4. **Insert preload tags** — copy `css/preload.html` contents into shared `<head>` partial
5. **Import CSS** — `import "@/representation/visual-system/typography/css/fonts.css"` from BaseLayout
6. **Smoke-test** — verify all 14 WOFF2 paths return 200; verify article surface renders with serif body + serif title + sans nav
7. **Run APCA** — per CD2 §3.5 tooling chain; populate `$extensions.prime.apca-validated-pairs` evidence rows
8. **Report Done** — surface to Conductor: "W2-S-E typography integrated; 14 cuts wired; APCA pairings #1-8 verified at <Lc values>; preload critical-weight at 74.7 KB; integration runbook §7 followed"

---

*Integration runbook authored 2026-05-10 by W2-S-E. W2-S-A executes the wiring at integration re-fire; this runbook is the contract.*
