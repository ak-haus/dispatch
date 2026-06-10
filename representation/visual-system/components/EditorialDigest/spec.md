---artifact: cd4-component-spec
component: EditorialDigest
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 reception (magazine-glossary structure) + C3 page furniture as wayfinding (digest IS wayfinding) + C1 typeface containment (Title for entry headlines + Nav for list-chrome)
mode-crossing: reception-only — homepage "things to read today" + "coming-soon" list; does NOT cross to article surfaces
upstream-cascade:
  - CD1 thesis — §2 Concept 7 reception walking-metaphor + §2 Concept 3 page furniture as wayfinding + Mayor 2026-05-08 New Yorker glossary precedent
  - CD2 color tokens (tokens.color.text.* + tokens.color.lane.* + tokens.color.atmosphere.*)
  - CD3 cartography (cartography.district.<name> — district context per entry)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: EditorialDigest — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# EditorialDigest — Spec scaffold

"Things to read today" + "coming-soon" list on DISpatch homepage. Per CD1 Concept 7 reception + Mayor 2026-05-08 New Yorker precedent: the magazine glossary at homepage top includes feature story (ReceptionHero) + things to read + ticker (LiveTicker) + coming-soon. EditorialDigest IS the things-to-read + coming-soon slot — guides reader through the magazine's editorial rhythm. Per CD1 Concept 3: digest IS wayfinding — typography signals content type before reading; lane indicators communicate cosmology + register at-a-glance.

## Field 1 — Structure

- **Top-level element role.** `<section role="region" aria-labelledby="digest-title">` containing two sub-regions:
  - "Things to read today" — `<h3>` heading + `<ol>`/`<ul>` of entry `<li>`s
  - "Coming soon" — `<h3>` heading + `<ol>`/`<ul>` of forthcoming-entry `<li>`s
- **Slot composition.** Each entry `<li>` composed of:
  - Entry headline `<h4>` (Title slot at compact scale — sets editorial register)
  - Optional standfirst (Body slot; one-sentence preview)
  - Lane indicator + read-time + author chrome
  - Optional MetroMapMarker `compact` variant for cosmological wayfinding (W3 ratifies; currently inclined: yes for "things to read today"; no for "coming-soon" placeholder entries)
  - `<a>` wrapping entry to navigate to article (when published) OR to placeholder for coming-soon
- **Three-layer destination.** `/components/patterns` — homepage composition
- **Mode-crossing declaration.** Reception-only. Renders on homepage; does NOT cross to article surfaces. Article surfaces have their own related-articles affordance (W3 may surface as a separate component or as MetroMapMarker neighbor-nodes).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `things-to-read` | section heading "Things to read today" | full entry list with active-state articles |
| `coming-soon` | section heading "Coming soon" | placeholder entries with subdued visual weight; no `<a>` href (or link to coming-soon detail page); lane indicator subdued |
| `compact-mobile` | mobile breakpoint | tighter spacing; lane indicators stack with headlines |
| `meta-section` (alternative; W3 may surface) | per Mayor adjudication if META content warrants its own digest section | dedicated section for change-log + research-return entries |

## Field 3 — States

- **Interaction states.** Per entry `<a>`: `idle` / `hover` / `focus` / `active`; coming-soon entries may have `disabled-look` state (subdued; non-clickable)
- **Lifecycle states.** `loading` (rare; if digest fetched async) / `loaded` / `error` (rare; digest empty — fallback rendering)

Keyboard navigation: tab through entry links per visual order; arrow-keys within section may be supported (W3 ratifies).

## Field 4 — Accessibility

- **ARIA.** `<section role="region" aria-labelledby="digest-title">` with `<h3>` headings per sub-region; `<ol>`/`<ul>` semantic per ordered/unordered nature; per-entry `<a aria-label="Read: <title>; lane: <lane>; <read-time>">` wrapping; coming-soon entries with `aria-disabled="true"` if non-clickable OR aria-describedby pointing to "coming soon" indicator
- **Keyboard navigation.** Tab through entry links; coming-soon entries skip if non-clickable
- **Screen-reader behavior.** Region announced; sub-region headings announced; entries read in list order; coming-soon entries announced with "coming soon" context
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: headline text + standfirst + lane indicator on `tokens.color.atmosphere.sky-low`; CD2 ratifies threshold values; coming-soon entries use `tokens.color.text.subdued` for diminished visual weight
- **Reduced-motion contract.** Hover-state animations removed; entry-list scroll-into-view animation removed (if applicable)

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (digest is wayfinding chrome, not spectacle)
- **Per-state motion.** Entry `idle → hover` color shift + optional lane-indicator subtle pulse (~150ms); coming-soon entries: no hover state or subdued hover
- **Reduced-motion fallback.** All motion removed; instant state-toggle
- **Atmospheric chrome interaction.** Digest substrate consumes `tokens.color.atmosphere.sky-low`; atmospheric-chrome-not-animated rule applies

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens
- **Per-theme pairing.** Text + lane + atmospheric tokens per theme; coming-soon subdued color per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.primary` (entry headline); `tokens.color.text.secondary` (standfirst + chrome); `tokens.color.text.subdued` (coming-soon entries); `tokens.color.lane.<lane>.fill` (lane indicator)
- **Typography tokens.** `tokens.type.title.500` for sub-region heading (Title slot, DISpatch-locked); `tokens.type.title.500` for entry headline (compact scale); `tokens.type.body.400` for standfirst; `tokens.type.nav.400` for chrome (read-time + author + "coming soon" indicator)
- **Spacing tokens.** `tokens.space.scale.<n>` for digest padding + sub-region spacing + per-entry spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate
- **Cartography tokens.** `cartography.district.<name>` for optional district indicator per entry; `cartography.marker.<role>` if MetroMapMarker compact variant rendered per entry

## Field 8 — Storybook 9 contract

- **Story names.** `ThingsToRead` / `ComingSoon` / `BothSubregions` / `WithMetroMapMarkerCompact` / `MetaSection` (if W3 surfaces) / `CompactMobile` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `entries` (array; default fixture with mix of published + coming-soon) + `subregion` (enum: `things-to-read | coming-soon | both`) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + child-component decorators (MetroMapMarker compact-variant fixtures from CD3)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Text + lane + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD3 dependency.** District-context per entry + optional MetroMapMarker compact variant per entry; CD3 ratifies
- **CD5 dependency.** Hover-state motion; CD5 ratifies durations
- **ReceptionHero distinction.** EditorialDigest = things-to-read + coming-soon LIST. ReceptionHero = feature-story HERO (single article-preview prominent). Distinct components per catalogue §9.12. Reasoning: different role contracts; semantic-componentization commitment per CD1 Concept 5.
- **LiveTicker distinction.** EditorialDigest = curated editorial entries + forthcoming entries (longer-cadence; days-to-weeks). LiveTicker = live commit-tickers + Prime live updates (very-short-cadence; minutes-to-hours). Distinct components; complementary on homepage.
- **MetroMapMarker compact variant.** EditorialDigest entries may render MetroMapMarker compact variant per entry for cosmological wayfinding at glance. W3 ratifies whether per-entry marker appears or whether digest stays purely typographic.
