---artifact: article-pattern-narrative-canonical
authored: W1 Stream-A CD6 (PCP-165)
authored-date: 2026-05-09
status: active
co-owned-with: Stream-C (per master plan §3.A library destinations + §5.1 file ownership)
inherits-from: representation/content/article-patterns/_template.md (W0 Stream-C SKELETON 2026-05-07)
upstream-cascade:
  - master plan v1.0.9 §1.5 (distribution + META×NARRATIVE strategic framing)
  - representation/voice/thesis-statement.md (W1 CD6 RATIFIED 2026-05-09) §2 Concept 5 marriage-of-registers + §1 thesis substrate + §3 cosmology
  - representation/visual-system/thesis.md (W1 CD1 RATIFIED 2026-05-08) Concept 5 + Concept 7 walking metaphor
  - representation/visual-system/components.md (W1 CD4 RATIFIED 2026-05-08) §5.2 NARRATIVE opener distinction + §3.1 component #10 NarrativeArticleOpener
downstream-blocks:
  - W5 first NARRATIVE article authored against this pattern
  - W3 component layer (NarrativeArticleOpener spec.md authoring inherits from this pattern)
gate-criterion: schema validation per §3.C Zod schema + Vale.sh voice fidelity validation per representation/voice/fidelity.md
title: NARRATIVE Article Pattern (canonical)
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# NARRATIVE Article Pattern (canonical)

The NARRATIVE article pattern's canonical declaration. Reads in concert with `_template.md` (universal article skeleton) + `meta-pattern.md` (META pattern sibling) + `interplay-pattern.md` (interplay-as-shape canonical).

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + thesis-statement §0:

- **Concept-first.** Universal NARRATIVE concept cited first (literary-civic editorial register; voice-driven essay form; whitespace-prioritized reader contract; Title-prominent typography at spacious leading).
- **Examples that prove the climb at world-class scale.** Cited as examples that prove the concept; non-binding for future Buildings.
- **Muted language preserved** for typeface candidates / scale-leading-measure pairings / per-platform reshape specifics until W3 + W4 + W5 ratify.

## §1 — Universal NARRATIVE concept

**The NARRATIVE article reads as authorial voice — the publication's writer in conversation with the reader.** It carries the article's pose in the opening 1-2 paragraphs (the newspaper "lede"); typography is spacious; whitespace IS the substrate; multimedia leans atmospheric not technical. The reader's contract is *whitespace-prioritized*: they expect to see voice, scene-setting, philosophical claim, observation about the work or the world the work happens in. The publication is in literary register; the article is the missive from the building.

The NARRATIVE register is the marriage's literary-civic vector — NYT Magazine 2026 + The New Yorker + The Paris Review + The Baffler + The Atlantic + Sotheby's. Per CD1 thesis Concept 5: NARRATIVE content reads in NYT-Magazine / New-Yorker / Paris-Review / Baffler register through Title + Body (DISpatch-locked); article-as-sanctuary register preserved.

## §2 — Examples that prove the NARRATIVE concept at world-class scale

Per CD1 reference-archive §1 Concept 5 + §1 Concept 7 + master plan §1.5 strategic framing:

- **NYT Magazine 2026 (Bichler / Grandgenett / Kubel)** — the canonical NARRATIVE register at editorial-civic scale. Custom Cheltenham + Franklin Gothic revival + custom slab; bespoke type that rhymes with institutional history; load-bearing-wall narrow-caption-column layout.
- **The New Yorker** — the canonical magazine-glossary-at-homepage-top precedent; long-form essay register; literary voice at frontier scale.
- **The Paris Review (Pentagram-Willey)** — the canonical literary-quarterly register; recycled-paper-warmth substrate; Klim Heldane Text + Founders Grotesk; smaller trim size = intimacy.
- **The Baffler (Pentagram / Opara / Bowker)** — the canonical organized-creative-anarchy register; per-content-category typographic differentiation at long-form scale.
- **The Atlantic (Pentagram / Mendelsund / Munday)** — the canonical institutional-anchor register; "1857" + founders' mandate quietly + consistently; per-article visual variation within type-system coherence.
- **The Pudding (long-form NARRATIVE pieces)** — modern NARRATIVE register at designed-object scale; per-article-as-self-contained-visual-system; SND46 reference per CD3 §3.A.

These platforms prove the NARRATIVE universal concept holds at frontier scale; they DO NOT prescribe Prime's per-surface register.

## §3 — Prime's expression for V1 DISpatch

### §3.1 — `articleType` discriminator

`articleType: "NARRATIVE"` (enum literal per master plan §3.C Zod `discriminatedUnion` selector + §1.7 reframe 2.7 TOON requirement).

### §3.2 — Subject scope

Per master plan §1.5 strategic framing:

- Agent interactions / creations / launches in Prime linguistic taxonomy + metaphor
- Developer-diary entries (the literal dev-diary register)
- Philosophical posts (about building, about agents, about the platform, about the work)
- Register-statement posts (Prime articulates its position on a question)
- Mayor-direction posts
- Profile pieces (citizens / allies / Mayor / themes)
- Scene-set / observation / essay form

### §3.3 — Voice register

Literary / spacious / voice-driven.

The voice carries authorial confidence — the writer is in the room with the reader. First-person singular per representation/voice/fidelity.md (Stream-A canon synced from main); sentence case; restrained punctuation; warm-but-civic register; principal-grade prose at the level of NYT Magazine / The New Yorker / Paris Review at their best.

NARRATIVE register carries Prime cosmological metaphor — the Divine Comedy modern adaptation per master plan §1.1 + thesis-statement §3 cosmology metaphor + §3.4 DISpatch's name encoded the cosmology. Articles draw on this metaphor without being heavy-handed about it; the metaphor is in the writing's bones, not in the writing's surface.

Per representation/voice/fidelity.md: NARRATIVE register inherits Prime's first-person-singular discipline + sentence-case headlines + restrained punctuation + considered-warm-technical-but-humane voice. Vale.sh validates voice fidelity at write-time.

### §3.4 — Typography opener (provisional; refines at W3)

Per CD4 §5.2 + thesis-statement §2 Concept 1 + Concept 5:

- **Title weight.** Spacious scale (display weight). Currently inclined toward Vollkorn at display weight + spacious tracking; W3 component-implementation refines.
- **Body weight.** Long-form sanctuary weight. Currently inclined toward Crimson Pro at reading weight + long leading; W3 refines.
- **Italicized standfirst** — opening epigraph or scene-set lede; per CD4 §5.2 reader contract.
- **First-paragraph drop-cap optional** — when the article warrants it (cover-essay / register-statement); per The New Yorker / The Atlantic precedents.
- **Image-or-illustration below headline** (or absent) — image trails the headline; the lede leads. Article-as-sanctuary register preserved.
- **Metadata band absent** — author + date appears in restrained chrome below the standfirst; Meta-code typeface absent from NARRATIVE openers (component-locked containment per CD1 Concept 1).
- **Scale + leading + measure** — spacious scale + long leading + measured measure (NYT Magazine spaciousness per CD4 §5.3).

### §3.5 — Multimedia weight in `media[]`

Per master plan §3.C Portable Text mental model:

- **Heavy** on visual storytelling (`imageBlock` + `videoBlock`)
- **Heavy** on procgen cartography references (per CD3 cartography paradigm — Watabou / Azgaar / Mapbox Studio + MapLibre / D3.js contour / P5.js paper grain)
- **Heavy** on atmospheric imagery (paper-grain references, civic-architectural references, Editorial District renders)
- **Present** `audioBlock` for ambient / sonic-system integration (per `representation/multimedia/sonic-system.md` v0 audio-palette NARRATIVE register; W4+ activation)
- **Rare** `codeBlock` (META-leaning territory; appears at interplay sections per `interplay-pattern.md`)

### §3.6 — Distribution emphasis (per master plan §1.5 + §3.C 14-platform reshape-rules table)

**Editorial newsletters PRIMARY:**

- **Beehiiv** (block JSON, Send API; the canonical NARRATIVE distribution channel)
- **LinkedIn long-form** (700-char hook; voice-driven essay opener)
- **X long-form threads** (280-char hook + thread for long-form; per Mayor distribution preference if active)

**Secondary:**

- Dev platforms (Hashnode / Dev.to as cross-pollination; secondary depth — NARRATIVE may surface to dev audiences but is not authored for them as primary)
- Substack (if Mayor maintains parallel personal newsletter)
- Bluesky / Mastodon / Threads (per master plan §3.C 14-platform reshape rules)

### §3.7 — Pre-authored hook posture

Per `_template.md` §1.5 non-negotiables:

- **`socialHook` (≤280 chars; X / Bluesky)** — favors literary opening line. Currently inclined toward template: *"<one literary line that establishes voice>. <one line of context or observation>."*
- **`linkedinHook` (≤700 chars; LinkedIn)** — favors voice-driven essay opener. Currently inclined toward template: *"<scene-set paragraph>. <observation or claim paragraph>. <one-line invitation to read the full piece>."*
- **`newsletterExcerpt` (≤500 chars; Beehiiv)** — favors atmospheric scene-set. Currently inclined toward template: *"<atmospheric opening>. <implication or framing>. <one-line invitation>."*

### §3.8 — Cosmology coordinate (`cosmologyRef` + `wardRef` per `_template.md` §5)

NARRATIVE articles default to:

- **`cosmologyRef`** — typically Paradiso (the article surfaces charter / mission / institutional articulation), Purgatorio (the article surfaces operational climb / Terrace-axis observation), or Pillars (the article surfaces foundational commitment).
- **`wardRef`** — magazine-corner (DISpatch's neighborhood within Editorial District).

The discriminator uses `cosmologyRef` for spatial wayfinding; the cartographic substrate (CartographyCanvas + DistrictMap + MetroMapMarker) renders the coordinate visually.

## §4 — V1 article authoring discipline

Per master plan §1.7 reframe 2.1 production-launch quality bar + master plan §3.C non-negotiables:

- Frontmatter validates against `articleType: "NARRATIVE"` Zod schema branch (Astro Content Layer build-time validation)
- Tone + typography opener + multimedia weight + distribution emphasis honor NARRATIVE per §§3.3–3.7 above
- `media[]` validates against `_type`-discriminated union per §3.C
- `distribution.canonical` set to microsite URL; pre-authored hooks present per §3.7
- All `embedBlock` entries carry `fallbackText` + `fallbackUrl` per §3.C degradation tree
- Vale.sh validates voice fidelity per `representation/voice/fidelity.md` (Stream-A canon)
- DLDS disclosure per `representation/voice/lane-schema.md` (Stream-A canon)
- Cosmology coordinate populates `cosmologyRef` + `wardRef` per §3.8

## §5 — Forward pointers

- **W3** — NarrativeArticleOpener component spec.md (`representation/visual-system/components/NarrativeArticleOpener/spec.md`) authoring inherits from this pattern's typography opener + reader contract per CD4 §5.2.
- **W4** — Title + Body typeface specific selection ratifies via cascade-validated selection (Vollkorn + Crimson Pro V1 free-OFL lock per CD2 Decision 7; CD4 re-fire option preserved).
- **W5** — first NARRATIVE article authored against this pattern; first round-trip through master plan §3.C 14-platform reshape-rules table; first Vale.sh + DLDS gate clear.
- **Sonic integration** — when sonic-system v0 ratifies (this CD6 cycle; see `representation/multimedia/sonic-system.md` v0), NARRATIVE articles receive ambient `audioBlock` integration patterns per audio-palette NARRATIVE register; sonic-logo intro at article-opener candidate.

## §6 — Standing-history pointers

- Universal article skeleton: `_template.md` (W0 Stream-C SKELETON 2026-05-07)
- META sibling: `meta-pattern.md` (W1 CD6 this cycle)
- Interplay shape: `interplay-pattern.md` (W1 CD6 this cycle)
- Brand-bible thesis-statement: `representation/voice/thesis-statement.md` (W1 CD6 this cycle)
- CD1 thesis Concept 5 + Concept 7: `representation/visual-system/thesis.md`
- CD4 §5.2 NARRATIVE opener distinction: `representation/visual-system/components.md` §5.2
- CD4 #10 NarrativeArticleOpener inventory entry: `representation/visual-system/components.md` §3.1
- Master plan §1.5 distribution strategy + §3.C content schema architecture
- Voice canon: `representation/voice/fidelity.md` + `representation/voice/lane-schema.md` (Stream-A synced from canon/brand v0.2.0)

---

*NARRATIVE article pattern RATIFIED W1 Stream-A 2026-05-09. CC-Mayor-delegated synthesis per Mayor 2026-05-09 full-cycle delegation. Sibling files: `meta-pattern.md` + `interplay-pattern.md` + `_template.md`. First NARRATIVE article authoring at W5 per master plan §4 W5.*
