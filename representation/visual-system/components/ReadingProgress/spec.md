---artifact: cd4-component-spec
component: ReadingProgress
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C4 surface texture as atmosphere (subtle, not spectacle) + C7 article-as-sanctuary (article-only sanctuary affordance)
mode-crossing: article-only — does NOT cross to reception per CD1 Concept 7 sanctuary affordance discipline; reception has no progress to track
upstream-cascade:
  - CD1 thesis — §2 Concept 4 atmosphere as physical substrate + §2 Concept 7 article-as-sanctuary affordance
  - CD2 color tokens (tokens.color.atmosphere.* + tokens.color.chrome.indicator)
  - CD5 motion (single-rAF discipline; scroll-pinned reading-progress; reduced-motion fallback)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: ReadingProgress — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# ReadingProgress — Spec scaffold

Scroll-pinned reading-progress indicator. Article-only affordance per CD1 Concept 7 sanctuary discipline. Renders subtle progress through the article (linear bar OR quiet typographic percentage); never spectacle. Per CD1 Concept 4: surface texture as atmosphere — the indicator IS atmospheric chrome at the article surface, not a screen-illuminated UI element.

## Field 1 — Structure

- **Top-level element role.** `<div role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="<current>">`
- **Slot composition.** Single bar slot (linear progress bar) OR percentage slot (typographic percentage rendering); W3 ratifies single-affordance-form (currently inclined: linear bar at top of viewport, ~2-3px height)
- **Three-layer destination.** `/components/custom` — Prime extension; scroll-listener + single-rAF reactive
- **Mode-crossing declaration.** Article-only. Does NOT render on reception (reception has no progress to track); per CD1 Concept 7 sanctuary affordance discipline (article-only affordances preserve reading register).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `linear-bar` (currently inclined) | always at V1 | linear horizontal progress bar at top of article viewport |
| `typographic-percentage` (alternative; W3 may surface) | per Mayor adjudication if linear-bar feels too UI-like | quiet typographic "X%" rendering in margin or footer chrome |
| `hidden` | reduced-motion-and-no-scroll-position OR article-completed | indicator hidden when not actionable |

## Field 3 — States

- **Interaction states.** Non-interactive (read-only progress indicator); no hover/focus/active states
- **Lifecycle states.** `loading` (initial scroll-position calculation) / `tracking` (active scroll) / `completed` (scrolled past article end; indicator may auto-hide per `hidden` variant)

## Field 4 — Accessibility

- **ARIA.** `role="progressbar"` with `aria-label` + `aria-valuemin` + `aria-valuemax` + `aria-valuenow`; updates as scroll progresses
- **Keyboard navigation.** Non-focusable (read-only indicator); does not enter tab order
- **Screen-reader behavior.** Announced as progress value at appropriate intervals (W3 ratifies: every 10% OR on article-end)
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairing: `tokens.color.chrome.indicator` foreground on `tokens.color.atmosphere.sky-low` background; CD2 ratifies threshold values; indicator is subtle (warmth, not loudness)
- **Reduced-motion contract.** `prefers-reduced-motion` removes single-rAF scroll-coupling; indicator updates on scroll-end only (debounced) instead of every frame

## Field 5 — Motion

- **Motion register.** Single-rAF scroll-coupling per CD5 motion register; the indicator IS a motion target (scroll-pinned)
- **Per-state motion.** Width transition coupled to scroll position (~16ms cadence at typical scroll); article-completed `tracking → hidden` fade (~300ms ease-out per CD5 stub)
- **Reduced-motion fallback.** Single-rAF coupling → debounced scroll-end-only update; fade animation removed (instant hide)
- **Atmospheric chrome interaction.** Indicator color CONSUMES atmospheric token (`tokens.color.atmosphere.window-warm` or `tokens.color.chrome.indicator`); the indicator is rendered AS atmospheric chrome (paper-grain register; printed-bookmark feel per CD1 Concept 4)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; no transition motion at theme cycle (atmospheric-chrome-not-animated rule)
- **Per-theme pairing.** Indicator color per theme; substrate color per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.chrome.indicator` (indicator fill); `tokens.color.atmosphere.sky-low` (track background)
- **Typography tokens.** `tokens.type.meta.500` for typographic-percentage variant (Meta-code slot, component-locked); N/A for linear-bar variant
- **Spacing tokens.** `tokens.space.scale.<n>` for indicator height (~2-3px) + indicator margin
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` for indicator fill (paper-grain register; warmth-not-loudness)
- **Cartography tokens.** N/A — no cartography coupling

## Field 8 — Storybook 9 contract

- **Story names.** `LinearBar` / `TypographicPercentage` / `Hidden` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `progress` (number 0-100) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + scroll-position emulator (sets `progress` to simulate scroll)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Atmospheric tokens + chrome.indicator token; CD2 ratifies values
- **CD5 dependency.** Single-rAF scroll-coupling discipline + reduced-motion debounce strategy; CD5 ratifies the discipline; CD4 cites
- **ChapterRail coupling.** ChapterRail may delegate progress visualization to ReadingProgress (avoid duplicate scroll-listeners); single-rAF discipline coordinated at W3 implementation per master plan §3.A CD5
- **Article-only sanctuary discipline.** Per CD1 Concept 7: ReadingProgress is one of the article-as-sanctuary affordances that does NOT cross to reception. Mayor adjudicated the sanctuary discipline at CD1; CD4 spec inherits.
