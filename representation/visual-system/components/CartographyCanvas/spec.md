---artifact: cd4-component-spec
component: CartographyCanvas
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C2 cartography-grid as own active layer (hierarchical-layered grid) + C7 walking metaphor (city + districts + buildings substrate) + C4 atmosphere as physical substrate
mode-crossing: cross-surface ambient substrate — appears UNDER every surface (reception + article); the dial mechanism scales presence per surface; not adaptive in form, only in dial-tuned intensity
upstream-cascade:
  - CD1 thesis — §2 Concept 2 hierarchical-layered grid + §4.4 cartography commitment + dial principle (cartography-as-MVP-hero subtly)
  - CD2 color tokens (tokens.color.lane.* + tokens.color.atmosphere.*)
  - CD3 cartography (cartography.district.* + cartography.marker.* + cartography substrate full encoding — co-authored at CD3+CD4 boundary)
  - CD5 motion (atmospheric-chrome-not-animated rule + dial-tuned ambient drift; flicker discipline)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: CartographyCanvas — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# CartographyCanvas — Spec scaffold

The dynamic-living cartography substrate. Per CD1 thesis §4.4: cartography is the V1 MVP hero — not a feature among features; the proof-of-concept that activates Prime's imagination at miniature scale. CartographyCanvas is the substrate; it lives UNDER every surface, ambient and forgettable while you write or read. Look up from the article, and it is there — alive, dynamic, mapped to where you are. The dial mechanism (CD1 thesis §4.4) scales between *more* and *less* present per surface / page / article.

## Field 1 — Structure

- **Top-level element role.** `<canvas>` element OR SVG OR WebGL primitive layer (W3 ratifies rendering technology per CD3 toolset selection — currently inclined: layered approach with D3.js + P5.js for substrate + Mapbox GL JS / WebGL for dynamic real-time-rendering layers per CD1 thesis §4.4 CD3 dispatch shape implication)
- **Slot composition.** Composed of:
  - Foundation layer — D3.js contour + P5.js paper grain + CSV cartographic encoding (CD3 ratifies; this is the static cartographic substrate)
  - Dynamic-living layer — flicker (lights in the city) + grid-line awareness + auto-correction (when buildings appear, roads/rivers/banks/bridges all stay coherent) + real-time coupling to article state
  - Dial-tuning layer — per-surface intensity scalar (more present on reception; less present on article surfaces per article-as-sanctuary discipline)
- **Three-layer destination.** `/components/patterns` — cartography-coupled compound; coordinates with CD3-owned cartographic encoding
- **Mode-crossing declaration.** Cross-surface ambient substrate. Renders UNDER every surface (reception + article); form is identical (substrate is consistent for cohesion); intensity varies per surface via the dial mechanism (more present on reception; less present on article surfaces). The dial is the meta-principle per CD1 thesis §4.4.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `reception-dial-up` | rendered on homepage | dial higher; flicker more visible; cartographic features more present; coupled to LiveTicker (live-update flicker) |
| `article-dial-down` | rendered on article surfaces | dial lower; substrate present but quieter; cartographic features fade into atmospheric register; flicker minimal |
| `transition-dial` | scroll-pinned per-article (W3 may surface) | dial scales with scroll position; reaches lowest at article reading region; rises near article header/footer |
| `static-fallback` | rendered for reduced-motion OR canvas-rendering-failure | static cartographic image (D3.js + P5.js without WebGL dynamic layer); no flicker; substrate present but inert |

## Field 3 — States

- **Interaction states.** `idle` (typical scroll) / `theme-transitioning` (during theme cycle; brief animation per atmospheric-chrome-not-animated theme-cycle exception) / `dial-transitioning` (between reception ↔ article surfaces during navigation)
- **Lifecycle states.** `loading` (initial cartographic encoding fetch; SSR'd if possible) / `loaded` / `error` (rare; cartographic encoding missing — fallback to `static-fallback` variant) / `degraded` (low-power mode OR reduced-motion — fallback to `static-fallback` per Field 4 reduced-motion contract)

Keyboard navigation: non-focusable (substrate, not interactive); does not enter tab order. Per CD1 Concept 4 (atmosphere as substrate): the substrate is felt, not noticed.

## Field 4 — Accessibility

- **ARIA.** `<canvas role="img" aria-label="DISpatch cartographic substrate">` OR `<svg role="img" aria-label="...">` per W3 rendering choice; substrate is decorative (semantic role optional); aria-hidden="true" if treated as purely decorative ambient layer (W3 ratifies)
- **Keyboard navigation.** Non-focusable; substrate
- **Screen-reader behavior.** Substrate is decorative; screen-reader skips OR announces minimal description (W3 ratifies aria-hidden vs label decision)
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: cartography element foreground on `tokens.color.atmosphere.sky-low` background; non-text contrast for cartography lines per WCAG 1.4.11
- **Reduced-motion contract.** `prefers-reduced-motion` triggers `static-fallback` variant (D3.js + P5.js static rendering; no flicker; no dial-transition motion); per CD5 atmospheric-chrome-not-animated discipline

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; the substrate IS atmospheric chrome — atmospheric-chrome-not-animated rule applies for primary motion targets, BUT per CD1 thesis §4.4 dial principle the substrate has dynamic-living layer (flicker + grid-line awareness + auto-correction). Per CD1 Concept 4 motion-coupling rule: animation is *very-slow ambient drift* + *theme-cycle transitions only*; substrate static at typical scroll cadence (protects §6.6 Row 13 motion-performance budget).
- **Per-state motion.** Flicker (very-slow; lights-in-the-city register); grid-line awareness (responsive to article state changes; very-slow); auto-correction (responsive to article-state changes; very-slow); dial-transition between reception ↔ article surfaces (~600ms ease-in-out at navigation transition)
- **Reduced-motion fallback.** `static-fallback` variant; all dynamic-living motion removed; substrate reverts to D3.js + P5.js static rendering
- **Atmospheric chrome interaction.** Substrate IS atmospheric chrome rendered as cartographic layer; per CD1 Concept 4 fold + Concept 7 walking metaphor; the cartographic substrate is the warm-paper printed-city surface

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants (degraded variant for reduced-motion)
- **Theme-cycler integration.** CartographyCanvas re-renders with new theme tokens during theme cycle; per CD1 Concept 4 motion-coupling rule, substrate animates ONLY at theme cycle (brief crossfade ~600ms); otherwise substrate static
- **Per-theme pairing.** Lane pigments per theme + atmospheric substrate per theme + cartography lines + flicker color per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.lane.<cosmology-layer>.fill` / `.stroke` per cosmology layer; `tokens.color.cartography.line` (D3.js contour line color); `tokens.color.cartography.flicker` (live-update flicker color)
- **Typography tokens.** `tokens.type.civic.300` for very-small in-substrate cartography labels (Civic-Dante slot, asset-locked per CD1 Concept 1); typeface usage minimal at substrate level (substrate is graphical, not typographic; labels appear at zoom-in via DistrictMap, not on substrate)
- **Spacing tokens.** `tokens.space.scale.<n>` for substrate padding within viewport (substrate fills viewport; padding controls edge-treatment)
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` background; `tokens.color.atmosphere.window-warm` for warmth-tinted regions; `tokens.color.atmosphere.reflect` for atmospheric-reflectivity wash
- **Cartography tokens.** `cartography.district.<name>.*` per district encoding; `cartography.marker.<role>.*` per marker; `cartography.layer.<cosmology>.*` per cosmology layer (CD3 ratifies cartographic encoding)

## Field 8 — Storybook 9 contract

- **Story names.** `ReceptionDialUp` / `ArticleDialDown` / `TransitionDial` / `StaticFallback` / `ThemeTransitioning` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `dialIntensity` (number 0-1) + `currentArticleState` (object: cosmology-layer + district + article-node from CD3 fixture) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + cartography-encoding decorator (provides cartography stub fixtures from CD3) + WebGL-emulator decorator (mocks canvas rendering for testing) + dial-emulator decorator (sets dialIntensity)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories; Chromatic visual regression validates substrate visual fidelity per state
- Row 6 (axe-core a11y) — Field 4 contract; zero violations
- Row 13 (Lighthouse CI motion-performance budget) — load-bearing; CartographyCanvas substrate must NOT exceed motion-performance budget per CD1 Concept 4 motion-coupling rule + CD5 atmospheric-chrome-not-animated discipline; W3+ activation enforces

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Lane pigments per cosmology layer + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD3 dependency (load-bearing).** Cartographic encoding owns the substrate's foundation layer (D3.js contour + P5.js paper grain + CSV encoding); CD3 ratifies the toolset (per CD1 thesis §4.4 CD3 dispatch shape implication: likely-expanded partner-tools row toward Mapbox GL JS / WebGL / shader-based flicker for the dynamic-living layer). CD3+CD4 boundary co-authors the coordinate-handoff API.
- **CD5 dependency.** Atmospheric-chrome-not-animated rule (substrate static at typical scroll cadence); flicker cadence + dial-transition motion + theme-cycle crossfade durations; CD5 ratifies discipline
- **MetroMapMarker + DistrictMap coupling.** CartographyCanvas is the substrate; MetroMapMarker is a focused asset (article-level "you are here"); DistrictMap is a focused asset (homepage district-map / building-layout). All three consume CD3 cartographic encoding via shared cartography-state-management hook (W3 implementation pattern); coordinate-handoff API ensures consistency.
- **Dial mechanism authority.** Per CD1 thesis §4.4: "the dial is the meta-principle. The cartography is built with a dial scaling between *more* and *less* present. Iteration finds the balance per surface, per page, per article." CD4 spec scaffolds the dial-intensity contract; W3 + W5 + post-launch iteration finds the per-surface balance; the dial is calibrated, not pre-locked.
- **§6.6 Row 13 motion-performance budget (load-bearing).** CartographyCanvas is the highest-risk component for motion-performance regression. Single-rAF discipline + atmospheric-chrome-not-animated rule + reduced-motion `static-fallback` variant together protect the budget. W3 implementation gate validates Lighthouse CI metrics include CartographyCanvas in benchmark.
