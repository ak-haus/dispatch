---artifact: cd4-component-spec
component: DistrictMap
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 reception (district-map + building-layout) + C2 cartography-grid coordinate-handoff + C1 typeface containment (Civic-Dante for in-asset typography)
mode-crossing: reception-only — homepage district-map / building-layout focused asset; does NOT cross to article surfaces (article surfaces use MetroMapMarker for "you are here" instead)
upstream-cascade:
  - CD1 thesis — §2 Concept 7 walking metaphor reception + §2 Concept 2 hierarchical-layered grid + §4.4 cartography commitment
  - CD2 color tokens (tokens.color.lane.* + tokens.color.atmosphere.*)
  - CD3 cartography (cartography.district.* + cartography.building.* — full cartographic encoding at homepage focus zoom)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: DistrictMap — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# DistrictMap — Spec scaffold

Homepage district-map / building-layout cartography surface. Per CD1 Concept 7 reception: the homepage walking-path through what's happening in the offices includes a "district map, building layout" — DistrictMap IS that asset. Distinct from CartographyCanvas (substrate; ambient under every surface) and MetroMapMarker (article-level "you are here"); DistrictMap is a focused homepage asset showing the Editorial District + DISpatch's building layout + neighbor buildings (forward-pointed for V1 per Concept 7 V1 ship scope).

## Field 1 — Structure

- **Top-level element role.** `<section role="region" aria-labelledby="district-map-title">` containing an `<svg role="img" aria-labelledby="...">` OR `<canvas>` (per W3 rendering choice; currently inclined: SVG for accessibility + crisp typography labeling)
- **Slot composition.** Composed of:
  - District boundary outline (Editorial District at homepage focus zoom)
  - DISpatch building layout (reception + offices labeled with Civic-Dante typography)
  - Neighbor-buildings forward-pointed (placeholders showing future-Building positions; rendered subtly per Concept 7 V1 ship scope)
  - Cosmology-position indicators (Editorial District in Inferno cosmology; per CD1 thesis §4.2 Divine Comedy + American-grid frame)
  - Optional zoom-controls (W3 ratifies whether interactive or static at V1)
- **Three-layer destination.** `/components/patterns` — cartography-coupled compound; coordinates with CartographyCanvas
- **Mode-crossing declaration.** Reception-only. Renders on homepage; does NOT cross to article surfaces. Article surfaces use MetroMapMarker for cosmological wayfinding instead. Per CD1 Concept 7 reception walking-metaphor: DistrictMap IS the homepage's "district map, building layout" — a reception-specific asset.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | rendered on homepage | full district outline + DISpatch building layout + forward-pointed neighbors + cosmology-position indicators |
| `static` | reduced-motion fallback OR W3 V1 ship if interactive zoom deferred | static SVG; no zoom-controls; no flicker (CartographyCanvas substrate inherits its own atmospheric register) |
| `interactive-zoom` (W3 may surface) | per Mayor adjudication at W3 | zoom-controls + pan; districts + buildings clickable for navigation |
| `compact-mobile` | mobile breakpoint | smaller scale; cosmology-position indicators stack; zoom controls collapsed |

## Field 3 — States

- **Interaction states.** District / building hover + focus + active (clickable per `interactive-zoom` variant; static otherwise); zoom-controls if interactive
- **Lifecycle states.** `loading` (cartographic encoding fetch; SSR'd if possible) / `loaded` / `error` (rare; cartographic encoding missing — fallback to placeholder rendering)

Keyboard navigation: tab through interactive elements (buildings if clickable; zoom-controls if present); arrow-keys for pan if interactive variant.

## Field 4 — Accessibility

- **ARIA.** `<section role="region" aria-labelledby="district-map-title">`; `<svg role="img" aria-labelledby="district-map-title district-map-desc">` with `<title>` + `<desc>` describing district + buildings + cosmology-position; per-building link with `aria-label="Building: <name>"`
- **Keyboard navigation.** Tab through interactive buildings (clickable in `interactive-zoom`); zoom-controls focusable; arrow-keys for pan
- **Screen-reader behavior.** Region landmark announced; SVG announced via title+desc prose; building links announce full context
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: cartographic line + label foreground on `tokens.color.atmosphere.window-warm` background; cosmology-indicator foreground on substrate; CD2 ratifies threshold values
- **Reduced-motion contract.** Hover/focus animations removed; pan animations removed; zoom transitions removed; static rendering

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (homepage focus asset; reception is more dial-up than article surfaces but still atmospheric-not-spectacle per CD1 Concept 4)
- **Per-state motion.** Building hover-state color shift (~150ms); cosmology-indicator subtle pulse (very-slow ambient drift; CD1 Concept 4 motion-coupling rule); zoom-transition (~400ms ease-in-out per `interactive-zoom`); flicker inherited from CartographyCanvas substrate (W3 ratifies coupling)
- **Reduced-motion fallback.** All motion removed; instant state-toggle; no pulse; no flicker; no zoom-transition (instant zoom)
- **Atmospheric chrome interaction.** DistrictMap renders ON warm-paper substrate (`tokens.color.atmosphere.window-warm`); the substrate is shared with InstitutionalFixture (paper-grain register; printed-cartography feel)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; lane pigments + cartographic line colors shift per theme; CartographyCanvas substrate underneath shifts in coordination
- **Per-theme pairing.** Lane pigments + cartographic line colors + Civic-Dante text color + atmospheric substrate per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.lane.<cosmology-layer>.fill` / `.stroke` (Editorial District = Inferno layer; per CD1 thesis §4.2); `tokens.color.cartography.line` (district + building outlines); `tokens.color.cartography.label` (label text color)
- **Typography tokens.** `tokens.type.civic.500` for district + building names (Civic-Dante slot, asset-locked per CD1 Concept 1; NYC green street-sign feel "burned in"); `tokens.type.civic.400` for cosmology-position indicators
- **Spacing tokens.** `tokens.space.scale.<n>` for asset padding + label spacing inside SVG
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` background substrate
- **Cartography tokens.** `cartography.district.editorial-district.*`; `cartography.building.dispatch.*`; `cartography.building.<neighbor-forward-pointed>.*` per CD3 encoding

## Field 8 — Storybook 9 contract

- **Story names.** `Default` / `Static` / `InteractiveZoom` / `CompactMobile` / per-cosmology-layer (`InfernoFocus` / etc.) / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `cartographicEncoding` (object; default fixture from CD3) + `currentBuilding` (string) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate (warm-paper) + cartography-encoding decorator (provides cartography stub fixtures from CD3) + paper-grain decorator

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Lane pigments + cartographic line + label colors + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD3 dependency (load-bearing).** Cartographic encoding for Editorial District + DISpatch building + forward-pointed neighbors; CD3 ratifies encoding at homepage focus zoom; coordinate-handoff API co-authored at CD3+CD4 boundary
- **CD5 dependency.** Hover + pulse + zoom-transition motion; flicker coupling to CartographyCanvas substrate; CD5 ratifies durations + ease curves
- **CartographyCanvas coupling.** DistrictMap is a focused homepage asset; CartographyCanvas is the ambient substrate. Both consume CD3 cartographic encoding via shared cartography-state-management hook (W3 implementation pattern). DistrictMap may be rendered AS a layer atop CartographyCanvas substrate (W3 ratifies layering pattern).
- **MetroMapMarker distinction.** DistrictMap = homepage district-map / building-layout focused asset (reception only). MetroMapMarker = article-level "you are here + neighbors + next-stops" (article surfaces). Different role contracts; different surface coverage. See catalogue §9.11 Mayor adjudication point.
- **Forward-pointed neighbors discipline.** Per CD1 Concept 7 V1 ship scope (building-and-below stack): city + districts + neighbor-buildings forward-pointed. DistrictMap renders forward-pointed neighbors subtly (placeholder positions; rendered with diminished visual weight to communicate anticipatory-not-missing per CD1 thesis §5 Apple-cohesion test framing).
