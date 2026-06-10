---artifact: cd7-audience-engagement-model
authored: W1 Stream-A CD7 (PCP-167)
authored-date: 2026-05-09
status: active
authority: mayor
  - Mayor: full CD7 cycle authority delegated 2026-05-09; traction-V1 posture locked (free content; first many months; goal = name in AI-developer space + Prime project promotion)
  - CC5: synthesis + authoring per Mayor directive
  - master plan §1.5 distribution from V0 + §1.2 multipurpose-platform + §1.4.1 AI-friendly markup for AEO
upstream-cascade:
  - cd7-content-strategy-brief.md (parent dispatch)
  - cd7-content-pipeline-stack.md §11 council consensus
  - editorial-calendar.md (W1 CD7)
  - story-types-catalog.md (W1 CD7)
  - multimedia-audit.md (W1 CD7)
  - components-multimedia.md (W1 CD7) §3.1 CrossfireShowcase
  - master-plan.md v1.0.9 §1.5 distribution + §3.C 14-platform reshape table
downstream-blocks:
  - W3 component layer (CrossfireShowcase + community + analytics components)
  - W5 microsite Astro implementation (subscribe path / cross-post discoverability / DLDS provenance)
  - W6 distribution layer (n8n cross-post adapter flows + Croissant + LinkedIn manual)
  - V1.5+ engagement-depth features (Virgil chat / LiveRoom / gamified affordances / accounts / comments)
discipline-references:
  - feedback_decouple_scope_from_ambition.md (visitor-attraction at v0; engagement-depth at v0.1+)
  - feedback_metric_vs_gate_discipline.md (gates not targets; engagement-rate as visibility signal NOT optimization target)
  - feedback_concept_first_examples_prove_muted_language.md
  - feedback_brand_track_dlds_locked.md (DLDS three-layer; AI-disclosure compliance)
  - feedback_per_building_brand_certification_gate.md
gate-criterion: subscribe path operational at V1 + cross-post discoverability operational + DLDS provenance band visible per article + canonical_url discipline non-negotiable per master plan §1.5
title: DISpatch — Audience-Engagement Model
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
---

# DISpatch — Audience-Engagement Model

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + Mayor 2026-05-09:

- **Concept-first.** Universal audience-engagement concepts cited first; reference platforms (Substack / Beehiiv / IndieWeb POSSE / Stratechery / Hashnode / Dev.to / LinkedIn 2026 engagement data) cited as PROOF examples; non-prescriptive for future Buildings.
- **Muted technical language** for unrefined positioning (specific per-platform variant fidelity / engagement-rate signal interpretation) until W5+ first-article evidence surfaces.
- **No "avoid" / "NOT" / "anti-pattern" register-prescription framing** — alternative engagement models (paid-tier / member-only / community-walled) prove different concepts at world-class scale and serve different surface needs.
- **Engagement-rate is a visibility signal, NOT an optimization target.** Per `feedback_metric_vs_gate_discipline.md` (Goodhart's Law) — engagement metrics validate the format works for the audience tier; they do NOT constitute a number to hit.

---

## §1 — Universal audience-engagement concept

**Unknown-brand traction climbs through three structural mechanisms simultaneously: discoverability (where the brand surfaces) + amplification (how content multiplies reach) + community (who finds and stays for the work).** For DISpatch in V1 traction posture (free content; first many months; goal = name in AI-developer space + Prime project promotion), the engagement model is the structural traction engine, not a conversion funnel.

**Examples that prove the concept at world-class scale:**

- **Stratechery (Ben Thompson)** — long-form free articles + cross-post discoverability + LinkedIn long-form syndication + audience-built-over-decade through quality + cadence consistency
- **Bytes by ByteByteGo** — newsletter-first traction + dev-platform syndication + LinkedIn personal-profile leveraging
- **The Pudding** — visual-led discoverability via cross-post + social showcasing of designed-objects + per-article-as-its-own-discovery-event
- **IndieWeb POSSE pattern** — publish on own site + syndicate elsewhere (Hashnode `originalArticleURL`, Dev.to `canonical_url`) drives 30% organic traffic uplift through structural canonical discipline

**Prime's expression — multi-tier audience model + crossfire mechanism + DLDS-compliant content + traction-amplifier flywheel.** Each tier targets a distinct audience graph; crossfire mechanism amplifies discoverability at structural scale; DLDS provenance compliance positions Prime as 2026-frontier-aligned (EU AI Act August 2 2026 readiness); flywheel components (newsletter referrals + comments + analytics + earned media) compound traction.

---

## §2 — Multi-tier audience model

### §2.1 — Tier 1 — Dev / AI-builder primary (daily cadence target)

**Audience graph:** developers + AI-builders + technical founders + dev-curious citizens. Where this graph LIVES (where engagement-on-platform matters):

| Platform | Engagement role | Content shape | Hook convention |
|---|---|---|---|
| **Microsite (canonical)** | Source-of-truth surface; SEO + AEO discoverability anchor; DLDS provenance band visible | Long-form + multimedia + Astro Server Islands per master plan §3.B | Title slot Vollkorn Display; subtitle italic standfirst (NARRATIVE) or compressed metadata band (META) |
| **Beehiiv (newsletter, FREE tier)** | Subscriber list growth flywheel; weekly digest + monthly long-form lead | Block JSON content per master plan §3.C; multimedia native | newsletterExcerpt (≤500 chars; pre-authored at write-time) |
| **LinkedIn (Mayor personal profile)** | Tier-1 + Tier-2 cross-cut; transparent-metrics + product-development-process content; Documents (PDF carousels) | Long-form posts (700+ chars) + Documents (carousel PDFs) + native video; **personal profile, NOT company page** (3x engagement per Subagent 4 evidence) | linkedinHook (≤700 chars; pre-authored institutional explanation register) |
| **Hashnode** | Dev-blog cross-post; canonical_url discipline; tag strategy per Hashnode's engagement model | Markdown export from Astro; `originalArticleURL` mandatory | Title + subtitle + tags + cover image |
| **Dev.to** | Dev-blog cross-post; canonical_url discipline; community tag conventions | Markdown export from Astro; `canonical_url` in frontmatter | Title + subtitle + tags + cover image |
| **Bluesky** | Dev-graph traction + AT Protocol forward-arc + 5,000 writes/hour API enables crossfire automation | Posts ≤300 chars + thread continuations + image attachments | socialHook (≤280 chars; literary opening line for NARRATIVE; compressed claim for META) |
| **Hacker News (strategic)** | Selective principal-grade pieces only; high-traffic spike when it lands | Manual submit per Mayor + Linear-task queue per master plan §1.5 | Title is the hook; URL submission |

### §2.2 — Tier 2 — Broader creative / founder / citizen secondary (best-effort cadence)

**Audience graph:** broader creative + founder + designer + future Prime citizens. Where this graph LIVES:

| Platform | Engagement role | Content shape | Hook convention |
|---|---|---|---|
| **Threads (Meta family)** | Tech audience growing; ActivityPub federation forward-arc | Posts ≤500 chars + image attachments | socialHook; Threads-native phrasing |
| **Mastodon (Fediverse)** | Tech-leaning instances; sovereignty-respecting audience | Posts ≤500 chars + image attachments | socialHook; Mastodon-native phrasing |
| **Bluesky (Tier-2 leverage as well)** | Broader creative graph beyond dev tribe; principal-grade discoverability | Same as Tier-1 Bluesky | socialHook |
| **Reddit** | r/programming / r/webdev / r/MachineLearning / r/ChatGPT engagement; manual per-sub relevance | Per-sub conventions vary; native-format posting per sub-rule | Per-sub Title + body conventions |
| **Instagram (Reels-format only when video exists)** | Visual-led + Reels-format leverage; broader creative audience | 9:16 Reels via Pika video generation; static carousel via Recraft per-platform aspect-variant | socialHook (≤280) + Reels-native engagement hooks |

### §2.3 — Tier 3 — strategic / selective (per-content-fit; not daily)

| Platform | Engagement role | When |
|---|---|---|
| **Hacker News** | Principal-grade depth submissions | Per-content fit; post-mortems / infrastructure-decisions / philosophical posts on AI / agents |
| **daily.dev** | Microsite RSS auto-ingest | One-time submit; passive ongoing |
| **Specific tech newsletters** (Bytes / TLDR / Refind / etc.) | Earned newsletter-feature | Earned media / pitch-based |

---

## §3 — Crossfire mechanism (the V1 traction multiplier)

Per `cd7-content-pipeline-stack.md` §3.1 + `components-multimedia.md` #21 CrossfireShowcase. **CrossfireShowcase replaces traditional social-share buttons with multi-platform preview-card UX** (Pentagram-positioning move; no shipped exemplar at principal grade — DISpatch defines the pattern).

### §3.1 — Three composition shapes

| Shape | Surface | When |
|---|---|---|
| **Shape A — Per-article facade row** | Article-foot on every article | Default; cached OG thumbnails (NOT live iframes); 5-7 platform tiles + outbound link to platform-native version. THE traction multiplier reader-side. |
| **Shape B — Per-article tentpole sub-page** | `/dispatch/<slug>/crossfire` for marquee articles only | 2-4 per quarter; full-fidelity preview-renders with platform-shape variants + annotation callouts; Pudding-grade designed-object register |
| **Shape C — Site-wide gallery** | `/crossfire` (linked from main nav) | Always-on; latest N articles' multi-platform spread; filterable by platform / topic; brand-claim asset for unknown-brand discoverability |

### §3.2 — Why this drives traction (vs. traditional social-share buttons)

**Traditional pattern failure mode:** social-share buttons drive users to compose-a-tweet workflows that have near-zero social capital cost benefit; 60% of CSS-Tricks readers report never using custom share buttons; share-buttons are dying.

**Crossfire pattern advantage:**

- **Reader where-the-graph-lives signal** — reader clicks "view on platform X" because their existing engagement social-graph already lives there (likes / follows / notifications)
- **Native-engagement multiplier** — 2026 platform engagement shifted +45% YoY toward shares + private DM-forwards + native-platform actions (Buffer 2026 evidence) and away from comments / external-website-share buttons
- **POSSE pattern made visible** — IndieWeb's "publish on own site, syndicate elsewhere" amplification shape rendered as a visible UX claim
- **Brand-claim asset** — `/crossfire` gallery is the visible proof "this newcomer ships disciplined content across 7 platforms — every story, every week"

### §3.3 — Implementation discipline (per cd7-content-pipeline-stack.md §11)

- **Cached OG thumbnails (build-time fetch + 24h cache); NOT live iframes** — sidesteps Mastodon v4.3 multi-embed bug + Meta oEmbed Read app-review gate + LinkedIn one-at-a-time embed quirk + 5-iframe-INP-regression risk
- **Click-to-hydrate optional** — defer to v0.1+ if/when live preview-cards earn place (e.g., engagement-attribution proves the live mode warranted)
- **Mobile-friendly** — 5 cards don't fit; collapsed-by-default with expand interaction is the only viable mobile shape
- **Accessibility** — each card = single focusable link (NOT nested controls); `aria-labelledby` to platform + post title; visible focus ring; tab order left-to-right matches DOM
- **Stale-link rot mitigation** — automated link-checker (daily cron); broken-link monitoring; degrade gracefully to "View on [Platform]" link if cached OG returns 404

---

## §4 — V0 vs V0.1+ scope split

Per `feedback_decouple_scope_from_ambition.md`: visitor-attraction at v0; visitor-engagement-depth at v0.1+. Lofty future-month engagement-depth features do NOT expand v0 scope.

### §4.1 — V0 (V1 launch) — visitor-attraction

| Feature | Tier |
|---|---|
| **Subscribe path** | In stack — Beehiiv FREE tier ≤2,500 subs; subscribe form on microsite + per-article footer |
| **Cross-post discoverability** | In stack — CrossfireShowcase (Shape A facade + Shape C gallery; Shape B tentpoles 2-4/quarter) |
| **DLDS provenance band** | In stack — DldsPanel (#7 CD4) renders C2PA + IPTC 2025.1 + Vale.sh-validated lane per article |
| **RSS feed** | In stack — Astro built-in RSS; podcast-app-friendly + daily.dev auto-ingest target |
| **AI-friendly markup** | In stack per master plan §1.4.1 — `llms.txt` + `llms-full.txt` + JSON-LD Entity Authority graphs with `sameAs` to Wikidata + GitHub + HTTP Content Negotiation edge worker (90-99.6% token reduction for AI agents) |
| **Comments at v0** | In stack — Giscus (GitHub Discussions backend; OSS) — AI-developer audience already on GitHub; principal-grade dev sites use it |
| **Newsletter referral flywheel** | In stack — SparkLoop recommendation network (free; recommend-others + earn-from-being-recommended); referral program $99/mo deferred to v0.1+ per pipeline-stack §11 SparkLoop split |
| **Brand-monitoring + community CRM** | In stack — Common Room free tier (≤10K contacts); identifies advocates across Hashnode + Dev.to + Bluesky + GitHub |
| **Earned-media surface** | In stack — Featured.com / Connectively (HARO successors; free tier) — connect with AI-tech journalists looking for sources |

### §4.2 — V0.1+ (post-launch) — visitor-engagement-depth

| Feature | Status |
|---|---|
| **Virgil chat fully functional** | DEFERRED — production opt-in per master plan §11 Q8; CD4 #19 component scaffold ready; activates per Mayor's first-AI-voice-use-case decision |
| **LiveRoom multi-author presence** | DEFERRED — production opt-in per master plan §11 Q8; CD4 #20 component scaffold ready; activates when multi-author / live-coworking sessions warrant |
| **Gamified affordances** | DEFERRED — engagement-depth feature; activates post-traction milestones |
| **User accounts** | DEFERRED — engagement-depth feature; activates when accounts unlock something readers want (e.g., personal annotations / saved articles / cross-device sync) |
| **Comment systems beyond Giscus** | DEFERRED — Giscus covers v0; revival = need richer engagement than GitHub Discussions provides |
| **Live oEmbed iframes (CrossfireShowcase Shape A live mode)** | DEFERRED — facade pattern is sufficient at v0; revival = aggregate platform-API stability + engagement-attribution proves live-mode warranted |
| **SparkLoop referral program ($99/mo Solo Creator tier)** | DEFERRED — revival condition = 1,000+ active subscribers + content-market fit + measurable referral conversion rate |
| **Surfer SEO ($99/mo Essential tier)** | DEFERRED — revival condition = >200 tracked pages OR multi-site SEO need OR dedicated SEO operator |

---

## §5 — Traction-amplifier flywheel (engagement infrastructure)

Per `cd7-content-pipeline-stack.md` §5.4-§5.11 + Mayor's directive that pricing is Stream F territory.

### §5.1 — Analytics + traction measurement

**Plausible Analytics (in stack)** — privacy-friendly; lightweight; UTM-tagged outbound for crossfire-attribution; supplements Beehiiv built-in newsletter analytics + Cloudflare Web Analytics (post-Astro acquisition).

**Engagement signals** as visibility-validators (NOT targets):

- LinkedIn 2026 baseline: avg 5.20% (+8% YoY); Documents 7.00% (+14% YoY); SaaS founder transparent metrics +47%; product-development process +3.4x vs third-party. **Validates dev-diary thesis structurally.**
- Bluesky 5,000 writes/hour API > Threads 250/24hrs — Bluesky structurally favors automation at solo-dev × daily-cadence × crossfire scale
- Cross-post syndication ROI per master plan §1.5 (DasRoot +300% / Substack +45%) UNVERIFIED in 2026-05-09 Round-2 validation; treat as directional not specific

### §5.2 — Community-CRM (advocate identification)

**Common Room (in stack; free tier)** — tracks who engages across Hashnode + Dev.to + Bluesky + GitHub + Discord; identifies advocates; signals when advocates accumulate to warrant deeper engagement (e.g., direct-DM + thank-you + early access).

Pairs with Giscus (GitHub Discussions surfaced as comments on microsite) for read-side engagement traction.

### §5.3 — Newsletter growth flywheel

**SparkLoop recommendation network (free; in stack)** — recommend other newsletters; get recommended by other newsletters; co-reg model multiplies free-tier Beehiiv growth at $0 entry cost.

**Beehiiv Boosts (free; built-in)** — Beehiiv's recommendation/ad network surfaces.

Referral-program tier ($99/mo SparkLoop Solo Creator) DEFERRED to v0.1+ per pipeline-stack §11.

### §5.4 — SEO + AEO (Agentic Engine Optimization)

**NeuronWriter (in stack per Mayor adjudication)** — AI content optimization for solo-dev traction posture; pairs with foundational AEO layer (`llms.txt` + JSON-LD Entity Authority graphs + HTTP Content Negotiation edge worker per master plan §1.4.1).

Surfer SEO DEFERRED with revival condition = >200 tracked pages.

### §5.5 — Earned media + PR

**Featured.com OR Connectively (in stack; free tier)** — connect with AI-tech journalists looking for sources on stories. Mayor as quotable expert builds the name asymmetrically.

---

## §6 — Per-day distribution discipline (cross-ref editorial-calendar.md §4)

Per editorial-calendar.md §4.1 per-day crossfire spread + §4.2 canonical_url discipline.

**Canonical URL non-negotiable:** every secondary platform publish includes `canonical_url` (Dev.to) / `originalArticleURL` (Hashnode) / `canonicalUrl` (Medium) referencing the microsite URL. n8n workflow validates structurally; Vale.sh + DLDS lint at write-time.

**Pre-authored hooks > AI reshape** per master plan §1.5: article schema's `distribution.socialHook` (≤280) / `linkedinHook` (≤700) / `newsletterExcerpt` (≤500) authored at write-time; AI reshape (n8n + Claude API) is fallback only.

**Hook conventions per platform** (currently inclined; refines at W5):

| Platform | Hook shape |
|---|---|
| LinkedIn | 700-char institutional explanation register; `<one-paragraph-context>. <one-paragraph-what-we-did>. <one-line-outcome>.` |
| X / Bluesky | 280-char compressed claim (META) OR literary opening line (NARRATIVE); `<verb> the <thing> — <one-line-outcome>. <one-line-context>.` |
| Threads / Mastodon | 500-char native phrasing per platform |
| Beehiiv newsletter | 500-char data-forward summary (META) OR atmospheric scene-set (NARRATIVE) |
| Hashnode / Dev.to | Title + subtitle + tags + cover image (driven by article frontmatter) |

---

## §7 — DLDS / EU AI Act August 2 2026 alignment

Per `feedback_brand_track_dlds_locked.md` + master plan §1.4.1 + cd7-content-pipeline-stack.md §6.1.

### §7.1 — Required compliance per article

- **C2PA content credentials** auto-embedded by Adobe Firefly (illustration / image generation); auto-applied by LinkedIn as "cr" watermark when present
- **DLDS YAML lane declaration** in article frontmatter (per `feedback_brand_track_dlds_locked.md`)
- **Vale.sh + DLDS lint at write-time** validates register fidelity + lane attribution
- **IPTC 2025.1 photo metadata** for photographs (industry-standard provenance layer)
- **Meta family disclosure** (FB / IG / Threads) — manual disclosure label tool for organic content with photorealistic AI video/audio (cross-post variant authoring)
- **DldsPanel (#7 CD4) extended at W3** — reads C2PA via `@contentauth/c2pa` JS; renders visible provenance band per article

### §7.2 — Prime's positioning

DISpatch's existing brand discipline (DLDS three-layer; lane-schema; voice fidelity) **structurally pre-positions Prime for the August 2 2026 EU AI Act regulatory deadline** at $0 incremental cost. This is a 2026-frontier-aligned positioning advantage — Prime ships a brand discipline that other AI-platform Buildings will be retrofitting.

---

## §8 — Cross-references

| Section | Target |
|---|---|
| §1 universal concept | thesis-statement.md §5 Apple-cohesion-test framing |
| §2 multi-tier audience | editorial-calendar.md §4 per-day crossfire spread + master plan §1.5 14-platform reshape |
| §3 crossfire mechanism | cd7-content-pipeline-stack.md §3.1 CrossfireShowcase + components-multimedia.md #21 |
| §4 v0 vs v0.1+ | feedback_decouple_scope_from_ambition.md + master plan §1.7 reframe 2.3 don't-discard |
| §5 traction-amplifier flywheel | cd7-content-pipeline-stack.md §5.4-§5.11 |
| §6 per-day distribution | editorial-calendar.md §4 + master plan §3.C 14-platform reshape table |
| §7 DLDS / EU AI Act | feedback_brand_track_dlds_locked.md + master plan §1.4.1 + EU AI Act August 2 2026 |
| Forward-arc V1.5+ | first-six-months-slate.md (concrete story slate against this engagement model) |

---

## §9 — Forward pointers

- **W3** — engagement-infrastructure components (Plausible analytics integration + Giscus comments + Common Room CRM webhook + SparkLoop recommendation embed) wire at component layer
- **W5** — first-article subscribe path operational + first cross-post round-trip + first DLDS provenance band visible at canonical surface
- **W6** — distribution layer cross-post adapter flows + Croissant integration for social-trio + LinkedIn manual native-format publishing + canonical_url discipline structurally validated
- **W7+** — engagement-depth features (Virgil chat / LiveRoom / accounts) revive per `feedback_decouple_scope_from_ambition.md` v0.1+ activation gates + traction milestones
- **V1.5+** — engagement model refinable per traction evidence; new platforms append per master plan §3.C 14-platform table evolution; deferred features revive per their named revival conditions

---

## §10 — Standing-history pointers

- Pipeline stack: `cc-ledger/dispatches/W1/cd7-content-pipeline-stack.md` (W1 CD7 §11 council consensus)
- Editorial calendar: `representation/content/editorial-calendar.md` (W1 CD7)
- Story types catalog: `representation/content/story-types-catalog.md` (W1 CD7)
- Multimedia audit: `representation/content/multimedia-audit.md` (W1 CD7)
- Components multimedia: `representation/visual-system/components-multimedia.md` (W1 CD7)
- Master plan: `plans/master-plan.md` v1.0.9 §1.5 distribution + §3.C 14-platform + §1.4.1 AI-friendly markup + §1.2 multipurpose-platform
- DLDS paradigm: `feedback_brand_track_dlds_locked.md` + EU AI Act August 2 2026

---

*Audience-engagement model v0 RATIFIED W1 Stream-A CD7 2026-05-09. V1 traction posture — free content; first many months; goal = name in AI-developer space + Prime project promotion. CrossfireShowcase as structural traction multiplier; multi-tier audience model + DLDS-aligned engagement infrastructure; v0 vs v0.1+ scope split protected per `feedback_decouple_scope_from_ambition.md`. Refinable per W5+ first-article evidence per `feedback_metric_vs_gate_discipline.md` per-deliverable gate.*
