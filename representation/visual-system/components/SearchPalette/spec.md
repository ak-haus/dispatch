---artifact: cd4-component-spec
component: SearchPalette
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C3 page furniture as civic wayfinding (search as civic infrastructure) + C7 porous gradient (palette opens from any surface where SearchPalette trigger is exposed) + C1 typeface containment (Nav for chrome + Meta-code for query/match render)
mode-crossing: porous-gradient — palette is a global affordance; trigger HIDDEN on article surfaces per CD1 Concept 7 article-as-sanctuary discipline; user may still cmd-K direct-shortcut on article surfaces (W3 ratifies whether shortcut works on article surfaces or palette is fully article-disabled)
upstream-cascade:
  - CD1 thesis — §2 Concept 3 page furniture as civic wayfinding + §2 Concept 7 porous gradient + Mayor sanctuary discipline
  - CD2 color tokens (tokens.color.chrome.* + tokens.color.atmosphere.* + tokens.color.text.meta)
  - CD3 cartography (cartography.district.<name> + article-node search index)
  - CD5 motion (single-rAF discipline; palette open/close motion; reduced-motion fallback)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: SearchPalette — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# SearchPalette — Spec scaffold

Site-wide cmd-K palette. Search as civic infrastructure per CD1 Concept 3: page furniture is civic wayfinding; the palette IS the navigational rail of the city. Per CD1 Concept 7 porous gradient: palette is a global affordance, but trigger HIDDEN on article surfaces per article-as-sanctuary discipline. Per CD1 Concept 1: Nav typography for chrome; Meta-code typography for query/match render (queries feel like terminal-search; matches feel like grep-output).

## Field 1 — Structure

- **Top-level element role.** `<dialog role="dialog" aria-modal="true" aria-labelledby="search-palette-title">` containing palette composition
- **Slot composition.** Composed of:
  - Search input `<input type="search" aria-label="Search DISpatch">` (Meta-code typography for query render)
  - Match-list region `<ul role="listbox">` of match `<li role="option">`s
  - Per-match composition:
    - Match-type indicator (article / district / building / footnote / DLDS)
    - Match title (Nav typography)
    - Match snippet (Body typography for prose; Meta-code for code-segments inline; query-highlight via match-fragment styling)
    - Cosmology-position indicator + lane pigment if applicable
  - Empty-state slot (when no matches)
  - Loading-state slot
  - Footer with keyboard-shortcut hints (Meta-code typography)
- **Three-layer destination.** `/components/custom` — Prime extension; cmd-K state-management
- **Mode-crossing declaration.** Porous-gradient global affordance. Trigger button rendered in SiteNav `reception` variant; HIDDEN on SiteNav `article` variant per article-as-sanctuary discipline. Cmd-K direct-shortcut: W3 ratifies whether shortcut works on article surfaces (consistent global affordance) OR palette is fully article-disabled (strict sanctuary). Currently inclined toward shortcut-active on article surfaces (consistency-of-affordance for power users) but trigger button hidden (visual-discipline for casual readers).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | typical desktop | full palette with input + match list + footer hints |
| `mobile` | mobile breakpoint | full-screen overlay; on-screen-keyboard takes input region |
| `district-scoped` (alternative; W3 may surface) | per palette opt-in | search scoped to current district |
| `cosmology-scoped` (alternative; W3 may surface) | per palette opt-in | search scoped to current cosmology layer |

## Field 3 — States

- **Interaction states.** Palette: `closed` / `opening` / `open` / `closing`; input: `idle` / `focus` / `active`; per-match: `idle` / `hover` / `focus` / `active` (current-selected via keyboard)
- **Lifecycle states.** `loading` (initial fetch when palette opens) / `searching` (debounced query in progress) / `loaded` (matches rendered) / `empty` (no matches for query) / `error` (rare; search index failure)

Keyboard navigation: cmd-K opens palette; escape closes; arrow-up/down navigates matches; enter activates current-selected match.

## Field 4 — Accessibility

- **ARIA.** `<dialog role="dialog" aria-modal="true" aria-labelledby="search-palette-title">`; `<input type="search" aria-label="Search DISpatch" aria-controls="match-list" aria-expanded aria-activedescendant>`; `<ul role="listbox" id="match-list">` of `<li role="option" aria-selected>`s; live announcement for match-count via aria-live="polite"
- **Keyboard navigation.** cmd-K (or ctrl-K on Windows/Linux) opens palette; escape closes; arrow-up/down navigates matches; enter activates; focus-trap inside dialog while open; focus returns to trigger (or to article body if cmd-K direct-shortcut on article surface) on close
- **Screen-reader behavior.** Dialog announced on open; match-count announced via aria-live; per-match announces match-type + title + cosmology-position; current-selected announced via aria-activedescendant
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: input text (Meta-code) + match title (Nav) + match snippet (Body) on `tokens.color.atmosphere.sky-low`; query-highlight on match-snippet; CD2 ratifies threshold values
- **Reduced-motion contract.** Open/close animations removed; instant appearance-toggle; backdrop fade removed

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (chrome affordance, not spectacle)
- **Per-state motion.** Palette `closed → open` slide-in + backdrop fade-in (~250ms ease-out); `open → closed` reverse (~200ms ease-in); per-match selection-indicator slide between matches as user navigates (~100ms; subtle)
- **Reduced-motion fallback.** All transitions become instant; backdrop fade removed
- **Atmospheric chrome interaction.** Palette substrate consumes `tokens.color.atmosphere.window-warm` (warm-paper register; printed-search-card feel); backdrop consumes `tokens.color.atmosphere.sky-low` at reduced-opacity overlay

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; palette stays open during theme cycle if user-toggled; tokens shift per theme
- **Per-theme pairing.** Input chrome + match list + match prose + atmospheric substrate + lane indicators per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.chrome.text` (match title); `tokens.color.text.primary` (match snippet); `tokens.color.text.meta` (input text); `tokens.color.text.highlight` (query-highlight on snippet); `tokens.color.lane.<lane>.fill` (lane indicator per match); `tokens.color.atmosphere.window-warm` (palette substrate); `tokens.color.atmosphere.sky-low` (backdrop)
- **Typography tokens.** `tokens.type.meta.500` for input text + footer keyboard-shortcuts (Meta-code slot per terminal-search register); `tokens.type.nav.500` for match title (Nav slot Prime-platform-wide); `tokens.type.body.400` for match snippet (Body slot for prose); `tokens.type.meta.400` for code-segments inline in snippets
- **Spacing tokens.** `tokens.space.scale.<n>` for palette padding + input region + match list spacing + per-match internal spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` substrate; `tokens.color.atmosphere.sky-low` backdrop
- **Cartography tokens.** `cartography.district.<name>` for district indicator per match; `cartography.layer.<cosmology>` for cosmology indicator per match

## Field 8 — Storybook 9 contract

- **Story names.** `Closed` / `Opening` / `Open` / `Searching` / `Loaded` / `Empty` / `Error` / `Mobile` / `DistrictScoped` (if W3 surfaces) / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `paletteState` (enum: `closed | opening | open | closing`) + `lifecycleState` (enum) + `query` (string) + `matches` (array; default fixture) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + search-index-emulator decorator (provides match fixtures from CD3 article-node index) + dialog-portal decorator

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations; focus-trap + aria-modal compliance load-bearing

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Chrome + text + lane + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD3 dependency.** Article-node search index + district context per match + cosmology layer per match; CD3 ratifies index encoding
- **CD5 dependency.** Open/close motion + per-match selection motion + backdrop fade; CD5 ratifies durations + ease curves
- **SiteNav coupling.** SiteNav HOSTS the palette trigger button; SiteNav `reception` variant renders trigger; SiteNav `article` variant HIDES trigger per sanctuary discipline. Palette state-management coordinated via shared state hook (W3 implementation pattern).
- **Article-surface cmd-K direct-shortcut decision.** Currently inclined toward shortcut-active on article surfaces (consistency-of-affordance for power users) but trigger button hidden (visual discipline for casual readers); Mayor adjudicates at W3 implementation gate per per-component CD revisions row.
- **Search index sourcing.** Astro server-rendered search-index per master plan §3.B; CD3 cartography encoding feeds district/cosmology metadata per article-node; CD2 lane pigments per article render in match list.
