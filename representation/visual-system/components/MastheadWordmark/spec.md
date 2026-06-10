---artifact: cd4-component-spec
component: MastheadWordmark
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C1 typeface containment (Title slot, DISpatch-locked) + C6 institutional anchor neighborhood
mode-crossing: cross-surface chrome — appears at masthead position on both reception (homepage) and article surfaces; identical typographic treatment
upstream-cascade:
  - CD1 thesis (representation/visual-system/thesis.md) — §2 Concept 1 5-typeface containment + §2 Concept 6 institutional anchor identity
  - CD2 color tokens (tokens.color.wordmark.* — DP-Q11 wordmark color resolution per master plan)
  - CD3 cartography (no direct coupling)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract — existence + non-empty)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: MastheadWordmark — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# MastheadWordmark — Spec scaffold

The masthead identity fixture for DISpatch — building-name typographic anchor at the top of every surface. Distinct from InstitutionalFixture (which carries the Paradiso seed-mandate). MastheadWordmark IS the building's name; InstitutionalFixture IS the building's mandate.

## Field 1 — Structure

- **Top-level element role.** `<a>` wrapping a typographic `<h1>` or `<span>` (semantic depends on surface — `<h1>` on homepage; `<span>` inside `<header>` on article surfaces where article `<h1>` belongs to the article title)
- **Slot composition.** Single typographic slot rendering "DISpatch" wordmark in Title typeface; optional display-glyph or asset (per CD2 wordmark resolution)
- **Three-layer destination.** `/components/custom` — Prime extension; not a shadcn primitive
- **Mode-crossing declaration.** Cross-surface chrome. Appears at masthead position on reception (homepage) AND article surfaces. Per CD1 Concept 7 porous gradient: identical typographic treatment across modes (cohesion mechanism); semantic-HTML element shifts per surface to preserve heading-hierarchy contract (`<h1>` on homepage; `<span>` inside `<header>` on article surfaces).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | every surface | full wordmark + optional display-glyph |
| `compact` | mobile breakpoint or constrained chrome | wordmark only; display-glyph hidden |
| `hover-link-active` | hover on home link | per CD2 wordmark hover-state token |

## Field 3 — States

- **Interaction states.** `idle` / `hover` / `focus` / `active` (clickable; routes to homepage)
- **Lifecycle states.** N/A (purely chrome; no async lifecycle)

Keyboard navigation: tab-focusable; enter routes to homepage; respects browser-native link semantics.

## Field 4 — Accessibility

- **ARIA.** `<a>` with `aria-label="DISpatch — return to homepage"` (or equivalent per Mayor adjudication on naming); semantic role inherits from `<a>`
- **Keyboard navigation.** Tab-order entry point at every surface (typically first focusable element after skip-link)
- **Screen-reader behavior.** Announces "DISpatch, link" or per-surface variant
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairing: `tokens.color.wordmark.<resolution>` foreground on `tokens.color.atmosphere.sky-low` background; CD2 ratifies threshold values
- **Reduced-motion contract.** `prefers-reduced-motion` removes any hover-state transitions; static rendering

## Field 5 — Motion

- **Motion register.** Static masthead (per CD1 Concept 4 atmospheric-chrome-not-animated rule); only hover-state transitions animate
- **Per-state motion.** `idle → hover` color/opacity transition at single-rAF-discipline duration (CD5 stub: ~150ms ease-out)
- **Reduced-motion fallback.** Hover-state color shift retained (color is not motion); opacity transition removed
- **Atmospheric chrome interaction.** N/A — masthead is not an atmospheric surface

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants shift only color (no motion change)
- **Theme-cycler integration.** Re-renders with new theme tokens; no transition motion at theme cycle (atmospheric-chrome-not-animated rule)
- **Per-theme pairing.** `tokens.color.wordmark.<resolution>.<theme>` foreground on `tokens.color.atmosphere.sky-low.<theme>` background

## Field 7 — Tokens

- **Color tokens.** `tokens.color.wordmark.<copper-as-institution|dispatch-red-with-lane>.fill` (CD2 ratifies DP-Q11 resolution); hover/active states `tokens.color.wordmark.<resolution>.hover` / `.active`
- **Typography tokens.** `tokens.type.title.700` at masthead-display scale (CD2 ratifies scale-ratio + leading); typeface-slot citation per CD1 5-typeface containment governance (Title slot, DISpatch-locked)
- **Spacing tokens.** `tokens.space.scale.<n>` for masthead-region padding (CD2 ratifies scale)
- **Atmospheric chrome tokens.** N/A at component itself; consumed in surrounding masthead chrome
- **Cartography tokens.** N/A — no cartography coupling

## Field 8 — Storybook 9 contract

- **Story names.** `Default` / `Compact` / `HoverLinkActive` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotionLight` / `ReducedMotionDark`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `reducedMotion` (bool)
- **Decorators.** Theme-provider decorator + reduced-motion-media-query decorator + atmospheric-substrate decorator (renders against `tokens.color.atmosphere.sky-low` background)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file IS the component spec
- Row 5 (Chromatic snapshots) — Storybook 9 stories per Field 8 feed Chromatic visual regression in W3+
- Row 6 (axe-core a11y) — Field 4 contract enforced; zero violations in W3+

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** DP-Q11 wordmark color resolution closes at CD2 ratification; `tokens.color.wordmark.*` cross-refs fold per master plan §5.9
- **CD5 dependency.** Hover-state motion duration + ease curve per CD5 single-rAF discipline; CD4 spec scaffolds the contract, CD5 ratifies values
- **Distinct from InstitutionalFixture.** MastheadWordmark = building-name identity at masthead; InstitutionalFixture = Paradiso seed-mandate quietly on every surface. Different containment scopes (Title slot at display scale vs Title slot at quiet scale); different surface coverage (masthead position vs every surface). See catalogue §9.10 Mayor adjudication point.
