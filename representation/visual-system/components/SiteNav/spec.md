---artifact: cd4-component-spec
component: SiteNav
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C1 typeface containment (Nav slot, Prime-platform-wide) + C3 page furniture as civic wayfinding
mode-crossing: cross-surface chrome — full search affordance on reception; search affordance HIDDEN on article surfaces (sanctuary preservation per CD1 Concept 7 porous gradient)
upstream-cascade:
  - CD1 thesis — §2 Concept 1 5-typeface containment (Nav slot Prime-platform-wide) + §2 Concept 3 page furniture as civic wayfinding
  - CD2 color tokens (tokens.color.chrome.* + tokens.color.atmosphere.*)
  - CD3 cartography (no direct coupling at SiteNav itself; SearchPalette opens FROM SiteNav and consumes cartography)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: SiteNav — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# SiteNav — Spec scaffold

Top-level navigation chrome — the orientation rail of the publication. Carries Prime-platform-wide identity through the Nav typeface; coexists with MastheadWordmark at masthead chrome; opens SearchPalette via affordance.

## Field 1 — Structure

- **Top-level element role.** `<nav>` with `aria-label="Primary navigation"`
- **Slot composition.** Composed of three slot regions:
  - **Left.** MastheadWordmark slot (or wordmark-adjacent positioning per layout)
  - **Center.** Primary-link slot (`<ul>` of `<li>`-wrapped `<a>` elements; nav-section names)
  - **Right.** Affordances slot (SearchPalette trigger button + theme-cycler + optional account/auth affordance)
- **Three-layer destination.** `/components/custom` — Prime extension; orchestrates child components
- **Mode-crossing declaration.** Cross-surface chrome with per-mode variant. On reception (homepage): full SearchPalette trigger visible + full nav-link set. On article surfaces: SearchPalette trigger HIDDEN (article-as-sanctuary affordance preservation per CD1 Concept 7); nav-link set may compress to "back to DISpatch" + theme-cycler. Per-mode variant declared in Field 2.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `reception` | rendered on homepage / index surfaces | full nav-link set + SearchPalette trigger visible + theme-cycler |
| `article` | rendered on article surfaces | compressed nav-link set ("back to DISpatch") + SearchPalette trigger HIDDEN per Concept 7 sanctuary + theme-cycler |
| `compact-mobile` | mobile breakpoint | hamburger menu + SearchPalette trigger as icon-only (reception) or hidden (article) |

## Field 3 — States

- **Interaction states.** `idle` / `hover` / `focus` / `active` per nav-link + per affordance button
- **Lifecycle states.** `expanded` / `collapsed` (mobile-menu state); `palette-open` / `palette-closed` (SearchPalette trigger state)

Keyboard navigation: tab through links left-to-right; arrow-keys within hamburger-menu when expanded; escape closes mobile menu / closes palette.

## Field 4 — Accessibility

- **ARIA.** `<nav role="navigation" aria-label="Primary navigation">`; SearchPalette trigger button with `aria-haspopup="dialog"` + `aria-expanded` reflecting palette state; mobile-menu hamburger with `aria-controls` referencing menu region + `aria-expanded`
- **Keyboard navigation.** Tab order: MastheadWordmark → primary-link[0..n] → SearchPalette trigger → theme-cycler → optional account; arrow-key handling within mobile menu when expanded; escape closes mobile menu / closes palette
- **Screen-reader behavior.** Nav landmark announced on entry; SearchPalette trigger announces "Search, button, opens dialog"; theme-cycler announces current theme + "button"
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairing: `tokens.color.chrome.text` foreground on `tokens.color.atmosphere.sky-low` background; nav-link hover state pairing `tokens.color.chrome.text.hover` on same background
- **Reduced-motion contract.** Mobile-menu expand/collapse animation removed; appearance-toggle without transition

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (chrome, not spectacle)
- **Per-state motion.** Mobile-menu `collapsed → expanded` slide-down (~200ms ease-out); SearchPalette trigger `idle → hover` color shift (~150ms); theme-cycler theme-cycle handled by CartographyCanvas + atmospheric tokens (NOT by SiteNav)
- **Reduced-motion fallback.** All transitions become instant appearance-toggle
- **Atmospheric chrome interaction.** SiteNav background consumes `tokens.color.atmosphere.sky-low`; atmospheric-chrome-not-animated rule applies (substrate static at scroll cadence)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** SiteNav HOSTS the theme-cycler affordance; clicking the affordance triggers global theme change; SiteNav re-renders with new theme tokens
- **Per-theme pairing.** Chrome text + nav-link colors per theme; SearchPalette trigger background + border per theme; theme-cycler glyph rotates between sun/moon/dial per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.chrome.text` / `.text.hover` / `.text.active`; `tokens.color.chrome.background`; `tokens.color.chrome.border`
- **Typography tokens.** `tokens.type.nav.500` for nav-link text (Nav slot, Prime-platform-wide; CD1 Concept 1); `tokens.type.nav.400` for affordance labels
- **Spacing tokens.** `tokens.space.scale.<n>` for nav-region padding + nav-link spacing + affordance spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` background substrate
- **Cartography tokens.** N/A — no direct coupling at SiteNav itself

## Field 8 — Storybook 9 contract

- **Story names.** `Reception` / `Article` / `CompactMobile` / `MobileMenuExpanded` / `PaletteOpen` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `mobileMenuOpen` (bool) + `paletteOpen` (bool) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + breakpoint-emulator decorator (mobile breakpoint testing)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Chrome tokens + atmospheric tokens + theme tokens; CD2 ratifies values
- **CD5 dependency.** Mobile-menu motion + theme-cycler interaction motion; CD5 ratifies durations + ease curves
- **SearchPalette coupling.** SiteNav HOSTS the trigger; SearchPalette is a separate component (per catalogue §3.1 #18); palette-open state coordinated via shared state-management pattern (per W3 implementation)
- **Article-mode SearchPalette hiding.** Per CD1 Concept 7 article-as-sanctuary; SearchPalette trigger NOT rendered on article surfaces; reader uses cmd-K direct shortcut if they know it (or palette is fully unavailable on article surfaces — Mayor adjudicates per W3 implementation)
