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
 * justification inline (the Rule 2 pattern) — today, four files, in two
 * classes:
 *   · foreign-brand depictions, whose palettes are not Prime canon —
 *     SpheresSpread (macOS window chrome) and CrossfireSpread
 *     (LinkedIn/Hashnode embeds);
 *   · cycle-independent registers, whose values must NOT follow
 *     dawn/dusk/night — BuildTicker (a terminal depiction) and
 *     apps/microsite-astro/src/components/home/shared/palette.ts, the declared
 *     home for such values so components carry none inline.
 * OPEN, and AK's to decide: whether the cycle-independent registers should
 * become canon tokens of their own. That is a canon question, not a lint one.
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
    // The oklch band. packages/ui holds the canon register (values live in the
    // DTCG source, nowhere else), and as of 2026-08-20 the astro app is inside
    // the band too.
    //
    // IT WAS NOT, AND THE STATED REASON WAS FALSE. This block previously read
    // "the astro app is exempt from this stricter band only where no literal
    // exists to ban today" — measured that day, the app carried 47 raw oklch()
    // across 8 component files, 15 of them in one file (BuildTicker). A lint
    // whose scope rests on an unverified premise bans nothing and reports that
    // it does, which is worse than an honest gap (Golden Board R1).
    //
    // Grandfathering is deliberate and NAMED, not blanket. Four files carry a
    // file-level eslint-disable with its justification inline (the Rule 2
    // pattern); every one of them holds values that are fixed BY DESIGN because
    // canon color tokens cycle dawn/dusk/night and these surfaces must not.
    // The other four files' literals were consolidated into shared/palette.ts
    // and now resolve through it. What the band buys from here: a NEW literal
    // in the astro app fails CI unless someone writes down why.
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
