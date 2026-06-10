---artifact: cd4-component-spec
component: ChapterRail
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C3 page furniture as civic wayfinding (cosmological wayfinding within article) + C1 typeface containment (Nav slot) + C7 porous gradient
mode-crossing: porous-gradient mode-crosser — primary on article surfaces; condensed mirror on reception (homepage) showing current-feature-story chapters
upstream-cascade:
  - CD1 thesis — §2 Concept 3 metro-map wayfinding + §2 Concept 7 porous gradient
  - CD2 color tokens (tokens.color.chrome.*)
  - CD3 cartography (cartography.district.* — current district context coupling)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: ChapterRail — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# ChapterRail — Spec scaffold

Per-article chapter navigation rail. Renders the article's chapter structure as a navigable rail; reader sees where they are in the article + can jump to any chapter. Per CD1 Concept 3 (page furniture as civic wayfinding): chapters function like city blocks within the building's address. Per CD1 Concept 7 porous gradient: ChapterRail crosses from article surfaces back into reception in a condensed form (showing current-feature-story chapters on the homepage).

## Field 1 — Structure

- **Top-level element role.** `<nav aria-label="Article chapters">` containing `<ol>` of `<li>`-wrapped `<a>` elements (chapter links); collapsed-state `<aside>` for preview affordance
- **Slot composition.** Composed of:
  - Chapter list (`<ol>` of chapter `<li>`s with active-state indicator on current chapter)
  - Optional progress indicator (couples to ReadingProgress component per W3 coordination)
  - Collapse-toggle affordance (mobile + opt-in compact)
- **Three-layer destination.** `/components/custom` — Prime extension; per-article state-management
- **Mode-crossing declaration.** Porous-gradient mode-crosser. On article surfaces: primary, full chapter list visible. On reception (homepage): condensed mirror showing current-feature-story chapters as a "what's inside" preview (per CD1 Concept 7: civic-wayfinding crosses from city's map onto building's interior). Per-mode variant declared in Field 2.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `article-default` | rendered on article surfaces | full chapter list + active-state indicator + progress coupling |
| `article-collapsed` | user-toggled or compact viewport | chapter list collapses to current-chapter-name + expand affordance |
| `article-mobile-bottom-sheet` | mobile breakpoint | chapter list renders as bottom-sheet; tap opens sheet |
| `reception-condensed` | rendered on homepage feature-story preview | shows feature-story chapter list as "what's inside" preview; smaller scale; no progress coupling |

## Field 3 — States

- **Interaction states.** `idle` / `hover` / `focus` / `active` per chapter link; `expanded` / `collapsed` (collapse-toggle state); `current-chapter` (the chapter currently in view per scroll position)
- **Lifecycle states.** `loading` (initial chapter-position calculation; rare) / `loaded` / `error` (rare; chapter-anchor missing)

Keyboard navigation: tab through chapter links top-to-bottom (or per visual order in mobile bottom-sheet); arrow-keys within rail when expanded; escape closes mobile bottom-sheet.

## Field 4 — Accessibility

- **ARIA.** `<nav role="navigation" aria-label="Article chapters">`; current-chapter `<a>` with `aria-current="location"`; collapse-toggle button with `aria-controls` referencing rail region + `aria-expanded`
- **Keyboard navigation.** Tab order: chapter[0..n] → collapse-toggle → progress indicator (if focusable); arrow-keys when rail is in expanded-vertical layout; escape closes mobile bottom-sheet
- **Screen-reader behavior.** Nav landmark announced; current-chapter announced via `aria-current`; collapse-toggle announces "Chapter list, collapsed/expanded, button"
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: `tokens.color.chrome.text` foreground on `tokens.color.atmosphere.sky-low` background (default chapter); `tokens.color.chrome.text.active` on same background (current chapter); CD2 ratifies threshold values
- **Reduced-motion contract.** Collapse animation removed; appearance-toggle without transition; smooth-scroll on chapter-jump becomes instant scroll

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (chrome, not spectacle)
- **Per-state motion.** `collapsed → expanded` slide-down (~200ms ease-out); chapter-jump smooth-scroll to anchor (~400ms ease-in-out per CD5 stub); `current-chapter` indicator slide between active chapters as scroll position updates
- **Reduced-motion fallback.** All transitions become instant; smooth-scroll → instant-scroll
- **Atmospheric chrome interaction.** ChapterRail background consumes `tokens.color.atmosphere.sky-low`; atmospheric-chrome-not-animated rule applies

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; no transition motion at theme cycle
- **Per-theme pairing.** Chrome text + chapter-link colors per theme; current-chapter indicator color per theme; collapse-toggle glyph color per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.chrome.text` / `.text.hover` / `.text.active` (current chapter); `tokens.color.chrome.indicator` (current-chapter indicator stroke)
- **Typography tokens.** `tokens.type.nav.500` for chapter-link text (Nav slot, Prime-platform-wide); `tokens.type.nav.400` for collapse-toggle label
- **Spacing tokens.** `tokens.space.scale.<n>` for rail padding + chapter-link spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` background substrate
- **Cartography tokens.** `cartography.district.<name>.fill` for optional district-context coloring of rail edge (W3 ratifies whether district color appears on rail; currently inclined: yes, subtle district-edge tint to reinforce wayfinding-within-district)

## Field 8 — Storybook 9 contract

- **Story names.** `ArticleDefault` / `ArticleCollapsed` / `ArticleMobileBottomSheet` / `ReceptionCondensed` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `currentChapter` (number) + `chapters` (array; default fixture) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + breakpoint-emulator + scroll-position emulator (for current-chapter calculation)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Chrome tokens + atmospheric tokens; CD2 ratifies values
- **CD3 dependency.** District context coupling — ChapterRail consumes `cartography.district.<name>.fill` if district-edge tint variant ratified at W3
- **CD5 dependency.** Collapse motion + smooth-scroll motion + current-chapter-indicator motion; CD5 ratifies durations + ease curves
- **ReadingProgress coupling.** ChapterRail's progress indicator may delegate to ReadingProgress component for scroll-pinned progress (W3 coordination); avoid duplicate scroll-listeners (single-rAF discipline)
- **Reception-mode condensed mirror.** Reception variant renders on homepage as feature-story preview; reads from ReceptionHero's feature-story article reference; no progress coupling on reception (reader hasn't started reading the article)
