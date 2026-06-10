---artifact: cd4-component-spec
component: NarrativeArticleOpener
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C5 multi-voice typography (NARRATIVE register; NYT Magazine / New Yorker / Paris Review / Baffler calibration) + C1 typeface containment (Title + Body prominent) + C7 article-as-missive (article-as-sanctuary)
mode-crossing: article-only — opens articles in NARRATIVE register; reception's feature-story preview (ReceptionHero) inherits NARRATIVE register patterns but is its own composition
upstream-cascade:
  - CD1 thesis — §2 Concept 1 5-typeface containment (NARRATIVE variant) + §2 Concept 5 multi-voice marriage of registers + §2 Concept 7 article-as-sanctuary
  - CD2 color tokens (tokens.color.text.* + tokens.color.atmosphere.*)
  - CD3 cartography (no direct coupling at opener; DldsPanel restrained-variant references district)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: NarrativeArticleOpener — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# NarrativeArticleOpener — Spec scaffold

NARRATIVE article opener. Literary / spacious / voice-driven. Whitespace-prioritized reading; authorial voice prominent (italicized standfirst / opening epigraph / first-paragraph drop-cap optional); image-or-illustration below headline (or absent); article-as-sanctuary register. Per CD1 Concept 5 (marriage of registers): NARRATIVE content reads in NYT Magazine / New Yorker / Paris Review / Baffler register through Title + Body (DISpatch-locked); the opener IS where NARRATIVE register opens an article. Use cases per catalogue §5.2: developer-diary entries / philosophical posts / register-statement posts / Mayor-direction posts.

## Field 1 — Structure

- **Top-level element role.** `<header role="banner" aria-labelledby="article-title">` containing the article-opener composition
- **Slot composition.** Composed of (top-to-bottom):
  - Optional epigraph slot (italicized literary citation; sets reader-mood before headline)
  - Headline `<h1>` (spacious scale; long leading; measured measure)
  - Standfirst `<p>` (italicized standfirst per NYT Magazine pattern; voice-driven; long leading)
  - Optional image-or-illustration slot (BELOW headline; absent for pure-prose articles)
  - Optional first-paragraph drop-cap (Body slot at display scale; per article preference)
  - Restrained chrome — DldsPanel (`narrative-opener-restrained` variant) + author + date BELOW the standfirst (NOT in metadata band; the chrome is restrained per CD1 Concept 7 article-as-sanctuary)
- **Three-layer destination.** `/components/custom` — Prime extension
- **Mode-crossing declaration.** Article-only. Opens articles in NARRATIVE register; does NOT cross to reception. ReceptionHero on reception inherits NARRATIVE register patterns (Title + Body prominent; spacious scale) but is its own composition (feature-story preview, not full article opener).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default` | most NARRATIVE articles | epigraph optional + spacious headline + italicized standfirst + image-below-or-absent + restrained chrome below standfirst |
| `epigraph-prominent` | per article preference; literary citation as opening | epigraph rendered prominently above headline (~150% scale) |
| `drop-cap` | per article preference; literary opening | first-paragraph drop-cap (Body slot at display scale; ~3-4 lines tall) |
| `image-absent` | pure-prose articles (most developer-diary entries) | no image; opener is purely typographic |
| `compact-mobile` | mobile breakpoint | spacious scale compressed slightly to maintain whitespace within constraints |

## Field 3 — States

- **Interaction states.** Inherited from child components (DldsPanel disclosure if user-toggles for full provenance); image lightbox if applicable
- **Lifecycle states.** `loading` (initial article-metadata fetch; rare if SSR'd) / `loaded` / `error` (rare; metadata missing — fallback rendering)

Keyboard navigation: tab through (epigraph if present) → headline (skip-to-content target) → standfirst (non-focusable) → restrained chrome (DldsPanel disclosure if interactive).

## Field 4 — Accessibility

- **ARIA.** `<header role="banner">` with `aria-labelledby="article-title"`; `<h1 id="article-title">` for headline; epigraph `<blockquote>` if rendered; standfirst `<p>` with descriptive class semantics; image with `<figure>` + `<figcaption>` + alt-text
- **Keyboard navigation.** Tab order: epigraph (if focusable; e.g., link in citation) → headline → standfirst (non-focusable) → restrained chrome (DldsPanel disclosure if interactive) → image lightbox if applicable
- **Screen-reader behavior.** Banner landmark announced; headline read; standfirst read inline; epigraph announced via `<blockquote>` if rendered; restrained chrome read after standfirst
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: headline text on `tokens.color.atmosphere.sky-low`; standfirst text on same; epigraph text on optional `tokens.color.atmosphere.sky-high`; CD2 ratifies threshold values
- **Reduced-motion contract.** Image hover/zoom animations removed; child component reduced-motion contracts inherited

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (NARRATIVE is whitespace-and-prose, not motion-forward)
- **Per-state motion.** Image hover-zoom (~200ms; opt-in per W3 ratification); NO opener entrance animation (article-as-sanctuary; reader arrives at the opener; the opener does not perform)
- **Reduced-motion fallback.** All motion removed
- **Atmospheric chrome interaction.** Opener substrate consumes `tokens.color.atmosphere.sky-low`; per CD1 Concept 4: paper-grain warmth + warm-white scale; the opener feels printed, not screen-illuminated

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens
- **Per-theme pairing.** Headline color + standfirst color + epigraph color + image substrate per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.primary` (headline); `tokens.color.text.standfirst` (italicized standfirst; W3 ratifies whether dedicated token or inherited from primary); `tokens.color.text.epigraph` (epigraph text); `tokens.color.text.secondary` (date + author chrome)
- **Typography tokens.** `tokens.type.title.700` for headline at NARRATIVE-spacious scale (Title slot, DISpatch-locked, at NARRATIVE-spacious scale + leading per catalogue §5.3); `tokens.type.body.400-italic` for standfirst (Body slot; italicized variant per NYT Magazine pattern); `tokens.type.body.300-italic` for epigraph (Body slot; smaller scale + italicized); `tokens.type.body.500` for first-paragraph drop-cap variant; `tokens.type.nav.400` for restrained chrome (date + author + DldsPanel labels)
- **Spacing tokens.** `tokens.space.scale.<n>` for opener padding (generous per Concept 4 atmospheric breathing room) + headline margin (long leading) + standfirst margin
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate; `tokens.color.atmosphere.sky-high` for optional epigraph region (per §4.5)
- **Cartography tokens.** N/A at opener itself; DldsPanel restrained-variant references district

## Field 8 — Storybook 9 contract

- **Story names.** `Default` / `EpigraphProminent` / `DropCap` / `ImageAbsent` / `CompactMobile` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `articleData` (object: title + standfirst + epigraph + authorship + date + lane + image/illustration fixture if not absent) + `dropCapEnabled` (bool) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + paper-grain decorator (Concept 4 register) + child-component decorators (DldsPanel restrained-variant fixtures)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Text + atmospheric tokens; CD2 ratifies values + APCA pairings; NARRATIVE scale + leading + measure pairings ratify per §9.4 Mayor adjudication
- **CD3 dependency.** District/cartography stubs only via DldsPanel restrained-variant; opener itself is cartography-decoupled per article-as-sanctuary register
- **CD5 dependency.** Image hover-zoom (if ratified); NARRATIVE opener does NOT perform entrance animation
- **MetaArticleOpener distinction.** Per CD1 Concept 5 + catalogue §5: distinct components (NOT variants of single ArticleOpener). NARRATIVE reader-contract = whitespace-prioritized; META reader-contract = density-prioritized.
- **DldsPanel coupling.** NarrativeArticleOpener uses DldsPanel `narrative-opener-restrained` variant; provenance details deferred to article-end footer (NOT in opener metadata band per article-as-sanctuary register).
- **ReceptionHero inheritance.** ReceptionHero on reception inherits NARRATIVE register patterns (Title + Body prominent; spacious scale; voice-driven) but composes feature-story preview (NOT full article opener). Shared NARRATIVE typographic-DNA via CD2 token references; distinct compositions per catalogue §3.1.
- **Stream-C W5 article-pattern catalog.** Per master plan §4 W1 Per-Stream deliverables Stream-C row: Stream-C reads NarrativeArticleOpener spec at W5 to author NARRATIVE article-pattern templates.
