---artifact: stream-5-time-budget-reality-validation
authored: W1 Stream-5 (Master of DISpatch Output)
authored-date: 2026-05-11
status: active
authority: mayor
  - Mayor: Stream-5 cycle authority delegated 2026-05-11
  - Stream 5: synthesis + authoring per Mayor directive
upstream-cascade:
  - pipeline-runbook.md (W1 Stream-5)
  - multimedia-recipes.md (W1 Stream-5)
  - notion-calendar-template.md (W1 Stream-5)
  - automation-requirements.md (W1 Stream-5)
  - editorial-calendar.md §3 sustainability discipline (W1 CD7 RATIFIED)
  - 2026-05-09_microsite-stack-budget-ledger-v0.md (v0.1 RATIFIED)
downstream-blocks:
  - W5 first-article authoring (validation evidence informs first-article calibration)
  - V1.5+ refinement cycle (calibration evidence feeds amendment)
discipline-references:
  - feedback_metric_vs_gate_discipline.md (gates not targets; per-deliverable justification)
  - feedback_documentation_lifecycle.md (append-only on calibration evidence)
  - feedback_decouple_scope_from_ambition.md (visitor-attraction at v0; engagement-depth at v0.1+)
  - feedback_subscription_flat_cost_model.md (Claude Max flat-rate; 1-2hr daily window covenant)
gate-criterion: pipeline time-budget covenant (1-2hr daily; weekend dark) holds in theoretical dry-run with named friction fallbacks documented; first-article calibration overhead +100% acceptable for first article per story type
title: DISpatch — Time-Budget Reality Validation
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
generated: true
---

# DISpatch — Time-Budget Reality Validation

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + Mayor 2026-05-11 Stream-5 directive:

- **Theoretical dry-run.** This document walks through one META article + one NARRATIVE article + one Friday retrospective hypothetically (no actual article authored). Real validation fires at W5 first-article authoring.
- **Friction inventory.** Each phase named; per-phase friction risks surfaced; manual fallback patterns documented for automations not yet live.
- **Concept-first.** Calibration concepts cited as universal (every editorial pipeline calibrates against first articles; expected variance is structural).
- **Muted technical language.** Specific tool friction predictions are inclined-toward, not asserted; W5 evidence refines.
- **No "avoid" / "NOT" framing.** First-article overhead is expected; calibration cycle is structural; alternative authoring sequences may surface evidence-of-better.

**Reading order:** §1 universal calibration concept → §2 theoretical META dry-run → §3 theoretical NARRATIVE long-form dry-run → §4 theoretical Friday retrospective dry-run → §5 first-article overhead inventory → §6 pre-W5 readiness checks → §7 calibration cycle recommendations → §8 cross-references.

---

## §1 — Universal calibration concept

**Every editorial pipeline calibrates against its first articles.** The 1-2hr daily window per editorial-calendar.md §3.1 is a SUSTAINED-CADENCE target — not a first-article target. First articles cross-calibrate: the writer learns the workflow rhythm, the AI co-author learns the writer's voice, the tools authenticate, the quality gates surface their actual failure modes. Per `feedback_subscription_flat_cost_model.md` + editorial-calendar.md §3.3 — drift indicators expect first-article overhead; sustained-cadence convergence is at article 5-7 per story type.

**Examples that prove the concept at world-class scale:**

- **Stratechery first 6 months (2013-2014)** — Ben Thompson's "Aggregation Theory" article (May 2015 → became foundational thesis) was article #~200 of the publication; first 200 articles were calibration toward sustained-cadence quality
- **Bytes by ByteByteGo first 3 months** — newsletter cadence iterated via subscriber feedback; first 12 issues calibrated rhythm
- **The Pudding launch** — per-article-as-designed-object discipline emerged after first 10 articles validated the format

**Prime's expression — expect +50-100% time-budget overhead on first article per story type; convergence to sustained-cadence target by article 5-7 per type.** Calibration overhead is STRUCTURAL not failure. Drift indicator #1 firing on first 5 articles per type is expected; sustained firing past article 7 → amendment review per pipeline-runbook §9.

---

## §2 — Theoretical META dry-run (Tuesday infrastructure-decision article)

### §2.1 — Article scenario

**Working title:** "How we wired Bifrost + LiteLLM as composable LLM gateway layers for prime-mcp"
**Story type:** #2 Infrastructure-decision (META primary)
**AI-multiplier mode:** Claude-first
**Multimedia weight:** Medium (tldraw architecture diagram + 1-2 CodeDiff)
**Lighthouse status:** Weekly-cadence (NOT lighthouse-pick)
**Day-of-week anchor:** Tuesday META dispatch
**Time-budget target:** 35-60 min (per pipeline-runbook.md §8.1 Tue META)

### §2.2 — Phase-by-phase dry-run

#### P1 Pre-flight (target: 5 min; first-article: 8-10 min)

- Mayor opens Notion content calendar "Today" view → entry pre-populated
- Mayor confirms story type Infrastructure-decision; pattern META; weight Medium; mode Claude-first
- Mayor scans LiveTicker overnight aggregation: A2 surfaced 4 commits + 2 Linear closed tickets + 1 dispatch card Done
- Mayor confirms thesis sentence: "Bifrost as Layer 2 in front of LiteLLM Layer 1 gives prime-mcp tool-discovery + provider breadth at sub-11μs overhead"

**First-article overhead:** +3-5 min — Mayor inspects A2 LiveTicker output thoroughness; verifies overnight signals are accurate (auto-trust takes 2-3 articles to develop)

#### P2 Source-gathering (target: 5-10 min; first-article: 10-15 min)

- Mayor clicks A3 fetcher button in Notion entry
- A3 returns: git log entries on `prime-mcp` repo + Linear ticket PCP-XXX (Bifrost integration) + Notion dispatch card "Bifrost + LiteLLM composable architecture" Done 2026-05-08
- Mayor reads source bundle; confirms thesis aligns; flags 2 commits as load-bearing

**First-article overhead:** +5 min — A3 manual fallback if not yet implemented (Stream 4 Wave 4-ish); Mayor runs `git log` + `gh issue list` + Notion-API query manually
**Friction risk:** A3 not yet implemented at W5 → Mayor manual ~10-15 min instead of A3 5-10 min

#### P3 Authoring (target: 25-35 min Claude-first; first-article: 35-50 min)

- Claude generates structural draft from source bundle per pipeline-runbook §3.2.2 Claude-first contract
- Claude cites SHA + Linear ticket + Notion dispatch card path per Vale.sh DLDS lane-schema requirement
- Claude flags inline {{verify}} markers (4 markers — within contract <5 threshold)
- Mayor edit-and-verify pass: resolves all 4 {{verify}} markers; tightens compressed-META register; verifies SHA references match reality (5 min)
- Mayor populates frontmatter ai_role=claude_first + lane_schema=claude_direct + canonical_url=https://prime.city/articles/bifrost-litellm-composable

**First-article overhead:** +10-15 min — Claude doesn't know Mayor's META-register voice yet; voice-overlay rewrite ratio likely 35-45% on first article (drift indicator #12 threshold is >40%; first article may fire); convergence by article 3-5 to <20% rewrite

#### P4 Multimedia composition (target: 10-15 min; first-article: 15-25 min)

- Recipe R2 selected: tldraw architecture diagram (preferred for structurally hierarchical decisions)
- Mayor uses Claude prompt scaffold from multimedia-recipes.md §4.2 to author tldraw diagram
- tldraw output: PNG cover at 1920×1080 @ 2x; Mayor exports
- A8 IPTC 2025.1 metadata embedder fires; lane_schema=claude_direct + ai_role=claude_first preserved
- 2 inline CodeDiff via Shiki at build (no Phase 4 action needed; Phase 3 covered)
- A7 per-platform aspect-ratio variant generator fires; produces 4:5 LinkedIn variant + 1:1 Bluesky variant
- Mayor approves variants in Notion entry

**First-article overhead:** +5-10 min — tldraw learning curve on first diagram; IPTC embed verification manual if A8 not implemented (run `exiftool` CLI to verify); variant generation review takes extra Mayor time on first article

**Friction risks:**
- A7 not yet implemented at W5 → Mayor manually creates per-platform variants (15-20 min instead of 1-3 min per variant)
- A8 not yet implemented → Mayor manually runs exiftool (3-5 min extra)
- tldraw output may need Recraft fallback if diagram feels too clinical for cover (G3 Apple-cohesion risk)

#### P5 Quality gates (target: 5-10 min; first-article: 10-15 min)

- G1 Vale.sh pre-commit auto: PASS (frontmatter complete; DLDS lane-schema populated; canonical_url valid)
- G2 Mayor Reviewer pass: ~3-5 min read-through-as-Reviewer; voice register held throughout; thesis preserved; sign off
- G3 Apple-cohesion test: ~2-3 min Mayor preview render read-as-cold-reader; cover + opening + chrome cohere; PASS
- G4 DLDS provenance band render-check: A9 auto fires; PASS

**First-article overhead:** +5-10 min — Mayor's G2 + G3 calibration takes extra time on first article; "what counts as a voice slip" + "what counts as Apple-cohesion fail" calibrates by reading-as-Reviewer + reading-as-cold-reader passes

**Friction risks:**
- G3 calibration risk: first article G3 fail is structurally likely; if Mayor returns to Phase 4 to address cover register, +15-25 min cost

#### P6 Crossfire handoff (target: 5-10 min Mayor; first-article: 15-25 min Mayor)

- Mayor clicks A11 14-platform variant scheduler button in Notion entry
- A11 fans out per-platform: Beehiiv scheduled + Hashnode published with originalArticleURL + Dev.to published with canonical_url + Bluesky n8n auto + LinkedIn draft created (Mayor manually publishes)
- A13 Notion entry status auto-transition: In Review → Done
- Mayor manually publishes LinkedIn long-form (~5 min — personal-profile native compose per audience-engagement-model.md §2.1)

**First-article overhead:** +10-15 min — Mayor calibrates per-platform variant review; cross-platform variant rendering review takes longer first time; LinkedIn native compose calibration

**Friction risks:**
- A11 not yet implemented at W5 → Mayor manually publishes 6+ platforms; could be 60-90 min Mayor work on first article
- Beehiiv block JSON reshape friction if A11 reshape logic immature
- Bluesky AT Protocol rate limit (5K writes/hr) unlikely V1 issue but flag

#### P7 Post-publish (continuous; first-article: ~5 min Mayor check)

- Plausible page-view counter starts
- Beehiiv send fires per scheduled time
- A14 engagement signals aggregator runs daily 9pm; populates Notion entry telemetry section
- Mayor checks Notion entry telemetry at Friday week-close

### §2.3 — META dry-run total time-budget

| Phase | Target | First-article realistic | Friction-impact band |
|---|---|---|---|
| P1 Pre-flight | 5 min | 8-10 min | +3-5 |
| P2 Source-gathering | 5-10 min | 10-25 min | +5-15 (A3 manual) |
| P3 Authoring | 25-35 min | 35-50 min | +10-15 (voice calibration) |
| P4 Multimedia | 10-15 min | 15-35 min | +5-20 (variant manual; tldraw learning) |
| P5 Quality gates | 5-10 min | 10-25 min | +5-15 (G3 calibration risk) |
| P6 Crossfire | 5-10 min | 15-90 min | +10-80 (A11 manual full fallback) |
| **META Total** | **55-85 min** | **93-235 min** | depends heavily on A3+A7+A8+A11 implementation status |

**Critical insight: A3+A7+A8+A11 implementation status at W5 is the dominant time-budget variable for META first-article.** If all 4 automations are live: META first-article 93-130 min (well within 2.5hr drift threshold). If none live: META first-article 200-235 min (exceeds 2.5hr; drift indicator #1 fires; expected for first article but signals automation priority).

---

## §3 — Theoretical NARRATIVE long-form dry-run (Monday Mayor-direction lighthouse piece)

### §3.1 — Article scenario

**Working title:** "What Prime is becoming — V1 ship moment Mayor-direction" (Lighthouse #24 from first-six-months-slate.md §2)
**Story type:** #10 Mayor-direction post (NARRATIVE primary)
**AI-multiplier mode:** Mayor-first
**Multimedia weight:** Heavy (cover painterly + cartography canvas + InstitutionalFixture + sonic-logo opener)
**Lighthouse status:** Lighthouse-pick-candidate (Mayor adjudicates at W5)
**Day-of-week anchor:** Monday NARRATIVE long-form
**Time-budget target:** 100-150 min (per pipeline-runbook.md §8.1 Mon NARRATIVE long-form)

### §3.2 — Phase-by-phase dry-run

#### P1 Pre-flight (target: 5 min; first-article: 10 min)

- Mayor opens Notion content calendar; Lighthouse #24 entry pre-populated
- Mayor reviews Mayor-direction thematic anchor; confirms V1 ship moment is right week
- Mayor authors thesis sentence: "Prime ships V1 not as a destination but as the first surface where the cosmology becomes operationally visible"

**First-article overhead:** +5 min — lighthouse-pick adjudication conversation with self (do I ship this on Week 1 OR Week 2?)

#### P2 Source-gathering (target: 10-15 min Mayor-first; first-article: 15-20 min)

- Mayor authors section outline (5-8 sections, each ≤8 words) per pipeline-runbook §3.2.1 Mayor-first contract:
  - "Where Prime started" / "What the cosmology asked of us" / "What V1 ships" / "What V1 doesn't ship yet" / "What V1.5 will surface" / "The institutional voice of an unknown brand" / "The bet on agentic-craftmanship" / "The Mayor's signature"
- Mayor authors thematic spine per section (1-2 sentences each)
- Mayor authors register lock: NARRATIVE_primary

**First-article overhead:** +5 min — first Mayor-direction post calibrates institutional voice; section ordering iteration

#### P3 Authoring (target: 75-105 min Mayor-first; first-article: 95-135 min)

- Mayor hands outline + thematic spine + register lock to Claude
- Claude expands outline per pipeline-runbook §3.2.1 contract: preserves section_outline verbatim; cites voice anchors; inline {{?}} ambiguity markers; thesis preserved
- Mayor receives Claude expansion (typically 1,500-2,500 words for first pass)
- Mayor voice-overlay pass 1: read-through; collapse Claude verbosity; substitute Mayor diction (~25-35 min)
- Mayor voice-overlay pass 2: address {{?}} ambiguity flags (~5-8 min; usually 3-5 markers)
- Mayor voice-overlay pass 3: register-coherence check (does this read as Mayor, not Claude?) (~10-15 min; substantive rewrite of any Claude phrasings that don't sound like Mayor)
- Mayor populates frontmatter ai_role=mayor_first + lane_schema=mayor_claude + canonical_url=https://prime.city/articles/v1-ship-moment-mayor-direction

**First-article overhead:** +20-30 min — Claude doesn't know Mayor's institutional voice yet; voice-overlay rewrite ratio likely 50-65% on first Mayor-direction post (drift indicator #4 threshold is >50% rewrite; first article will fire); convergence by article 3-5 to <30% rewrite

**Friction risks:**
- Claude register drift: first Mayor-direction post, Claude may default to compressed-META register instead of NARRATIVE institutional; major rewrite cost
- Section reordering temptation: Mayor may want to restructure mid-article; Mayor-first contract says no, but first-article temptation is high

#### P4 Multimedia composition (target: 25-30 min; first-article: 35-50 min)

- Recipe R10 selected: Mayor-direction cover
- Layer 1 (cartography canvas): Editorial District + adjacent districts at hero zoom; warm-high atmosphere; **Friction risk: cartography canvas component is W3 work (Stream 1); at W5 first-article may not be implemented yet → fallback to static Inkarnate render OR Watabou + D3 manual export**
- Layer 2 (Firefly painterly illustration): Mayor uses prompt scaffold from multimedia-recipes.md §4.10; iterates 2-3 times to match institutional register
- Layer 3 (InstitutionalFixture component): Paradiso seed-mandate fixed at corner; **Friction risk: InstitutionalFixture is W3 component implementation; at W5 may not be ready → fallback to static SVG placement**
- Sonic-logo opener: AudioEmbed `ambient` mode loaded but not autoplaying; **Friction risk: AudioEmbed is W3 component implementation; W5 first-article may not have it → defer to V1.5+ OR static audio file with manual player**
- A7 per-platform variant generator: 4:5 LinkedIn + 9:16 Reels + 1:1 newsletter + tentpole sub-page hero variant
- A8 IPTC + Firefly C2PA preserved

**First-article overhead:** +10-20 min — heavy multimedia lighthouse piece; Firefly iteration for painterly register match; cartography canvas component readiness blocker (likely fallback needed at W5)

**Friction risks:**
- Cartography canvas / InstitutionalFixture / AudioEmbed component implementation not ready at W5 → fallback patterns extend P4 substantially (could be 50-80 min vs 25-30 target)

#### P5 Quality gates (target: 10-15 min; first-article: 15-25 min)

- G1 Vale.sh: PASS (frontmatter complete)
- G2 Mayor Reviewer: ~5-8 min read-through-as-Reviewer; voice + register + story-type spec + thesis check
- G3 Apple-cohesion test: ~5-8 min Mayor preview render read-as-cold-reader; lighthouse-piece is high-stakes; first-article calibration risk substantial
- G4 DLDS provenance band: PASS

**First-article overhead:** +5-10 min — G3 Apple-cohesion calibration on lighthouse piece is highest-stakes; first-article gestalt sense develops here

**Friction risks:**
- G3 Apple-cohesion fail on first lighthouse piece is high probability (~30-50%); could require Phase 4 multimedia redo (+20-40 min)

#### P6 Crossfire handoff (target: 10 min Mayor; first-article: 25-40 min Mayor)

- Mayor clicks A11 14-platform variant scheduler
- A11 publishes Tier 1 (Microsite + Beehiiv + Hashnode + Dev.to + LinkedIn draft + Bluesky); Mayor manually publishes LinkedIn long-form
- Tentpole sub-page (CrossfireShowcase Shape B) — **Friction risk: CrossfireShowcase component is W3 Stream 1 work; at W5 may not be ready → fallback to canonical microsite landing without sub-page**
- HN strategic Linear-ticket auto-created; Mayor decides to fire HN submission (lighthouse piece = HN-strategic candidate)
- Reddit r/programming Linear-ticket auto-created; Mayor decides per-sub fit

**First-article overhead:** +15-25 min — manual platform variant review; LinkedIn native compose (high-stakes; institutional voice register match); HN strategic submission text + title polish; manual Reddit submission

**Friction risks:**
- CrossfireShowcase Shape B sub-page not ready at W5 → degraded experience (no per-article sub-page); reduces lighthouse-piece amplification
- LinkedIn native compose first-article: Mayor calibrates institutional voice for LinkedIn long-form audience (different than microsite reader); extra time

#### P7 Post-publish (continuous; first-article: 10-15 min Mayor check daily for first week)

- Plausible / Beehiiv / LinkedIn / Hashnode / Dev.to / Bluesky / Common Room signals accumulate
- HN submission (if fired) high-traffic spike if surfaces front page
- A14 engagement signals aggregator runs daily
- Mayor checks Notion entry telemetry at Friday week-close

### §3.3 — NARRATIVE long-form dry-run total time-budget

| Phase | Target | First-article realistic | Friction-impact band |
|---|---|---|---|
| P1 Pre-flight | 5 min | 10 min | +5 |
| P2 Source-gathering | 10-15 min | 15-20 min | +5 |
| P3 Authoring | 75-105 min | 95-135 min | +20-30 (voice-overlay calibration) |
| P4 Multimedia | 25-30 min | 35-80 min | +10-50 (component readiness + Firefly iteration) |
| P5 Quality gates | 10-15 min | 15-25 min | +5-10 (G3 calibration) |
| P6 Crossfire | 10 min | 25-40 min | +15-30 (manual platform; LinkedIn calibration) |
| **NARRATIVE Total** | **135-180 min (2.25-3 hr)** | **195-310 min (3.25-5.2 hr)** | depends on component readiness + automation status |

**Critical insight: First lighthouse NARRATIVE post likely exceeds drift indicator #1 threshold (2.5 hr).** This is STRUCTURAL not failure per `feedback_metric_vs_gate_discipline.md` per-deliverable gate — first article per story type calibrates. Expect drift indicator firing on first 2-3 NARRATIVE long-forms; convergence by article 5-7.

**Sustained-cadence NARRATIVE Monday (article 7+ per type) target:** 135-180 min (within 2.5hr drift threshold; matches editorial-calendar.md §3.1 target).

---

## §4 — Theoretical Friday retrospective dry-run

### §4.1 — Article scenario

**Working title:** "Week N retrospective"
**Story type:** #1 Dispatch missive (META primary) / Friday lightweight retrospective variant
**AI-multiplier mode:** Summary-first
**Multimedia weight:** Light (1 hero CodeDiff OR data viz; LiveTicker embed)
**Day-of-week anchor:** Friday retrospective
**Time-budget target:** 25-50 min (per pipeline-runbook.md §8.1 Fri retrospective; first-article: 35-60 min)

### §4.2 — Phase-by-phase summary

- **P1 (5 min):** Mayor opens Friday entry; A2 LiveTicker aggregation populated overnight + throughout week
- **P2 (3-5 min):** A2 + A3 source bundles already gathered; Mayor confirms thesis "What shipped Week N"
- **P3 (15-25 min):** Claude generates mechanical week-summary per pipeline-runbook §3.2.4 Summary-first contract; Mayor adds Mayor-voice retrospective commentary (~10-15 min Mayor)
- **P4 (5 min):** Light multimedia — LiveTicker embed via CD4 #15 component + 1 hero data viz (Observable Plot week-aggregate) OR 1 CodeDiff hero
- **P5 (5 min):** Quality gates all PASS
- **P6 (5-10 min Mayor):** Crossfire — Microsite + Beehiiv weekly digest + LinkedIn short-form + Bluesky; A11 auto + Mayor LinkedIn manual
- **P7:** Telemetry; this is also the day Mayor reviews A15 Friday drift review surfacer output (~10 min separate from article authoring)

### §4.3 — Friday retrospective total

| Phase | Target | First-article realistic |
|---|---|---|
| P1 | 5 min | 5 min |
| P2 | 3-5 min | 5 min |
| P3 | 15-25 min | 25-35 min |
| P4 | 5 min | 10 min |
| P5 | 5 min | 10 min |
| P6 | 5-10 min | 10-15 min |
| **Total** | **38-55 min** | **65-80 min** |
| **Plus A15 drift review** | (+10 min Mayor) | (+10 min Mayor) |

**Total Friday Mayor time-investment:** 48-65 min target sustained-cadence; 75-90 min first-article.

---

## §5 — First-article overhead inventory

Per `feedback_metric_vs_gate_discipline.md` — first-article overhead is STRUCTURAL not failure. Expected drift indicator fires on first 3-5 articles per type; sustained-cadence convergence by article 5-7. The overhead inventory below names where the first-article cost concentrates.

### §5.1 — Voice calibration overhead (P3 Authoring)

**Story type:** All NARRATIVE Mayor-first articles  
**First-article cost:** +20-35 min Mayor voice-overlay (50-65% rewrite ratio)  
**Sustained-cadence cost:** +5-10 min Mayor voice-overlay (15-25% rewrite ratio)  
**Convergence:** Article 5-7 per type; Claude learns Mayor's institutional voice via voice anchors + prior article patterns  
**Drift indicator:** #12 Claude-context drift (out-of-register frequently)

### §5.2 — Multimedia composition learning curve (P4 Multimedia)

**Story type:** All articles with Heavy multimedia weight (lighthouse pieces; #8 / #10 / #11)  
**First-article cost:** +15-30 min — Firefly prompt iteration + cartography canvas readiness check + IPTC verification  
**Sustained-cadence cost:** +5-10 min — multimedia composition recipes operationalized; tool muscle memory developed  
**Convergence:** Article 3-5 per multimedia type  
**Drift indicator:** #10 Tool friction signal

### §5.3 — Quality gate calibration (P5 Quality gates)

**Story type:** All articles (G3 Apple-cohesion test particularly)  
**First-article cost:** +10-20 min — calibrating "what counts as voice slip" + "what counts as Apple-cohesion fail" + occasional Phase 4 redo cost  
**Sustained-cadence cost:** +3-5 min — gestalt-test muscle developed; rare Phase 4 redos  
**Convergence:** Article 5-10 (gestalt-test takes longer to calibrate than voice)  
**Drift indicator:** #8 Apple-cohesion gestalt fail

### §5.4 — Automation readiness gap (P2 / P4 / P6)

**Story type:** All articles affected; META most impacted (P2 source-gathering + P6 crossfire)  
**First-article cost:** +15-90 min depending on which A1-A18 are live at W5  
**Sustained-cadence cost:** 0 once Stream 4 fully implements + Stream 1 components ready  
**Convergence:** Per Stream 4 implementation gates (likely Wave 2-4 per master plan §4)  
**Drift indicator:** #1 Daily time-budget exceeds 2.5hr; #5 Crossfire variant generation >20 min

### §5.5 — Component implementation gap (P4 / P6)

**Story type:** Lighthouse pieces + heavy multimedia articles  
**First-article cost:** +10-40 min if cartography canvas / DldsPanel / CrossfireShowcase / AudioEmbed components not W3-ready  
**Sustained-cadence cost:** 0 once Stream 1 component implementation complete  
**Convergence:** Per Stream 1 component implementation gates (Wave 3 per master plan §4)  
**Drift indicator:** #6 DLDS provenance rendering issues; #10 Tool friction

### §5.6 — LinkedIn institutional-voice calibration (P6 Crossfire)

**Story type:** All articles with LinkedIn long-form variant (Mon NARRATIVE + Mayor-direction + lighthouse pieces)  
**First-article cost:** +10-15 min Mayor manual LinkedIn compose (matching institutional voice for LinkedIn audience)  
**Sustained-cadence cost:** +3-5 min  
**Convergence:** Article 3-5 LinkedIn-published  
**Drift indicator:** None (variant-specific calibration; not a drift signal)

---

## §6 — Pre-W5 readiness checks

Per Stream 5 → W5 first-article authoring handoff. Recommend these checks fire before W5 dispatch to surface friction-fallback patterns.

### §6.1 — In-stack tool auth readiness

| Tool | Auth status to verify | Mayor action if not ready |
|---|---|---|
| Recraft Basic | API key + $10/mo subscription active | Activate subscription; generate API key; store in Doppler (in-scope-excluded per ledger E1) |
| Ideogram Basic | Account + $7/mo subscription active | Activate subscription |
| Adobe Firefly (via CC Pro) | Adobe CC Pro subscription active + Firefly access verified | Confirm CC Pro subscription per Prime budget |
| Pika Standard | Account + $8/mo subscription active | Activate subscription |
| Runway Standard | Account + $12/mo subscription active | Activate subscription |
| Snagit | $62.99 perpetual license purchased | Purchase once |
| Mux developer | Account + API key | Free tier signup; API key in Doppler |
| Cloudflare R2 | Account + bucket + API key | Free tier signup (Prime budget) |
| Beehiiv Launch (Free) | Account + DISpatch publication created | Create publication; configure send-time pref |
| Plausible | Account + [redacted-host] domain added | $9/mo Personal tier; add domain |
| Vale.sh | `.vale.ini` + DLDS lane-schema rules configured | Stream 4 or Stream 1 configures pre-W5 |
| Sanity Free | Account + project + dataset created | Free tier signup; project initialized |
| Common Room | Account + integrations connected | Free tier signup; connect Bluesky / Hashnode / Dev.to |
| LinkedIn (Mayor personal) | Profile active + LinkedIn API app registered (for draft creation) | Mayor's personal profile; API app for A11 draft creation |
| Hashnode | Account + DISpatch publication created + REST API key | Free tier; create publication |
| Dev.to | Account + REST API key | Free tier; API key in Doppler |
| Bluesky | Account + AT Protocol auth token | Mayor's personal account; auth via OAuth |
| Mastodon | Account on chosen instance + REST/OAuth2 token | Mayor's personal account |

### §6.2 — Component readiness

| Component | Status to verify | Fallback if not W3-ready at W5 |
|---|---|---|
| DldsPanel (#7 CD4) | Astro component implemented + reads frontmatter ai_role + lane_schema + C2PA chain | Static SVG/HTML provenance band; manual ai_role text per article |
| CodeBlock+CopyButton (#6 CD4) | Astro component + Shiki integration | Plain Markdown fenced code blocks (no copy button); minor degradation |
| CodeDiff (#27 CD7 NEW) | Shiki + diff2html composite component | Static screenshot of diff (Snagit) |
| tldraw integration | Diagram authoring → PNG export pipeline | Mermaid OR Excalidraw fallback |
| ImageWithCaption (#24 CD7 NEW) | Astro component with caption + alt-text | Plain `<img>` + figcaption |
| ImageGallery (#25 CD7 NEW) | PhotoSwipe lightbox + multi-shot composition | Static image grid |
| VideoEmbed (#22 CD7 NEW) | Mux player + adaptive bitrate | Native HTML5 video element |
| AudioEmbed (#23 CD7 NEW) | Wavesurfer.js / Howler.js composite | Native HTML5 audio element |
| CartographyCanvas (#12 CD4) | Cartography canvas component | Static SVG/PNG cartography frame |
| InstitutionalFixture (#11 CD4) | Component renders Paradiso seed-mandate | Static SVG fixture |
| CrossfireShowcase (#21 CD7 NEW) | Per-article facade + site-wide gallery + tentpole sub-page | Static social-share buttons; no per-article facade |
| DataViz (#29 CD7 NEW) | Observable Plot + D3 + Vega-Lite composite | Static SVG export from Observable Plot |
| Scrollytelling (#30 CD7 NEW) | Scrollama + Motion v12 + GSAP | Static linear narrative (no scroll trigger) |
| ComparisonSlider (#31 CD7 NEW) | react-compare-slider | Static side-by-side images |
| LiveTicker (#15 CD4) | Continuous activity surfacing component | Static "this week" sidebar list |
| ChapterRail (#3 CD4) | Article navigation rail | Static TOC list |
| ReceptionHero (#13 CD4) | Homepage hero rotating Monday feature | Static featured-article card |
| EditorialDigest (#14 CD4) | Weekly-list assembly component | Static manually-curated list |
| VirgilChat (#19 CD4) | Inferno-guide chat interface | Deferred to V1.5+ (production opt-in per master plan §11 Q8) |

### §6.3 — Automation readiness

| Automation | Stream | Status to verify | Fallback if not live at W5 |
|---|---|---|---|
| A1 Notion calendar daily-entry surfacing | Stream 4 | n8n flow + Slack DM | Mayor opens Notion manually |
| A2 LiveTicker overnight aggregator | Stream 4 | n8n flow + git CLI | Mayor manually runs git log |
| A3 META source fetcher | Stream 4 | n8n flow + git/Linear/Notion APIs | Mayor manually pulls sources |
| A4 NARRATIVE conversation searcher | Stream 4 | n8n + Claude API + indexed log | Mayor manually searches |
| A5 Vale.sh pre-commit DLDS | Stream 1 | git pre-commit hook + .vale.ini | Mayor manually runs vale CLI |
| A6 Astro Zod schema | Stream 1 | Astro Content Layer + Zod schemas | Astro build errors surface manually |
| A7 Per-platform variant generator | Stream 4 | n8n + Sharp/ffmpeg + Recraft API | Mayor manually generates variants |
| A8 IPTC 2025.1 embedder | Stream 4 | n8n + exiftool | Mayor manually runs exiftool |
| A9 G4 render-check | Stream 4 | n8n + Puppeteer + @contentauth/c2pa | Mayor manually inspects preview |
| A10 G1 final pass | Stream 1/4 | Vale.sh CLI | Mayor manually runs vale |
| A11 14-platform scheduler | Stream 4 | n8n master flow | Mayor manually publishes each platform |
| A12 canonical_url enforcer | Stream 4 | n8n validation inline | Mayor manually checks per platform |
| A13 Notion status auto-transition | Stream 4 | n8n + Notion API | Mayor manually updates status |
| A14 Engagement signals aggregator | Stream 4 | n8n + per-platform APIs + Notion | Mayor manually checks platforms |
| A15 Friday drift review | Stream 4 | n8n + Notion API | Mayor manually queries DB |
| A16 SaaS upgrade-curve monitor | Stream 4 | n8n + per-vendor APIs | Mayor manually checks each vendor monthly |
| A17 Langfuse LLM cost monitor | Stream 2/3 | Langfuse self-host + LiteLLM | Anthropic dashboard manual check |
| A18 SigNoz/Sentry telemetry | Stream 2/3 | OpenTelemetry + SigNoz + Sentry | Sentry alerts (free tier) |

---

## §7 — Calibration cycle recommendations

### §7.1 — First-article authoring per type — Mayor +100% time-budget overhead

Per `feedback_metric_vs_gate_discipline.md` per-deliverable gate. First article per story type:
- Budget 2x story-type target (~30-60 min META; ~150-300 min NARRATIVE long-form; ~50-80 min retrospective)
- Drift indicator #1 will fire — expected and documented; NOT amendment trigger on first article per type
- Mayor records actual time in Notion entry Time-budget actual field; feeds §5.X overhead inventory refinement

### §7.2 — First-three-articles per AI-multiplier mode — voice calibration cycle

| Mode | First-three-articles task | Convergence target |
|---|---|---|
| Mayor-first | Mayor records voice-overlay rewrite % per article; pattern Claude's expansion biases (verbosity / register slip / thesis introduction) | Article 3-5: <30% rewrite |
| Claude-first | Mayor records {{verify}} marker count per article; pattern source-bundle gaps; refine A3 source-gathering | Article 3-5: <3 markers per article |
| Transcript-first | Mayor records arc-proposal accuracy per article; refine A4 semantic ranking prompts | Article 3-5: 1-of-5 proposals selected without arc override |
| Summary-first | Mayor records mechanical-summary accuracy; pattern Claude's editorializing tendency | Article 3-5: zero editorializing flags |

### §7.3 — First lighthouse piece per story type — multimedia composition calibration

| Lighthouse | Multimedia weight | First-article multimedia overhead |
|---|---|---|
| L1 Canon-genesis | Heavy (code-diff hero + cartography + gallery + sonic-logo) | +30-50 min vs sustained-cadence target; component readiness substantial blocker |
| L24 Mayor-direction | Heavy (painterly cover + cartography + InstitutionalFixture + sonic-logo) | +30-50 min |
| L19 Crossfire reveal | Heavy (CrossfireShowcase demo + comparison-slider + tldraw) | +25-40 min; CrossfireShowcase Shape B critical |
| L2 DLDS paradigm | Medium (DldsPanel demo + comparison-slider + diagram) | +15-25 min |
| L8 Sonic-system v0 | Heavy (AudioEmbed waveform + ambient + transcript + image-gallery) | +25-40 min; AudioEmbed component critical |

### §7.4 — First-month sustained-cadence convergence target

| Metric | Week 1 target | Week 4 target |
|---|---|---|
| Drift indicator #1 (>2.5hr daily) fires | Expected on lighthouse pieces; expected first article per type | Should fire on <1 article per week |
| Drift indicator #12 (Claude register drift) fires | Expected on first 3 Mayor-first articles | Should not fire by Week 4 |
| Drift indicator #5 (crossfire >20 min) fires | Expected on first 3-5 articles | Should not fire by Week 4 (assumes A11 live by then) |
| Drift indicator #8 (Apple-cohesion fail) fires | Expected on 30-50% of articles | Should fire on <10% of articles by Week 4 |
| Weekend dark compliance | 1-2 weekend dark commitments held | All 4 weekends dark |
| Sustained-cadence convergence (article 5-7 per type) | Article 1-2 per type complete | Article 4-6 per type complete; convergence visible |

### §7.5 — Drift amendment trigger (post-calibration)

Per pipeline-runbook.md §9 — drift amendment routing fires when:
- Drift indicator persists past calibration cycle (article 7 per type)
- Time-budget overrun on >20% of week's output past Week 4
- Quality gate failures on >20% of week's output past Week 4
- Weekend dark broken >2 weekends in any month past Week 4

Amendment routing per `feedback_documentation_lifecycle.md` four-verb vocabulary — runbook + recipes + spec amend per Section 12 amendment process with Mayor adjudication.

---

## §8 — Cross-references

| Section | Target |
|---|---|
| §1 universal calibration concept | editorial-calendar.md §3 sustainability discipline + `feedback_metric_vs_gate_discipline.md` |
| §2-§4 dry-run scenarios | story-types-catalog.md §2 (story-type spec) + first-six-months-slate.md §2 lighthouse-arc + pipeline-runbook.md §4 per-story-type workflows |
| §5 first-article overhead inventory | pipeline-runbook.md §9 drift indicators inventory + `feedback_metric_vs_gate_discipline.md` |
| §6 pre-W5 readiness checks | budget ledger v0.1 §3.2 in-stack picks + components.md + components-multimedia.md + automation-requirements.md §3 |
| §7 calibration cycle recommendations | first-six-months-slate.md §5 refinement gates + `feedback_documentation_lifecycle.md` |

---

## §9 — Forward pointers

- **W5 first-article authoring** — Stream 5 surfaces validation evidence; Mayor adjudicates calibration cycle per §7 recommendations; drift indicators populate Notion entries per pipeline-runbook §9
- **Stream 1 component implementation tracking** — §6.2 component readiness checklist guides W3 Stream 1 priorities; CrossfireShowcase + DldsPanel + cartography canvas highest priority for lighthouse pieces
- **Stream 4 automation implementation tracking** — §6.3 automation readiness checklist guides Stream 4 priorities; A3 + A7 + A11 highest priority for sustained cadence
- **V1.5+ refinement** — calibration evidence aggregates per content-cycle review; amendments append per `feedback_documentation_lifecycle.md`

---

## §10 — Standing-history pointers

- Pipeline runbook: `representation/content/pipeline-runbook.md` (W1 Stream-5 2026-05-11)
- Multimedia recipes: `representation/content/multimedia-recipes.md` (W1 Stream-5 2026-05-11)
- Notion content calendar template: `representation/content/notion-calendar-template.md` (W1 Stream-5 2026-05-11)
- Automation requirements: `cc-ledger/stream-5/automation-requirements.md` (W1 Stream-5 2026-05-11)
- Editorial calendar: `representation/content/editorial-calendar.md` (W1 CD7 RATIFIED)
- Story types catalog: `representation/content/story-types-catalog.md` (W1 CD7 RATIFIED)
- First-six-months slate: `representation/content/first-six-months-slate.md` (W1 CD7 RATIFIED)
- Budget ledger v0.1: `cc-ledger/dispatches/W1/2026-05-09_microsite-stack-budget-ledger-v0.md`

---

*Time-budget reality validation v0 authored 2026-05-11 W1 Stream-5. Theoretical dry-run of META + NARRATIVE long-form + Friday retrospective; first-article overhead inventory; pre-W5 readiness checks; calibration cycle recommendations. Real evidence fires at W5 first-article authoring. Refinable per W5+ evidence per `feedback_metric_vs_gate_discipline.md` per-deliverable gate.*
