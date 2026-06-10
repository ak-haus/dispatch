---artifact: cd7-multimedia-content-types-audit
authored: W1 Stream-A CD7 (PCP-167)
authored-date: 2026-05-09
status: active
authority: mayor
  - Mayor: full CD7 cycle authority delegated 2026-05-09; tooling adjudications locked
  - CC5: synthesis + authoring per Mayor directive
  - master plan §1.4 multimedia foundational from V0 + §3.A library destinations + §3.C content schema 14-platform
upstream-cascade:
  - cd7-content-strategy-brief.md (parent dispatch)
  - cd7-content-pipeline-stack.md §11 council consensus (Mayor-locked tools per group; pricing in Stream F audit)
  - editorial-calendar.md (cadence per which multimedia surfaces when)
  - story-types-catalog.md (per-story-type multimedia weight)
  - components-multimedia.md (11 NEW components beyond CD4's 20)
  - sonic-system.md (W1 CD6 RATIFIED — sonic integration cross-refs)
  - master-plan.md v1.0.9 §1.4 + §1.5 distribution + §3.C 14-platform reshape
downstream-blocks:
  - W3 multimedia component implementation per §3 mapping
  - W5 first-article multimedia pipeline operational
  - V1.5+ content-cycles (refinement as multimedia-types prove or surface gaps)
discipline-references:
  - feedback_concept_first_examples_prove_muted_language.md
  - feedback_metric_vs_gate_discipline.md
  - feedback_brand_track_dlds_locked.md (DLDS three-layer — YAML + Vale + C2PA/IPTC 2025.1)
  - feedback_tool_evaluation_principles.md (8 principles — composite / specialized / no-trash / 5-dim / 3-tier / cross-platform / principal-grade / AI-integration)
  - feedback_decouple_scope_from_ambition.md
gate-criterion: each multimedia type passes Astro Content Layer + Zod schema validation per master plan §3.C `media[]` discriminated union + DLDS provenance per `feedback_brand_track_dlds_locked.md`
title: DISpatch — Multimedia Content Types Audit
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
---

# DISpatch — Multimedia Content Types Audit

## §0 — Reading discipline

Per master plan §0 C7+C8+C9 + thesis-statement.md §0:

- **Concept-first.** Universal multimedia content concepts cited first; reference platforms (NYT Magazine / The Pudding / Stripe Press / Quanta) cited as PROOF examples; non-prescriptive for future Buildings.
- **Muted technical language** for unrefined positioning (specific media-type frequencies / per-platform variant fidelity) until W5 first-article evidence surfaces.
- **No "avoid" / "NOT" / "anti-pattern" register-prescription framing** — alternative multimedia compositions prove different concepts at world-class scale.
- **Audit is a substrate, not a lockdown.** Refinable per W5+ first-article evidence + V1.5+ content-cycle evidence + AI-disclosure regulatory evolution (EU AI Act August 2 2026 implementation drift).

---

## §1 — Universal multimedia content concept

**Multimedia content carries the work's evidence — not decoration.** Code-blocks prove what shipped; data-viz proves the metrics; photographs prove what was witnessed; audio carries the publication's voice; video shows the agent's behavior. Multimedia is at the schema level (per master plan §1.4), not bolt-on. The publication's multimedia register matches its written register; META content carries META multimedia (code-form heavy, image-form spare); NARRATIVE content carries NARRATIVE multimedia (image-form heavy, audio-form present, code-form rare).

**Examples that prove the concept at world-class scale:**

- **The Pudding** — per-article-as-self-contained-visual-system; multimedia is the article
- **NYT Magazine 2026** — bespoke type + photograph + illustration + occasional embedded video; multimedia density per editorial register
- **Quanta Magazine** — D3-rendered scientific visualizations; multimedia as evidence
- **Stripe Press** — code-block + diagram + occasional video; META-canonical multimedia register
- **The Verge** — heavy multimedia density across daily-cadence; sustainable through tooling discipline

**Prime's expression — 7 multimedia content groups × ~20 multimedia content types operationalizing META × NARRATIVE distinction.** Each multimedia content type cites its use case (which story types from `story-types-catalog.md` use it), cadence (how often it surfaces), component (cross-ref `components-multimedia.md` + CD4 inventory), sonic-system integration where applicable, and register lean.

---

## §2 — Multimedia content types audit (7 groups)

### §2.1 — Code-form group (META primary)

#### 1. Code block (source code)

| Field | Spec |
|---|---|
| **Use case (story types)** | All META: dispatch missive (#1), infrastructure-decision (#2), change-log (#3), post-mortem (#4), tooling adoption (#5), performance investigation (#6) |
| **Cadence** | Per-article on META days (Tue/Thu + most Fri); ~10-15 instances/week aggregate |
| **Component (CD4 + CD7)** | CodeBlock+CopyButton (#6 CD4 — already exists; not new) |
| **Sonic integration** | None |
| **Register** | META |
| **Tooling tier (per pipeline-stack §11)** | In stack: Shiki (build-time syntax highlighting); In consideration: Monaco read-only (high-fidelity); Deferred: Prism / Highlight.js / Starry Night |

#### 2. Code diff

| Field | Spec |
|---|---|
| **Use case** | Change-log (#3), post-mortem (#4), tooling adoption (#5) |
| **Cadence** | When shipped change exists (~3-4x/week) |
| **Component** | CodeDiff (#27 NEW) — Shiki + diff2html composite |
| **Sonic integration** | None |
| **Register** | META |
| **Tooling tier** | In stack: Shiki + diff2html composite; In consideration: Monaco Diff Editor / GitLens-inline / react-diff-viewer-continued; Deferred: Prism / Highlight.js |

#### 3. Terminal output (live text — NOT screenshot)

| Field | Spec |
|---|---|
| **Use case** | Dispatch missive (#1), infrastructure-decision (#2), post-mortem (#4) |
| **Cadence** | ~2-3x/week |
| **Component** | CodeBlock+CopyButton (#6 CD4) with `variant="terminal"` |
| **Sonic integration** | None |
| **Register** | META |
| **Tooling tier** | In stack: Shiki shellscript grammar + ansi-html-community for ANSI color preservation; In consideration: xterm.js (interactive replay) / asciinema-player (timed replay); Deferred: Snagit terminal screenshot (reclassified — preserved for IDE-chrome-as-evidence use case) |

### §2.2 — Image-form group (both registers)

#### 4. Photograph

| Field | Spec |
|---|---|
| **Use case** | Profile pieces (#11), agent-creation framing (#9), ambient atmospheric stills |
| **Cadence** | Low (~1-2/month) |
| **Component** | ImageWithCaption (#24 NEW) + ImageGallery (#25 NEW) for multi-shot stories |
| **Sonic integration** | None |
| **Register** | NARRATIVE primary |
| **Tooling tier** | In stack: Adobe Lightroom Classic (AI-integrated — masks / Denoise / generative remove) → Astro `<Image>` for delivery; In consideration: Capture One / DxO PhotoLab; Deferred: Halide / Procreate (cross-platform fail) / Affinity Photo / Darktable / ON1 / Photopea / Pixelmator |
| **DLDS integration** | IPTC 2025.1 metadata embedded; C2PA content credentials when AI-processed |

#### 5. Illustration (article cover / inline drawings / character portraits / cosmology concept-art)

| Field | Spec |
|---|---|
| **Use case** | Every NARRATIVE article (cover image); inline visualizations for META articles (#2, #6); Mayor / Virgil / agent character portraits across all NARRATIVE story types |
| **Cadence** | 5-7x/week (every article cover) |
| **Component** | ImageWithCaption (#24 NEW) + ImageGallery (#25 NEW) for multi-frame |
| **Sonic integration** | None |
| **Register** | Both META and NARRATIVE |
| **Tooling tier** | In stack: Adobe Firefly (C2PA-native + commercial indemnification + DLDS alignment) + Recraft (vector + character-consistency API; per-platform aspect-ratio variants 16:9 / 4:5 / 9:16 / 1:1) + Ideogram (text-in-image specialist); In consideration: Midjourney v7 / Adobe Illustrator / Affinity Designer / Krea AI / Flux / Leonardo.AI; Deferred: Procreate / Stable Diffusion self-host / DALL-E 3 / Imagen 3 / Bing Image Creator / NightCafe / Krita / Inkscape / Clip Studio Paint / Vectornator |
| **DLDS integration** | C2PA content credentials auto-embedded by Firefly; LinkedIn auto-applies "cr" watermark on upload per EU AI Act August 2 2026 alignment |

#### 6. Diagram (architecture / flow / sequence)

| Field | Spec |
|---|---|
| **Use case** | Infrastructure-decision (#2), change-log (#3), post-mortem (#4), tooling adoption (#5), performance investigation (#6); systems-thinking philosophical posts (#8) |
| **Cadence** | 3-5x/week (META days lean on diagrams) |
| **Component** | ImageWithCaption (#24 NEW) for static SVG export OR DiagramEmbed (NEW consideration via tldraw runtime — refines at W3) |
| **Sonic integration** | None |
| **Register** | META primary; some NARRATIVE for systems-thinking |
| **Tooling tier** | In stack: tldraw (Mayor council adjudication 2026-05-09 — replaces Mermaid + Excalidraw composite at canonical-stack tier; AI agent-native; aligned with agentic-built-codebases thesis); In consideration: Mermaid (text-based MDX-embeddable; Claude-generates-syntax) + Excalidraw (sketch register) — preserved per Principle 8 no-trash; revival condition = tldraw production-fit fails OR text-version-controlled diagrams become load-bearing; also Figma (with FigJam) / Whimsical / D2 / PlantUML; Deferred: Lucidchart / Draw.io / OmniGraffle / Visio / Graphviz / dbdiagram.io |

#### 7. UI screenshot

| Field | Spec |
|---|---|
| **Use case** | Tooling adoption (#5); dispatch missive (#1) when shipped UI exists; product-focused profile pieces (#11) |
| **Cadence** | 1-2x/week |
| **Component** | ImageWithCaption (#24 NEW); ImageGallery (#25 NEW) for multi-shot walkthroughs |
| **Sonic integration** | None |
| **Register** | META primary; some NARRATIVE for product profiles |
| **Tooling tier** | In stack: Snagit (cross-platform Mac+Win; AI-integrated Smart Move 2024; build-only perpetual license per pipeline-stack §11.1 Adjudication 5); In consideration: CleanShot X (Mac power-user) / ShareX (Win OSS) / Shottr (Mac) / Xnapper (Mac); Deferred: macOS Cmd+Shift+5 native / Windows Snipping Tool / Greenshot / Lightshot / Skitch (deprecated) |

#### 8. Cosmology cartography frame (Editorial District / magazine-corner renders per CD3)

| Field | Spec |
|---|---|
| **Use case** | Mayor-direction posts (#10) / register-statement (#8) / agent-creation framing (#9) / tentpole pieces (CrossfireShowcase Shape B sub-pages) |
| **Cadence** | 2-4x/quarter (tentpole multimedia; not daily) |
| **Component** | CartographyCanvas (#12 CD4) + DistrictMap (#16 CD4) + MetroMapMarker (#8 CD4) — already in CD4 inventory |
| **Sonic integration** | Yes — couples to sonic-system audio-palette ambient register per CD6 §3.3 (cartography ambient deferred to v0.1+ per CD6 atmospheric-not-spectacle discipline) |
| **Register** | NARRATIVE primary; META interplay possible |
| **Tooling tier (per CD3 §2 5-expression-layer pipeline)** | In stack: Watabou + Azgaar (procgen base; Layer 1) + Inkarnate Pro (concept iteration; Layer 2; raster output doesn't bind production) + Mapbox Studio + GL JS OR MapLibre GL (Layer 3 production runtime; W4 cascade decides) + D3.js + P5.js (Layer 4 atmospheric overlay); In consideration: Spline 3D + Midjourney + Recraft + Leonardo.AI (Layer 5 concept-art branch); Deferred: Three.js direct / R3F |

### §2.3 — Audio-form group (NARRATIVE primary; META interplay)

#### 9. Podcast / interview embed

| Field | Spec |
|---|---|
| **Use case** | Profile piece (#11), agent-creation framing (#9), philosophical post (#8) |
| **Cadence** | Monthly (~1/month) |
| **Component** | AudioEmbed (#23 NEW) `waveform` mode (Wavesurfer.js engine) |
| **Sonic integration** | Sonic-logo intro per CD6 §2.3 deployment surfaces |
| **Register** | NARRATIVE primary |
| **Tooling tier (creation)** | In stack: Descript (transcript-based editing; AI voice clone; Eye Contact Fixer) + Adobe Podcast Enhance (AI cleanup pass) + Riverside.fm (multi-track guest record); In consideration: Adobe Audition / Hindenburg Pro / Auphonic / Krisp; Deferred: Logic Pro / GarageBand (Mac-only fail) / Audacity / Reaper (no AI) |
| **Tooling tier (delivery)** | In stack: Wavesurfer.js (BSD-3) + Cloudflare R2 OR AWS S3 storage; In consideration: Plyr / Mux Audio; Deferred: Mediaelement.js / Web Audio API direct / SoundCloud-Spotify embed |

#### 10. Ambient sonic palette (sonic-system audio-palette companion)

| Field | Spec |
|---|---|
| **Use case** | NARRATIVE article opener (per narrative-pattern.md §3.5) atmospheric-warm-high; reading sanctuary atmospheric-warm-reflect; per CD6 audio-palette §3.3 |
| **Cadence** | Per major NARRATIVE pieces (#7 dev-diary / #8 philosophical / #9 agent-creation / #10 Mayor-direction / #11 profile) |
| **Component** | AudioEmbed (#23 NEW) `ambient` mode (Howler.js engine; fade-in/out + loop + volume modulation) |
| **Sonic integration** | Per CD6 sonic-system audio-palette `ambient-warm-high` / `ambient-warm-mid` / `ambient-warm-reflect` / `ambient-warm-glow` |
| **Register** | NARRATIVE primary |
| **Tooling tier** | In stack: Howler.js (MIT) + Cloudflare R2 / S3 storage; In consideration: Tone.js (music-app oriented); Deferred: Mediaelement.js / Web Audio direct |
| **Reduced-motion + reduced-data discipline** | NEVER autoplay; user-initiated only; suppress when `prefers-reduced-data` signals; per CD6 §0 reading discipline |

#### 11. Sonic-logo intro

| Field | Spec |
|---|---|
| **Use case** | First NARRATIVE article opener candidate (per narrative-pattern.md §5); sonic releases (#12); VirgilChat session-open + LiveRoom session-open per CD6 §2.3 |
| **Cadence** | Per major NARRATIVE article hero moments + quarterly sonic releases |
| **Component** | AudioEmbed (#23 NEW) `ambient` mode at article-opener |
| **Sonic integration** | The sonic-logo IS the ambient; per CD6 §2 sonic-logo register direction (acoustic-analog / 2-element cosmology-encoded composition / 2-4s duration) |
| **Register** | NARRATIVE primary |
| **Tooling tier (composition)** | In stack: Composer brief at W4 Mayor-gated cascade per CD6 §6 (acoustic-analog; 2-element Inferno-pulse + Editorial-substrate-warmth composition); In consideration: AI music gen tools for prototyping (Suno v4 / Udio / Stable Audio); Deferred: AIVA / Soundraw / Loudly / Mubert |

#### 12. AI voice synthesis (deferred until first use case)

| Field | Spec |
|---|---|
| **Use case** | Mayor-direction posts read-aloud variant; agent-character voice in agent-creation framing pieces; accessibility audio descriptions |
| **Cadence** | Deferred at V1; activates per Mayor's first-AI-voice-use-case decision |
| **Component** | AudioEmbed (#23 NEW) `waveform` mode |
| **Sonic integration** | Voice-talent register per CD6 §4 (literary-civic-warm; first-person-singular discipline) |
| **Register** | NARRATIVE primary |
| **Tooling tier** | DEFERRED (per pipeline-stack §11 don't-eliminate inventory): ElevenLabs Starter as first paid step; In consideration when activated: Hume AI / Cartesia / OpenAI Voice / PlayHT / Resemble.ai; Deferred: Murf.ai / Speechify |
| **DLDS / disclosure** | AI voice triggers EU AI Act August 2 2026 disclosure requirements; DldsPanel (#7 CD4) renders voice-AI-attribution per `feedback_brand_track_dlds_locked.md` |

#### 13. Transcript (companion to all audio content)

| Field | Spec |
|---|---|
| **Use case** | Every audio content piece; accessibility floor per WCAG 2.1 SC 1.2.1; SEO + AEO surface for AI-search citation |
| **Cadence** | Per audio content piece |
| **Component** | Custom Astro component (own code; sibling to AudioEmbed) |
| **Sonic integration** | N/A (text companion to audio) |
| **Register** | Inherits parent article register |
| **Tooling tier (transcription)** | In stack: Otter.ai OR Fireflies.ai (AI transcription cross-platform); In consideration: tl;dv / Granola / Whisper API / Whisper.cpp self-host; Deferred: Sonix / Trint / Rev.ai |
| **Accessibility floor** | LAUNCH-NON-NEGOTIABLE per CD6 §0 + WCAG 2.1 |

### §2.4 — Video-form group (both registers)

#### 14. Screencast / process walkthrough

| Field | Spec |
|---|---|
| **Use case** | Tooling adoption (#5), infrastructure-decision (#2) when UI demo helps, post-mortem (#4) when timeline-replay clarifies |
| **Cadence** | ~1-2x/month |
| **Component** | VideoEmbed (#22 NEW) — Mux player + adaptive bitrate |
| **Sonic integration** | Optional voice-over per voice-talent guidelines (CD6 §4) |
| **Register** | META primary |
| **Tooling tier (creation)** | In stack: Snagit (covers screencast variant); OBS Studio (OSS cross-platform); In consideration: Loom / Tella / Riverside (also video) / Screen Studio (Mac); Deferred: Camtasia / ShareX (Win-only) |
| **Tooling tier (delivery)** | In stack: Mux + Mux Player; In consideration: Cloudflare Stream / Bunny.net Stream / Plyr / Video.js; Deferred: Vimeo / Wistia / YouTube embed (canonical) / Self-host MP4 + R2 |

#### 15. AI-generated video (motion explainer / cinematic / Reels-format)

| Field | Spec |
|---|---|
| **Use case** | Article cover videos for tentpole pieces; social Reels variants for Tier-2 audience (Threads + IG); motion concept-art for cosmology cartography |
| **Cadence** | 1-2x/week (incidental V1; primary if video content format escalates post-V1) |
| **Component** | VideoEmbed (#22 NEW) |
| **Sonic integration** | Pairs with sonic-logo intro on tentpole pieces |
| **Register** | Both |
| **Tooling tier** | In stack: Runway Gen-4 (best creative control) + Pika (cheapest social Reels) + FAL.AI aggregator API (per-second burst escape hatch for Kling / Seedance / Veo / Wan); In consideration: Veo 3.1 / Kling 3.0 / Luma Dream Machine / Hailuo / HeyGen (deferred for DLDS disclosure complexity) / Synthesia / Tavus / D-ID; Deferred: Sora 2 (discontinued April + September 2026 by OpenAI) / Wan 2.6 |

#### 16. Character-led video (avatar / talking-head; deferred at V1)

| Field | Spec |
|---|---|
| **Use case** | Mayor or Virgil as recurring on-screen narrators (forward-arc); agent-creation framing video variants |
| **Cadence** | DEFERRED at V1 per `feedback_decouple_scope_from_ambition.md` (visitor-engagement-depth at v0.1+) + DLDS disclosure complexity |
| **Component** | VideoEmbed (#22 NEW) |
| **Sonic integration** | Voice-talent per CD6 §4 |
| **Register** | NARRATIVE primary |
| **Tooling tier** | DEFERRED: HeyGen / Synthesia / Tavus / D-ID — revival condition = Mayor decides character-led format earns place + DLDS disclosure infrastructure ratifies cleanly |

### §2.5 — Interactive-form group (both registers)

#### 17. Interactive code demo (sandbox embed)

| Field | Spec |
|---|---|
| **Use case** | Tooling adoption (#5), infrastructure-decision (#2), philosophical posts where code demonstrates the claim |
| **Cadence** | ~1-2x/week |
| **Component** | InteractiveDemo (#NEW) — sandbox iframe + screenshot fallback |
| **Sonic integration** | None |
| **Register** | META primary |
| **Tooling tier** | In stack: CodeSandbox (public sandboxes) + StackBlitz (WebContainers; instant boot); In consideration: Replit / Bolt.new / CodePen; Deferred: JSFiddle / Glitch |

#### 18. Data viz (charts / interactive visualizations)

| Field | Spec |
|---|---|
| **Use case** | Performance investigation (#6), transparent-metrics dispatch (#1, #2), validation cascade reporting (#5) |
| **Cadence** | ~2-3x/week |
| **Component** | DataViz (#29 NEW) |
| **Sonic integration** | None |
| **Register** | META primary; LinkedIn Documents-format export hook (Documents +14% YoY engagement) |
| **Tooling tier** | In stack: Observable Plot (high-level grammar-of-graphics) + D3.js (low-level craft) + Vega-Lite (declarative JSON spec; AI-agent authorable); In consideration: Apache ECharts / Recharts / Visx / Nivo; Deferred: Chart.js / Plotly.js / Highcharts / G2 |

#### 19. Scrollytelling / scroll-driven sequence

| Field | Spec |
|---|---|
| **Use case** | Long-form NARRATIVE retrospectives (Mayor-direction posts #10) / agent-creation framing (#9) / performance investigation deep-dives (#6) |
| **Cadence** | ~1/month + tentpole pieces |
| **Component** | Scrollytelling (#30 NEW) — Scrollama + Motion v12 + GSAP composition per CD5 stack |
| **Sonic integration** | Pairs with ambient sonic-palette per CD6 §3.3 atmospheric register |
| **Register** | NARRATIVE primary |
| **Tooling tier** | In stack: Scrollama (ISC; The Pudding's library) + Motion v12 + GSAP ScrollTrigger (CD5 stack); In consideration: Locomotive Scroll / Splide / IntersectionObserver direct; Deferred: ScrollMagic / Skroll.js |

#### 20. Comparison slider (before/after)

| Field | Spec |
|---|---|
| **Use case** | Tooling adoption (#5), refactor write-ups (#3), post-mortem (#4), visual-change documentation |
| **Cadence** | ~1-2x/week |
| **Component** | ComparisonSlider (#31 NEW) |
| **Sonic integration** | None |
| **Register** | META primary; some NARRATIVE for visual-change profile pieces |
| **Tooling tier** | In stack: react-compare-slider; In consideration: img-comparison-slider (Web Component) / beforeafter.js; Deferred: Cocoen / Twentytwenty.js |

### §2.6 — Composite-form group

#### 21. CrossfireShowcase (the V1 selling-point)

| Field | Spec |
|---|---|
| **Use case** | Every article (per-article facade row at footer); site-wide `/crossfire` gallery; tentpole sub-pages 2-4/quarter |
| **Cadence** | Per-article (facade) + site-level (gallery) + quarterly (tentpole) |
| **Component** | CrossfireShowcase (#21 NEW; per cd7-content-pipeline-stack.md §3.1) |
| **Sonic integration** | None at V1 |
| **Register** | Both — universal across articles |
| **Tooling tier** | In stack: Custom Astro component + cached OG fetch (build-time) + `<bsky-comments>` web component for Bluesky thread integration on tentpole sub-pages; In consideration: Iframely (or self-hosted fork) / Embedly; Deferred: Live oEmbed iframes for LinkedIn / Mastodon / Threads / Meta family (high maintenance debt; revival condition = aggregate platform-API stability proven) |
| **Engagement / discoverability** | THE traction multiplier — replaces traditional social-share buttons with platform-preview cards driving outbound engagement to where the audience graph already lives |

#### 22. Image gallery (multi-shot composite)

(Already covered in §2.2 #5 illustration + #4 photograph composition into ImageGallery (#25 NEW); no separate spec.)

### §2.7 — Provenance-form group

#### 23. DLDS panel + C2PA content credentials band

| Field | Spec |
|---|---|
| **Use case** | Every article — visible provenance band rendering AI-attribution + lane-schema disclosure per `feedback_brand_track_dlds_locked.md` |
| **Cadence** | Per-article (always) |
| **Component** | DldsPanel (#7 CD4 — already exists; extended at W3 to read C2PA via `@contentauth/c2pa` JS) |
| **Sonic integration** | None |
| **Register** | Both — universal |
| **Tooling tier (auth)** | In stack: Adobe Firefly (auto-embeds C2PA on generation); IPTC 2025.1 metadata (free standard); Vale.sh (DLDS lane validation); In consideration: `c2pa-rs` (Rust core via WASM if perf bottleneck); Deferred: Truepic SDK / Numbers Protocol |
| **EU AI Act compliance** | LAUNCH-NON-NEGOTIABLE per August 2 2026 deadline; LinkedIn auto-applies "cr" watermark when C2PA present; Meta family requires manual disclosure label |

#### 24. Citation block (social embed for citations)

| Field | Spec |
|---|---|
| **Use case** | Profile pieces (#11), philosophical posts (#8), Mayor-direction posts (#10) when quoting external voices |
| **Cadence** | Ad-hoc (~1-2x/month) |
| **Component** | Citation block (deferred-to-W3 per CD4 §3.2 deferred-with-research-citation) — overlap with CrossfireShowcase functionally |
| **Sonic integration** | None |
| **Register** | Both |
| **Tooling tier** | In consideration: `<bsky-comments>` web component (Bluesky AT Protocol public HTTP API; framework-agnostic 3kB); Iframely / Embedly aggregators; Deferred: Direct Mastodon iframe (v4.3 multi-embed const-collision bug; defer until upstream fix) / Twitter-X embed JS / Threads via Meta oEmbed Read (app-review gate) |

---

## §3 — Cross-references

| Section | Target |
|---|---|
| §1 universal concept | thesis-statement.md §2 Concept 4 atmosphere-as-physical-substrate + Concept 5 marriage-of-registers |
| §2.1 code-form | story-types-catalog.md META-primary types + components-multimedia.md #27 CodeDiff + CD4 #6 CodeBlock |
| §2.2 image-form | components-multimedia.md #24 ImageWithCaption + #25 ImageGallery + CD4 #12 CartographyCanvas + #16 DistrictMap |
| §2.3 audio-form | components-multimedia.md #23 AudioEmbed (Wavesurfer + Howler composite) + sonic-system.md §1-§5 |
| §2.4 video-form | components-multimedia.md #22 VideoEmbed |
| §2.5 interactive-form | components-multimedia.md #29 DataViz + #30 Scrollytelling + #31 ComparisonSlider + InteractiveDemo |
| §2.6 composite-form | components-multimedia.md #21 CrossfireShowcase |
| §2.7 provenance-form | CD4 #7 DldsPanel + `feedback_brand_track_dlds_locked.md` + EU AI Act August 2 2026 alignment |
| Pipeline tooling tiers | cd7-content-pipeline-stack.md §11 council consensus |
| Per-platform variants | audience-engagement-model.md §3 multi-tier audience |

---

## §4 — Forward pointers

- **W3** — multimedia component implementations against CD4 7-field spec template; per-component motion specs inherit from CD5 motion register
- **W5** — first-article multimedia pipeline operational; first round-trip through master plan §3.C 14-platform reshape table; first DLDS provenance band visible at canonical surface
- **V1.5+** — multimedia audit refinable per content-cycle evidence; new multimedia content types append per `feedback_documentation_lifecycle.md` (create + standing-history pointer); types that prove unhelpful tombstone (move to 7-histories/) per discipline

---

## §5 — Standing-history pointers

- Article patterns: `representation/content/article-patterns/{meta-pattern, narrative-pattern, interplay-pattern}.md` (W1 CD6 RATIFIED)
- Sonic system: `representation/multimedia/sonic-system.md` (W1 CD6 RATIFIED)
- Component inventory: `representation/visual-system/{components, components-multimedia}.md` (CD4 + CD7)
- Pipeline stack: `cc-ledger/dispatches/W1/cd7-content-pipeline-stack.md` (W1 CD7 §11 council consensus)
- Story types catalog: `representation/content/story-types-catalog.md` (W1 CD7)
- Editorial calendar: `representation/content/editorial-calendar.md` (W1 CD7)
- Audience engagement: `representation/content/audience-engagement-model.md` (W1 CD7)
- Master plan: `plans/master-plan.md` v1.0.9 §1.4 multimedia foundational + §1.5 distribution + §3.C content schema + §3.A library destinations

---

*Multimedia content types audit v0 RATIFIED W1 Stream-A CD7 2026-05-09. 24 multimedia content types across 7 groups operationalize META × NARRATIVE distinction; refinable per W5 first-article evidence + V1.5+ content-cycle evidence + AI-disclosure regulatory evolution per `feedback_metric_vs_gate_discipline.md` per-type gate.*
