---artifact: cd4-component-spec
component: CrossPost
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 digital-native + print-derived simultaneously + C7 article-as-sanctuary (positionally-controlled to preserve sanctuary register)
mode-crossing: article-only — appears at article-end footer position; does NOT cross to reception
upstream-cascade:
  - CD1 thesis — §2 Concept 7 walking metaphor (article-as-sanctuary; positionally-controlled cross-post per §3.A homepage-vs-article affordance crossover)
  - CD2 color tokens (tokens.color.lane.* per platform; tokens.color.chrome.*)
  - master plan §11 Q13 (cross-post platform list: Hashnode / Dev.to / LinkedIn / Substack / X / Bluesky / Mastodon)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: CrossPost — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# CrossPost — Spec scaffold

Cross-platform syndication surface. Renders syndication links to platforms per master plan §11 Q13 (Hashnode / Dev.to / LinkedIn / Substack / X / Bluesky / Mastodon). Per CD1 Concept 7 article-as-sanctuary: CrossPost is positionally-controlled — appears at article-end footer position only (NOT in chrome alongside the article body); preserves sanctuary register during reading. Per CD1 Concept 7 digital-native + print-derived simultaneously: cross-post acknowledges the digital-native distribution layer without compromising the article's print-derived sanctuary.

## Field 1 — Structure

- **Top-level element role.** `<aside role="complementary" aria-labelledby="cross-post-title">` at article-end footer position
- **Slot composition.** Composed of:
  - Section heading `<h3>` ("Read this elsewhere" or per Mayor naming preference)
  - Per-platform `<a>` link with platform glyph + platform name (subtle; chrome-typography)
  - Optional per-platform read-stat (W3 may surface; not V1 ship)
- **Three-layer destination.** `/components/patterns` — compound; per-platform variants share orchestration
- **Mode-crossing declaration.** Article-only at article-end position. Does NOT cross to reception (reception aggregates editorial-digest + ticker + feature-story; cross-post is per-article syndication, not magazine-level). Does NOT appear in article chrome (only at article-end footer per sanctuary discipline).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | every article | per-platform links per master plan §11 Q13 |
| `subset` | per article opt-in for selective syndication | renders only selected platforms |
| `read-stats` (W3 may surface; not V1 ship) | per Mayor adjudication if per-platform read-stats become available | renders read-counts per platform alongside link |
| `compact-mobile` | mobile breakpoint | per-platform links stack vertically |

## Field 3 — States

- **Interaction states.** Per platform link `idle` / `hover` / `focus` / `active` (clickable; opens external in new tab)
- **Lifecycle states.** N/A (static; no async lifecycle in V1)

Keyboard navigation: tab through platform links per visual order; enter opens external (in new tab via `target="_blank" rel="noopener noreferrer"`).

## Field 4 — Accessibility

- **ARIA.** `<aside role="complementary" aria-labelledby="cross-post-title">`; per platform `<a target="_blank" rel="noopener noreferrer" aria-label="Read on <platform> (opens in new tab)">`
- **Keyboard navigation.** Tab through platform links
- **Screen-reader behavior.** Aside landmark announced; per-platform link announces platform name + "opens in new tab"
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: platform glyph + platform name on `tokens.color.atmosphere.sky-low`; CD2 ratifies threshold values; per-platform lane pigments may be subtle (per Mayor adjudication; currently inclined: subtle platform-color hint to acknowledge syndication-platform identity without dominating)
- **Reduced-motion contract.** Hover-state animations removed; instant state-toggle

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (chrome, not spectacle)
- **Per-state motion.** Per-platform link `idle → hover` color shift + glyph subtle transition (~150ms)
- **Reduced-motion fallback.** Hover-state color shift retained (color is not motion); glyph transition removed
- **Atmospheric chrome interaction.** CrossPost substrate consumes `tokens.color.atmosphere.sky-low`; atmospheric-chrome-not-animated rule applies

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; per-platform glyph/color may shift per theme (W3 ratifies whether platform-color stays canonical or shifts)
- **Per-theme pairing.** Chrome text + platform glyph + platform name per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.chrome.text` (platform name); `tokens.color.lane.<platform>.fill` per platform (Hashnode / Dev.to / LinkedIn / Substack / X / Bluesky / Mastodon — CD2 ratifies platform-color tokens; subtle hint, not full platform palette dominance)
- **Typography tokens.** `tokens.type.nav.500` for platform-name (Nav slot, Prime-platform-wide); `tokens.type.nav.400` for section heading
- **Spacing tokens.** `tokens.space.scale.<n>` for cross-post padding + per-platform spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate
- **Cartography tokens.** N/A — no cartography coupling

## Field 8 — Storybook 9 contract

- **Story names.** `Default` / `Subset` / `ReadStats` (if W3 surfaces) / `CompactMobile` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `platforms` (array; default fixture with all 7 platforms per §11 Q13) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + article-end-footer decorator (renders within fixture article-end position)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Chrome + per-platform lane tokens + atmospheric tokens; CD2 ratifies values + APCA pairings + per-platform color discipline (subtle, not dominant)
- **CD5 dependency.** Hover-state motion; CD5 ratifies durations
- **Article-as-sanctuary positional discipline.** Per CD1 Concept 7: CrossPost positioned at article-end footer ONLY. Does NOT appear in chrome alongside article body. Does NOT appear in article-opener metadata band. Sanctuary register preserved during reading; cross-post acknowledged only at article completion.
- **Master plan §11 Q13 platform list.** V1 ships with all 7 platforms; per-article opt-out for subset variant. Future Building inheritance may add or subtract platforms per Mayor amendment.
- **Per-platform compound discipline.** CrossPost is spec'd as compound at CD4 (orchestrates per-platform link rendering); W3 implementation may split per-platform into sub-components (PlatformLink × 7) OR keep compound. Mayor adjudicates at W3 implementation gate.
