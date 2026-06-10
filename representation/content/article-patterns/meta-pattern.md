---artifact: article-pattern-meta-canonical
authored: W1 Stream-A CD6 (PCP-165)
authored-date: 2026-05-09
status: active
co-owned-with: Stream-C (per master plan §3.A library destinations + §5.1 file ownership)
inherits-from: representation/content/article-patterns/_template.md (W0 Stream-C SKELETON 2026-05-07)
upstream-cascade:
  - master plan v1.0.9 §1.5 (distribution + META×NARRATIVE strategic framing)
  - representation/voice/thesis-statement.md (W1 CD6 RATIFIED 2026-05-09) §2 Concept 5 marriage-of-registers + §1 thesis substrate
  - representation/visual-system/thesis.md (W1 CD1 RATIFIED 2026-05-08) Concept 5
  - representation/visual-system/components.md (W1 CD4 RATIFIED 2026-05-08) §5.1 META opener distinction + §3.1 component #9 MetaArticleOpener
downstream-blocks:
  - W5 first article authored against this pattern (META article shipping; first round-trip through §3.C 14-platform reshape-rules table)
  - W3 component layer (MetaArticleOpener spec.md authoring inherits from this pattern)
gate-criterion: schema validation per §3.C Zod schema + Vale.sh voice fidelity validation per representation/voice/fidelity.md
title: META Article Pattern (canonical)
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# META Article Pattern (canonical)

The META article pattern's canonical declaration. Reads in concert with `_template.md` (universal article skeleton) + `narrative-pattern.md` (NARRATIVE pattern sibling) + `interplay-pattern.md` (interplay-as-shape canonical).

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + thesis-statement §0:

- **Concept-first.** Universal META concept cited first (data-forward editorial register; peer-behind-curtain disclosure; institutional/compressed/data-prioritized typographic compression).
- **Examples that prove the climb at world-class scale.** Cited as examples that prove the concept; non-binding for future Buildings.
- **Muted language preserved** for typeface candidates / scale-leading-measure pairings / per-platform reshape specifics until W3 + W4 + W5 ratify.

## §1 — Universal META concept

**The META article reads as peer-behind-the-curtain disclosure.** It compresses metadata up-front (date / author / read-time / lane / DLDS provenance band / cosmology coordinate); hands the reader the working substrate of the publication itself. The reader's contract is *density-prioritized*: they expect to see code, terminal output, infrastructure decisions, change-log entries, JSON/YAML markup, dispatch-style technical claims — the publication's lab notebook surfaced as the publication.

The META register is the marriage's tech-counterculture vector — Wired (early eras) + Hacker News + technical-trade-magazine forebears. Per CD1 thesis Concept 5: META content reads in Wired/Hacker register through the meta/code typeface (component-locked); never escapes into chrome or article body prose.

## §2 — Examples that prove the META concept at world-class scale

Per CD1 reference-archive §1 Concept 5 + master plan §1.5 strategic framing:

- **Wired Magazine (early eras; Quark / Plunkett / Black era)** — the canonical META register at print-magazine scale. Compressed display + monospace integration + tech-counterculture confidence; reads as the publication is an insider-channel for the technical class.
- **Hacker News (homepage)** — the canonical META reader-contract at digital scale. Compressed metadata bands + threaded structural conventions + density-prioritized scrolling.
- **Stripe Press technical articles** — modern META register at engineering-blog scale. Compressed type pairings + code blocks as primary visual + restrained chrome.
- **Quanta Magazine technical pieces** — META register meeting institutional gravity (Noe Display + Pangram Sans + Merriweather; CD2 type-system precedent).
- **The Pudding's "How We" pieces** — META register meeting designed-object scale (each article as self-contained creative-coding gallery; SND46 reference per CD3 §3.A).

These platforms prove the META universal concept holds at frontier scale; they DO NOT prescribe Prime's per-surface register. Future Prime Buildings choose per their purpose per master plan §1.3 5-narrow-certification gates.

## §3 — Prime's expression for V1 DISpatch

### §3.1 — `articleType` discriminator

`articleType: "META"` (enum literal per master plan §3.C Zod `discriminatedUnion` selector + §1.7 reframe 2.7 TOON requirement).

### §3.2 — Subject scope

Per master plan §1.5 strategic framing:

- Server updates / coding mishaps / DLDS visual / codebases / terminal-search peer-behind-curtain
- Dispatch-style technical entries
- Research returns
- Infrastructure-decision posts
- Change-log entries
- Post-mortem write-ups
- Migration write-ups
- Performance-investigation notes
- Tooling adoption / swap rationales

### §3.3 — Voice register

Institutional / compressed / data-forward.

The voice carries technical confidence without performance — "we shipped X; here is the diff; here is what surfaced; here is what we learned" rather than "we are excited to announce X." The reader is a peer in the technical conversation; the article hands them the work.

Per representation/voice/fidelity.md (Stream-A canon synced from main): META register inherits Prime's first-person-singular discipline + sentence-case headlines + restrained punctuation. Vale.sh validates voice fidelity at write-time.

### §3.4 — Typography opener (provisional; refines at W3)

Per CD4 §5.1 + thesis-statement §2 Concept 1 + Concept 5:

- **Title weight.** Tight scale (compressed display). Currently inclined toward Vollkorn at compressed weight + tight tracking; W3 component-implementation refines.
- **Subhead weight.** Body weight at compressed leading. Currently inclined toward Crimson Pro at compressed leading; W3 refines.
- **Metadata band.** Meta-code typeface prominent (component-locked). Carries date / author / read-time / lane / cosmology coordinate / DLDS provenance band. Currently inclined toward Berkeley Mono / IBM Plex Mono / JetBrains Mono / Fira Code / Iosevka / Operator Mono per CD1 reference-archive §2.1 candidate set; W3 + W4 ratify specific selection.
- **Image-or-data-visualization above headline** (image-led opener; per CD4 §5.1 reader contract).
- **Scale + leading + measure** — tight scale + compressed leading + narrow measure (Wired-aesthetic compression per CD4 §5.3).

### §3.5 — Multimedia weight in `media[]`

Per master plan §3.C Portable Text mental model:

- **Heavy** on `codeBlock` (the canonical META media element)
- **Heavy** on `imageBlock` of terminal capture / screenshots / diff snapshots
- **Heavy** on technical screenshots
- **Lighter** on atmospheric imagery (NARRATIVE-leaning territory)
- **Rare** `videoBlock` (used for screencast walkthroughs)
- **Rare** `audioBlock` (sonic-system integration deferred to interplay sections per `interplay-pattern.md`)

### §3.6 — Distribution emphasis (per master plan §1.5 + §3.C 14-platform reshape-rules table)

**Dev platforms PRIMARY:**

- **Hashnode** (GraphQL API; canonical_url discipline mandatory)
- **Dev.to** (REST v1; canonical_url discipline mandatory)
- **Hacker News** (n8n queues Linear task for Mayor manual submit; no API; submission timing per master plan §1.5)
- **daily.dev** (microsite RSS auto-ingest)
- **Technical newsletters** (per cascade + per-newsletter API integration)

**Secondary:**

- Editorial newsletter (Beehiiv; longer-form META → secondary depth)
- LinkedIn (700-char hook; institutional explanation register)

### §3.7 — Pre-authored hook posture

Per `_template.md` §1.5 non-negotiables:

- **`socialHook` (≤280 chars; X / Bluesky)** — favors compressed technical claim. Currently inclined toward template: *"<verb> the <thing> — <one-line outcome>. <one-line context>."* Example: *"Refactored the dispatch ledger — here's the diff. Why we stopped reconciling two taxonomies."*
- **`linkedinHook` (≤700 chars; LinkedIn)** — favors institutional explanation. Currently inclined toward template: *"<one-paragraph context that names the problem>. <one-paragraph what-we-did>. <one-line outcome>."* Reads as engineering explanation to an audience that wants the *why*.
- **`newsletterExcerpt` (≤500 chars; Beehiiv)** — favors data-forward summary. Currently inclined toward template: *"<one-line claim>. <one-line evidence>. <one-line implication>."*

### §3.8 — Cosmology coordinate (`cosmologyRef` + `wardRef` per `_template.md` §5)

META articles default to:

- **`cosmologyRef`** — typically Inferno (the article surfaces infrastructure activity / forge work) or Purgatorio (operational climb / methodology). Specific 9-circle / 7-Terrace mapping populates as cosmology layers formalize per per-Terrace-formalization arc.
- **`wardRef`** — magazine-corner (DISpatch's neighborhood within Editorial District per CD3 §4 + thesis-statement §3.3).

The discriminator uses `cosmologyRef` for spatial wayfinding (which cosmology layer the article surfaces from); the cartographic substrate (CartographyCanvas + DistrictMap + MetroMapMarker) renders the coordinate visually.

## §4 — V1 article authoring discipline

Per master plan §1.7 reframe 2.1 production-launch quality bar + master plan §3.C non-negotiables:

- Frontmatter validates against `articleType: "META"` Zod schema branch (Astro Content Layer build-time validation)
- Tone + typography opener + multimedia weight + distribution emphasis honor META per §§3.3–3.7 above
- `media[]` validates against `_type`-discriminated union per §3.C
- `distribution.canonical` set to microsite URL; pre-authored hooks present per §3.7
- All `embedBlock` entries carry `fallbackText` + `fallbackUrl` per §3.C degradation tree
- Vale.sh validates voice fidelity per `representation/voice/fidelity.md` (Stream-A canon)
- DLDS disclosure per `representation/voice/lane-schema.md` (Stream-A canon)
- Cosmology coordinate populates `cosmologyRef` + `wardRef` per §3.8

## §5 — Forward pointers

- **W3** — MetaArticleOpener component spec.md (`representation/visual-system/components/MetaArticleOpener/spec.md`) authoring inherits from this pattern's typography opener + reader contract per CD4 §5.1.
- **W4** — Meta-code typeface specific selection (Berkeley Mono / IBM Plex Mono / JetBrains Mono / Fira Code / Iosevka / Operator Mono per CD1 reference-archive §2.1) ratifies at W4 cascade-validated selection.
- **W5** — first META article authored against this pattern; first round-trip through master plan §3.C 14-platform reshape-rules table; first Vale.sh + DLDS gate clear.
- **Sonic integration** — when sonic-system v0 ratifies (this CD6 cycle; see `representation/multimedia/sonic-system.md` v0), META articles receive ambient `audioBlock` integration patterns per audio-palette META register.

## §6 — Standing-history pointers

- Universal article skeleton: `_template.md` (W0 Stream-C SKELETON 2026-05-07)
- NARRATIVE sibling: `narrative-pattern.md` (W1 CD6 this cycle)
- Interplay shape: `interplay-pattern.md` (W1 CD6 this cycle)
- Brand-bible thesis-statement: `representation/voice/thesis-statement.md` (W1 CD6 this cycle)
- CD1 thesis Concept 5 (marriage-of-registers): `representation/visual-system/thesis.md` §2 Concept 5
- CD4 §5.1 META opener distinction: `representation/visual-system/components.md` §5.1
- CD4 #9 MetaArticleOpener inventory entry: `representation/visual-system/components.md` §3.1
- Master plan §1.5 distribution strategy + §3.C content schema architecture
- Voice canon: `representation/voice/fidelity.md` + `representation/voice/lane-schema.md` (Stream-A synced from canon/brand v0.2.0)

---

*META article pattern RATIFIED W1 Stream-A 2026-05-09. CC-Mayor-delegated synthesis per Mayor 2026-05-09 full-cycle delegation. Sibling files: `narrative-pattern.md` + `interplay-pattern.md` + `_template.md`. First META article authoring at W5 per master plan §4 W5.*
