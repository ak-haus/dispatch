---artifact: stream-5-notion-content-calendar-template
authored: W1 Stream-5 (Master of DISpatch Output)
authored-date: 2026-05-11
status: active
authority: mayor
  - Mayor: Stream-5 cycle authority delegated 2026-05-11; Notion-as-pointer-dashboard pattern per `feedback_notion_pointer_summary_pattern.md`
  - Stream 5: synthesis + authoring per Mayor directive
  - brand-terrace skill operator role (per `brand.md §1` + Section 4 stack-rubric)
  - Linear-status-taxonomy-canon memory (`feedback_linear_taxonomy_canon.md`)
upstream-cascade:
  - pipeline-runbook.md §2.1 Phase 1 pre-flight + §9 drift indicators inventory
  - multimedia-recipes.md §2 per-story-type cover recipes
  - editorial-calendar.md (W1 CD7 RATIFIED) — Stratechery-shaped hybrid cadence + sustainability discipline
  - story-types-catalog.md (W1 CD7 RATIFIED) — 12 V1 story types
  - first-six-months-slate.md (W1 CD7 RATIFIED) — lighthouse-arc + weekly-cadence story pool
  - audience-engagement-model.md (W1 CD7 RATIFIED) — multi-tier audience + crossfire mechanism
  - master plan §8.4 Notion dispatch-board pattern (RES-008 Linear restructure inheritance)
downstream-blocks:
  - W5 first-article authoring (Mayor uses Notion content calendar as daily Phase-1 pre-flight surface)
  - Stream 4 automation requirements (per-platform variant generation status tracked in Notion)
  - V1.5+ refinement (engagement signals fed back into Notion per-article telemetry field)
discipline-references:
  - feedback_notion_pointer_summary_pattern.md (Notion = pointer + summary + metadata; canonical .md files hold truth)
  - feedback_linear_taxonomy_canon.md (Backlog / Active / In Review / Done / Parked / Cancelled canonical)
  - feedback_dispatch_card_prepend_updates.md (prepend updates newest-first on dispatch cards)
  - feedback_metric_vs_gate_discipline.md (gates not targets; engagement-rate as visibility signal NOT optimization target)
  - feedback_subscription_flat_cost_model.md (Notion in-scope-excluded per budget ledger §8.1 E2)
gate-criterion: Notion content calendar operational at V1 launch + per-day pre-flight completable in 5 min + drift indicator fields populate per article + per-platform variant status visible
title: DISpatch — Notion Content Calendar Template
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
---

# DISpatch — Notion Content Calendar Template

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + Mayor 2026-05-11 Stream-5 directive:

- **Concept-first.** Notion content calendar as universal editorial-workflow concept; reference platforms (Notion's own content database templates / Airtable editorial calendars / Trello content boards) cited as PROOF examples; non-prescriptive for future Buildings.
- **Pointer + summary + metadata** per `feedback_notion_pointer_summary_pattern.md` — Notion entries point to canonical `src/content/articles/<yyyy-mm-dd>-<slug>.mdx` + summary + status + telemetry metadata. Notion is NOT the source of truth; canonical .mdx file is.
- **Muted technical language** for unrefined positioning (specific Notion view configurations / specific automation triggers) until W5 first-article evidence surfaces.
- **No "avoid" / "NOT" framing** — alternative content-calendar surfaces (Airtable / Linear / dedicated CMS) prove different concepts at world-class scale.
- **Template is a substrate, not a lockdown.** Refinable per W5+ first-article evidence; per-field amendments append to V1.5+ schema evolution.

**Reading order:** §1 universal concept → §2 database schema (the load-bearing structure) → §3 per-day entry template → §4 views configuration → §5 status taxonomy mapping → §6 lighthouse + weekly-cadence scheduling pattern → §7 drift-indicator field integration → §8 cross-references.

---

## §1 — Universal concept

**A principal-grade editorial content calendar is the pre-flight surface, not the source of truth.** Source of truth lives in the canonical article file (`src/content/articles/<yyyy-mm-dd>-<slug>.mdx`); Notion holds the per-day pre-flight context + telemetry aggregation + scheduling visibility. The calendar surfaces (a) what's next, (b) what's in-flight, (c) what shipped, (d) what's drifting.

The Notion-as-pointer-dashboard discipline prevents the common failure mode where editorial calendars BECOME the source of truth, lose sync with shipped content, and require manual reconciliation. Per `feedback_notion_pointer_summary_pattern.md` — Notion entries point to canonical paths; canonical files hold truth; both surfaces append cleanly without merge conflicts.

**Examples that prove the concept at world-class scale:**

- **Stratechery (Ben Thompson)** — solo-author content calendar held in personal Notion; pointer to published article on stratechery.com; 12+ years sustained
- **Bytes by ByteByteGo** — solo-author content calendar with day-of-week thematic anchors + cross-post status fields
- **Notion's own marketing team** — uses Notion content database as pre-flight + telemetry surface; CMS or microsite holds canonical published content

**Prime's expression — Notion content calendar pointing to canonical `src/content/articles/*.mdx` + per-day pre-flight checklist + per-article telemetry aggregation + lighthouse + weekly-cadence scheduling.** The calendar is Mayor's daily 5-min Phase-1 entry surface; it surfaces today's context, this week's cadence, next month's pipeline.

---

## §2 — Database schema (load-bearing)

The DISpatch Content Calendar is a Notion database. Each row = one article (or planned article). Properties below are required at V1 launch; V1.5+ may append fields per content-cycle evidence.

### §2.1 — Required properties (V1 launch)

| Property name | Type | Required at | Source / Notes |
|---|---|---|---|
| **Title** | Title | Drafted (Backlog) | Working title; final title sets at Phase 3 authoring complete |
| **Slug** | Text | Backlog | URL-safe slug; canonical microsite URL = `/articles/{slug}` |
| **Publish date** | Date | Backlog | Planned publish date; refined during scheduling |
| **Story type** | Select | Backlog | One of 12 types from story-types-catalog.md §2 (Dispatch missive / Infrastructure-decision / Change-log / Post-mortem / Tooling adoption / Performance investigation / Dev-diary entry / Philosophical post / Agent-creation framing / Mayor-direction post / Profile-piece / Register-statement) |
| **Article pattern** | Select | Backlog | META / NARRATIVE / INTERPLAY per article-patterns/ (W1 CD6) |
| **Day-of-week anchor** | Select | Backlog | Mon NARRATIVE / Tue META / Wed NARRATIVE / Thu META / Fri retrospective / Sat dark / Sun dark — per editorial-calendar.md §2.1 |
| **AI-multiplier mode** | Select | Backlog | Mayor-first / Claude-first / Transcript-first / Summary-first per pipeline-runbook.md §3 |
| **Multimedia weight** | Select | Backlog | Light / Medium / Heavy per story-types-catalog.md §3 |
| **Lighthouse status** | Select | Backlog | None / Lighthouse-pick-candidate / Lighthouse-pick-Mayor-adjudicated / Weekly-cadence per first-six-months-slate.md §2 |
| **Status** | Select | Backlog | Backlog / Active / In Review / Done / Parked / Cancelled per `feedback_linear_taxonomy_canon.md` |
| **Canonical article path** | Text (URL) | Active+ | Path to `src/content/articles/<yyyy-mm-dd>-<slug>.mdx`; populated when Phase 3 authoring begins |
| **Canonical microsite URL** | URL | Done | https://prime.city/articles/{slug} (or staging URL during Active); populated at publish |
| **Crossfire variants status** | Multi-select | In Review+ | Microsite ✓ / Beehiiv ✓ / LinkedIn ✓ / Hashnode ✓ / Dev.to ✓ / Bluesky ✓ / Mastodon ✓ / Threads ✓ / Instagram ✓ / HN strategic ✓ / Reddit strategic ✓ / X manual ✓ — per audience-engagement-model.md §3 |
| **Audience tier** | Multi-select | Backlog | Tier-1 dev/AI-builder primary / Tier-2 broader creative/founder/citizen / Tier-3 strategic-selective per audience-engagement-model.md §2 |
| **Quality gates passed** | Multi-select | In Review+ | G1 Vale.sh ✓ / G2 Reviewer ✓ / G3 Apple-cohesion ✓ / G4 DLDS provenance ✓ per pipeline-runbook.md §5 |
| **Time-budget actual** | Number (minutes) | Done | Mayor records actual Phase-1-through-Phase-6 time; feeds drift indicator §9 #1 |
| **Time-budget target** | Number (minutes) | Backlog | Per story-type budget from pipeline-runbook.md §8.1 |
| **Drift signals fired** | Multi-select | Done | Drift indicator IDs fired this article per pipeline-runbook.md §9; populated at G2 Reviewer review |
| **Engagement signals** | Rich text | Done+ | Plausible page-views / Beehiiv opens / LinkedIn impressions / cross-post engagement aggregated weekly per audience-engagement-model.md §6 — VISIBILITY signal NOT optimization target per `feedback_metric_vs_gate_discipline.md` |
| **Lighthouse-pick adjudication** | Checkbox + Date | If Lighthouse-pick | Mayor-adjudicated lighthouse pick per first-six-months-slate.md §5 Gate 1 |

### §2.2 — Optional V1.5+ properties (deferred)

| Property name | Type | Trigger to add |
|---|---|---|
| Engagement-cycle refinement note | Rich text | V1.5 first refinement cycle |
| Tombstoned-revival flag | Checkbox | When a tombstoned story type revives per `feedback_documentation_lifecycle.md` |
| Cross-article references | Relation (to other articles in DB) | When article-references-article patterns emerge in editorial practice |
| Author shadow notes | Rich text | When agent-authored articles emerge in Era 2 |
| Voice-fidelity score | Number | V1.5+ if Auditor sample frequency justifies tracking |

---

## §3 — Per-day entry template

Each Notion entry is a row in the database + an expandable page with structured sections. Mayor opens the row at Phase 1 (pre-flight) and updates throughout the day.

### §3.1 — Page header (always visible)

```markdown
# {{Title}}

**Date:** {{Publish date}}
**Story type:** {{Story type}} | **Pattern:** {{Article pattern}} | **Weight:** {{Multimedia weight}}
**AI mode:** {{AI-multiplier mode}} | **Anchor:** {{Day-of-week anchor}}
**Status:** {{Status}} | **Lighthouse:** {{Lighthouse status}}
**Canonical path:** {{Canonical article path}}
**Live URL:** {{Canonical microsite URL}}
```

### §3.2 — Phase 1 Pre-flight checklist (visible at top; ~5 min Mayor)

```markdown
## Pre-flight (5 min)

- [ ] Story type confirmed (matches day-of-week anchor OR explicit override reasoning noted)
- [ ] Article pattern confirmed (META / NARRATIVE / INTERPLAY)
- [ ] AI-multiplier mode set (per pipeline-runbook.md §3.4 decision rule)
- [ ] Multimedia weight identified (Light / Medium / Heavy)
- [ ] Audience tier list confirmed
- [ ] Crossfire variant tier list confirmed
- [ ] LiveTicker / cd-ledger surfaced overnight signals reviewed (relevant to META days)
- [ ] One-line working title authored

**Today's thesis (one sentence):** {{thesis_sentence}}

**Source bundle pointers:**
- {{path_or_query_1}}
- {{path_or_query_2}}
```

### §3.3 — Phase 3 Authoring tracking (visible during Active)

```markdown
## Authoring

**Start time:** {{HH:MM}}
**Target end:** {{HH:MM}} (per story-type budget)
**Actual end:** {{HH:MM}}
**Canonical path:** `src/content/articles/{{yyyy-mm-dd}}-{{slug}}.mdx`

**AI-multiplier handoff log:**
- Mayor outline complete: {{HH:MM}}
- Claude draft handoff: {{HH:MM}}
- Mayor voice-overlay start: {{HH:MM}}
- Voice-overlay complete: {{HH:MM}}
```

### §3.4 — Phase 4 Multimedia composition (visible during Active+)

```markdown
## Multimedia

**Cover recipe:** R{{recipe_number}} from multimedia-recipes.md §2
**Primary tool:** {{Recraft Basic / Firefly / tldraw / Observable Plot / Snagit / Lightroom}}
**Aspect-ratio variants needed:** 16:9 microsite + {{4:5 LinkedIn / 9:16 social / 1:1 newsletter}}

**Inline media list:**
- [ ] {{inline_media_1}} ({{tool}})
- [ ] {{inline_media_2}} ({{tool}})

**DLDS pattern:** {{Pattern A C2PA / Pattern B IPTC / Pattern C human-authored}}
```

### §3.5 — Phase 5 Quality gates (checklist; visible at In Review)

```markdown
## Quality gates

- [ ] G1 Vale.sh structural pass (pre-commit auto)
- [ ] G2 Per-artifact Reviewer (Mayor signs off; named issues list empty)
- [ ] G3 Apple-cohesion test (Mayor gestalt PASS at preview)
- [ ] G4 DLDS provenance band visible + accurate (automated render-check)

**G2 named issues addressed:**
- (empty if none; otherwise list issue + resolution)

**G3 Apple-cohesion notes:**
- {{any gestalt observation worth recording for V1.5+ refinement}}
```

### §3.6 — Phase 6 Crossfire handoff (visible at In Review → Done)

```markdown
## Crossfire variants

- [ ] Microsite canonical (Source-of-truth; published at {{HH:MM}})
- [ ] Beehiiv newsletter scheduled at {{HH:MM}}
- [ ] LinkedIn long-form Mayor-published at {{HH:MM}}
- [ ] Hashnode published with `originalArticleURL` at {{HH:MM}}
- [ ] Dev.to published with `canonical_url` at {{HH:MM}}
- [ ] Bluesky n8n auto-published at {{HH:MM}}
- [ ] Mastodon n8n auto-published at {{HH:MM}}
- [ ] Threads manual / API at {{HH:MM}}
- [ ] Instagram Reels-format (if applicable) at {{HH:MM}}
- [ ] HN strategic submission queued in Linear: {{Linear-ticket}}
- [ ] Reddit per-sub strategic submission: {{r/sub or NA}}
- [ ] X manual cross-post (free-tier discontinued; manual workflow per master plan §1.5): {{HH:MM or NA}}

**Pre-authored hook verification (non-negotiable per master plan §3.C):**
- socialHook (≤280 chars): {{filled OR NA}}
- linkedinHook (≤700 chars): {{filled OR NA}}
- newsletterExcerpt (≤500 chars): {{filled OR NA}}

**canonical_url discipline check:** All secondary platforms point to {{canonical microsite URL}}.
```

### §3.7 — Phase 7 Post-publish telemetry (visible at Done; updated continuously)

```markdown
## Post-publish telemetry

**Last updated:** {{HH:MM yyyy-mm-dd}}

| Platform | Signal | Value |
|---|---|---|
| Microsite | Page-views (Plausible) | {{count}} |
| Microsite | Avg session duration | {{seconds}} |
| Beehiiv | Open rate | {{percentage}} |
| Beehiiv | Click rate | {{percentage}} |
| LinkedIn | Impressions | {{count}} |
| LinkedIn | Reactions | {{count}} |
| Hashnode | Views | {{count}} |
| Dev.to | Views + Reactions | {{count}}+{{count}} |
| Bluesky | Reposts + Likes | {{count}}+{{count}} |
| Common Room | Conversation count | {{count}} |
| HN (if submitted) | Points + Comments | {{points}}+{{comments}} |

**Engagement signal observations** (visibility signal NOT optimization target per `feedback_metric_vs_gate_discipline.md`):
- {{1-3 observations Mayor records for V1.5+ content-cycle evidence}}

**Drift signals fired:** {{multi-select per pipeline-runbook.md §9}}
```

### §3.8 — Page footer (always visible)

```markdown
---

**Time-budget summary:**
- Target: {{Time-budget target}} minutes (per pipeline-runbook.md §8.1)
- Actual: {{Time-budget actual}} minutes
- Delta: {{actual - target}} minutes ({{percentage}}% of budget)

**Cross-references:**
- Canonical article: [{{slug}}]({{Canonical microsite URL}})
- Pipeline runbook: `representation/content/pipeline-runbook.md`
- Multimedia recipe: `representation/content/multimedia-recipes.md` §{{recipe_section}}
- Story type spec: `representation/content/story-types-catalog.md` §{{story_type_section}}
- Article pattern: `representation/content/article-patterns/{{pattern}}.md`
```

---

## §4 — Notion views configuration

The database supports multiple views. Each view serves a different daily/weekly Mayor task.

### §4.1 — Today (default landing view)

| Setting | Value |
|---|---|
| **Filter** | Publish date = TODAY OR (Status = "Active" AND Publish date ≤ TODAY+1) |
| **Sort** | Status (ascending: Backlog → Active → In Review → Done) |
| **Visible properties** | Title / Story type / Status / AI-multiplier mode / Day-of-week anchor / Time-budget target |
| **Purpose** | Phase-1 pre-flight surface; what Mayor opens at start of content session |

### §4.2 — This week

| Setting | Value |
|---|---|
| **Filter** | Publish date >= START_OF_WEEK AND Publish date < START_OF_NEXT_WEEK |
| **Sort** | Publish date ascending |
| **Group by** | Day-of-week anchor |
| **Visible properties** | Title / Story type / Article pattern / Multimedia weight / Status / Time-budget actual |
| **Purpose** | Friday week-close review; drift indicator inventory |

### §4.3 — Lighthouse arc

| Setting | Value |
|---|---|
| **Filter** | Lighthouse status IS NOT "None" AND IS NOT "Weekly-cadence" |
| **Sort** | Publish date ascending |
| **Visible properties** | Title / Story type / Article pattern / Lighthouse status / Lighthouse-pick adjudication / Multimedia weight |
| **Purpose** | first-six-months-slate.md §2 lighthouse-arc planning + Mayor adjudication at W5 first-article gate |

### §4.4 — Drafted (backlog candidate pool)

| Setting | Value |
|---|---|
| **Filter** | Status = "Backlog" |
| **Sort** | Story type (grouped) |
| **Group by** | Story type |
| **Visible properties** | Title / Article pattern / Multimedia weight / Lighthouse status |
| **Purpose** | Story candidate pool for weekly-cadence selection per first-six-months-slate.md §3 |

### §4.5 — Drift signals review

| Setting | Value |
|---|---|
| **Filter** | Drift signals fired IS NOT EMPTY (across last 30 days) |
| **Sort** | Publish date descending |
| **Visible properties** | Title / Drift signals fired / Time-budget actual vs target / Quality gates passed |
| **Purpose** | Friday week-close + monthly review; amendment-routing per pipeline-runbook.md §9 |

### §4.6 — All published

| Setting | Value |
|---|---|
| **Filter** | Status = "Done" |
| **Sort** | Publish date descending |
| **Visible properties** | Title / Publish date / Story type / Engagement signals (summary) / Crossfire variants completed count |
| **Purpose** | V1.5+ content-cycle evidence base; longitudinal pattern observation |

### §4.7 — Cross-post variant tracking

| Setting | Value |
|---|---|
| **Filter** | Status IS "In Review" OR Status IS "Done" |
| **Sort** | Publish date descending |
| **Visible properties** | Title / Crossfire variants status / Publish date |
| **Purpose** | Stream 4 automation status check; per-article variant gap detection |

---

## §5 — Status taxonomy mapping (Linear + Notion + master plan)

Per `feedback_linear_taxonomy_canon.md` + master plan RES-010 status structure ratification:

| Notion content-calendar status | Linear ticket status (if Linear ticket exists for this article) | Master plan / dispatch md vocabulary | Meaning |
|---|---|---|---|
| **Backlog** | Backlog | Backlog | Drafted in calendar; not yet started |
| **Active** | Active | Dispatched / Active / Synthesis (three CC-rich in-flight states collapse to one) | Phase 2-4 in flight (source-gathering / authoring / multimedia composition) |
| **In Review** | In Review | In Review / Mayor-Reviewed | Phase 5 quality gates passing through |
| **Done** | Done | Done | Phase 6 crossfire complete; Phase 7 post-publish continuous |
| **Parked** | Parked | Parked | Started but deferred to later cycle (e.g., source material insufficient) |
| **Cancelled** | Cancelled | Cancelled | Abandoned (story type proved unhelpful; Mayor cancels) |

**Tracker vs Conductor visibility:** Tracker (per master plan §8.5) operates Linear; Conductor (per §8.1 stable role roster) reads Notion + cross-surface-signals.md and reports state across all surfaces. DISpatch content articles may or may not have a Linear ticket per Mayor's discretion — Notion content calendar is the source of truth for content-article state; Linear is for code/infrastructure work.

---

## §6 — Lighthouse + weekly-cadence scheduling pattern

Per first-six-months-slate.md §2 lighthouse-arc + §3 weekly-cadence candidate pool. Notion content calendar holds both at V1.

### §6.1 — Lighthouse-arc scheduling

5 lighthouse-pick candidates (CC5 instinct; Mayor adjudicates at W5 first-article authoring per first-six-months-slate.md §5 Gate 1):

| # | Working title | Target publication week |
|---|---|---|
| L1 | Canon-genesis: shipping Prime's first contract-style Terrace skill | Week 1 V1 launch arc |
| L2 | DLDS — disclosed-lane drift-sensing as Prime's AI-content discipline | Week 4-5 V1 launch arc (pre-EU AI Act deadline ~August 2 2026) |
| L8 | Sonic — building Prime's audible identity | Week 6-8 V1 launch arc (~September 2026) |
| L19 | The crossfire — why we replaced social-share buttons with platform-preview cards | Week 2-3 V1 launch arc |
| L24 | What Prime is becoming — V1 ship moment Mayor-direction | Week 1 V1 launch arc (paired with L1) |

**Notion scheduling pattern:** Pre-populate 5 lighthouse entries at Stream 5 close with `Lighthouse status = "Lighthouse-pick-candidate"`; Mayor adjudicates at W5 → status transitions to "Lighthouse-pick-Mayor-adjudicated"; lighthouse publishes per target week.

### §6.2 — Weekly-cadence scheduling

20 weekly-cadence story candidates (first-six-months-slate.md §3.1 + §3.2; META + NARRATIVE distinct pools). 5/7 days posting × 6 months = ~130 daily slots; minus 5 lighthouse pieces + 20 weekly candidates = ~105 organic-emerging-stories slots per editorial-calendar.md §4 distribution discipline.

**Notion scheduling pattern:**
1. Pre-populate 20 weekly-cadence entries at Stream 5 close with `Lighthouse status = "Weekly-cadence"` + `Status = "Backlog"`
2. Each Friday week-close, Mayor selects from §3.1 META pool + §3.2 NARRATIVE pool + organic-emerging surfaced via LiveTicker to fill next week's 5 slots
3. Selected stories transition to `Status = "Active"` Monday morning at Phase 1 pre-flight

### §6.3 — Organic-emerging stories (continuous)

Stories that emerge from agent activity, shipped changes, Mayor-direction events. Notion captures these as new database entries with `Status = "Backlog"` + `Story type = (best-fit per story-types-catalog.md)`. Mayor schedules at next Friday week-close per cadence opportunity.

**Capture pattern:** When a story-worthy moment occurs (major commit, agent demo, validation cascade resolution, Mayor-direction event):
1. Mayor or Claude creates Notion entry with one-line working title + Story type + brief context (~30 sec capture)
2. Entry sits in Backlog with Status = "Backlog"
3. Friday week-close review surfaces backlog entries for next-week scheduling consideration

---

## §7 — Drift indicator field integration

Per pipeline-runbook.md §9 — 12 named drift indicators. Notion content calendar holds the detection-mechanism data for indicators #1, #2, #3, #4, #5, #6, #8, #10, #11, #12.

### §7.1 — Per-article drift field mapping

| Drift indicator | Notion field detecting | Detection rule |
|---|---|---|
| #1 Daily time-budget >2.5hr | Time-budget actual vs target | (actual / target) > 1.3 → flag in "Drift signals fired" |
| #2 Weekend dark broken 3+/quarter | Database query: COUNT(WHERE Day-of-week anchor = "Sat dark" OR "Sun dark" AND Status = "Done") | Manual quarterly review |
| #3 Quality gate failures >20% week | Quality gates passed multi-select per-article + view filter | View filter aggregates weekly |
| #4 AI-multiplier mode mismatch | Mayor records observation in G2 named issues OR voice-overlay was >50% rewrite | Mayor self-reports in entry |
| #5 Crossfire variant generation >20 min/day | Time-budget actual breakdown per-phase | Phase 6 manual time recorded |
| #6 DLDS provenance band rendering issues | Quality gates passed: G4 failed | Multi-select tracks G4 fails |
| #8 Apple-cohesion gestalt fail >2/week | Quality gates passed: G3 failed | View aggregates G3 fails weekly |
| #10 Tool friction signal | Drift signals fired multi-select | Mayor self-reports per article |
| #11 Story-type mismatch (Mayor overrides day-of-week anchor) | Day-of-week anchor vs Story type mismatch | Pattern detection at Friday week-close |
| #12 Claude-context drift (out-of-register content) | Voice-overlay was >40% rewrite OR G2 named issue: register slip | Mayor self-reports |

### §7.2 — Weekly drift signals review (Friday Phase 7 task; ~10 min)

Mayor opens "Drift signals review" view (per §4.5) every Friday. Aggregates:
- Drift indicator fire counts (per indicator across week)
- Time-budget overruns (per story type)
- Quality gate failures (per gate)
- Story-type override count

Amendments routed per pipeline-runbook.md §9 amendment-routing table. If amendment fires, append entry to `cc-ledger/dispatches/W1/amendments/` and route through Section 12 amendment process per Mayor's discretion.

---

## §8 — Cross-references

| Section | Target |
|---|---|
| §1 universal concept | `feedback_notion_pointer_summary_pattern.md` + editorial-calendar.md §1 |
| §2 database schema | story-types-catalog.md §3 per-type spec + pipeline-runbook.md §8.1 time-budget per story type |
| §3 per-day entry template | pipeline-runbook.md §2 seven phases (each phase's outputs map to entry sections) |
| §4 views configuration | first-six-months-slate.md §4 distribution discipline + audience-engagement-model.md §6 |
| §5 status taxonomy mapping | `feedback_linear_taxonomy_canon.md` + master plan §8.5 RES-008 + master plan §12 RES-010 |
| §6 lighthouse + weekly-cadence | first-six-months-slate.md §2 + §3 + §4 + §5 |
| §7 drift indicator field integration | pipeline-runbook.md §9 drift indicators inventory + `feedback_metric_vs_gate_discipline.md` |

---

## §9 — Setup procedure (one-time at V1 launch)

Step-by-step Notion DB creation; Mayor (or Stream 4 automation) executes once. Per `feedback_notion_pointer_summary_pattern.md` — pointer + summary + metadata; canonical .md files hold truth.

1. **Create database.** Notion: New database → "DISpatch Content Calendar"
2. **Add required properties (§2.1).** 17 properties in spec order; preserve column ordering for view configurability
3. **Pre-populate select-field options:**
   - Story type: 12 options per story-types-catalog.md §2
   - Article pattern: META / NARRATIVE / INTERPLAY
   - Day-of-week anchor: 7 options per editorial-calendar.md §2.1
   - AI-multiplier mode: 4 options per pipeline-runbook.md §3.1
   - Multimedia weight: Light / Medium / Heavy
   - Lighthouse status: 4 options per §6.1
   - Status: 6 options per §5 (Backlog / Active / In Review / Done / Parked / Cancelled)
   - Crossfire variants status: 13 options per §3.6
   - Audience tier: 3 options per §2.1
   - Quality gates passed: 4 options per §3.5
   - Drift signals fired: 12 options per pipeline-runbook.md §9
4. **Create 7 views (§4):** Today / This week / Lighthouse arc / Drafted / Drift signals review / All published / Cross-post variant tracking
5. **Pre-populate lighthouse arc entries (5; per §6.1).** Status = Backlog; Lighthouse status = Lighthouse-pick-candidate
6. **Pre-populate weekly-cadence candidate pool (20; per §6.2).** Status = Backlog; Lighthouse status = Weekly-cadence
7. **Test daily-entry template.** Create one test entry; complete Phase 1 pre-flight checklist; verify template renders correctly
8. **Pin "Today" view** to Notion sidebar for 1-click Mayor access
9. **Set Notion-as-City-Hall integration** per master plan §1.7 reframe + Prime City Directory location

---

## §10 — Forward pointers

- **W5 first-article authoring** — Mayor opens "Today" view; lighthouse L1 (canon-genesis) entry pre-populated; Phase 1 pre-flight checklist completes; runbook + recipes load-bearing references
- **Stream 4 automation** — n8n workflows update Notion entry Crossfire variants status as cross-posts complete; pattern: n8n flow ID maps to Notion DB record ID via slug
- **V1.5+ content-cycle refinement** — schema evolution per W5+ first-article evidence; per-field amendments append per content-cycle evidence
- **Era 2 transition (agent reviewers)** — Quality gates passed multi-select extends with agent-Reviewer signoff field per `library/voice/governance.md` A3

---

## §11 — Standing-history pointers

- Pipeline runbook: `representation/content/pipeline-runbook.md` (W1 Stream-5 2026-05-11)
- Multimedia recipes: `representation/content/multimedia-recipes.md` (W1 Stream-5 2026-05-11)
- Editorial calendar: `representation/content/editorial-calendar.md` (W1 CD7 RATIFIED 2026-05-09)
- Story types catalog: `representation/content/story-types-catalog.md` (W1 CD7 RATIFIED)
- First-six-months slate: `representation/content/first-six-months-slate.md` (W1 CD7 RATIFIED)
- Audience engagement: `representation/content/audience-engagement-model.md` (W1 CD7 RATIFIED)
- Master plan §8.4 Notion-dispatch-board: `plans/master-plan.md` v1.0.10
- Linear status taxonomy: `~/.claude/projects/c--Users-AKALM-prime-city-brand-sandbox/memory/feedback_linear_taxonomy_canon.md`
- Notion-as-pointer-dashboard: `~/.claude/projects/c--Users-AKALM-prime-city-brand-sandbox/memory/feedback_notion_pointer_summary_pattern.md`

---

*Notion content calendar template v0 authored 2026-05-11 W1 Stream-5. Database schema + 7 views + per-day entry template + lighthouse + weekly-cadence scheduling pattern + drift indicator field integration. Refinable per W5+ first-article evidence per `feedback_metric_vs_gate_discipline.md` per-deliverable gate. Append-only schema evolution per `feedback_documentation_lifecycle.md`.*
