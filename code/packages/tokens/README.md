---
title: `@prime-dispatch/tokens`
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# `@prime-dispatch/tokens`

Design tokens consumable by `apps/microsite-next`, `apps/microsite-astro`, and `apps/storybook`.

**State (2026-05-10):** **W3-S-A sample-token bridge active + Mayor inline amendment (Vellum re-tune).** W2-S-D's compiled color samples shipped verbatim from `cc-ledger/diffs/W2-S-D/code/build/expected-outputs/` to unblock W3-S-A component scaffolding; the Vellum atmospheric scale (vellum-25 through vellum-300 + chrome aliases sky-high/sky-low/reflect/window-warm) was re-tuned per Mayor 2026-05-10 sensory feedback ("white with a touch of cream, subtly off-white" direction). W2 Wave-gate close cluster swaps real Style Dictionary v4 + DTCG pipeline outputs in; CD2 amendment proposal at `cc-ledger/diffs/W3-S-A/signal-proposal-2026-05-10_atmospheric-vellum-hue-85-perceptual-bias.md` stages canonical CD2 ratification via Conductor relay.

**Mayor inline amendment scope (Vellum + chrome only — re-tuned 2026-05-10):**

| Token | W2-S-D verbatim | Mayor-amended | Shift |
| --- | --- | --- | --- |
| `vellum-25` / `sky-high` | `oklch(0.99 0.012 88)` | `oklch(0.998 0.002 80)` | L↑ C÷6 H−8° |
| `vellum-50` | `oklch(0.985 0.018 87)` | `oklch(0.99 0.004 78)` | L↑ C÷4.5 H−9° |
| `vellum-100` / `sky-low` | `oklch(0.96 0.025 85)` | `oklch(0.975 0.006 75)` | L↑ C÷4.2 H−10° |
| `vellum-200` / `reflect` | `oklch(0.92 0.040 82)` | `oklch(0.95 0.010 72)` | L↑ C÷4 H−10° |
| `vellum-300` / `window-warm` | `oklch(0.87 0.055 78)` | `oklch(0.92 0.016 68)` | L↑ C÷3.4 H−10° |

Lane pigments + accent + wordmark + cartography pulse tokens UNCHANGED (not atmospheric substrate).

## Active outputs (W3-S-A bridge)

| Output | Format | Consumer entry |
| --- | --- | --- |
| `dist/tokens.css` | CSS custom properties (`:root` + short aliases) | `import "@prime-dispatch/tokens/css"` |
| `dist/tokens.tailwind.config.ts` | Tailwind v4 OKLCH-native theme | `import tokens from "@prime-dispatch/tokens/tailwind"` |
| `dist/tokens.toon` | TOON token-economy file | AI agents (per master plan §1.7 reframe 2.7) |

**Coverage:** Color-only at W3-S-A bridge — 4 platform + 12 dispatch + 1 asset stub (17 V1 CD2-ratified tokens). Typography / spacing / motion tokens land in subsequent CD2 + CD5 + W2-S-D rounds.

**Phase 1 component pattern:** Components reference typography / spacing / motion slots by CSS custom property naming convention (e.g., `var(--type-title-700)`, `var(--space-scale-4)`, `var(--motion-fast)`) so the variables become live as soon as they're defined upstream.

## Pipeline (W2-S-D)

- **Authoring surface:** Penpot self-host on Hetzner
- **Build trigger:** CI on Penpot push
- **Build tool:** Style Dictionary v4 with `typeDtcgDelegate` wired
- **Cosmology anchor:** CD2 wordmark resolution + copper-color doctrine (`representation/visual-system/color.md` §5 + §10 Decision 7)

## Bridge swap (W2 Wave-gate close)

When W2 Wave-gate close cluster ships, Repo Code copies the W2-S-D pipeline into this package:

1. `cc-ledger/diffs/W2-S-D/code/style-dictionary.config.mjs` → `code/packages/tokens/style-dictionary.config.mjs`
2. `cc-ledger/diffs/W2-S-D/code/build/` → `code/packages/tokens/build/`
3. `cc-ledger/diffs/W2-S-D/code/tokens/` → `code/packages/tokens/tokens/`
4. `npm run build` regenerates `dist/*` from real Penpot DTCG sources (replacing the verbatim bridge copies).

Component code consuming `@prime-dispatch/tokens/css` and `/tailwind` keeps working through the swap because the consumer-facing API is unchanged — only the artifact provenance shifts from sample-bridge to live-pipeline.

## What this stub still does NOT provide

- Typography tokens (CD2 + CD4 ratifies subsequent round)
- Spacing tokens (CD2 ratifies subsequent round)
- Motion tokens (CD5 ratifies)
- Theme variants (light / dusk / dark — CD2 ratifies subsequent round)

Forward-pointed consumer references in W3-S-A component stories use the named CSS custom property convention so variables become live without consumer rewrites when the upstream rounds land.
