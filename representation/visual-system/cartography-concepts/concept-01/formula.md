---artifact: cartography-formula
authored: 2026-05-10 by W3-S-C cartography concept iteration instance
status: active
discipline-refs:
  - Mayor 2026-05-10 directive: "every line, placement, color, graphic integration must earn its place; map must give the illusion it could be a real walkable city"
  - feedback_a_game_session_discipline.md — research-first + audit-every-gate
  - feedback_long_running_tool_progress_surface.md — pre-announce duration
canon-inheritance:
  - CD1 thesis (7 universal concepts + cosmology metaphor + walking metaphor)
  - CD2 color (Vellum + 3 lane pigments + APCA + wordmark composition)
  - CD3 cartography (5 expression-layers + dial principle + cosmology surfacing)
  - CD4 components (20-component inventory + 7-field spec template)
  - CD5 motion (atmospheric-chrome-not-animated + Motion v12/GSAP/Lenis)
  - W2-S-F typography (Pangram Editorial New Bold wordmark + Pangram Sans Extrabold nav + new platform-copper accent)
sources-used:
  - Mayor MJ batch 2 winners (Winner 1 Zip Code Reference + Winner 2 Architectural Site Plan + Winner 3 multi-ref blueprint+zipcode + Winner 4 zipcode+sketch)
  - Mayor Blueprint inspo folder (NYC + Houston zip code maps + Picture4nyc luminous editorial)
  - Watabou City Generator procgen outputs (iteration-01 medieval-walled + iteration-02-large-nowalls Twilight Hill)
  - OpenStreetMap default style hierarchy (well-published cartographic standard)
  - Kevin Lynch "The Image of the City" (1960) — paths/edges/districts/nodes/landmarks
  - Real urban typology: Brooklyn brownstone (~80m block) / Manhattan grid (264×900ft) / European medieval (~50m plaza radius)
title: DISpatch — Cartography FORMULA (V1)
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
generated: true
---

# DISpatch — Cartography FORMULA (V1)

The granular implementation specification for V1 DISpatch cartography substrate, repeatable across homepage / article / sitemap surfaces, extensible to future Prime Buildings. Every element below carries a **WHY** justification so the formula reads as a rational design system, not aesthetic improvisation.

## §1 — Canvas inheritance (what canon the formula stands on)

### §1.1 CD1 seven universal concepts → cartographic expression

| CD1 Concept | Cartographic expression in FORMULA |
|---|---|
| **C1 — 5-typeface containment governance** | Locked typeface slots: Wordmark = Pangram Editorial New Bold (W2-S-F); Body = Crimson Pro; Nav = Pangram Sans Extrabold (W2-S-F); Meta-code = JetBrains Mono; Civic/Dante = asset-locked (deferred to W5). All map labels respect these slots. |
| **C2 — Grid-as-architectural-document** | Cartographic lanes mirror site-grid CSS columns 1:1 per CD2 Decision 5 cosmology-symmetry — 3 lanes (Editorial/Institutional/Dispatch) expressed both spatially in cartography and structurally in CSS columns |
| **C3 — Page-furniture-as-civic-wayfinding** | District names + neighborhood labels + street names function as civic-wayfinding signage (NYC street-sign register: Pangram Sans Extrabold tracked-out caps for districts; Inter sans for streets) |
| **C4 — Atmosphere-as-physical-substrate** | Paper-grain texture + contour-warm gradient + Vellum substrate layers compose the "printed paper" feeling per Paris Review precedent (CD1 reference-archive §1 Concept 4) |
| **C5 — Multi-voice typography as marriage of registers** | Wordmark (Editorial New) carries narrative-literary register; Nav (Pangram Sans) carries technical-grotesque register; both compose at masthead per CD2 Decision 7 split-color cosmology |
| **C6 — Paradiso seed-mandate institutional fixture = THE BAR** | Institutional fixture renders below cartography per CD1 Concept 6 + Signal 011; cartography itself MUST hold the bar (every element earns place per Mayor 2026-05-10 directive) |
| **C7 — Walking metaphor** | Per-surface zoom calibration (homepage = district perspective; article = magazine-corner perspective; sitemap = whole-Prime perspective per CD3 §2.6 unified-grid reframe Signal 009) |

### §1.2 CD2 color binding

| Element | Token reference | Why |
|---|---|---|
| **Substrate (Dawn)** | `--sky-low` `oklch(0.96 0.012 88)` | CD2 Vellum atmospheric scale; matches MJ Winner 1+4 warm-paper substrate |
| **Substrate elevated regions** | `--sky-high` `oklch(0.99 0.005 88)` | CD2 atmospheric reflectivity — used at magazine-corner highlight |
| **Substrate contour zones** | `--reflect` `oklch(0.92 0.020 88)` + `--window-warm` `oklch(0.87 0.030 85)` | CD2 atmospheric reflectivity scale — radial gradient focus at magazine-corner |
| **Editorial-lane districts** | `--lane-editorial-fill` `oklch(0.62 0.13 35)` family (lightened to 0.78-0.92 for fills) | CD2 Decision 5 Surface cosmology vector (terracotta family); matches MJ Winner 1 terracotta zones |
| **Institutional-lane districts** | `--lane-institutional-fill` `oklch(0.45 0.07 240)` family (lightened to 0.82-0.92 for fills) | CD2 Decision 5 Above cosmology vector (graphite-blue family); matches MJ Winner 1 slate zones |
| **Dispatch-lane markers** | `--accent-prime` `oklch(0.55 0.18 22)` | CD2 Decision 5 Below cosmology vector (Inferno-surfacing); applied to Inferno dispatch markers per CD3 §6 |
| **Wordmark composition** | `DIS` `--accent-prime` red + `patch` `--text-primary` `oklch(0.18 0.015 55)` | CD2 Decision 7 Option C ratified split-color cosmology composition |
| **Nav-state accent** | `--platform-copper` (W2-S-F Decision 8 amendment; OKLCH pending Mayor canon-promotion) | W2-S-F Decision 8 — nav hover/active state register |
| **APCA contrast validation** | Text-on-cartography pairings must pass APCA Lc 60+ for body text; Lc 75+ for labels at small sizes (<14px) | CD2 APCA framework; ensures legibility for any text rendered over the cartographic substrate |

### §1.3 CD3 5 expression-layers + cosmology surfacing

**5 expression-layers** (per CD3 §2.0) bind to FORMULA §5 layer architecture:

| CD3 Layer | FORMULA section | V1 status |
|---|---|---|
| Layer 1 — Procgen base | §5.2 District + Street network | Watabou outputs as reference; coded SVG generation V1 |
| Layer 2 — Concept iteration | (used at concept-01 ideation; not production runtime) | Inkarnate held; deferred per tool-fit assessment 2026-05-10 |
| Layer 3 — Production runtime | §8 component architecture (W4 Mapbox-vs-MapLibre cascade) | Defer to W4 |
| Layer 4 — Atmospheric overlay | §5.1 Substrate (paper grain + contour-warm) | V1 — CSS + SVG feTurbulence |
| Layer 5 — 3D + concept-art | (concept-iteration; not V1) | Defer |

**Cosmology surfacing** (per CD3 §3.2.3 + Signal 010 Reframe 2):

| Cosmology layer | Cartographic surfacing form | Justification |
|---|---|---|
| **Inferno** | Wine-red dispatch markers ($--accent-prime$) at semantically meaningful positions (CI/CD nodes, agent activity, observability) | CD3 §6.2 + Signal 010 — "this is why red is Prime's accent color"; Inferno = utility infrastructure popping up |
| **Paradiso = THE BAR** | Institutional fixture below cartography + typographic dignity of wayfinding signage (Pangram Editorial New for district names) | CD1 Concept 6 + Decision 7 + Signal 011 Paradiso=BAR; surfaces atmospherically NOT as graphic marker per Mayor 2026-05-10 |
| **Histories** | Lineage rail at right edge of district (stack-of-archived-layers vertical strokes + "N predecessors" affordance) | CD3 §5.6 deep-archive-accessible-on-demand discipline; NOT primary navigable |
| **Pillars** | Inherited at construction (every element inherits Pillar properties per cosmology layer rule #1) | NOT visible as cartographic feature per CD3 §7 default register |
| **Eden** | TBD-future-arc (allied-meta indicators) | OUT-OF-SCOPE V1 per CD3 §5.3 |
| **Empyrean** | OUT-OF-SCOPE V1 per cosmology layer rule #11 | Orthogonal to pipeline |

### §1.4 CD4 components + 7-field spec template

Every component in FORMULA §8 follows CD4 §4 7-field spec template: **Structure / Variants / States / a11y / Motion / Theme / Tokens**.

20-component inventory references (CD4 §3.1): #1 MastheadWordmark · #2 SiteNav · #8 MetroMapMarker · #11 InstitutionalFixture · #12 CartographyCanvas · #16 DistrictMap · plus 3 provisional W3-S-C candidates (CartographyOverlay / DistrictsDirectory / HistoriesLineageRail — Mayor adjudication for CD4 amendment if promoted).

### §1.5 CD5 motion register

| Rule | Source | Application |
|---|---|---|
| **Atmospheric chrome NOT animated as primary motion target** | CD5 + RES-009 fold | Substrate (paper grain, contour-warm, district fills) STATIC at scroll cadence |
| **Theme-cycle + very-slow ambient drift allowed** | CD1 Concept 4 motion-coupling rule | Theme transitions (Dawn↔Night) can animate cartography palette; ambient drift on Inferno markers acceptable |
| **Reduced-motion FLOOR (WCAG 2.1 SC 2.3.3)** | CD5 §1 + W3-S-A discipline | All animations wrapped in `@media (prefers-reduced-motion: no-preference)`; static fallback always available |
| **Motion tool allocation** | CD5 §2 | Motion v12 = component-level transitions; GSAP = complex coordinated sequences; Lenis = scroll-smooth coupling; SVG animation for Inferno marker pulses (CSS keyframes — lightweight) |

### §1.6 W2-S-F typography (premium upgrade)

| Slot | Family | Weight | Source | Fallback |
|---|---|---|---|---|
| **Wordmark (Title)** | Pangram Editorial New | Bold 700 | W2-S-F Mayor-locked 2026-05-10 | Vollkorn 700 |
| **Body** | Crimson Pro | 400-600 | CD2 V1 OFL canon | Georgia serif |
| **Nav** | Pangram Sans | Extrabold 800 | W2-S-F Mayor-locked 2026-05-10 | Inter 700 |
| **Meta-code** | JetBrains Mono Variable | 400-600 | CD1 Concept 1 component-lock | SF Mono / Menlo |
| **Civic/Dante** (district name signage) | Asset-locked TBD | TBD | CD1 Concept 1 + reference-archive §2 | Pangram Editorial New Bold (interim stand-in V1) |

Nav state composition (W2-S-F Decision 8 — amendment proposed):
- Default: `--text-secondary`
- Hover/Active: `--platform-copper` (new accent token)
- Focus-visible: outline + offset
- Disabled: opacity 0.35 + pointer-events:none

---

## §2 — Substrate palette (OKLCH per element per theme; APCA-validated)

### §2.1 Dawn theme (default; warm-paper)

| Element | Token | OKLCH | Hex approx | Why |
|---|---|---|---|---|
| Substrate base | `--sky-low` | `oklch(0.96 0.012 88)` | `#F4F0E6` | CD2 Vellum-100; matches MJ Winner 1 cream-warm |
| Substrate elevated zone | `--sky-high` | `oklch(0.99 0.005 88)` | `#FCFAF4` | CD2 Vellum-25; magazine-corner highlight base |
| Contour warm overlay | `--window-warm` | `oklch(0.87 0.030 85)` | `#E7DEC9` | CD2 Vellum-300; radial gradient peak at magazine-corner |
| Atmospheric reflectivity | `--reflect` | `oklch(0.92 0.020 88)` | `#EFE9DA` | CD2 Vellum-200; mid contour zone |
| Editorial-lane district fill (3 variants) | `--lane-editorial-fill-light/mid/deep` | `oklch(0.88 0.08 35)` / `oklch(0.78 0.10 35)` / `oklch(0.68 0.12 35)` | Terracotta scale | CD2 Decision 5 Surface vector; 3 lightness steps for district variety; matches MJ Winner 1 terracotta zones |
| Institutional-lane district fill | `--lane-institutional-fill-light/mid/deep` | `oklch(0.85 0.05 240)` / `oklch(0.72 0.06 240)` / `oklch(0.58 0.07 240)` | Graphite-blue scale | CD2 Decision 5 Above vector; 3 lightness steps; matches MJ Winner 1 slate zones |
| Sage district fill (additional editorial variant) | `--district-sage-light/mid` | `oklch(0.85 0.05 145)` / `oklch(0.70 0.07 145)` | Sage scale | District variety palette; cool-warm balance; matches MJ Winner 1 sage zones |
| Ochre district fill (additional editorial variant) | `--district-ochre-light/mid` | `oklch(0.86 0.10 75)` / `oklch(0.72 0.12 75)` | Ochre scale | District variety palette; warm-yellow shift; matches MJ Winner 1 ochre zones |
| Plum district fill (additional editorial variant) | `--district-plum-light/mid` | `oklch(0.78 0.06 320)` / `oklch(0.60 0.08 320)` | Plum scale | District variety palette; cool-warm balance opposite of terracotta; matches MJ Winner 1 plum zones |
| Street stroke (major) | `--street-major` | `oklch(0.42 0.04 70)` | Dark sepia | Hierarchy contrast against substrate; warm-tone matches paper-substrate register |
| Street stroke (minor) | `--street-minor` | `oklch(0.58 0.03 75)` | Mid sepia | Visible but subordinate to major |
| Street stroke (hairline) | `--street-hairline` | `oklch(0.72 0.02 78)` | Light sepia | Background grid texture |
| Inferno dispatch marker | `--accent-prime` / `--asset-cartography-pulse` | `oklch(0.55 0.18 22)` / `oklch(0.45 0.18 22)` | Wine-red scale | CD2 Decision 5 Below vector; cartography-pulse darker variant for map markers (CD2 §5.2 asset-locked tier) |
| Water boundary | `--water-edge` | `oklch(0.78 0.06 220)` | Soft blue-gray | If/when water features appear (river through district) |
| Border (district boundary) | `--border-district` | `oklch(0.55 0.06 60)` | Mid warm-gray | Dashed when forward-pointed; solid when active focus |
| Text on substrate (primary) | `--text-primary` | `oklch(0.18 0.015 55)` | Near-black warm | CD2 V1 OFL; APCA Lc 75+ on `--sky-low` substrate verified per W2-S-E |
| Text on substrate (label) | `--text-secondary` | `oklch(0.38 0.030 65)` | Vellum-700 | CD2 V1 OFL; APCA Lc 60+ verified |

### §2.2 Night theme (theme-cycle alternative)

| Element | OKLCH | Why |
|---|---|---|
| Substrate base | `oklch(0.18 0.015 55)` | Inverted Dawn — `--text-primary` becomes substrate; `--sky-low` warmth shifts to deep ink-warm |
| Street strokes | `oklch(0.85 0.018 86)` warm-cream | Inverted from sepia to cream; matches MJ Winner 2 navy-blueprint register if blue-tinted |
| District fills | Same hue family as Dawn but lightness 0.30-0.45 (deeper) | Lane pigment cosmology vectors preserved; theme is lightness inversion |
| Inferno markers | `oklch(0.65 0.18 22)` (slightly lighter than Dawn for visibility on dark substrate) | Inferno-surfacing register holds across themes per CD3 §6.2 persist-across-districts rule |

### §2.3 APCA-validated text-on-cartography pairings

| Pairing | APCA Lc | Verdict |
|---|---|---|
| `--text-primary` on `--sky-low` | ~Lc 91 | PASS (body text + display) |
| `--text-secondary` on `--sky-low` | ~Lc 72 | PASS (label text) |
| Pangram Sans Extrabold 14px on `--lane-editorial-fill-light` | ~Lc 60 | PASS (district name signage minimum) |
| `--accent-prime` 12px on `--sky-low` | ~Lc 64 | PASS (Inferno marker labels) |
| Pangram Editorial New Bold on `--sky-low` | ~Lc 86 | PASS (wordmark) |

**Verification path:** APCA values validated at W2-S-E for typography pairings; cartography-overlay text re-validates at W3 component integration per CD2 verification ladder Row 1.

---

## §3 — Line-weight system (street hierarchy + boundary strokes + marker strokes)

### §3.1 Street hierarchy

Derived from OpenStreetMap standard cartographic hierarchy + cross-checked against MJ Winner 1+4 visual density extraction.

| Street class | Stroke width | Stroke opacity | Why |
|---|---|---|---|
| **Civic-axis arterial** (1 per district) | 2.6 px | 0.85 | Major backbone (Broadway-like); thickest stroke gives compositional spine per Kevin Lynch's "path" element |
| **Major avenue** (4-6 per district) | 1.8 px | 0.85 | Secondary network; OSM "primary road" tier |
| **Local street** (8-12 per district) | 1.0 px | 0.78 | Neighborhood grid; OSM "residential" tier |
| **Cross-street / minor** (12-20 per district) | 0.7 px | 0.65 | Block subdivisions; OSM "residential narrow" tier |
| **Lot-line hairline** (background grid) | 0.4 px | 0.45 | Implies density without dominating; cartographic "tactical decimation" per Stamen Toner reference |

**Stroke-width ratio**: roughly 2.6:1.8:1.0:0.7:0.4 ≈ 6.5:4.5:2.5:1.75:1. This 6.5x range between civic-axis and lot-line preserves clear hierarchy at any zoom; tested against OSM default carto where ratio is ~5:3:2:1.

### §3.2 Boundary strokes

| Boundary | Stroke | Dash pattern | Opacity | Why |
|---|---|---|---|---|
| District boundary (active focus) | 1.6 px solid | none | 0.92 | Clear district demarcation at primary focus per Kevin Lynch's "edge" element |
| District boundary (forward-pointed neighbor) | 0.9 px dashed | 7px-5px | 0.65 | Anticipatory-not-missing per CD3 §4.7 |
| Neighborhood boundary | 1.2 px solid (soft) | none | 0.78 | Within-district subdivision; subtler than district boundary |
| Future-corner placeholder | 0.7 px dashed | 4px-4px | 0.45 | Most-diminished placeholder register per CD3 §4.7 |
| Water edge | 1.4 px smooth | none | 0.82 | Distinct from street/boundary; smoother curvature register |

### §3.3 Marker strokes

| Marker | Outer ring | Inner | Pulse halo (motion) | Why |
|---|---|---|---|---|
| Inferno dispatch marker (active) | 1.6 px stroke @ `--accent-prime` | 3-4px filled circle | 8-10 px @ 0.18 opacity pulsing | High-activity Inferno signal — visible without dominating; pulse animation per CD5 reduced-motion-conditional |
| Inferno dispatch marker (idle) | none | 2-3px filled circle @ 0.55 opacity | none | Low-activity Inferno signal — present but muted |
| Metro station | 1.5 px stroke `--lane-institutional` | 6 px filled cream + 2.5 px inner dot | none | Metro station register; CD4 #8 MetroMapMarker anchor |
| Magazine building (DISpatch) | 1.6 px stroke `--accent-prime` | 44×44 px rounded square | 18 px halo @ 0.20 opacity dispatch-pulse | UNIQUE magazine-corner marker per CD3 §4.4 Mayor-locked unique-marker; dispatch-pulse couples to publishing-infra-active register |

### §3.4 Civic-axis spine treatment

| Layer | Stroke | Opacity | Why |
|---|---|---|---|
| Outer halo | 3.2 px solid `--lane-institutional-fill` | 0.85 | Compositional weight — civic spine is the load-bearing path through district |
| Inner accent | 1.4 px dashed (2px-5px) `oklch(0.32 0.05 240)` | 0.42 | Dashed inner gives "important route" register per editorial cartography convention |

---

## §4 — Density rules (per zoom level)

### §4.1 Borough zoom (homepage perspective; Editorial District at full scale)

| Element | Count | Why |
|---|---|---|
| Visible districts (Editorial primary + forward-pointed neighbors) | 1 active + 2 forward-pointed (Civic + Art) | Per CD3 §4.7 + §4.4 |
| Neighborhoods within Editorial District | 6-7 (magazine-corner active + 5-6 future-corners) | Per CD3 §4 spec |
| Major arterials | 4-6 (Letterpress / Folio / Serif / Quire / Imprint) | Civic Concept 7 walking-metaphor; 5 avenues matches Manhattan-pattern legibility |
| Horizontal streets | 5 (Masthead / Column / Spread / Margin / Galley) | Per concept-01-editorial-district predecessor; civic-publishing-themed names |
| Local streets | 12-18 across district | Mid-density Brooklyn-brownstone scale per CD3 §4.3 (not Manhattan-tall) |
| Cross-streets / minor | 25-40 across district | Implies density without overwhelming |
| Lot-line hairline grid | 40px spacing background pattern | Architectural-document register per MJ Winner 2 blueprint reference |
| Metro stations | 6-8 at junctions | CD4 #8 MetroMapMarker — placed at semantically meaningful Avenue×Street junctions |
| Inferno markers (active) | 4-6 with pulse | Concentrated near magazine-corner where activity is |
| Inferno markers (idle) | 4-6 muted | Sparse at district edges where activity is quieter |
| Civic-axis spine | 1 curving path | Single compositional backbone per Lynch "path" |
| Water feature | 0-1 (river or harbor edge) | Optional — MJ Winner 4 shows water at edge; adds organic character |

### §4.2 Neighborhood zoom (article perspective; magazine-corner perspective)

| Element | Count | Why |
|---|---|---|
| Visible buildings within magazine-corner | 8-12 building footprints | Reading sanctuary — fewer elements than borough |
| Local streets | 3-4 within magazine-corner | Matches NYC neighborhood scale (Hell's Kitchen, Harlem) |
| Cross-streets | 4-6 within magazine-corner | Block subdivision visible |
| Inferno markers | 2-3 max (less density at reading scale) | Per CD3 dial principle — article = mid dial = reading sanctuary |
| Adjacent neighborhoods visible at edge | 2-3 with diminished opacity | Per CD3 §4.7 "anticipatory-not-missing" |

### §4.3 Sitemap zoom (atlas page; full Editorial District + neighbor districts visible)

| Element | Count | Why |
|---|---|---|
| Editorial District | Full visual weight at center | Active focus |
| Forward-pointed Civic + Art districts | Full silhouette character (institutional buildings + creative-pop forms) | Higher presence than at borough zoom; sitemap = navigation register |
| Future Prime City placeholders | Visible at edges | Atlas register tolerates more anticipated content |
| All districts named | All visible districts carry Civic/Dante typography labels | Atlas IS the wayfinding surface |

---

## §5 — Layer architecture (back-to-front stack; opacity per dial)

| Z-order | Layer name | Element | Static or animated | Opacity (Dawn / homepage / mid dial) | Why |
|---|---|---|---|---|---|
| 1 (back) | **Substrate base** | Solid Vellum fill + paper-grain feTurbulence + architectural micro-grid (10px+40px hairlines) | Static | 1.0 | The substrate Mayor calls "what the city is printed on" per CD2 Decision 5 cosmology-symmetry |
| 2 | **Contour warm overlay** | Radial gradient `--window-warm` centered on magazine-corner | Static | 0.42 | Editorial-warm hue shift per CD1 Concept 4; focuses attention on active neighborhood |
| 3 | **Forward-pointed neighbor districts** | Civic (institutional silhouettes) + Art (creative-pop forms) at edges | Static | 0.22-0.30 | Most-diminished per CD3 §4.7; anticipatory-not-missing |
| 4 | **Editorial District boundary** | Soft-edged polygon with terracotta stroke | Static | 0.95 | Active focus boundary |
| 5 | **Lane wash layer** | Subtle lane-pigment washes per district zone (terracotta / sage / ochre / plum / slate) | Static | 0.65-0.78 | District character via lane cosmology vectors; matches MJ Winner 1 |
| 6 | **Street network — minor + hairline** | Lot-line grid + cross-streets | Static | 0.45-0.65 | Background density; "implies the rest" of the city |
| 7 | **Street network — local + avenue** | Mid-tier streets + major avenues | Static | 0.78-0.85 | Primary cartographic structure |
| 8 | **Civic-axis spine** | Single curving institutional-blue arterial | Static | 0.85 outer halo + 0.42 inner dashed | Compositional backbone per Lynch path element |
| 9 | **Metro line** | Smooth curve connecting 6-8 named stations | Static | 0.62 background + 0.85 foreground stroke | CD4 #8 MetroMapMarker network |
| 10 | **District typography** | "EDITORIAL DISTRICT" cosmology marker (large tracked-out Pangram Editorial New Bold stand-in for Civic/Dante) + sub-label | Static | 0.32 cosmology marker + 0.55 sub-label | Burned-in NYC street-sign register per CD1 Concept 3 |
| 11 | **Magazine-corner neighborhood** | Highlighted polygon with terracotta wash + sub-block grid | Static | 1.0 fill + 0.40 sub-block grid | "You are here" — full visual weight per CD3 §4.4 |
| 12 | **Future-corner placeholders** | 6 dashed-boundary boxes (newspaper-corner / broadcast-corner / film-corner / podcast-corner / books-corner / marketing-agency-corner) | Static | 0.40-0.45 | Anticipatory neighborhoods per CD3 §4.7 |
| 13 | **Metro stations** | 6-8 circle+core markers at Avenue×Street junctions | Static | 1.0 | Named junctions in institutional-blue |
| 14 | **Inferno markers (idle)** | Small muted circles at edges | Static | 0.45-0.62 | Quiet infra-activity surfacing per CD3 §6 |
| 15 | **Inferno markers (active)** | Pulse-ring circles at active positions | **CSS pulse animation @ reduced-motion-conditional** | 0.78-0.85 + ring at 0.18 | Active Inferno signals per CD3 §6.2 |
| 16 | **Histories lineage rail** | Right-edge stack-of-archived-layers vertical strokes | Static | 0.55 | Deep-archive on-demand affordance per CD3 §5.6 |
| 17 | **DISpatch building marker** | UNIQUE magazine identifier (stacked-pages composition + dispatch-pulse) | **Pulse animation @ reduced-motion-conditional** | 1.0 building + 0.20 halo | Mayor-locked unique-magazine-marker per CD3 §4.4 |
| 18 | **Wayfinding signage** | Avenue street-sign labels at bottom + compass + forward-pointed Prime City affordance | Static | 0.50-0.65 | Civic-archive register per CD1 Concept 3 |
| 19 | **Cosmology surfacing legend** | Inferno + Paradiso + Histories anchor entries | Static | 0.85-0.90 | Optional — surfaces on atlas zoom, hidden on homepage to avoid clutter per Mayor 2026-05-10 "Paradiso shows up in atmosphere not direct impact" |
| 20 (front) | **Editorial overlay** | Where-you-are + dial + live activity feed + lane legend (homepage only) | Static + live-data feed | n/a (HTML over SVG) | HTML layer; renders ABOVE cartography per page-composition |

---

## §6 — Per-surface dial calibration

Per CD3 §2.6 unified-grid + Signal 009 dial-as-presence-intensity discipline.

### §6.1 Homepage perspective (low dial · background register · BACKGROUND substrate)

| Layer | Opacity multiplier | Effect |
|---|---|---|
| Substrate (1-2) | 0.30-0.45 | Background — cartography breathes underneath editorial content |
| Streets (6-7) | 0.40-0.55 | Subtle structure; reads as "city is there" without dominating |
| Civic-axis spine (8) | 0.45-0.55 | Subtle compositional anchor |
| Inferno markers (14-15) | 0.55-0.78 active; 0.30-0.45 idle | Editorial chrome surfaces activity via Live Ticker; map shows ambient |
| District typography (10) | 0.20-0.28 | Whisper-level; just enough to register location |
| Magazine-corner (11) | 0.60-0.75 | Subtle anchor — "you are here" without spotlight |
| Editorial overlay (20) | 1.0 | Foreground editorial content over substrate |

**Net effect**: cartography is felt, not navigated. Reader engages with magazine content; map breathes underneath.

### §6.2 Article perspective (mid dial · reading sanctuary · neighborhood-corner zoom)

| Layer | Opacity multiplier | Effect |
|---|---|---|
| Substrate (1-2) | 0.50-0.65 | Slightly more present than homepage |
| Streets (6-7) | 0.60-0.72 | Visible but subordinate to article body |
| Magazine-corner (11) | 1.0 | Active focus — reader is "in" magazine-corner |
| Adjacent neighborhoods (12) | 0.32-0.42 | Diminished but visible — anticipatory |
| Inferno markers (14-15) | 0.45-0.62 | Reduced from homepage — reading sanctuary |
| District typography (10) | 0.30-0.40 | Slightly more visible; reader registers location |

**Net effect**: cartography reads as the room you're sitting in while reading the article. Present, contextual, non-distracting.

### §6.3 Sitemap perspective (high dial · atlas register · full navigation)

| Layer | Opacity multiplier | Effect |
|---|---|---|
| Substrate (1-2) | 1.0 | Full presence |
| Streets (6-9) | 1.0 | Full hierarchy visible |
| Civic-axis spine (8) | 1.0 | Full weight |
| Metro line (9) | 1.0 | Navigable network |
| All districts (4, 11, 12, 3) | 1.0 | Full district variety + neighbor neighborhoods + neighbor districts visible |
| District typography (10) | 0.65-0.85 | Wayfinding active — atlas IS the wayfinding surface |
| Wayfinding signage (18) | 1.0 | All affordances visible |
| Cosmology surfacing legend (19) | 1.0 | Visible — atlas explains the surfacing semantics |

**Net effect**: cartography is the page; reader actively navigates via the atlas.

---

## §7 — Motion register (atmospheric-chrome-static + reduced-motion-floor)

### §7.1 What animates (reduced-motion-conditional only)

| Element | Animation | Duration | Trigger |
|---|---|---|---|
| Inferno marker pulse ring (active markers) | scale 0.6 → 2.4; opacity 0.55 → 0 | 3.2s ease-out infinite | `@media (prefers-reduced-motion: no-preference)` only |
| DISpatch building dispatch-pulse | scale 0.7 → 2.8; opacity 0.65 → 0 | 3.8s ease-out infinite | `@media (prefers-reduced-motion: no-preference)` only |
| Inferno marker variants slow/fast | Same as above × 1.5 / × 0.75 duration | 4.8s slow / 2.4s fast | Same constraint |

### §7.2 What does NOT animate

- Substrate (paper-grain, contour-warm, district fills) — static at scroll cadence per CD5 RES-009
- Street network — static
- District typography — static
- Wayfinding signage — static
- Metro stations — static (per CD3 §7 default register)
- Civic-axis spine — static

### §7.3 Theme-cycle transition (allowed motion)

When user toggles Dawn ↔ Night theme:
- Substrate palette interpolates over 600ms ease-in-out (Motion v12 tween)
- All opacity values remain constant; only OKLCH values shift
- Reduced-motion floor: instant swap if `prefers-reduced-motion: reduce`

### §7.4 Reduced-motion floor

Per WCAG 2.1 SC 2.3.3 + CD5 §1: when `prefers-reduced-motion: reduce`:
- ALL animations disabled
- Static fallback maintains visibility (Inferno markers visible as static dots; building marker visible as static composition)
- Theme transitions become instant
- No parallax / no scroll-coupled motion / no ambient drift

### §7.5 Tool allocation (per CD5 §2)

| Element | Tool | Why |
|---|---|---|
| Inferno pulse + dispatch-pulse | CSS keyframes (SVG) | Lightweight; native-rendered; no JS dependency |
| Theme-cycle palette interpolation | Motion v12 tween | Component-level state transitions |
| Cross-component coordinated motion (none in V1 substrate) | GSAP (reserved for W3.x complex sequences) | Not used in V1 |
| Scroll-smooth | Lenis (page-level; not cartography-specific) | Page-level scroll register |

---

## §8 — Repeatable component architecture

### §8.1 Parent component: `<CartographyCanvas>`

| 7-field spec | Value |
|---|---|
| **Structure** | SVG container at viewBox 0 0 1440 900 wrapping all 20 layers; receives `surface`, `district`, `dial`, `theme` props |
| **Variants** | `surface={"homepage" \| "article" \| "sitemap"}`; `dial={"low" \| "mid" \| "high"}`; theme inherited from page |
| **States** | static (V1); future: hover-zoom + click-pan deferred to W3.x |
| **a11y** | `role="img"`, `aria-labelledby` to title, `<desc>` describing district + active surface, structured landmark labels via `<title>` per shape group |
| **Motion** | Inferno pulse + dispatch-pulse only; reduced-motion floor |
| **Theme** | OKLCH tokens swap via CSS custom property cascade — same SVG renders both Dawn + Night |
| **Tokens** | All colors via CSS custom properties (`--sky-low`, `--lane-editorial-fill-light`, `--accent-prime`, etc.) — single source of truth per W2-S-E token canon |

### §8.2 Child components (composed inside `<CartographyCanvas>`)

| Component | Renders | 7-field spec abbreviated |
|---|---|---|
| `<SubstrateLayer>` | Z-orders 1-2 (substrate base + contour overlay) | Static · CSS feTurbulence + radial gradient · Dawn/Night-aware |
| `<DistrictPolygon district={...}>` | Z-orders 3, 4, 11 (district shapes + lane washes) | Variants per district class; opacity per dial prop |
| `<StreetNetwork>` | Z-orders 6-7 (street hierarchy) | Path generation per district; stroke-width per class |
| `<CivicAxisSpine>` | Z-order 8 (civic-axis curved path) | Single SVG path with outer halo + inner accent |
| `<MetroLine>` + `<MetroStation name={...}>` | Z-order 9 + 13 | Per CD4 #8 MetroMapMarker spec |
| `<DistrictTypography label={...}>` | Z-order 10 | Pangram Editorial New Bold stand-in (Civic/Dante asset-locked deferred) |
| `<NeighborhoodHighlight>` | Z-order 11 (magazine-corner) | Active-focus visual weight |
| `<FuturePlaceholder name={...}>` | Z-order 12 | Dashed-boundary anticipatory register |
| `<InfernoMarker activity={...} status={"active" \| "idle"}>` | Z-orders 14-15 | Pulse animation when active + reduced-motion floor |
| `<HistoriesLineageRail count={...}>` | Z-order 16 | Stack-of-strokes affordance |
| `<DISpatchBuildingMarker>` | Z-order 17 | UNIQUE magazine composition + dispatch-pulse |
| `<WayfindingSignage>` | Z-order 18 | Street-sign labels + compass + Prime City affordance |
| `<CosmologyLegend visible={...}>` | Z-order 19 | Optional per surface — Inferno + Paradiso + Histories anchors |

### §8.3 Sibling component (HTML over SVG): `<CartographyOverlay>`

For homepage surface only — provisional CD4 amendment candidate.

| Renders | Where-you-are breadcrumb + dial-position meter + live activity feed (Inferno → editorial chrome) + lane legend |
| a11y | `<aside aria-label="Editorial overlay">`; meter widget with aria-valuemin/max/now |
| Theme | Inherits from page |

---

## §9 — Cross-page surface bindings

### §9.1 What stays CONSTANT across homepage / article / sitemap

- Token palette (OKLCH values)
- District shape (Editorial District boundary polygon — same SVG path on every page)
- Street network underlying topology (same paths; opacity dial-controlled)
- Magazine-corner position (anchored at fixed coordinates)
- Cosmology surfacing semantics (Inferno = wine-red markers; Paradiso = atmosphere/fixture; Histories = lineage rail)
- 7-typeface containment governance (locked typefaces per slot)
- Reduced-motion floor

### §9.2 What CHANGES per surface

| Aspect | Homepage | Article | Sitemap |
|---|---|---|---|
| Zoom level | Borough (full district visible) | Neighborhood (magazine-corner expanded) | Borough+neighbor districts (atlas) |
| Layer opacity | Low dial (background register) | Mid dial (reading sanctuary) | High dial (atlas) |
| District typography visibility | 0.20-0.28 (whisper) | 0.30-0.40 (subtle) | 0.65-0.85 (visible) |
| Inferno marker density | Active + idle visible | Reduced (reading sanctuary) | Full hierarchy |
| Future-corner placeholders | Visible at 0.40-0.45 | Adjacent ones at 0.32-0.42 | Full visibility |
| Cosmology legend (Z-19) | Hidden (avoid clutter) | Hidden | Visible (atlas wayfinding) |
| Editorial overlay (Z-20) | Visible | Hidden (article uses other chrome) | Hidden (atlas is wayfinding) |
| Magazine foreground content | Editorial digest + live feed + institutional fixture | Article body + chapter rail + reading progress | Districts directory + atlas legend |

---

## §10 — Cross-Building extensibility

### §10.1 Future neighborhoods within Editorial District

When newspaper-corner, marketing-agency-corner, etc. ship, each:
- Replaces the dashed-placeholder rectangle with full-character neighborhood polygon
- Inherits magazine-corner's lane-wash discipline (terracotta editorial)
- Gets its own DISpatch-equivalent unique-building marker (subject to per-Building Brand-certification gate per `feedback_per_building_brand_certification_gate.md`)
- Inherits Inferno marker semantics (red dispatch lights persist across neighborhoods per CD3 §6.2)

### §10.2 Future Prime districts (Civic, Art, future-arc)

When Civic / Art / etc. districts ship, each:
- Inherits the FORMULA shape but redefines district character per their Brand-certification
- Civic District: institutional-graphite-blue dominant; civic-architectural silhouettes (per concept-01 forward-pointed Civic rendering)
- Art District: warm-saturated creative-pop palette; theatrical / gallery / sculpture silhouettes
- Each district holds Paradiso's bar via its own institutional fixture per CD1 Concept 6 + Signal 011

### §10.3 Constants across all future Buildings (Brand-Terrace lattice template)

- Token system (CSS custom properties)
- Cosmology surfacing semantics (Inferno red / Paradiso atmosphere / Histories lineage)
- 7-typeface containment governance
- Reduced-motion floor
- APCA contrast validation
- 7-field component spec template

---

## §11 — Reference attribution (auditable source map)

| Formula element | Primary source | Secondary validation |
|---|---|---|
| Vellum substrate palette | CD2 V1 ratified | W2-S-E typography canon shipped 2026-05-10 |
| Lane pigment cosmology | CD2 Decision 5 | Signals 012 + 014 |
| Wordmark composition (DIS red + patch dark) | CD2 Decision 7 Option C | W2-S-F integration |
| Wordmark typeface (Pangram Editorial New Bold) | W2-S-F Mayor-locked | Signal 022 |
| Nav typeface (Pangram Sans Extrabold) | W2-S-F Mayor-locked | Signal 022 |
| Platform-copper nav accent | W2-S-F Decision 8 (amendment pending Mayor canon-promotion) | Signal 022 |
| 5-typeface containment | CD1 Concept 1 | CD4 §7 |
| 5 expression-layers | CD3 §2.0 | — |
| Dial principle | CD1 Decision 9 + CD3 §2.6 | Signal 009 unified-grid reframe |
| Districts-not-blocks doctrine | CD3 §3 | Reframe 2 / Signal 010 |
| Cosmology surfacing via signals | CD3 §3.2.3 + Signals 008-011 | — |
| Inferno wine-red markers | CD3 §6 | Signal 010 ("this is why red is Prime's accent color") |
| Paradiso institutional fixture | CD1 Concept 6 + Decision 7 | Signal 011 (Paradiso = THE BAR) |
| Histories lineage rail | CD3 §5.6 | Signal 008 |
| Forward-pointed neighbor render | CD3 §4.7 | — |
| Unique magazine marker | CD3 §4.4 | Mayor 2026-05-10 lock |
| Street hierarchy 2.6:1.8:1.0:0.7:0.4 ratio | OpenStreetMap default carto standard | Cross-checked vs. MJ Winner 1+4 visual density extraction |
| Block scale (mid-density Brooklyn-brownstone) | Real urban typology per CD3 §4.3 | MJ Winner 4 reference |
| District palette (terracotta/sage/slate/ochre/plum) | MJ Winner 1 visual extraction | CD2 lane pigment cosmology-symmetry alignment |
| Civic-axis spine convention | Kevin Lynch *Image of the City* (1960) "path" element | NYC Broadway / Paris Champs-Élysées / Pyongyang Juche-tower-axis precedent |
| Tactical decimation (draw 20-30% imply rest) | Stamen Toner reference + Mike Bostock D3 cartography lineage | — |
| Atmospheric chrome static rule | CD5 + RES-009 fold | Mayor 2026-05-10 "Paradiso shows up in atmosphere not direct impact" |
| Reduced-motion floor | WCAG 2.1 SC 2.3.3 + CD5 §1 | W3-S-A discipline |
| APCA contrast framework | CD2 V1 | W2-S-E APCA validation |
| 7-field component spec | CD4 §4 | — |
| 20-component inventory references | CD4 §3.1 | — |
| Pulse animation reduced-motion-conditional | CD5 + concept-01 hero predecessor (held draft) | — |
| Map-as-background (not hero) reframe | Mayor 2026-05-10 disposition lock | CD1 thesis §1 "hero subtly, not loudly" |
| Map-as-cartographic-precision (not illustration) reframe | Mayor 2026-05-10 critique post-batch-1 + Blueprint inspo folder | MJ Winner 1 (Zip Code Reference) + Winner 4 (Zip Code + sketch) visual extraction |
| Formula-first (no improvisation) discipline | Mayor 2026-05-10 — "you are blind while building so you need everything before you jump in so you can follow the formula" | — |

---

## §12 — Open questions awaiting Mayor ratification

1. **Q-FORMULA-01**: Specific OKLCH values in §2 for additional district variety (sage / ochre / plum) — these are NOT in CD2 V1 canon (CD2 canonized 3 lane pigments + Vellum). Are sage / ochre / plum acceptable as DISpatch-locked tier additions (CD2 §5 W2-S-F-style amendment)? Or constrain district variety to 3-color cosmology pigments only?

2. **Q-FORMULA-02**: §1.6 Civic/Dante typeface — currently using Pangram Editorial New Bold as interim stand-in. CD1 reference-archive §2 mentions Trajan-class typography for civic signage. Asset-lock the Civic/Dante typeface at W5 OR earlier at W3.x?

3. **Q-FORMULA-03**: §3.1 stroke-width ratio (2.6:1.8:1.0:0.7:0.4) — derived from OSM + visual extraction. Does Mayor want a different ratio (tighter / looser) to match a specific reference?

4. **Q-FORMULA-04**: §4.1 borough-zoom density — 4-6 arterials + 12-18 local + 25-40 cross-streets. Does the density feel right OR want denser/sparser?

5. **Q-FORMULA-05**: §6 per-surface dial calibration values — specific opacity values are my derivation. Does Mayor want different dial-position values per surface?

6. **Q-FORMULA-06**: Provisional new components (`<CartographyOverlay>`, `<DistrictsDirectory>`, `<HistoriesLineageRail>`) — promote to CD4 amendment OR keep as concept-01 internal patterns?

7. **Q-FORMULA-07**: §10.2 future Civic + Art districts — character direction (institutional-graphite-blue dominant + warm-saturated creative-pop respectively). Ratify direction now OR defer to per-Building dispatch?

---

*FORMULA.md DRAFT v1 authored 2026-05-10. Mayor adjudicates per-§ ratification before any coding per `feedback_a_game_session_discipline.md` + Mayor 2026-05-10 "every line/placement/color/graphic must earn its place" directive.*

---

## §13 — Amendments (Mayor 2026-05-11 answers to §12 + two new structural directives)

### §13.1 Q-FORMULA answers (Mayor 2026-05-11)

| Q | Answer | FORMULA impact |
|---|---|---|
| Q1 District variety palette | APPROVED — won't judge until in context | KEEP §2.1 sage/ochre/plum entries |
| Q2 Civic/Dante typeface | **IM Fell** asset-locked — specifically **IM Fell English** (`FeENit2.ttf`) OR **IM Fell DW Pica** (`FePIit2.ttf`) per context. Also debating **Pangram Sans Extrabold** when layered correctly (modern street-sign register). | §1.6 Civic/Dante slot updates: V1 mocks use IM Fell English as primary stand-in + Pangram Sans Extrabold as alternative for nav-style street signage. Asset-lock confirmed; W5 finalizes per-asset choice |
| Q3 Stroke-width ratio | Needs to see in context | KEEP §3.1 ratio; revisit post-mock |
| Q4 Borough-zoom density | Mayor concerned about V1 feasibility but **trusts my judgment IF density supports component-overlay + scroll-reveal**. NEW GOAL: versatility + mod-ability — substrate must be FOUNDATION the cartography pipeline can do whatever V1+ needs | §4 density values KEPT; §13.3 new directive adds scroll-reveal pattern that justifies the density |
| Q5 Per-surface dial values | Accept my derivation; iterate via trial-and-error from mocks | KEEP §6 dial values; refine post-mock evidence |
| Q6 Provisional new components | **Mayor wants TWO MOCKS — one WITH overlays, one WITHOUT** | Mock A = with `<CartographyOverlay>` + `<DistrictsDirectory>` + `<HistoriesLineageRail>`; Mock B = same substrate + foreground WITHOUT those three |
| Q7 Civic/Art future district character | **REFRAMED — first mock districts read as "lego blobs"; cities don't have hard borders.** Better: subtle hinting via landmarks (a civic building silhouette in corner; a lit street at night; museum shape) — Houston example: walking museum-district → Montrose → Heights intersected | §13.2 new directive amends §3.2 boundary strokes + §5 layer architecture |

### §13.2 Districts via landmark hints, NOT polygon borders (Mayor 2026-05-11)

**Reframe**: Real cities don't have clearly outlined districts around each other. Districts blend organically; a walker passes through 3 neighborhoods on a single street. The lego-blob feel of my §3.2 hard-dashed-boundary treatment is wrong.

**Amendment to §3.2**: Replace hard district boundary strokes with **landmark-hint surfacing**:

| Previous (§3.2) | Amendment (§13.2) |
|---|---|
| District boundary (active focus) — 1.6 px solid stroke 0.92 opacity | **REMOVED for forward-pointed districts**; active-focus district keeps soft 1.0 px stroke @ 0.45 opacity (whisper-level boundary) |
| District boundary (forward-pointed neighbor) — 0.9 px dashed | **REPLACED** by landmark hint silhouettes at viewport edges:<br>• Civic district hint: domed civic building shadow at top-left edge of map<br>• Art district hint: museum / gallery silhouette at bottom-right edge<br>• Hints become MORE present as user scrolls toward them (scroll-reveal coupling per §13.3) |
| Neighborhood boundary (within Editorial District) | **REPLACED** by landmark anchors per neighborhood:<br>• magazine-corner: DISpatch building marker (already in §3.3)<br>• future-newspaper-corner: faint printing-press silhouette at relevant position<br>• future-broadcast-corner: faint antenna silhouette<br>• etc. (Houston-walking-Montrose pattern: no clear borders; you know you've changed neighborhoods because the landmarks shift) |

**Amendment to §5 layer architecture**: Insert new layer at Z-order 4.5 — **landmark-hint silhouettes** (between Z-order 4 Editorial District boundary and Z-order 5 Lane wash). These render at opacity 0.18-0.30 (most-diminished) at first paint; reveal to 0.45-0.65 as user scrolls toward them.

### §13.3 Scroll-revealing cartography (NEW directive — Mayor 2026-05-11)

**Reframe**: Cartography is NOT a single static image. As user scrolls homepage or article, MORE of the map reveals. This is also the WHY behind "Prime web pages will not have infinite scroll" — bounded scroll-reveal is a structural design rule.

**Amendment to §4 density rules**: Density is acceptable because of scroll-reveal — user only sees PARTIAL district at first paint; rest of streets/stations/markers/landmarks reveal as user scrolls.

**Amendment to §5 layer architecture**: Add scroll-reveal coupling per layer:

| Layer | First-paint visibility (top of page) | Scroll-reveal trigger |
|---|---|---|
| Substrate base (Z-1) | Full visible (always present) | n/a |
| Contour warm overlay (Z-2) | Visible | n/a |
| Editorial District boundary (Z-4) | Top portion only | Bottom reveals at ~30% scroll |
| Lane wash (Z-5) | Top portion | Reveals progressively at ~10-80% scroll |
| Street network minor (Z-6) | Top portion at lower density | Density builds at ~20-60% scroll |
| Street network major (Z-7) | Visible (anchors composition) | n/a |
| Civic-axis spine (Z-8) | Top half visible | Curves continue through ~40-90% scroll |
| Metro line (Z-9) | First 2-3 stations | Stations 4-6 reveal at ~30-70% scroll |
| District typography (Z-10) | Visible at top | n/a |
| Magazine-corner (Z-11) | Visible (anchor — "you are here") | n/a |
| Future-corner placeholders (Z-12) | First 1-2 visible | Others reveal at ~30-70% scroll |
| Metro stations (Z-13) | First 2-3 | Rest reveal per Z-9 trigger |
| Inferno markers idle (Z-14) | First 2-3 | Rest reveal at ~20-80% scroll |
| Inferno markers active (Z-15) | First 1-2 active | Rest reveal at ~30-80% scroll |
| Histories lineage rail (Z-16) | Hidden at first paint | Reveals at ~70-90% scroll (deep-archive register) |
| DISpatch building marker (Z-17) | Visible (anchor) | n/a |
| Wayfinding signage (Z-18) | Avenue labels visible at top | Bottom labels reveal at ~50-90% scroll |
| Cosmology legend (Z-19) | Hidden | Reveals at ~80-100% scroll (footer-zone) |

**Implementation pattern (V1 mock — CSS scroll-driven animations)**:
- Cartography SVG sits as `position: fixed` background extending below viewport (e.g., 1440 × 3000 viewBox)
- Page content scrolls OVER the cartography
- CSS scroll-driven animations (`animation-timeline: scroll()`) couple layer opacity + transform to scroll progress
- Reduced-motion floor: layers render at full visibility (no scroll-coupling) when `prefers-reduced-motion: reduce`

**Implementation pattern (production runtime — W4 Mapbox/MapLibre cascade)**: scroll-progress drives map style spec layer-paint-opacity values via IntersectionObserver + style API. Same logical pattern; W4 cascade decides specific tool.

### §13.4 Versatility + mod-ability as new substrate goal (Mayor 2026-05-11)

**New goal**: The cartography substrate must be FOUNDATION the V1+ pipeline can do "whatever we need it to do." Versatility + mod-ability are now FIRST-CLASS substrate requirements alongside cartographic precision.

**Amendments**:
- §8 component architecture confirmed as the right shape — `<CartographyCanvas>` parent + child components is the foundation
- Each child component must be independently mod-able (per CD3 §1.4 dial principle + master plan §8.14 founding principle DOWNGRADABLE pattern)
- Page-composition couples to cartography via well-defined slots (where editorial overlay sits, where digest sits, where institutional fixture sits) — NOT via cartography-defined regions
- The grid forms around components per CD3 §2.6 grid-dances-around-components discipline — components are PRIMARY; cartography accommodates

### §13.5 Page-cycle ambiguity (deferred to next wave per Mayor 2026-05-11)

**Status**: Mayor not yet confirmed whether DISpatch canonically has 1-page cycle OR 3-page cycle (homepage / article / sitemap). Decision deferred to next wave with mock-evidence input.

**Amendment to §6 per-surface dial calibration**: KEEP all three surface profiles in formula (homepage / article / sitemap). The mocks will surface which page-cycle reads right; Mayor adjudicates after mock review.

### §13.6 Real-time map tools deferred to W4 (Mayor 2026-05-11)

**Status**: Mapbox Studio + MapLibre GL wiring is NOT for this stream (W3-S-C). Job here is to nail the FOUNDATION substrate so production-runtime can do whatever V1+ needs.

**Confirms** §1.3 CD3 Layer 3 (production runtime) deferral to W4 cascade. FORMULA §8 component architecture is V1-coded against CSS+SVG; W4 cascade migrates to vector-tile-served runtime when adopted.

---

*FORMULA.md AMENDED 2026-05-11 with Mayor §12 answers + landmark-hints reframe + scroll-reveal directive + versatility+mod-ability goal. Mock authoring proceeds against amended formula.*
