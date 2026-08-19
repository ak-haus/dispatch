/**
 * Token-governance lint (ADR-0003 §Stage 5): raw color literals are banned in
 * component source — components consume canon via var(--token) from
 * @prime-dispatch/tokens (DESIGN.md §Colors; construction-rules.md Rule 4).
 * "The only governance form an agent can't argue with" — wired as CI gate
 * `tokens-lint`, fail-closed. The sibling CSS-file scan is
 * scripts/lint-tokens-css.mjs (ESLint's parser does not reach .css).
 *
 * Scope (deliberately honest — the ADR's clause: a lint pointing at
 * incomplete tokens forces exemptions):
 *   - BANNED now: hex color literals (6/8-digit + Tailwind arbitrary [#...])
 *     and oklch() literals, in packages/ui + microsite-astro component
 *     TS/TSX (stories included; tests excluded — fixtures may assert values).
 *   - DEFERRED with reasons, ratchet when the canon lands:
 *     · px literals — no ratified spacing/radius scale exists (DESIGN.md
 *       §Layout "No ratified spacing scale"; frontmatter omits Shapes), and
 *       the stroke system is canon-px. Ratchets when a spacing stage lands.
 *     · rgba()/hsla() — the elevation/shadow register has no canon tokens
 *       (DESIGN.md frontmatter omits Elevation & Depth). Ratchets with an
 *       elevation stage.
 *     · 3/4-digit hex — collides with anchor-fragment strings; none exist in
 *       component source today (verified 2026-08-18).
 *
 * Sanctioned exemptions are file-level eslint-disable banners WITH the
 * justification inline (the Rule 2 pattern) — today: third-party platform
 * depictions whose palettes are foreign brands, not Prime canon
 * (SpheresSpread macOS window chrome; CrossfireSpread LinkedIn/Hashnode
 * embeds).
 */
import tsParser from "@typescript-eslint/parser";

const HEX_LITERAL = "/#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?\\b/";
const TW_ARBITRARY_HEX = "/\\[#[0-9a-fA-F]{3,8}\\]/";
const OKLCH_LITERAL = "/\\boklch\\(/";

const bannedColorLiterals = (extra = []) => ({
  "no-restricted-syntax": [
    "error",
    {
      selector: `Literal[value=${HEX_LITERAL}]`,
      message:
        "Raw hex color literal — consume canon via var(--token) from @prime-dispatch/tokens (DESIGN.md §Colors; construction-rules Rule 4). Third-party platform depictions carry a file-level eslint-disable with its justification.",
    },
    {
      selector: `TemplateElement[value.raw=${HEX_LITERAL}]`,
      message:
        "Raw hex color literal in template string — consume canon via var(--token) (DESIGN.md §Colors; construction-rules Rule 4).",
    },
    {
      selector: `Literal[value=${TW_ARBITRARY_HEX}]`,
      message:
        "Tailwind arbitrary hex value — consume canon utilities from tokens.theme.css or var(--token) (DESIGN.md §Colors).",
    },
    {
      selector: `TemplateElement[value.raw=${TW_ARBITRARY_HEX}]`,
      message:
        "Tailwind arbitrary hex value in template string — consume canon utilities (DESIGN.md §Colors).",
    },
    ...extra,
  ],
});

export default [
  {
    files: [
      "packages/ui/src/components/**/*.{ts,tsx}",
      "apps/microsite-astro/src/components/**/*.{ts,tsx}",
    ],
    ignores: ["**/*.test.*", "**/__tests__/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: bannedColorLiterals(),
  },
  {
    // packages/ui holds the canon register — oklch literals are additionally
    // banned there (values live in the DTCG source, nowhere else). The astro
    // app is exempt from this stricter band only where no literal exists to
    // ban today; the hex rules above still apply.
    files: ["packages/ui/src/components/**/*.{ts,tsx}"],
    ignores: ["**/*.test.*", "**/__tests__/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: bannedColorLiterals([
      {
        selector: `Literal[value=${OKLCH_LITERAL}]`,
        message:
          "Raw oklch() literal — canon values live in the DTCG source (code/packages/tokens/src), components consume var(--token) only (construction-rules Rule 4).",
      },
      {
        selector: `TemplateElement[value.raw=${OKLCH_LITERAL}]`,
        message:
          "Raw oklch() literal — canon values live in the DTCG source; components consume var(--token) only (construction-rules Rule 4).",
      },
    ]),
  },
];
