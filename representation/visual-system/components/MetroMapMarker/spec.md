---artifact: cd4-component-spec
component: MetroMapMarker
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C3 metro-map wayfinding (graphics-only; replaces pyramid representation per DP-Q2 closure) + C2 cartography-grid coordinate-handoff to site-grid + C1 typeface containment (Civic-Dante, asset-locked)
mode-crossing: porous-gradient mode-crosser — primary on article surfaces (article-as-missive position context); condensed mirror on reception (homepage) showing feature-story's marker
upstream-cascade:
  - CD1 thesis — §2 Concept 3 metro-map wayfinding + §2 Concept 2 hierarchical-layered grid (cartography-grid coordinate-handoff)
  - CD2 color tokens (tokens.color.lane.* per cosmology layer)
  - CD3 cartography (cartography.district.* + cartography.marker.* + neighbor-node coupling — co-authored at CD3+CD4 boundary)
  - CD1 thesis Concept 1 5-typeface (Civic-Dante slot, asset-locked, for in-asset typography)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: MetroMapMarker — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# MetroMapMarker — Spec scaffold

*Renamed from CosmologyMarker per CD1 ratification (DP-Q2 closed metro-map, NOT pyramid).* Metro-map "you are here + neighbors + next-stops" graphics-only asset. Tells the reader where they are in the cosmology AND who their neighbors are AND where they can go from here. Per CD1 Concept 3: page furniture is civic wayfinding; the marker IS the metro-map at the article level. Co-authored at CD3+CD4 boundary (CD3 owns cartographic encoding; CD4 owns component shape).

## Field 1 — Structure

- **Top-level element role.** `<aside role="complementary" aria-label="Article position in cosmology">` containing an `<svg role="img" aria-labelledby="...">` rendering the metro-map asset
- **Slot composition.** Composed of:
  - SVG metro-map graphic (cartographic encoding from CD3; cosmology layer indicator + current-node + neighbor-nodes + next-stops)
  - Title-of-current-node text (typographic; Civic-Dante slot per CD1 Concept 1 asset-locked typography)
  - Optional neighbor-node link list (graphics-only at article level per DP-Q2 closure; W3 ratifies whether typographic neighbor-list appears)
- **Three-layer destination.** `/components/patterns` — cartography-coupled compound; coordinates with CartographyCanvas + DistrictMap
- **Mode-crossing declaration.** Porous-gradient mode-crosser. Primary on article surfaces (article-as-missive position context: where in cosmology this article sits). Condensed mirror on reception (homepage feature-story preview: shows feature-story's marker as "where this story lives in the city"). Per-mode variant declared in Field 2.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `article-default` | rendered on article surfaces | full metro-map graphic + current-node + neighbor-nodes + next-stops |
| `article-mobile-compact` | mobile breakpoint | metro-map at compact zoom; current-node + 2 nearest neighbors only |
| `reception-feature-preview` | rendered on homepage feature-story preview | feature-story's marker only; smaller scale; no interactive next-stops |
| `cosmology-layer-pillars` | article in Pillars-cosmology layer | terracotta lane pigment + Pillars-marker silhouette per CD3 |
| `cosmology-layer-inferno` | article in Inferno-cosmology layer | dispatch-red lane pigment + Inferno-marker silhouette (wine-red dispatch markers per CD1 thesis §3) |
| `cosmology-layer-purgatorio` | article in Purgatorio-cosmology layer | graphite-blue lane pigment + Purgatorio-marker silhouette |
| `cosmology-layer-eden` / `paradiso` / `empyrean` | per cosmology layer | per-layer lane pigment + per-layer marker silhouette per CD3 |

## Field 3 — States

- **Interaction states.** `idle` / `hover` / `focus` / `active` per neighbor-node SVG graphic (clickable/tappable to navigate to neighbor article)
- **Lifecycle states.** `loading` (cartographic encoding fetch; rare if SSR'd) / `loaded` / `error` (rare; cartography missing for current article-node — fallback rendering)

Keyboard navigation: tab through neighbor-nodes in metro-map order (W3 ratifies tab-order: clockwise from current-node? Or per cartographic-distance from current-node?).

## Field 4 — Accessibility

- **ARIA.** `<svg role="img" aria-labelledby="metro-map-title metro-map-desc">` with `<title>` + `<desc>` elements describing current node + neighbors + next-stops in prose; per-node link with `aria-label="Article: <title>; cosmology: <layer>; district: <district>"`
- **Keyboard navigation.** Tab through neighbor-nodes per cartographic-order; enter navigates to neighbor article; escape returns focus to before-marker position
- **Screen-reader behavior.** SVG announced via `aria-labelledby` prose description; per-node link announces full cosmological context
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: lane pigments per cosmology layer foreground on `tokens.color.atmosphere.sky-low` background; CD2 ratifies threshold values
- **Reduced-motion contract.** SVG hover/focus animations removed; instant state-toggle

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (page furniture, not spectacle)
- **Per-state motion.** Neighbor-node `idle → hover` color shift (~150ms); current-node-indicator subtle pulse (very-slow ambient drift per CD1 Concept 4 atmospheric-chrome motion-coupling rule; W3 ratifies whether pulse appears or static); cartography flicker (lights-in-the-city per CD1 thesis §4.4 dial principle; CartographyCanvas owns flicker substrate; MetroMapMarker may inherit subtle flicker on its rendering)
- **Reduced-motion fallback.** All motion removed; instant state-toggle; no pulse; no flicker
- **Atmospheric chrome interaction.** Background substrate consumes `tokens.color.atmosphere.window-warm` (warmth on the metro-map "paper" — printed-paper substrate per CD1 Concept 4)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; lane pigments shift per theme; cartographic substrate shifts per theme
- **Per-theme pairing.** Lane pigments per theme + atmospheric substrate per theme + Civic-Dante text color per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.lane.<cosmology-layer>.fill` / `.stroke` (terracotta / graphite-blue / dispatch-red / per cosmology layer); `tokens.color.lane.<cosmology-layer>.text`
- **Typography tokens.** `tokens.type.civic.500` for in-asset Civic-Dante typography (asset-locked per CD1 Concept 1); typeface-slot citation per CD1 5-typeface containment governance
- **Spacing tokens.** `tokens.space.scale.<n>` for marker padding + node-spacing inside SVG
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` background substrate (paper-grain register)
- **Cartography tokens.** `cartography.district.<district>.fill` for district-context coloring; `cartography.marker.<role>.fill` per marker role; `cartography.layer.<cosmology>.silhouette` per cosmology layer (CD3 ratifies cartographic encoding)

## Field 8 — Storybook 9 contract

- **Story names.** `ArticleDefault` / `ArticleMobileCompact` / `ReceptionFeaturePreview` / per-cosmology-layer (`Pillars` / `Inferno` / `Purgatorio` / `Eden` / `Paradiso` / `Empyrean`) / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `cosmologyLayer` (enum) + `currentNode` (object; default fixture) + `neighborNodes` (array; default fixture) + `theme` (enum) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + cartography-encoding decorator (provides cartography stub fixtures from CD3)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Lane pigments per cosmology layer + atmospheric tokens + Civic-Dante text color tokens; CD2 ratifies values + APCA pairings; lane pigments per cosmology layer ratified at CD2 per DP-Q4 adversarial validation
- **CD3 dependency (load-bearing).** Cartographic encoding owns the metro-map graphic; CD3+CD4 boundary co-authors the coordinate-handoff API. CD3 ratifies: marker silhouettes per cosmology layer + neighbor-node algorithm + next-stop algorithm + cartographic-distance metric. CD4 ratifies: component shape + a11y contract + theme integration.
- **CD5 dependency.** Hover/focus motion + optional pulse + cartography flicker (if inherited from CartographyCanvas substrate); CD5 ratifies durations + ease curves + flicker-cadence
- **CartographyCanvas coupling.** MetroMapMarker is a focused asset rendering of the cartography; CartographyCanvas is the ambient substrate. Both consume CD3 cartographic encoding; coordinate-handoff API ensures consistency. W3 implementation pattern: shared cartography-state-management hook.
- **Rename audit (CosmologyMarker → MetroMapMarker).** Per CD1 ratification 2026-05-08 (DP-Q2 closed metro-map, NOT pyramid). Default-14 brief used "CosmologyMarker"; CD1-aware rename follows ratification. See catalogue §3.3 audit trail.
