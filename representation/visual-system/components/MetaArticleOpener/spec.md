---artifact: cd4-component-spec
component: MetaArticleOpener
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C5 multi-voice typography (META register; Wired/Hacker calibration) + C1 typeface containment (Meta-code prominent in metadata band) + C7 article-as-missive
mode-crossing: article-only — opens articles in META register; does NOT cross to reception (reception's feature-story preview uses ReceptionHero, not the article opener itself)
upstream-cascade:
  - CD1 thesis — §2 Concept 1 5-typeface containment (META variant) + §2 Concept 5 multi-voice marriage of registers + §2 Concept 7 article-as-missive
  - CD2 color tokens (tokens.color.lane.* + tokens.color.text.meta + tokens.color.chrome.*)
  - CD3 cartography (cartography.district.<name> + cartography.marker.<role> for in-opener district-context indicator)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: MetaArticleOpener — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# MetaArticleOpener — Spec scaffold

META article opener. Institutional / compressed / data-forward. Density-prioritized reading; metadata band prominent; headline tight; subhead utilitarian; image-or-data-visualization above headline. Per CD1 Concept 5 (marriage of registers): META content reads in Wired/Hacker register through the Meta-code typeface (component-locked); the opener IS where META register opens an article. Use cases per catalogue §5.1: dispatch-style entries / research returns / infrastructure-decision posts / change-log entries / post-mortem write-ups.

## Field 1 — Structure

- **Top-level element role.** `<header role="banner" aria-labelledby="article-title">` containing the article-opener composition
- **Slot composition.** Composed of (top-to-bottom):
  - Image-or-data-visualization slot (above headline — this is the META "data-forward" signature)
  - Metadata band — DldsPanel (`meta-opener-prominent` variant) + read-time + lane indicator + Inferno-circle-if-applicable
  - Headline `<h1>` (tight scale; compressed leading)
  - Subhead `<p>` (utilitarian; Body weight at compressed leading)
  - Optional MetroMapMarker (currently inclined: in opener for cosmological context; W3 ratifies positioning)
  - Author + date chrome
- **Three-layer destination.** `/components/custom` — Prime extension; orchestrates child components (DldsPanel + MetroMapMarker)
- **Mode-crossing declaration.** Article-only. Opens articles in META register; does NOT cross to reception. Reception's feature-story preview uses ReceptionHero composition with NARRATIVE-prominent register, not MetaArticleOpener.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | most META articles | full composition: image-or-dataviz above + metadata band + tight headline + utilitarian subhead |
| `dataviz-prominent` | research-return article-type | dataviz takes hero position (larger scale); headline below |
| `change-log` | change-log article-type | metadata band hyper-prominent (version + date + summary); headline tighter; image-optional |
| `post-mortem` | post-mortem article-type | metadata band includes incident-time + duration + impact; tone-of-voice constraint applied per voice library |
| `compact-mobile` | mobile breakpoint | image-or-dataviz inline-scale; metadata stacks vertically |

## Field 3 — States

- **Interaction states.** Inherited from child components (DldsPanel disclosure-toggle; MetroMapMarker neighbor-nodes; image lightbox if applicable)
- **Lifecycle states.** `loading` (initial article-metadata fetch; rare if SSR'd) / `loaded` / `error` (rare; metadata missing — fallback rendering)

Keyboard navigation: tab through metadata band → headline (focusable for skip-to-content) → subhead (non-focusable) → DldsPanel disclosure → MetroMapMarker neighbor-nodes.

## Field 4 — Accessibility

- **ARIA.** `<header role="banner">` with `aria-labelledby="article-title"`; `<h1 id="article-title">` for headline; image-or-dataviz with `<figure>` + `<figcaption>` + descriptive alt-text; child components (DldsPanel, MetroMapMarker) carry their own ARIA contracts
- **Keyboard navigation.** Tab order: metadata band (interactive children) → headline (skip-to-content target) → subhead → child component focus areas
- **Screen-reader behavior.** Banner landmark announced; headline read; metadata band announces lane + authorship + read-time; child component ARIA inherited
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: headline text on `tokens.color.atmosphere.sky-low`; metadata text on lane pigment OR atmospheric substrate; CD2 ratifies threshold values
- **Reduced-motion contract.** Image hover/zoom animations removed; instant rendering; child component reduced-motion contracts inherited

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (META is data-forward, not motion-forward)
- **Per-state motion.** Image hover-zoom (~200ms; opt-in per W3 ratification); MetroMapMarker neighbor-node hover (inherited); DldsPanel disclosure animation (inherited)
- **Reduced-motion fallback.** All motion removed; child components apply own reduced-motion contracts
- **Atmospheric chrome interaction.** Opener substrate consumes `tokens.color.atmosphere.sky-low`; atmospheric-chrome-not-animated rule applies

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; child components re-render
- **Per-theme pairing.** Headline color + metadata-band colors + image substrate per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.primary` (headline); `tokens.color.text.secondary` (subhead); `tokens.color.text.meta` (metadata band); `tokens.color.lane.<lane>.fill` (lane indicator)
- **Typography tokens.** `tokens.type.title.700` for headline at META-tight scale (Title slot, DISpatch-locked, but at META-compressed scale + leading per catalogue §5.3); `tokens.type.body.500` for subhead at utilitarian scale; `tokens.type.meta.500` for metadata band (Meta-code slot, component-locked); `tokens.type.meta.400` for read-time + author chrome
- **Spacing tokens.** `tokens.space.scale.<n>` for opener padding + metadata-band spacing + headline margin (compressed scale)
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate; `tokens.color.atmosphere.sky-high` if image-or-dataviz region warrants luminance contrast (per §4.5)
- **Cartography tokens.** `cartography.district.<name>` (district context); `cartography.marker.<role>` (MetroMapMarker inherited)

## Field 8 — Storybook 9 contract

- **Story names.** `Default` / `DatavizProminent` / `ChangeLog` / `PostMortem` / `CompactMobile` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `articleData` (object: title + subtitle + authorship + date + lane + Inferno-circle + image/dataviz fixture) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + child-component decorators (DldsPanel + MetroMapMarker stubs from CD3)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Text + lane + atmospheric tokens; CD2 ratifies values + APCA pairings; META scale + leading + measure pairings ratify per §9.4 Mayor adjudication
- **CD3 dependency.** District + marker stubs; CD3 ratifies cartographic encoding
- **CD5 dependency.** Image hover-zoom + child component motion; CD5 ratifies durations
- **NarrativeArticleOpener distinction.** Per CD1 Concept 5 + catalogue §5: distinct components (NOT variants of single ArticleOpener). META reader-contract = density-prioritized; NARRATIVE reader-contract = whitespace-prioritized. Both consume same 5-typeface system; differ in scale + leading + measure pairings + which typeface is prominent.
- **DldsPanel coupling.** MetaArticleOpener uses DldsPanel `meta-opener-prominent` variant; metadata band is DLDS-anchored.
- **MetroMapMarker coupling.** MetaArticleOpener may include MetroMapMarker in opener composition (currently inclined: yes, for cosmological context above-the-fold); W3 ratifies positioning.
- **Stream-C W5 article-pattern catalog.** Per master plan §4 W1 Per-Stream deliverables Stream-C row: Stream-C reads MetaArticleOpener spec at W5 to author META article-pattern templates.
