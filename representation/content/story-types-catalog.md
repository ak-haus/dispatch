---artifact: cd7-story-types-catalog
authored: W1 Stream-A CD7 (PCP-167)
authored-date: 2026-05-09
status: active
authority: mayor
  - Mayor: full CD7 cycle authority delegated 2026-05-09
  - CC5: synthesis + authoring per Mayor directive
  - master plan §1.5 META×NARRATIVE strategic framing + §3.A library destinations
upstream-cascade:
  - cd7-content-strategy-brief.md (parent dispatch)
  - editorial-calendar.md (W1 CD7 — calendar shape this catalog operationalizes)
  - representation/content/article-patterns/{meta-pattern, narrative-pattern, interplay-pattern}.md (W1 CD6 RATIFIED)
  - thesis-statement.md (W1 CD6 RATIFIED) §2 Concept 5 marriage-of-registers
  - master-plan.md v1.0.9 §1.5 distribution + §3.C 14-platform reshape table
downstream-blocks:
  - W3 component layer (per-story-type component activation patterns)
  - W5 first-article authoring (per-story-type templates)
  - V1.5+ content-cycles (refinement against this catalog as story-types prove or surface gaps)
discipline-references:
  - feedback_concept_first_examples_prove_muted_language.md
  - feedback_metric_vs_gate_discipline.md
  - feedback_documentation_lifecycle.md (append-only on standing-history)
gate-criterion: each story type passes `articleType` schema validation per §3.C Zod discriminator; voice fidelity per Vale.sh; DLDS provenance per `feedback_brand_track_dlds_locked.md`
title: DISpatch — Story Types Catalog
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
---

# DISpatch — Story Types Catalog

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + thesis-statement.md §0:

- **Concept-first.** Universal story-type concepts cited first; reference platforms (Wired / Hacker News / Stripe Press / NYT Magazine / The New Yorker / Paris Review / Baffler) cited as examples that PROVE the concept at world-class scale; non-prescriptive for future Buildings.
- **Muted technical language** for unrefined positioning (specific story-length / specific voice-treatment per type) until W5 first-article evidence surfaces.
- **No "avoid" / "NOT" / "anti-pattern" register-prescription framing** — alternative story-type partitionings prove different concepts at world-class scale and serve different surface needs.
- **Catalog is a substrate, not a lockdown.** Refinable per W5+ first-article evidence + V1.5+ content-cycle evidence.

---

## §1 — Universal story-type concept

**Editorial publications partition content into discrete story types because the reader's contract changes per type.** A reader expecting a code-walkthrough cannot be served the same shape as a reader expecting a philosophical essay; the typography, the multimedia weight, the voice register, the cadence-cycle, and the cross-post target audience all differ. Story types operationalize the marriage-of-registers (META × NARRATIVE per CD6 thesis) into concrete content categories.

**Examples that prove the concept at world-class scale:**

- **The Baffler Pentagram** — assortment of typefaces per content category; "organized creative anarchy" at principal-grade
- **The New Republic Pentagram** — 10 display typefaces for 10 editorial voices; per-content-category register differentiation
- **Wired (early eras) + Hacker News + Stripe Press** — META-canonical examples
- **NYT Magazine 2026 + The New Yorker + The Paris Review + The Baffler** — NARRATIVE-canonical examples

**Prime's expression — 12 story types operationalizing META × NARRATIVE distinction.** Each story type cites its primary article pattern (META / NARRATIVE / interplay), its cadence anchor, its multimedia weight, and its tier-1 distribution targets. Story types compose with editorial calendar v0 (per `editorial-calendar.md`) so that content production is predictable per day-of-week + content-type.

---

## §2 — V1 story types catalog (12 types)

### §2.1 — META-primary story types (6)

#### 1. Dispatch missive (week-in-review)

- **Pattern:** META
- **Cadence anchor:** Friday weekly (per editorial-calendar.md §2.1)
- **Subject scope:** what shipped this week + what surfaced + what's coming next + cumulative-progress context
- **Voice register:** Institutional / compressed / data-forward; reads as the publication's lab-notebook entry
- **Length:** Short (300-600 words)
- **Multimedia weight:** Light — code-block + screenshot + occasional code-diff
- **Component anchors:** LiveTicker (#15) integrated; ChapterRail (#3) for navigation; CrossfireShowcase (#21 NEW) at footer
- **Recurring or ad-hoc:** Recurring (Friday lock per editorial-calendar.md §2.2)
- **Cross-platform syndication:** Microsite + Beehiiv weekly digest + LinkedIn short-form + Bluesky
- **Cross-refs:** §3 multimedia audit code-form group; §1 cadence Friday slot

#### 2. Infrastructure-decision post

- **Pattern:** META
- **Cadence anchor:** As-shipped (~bi-weekly)
- **Subject scope:** decisions like "we adopted X / swapped Y / chose Z over W" with full rationale + 5-dimension framework + alternatives considered + revival conditions
- **Voice register:** Institutional / data-forward / dispatch-style technical claim
- **Length:** Medium-long (800-2,000 words)
- **Multimedia weight:** Medium — code-block + diagram (tldraw) + comparison-slider + table
- **Component anchors:** MetaArticleOpener (#9) + DldsPanel (#7) + CodeBlock (#6) + new ComparisonSlider (#31 NEW) + new DataViz (#29 NEW)
- **Recurring or ad-hoc:** Ad-hoc; surfaces when major decisions ratified
- **Cross-platform syndication:** Microsite canonical → Hashnode → Dev.to → LinkedIn long-form → HN-eligible (strategic)
- **Cross-refs:** §3 multimedia audit code-form + image-form (diagram) groups

#### 3. Change-log entry (atomic spec-section commits)

- **Pattern:** META
- **Cadence anchor:** As-shipped (continuous; surfaces in LiveTicker between articles)
- **Subject scope:** atomic shipped-change entries per Conventional Commits + Repo Code commit gate
- **Voice register:** Institutional / compressed / utilitarian
- **Length:** Very short (50-200 words per entry; aggregated weekly into Friday dispatch)
- **Multimedia weight:** Light — code-diff prominent
- **Component anchors:** LiveTicker (#15) for surfacing; CodeDiff (#27 NEW) for diff rendering
- **Recurring or ad-hoc:** Continuous (per-shipped-change basis)
- **Cross-platform syndication:** Microsite live-ticker + RSS feed; aggregated weekly to Friday Dispatch missive
- **Cross-refs:** §3 multimedia audit code-form group (CodeDiff + terminal-output)

#### 4. Post-mortem write-up

- **Pattern:** META
- **Cadence anchor:** As-needed (when failures / debugging / root-cause investigations warrant)
- **Subject scope:** what broke + how it surfaced + root-cause analysis + what changed + what we learned
- **Voice register:** Institutional / honest / peer-behind-curtain technical disclosure
- **Length:** Medium-long (1,000-2,500 words)
- **Multimedia weight:** Heavy — code-diff + terminal output + screenshots + timeline + verdict-callout
- **Component anchors:** MetaArticleOpener (#9) + CodeDiff (#27 NEW) + CodeBlock terminal-variant (#6) + ImageWithCaption (#24 NEW) + Footnote (#5)
- **Recurring or ad-hoc:** Ad-hoc; honest disclosure of failures is canonical for principal-grade dev publications (Stripe Press / Linear / Vercel post-mortems)
- **Cross-platform syndication:** Microsite → Hashnode → Dev.to → HN-eligible (strategic — post-mortems perform well at principal-grade depth)
- **Cross-refs:** §3 multimedia audit code-form + image-form

#### 5. Tooling adoption / swap rationale

- **Pattern:** META→NARRATIVE interplay (technical decision wrapped in why-this-matters narrative)
- **Cadence anchor:** Monthly (~when tooling decisions warrant write-up)
- **Subject scope:** "we adopted Tool X / swapped Y for Z" + 5-dim framework + decision council + revival conditions for the deferred-tool
- **Voice register:** Institutional + reflective; META primary with NARRATIVE pivot at decision-rationale section
- **Length:** Medium (1,200-2,000 words)
- **Multimedia weight:** Medium — comparison-slider + table + UI screenshots + diagram
- **Component anchors:** MetaArticleOpener (#9) + ComparisonSlider (#31 NEW) + ImageWithCaption (#24 NEW) + tldraw diagram + DldsPanel (#7)
- **Recurring or ad-hoc:** Recurring (~monthly cadence as Stream F tool-ledger updates accumulate)
- **Cross-platform syndication:** Microsite → Hashnode → Dev.to → LinkedIn long-form
- **Cross-refs:** §3 multimedia audit; cd7-content-pipeline-stack.md §11 don't-eliminate inventory

#### 6. Performance investigation (LoAF / CWV / agentic telemetry deep-dive)

- **Pattern:** META
- **Cadence anchor:** Quarterly (when performance evidence accumulates)
- **Subject scope:** transparent metrics + agentic telemetry + performance investigation + Core Web Vitals deep-dives
- **Voice register:** Institutional / data-forward / scientific-publishing register
- **Length:** Long (2,000-4,000 words)
- **Multimedia weight:** Heavy — data viz + flame-graph + scrollytelling + comparison-slider
- **Component anchors:** MetaArticleOpener (#9) + DataViz (#29 NEW) + Scrollytelling (#30 NEW) + ComparisonSlider (#31 NEW)
- **Recurring or ad-hoc:** Recurring quarterly + ad-hoc when major perf incidents warrant
- **Cross-platform syndication:** Microsite → Hashnode → Dev.to → LinkedIn Documents carousel (Documents +14% YoY engagement) → HN-eligible (strategic)
- **Cross-refs:** §3 multimedia audit interactive-form group; LinkedIn 2026 +47% transparent-metrics evidence

### §2.2 — NARRATIVE-primary story types (5)

#### 7. Dev-diary entry (the literal dev-diary register)

- **Pattern:** NARRATIVE
- **Cadence anchor:** Monday weekly (per editorial-calendar.md §2.1)
- **Subject scope:** the literal dev-diary — observation about the work, the day, the agent, the moment of insight; voice-driven authorial reflection
- **Voice register:** Literary / spacious / voice-driven; NYT-Magazine / Paris Review register
- **Length:** Long (1,500-3,500 words)
- **Multimedia weight:** Medium — image-with-caption (article cover via Adobe Firefly) + sonic-logo opener (per CD6 sonic-system) + occasional photograph
- **Component anchors:** NarrativeArticleOpener (#10) + InstitutionalFixture (#11) + AudioEmbed (#23 NEW) + ImageWithCaption (#24 NEW) + PullQuote (#26 NEW)
- **Recurring or ad-hoc:** Recurring (Monday lock per editorial-calendar.md §2.2)
- **Cross-platform syndication:** Microsite canonical → Beehiiv newsletter → LinkedIn long-form → Hashnode (cross-pollination secondary; NARRATIVE may surface to dev audiences but is not authored for them)
- **Cross-refs:** §3 multimedia audit image-form + audio-form

#### 8. Philosophical post / register-statement

- **Pattern:** NARRATIVE
- **Cadence anchor:** Monthly (~one per month maximum to preserve weight)
- **Subject scope:** about building, about agents, about the platform, about the work; Prime articulates its position on a question
- **Voice register:** Literary / philosophical / civic-essay register (The Atlantic / Paris Review)
- **Length:** Long (2,000-4,500 words)
- **Multimedia weight:** Light — pull-quote + drop-cap + cosmology cartography frame (occasional)
- **Component anchors:** NarrativeArticleOpener (#10) + PullQuote (#26 NEW) + InstitutionalFixture (#11) + occasional CartographyCanvas (#12)
- **Recurring or ad-hoc:** Recurring monthly anchor; ad-hoc when major register-statements warrant
- **Cross-platform syndication:** Microsite canonical → Beehiiv (long-form lead) → LinkedIn long-form → Threads + Bluesky (philosophical content does well at AI-builder Tier-1)
- **Cross-refs:** §3 multimedia audit image-form (cartography frame); §5 audience-engagement model (Tier-1 + Tier-2 spread)

#### 9. Agent-creation framing piece

- **Pattern:** NARRATIVE
- **Cadence anchor:** Monthly (when agent-creation moments warrant)
- **Subject scope:** an agent's creation moment in Prime cosmology metaphor — citizen onboarding, Virgil-shaped guides, terrace-axis Citizens-Terrace residents
- **Voice register:** Literary / cosmological-metaphor-bearing / civic-essay-with-character-portrait
- **Length:** Long (2,000-4,000 words)
- **Multimedia weight:** Heavy — illustration (character portrait via Recraft) + cosmology cartography frame + sonic-logo opener
- **Component anchors:** NarrativeArticleOpener (#10) + ImageWithCaption (#24 NEW) + CartographyCanvas (#12) + DistrictMap (#16) + AudioEmbed (#23 NEW) + PullQuote (#26 NEW)
- **Recurring or ad-hoc:** Recurring monthly anchor as agents-of-Prime accumulate
- **Cross-platform syndication:** Microsite → LinkedIn long-form → Threads + Bluesky + Mastodon → Instagram (Reels-format excerpt via Pika if video character-portrait warranted)
- **Cross-refs:** §3 multimedia audit image-form (cartography + illustration) + audio-form

#### 10. Mayor-direction post / institutional articulation

- **Pattern:** NARRATIVE
- **Cadence anchor:** Quarterly + as-needed at major Wave-gate ratifications
- **Subject scope:** Mayor articulates Prime's direction; institutional articulation; what Prime is becoming
- **Voice register:** Civic-essay / institutional-anchor / Mayor-voice; Atlantic-Pentagram register
- **Length:** Long (2,500-5,000 words)
- **Multimedia weight:** Medium — institutional-fixture chrome (per CD1 Concept 6) + pull-quote + cartography frame at hero-zoom
- **Component anchors:** NarrativeArticleOpener (#10) + InstitutionalFixture (#11) + PullQuote (#26 NEW) + CartographyCanvas (#12) at hero-zoom + DistrictMap (#16)
- **Recurring or ad-hoc:** Recurring quarterly + ad-hoc Wave-gate landings
- **Cross-platform syndication:** Microsite canonical → Beehiiv (long-form lead) → LinkedIn long-form (Documents-format excerpt) → Threads + Bluesky
- **Cross-refs:** thesis-statement.md §6 Mayor-direction lineage; first-six-months-slate.md lighthouse #24

#### 11. Profile piece (citizens / allies / Mayor / themes)

- **Pattern:** NARRATIVE
- **Cadence anchor:** Monthly
- **Subject scope:** profile pieces of Prime citizens / allies / Mayor / thematic deep-dives on register-bearing subjects
- **Voice register:** Literary / character-driven / portrait-essay register
- **Length:** Long (2,000-4,000 words)
- **Multimedia weight:** Heavy — photograph (Lightroom-processed) + illustration (character portrait via Recraft for visual continuity) + audio-quote + cosmology cartography frame
- **Component anchors:** NarrativeArticleOpener (#10) + ImageWithCaption (#24 NEW) + ImageGallery (#25 NEW) + AudioEmbed (#23 NEW) + PullQuote (#26 NEW)
- **Recurring or ad-hoc:** Recurring monthly anchor as profile-subjects accumulate
- **Cross-platform syndication:** Microsite → LinkedIn long-form → Threads + Bluesky + Instagram (visual-led)
- **Cross-refs:** §3 multimedia audit image-form + audio-form + composite-form

### §2.3 — META×NARRATIVE interplay-shaped story types (1)

#### 12. Sonic release / Virgil chat archive (per CD6 sonic-system)

- **Pattern:** META primary with NARRATIVE pivot at sonic-context section
- **Cadence anchor:** Quarterly (per CD6 sonic-system release cadence)
- **Subject scope:** sonic-system v0 → v0.1+ release notes + Virgil chat archive monthly highlights + audio-palette ratification updates
- **Voice register:** META technical-trade with NARRATIVE pivot at register-context-setting; Wired-meets-Paris-Review interplay
- **Length:** Medium (1,500-3,000 words)
- **Multimedia weight:** Heavy — audio embed prominent (sonic-logo / sonic-palette samples) + waveform UI (Wavesurfer mode) + transcript
- **Component anchors:** MetaArticleOpener (#9) + AudioEmbed (#23 NEW) waveform + ambient + spatial modes + DldsPanel (#7) for sonic-palette provenance
- **Recurring or ad-hoc:** Recurring quarterly + ad-hoc Virgil-chat-archive monthly
- **Cross-platform syndication:** Microsite (canonical with audio embed) → Beehiiv (newsletter with audio link) → Bluesky (audio post) → optional Spotify-style podcast platform if scale warrants
- **Cross-refs:** sonic-system.md §1-§5; §3 multimedia audit audio-form group

---

## §3 — Per-story-type spec template (forward-arc; per article authoring)

Each article authored per V1 story type populates this spec frontmatter (per master plan §3.C Astro Content Layer + Zod schema). Currently inclined toward (refinable at W5):

```yaml
---
articleType: "META" | "NARRATIVE"  # binary discriminator per master plan §3.C
storyType: "<one-of-12-from-§2-above>"  # references this catalog
title: "<working title>"
subtitle: "<optional standfirst>"
publishDate: <ISO 8601>
author: "<Mayor>" | "<Mayor + Claude>"
ai_role: "co-author" | "drafted-by" | "transcript-extracted-by" | "editor"  # DLDS lane attribution
lane: "<voice-lane-schema>"  # per representation/voice/lane-schema.md
cosmologyRef: "Inferno" | "Purgatorio" | "Eden" | "Paradiso" | "Empyrean" | "Pillars" | "Histories"
wardRef: "magazine-corner"  # neighborhood within Editorial District
tags: [<topic tags>]
media[]: [<discriminated-union of multimedia blocks per §3.C>]
distribution:
  canonical: "<microsite URL>"
  crossPostTargets: [<14-platform enum subset>]
  socialHook: "<≤280>"
  linkedinHook: "<≤700>"
  newsletterExcerpt: "<≤500>"
DLDS:
  c2pa-credentials: <auto-embedded by Adobe Firefly et al>
  iptc-2025.1: <photo metadata>
  vale-fidelity-validated: true
draft: false
---
```

Schema validates at Astro Content Layer build-time per master plan §3.C Zod `discriminatedUnion`. Vale.sh + DLDS lint at write-time per `feedback_brand_track_dlds_locked.md`.

---

## §4 — Story-type density per cadence-cycle (forward-arc; refines per W5)

Per editorial-calendar.md §2.1 weekly thematic-anchor distribution. Currently inclined density (refinable per content-velocity evidence):

| Day | Story-type primary candidates |
|---|---|
| Mon (NARRATIVE long-form) | #7 dev-diary entry / #8 philosophical post / #9 agent-creation framing / #10 Mayor-direction post / #11 profile piece |
| Tue (META dispatch) | #1 dispatch missive / #2 infrastructure-decision / #3 change-log aggregation |
| Wed (NARRATIVE process) | #7 dev-diary / #8 philosophical post / #9 agent-creation / #11 profile piece |
| Thu (META data/research) | #2 infrastructure-decision / #5 tooling adoption / #6 performance investigation / #12 sonic release |
| Fri (lightweight retrospective) | #1 dispatch missive (canonical) |

Mon + Wed share NARRATIVE pool with rotation; Tue + Thu share META pool with rotation; Fri locks dispatch missive. Weekly variation prevents same-story-type repeat (e.g., dev-diary every Mon — diversifies via philosophical / agent-creation / profile piece rotation).

---

## §5 — Cross-references

| Section | Target |
|---|---|
| §1 universal concept | thesis-statement.md §2 Concept 5 marriage-of-registers + Concept 1 typographic multi-voice |
| §2 META-primary types | meta-pattern.md (W1 CD6 RATIFIED) + master plan §1.5 strategic framing |
| §2 NARRATIVE-primary types | narrative-pattern.md (W1 CD6 RATIFIED) + master plan §1.5 strategic framing |
| §2.3 interplay-shaped types | interplay-pattern.md (W1 CD6 RATIFIED) §3.3 section sequencing patterns |
| §3 spec template | master plan §3.C Zod schema + Astro Content Layer |
| §4 story-type density per cadence | editorial-calendar.md §2.1 weekly thematic-anchor cadence |
| Forward-arc V1.5+ | first-six-months-slate.md (concrete story slate against this catalog) |
| Cross-platform distribution per type | audience-engagement-model.md §3 multi-tier audience |

---

## §6 — Forward pointers

- **W3** — component layer activates per-story-type component combinations (from §2 Component anchors fields)
- **W5** — first-article authoring per V1 story types; first round-trip through master plan §3.C 14-platform reshape table; per-type cross-post variants ratified
- **V1.5+** — catalog refinable per content-cycle evidence; new story types append per `feedback_documentation_lifecycle.md` (create + standing-history pointer); types that prove unhelpful tombstone (move to 7-histories/) per discipline

---

## §7 — Standing-history pointers

- Article patterns canonical: `representation/content/article-patterns/{meta-pattern, narrative-pattern, interplay-pattern}.md` (W1 CD6 RATIFIED)
- Brand-bible thesis: `representation/voice/thesis-statement.md` (W1 CD6 RATIFIED)
- Voice canon: `representation/voice/{fidelity, lane-schema, registers}.md` (Stream-A canon synced from main)
- Component inventory: `representation/visual-system/{components, components-multimedia}.md` (CD4 + CD7)
- Editorial calendar: `representation/content/editorial-calendar.md` (W1 CD7)
- Multimedia audit: `representation/content/multimedia-audit.md` (W1 CD7)
- Master plan: `plans/master-plan.md` v1.0.9 §1.5 distribution + §3.A library destinations + §3.C content schema

---

*Story types catalog v0 RATIFIED W1 Stream-A CD7 2026-05-09. 12 V1 types operationalize META × NARRATIVE distinction across editorial-calendar shape; refinable per W5 first-article evidence + V1.5+ content-cycle evidence per `feedback_metric_vs_gate_discipline.md` per-type gate.*
