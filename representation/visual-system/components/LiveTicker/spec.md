---artifact: cd4-component-spec
component: LiveTicker
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 reception (offices-window — "what's happening in the offices") + C5 META × NARRATIVE (META register; live commit-tickers feel native, not laminated) + C1 typeface containment (Meta-code prominent for live-data; Body for prose-segments)
mode-crossing: reception-primary — homepage offices-window for live updates; potentially article-footer condensed (W3 may surface compact variant; not in V1 ship)
upstream-cascade:
  - CD1 thesis — §2 Concept 7 reception offices-window framing + §3 marriage-of-registers (META "rip through the screen via beautifully composed boxes; peer-behind-curtain content")
  - CD2 color tokens (tokens.color.lane.* + tokens.color.text.meta + tokens.color.atmosphere.*)
  - CD5 motion (live-update motion register; flicker-coupled; reduced-motion fallback to static-list)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: LiveTicker — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# LiveTicker — Spec scaffold

Live commit-tickers + Prime live updates. The offices-window per CD1 Concept 7: the homepage glossary includes a ticker that shows "what's happening in the offices" — live commit messages, infrastructure events, agent-of-record activity, register-statement updates. Per CD1 Concept 5 + thesis §3: META register native; live commit-tickers feel native (not laminated); Meta-code typography carries the META silhouette.

## Field 1 — Structure

- **Top-level element role.** `<section role="region" aria-labelledby="live-ticker-title" aria-live="polite" aria-relevant="additions">` containing the ticker stream
- **Slot composition.** Composed of:
  - Section heading `<h3>` ("Live from the offices" or per Mayor naming preference)
  - Ticker stream — `<ol reversed>` (newest at top) of `<li>` ticker entries
  - Per-entry composition:
    - Timestamp (Meta-code typography)
    - Source-handle / agent-of-record (Meta-code typography; per voice/lane-schema.md)
    - Event prose (Body typography for prose; Meta-code for code-segments inline)
    - Optional CodeBlock `compact-livesnippet` for inline code (per CodeBlock spec coupling)
    - Optional MetroMapMarker compact variant if event has cosmological-position (e.g., "commit landed in Inferno layer")
  - Optional "Show all" affordance to navigate to dedicated activity page (W3 ratifies)
- **Three-layer destination.** `/components/custom` — Prime extension; orchestrates child components (CodeBlock + MetroMapMarker)
- **Mode-crossing declaration.** Reception-primary. Renders on homepage as offices-window. Article-surface compact variant deferred (W3 may surface; not V1 ship). Per CD1 Concept 7: the offices-window is the reception's view of what's happening; article surfaces have their own register-discipline that excludes the live-ticker.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | rendered on homepage | full ticker stream; live-update animations active |
| `paused` | user-toggled OR reduced-motion | live-updates paused; static stream; no flicker |
| `compact` (W3 may surface; not V1 ship) | per Mayor adjudication if article-footer surface ratifies | smaller scale; fewer visible entries; condensed entry composition |

## Field 3 — States

- **Interaction states.** Per entry `idle` / `hover` (entry highlights for read-state); pause-toggle: `idle` / `hover` / `focus` / `active`
- **Lifecycle states.** `loading` (initial ticker fetch; SSR'd if possible) / `streaming` (live-updates active; new entries arrive) / `paused` (user-toggled OR reduced-motion-detected) / `error` (websocket / fetch failure — fallback to static-list rendering)

Keyboard navigation: tab to pause-toggle; arrow-keys within ticker stream may be supported (W3 ratifies); enter on entry navigates to expanded detail page.

## Field 4 — Accessibility

- **ARIA.** `<section role="region" aria-labelledby="live-ticker-title" aria-live="polite" aria-relevant="additions">`; new entries announced via aria-live="polite" (NOT aria-live="assertive" — politeness preserves reading focus); pause-toggle `<button aria-pressed>` reflecting paused state
- **Keyboard navigation.** Tab to pause-toggle; tab through visible entries
- **Screen-reader behavior.** New entries announced via aria-live (politeness rate-limited); pause-toggle announces "Pause live updates, button" / "Resume live updates, button"
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: timestamp + source-handle (Meta-code) on `tokens.color.atmosphere.sky-low`; event prose on substrate; lane indicators per entry; CD2 ratifies threshold values
- **Reduced-motion contract.** `prefers-reduced-motion` triggers `paused` variant automatically; live-update motion removed; new entries appear without animation; flicker removed; user-pause-toggle still functional for resume

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; live-update motion is the LiveTicker's signature visual identity per CD1 Concept 7 (live commit-tickers feel native via subtle motion)
- **Per-state motion.** New-entry slide-in (~250ms ease-out); flicker on new-entry-arrival (~600ms; very-subtle per CD1 thesis §4.4 dial principle — flicker is "lights in the city, never distracting"); pause-toggle `idle → active` color shift (~150ms)
- **Reduced-motion fallback.** New entries appear instantly; no flicker; static stream
- **Atmospheric chrome interaction.** LiveTicker substrate consumes `tokens.color.atmosphere.sky-low`; flicker color consumes `tokens.color.atmosphere.window-warm` for subtle warm flicker (per CD1 Concept 4 motion-coupling rule + CD1 thesis §4.4 dial flicker register — "flicker as lights in the city")

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; live-update motion preserved across theme transitions
- **Per-theme pairing.** Meta text + event prose + lane indicators + atmospheric flicker per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.meta` (timestamp + source-handle); `tokens.color.text.primary` (event prose); `tokens.color.lane.<lane>.fill` (lane indicator); `tokens.color.atmosphere.window-warm` (flicker)
- **Typography tokens.** `tokens.type.meta.500` for timestamp + source-handle (Meta-code slot, component-locked per CD1 Concept 1); `tokens.type.body.400` for event prose (Body slot — prose-segments inherit NARRATIVE register); `tokens.type.meta.500` for inline code-segments (Meta-code maintained for code-within-prose)
- **Spacing tokens.** `tokens.space.scale.<n>` for ticker padding + per-entry spacing + entry-internal spacing (timestamp / handle / prose)
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate; `tokens.color.atmosphere.window-warm` flicker
- **Cartography tokens.** `cartography.marker.<role>` for optional MetroMapMarker compact-variant per entry (events with cosmological-position)

## Field 8 — Storybook 9 contract

- **Story names.** `Default` / `Paused` / `Streaming` / `Loading` / `Error` / `WithCodeSnippets` / `WithMetroMapMarker` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `entries` (array; default fixture with mix of commits + infra-events + agent-activity) + `paused` (bool) + `reducedMotion` (bool) + `lifecycleState` (enum: `loading | streaming | paused | error`)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + websocket-emulator decorator (mocks live-update stream) + child-component decorators (CodeBlock compact-livesnippet + MetroMapMarker compact-variant fixtures)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations
- Row 13 (Lighthouse CI motion-performance budget) — LiveTicker live-update motion consumes compositor budget; W3 implementation gate validates Lighthouse CI metrics include LiveTicker live-update motion in benchmark

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Meta text + body + lane + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD5 dependency (load-bearing).** Live-update motion + flicker discipline; CD5 ratifies durations + ease curves + flicker cadence; the flicker register is shared with CartographyCanvas substrate per CD1 thesis §4.4 dial principle. CD5 ratifies the flicker register as a single discipline applied across both LiveTicker (per-entry-arrival flicker) and CartographyCanvas (ambient lights-in-the-city flicker).
- **CodeBlock coupling.** LiveTicker may render CodeBlock `compact-livesnippet` variant inline for code-bearing events. Per CodeBlock spec Field 2.
- **MetroMapMarker coupling.** LiveTicker may render MetroMapMarker compact-variant inline for cosmological-position events.
- **EditorialDigest distinction.** LiveTicker = live-cadence (minutes-to-hours; commits + infra + agent-activity). EditorialDigest = editorial-cadence (days-to-weeks; curated entries + coming-soon). Distinct components; complementary on homepage.
- **METhpartial-NARRATIVE register marriage in single component.** LiveTicker is one of the few components that hosts BOTH registers natively per turn — Meta-code timestamp + source-handle + event prose IS the marriage of registers per CD1 Concept 5 + thesis §3. The marriage is structural (containment governance enforced at token level); reader experiences the type-voice shift as wayfinding (Meta-code = technical-event register; Body = prose-narrative register).
