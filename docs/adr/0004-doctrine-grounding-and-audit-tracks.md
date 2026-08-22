# ADR-0004 — Doctrine grounding: house rules must have founding principles

- **Status:** **ACCEPTED** — by AK, 2026-08-21 (pre-Phase-B adjudication sitting, 2 of 3)
- **Date:** 2026-08-21
- **Deciders:** AK (final authority)
- **Governs:** every standing rule in `ak-haus/dispatch` — `DESIGN.md` and its emitter, `AGENTS.md`, `.claude/CLAUDE.md`, `representation/visual-system/` canon, the CI gates, and the ideation rail's prompt constraints
- **Verification behind this record:** the mandates were issued after a sitting in which four separate canon claims failed against first-hand sources — see §Context. The standards cited below were read from their publishers, not from summaries.

---

## Context

The 2026-08-21 adjudication sitting ruled eight open questions. Preparing them required reading the
installed packages and the standards themselves rather than the canon's descriptions of them, and
four canon claims did not survive that reading:

| Canon claim | What the source says |
|---|---|
| `<Image>` "cannot execute inside a React component," so the `media` seam may need replacing (CD7 §3.4 / OQ-7) | Astro documents named slots converting to top-level props for React — the seam is the framework's own first-party API |
| Provenance is read "via `@contentauth/c2pa`" (CD7 §3.4 / OQ-8) | The package does not exist on npm; its deprecated ancestor points at a successor shipping a 7.81 MB WASM |
| "Smallest legible text is 12px **(WCAG/industry)**" (DESIGN.md §Universal type rules 2) | WCAG specifies no minimum font size; neither does Section 508 |
| Article CLS is 0.345, a repair row (board B13) | Measured 0.0285 on HEAD across three runs — stale by an order of magnitude |

None was caught by any of the fifteen required contexts. The common shape is not carelessness in
any one row: **the records drifted from reality and nothing mechanical noticed.** Two of the four
were rules asserting authority they did not have.

## Decision

### M1 — a house rule without a founding principle is not standing law

Any rule in this repo that (a) cites no standard or recognised best practice as its founding
principle, and (b) requires cherry-picked examples to make it cohere, is **rejected as standing
law for Dispatch**. Such rules are arbitrary blockers with no function or utility.

This is not a licence to delete rules that are merely strict. The test is *grounding*, not
severity, and it has three possible outcomes per rule:

1. **Grounded** — cites a real standard or established professional practice → keep, with the
   citation made explicit.
2. **Mis-grounded** — the principle exists but the rule states it wrongly → **re-ground**, do not
   delete. (Worked example: §Universal type rules 2. WCAG has no minimum font size, but
   ISO 9241-303 and EN 301 549 both set legibility as a *visual angle*, which a px literal cannot
   express — so the rule was replaced with the scalability requirement rather than dropped.)
3. **Ungrounded** — no founding principle survives inspection → cull.

"Cites our own canon" is **not** grounding. A canon decision that itself rests on nothing external
inherits the same test.

### M2 — no design or asset criterion may pre-reject art on judgment

Any design or asset criterion that constrains what Dispatch can produce, and that has neither a
mechanical basis nor a footing in design/branding principles as taught at a university,
institution, or professional working environment, is **purged from the application** where it acts
to pre-reject art.

**Subjective taste is AK's alone to exercise.** The pipeline works from deterministic, verified
system architectures drawn from the creative industry: if we make animation, we use the process and
technicalities of established animation studios; if we make a magazine, we operate at the level of
high-end online magazines and their vertical specialisation in branding, design, art, advertising,
and creative tooling.

The resolution is **separation, not deletion** — and the separation is itself standard practice. A
**creative brief** carries the visual, storytelling, and artistic direction and belongs to the art
director; a **production specification** carries the countable, deliverable requirements. They are
complementary documents. Where a criterion is taste, it moves to the brief, where AK exercises it
per run. Where it is mechanical, it stays in the spec, where the pipeline enforces it.

## Consequences

### Three audit tracks, in this order

Cull first, or tracks 2 and 3 audit against rules that should not survive.

| | Track | The test it applies | Status |
|---|---|---|---|
| 1 | **Doctrine cull** (M1 + M2) | does each standing rule have a founding principle? | scheduled — not a Phase B row |
| 2 | **Design audit** | does the design meet the brand contract? | AK-decided, runs after this build |
| 3 | **Architecture audit** | lightweight ATAM + conformance: does the architecture serve its quality attributes, and does canon match reality? | scheduled — not a Phase B row |

**Why the architecture track is separate and not a Phase B row.** [ADR-0002](0002-golden-readiness-doctrine.md)
Decision 1 rules Phase B runs *exactly once for code*; an architecture audit inside it would compete
for the single pass. More fundamentally the instruments differ: the Golden Board closes *known
gaps*, and has no mechanism for asking whether the architecture is right. The professional method
for that question is **ATAM** (Architecture Tradeoff Analysis Method, SEI/Carnegie Mellon) —
scenario-driven evaluation against quality attributes producing risks, sensitivity points and
tradeoffs — and its documented **lightweight variant** is sized for short, low-resource runs.

One refinement carried into the track's charter: ATAM asks *does the architecture meet its quality
goals.* The four failures above were a different class — *does the documentation match reality.*
That is **architecture conformance**, and its durable remedy is the fitness-function instrument
adopted at [ADR-0003 register item 14](0003-vertical-design-stack-architecture.md): objective
automated checks that verify decisions are still being maintained. The track carries both halves;
the conformance half is the one with evidence behind it today.

### Immediate effects on landing

- `DESIGN.md` §Universal type rules 2 is replaced (M1 outcome 2, re-grounded).
- `DESIGN.md` §Universal type rules 1 is scoped to component-rendered chrome (ADR-0003 register 12).
- `design/ideation/house-register.md`'s `register` block splits into a production spec and a
  creative brief. Audited under M2: **grounded and retained** — ink line work with hatching and
  stipple (named illustration techniques), axonometric/isometric/plan (architectural drawing
  conventions), paper ground plus one or two accent pigments with no gradient or wash (spot-colour
  print production), and no lettering at all (empirically demonstrated — every drawn word in
  `dispatch-06`/`-07` is garbled — and canon-derived, since the `DIS` split exists only in code).
  **Taste, and therefore moved to the brief:** density ("rich and patient… rewards a second look"),
  temperature ("warm, quiet, restrained… civic-archive, not science fiction"), figure treatment
  ("small, silhouetted, incidental to the architecture"), and "the drawing knows it is a drawing."

### Accepted costs

The cull will remove rules that currently feel load-bearing, and some agent behaviour presently
held by an ungrounded rule will need a grounded replacement rather than a deletion — outcome 2 is
expected to be the common case, not outcome 3. Re-grounding is slower than culling and is the point.
A rule that survives with its citation attached is stronger than one that survived because nobody
checked it.

---

### Sources

ISO 9241-303:2011 *Ergonomics of human-system interaction — Requirements for electronic visual
displays* · EN 301 549 (ETSI/CEN/CENELEC harmonised accessibility standard) · W3C WCAG 2.2 ·
Section508.gov typography guidance · Kazman, Klein & Barbacci, *The Architecture Tradeoff Analysis
Method* (SEI, CMU) · Ford, Parsons & Kua, *Building Evolutionary Architectures* (fitness functions) ·
Astro framework-components documentation · creative-brief practice as documented across
art-direction professional guidance.
