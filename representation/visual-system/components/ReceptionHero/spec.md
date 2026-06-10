---artifact: cd4-component-spec
component: ReceptionHero
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 reception ↔ offices ↔ missives + C5 multi-voice typography (NARRATIVE-prominent at hero per New Yorker / NYT Magazine glossary-top precedent) + C1 typeface containment (Title + Body prominent)
mode-crossing: reception-only — homepage feature-story hero; does NOT cross to article surfaces (article surfaces use NarrativeArticleOpener / MetaArticleOpener as full openers)
upstream-cascade:
  - CD1 thesis — §2 Concept 7 reception walking-metaphor + §2 Concept 5 multi-voice typography + Mayor 2026-05-08 New Yorker glossary-top precedent
  - CD2 color tokens (tokens.color.text.* + tokens.color.atmosphere.*)
  - CD3 cartography (cartography.district.<name> — district context for feature-story)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: ReceptionHero — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# ReceptionHero — Spec scaffold

Feature-story hero on DISpatch homepage. Per CD1 Concept 7 reception walking-metaphor + Mayor 2026-05-08 New Yorker precedent: "The New Yorker guides people through a magazine's kind of glossary at the top of it: feature story / things you should be reading today / ticker / coming-soon." ReceptionHero IS the feature-story slot — the front of the magazine. Inherits NARRATIVE register patterns from NarrativeArticleOpener (Title + Body prominent; spacious scale; voice-driven) but composes feature-story preview, NOT full article opener.

## Field 1 — Structure

- **Top-level element role.** `<article role="region" aria-labelledby="hero-title">` (semantic: featured article preview; not the full article); contains `<a>` wrapping the entire hero composition (clickable to navigate to feature-story full article)
- **Slot composition.** Composed of:
  - Optional epigraph slot (italicized literary citation — per article preference; same register-discipline as NarrativeArticleOpener)
  - Headline `<h2>` (spacious scale; long leading; NOT `<h1>` — homepage `<h1>` belongs to MastheadWordmark or page title)
  - Standfirst `<p>` (italicized standfirst per NYT Magazine pattern; voice-driven)
  - Optional image-or-illustration slot (BELOW headline OR aside)
  - Restrained chrome — author + date + lane indicator + optional ChapterRail `reception-condensed` variant ("what's inside" preview)
  - Read-CTA affordance (subtle; "Read the full dispatch" per voice library tone-of-voice)
- **Three-layer destination.** `/components/patterns` — homepage composition; orchestrates child components (ChapterRail reception-condensed variant)
- **Mode-crossing declaration.** Reception-only. Renders on homepage at glossary-top position; does NOT cross to article surfaces. Article surfaces use NarrativeArticleOpener / MetaArticleOpener as full openers. Per CD1 Concept 7: ReceptionHero IS the homepage's feature-story slot.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default-narrative` (currently inclined) | most feature stories | NARRATIVE-prominent register; spacious scale; epigraph optional + headline + standfirst + image-below-or-aside |
| `meta-feature` | feature story is META article-type (rare; e.g., research return as feature story) | composition shifts toward META register; metadata band visible; image-or-dataviz above headline; tighter scale |
| `image-prominent` | feature story has hero image-or-illustration as primary | image takes hero scale; headline below |
| `compact-mobile` | mobile breakpoint | spacious scale compressed; image stacks below headline |

## Field 3 — States

- **Interaction states.** Hero `<a>`-wrap: `idle` / `hover` / `focus` / `active`; ChapterRail reception-condensed inherits its own states
- **Lifecycle states.** `loading` (rare; if feature-story metadata fetched async) / `loaded` / `error` (rare; metadata missing — fallback rendering)

Keyboard navigation: tab to hero `<a>`-wrap; enter navigates to feature-story full article; tab into ChapterRail reception-condensed for chapter-preview navigation.

## Field 4 — Accessibility

- **ARIA.** `<article role="region" aria-labelledby="hero-title">`; `<h2 id="hero-title">` for headline; `<a aria-label="Read feature story: <title>">` wrapping the hero; image with `<figure>` + alt-text
- **Keyboard navigation.** Tab to hero link; enter navigates; tab into ChapterRail reception-condensed if interactive
- **Screen-reader behavior.** Region landmark announced; headline read; standfirst read; "Read feature story, link" announced via aria-label
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: headline + standfirst on `tokens.color.atmosphere.sky-low`; CD2 ratifies threshold values
- **Reduced-motion contract.** Hero image hover-zoom + hero entrance animation removed; instant rendering

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion (NARRATIVE register; whitespace-and-prose; reception is more dial-up than article surfaces but hero stays restrained)
- **Per-state motion.** Hero `idle → hover` subtle reveal (color shift + optional image scale ~200ms); ChapterRail reception-condensed inherits collapse motion
- **Reduced-motion fallback.** All motion removed; instant rendering; ChapterRail inherits reduced-motion contract
- **Atmospheric chrome interaction.** Hero substrate consumes `tokens.color.atmosphere.sky-low`; image-prominent variant may consume `tokens.color.atmosphere.sky-high` for image-region luminance contrast

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens
- **Per-theme pairing.** Headline + standfirst color + image substrate + chrome colors per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.primary` (headline); `tokens.color.text.standfirst` (italicized standfirst); `tokens.color.text.epigraph` (epigraph); `tokens.color.text.secondary` (chrome); `tokens.color.lane.<lane>.fill` (lane indicator)
- **Typography tokens.** `tokens.type.title.700` for headline at NARRATIVE-spacious scale (Title slot, DISpatch-locked); `tokens.type.body.400-italic` for standfirst (Body slot italic); `tokens.type.body.300-italic` for epigraph; `tokens.type.nav.400` for chrome (date + author + read-CTA + lane indicator)
- **Spacing tokens.** `tokens.space.scale.<n>` for hero padding (generous; atmospheric breathing room) + headline margin (long leading) + standfirst margin
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.sky-low` substrate; `tokens.color.atmosphere.sky-high` for optional image-prominent region
- **Cartography tokens.** `cartography.district.<name>` for optional district-context indicator in chrome (currently inclined: yes; subtle district-edge tint to reinforce wayfinding-from-homepage)

## Field 8 — Storybook 9 contract

- **Story names.** `DefaultNarrative` / `MetaFeature` / `ImageProminent` / `CompactMobile` / `WithEpigraph` / `WithChapterRailCondensed` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `featureData` (object: title + standfirst + epigraph + authorship + date + lane + image fixture + chapter-preview if any) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + paper-grain decorator + child-component decorators (ChapterRail reception-condensed fixtures)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Text + lane + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD3 dependency.** District-context coupling — ReceptionHero consumes `cartography.district.<name>` for optional district-edge tint
- **CD5 dependency.** Hover-state motion; CD5 ratifies durations + ease curves
- **NarrativeArticleOpener inheritance.** Per CD1 Concept 5: ReceptionHero inherits NARRATIVE register patterns (Title + Body prominent; spacious scale; voice-driven) from NarrativeArticleOpener via shared 5-typeface system + CD2 token references; distinct compositions (preview vs full opener) per catalogue §3.1.
- **EditorialDigest distinction.** ReceptionHero = feature-story hero (single article-preview prominent). EditorialDigest = things-to-read + coming-soon list (multiple-article-list). Distinct components per catalogue §9.12 Mayor adjudication point. Reasoning: different role contracts (single-preview-prominent vs list); semantic-componentization commitment per CD1 Concept 5 favors role-bounded components over composite-with-sections.
- **ChapterRail reception-condensed coupling.** ReceptionHero may render ChapterRail `reception-condensed` variant as "what's inside" preview; per ChapterRail spec Field 2.
