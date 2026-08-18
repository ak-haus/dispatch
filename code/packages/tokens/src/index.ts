// Prime DISpatch design tokens — the S2 token engine (ADR-0003 §Stage 2).
//
// Source of truth: src/**.json — DTCG 2025.10 ($value/$type; structured color/
// dimension/duration values), one tree per cycle (dawn = src/color/* + the
// typography/motion/cartography sets; dusk/night = src/cycles/*; the sitemap
// shadcn dark shim = src/color/shadcn-dark.json). Style Dictionary v5 parses
// and set-merges; scripts/emit/* renders the two targets:
//
//   dist/tokens.css        ("./css")   — CSS custom properties: :root dawn +
//                                        data-prime-cycle cascade blocks + .dark
//   dist/tokens.theme.css  ("./theme") — Tailwind v4 @theme inline (var() chains
//                                        only; cycles cascade from tokens.css)
//
// Both are ALSO written into apps/microsite-astro/src/styles/ and committed —
// the CI drift gate rebuilds and `git diff --exit-code`s them, fail-closed.
// Emission strings live in $extensions.prime.css and are validated for
// equivalence against $value by scripts/validate-dtcg.mjs (no dual source).
//
// F5 (ADR-0003 register §10, executed at S2): size-scoped copper split +
// AA ink variants — per-node WCAG math asserted in __tests__/contrast.test.mjs.

export const TOKENS_VERSION = "1.0.0-s2" as const;
