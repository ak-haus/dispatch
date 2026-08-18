---
title: "`@prime-dispatch/tokens`"
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-08-18
---
# `@prime-dispatch/tokens`

The S2 token engine (ADR-0003 §Stage 2, executed 2026-08-18): **git is the token
source of truth**, Style Dictionary v5 is the engine, DTCG 2025.10 is the format.
The W3-S-A hand-copy bridge is dead — the CSS the apps ship is compiled from the
DTCG source here, and CI fails closed on any drift.

## Layout

| Path | What |
|---|---|
| `src/color/{platform,dispatch,asset}.json` | Tiered color canon (dawn), amendment-locked values |
| `src/color/ui-slots.json` | W2 short-name alias API (packages/ui + microsite-next consumers) |
| `src/color/shadcn-dark.json` | Sitemap-only shadcn dark shim (`.dark` block) |
| `src/cycles/{dusk,night}.json` | Cycle override trees → `[data-prime-cycle]` cascade blocks |
| `src/typography.json` | Family slots (live stacks; canon contradictions FILED inline) + ratified weights |
| `src/motion.json` | The ratified CD5 gates (reduced-motion cap, frame budgets) — design durations are deliberately absent (unratified) |
| `src/cartography.json` | formula.md stroke system — the only mayor-ratified px values in canon |
| `scripts/emit/` | Layout templates + fail-closed renderer (both directions: missing token OR unemitted token throws) |
| `scripts/validate-dtcg.mjs` | 2025.10 shape + prime-extension + emission-integrity validator |
| `__tests__/contrast.test.mjs` | F5 per-node WCAG math (21 assertions, runs in the drift gate) |

## Outputs

`pnpm --filter @prime-dispatch/tokens build` → validate, then emit:

- `apps/microsite-astro/src/styles/tokens.css` — **committed, generated**: `:root`
  dawn + dusk/night runtime cascade blocks + `.dark` shadcn
- `apps/microsite-astro/src/styles/tokens.theme.css` — **committed, generated**:
  the Tailwind v4 `@theme inline` block (var() chains only — a literal inside
  `@theme inline` freezes into compiled utilities and cycle theming dies; the
  cycle overrides live in tokens.css, OUTSIDE the theme block)
- `dist/tokens.css` (`./css`) + `dist/tokens.theme.css` (`./theme`) for package
  consumers (Storybook preview, microsite-next)

The `tokens (drift gate)` workflow rebuilds and `git diff --exit-code`s — red =
do-not-merge. Emission strings (`$extensions.prime.css`) are validated for
equivalence against the structured `$value`, so the spec form and the byte-exact
CSS can never fork.

## F5 (register §10) — size-scoped copper split

`--platform-copper-label` (oklch 0.54 0.117 60; 4.66:1 on sky-low) carries all
label/body-size copper text and label-bearing fills; display copper stays canon
(#b87333, ≥3:1 large-text). `--platform-on-copper` is the single on-fill text
role. `--dispatch-text-body-muted-deep` (0.46) covers tinted panels. Dusk/night
variants alias cycle canon (already AA). Filed, not fixed: dusk/night `faint`
sits at 3.34/3.52:1 (pre-existing canon, D1-gate decision); the un-valued
`--chrome-*`/`--surface-*`/`--rail-edge`/`--grid-line` slot names (S5 gap);
the Body=Inter-vs-Crimson-Pro and Google-Fonts-CDN-vs-self-host canon
contradictions (typography.json `$description`s).

Legacy `tokens.toon` / `tokens.tailwind.config.ts` emissions and their W2
fixtures were retired with the bridge (no consumers existed).
