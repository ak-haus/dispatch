# CLAUDE.md — Dispatch (Claude's lens; the shared map is `AGENTS.md`)

@AGENTS.md

> `@AGENTS.md` pulls in the vendor-neutral map (the boundary, commands, layout). Below is the **editorial
> discipline** — the non-inferable house rules for this JS-first scrollytelling microsite. Shared PAI doctrine lives
> in `~/.claude/CLAUDE.md`. The visual canon is `representation/visual-system/` (CD1–5); the spec is the external master plan.

## Project identity — JS-first
The visual product **IS the JavaScript.** Static HTML/CSS is the substrate; React + GSAP + Motion + Lenis is what
people experience. When in doubt between a CSS-only and a JS-driven solution, **choose JS.** Static is the failure
state, not the goal. Default to motion, to interaction, to libraries already in `package.json`.

## Animation stack — strict priority order
- **Tier 1 (use first):** **GSAP 3.15** + ScrollTrigger + CustomEase (scroll choreography, pinning, scrub, timelines) ·
  **motion (v11)** (component entrance/exit, hover/tap, layout, AnimatePresence, gestures) · **Lenis 1.3** (page smooth
  scroll — wired at `StackLayout.astro`, `window.__lenis`; bridge via `gsap.ticker.add(lenis.raf)`).
- **Tier 2 (domain):** react-three-fiber/three.js · maplibre-gl · wavesurfer/howler · diff2html/shiki · @observablehq/plot/d3 · photoswipe · lucide-react (verify the icon exists — v1.14 lacks Linkedin/Instagram).
- **Tier 3 (refinement only):** react-spring · tw-animate-css.
- **Forbidden:** layout-thrashing animation (`width`/`height`/`top`/`left`/`margin`/`padding` — use `transform`+`opacity`);
  placeholder media on launch-ready code (use `/cartography/district.{png,mp4}` or `/banners/dispatch-02.png`, never a colored rectangle).

## Tailwind v4 — read before touching `global.css`
`@theme inline` resolves `var()` chains at **BUILD time** from other `@theme inline` blocks + `:root` values processed
in the same compile; runtime `:root` declarations added later (or in `tokens.css`) are **not** followed during inline-theme
expansion. **Rule:** a Tailwind utility's value must reference a hardcoded literal or a token already in `@theme inline`.
**Cycle awareness:** when a value differs per `[data-prime-cycle="dusk|night"]`, hardcode the dawn value in `@theme inline`
AND override the `--color-*` property inside the cycle selector at runtime (the cascade picks it up post-build).

## CSS scoping — read before adding semantic tags
`global.css` has tag selectors. Before a new `<header>`/`<nav>`/`<main>`/`<footer>`/`<aside>`/`<section>` in ANY
component, grep `^(header|nav|main|footer|aside|section)\b` in `code/apps/microsite-astro/src/styles/global.css`. The
masthead hide-behavior binds to body `.dispatch-hero` and matches ALL `<header>` on hero pages — use `<motion.div>`
unless you've audited the cascade.

## Component conventions
React functional components only (hooks at top, no classes) · ES modules · named exports for components (default only
for Astro pages) · TypeScript everywhere (no `any`) · Astro islands (`client:load` above-the-fold motion, `client:visible`
below-the-fold, `client:idle` non-critical) · keep React components under ~400 lines (split into a subdirectory past that).

## Editing discipline
- **Stay in scope.** "Fix the masthead padding" ≠ change border opacity / blur / transition. Ship only what was asked.
- **No proactive refactors.** "While I'm here…" is forbidden — the user reviews diffs; surface noise erodes trust.
- **Preserve canon by default.** Palette / typography / cartographic substrate / lane pigments are locked
  (`representation/visual-system/`). Mutable: motion + scroll + interaction + responsive behavior.

## Universal type rules (apply everywhere)
- **Wordmark `DISpatch` — `DIS` is always red.** Anywhere the literal word renders, split it:
  `<span class="text-wordmark-dis font-bold">DIS</span><span class="text-wordmark-patch">patch</span>` (add `not-italic`
  to both in italic prose). No exception.
- **Smallest legible text is 12px** (WCAG/industry, May 2026); the old 9/10px caps are deprecated.
- **Editorial type on the cartographic substrate uses letterpress** — `.dispatch-emboss` (light, 11–14px caps/labels)
  or `.dispatch-burnin` (heavy, display 16px+): both pair `text-shadow` + `mix-blend-mode:multiply`.

## Verification before claiming done
1. `cd code/apps/microsite-astro && pnpm exec tsc --noEmit --project tsconfig.json` — no errors in YOUR files.
2. If CSS/token changes: `rm -rf .astro node_modules/.vite`, then state "Restart `pnpm dev` to pick up the changes."
3. Content: dispatches are `.mdx` in `src/content/dispatch/` (schema `src/content.config.ts`) — **AK owns content.**

## Common pitfalls (don't repeat)
`:root` after `@theme inline` (hardcode in `@theme inline`) · `<motion.header>` for a section title (use `<motion.div>`) ·
placeholder slots when real assets exist · `text-body-faint` below 10px · importing `Linkedin`/`Instagram` from
lucide-react v1.14 · `pin:true` with `pinSpacing:false` on full-viewport sections (causes prior-section bleed).
