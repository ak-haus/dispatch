---artifact: article-pattern-interplay-canonical
authored: W1 Stream-A CD6 (PCP-165)
authored-date: 2026-05-09
status: active
co-owned-with: Stream-C (per master plan §3.A library destinations + §5.1 file ownership)
inherits-from: representation/content/article-patterns/_template.md (W0 Stream-C SKELETON 2026-05-07) §4 interplay declaration
upstream-cascade:
  - representation/content/article-patterns/_template.md §4 interplay-as-shape declaration (W0 Stream-C SKELETON)
  - representation/content/article-patterns/meta-pattern.md (W1 CD6 sibling)
  - representation/content/article-patterns/narrative-pattern.md (W1 CD6 sibling)
  - representation/voice/thesis-statement.md (W1 CD6) §2 Concept 5 marriage-of-registers
downstream-blocks:
  - W5 first interplay article authored (META article with NARRATIVE interplay sections OR NARRATIVE article with META interplay sections)
gate-criterion: schema validation per §3.C Zod schema (interplay does NOT add a third discriminator value); Vale.sh voice fidelity per representation/voice/fidelity.md; per-section register fidelity adjudicated at editor read-through
title: Interplay Pattern (canonical)
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Interplay Pattern (canonical)

The interplay pattern's canonical declaration. Reads in concert with `_template.md` (universal article skeleton) + `meta-pattern.md` + `narrative-pattern.md` (sibling pattern files).

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + thesis-statement §0:

- **Concept-first.** Universal interplay concept cited first (interleaving of META + NARRATIVE registers within a single article; primary type carries center-of-gravity; secondary type appears at structural pivot points).
- **Interplay is a SHAPE, not a third type.** Per `_template.md` §4: the `articleType` discriminator is binary (`"META"` | `"NARRATIVE"`); interplay is expressed within a single article, not as a third discriminator value. This is a structural lock per master plan §3.C.
- **Muted language preserved** for specific interplay sequencing patterns / pivot-point conventions until W5 first article authoring surfaces evidence.

## §1 — Universal interplay concept

**The interplay pattern is the WRITTEN expression of the marriage-of-registers** that thesis-statement §2 Concept 5 names structurally. The marriage works at typography-system tier (5-typeface containment governance — META through Meta-code typeface; NARRATIVE through Title + Body). The interplay is what the marriage looks like *inside one article* when the writer needs both registers.

A META article on a refactor opens institutional / compressed (the diff is the substrate) → reframes the refactor as an agent-civic event in Prime cosmology (one NARRATIVE-shaped section: "*The dispatch ledger had been reconciling two taxonomies. We let Linear carry it. The agents stopped triangulating; the ledger started naming what was true.*") → resumes META for the technical close (post-refactor ledger schema; what changed; what shipped).

A NARRATIVE article on Prime's first month of platform-substrate work opens literary / spacious (the scene-set is the substrate) → drops a META-shaped section that surfaces the technical evidence ("*Here is the Linear board. Here is the cumulative commit graph. Here is what the agents did this week.*") → returns to NARRATIVE register for the philosophical close.

The reader's contract is governed by the **primary type** (the `articleType` discriminator); the secondary register interleaves as **structural pivot points** that strengthen, not dilute, the primary register.

## §2 — Examples that prove the interplay concept at world-class scale

- **The Atlantic feature essays** — NARRATIVE-primary articles that interleave META-shaped data sections (charts / data callouts / institutional citations) at pivot points; the article-as-essay register holds; the data is invited in, not imposed.
- **NYT Magazine cover essays + interactive longreads** — NARRATIVE-primary with META interplay; the bespoke type-system carries both registers without one drowning the other.
- **The Pudding "How We" pieces** — META-primary (the technical work IS the article) with NARRATIVE interplay at scene-set / framing / philosophical-close sections; per-article-as-self-contained-visual-system.
- **Stripe Press long-form engineering articles** — META-primary with NARRATIVE interplay at why-this-matters / what-we-learned sections; institutional-engineering register at frontier scale.
- **The Baffler "Salvos" + "Outbursts" sections** — multi-register articles where META-shaped polemics interleave with NARRATIVE-shaped literary commentary; per-content-category typography signals the shifts.

These platforms prove the interplay concept holds at frontier scale; they DO NOT prescribe Prime's per-surface interplay conventions.

## §3 — Prime's expression for V1 DISpatch

### §3.1 — `articleType` is binary (per master plan §3.C structural lock)

`articleType: "META"` OR `articleType: "NARRATIVE"`. The interplay is expressed *within* the chosen type, not as a third value. Schema-tier discipline enforced by Astro Content Layer Zod `discriminatedUnion` validation.

### §3.2 — Center of gravity (the primary type)

The primary type's contract holds across the article:

- **Tone honors primary type** — the article's surface still reads as primary type (a META article with NARRATIVE interplay still reads as a META article; the NARRATIVE sections feel like *the META article's voice momentarily expanding*).
- **Typography opener honors primary type** — META openers carry compressed metadata band + Meta-code prominent; NARRATIVE openers carry italicized standfirst + Title prominent. The opener does not signal interplay; the body does.
- **Distribution emphasis honors primary type** — META-primary articles with NARRATIVE interplay still cross-post dev-platforms-primary; NARRATIVE-primary articles with META interplay still cross-post editorial-newsletters-primary. The interplay is content-tier, not distribution-tier.

### §3.3 — Section sequencing (the SHAPE within `body`)

The body's section sequencing is where interplay lives. Three sequencing patterns currently inclined (subject to refinement at W5 first-article authoring evidence):

#### Pattern A — META-primary with NARRATIVE pivot

```
Section 1: META lede (compressed; metadata-up-front; data-forward claim)
Section 2: META technical context (the diff; the schema; the infrastructure)
Section 3: NARRATIVE pivot (one section reframing the technical work as agent-civic event)
Section 4: META technical close (post-work state; what shipped)
```

The NARRATIVE pivot is the article's *zoom-out moment* — the reader steps back from the diff to register the meaning. Currently inclined toward placing the pivot at the article's center-of-gravity (~50–60% through the article); refines per first-article evidence.

#### Pattern B — NARRATIVE-primary with META pivot

```
Section 1: NARRATIVE lede (literary; scene-set; voice-driven claim)
Section 2: NARRATIVE essay development (observation; framing; the case)
Section 3: META pivot (one section surfacing the technical evidence — Linear board / commit graph / data)
Section 4: NARRATIVE philosophical close (the implication; the framing-forward)
```

The META pivot is the article's *zoom-in moment* — the reader zooms from voice-driven essay to specific technical surface. Currently inclined toward placing the pivot at ~60–70% through the article (after the essay-case is established); refines per first-article evidence.

#### Pattern C — Multi-pivot interplay (advanced; defers to W5+ first-article evidence)

Multiple interplay pivots within one article — META→NARRATIVE→META→NARRATIVE→META, or vice-versa. Higher authoring complexity; risk of register-thrashing if not handled with discipline. Currently inclined toward NOT defaulting to multi-pivot at V1 (per master plan §1.7 reframe 2.3 don't-discard discipline; preserved as future-arc pattern; first article surfaces whether the discipline is needed).

### §3.4 — Multimedia weight ratio within `media[]`

The primary type's block kinds dominate the array; the secondary type's block kinds appear at interplay sections only.

**Pattern A (META-primary with NARRATIVE pivot).** `codeBlock` + technical `imageBlock` lead the array (META primary); 1–2 atmospheric `imageBlock` or cartography `imageBlock` appear keyed to the NARRATIVE pivot section; `audioBlock` rare unless sonic-system integration is part of the pivot.

**Pattern B (NARRATIVE-primary with META pivot).** Atmospheric `imageBlock` + cartography `imageBlock` lead the array (NARRATIVE primary); 1–2 `codeBlock` or technical `imageBlock` appear keyed to the META pivot section; `audioBlock` for ambient atmospheric register if sonic-system audio-palette NARRATIVE register active.

### §3.5 — Typography rendering at interplay sections

The interplay sections carry their own typographic micro-treatment within the primary type's macro-treatment:

- **NARRATIVE pivot inside META article** — Title weight may shift from compressed (META opener) to spacious (NARRATIVE pivot section heading); Body weight relaxes to long-form sanctuary leading; Meta-code typeface absent from the pivot section's prose (returns at pivot's close).
- **META pivot inside NARRATIVE article** — Meta-code typeface enters the pivot section's metadata band; Title weight may compress; data-forward `codeBlock` + technical `imageBlock` lead the pivot section's media weight.

The 5-typeface containment governance still holds — Meta-code stays component-locked (it appears only inside named components like CodeBlock + DldsPanel); the typographic micro-treatment is implemented via per-section Title + Body weight + leading + measure shifts within DISpatch-locked containment.

### §3.6 — Cosmology coordinate at interplay

Interplay sections may carry per-section `cosmologyRef` micro-shifts within the article-tier `cosmologyRef`:

- **META article with `cosmologyRef: "inferno"` + NARRATIVE pivot** — pivot section may carry per-section coordinate `cosmologyRef: "purgatorio"` (the work surfaced from infrastructure into the operational climb) or `cosmologyRef: "paradiso"` (the work surfaces a charter implication).
- **NARRATIVE article with `cosmologyRef: "paradiso"` + META pivot** — pivot section may carry per-section coordinate `cosmologyRef: "inferno"` (the technical-evidence surfacing infrastructure activity).

Per-section `cosmologyRef` is forward-arc per master plan §3.C TOON requirement (currently inclined toward article-tier cosmologyRef only at V1; per-section coordinates defer to W5+ first-article evidence).

## §4 — Authoring discipline at interplay

Per master plan §1.7 reframe 2.1 production-launch quality bar + thesis-statement §2 Concept 5 marriage-of-registers:

- **Pre-decide the primary type before drafting.** Choose META or NARRATIVE based on subject scope per `meta-pattern.md` §3.2 + `narrative-pattern.md` §3.2; the discriminator drives every downstream choice.
- **Draft the interplay sections with structural discipline.** A pivot is a section, not a paragraph; pivots earn their place by reframing or surfacing material that the primary register cannot hold without dilution. If the pivot can be expressed within primary register without weakening it, the article does not need interplay.
- **Read-through editor pass for register fidelity.** After draft, read the article through twice — once for primary register fidelity (does the article still read as its primary type?); once for pivot register fidelity (does the pivot strengthen or dilute the primary register?). Mayor-gated read-through at V1 per per-Building brand-certification gate; future automation deferred to brand `stewardship/enforcement/` Reviewer at scale.
- **Vale.sh voice fidelity per representation/voice/fidelity.md** — both primary and pivot register clear voice fidelity; first-person-singular discipline + sentence case + restrained punctuation hold across registers.

## §5 — Forward pointers

- **W3** — Per-component motion specs that respond to interplay (e.g., DldsPanel as META interplay surface inside NARRATIVE article); refines at W3 component-implementation per CD5 motion register.
- **W5** — first interplay article authored against this pattern; first article surfaces whether Pattern A vs Pattern B vs multi-pivot Pattern C is right for first interplay attempt; first article evidence refines this pattern.
- **Editor read-through pattern** — Mayor-gated at V1 per per-Building brand-certification gate; brand `stewardship/enforcement/` (Reviewer) takes over at scale post-V1.

## §6 — Standing-history pointers

- Universal article skeleton: `_template.md` §4 interplay-as-shape declaration (W0 Stream-C SKELETON 2026-05-07)
- META sibling: `meta-pattern.md` (W1 CD6 this cycle)
- NARRATIVE sibling: `narrative-pattern.md` (W1 CD6 this cycle)
- Brand-bible thesis-statement: `representation/voice/thesis-statement.md` §2 Concept 5 marriage-of-registers
- Master plan §3.C content schema architecture (binary `articleType` discriminator structural lock)
- Voice canon: `representation/voice/fidelity.md` + `representation/voice/lane-schema.md` (Stream-A synced from canon/brand v0.2.0)

---

*Interplay pattern RATIFIED W1 Stream-A 2026-05-09. CC-Mayor-delegated synthesis per Mayor 2026-05-09 full-cycle delegation. Sibling files: `meta-pattern.md` + `narrative-pattern.md` + `_template.md`. First interplay article authoring at W5+ per master plan §4 W5.*
