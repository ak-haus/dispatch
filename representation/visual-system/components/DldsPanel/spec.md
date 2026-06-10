---artifact: cd4-component-spec
component: DldsPanel
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C1 typeface containment (Meta-code slot for META register) + C5 META × NARRATIVE distinction + C6 institutional anchor neighborhood (provenance disclosure carries voice-anchored DLDS lineage)
mode-crossing: article-only — appears at article header / metadata band; does NOT cross to reception (reception's metadata band is EditorialDigest-level, not per-article DLDS)
upstream-cascade:
  - CD1 thesis — §2 Concept 1 5-typeface containment (Meta-code slot) + §2 Concept 5 META × NARRATIVE register marriage
  - CD2 color tokens (tokens.color.lane.* — DLDS lane pigments per voice/lane-schema.md from main canon)
  - CD3 cartography (cartography.district.<name> — current district context coupling)
  - voice/lane-schema.md (DLDS three-layer; canonical authority on disclosed-lane-drift-sensing taxonomy)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: DldsPanel — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# DldsPanel — Spec scaffold

Disclosed-Lane Drift-Sensing panel. Carries provenance + register disclosure for an article: lane (terracotta / graphite-blue / dispatch-red), authorship attribution (human-only / human-led-AI-assisted / AI-led-human-supervised / system-generated), drift-sensitivity flag (if any), C2PA attached metadata (if any). Per CD1 Concept 5: DldsPanel reads in META register through Meta-code typography. Per voice-library lineage (canon main): DLDS is the structural-honesty mechanism Prime uses to disclose register-of-authorship across surfaces.

## Field 1 — Structure

- **Top-level element role.** `<aside role="complementary" aria-labelledby="dlds-N-label">` with optional disclosure-toggle `<button>` for expanded provenance
- **Slot composition.** Composed of:
  - Lane indicator (color swatch + lane name; e.g., "Terracotta — human-led-AI-assisted")
  - Authorship attribution (citizen handle + ai_role attribution per voice/lane-schema.md)
  - Drift-sensitivity indicator (if applicable)
  - Optional C2PA badge (if attached)
  - Disclosure-toggle for expanded provenance details
- **Three-layer destination.** `/components/custom` — Prime extension; voice-library lineage
- **Mode-crossing declaration.** Article-only. DldsPanel renders at article header / metadata band (typically inside MetaArticleOpener; rarely inside NarrativeArticleOpener — NARRATIVE opener has restrained chrome below the standfirst per §5.2). Does NOT cross to reception (reception's metadata band is EditorialDigest-level, not per-article DLDS).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `inline-disclosure` (default) | every article | lane + authorship inline; expanded-provenance hidden behind toggle |
| `expanded-provenance` | user-toggled OR article opt-in for full transparency | full provenance details visible inline (no toggle) |
| `c2pa-attached` | C2PA metadata present | adds C2PA badge + verification link |
| `meta-opener-prominent` | rendered inside MetaArticleOpener | full panel rendered prominently in metadata band |
| `narrative-opener-restrained` | rendered inside NarrativeArticleOpener | minimal lane indicator + authorship only; provenance details deferred to article-end footer |

## Field 3 — States

- **Interaction states.** Disclosure-toggle: `idle` / `hover` / `focus` / `active`; panel: `collapsed` (inline-disclosure default) / `expanded` (expanded-provenance variant or user-toggled)
- **Lifecycle states.** `loading` (rare; if DLDS metadata fetched async) / `loaded` / `error` (rare; DLDS metadata missing — fallback rendering: "Authorship: unattributed" with warning indicator)

Keyboard navigation: tab to disclosure-toggle; enter expands/collapses; tab into expanded panel for provenance detail focus.

## Field 4 — Accessibility

- **ARIA.** `<aside role="complementary" aria-labelledby="dlds-N-label">`; disclosure-toggle `<button aria-expanded aria-controls="dlds-N-detail">`; lane swatch with `aria-label="Lane: <name>"`; C2PA badge with `aria-label="Content credentials available"`
- **Keyboard navigation.** Tab to disclosure-toggle; enter expands; tab into expanded panel; escape collapses (when expanded by user toggle)
- **Screen-reader behavior.** Aside landmark announced; lane + authorship + drift-sensitivity read inline; expanded provenance read on disclosure
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: lane pigment foreground on `tokens.color.atmosphere.sky-low` background; meta text on lane pigment OR on neutral substrate per CD2 ratification; CD2 ratifies threshold values per DP-Q4 lane-pigment adversarial validation
- **Reduced-motion contract.** Disclosure expand/collapse animation removed; instant appearance-toggle

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion
- **Per-state motion.** Disclosure `collapsed → expanded` slide-down (~200ms ease-out); disclosure-toggle `idle → hover` color shift (~150ms)
- **Reduced-motion fallback.** All transitions become instant
- **Atmospheric chrome interaction.** DldsPanel substrate consumes `tokens.color.atmosphere.sky-low` OR optional lane-pigment-tinted background per variant; atmospheric-chrome-not-animated rule applies

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens
- **Per-theme pairing.** Lane pigments per theme + meta text colors per theme + disclosure-toggle chrome per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.lane.<lane-name>.<fill|text|border>` per voice/lane-schema.md taxonomy (terracotta / graphite-blue / dispatch-red); `tokens.color.text.meta` (authorship text); `tokens.color.chrome.text` (disclosure-toggle); `tokens.color.atmosphere.sky-low` (substrate)
- **Typography tokens.** `tokens.type.meta.500` for lane name + authorship attribution (Meta-code slot per CD1 Concept 1 component-locked); `tokens.type.meta.400` for drift-sensitivity + provenance details; `tokens.type.nav.400` for disclosure-toggle label
- **Spacing tokens.** `tokens.space.scale.<n>` for panel padding + lane-swatch spacing + provenance-detail spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate
- **Cartography tokens.** `cartography.district.<name>` for optional district-context indicator (currently inclined: yes; reinforces wayfinding-within-district)

## Field 8 — Storybook 9 contract

- **Story names.** `InlineDisclosure` / `ExpandedProvenance` / `C2paAttached` / `MetaOpenerProminent` / `NarrativeOpenerRestrained` / per-lane (`Terracotta` / `GraphiteBlue` / `DispatchRed`) / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `lane` (enum) + `authorship` (object: citizen + ai_role per voice/lane-schema) + `driftSensitivity` (enum) + `c2paAttached` (bool) + `theme` (enum) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + voice-library-decorator (provides DLDS metadata fixtures from voice/lane-schema.md)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Lane pigments + atmospheric tokens + meta text tokens; CD2 ratifies values per DP-Q4 lane-pigment adversarial validation
- **CD3 dependency.** District-context coupling — DldsPanel consumes `cartography.district.<name>` for optional district-context indicator
- **CD5 dependency.** Disclosure motion; CD5 ratifies durations + ease curves
- **voice/lane-schema.md authority.** DLDS taxonomy is authored in voice library (canon main); CD4 spec inherits the taxonomy. DLDS evolution (new lanes, new ai_roles, new drift-sensitivity values) routes through voice library Reviewer/Auditor lifecycle; CD4 spec re-renders against updated taxonomy.
- **MetaArticleOpener vs NarrativeArticleOpener integration.** META opener renders DldsPanel prominently in metadata band; NARRATIVE opener renders restrained DldsPanel below standfirst (with provenance details deferred to article-end footer per §5.2). Coordination via shared DldsPanel component with variant prop; MetaArticleOpener + NarrativeArticleOpener pass appropriate variant.
