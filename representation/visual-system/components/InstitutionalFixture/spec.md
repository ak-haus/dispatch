---artifact: cd4-component-spec
component: InstitutionalFixture
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C6 institutional anchor (Paradiso 9-charter-spheres seed-mandate) + C1 typeface containment (Title slot, quiet weight) + C4 atmosphere as physical substrate
mode-crossing: cross-surface chrome — appears quietly on EVERY surface (reception + article); position is consistent (footer-adjacent or chrome-edge per Mayor adjudication at W3); not adaptive per surface
upstream-cascade:
  - CD1 thesis — §2 Concept 6 institutional anchor identity (Paradiso 9-charter-spheres expressed as cohesive mission); V1 ships seed-mandate slot with typographic fixture on every surface
  - CD2 color tokens (tokens.color.atmosphere.* + tokens.color.text.*)
  - CD3 cartography (no direct coupling)
  - Future Paradiso authoring arc (post-V1; fixture content evolves to carry full 9-sphere articulation when authored)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: InstitutionalFixture — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# InstitutionalFixture — Spec scaffold

The Paradiso 9-charter-spheres seed-mandate fixture. Quiet typographic anchor that appears on every DISpatch surface from V1 launch. Communicates that the publication has roots — and roots give authority — without performance. Distinct from MastheadWordmark (building-name identity); distinct from SiteNav (navigation chrome). Per CD1 Concept 6: NOT a founding date (Prime is forward-looking; dating-yourself-by-year traps the platform in a time capsule); the institutional anchor IS the charter mandate expressed as a cohesive mission.

## Field 1 — Structure

- **Top-level element role.** `<aside role="contentinfo" aria-label="Institutional mandate">` or `<footer aria-label="Institutional mandate">` (W3 ratifies semantic; `aside` preserves the "quiet sidebar" register, `footer` aligns with surface-footer position)
- **Slot composition.** Single typographic slot rendering Mayor-articulated seed-mandate prose; optional `<a>` linking to forward-arc full Paradiso charter when authored
- **Three-layer destination.** `/components/custom` — Prime extension; carries V1 seed-mandate; evolves to load full charter when Paradiso authored
- **Mode-crossing declaration.** Cross-surface chrome. Identical position + identical typographic treatment on EVERY surface (reception + article). Per CD1 Concept 6: "fixture appears consistently across every surface"; per CD1 Concept 4: rendered on warm-paper atmospheric substrate ("printed institutional anchor, NOT screen-illuminated UI element"). Mode-crossing is intentional UNIFORMITY — fixture's gravity comes from its consistency.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `seed-mandate` (V1 ship) | always at V1 | renders Mayor-articulated seed-mandate prose; future-arc link to full Paradiso charter (placeholder URL until Paradiso authored) |
| `full-charter` (post-V1) | activates when Paradiso authoring arc completes | renders full 9-sphere articulation OR continues seed-mandate with link-to-charter; W3+ Mayor adjudicates expansion pattern |

## Field 3 — States

- **Interaction states.** `idle` / `hover` / `focus` / `active` (only on optional `<a>` to charter — fixture itself is static prose)
- **Lifecycle states.** N/A (chrome; no async lifecycle)

Keyboard navigation: tab-focusable on `<a>` only; fixture-prose itself is non-interactive (read-only typography).

## Field 4 — Accessibility

- **ARIA.** `<aside role="contentinfo">` OR `<footer>` per W3 ratification; `aria-label="Institutional mandate"` (or per Mayor adjudication on naming)
- **Keyboard navigation.** Optional `<a>` to charter is tab-focusable; fixture itself is not interactive
- **Screen-reader behavior.** Announced as "Institutional mandate, complementary" or "footer" per role; prose read inline; charter `<a>` announces "Read Prime's charter, link"
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairing: `tokens.color.text.quiet` foreground on `tokens.color.atmosphere.window-warm` background; CD2 ratifies threshold values; "quiet weight" register means text is intentionally low-contrast within APCA-acceptable thresholds (warmth, not loudness)
- **Reduced-motion contract.** No motion to disable; static rendering across all theme cycles

## Field 5 — Motion

- **Motion register.** Static (per CD1 Concept 4 atmospheric-chrome-not-animated rule + CD1 Concept 6 "quiet typographic fixture" — fixture is the still point of every surface)
- **Per-state motion.** Optional `<a>` hover-state color shift (~150ms; CD5 stub) — only motion event
- **Reduced-motion fallback.** Hover-state color shift retained (color is not motion); no other motion to disable
- **Atmospheric chrome interaction.** Fixture renders ON atmospheric substrate (`tokens.color.atmosphere.window-warm`); atmospheric drift at theme-cycle transitions is the only background motion (handled by atmospheric layer, not by fixture)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; no transition motion at theme cycle (atmospheric-chrome-not-animated rule); fixture stays "the still point" across theme transitions
- **Per-theme pairing.** `tokens.color.text.quiet.<theme>` foreground on `tokens.color.atmosphere.window-warm.<theme>` background; warmth is preserved across themes (paper-grain register continuity per CD1 Concept 4)

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.quiet` foreground; `tokens.color.text.quiet.hover` for optional charter link
- **Typography tokens.** `tokens.type.title.400` at quiet-fixture scale (Title slot, DISpatch-locked, but at quiet weight — distinct from MastheadWordmark's display weight); typeface-slot citation per CD1 5-typeface containment governance
- **Spacing tokens.** `tokens.space.scale.<n>` for fixture region padding (generous; the fixture has room to breathe per CD1 Concept 4 atmospheric breathing room)
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` background substrate (warm-paper register; printed-institutional-anchor feel per Concept 6 + Concept 4 fold)
- **Cartography tokens.** N/A — no cartography coupling

## Field 8 — Storybook 9 contract

- **Story names.** `SeedMandate` / `FullCharter` (post-V1; placeholder for future-arc) / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum: `seed-mandate` | `full-charter`) + `theme` (enum) + `mandateContent` (string; Mayor-articulated prose; default placeholder for V1) + `charterLinkURL` (string; placeholder for V1) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + atmospheric-substrate decorator (renders on `tokens.color.atmosphere.window-warm`) + paper-grain decorator (P5.js paper-grain layer per CD3 substrate)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Atmospheric tokens (`window-warm`) + text-quiet tokens; CD2 ratifies values + APCA pairings
- **CD5 dependency.** Motion register confirms atmospheric-chrome-not-animated rule applies to fixture
- **Future Paradiso authoring arc (post-V1).** Mayor articulates seed-mandate prose for V1; fixture renders the prose. When Paradiso authoring arc completes (forward-pointed per CD1 Concept 6), fixture content evolves to carry full 9-sphere articulation OR continues seed-mandate with link-to-charter; expansion pattern adjudicated per W3+ Mayor gate.
- **Distinct from MastheadWordmark.** MastheadWordmark = building-name identity at masthead position only; InstitutionalFixture = Paradiso seed-mandate quietly on every surface. Different containment scopes (Title slot at display scale at masthead vs Title slot at quiet scale on every surface); different surface coverage (masthead vs everywhere); different rendering substrate (masthead chrome vs warm-paper atmospheric substrate). See catalogue §9.10 Mayor adjudication point.
- **V1 ship implementation pattern.** Mayor articulates seed-mandate prose; CD4 spec scaffolds the fixture contract; W3 implements the fixture rendering; W7 ratifies cross-Building inheritance pattern (does fixture appear on future Buildings? Currently inclined: yes, per CD1 thesis Concept 6 institutional-anchor cross-surface uniformity).
