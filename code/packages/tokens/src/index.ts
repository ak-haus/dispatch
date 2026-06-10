// Prime DISpatch design tokens — W3-S-A sample-token bridge.
//
// Bridge state (2026-05-10):
//   Verbatim copies of W2-S-D's compiled color samples now live at:
//     dist/tokens.css                  — CSS custom properties (consumed via "@prime-dispatch/tokens/css")
//     dist/tokens.tailwind.config.ts   — Tailwind v4 OKLCH-native theme (consumed via "@prime-dispatch/tokens/tailwind")
//     dist/tokens.toon                 — TOON-format token economy file (AI-agent consumption per master plan §1.7 reframe 2.7)
//
// Source of truth: cc-ledger/diffs/W2-S-D/code/build/expected-outputs/
//
// Bridge ships W3-S-A unblocked while W2 Wave-gate close cluster runs. When Repo Code copies the
// W2-S-D pipeline into v1-dev-diary-microsite/code/, Style Dictionary v4 builds replace these
// dist/* artifacts with the live pipeline outputs. Token-reference-only consumer code (CSS
// variables, Tailwind utility classes) keeps working through the swap without rewrites.
//
// Coverage caveat: W2-S-D round 1 ships COLOR tokens only (4 platform + 12 dispatch + 1 asset stub).
// Typography / spacing / motion tokens fold in subsequent CD2/CD5/W2-S-D rounds. Phase 1 chrome
// components reference typography slots by CSS custom property naming convention
// (e.g., var(--type-title-700)) so the variables become live as soon as they're defined.
//
// Cosmology anchor: CD2 wordmark resolution + copper-color doctrine
// (representation/visual-system/color.md §5 + §10 Decision 7).

export const TOKENS_VERSION = "0.0.0-w3-s-a-bridge" as const;

export const TOKENS_BRIDGE_SOURCE =
  "cc-ledger/diffs/W2-S-D/code/build/expected-outputs/" as const;
