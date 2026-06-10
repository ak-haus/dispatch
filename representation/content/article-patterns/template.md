---artifact: article-pattern-skeleton
authored: W0 Stream-C (PCP-150)
authored-date: 2026-05-07
status: active
co-owned-with: Stream-A (per master plan §3.A library destinations + §5.1 file ownership)
upstream-cascade: master plan v1.0.7 §1.4 (multimedia foundational) + §1.5 (distribution + META×NARRATIVE strategic framing) + §1.7 reframe 2.7 (TOON adoption) + §3.A (Stream-A creative direction) + §3.C (Stream-C content schema architecture)
downstream-builds-into:
  - representation/content/article-patterns/meta-pattern.md (W1 CD6)
  - representation/content/article-patterns/narrative-pattern.md (W1 CD6)
  - representation/content/article-patterns/interplay-pattern.md (W1 CD6)
ratified-at: W1 CD4 (typography opener divergence) + W1 CD6 (register synthesis + canonical catalog) + W5 (first article authored against schema)
title: Article Pattern Template — META × NARRATIVE Skeleton
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Article Pattern Template — META × NARRATIVE Skeleton

The structural shape every Prime dev-diary article inherits — universal article skeleton declared once, plus the cells where META and NARRATIVE pattern types diverge. The template is the **structural contract**; W1 CD6 produces the canonical pattern catalog (sibling files) on top of this skeleton.

Strategic framing per master plan §1.5: the dev-diary is *"a page in the newspaper of record for Prime"* — interplay of **META** (server updates, coding mishaps, DLDS visual, codebases, terminal-search peer-behind-curtain) and **NARRATIVE** (agent interactions, creations, launches in Prime linguistic taxonomy + metaphor). Both pattern types ship from the same substrate; both validate against the same Astro Content Layer + Zod schema per §3.C; both reuse the same distribution apparatus per §1.5.

---

## §1 — Universal article skeleton (shared between META + NARRATIVE)

The shape both pattern types inherit. Every article ships against this skeleton.

### 1.1 Frontmatter — required fields

Per master plan §3.C content schema architecture (Astro Content Layer + Zod). Required fields:

| Field | Type | Purpose |
|---|---|---|
| `title` | string | Article title |
| `description` | string | Short editorial blurb (used for OG / cards / search) |
| `publishDate` | date | Initial publish date |
| `updatedDate` | date (optional) | Most-recent-edit date |
| `coverImage` | Astro `image()` validator per §3.C | Hero image; validated at build-time |
| `author` | string | Authorship attribution |
| `tags[]` | string array | Cross-cutting taxonomy tags |
| `draft` | boolean | Build-time exclusion flag |
| **`articleType`** | enum literal `"META"` \| `"NARRATIVE"` | **DISCRIMINATOR** — the Zod `discriminatedUnion("articleType", [metaArticle, narrativeArticle])` selector per §3.C; encoded as enum literal per §1.7 reframe 2.7 TOON requirement |

The `articleType` discriminator is the single load-bearing field — every downstream divergence (tone, typography opener, multimedia weight, distribution emphasis) keys off it.

### 1.2 Body structure — declared sections

Body is markdown / MDX prose. Three structural sections every article carries:

- `lead` — opening 1–2 paragraphs; carries the article's editorial pose (newspaper "lede")
- `sections` — multiple per article; markdown / MDX prose; subheadings as section markers
- `closing` — final paragraph(s); structurally consistent across both pattern types

**Discipline:** body is prose; multimedia lives in `media[]` parallel field (NOT embedded inline) per §3.C + §1.7 reframe 2.7 TOON requirement. Body markdown remains the human-readable surface; `media[]` is the agent-readable parallel surface.

### 1.3 Multimedia — `media[]` discriminated union (Portable Text mental model)

Per master plan §3.C: `media[]` is a `_type`-discriminated block array following the **Portable Text mental model**. Universal concept: *block content as an array of typed JSON objects where every block carries `_type` as discriminator*. Examples that prove the concept at world-class scale: Sanity (canonical reference, 2008+); NPR's COPE pattern (Create Once Publish Everywhere; 2008 origin); Astro 5+ Content Layer with discriminated union support (September 2024).

Block kinds (full Zod schema reference in §3.C — DO NOT re-author here):

- `imageBlock` — `{src, alt, caption, credit, width, height}`
- `videoBlock` — `{muxPlaybackId, poster, caption, durationSeconds}`
- `gifBlock` — `{src, alt, caption}`
- `audioBlock` — `{src, transcript, durationSeconds, waveformData}`
- `embedBlock` — `{platform, embedId, fallbackText, fallbackUrl}` (fallbackText / fallbackUrl REQUIRED per §3.C degradation tree)
- `codeBlock` — `{code, language, filename, highlightLines}`
- `richTextBlock` — `{markdown}`

`media[]` is a parallel field at the article root; an article references blocks by index from its body (e.g., `[See media #2]`) rather than embedding them inline. This is what makes the schema queryable, filterable, and serializable independent of prose body.

### 1.4 Distribution metadata

Per master plan §3.C `distribution` object:

| Field | Type | Purpose |
|---|---|---|
| `canonical` | `z.string().url()` | ALWAYS the microsite URL — non-negotiable per §1.5 SEO discipline |
| `crossPostTargets[]` | `z.array(z.enum([...]))` | 14-platform enum per §3.C reshape rules table |
| `socialHook` | `z.string().max(280).optional()` | Pre-authored for X / Bluesky |
| `linkedinHook` | `z.string().max(700).optional()` | Pre-authored for LinkedIn |
| `newsletterExcerpt` | `z.string().max(500).optional()` | Pre-authored for Beehiiv (PRIMARY newsletter per §1.5) |
| `devtoTags[]` | string array | Dev.to-specific tags |
| `hashnodeTags[]` | string array | Hashnode-specific tags |

### 1.5 Non-negotiables (apply universally to both pattern types)

Per master plan §3.C discipline patterns + §1.5 distribution:

- **`canonical_url` discipline on every secondary platform publish.** Every cross-post MUST set the platform's canonical field (`originalArticleURL` on Hashnode; `canonical_url` on Dev.to; `canonicalUrl` on Medium) referencing the microsite URL. Most commonly missed cross-post rule per §1.5.
- **Pre-authored hooks > AI reshape.** `socialHook` / `linkedinHook` / `newsletterExcerpt` authored at write-time per §1.5 + §3.C; AI reshape (Blaze.ai or LLM via n8n cross-post adapter flow) is FALLBACK only when pre-authored hook is absent.
- **`fallbackText` + `fallbackUrl` mandatory on every `embedBlock`.** Graceful degradation for platforms that cannot render embeds (email / Mastodon / plain-text) per §3.C degradation tree.
- **Per-block degradation tree applies.** Video → native player → linked thumbnail → text-link → fallbackText only. Embed → iFrame → link → fallbackText. Code → fenced → monospace → omit. Build the degradation tree once at schema design time; cheaper than discovering missing fallbacks at runtime.
- **`media[]` parallel at the article root, NOT embedded in Markdown prose.** Per §3.C TOON compatibility + §1.7 reframe 2.7.

### 1.6 Frontmatter example (annotated)

Concrete shape both pattern types author against. The single field that flips between types is `articleType`; the divergence cells in §2 / §3 follow.

```yaml
---
title: "Day 12 — Refactoring the Dispatch Ledger"
description: "Why we ripped out the rigid status taxonomy and let Linear carry it."
publishDate: 2026-05-15
updatedDate: 2026-05-16
coverImage: ./day-12-cover.png
author: ak.almoumen
tags: [dispatch-ledger, governance, linear]
draft: false

# Discriminator — flips to "NARRATIVE" for narrative pattern
articleType: META

# Parallel media[] field per §3.C (NOT embedded in body prose)
media:
  - _type: codeBlock
    code: |
      const status = z.enum(["Backlog", "Active", "In Review", "Done", "Canceled"]);
    language: typescript
    filename: dispatch-ledger.schema.ts
  - _type: imageBlock
    src: ./day-12-terminal.png
    alt: "Terminal output showing unified status structure"
    caption: "Pre- and post-refactor DISPATCH_LEDGER status taxonomy."

# Distribution per §3.C
distribution:
  canonical: https://prime.city/dev-diary/day-12-refactoring-dispatch-ledger
  crossPostTargets: [hashnode, devto, hackernews, daily-dev, beehiiv, linkedin, x]
  socialHook: "Day 12 — ripped out the dispatch ledger status enum and let Linear carry it. Why we stopped reconciling two taxonomies."
  linkedinHook: "<≤700-char pre-authored long-form hook>"
  newsletterExcerpt: "<≤500-char pre-authored newsletter excerpt>"
  devtoTags: [governance, refactoring, linear]
  hashnodeTags: [governance, ai-engineering]
---
```

---

## §2 — META pattern divergence

Where META articles diverge from the universal skeleton. Subject scope + tone + typography opener + multimedia weight + distribution emphasis flip; the schema shape stays constant.

| Cell | META expression |
|---|---|
| **`articleType` discriminator** | `"META"` (enum literal per §3.C + §1.7 reframe 2.7 TOON) |
| **Subject scope** | Server updates / coding mishaps / DLDS visual / codebases / terminal-search peer-behind-curtain (per master plan §1.5 strategic framing) |
| **Tone** *(currently inclined toward; subject to refinement at W1 CD4–CD6 per §1.7 reframe 2.7 muted-language discipline)* | Institutional / compressed / data-forward |
| **Typography opener** *(provisional; W1 CD4 ratifies)* | Currently inclined toward institutional sans + condensed display weight per §3.A Universal Concept #5 (typography as multi-voice organizational system); typeface selected from the §3.A 9-typeface reference stack at CD4 (currently inclined toward Franklin Gothic-class American institutional sans for META display) |
| **Multimedia weight in `media[]`** | Heavy on `codeBlock` + diff snapshots (`imageBlock` of terminal capture, screenshots) + technical screenshots; lighter on atmospheric imagery; `videoBlock` rare (used for screencast walkthroughs); `audioBlock` rare |
| **Distribution emphasis** | **Dev platforms PRIMARY** per §1.5 — Hashnode (GraphQL) + Dev.to (REST v1) + Hacker News (n8n queues Linear task for Mayor manual submit; no API) + daily.dev (microsite RSS auto-ingest); technical newsletters; **secondary** on editorial newsletter (Beehiiv) + LinkedIn |
| **Voice register** | Institutional / data-forward register per §1.5 META framing; per §3.A Universal Concept #5 typography signals the register before the reader reads a word |
| **Pre-authored hook posture** | `socialHook` favors compressed technical claim ("Refactored the dispatch ledger — here's the diff"); `linkedinHook` favors institutional explanation; `newsletterExcerpt` favors data-forward summary |

---

## §3 — NARRATIVE pattern divergence

Where NARRATIVE articles diverge from the universal skeleton. Same schema shape; flipped expression cells.

| Cell | NARRATIVE expression |
|---|---|
| **`articleType` discriminator** | `"NARRATIVE"` (enum literal per §3.C + §1.7 reframe 2.7 TOON) |
| **Subject scope** | Agent interactions / creations / launches in Prime linguistic taxonomy + metaphor (per master plan §1.5 strategic framing) |
| **Tone** *(currently inclined toward; subject to refinement at W1 CD4–CD6 per §1.7 reframe 2.7 muted-language discipline)* | Literary / spacious / voice-driven |
| **Typography opener** *(provisional; W1 CD4 ratifies)* | Currently inclined toward editorial serif + display weight per §3.A Universal Concept #5; typeface selected from the §3.A 9-typeface reference stack at CD4 (currently inclined toward Domaine Display- or Mercury-class high-contrast serif for NARRATIVE display) |
| **Multimedia weight in `media[]`** | Heavy on visual storytelling (`imageBlock` + `videoBlock`) + procgen cartography references (per §3.A CD3 cartography paradigm — Watabou / Azgaar / Mapbox Studio + MapLibre / D3.js contour / P5.js paper grain) + atmospheric imagery; `audioBlock` for ambient / sonic-system integration once sonic-system v0 ratifies at W1 CD6; `codeBlock` rare |
| **Distribution emphasis** | **Editorial newsletters PRIMARY** per §1.5 — Beehiiv (block JSON, Send API) + LinkedIn long-form (700-char hook) + X long-form threads (280-char hook + thread for long-form); **secondary** on dev platforms (Hashnode / Dev.to as cross-pollination) |
| **Voice register** | Literary / voice-driven register per §1.5 NARRATIVE framing; carries Prime cosmological metaphor (currently inclined toward the Divine Comedy modern adaptation per master plan §1.1; W1 CD1 ratifies) |
| **Pre-authored hook posture** | `socialHook` favors literary opening line; `linkedinHook` favors voice-driven essay opener; `newsletterExcerpt` favors atmospheric scene-set |

---

## §4 — Interplay pattern (a SHAPE, not a third type)

The interplay between META and NARRATIVE is a **SHAPE within a single article**, NOT a third value of the `articleType` discriminator. Per master plan §3.C the discriminator is binary (`"META"` | `"NARRATIVE"`); the interplay is expressed via:

- **Section sequencing within `body`** — the primary type's sections lead and close the article; the secondary type's sections interleave at structural pivot points (e.g., a META article on a refactor opens institutional / compressed, then a single NARRATIVE-shaped section reframes the refactor as an agent-civic event in Prime cosmology, then META resumes for the technical close)
- **Multimedia weight ratio within `media[]`** — the primary type's block kinds dominate the array (META → `codeBlock` + technical `imageBlock` lead; NARRATIVE → atmospheric `imageBlock` + cartography `imageBlock` lead); the secondary type's block kinds appear at interplay sections only

The discriminator selects the article's **center of gravity**:

- **Tone honors primary type** (the article's surface still reads as primary type)
- **Typography opener honors primary type** per §3.A Universal Concept #5
- **Distribution emphasis honors primary type** (a META article with NARRATIVE interplay sections still cross-posts dev-platforms-primary)
- **Material from secondary type is pulled into specific sections** within the body, not through frontmatter or schema

W1 CD6 (Brand Synthesis Pass) refines this declaration into the canonical `interplay-pattern.md`; currently inclined toward this declared shape, subject to refinement at W1 CD6.

---

## §5 — TOON compatibility (per §1.7 reframe 2.7)

Per master plan §1.7 reframe 2.7: TOON adoption for stable agent-read artifacts (tokens, indices, manifests) — 30–60% LLM token savings. Articles are the canonical agent-read content surface; the schema shape encodes TOON requirements at the field level so AI agents read article structure without parsing Markdown.

Encoded requirements:

- **`media[]` is a parallel field at the article root, NOT embedded in Markdown prose body.** Agent reads the block array independent of prose.
- **`articleType` is an enum literal** (`"META"` | `"NARRATIVE"`), not free-text. Discriminator is machine-stable.
- **`distribution` carries pre-computed platform hooks as first-class fields** (`socialHook` / `linkedinHook` / `newsletterExcerpt` / `devtoTags` / `hashnodeTags`). Agent does not reshape from prose body — the hook IS the field.
- **City-district metadata at schema level, NOT embedded in heading prose.** Per §3.C TOON requirement: fields like `cosmologyRef` (which canto / district / ward the article belongs to per master plan §1.1 Divine-Comedy-modern-adaptation cosmology under exploration) and `wardRef` (NYC-borough / Houston-ward neighborhood per the American-grid mapping) live as Zod fields, not as `## Canto IV — Inferno` heading prose. Agent reads the article's cosmology coordinate as a structured field.
- **Body markdown remains the human-readable surface.** `media[]` + `distribution` + `articleType` + `cosmologyRef` + `wardRef` form the agent-read parallel surface.

Structural discipline: **every field an agent might index, query, or reshape lives at schema level, not in prose.**

---

## §6 — Cross-reference to Stream-A co-ownership

Per master plan §3.A library destinations + §5.1 file ownership: `representation/content/article-patterns/` is **co-owned by Stream-A and Stream-C**.

Boundary across the streams:

- **This `_template.md` is the structural skeleton** owned across Stream-A (visual identity for typographic openers + register expression + cosmology coordinate fields) and Stream-C (content schema, multimedia integration, distribution metadata, editorial cadence)
- **W1 CD4 (Component Visual Workshop)** refines the typography opener divergence per master plan §3.A Universal Concept #5 (META = institutional / compressed / data-forward; NARRATIVE = literary / spacious / voice-driven). CD4 selects the META and NARRATIVE typefaces from the §3.A 9-typeface reference stack (Domaine / Editorial New / Noe Display / Founders Grotesk / Franklin Gothic / Franziska / Heldane Text / Mercury / Cheltenham); not all are adopted.
- **W1 CD6 (Brand Synthesis Pass)** finalizes the META×NARRATIVE article-pattern catalog. Sibling files at canonical paths:
  - `representation/content/article-patterns/meta-pattern.md` — META pattern canonical declaration (typography + register expression + reference articles)
  - `representation/content/article-patterns/narrative-pattern.md` — NARRATIVE pattern canonical declaration
  - `representation/content/article-patterns/interplay-pattern.md` — interplay-shape canonical declaration
- **W5 (microsite build)** is where the first article authored against this skeleton ships. First authoring fills the schema with concrete content; produces the first round-trip through the §3.C 14-platform reshape-rules table (Hashnode / Dev.to / Beehiiv / LinkedIn / X / Bluesky / Mastodon / Threads / Instagram / TikTok / Hacker News / daily.dev / Medium / canonical microsite).

**Cross-surface signal handoff** (per master plan §8.7 State Layer discipline): if drafting future articles against this skeleton surfaces voice / typography / register / sonic / cosmology questions for Stream-A, append a DISCOVERY entry to `v1-dev-diary-microsite/cc-ledger/cross-surface-signals.md` (append-only).

---

## §7 — Per-article done discipline (every article ships against this skeleton)

Per master plan §1.7 reframe 2.1 production-launch quality bar:

- Frontmatter validates against the §3.C Zod schema (Astro Content Layer build-time validation)
- `articleType` discriminator selected; tone + typography opener + multimedia weight + distribution emphasis honor the selected type per §§2–3 of this template
- `media[]` validates against the `_type`-discriminated union per §3.C
- `distribution.canonical` set to microsite URL; pre-authored hooks present where audience targeting warrants
- All `embedBlock` entries carry `fallbackText` + `fallbackUrl` per §3.C degradation tree
- Vale.sh validates voice fidelity per `representation/voice/fidelity.md` (Stream-A canon, synced from canon/brand at W1)
- DLDS disclosure per `representation/voice/lane-schema.md` (Stream-A canon)

---

## §8 — Notes & forward-arc deferrals

- **W1 CD4 ratifies typography opener.** Currently inclined toward META = institutional sans + condensed display weight / NARRATIVE = editorial serif + display weight per §3.A Universal Concept #5; subject to refinement at W1 CD4.
- **W1 CD6 ratifies the canonical catalog.** This `_template.md` is the structural skeleton; sibling files (`meta-pattern.md` / `narrative-pattern.md` / `interplay-pattern.md`) are W1 CD6 deliverables.
- **W5 is first article authoring.** First article fills the schema with concrete content; produces the first round-trip through the §3.C 14-platform reshape-rules table.
- **Sonic-system integration deferred.** Sonic-system v0 ships at W1 CD6 per §3.A. Forward-arc consideration: ambient `audioBlock` integrating sonic-logo per article opener; deferred until sonic-system v0 ratifies and `audio-palette.md` declares the article-opener sonic pattern.
- **Cosmology coordinate fields (`cosmologyRef`, `wardRef`) are provisional.** The Divine-Comedy-modern-adaptation cosmology mapped through American-grid neighborhoods (NYC boroughs / Houston wards) is currently inclined toward per master plan §1.1; W1 CD1 ratifies. Field shape declared at schema level per §5 TOON requirement; field VALUES (which cantos / which wards) populate as the cosmology ratifies.
- **Multimodal parsing pipeline (W4–W5 ingest path).** Per §3.C: Unstructured.io / LlamaParse / AWS Textract / Donut / LayoutLMv3 candidates for ingesting external rich content (PDFs / docs / scans) into Prime's `_type`-discriminated structure. Tool selection per W4 cascade.

---

*Skeleton pre-staged 2026-05-07 by W0 Stream-C (PCP-150). Canonical META×NARRATIVE article-pattern catalog ratifies at W1 CD6 per master plan §4 W1.*
