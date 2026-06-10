---artifact: cd5-motion-register
authored: W1 Stream-A CD5 (PCP-164)
authored-date: 2026-05-07
status: active
ideation-model: CD5 Motion Workshop ideation cycle (Mayor + instance ideate together per cd5-brief.md Sections 1-8 + §6.5 5-dimension framework + RES-008 Conductor support)
authority: mayor
  - Mayor: motion stack ratification, variable-refresh-rate performance envelope, per-component motion specs initial set, atmospheric coupling rule, reduced-motion-respect floor, tool partner workflow shape
  - brand-terrace skill operator role: authoring discipline + universal-concept synthesis + 5-dimension option-presentation
  - master plan §1.1 register lock (atmosphere-not-spectacle surface texture)
  - master plan §3.A CD5 partner tools row (Origami / ProtoPie / Rive / Lottie+dotLottie / After Effects / Motion v12 / GSAP / Lenis)
  - master plan §6.6 Row 13 Lighthouse CI (motion performance budget propagation per Shift Down meta-rule)
  - master plan §8.0 Eight Key Invariants (motion stack lock at charter-tier; substitution = §12 amendment)
upstream-cascade: master-plan.md v1.0.9 (TC-3.2.8) at commit c7065ed §3.A 7-row concept-first table Row 4 (surface texture as atmosphere, not spectacle) + §1.1 Prime register lock + §3.A CD5 partner tools row + §6.6 Row 13 Lighthouse CI + §12 RES-009 (atmosphere.md retirement; motion-coupling rule folded into §4 below)
upstream-cd1: representation/visual-system/thesis.md (RATIFIED 2026-05-08) — Concept 4 atmosphere-as-physical-substrate + Concept 3 metro-map wayfinding + Decision 4 CosmologyMarker as primary wayfinding asset + Decision 9 cartography-as-MVP-hero subtly with dial principle
upstream-stubs:
  - CD2 (color) OKLCH atmospheric chrome token values (`sky-high` / `sky-low` / `reflect` / `window-warm`) — referenced by name; stubbed per §5.2; ratified at CD2 workshop Section 4.5; numerical values land at W2 Stream-B Style Dictionary v4 token-pipeline
  - CD3 (cartography) atmospheric-substrate rendering pipeline (P5.js paper grain + D3.js contour-ink + dynamic-living layer with flicker / grid-line awareness / auto-correction) — referenced as substrate within CD5 motion-coupling rule envelope; CD3 owns rendering side
  - CD4 (components) 14-component spec set — CD5 ratifies motion-pattern specs for initial 6 (theme-cycler / scroll-pinned reveal / DldsPanel / ChapterRail / Wordmark / CosmologyMarker); remaining 8 deferred to W3 component-layer implementation per §0 C9
downstream-blocks: CD6 (W1 SERIAL recombination) + W3 component-layer build (component motion implementation against this register) + W5 microsite build (motion runtime composition at Astro + Next.js hybrid foundation per §1.7 reframe 2.6 + §7.3 8-vertebra bedrock)
downstream-recombines-at: CD6 (W1 SERIAL recombination per §4 W1 Concurrency notes)
companion-files: representation/visual-system/thesis.md (CD1 ratified) + representation/visual-system/reference-archive.md (CD1 ratified) + representation/visual-system/color.md (CD2 in-flight; PARALLEL band) + representation/visual-system/cartography.md (CD3 in-flight; PARALLEL band) + representation/visual-system/components.md (CD4 in-flight; PARALLEL band)
title: DISpatch — CD5 Ratified Motion Register
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
generated: true
---

# DISpatch — CD5 Ratified Motion Register

## Reading discipline

Per master plan §1.1 + CD1 thesis §0, three concepts stay structurally separate throughout this register:

- **Aspiration** = universal motion concepts / operating models / runtime disciplines Prime climbs toward at principal-level quality. Verifiable. Concept-first per §0 C7.
- **Inspiration** = specific motion stacks + partner tools cited as examples that prove the universal concepts hold at world-class scale. Stages of the climb. Non-binding for future Buildings.
- **Register** = per-surface motion choice. DISpatch's atmospheric register is one Building's choice; per-Building register flexibility per §1.3 + CD1 thesis §3.

Per master plan §0 C8: register / aesthetic / specific timing / specific easing / specific amplitude territory uses muted technical language ("currently inclined toward X" / "first hypothesis is Y" / "subject to refinement at W3"). Strong language per §0 C9 reserved for ratified load-bearing decisions — motion stack lock, atmospheric layer motion-coupling rule, performance-budget gate framing, reduced-motion-respect floor.

**A motion register is a contract, not a spec.** This file ratifies the structural locks so W3 component-implementation reads it cold, knows the constraints, and authors specific timing values inside the envelope. Substitution at the lock tier triggers §12 amendment per §8.0; refinement at the spec tier proceeds per Mayor-gated W3 dispatch.

---

## §1 — Motion stack declaration (STRUCTURAL LOCK per §8.0)

### Universal concept

A composable runtime motion stack where one synchronized animation loop binds three motion vectors — *layout-position* (component layout transitions) + *timeline-orchestrated* (multi-step sequences with shared timing authority) + *scroll-driven* (smooth scroll + scroll-progress observability) — all subscribed to a single `requestAnimationFrame` cycle so that no two libraries fight the browser's compositor budget.

The single-rAF discipline IS the cohesion mechanism. It is the difference between a motion register that reads as one architecture (every motion vector synchronized; compositor budget shared cooperatively) and one that reads as accumulated libraries (each library paints on its own schedule; compositor pressure compounds; jank visible).

### Examples that prove the concept at frontier scale

Per §0 C7 (concept-first reference set; not register-prescriptions):

- **Linear's product surface** — Motion + GSAP coordination under single-rAF supervisor; compositor sleeps on idle workspaces; wakes at display ceiling on cursor motion / pan
- **Stripe's marketing surface (2024 redesign)** — GSAP-orchestrated timelines synced to Lenis smooth-scroll; documented <1% main-thread time on idle article surfaces via single-rAF discipline
- **Apple's editorial + product surfaces** — single-rAF discipline structurally enforced even when stack varies; ProMotion-aware motion budget at hardware tier (the precedent §2 below translates to web)
- **Vercel + Anthropic editorial surfaces** — Motion / Framer Motion successor stack with scroll-driven reveal patterns; single-rAF synchronization with Lenis-equivalent smooth-scroll

These prove the universal concept at world-class scale; Prime adopts the concept in DISpatch's atmospheric register.

### Prime's expression — four-vertebra runtime motion stack

| Vertebra | Library | Motion vector | Wake/sleep contract |
|---|---|---|---|
| **Layout-position** | **Motion v12** (Framer Motion successor; 2025 rebrand) | React-native layout transitions (component mount/unmount, reordering, spring-physics) | Inherently sleeps when no animations queued; participates via component-level motion-active handle |
| **Timeline-orchestrated** | **GSAP** | Multi-step sequences with shared timing authority (theme-cycle crossfade orchestration; entrance choreography; complex chained transitions) | `gsap.ticker.wake()` / `gsap.ticker.sleep()` API; supervisor calls these at active-count transitions |
| **Scroll-driven** | **Lenis** (1.2+) | Smooth-scroll with frame-perfect scroll-progress events (ChapterRail tracking; scroll-pinned reveals; CosmologyMarker scroll-coupling) | `start()` / `stop()` semantics built in; supervisor coordinates with rAF supervisor |
| **Synchronization supervisor** | Single-rAF custom supervisor | Wake/sleep arbiter; maintains active-motion-count; runs the loop when count > 0; suspends when count = 0 | Application-level state machine; load-bearing mechanism for §2 VRR envelope |

**Lock tier.** This is a STRUCTURAL LOCK per §8.0 charter — substitution invalidates the motion register at amendment level (per §12 RES amendment process; Mayor-gated). The four-vertebra composition is the load-bearing decision; specific motion-pattern timings ratify at W3 component-implementation per §0 C9.

### What the lock closes (on the table for substitution = §12 amendment)

- Replacing Motion v12 with another React-native layout-transition library (e.g., reverting to Framer Motion v11)
- Removing GSAP and authoring timeline orchestration as bare CSS @keyframes
- Replacing Lenis with native-scroll-only or alternative smooth-scroll (e.g., locomotive-scroll legacy)
- Adopting Theatre.js or Anime.js as a fourth vertebra (deferred-with-research-citation per §1.7 reframe 2.3; not adopted at V1)

### What the lock does NOT close (refinable downstream per §0 C9)

- Specific durations, easings, amplitudes per component (W3 component spec.md per §5.1 + §5.2)
- Specific entrance choreography for editorial-block reveal patterns (W3)
- Specific spring-physics tuning for Motion v12 layout transitions (W3 + W5 prototyping per §3.A CD5 partner tools)
- Specific Lenis tuning parameters (`lerp`, `wheelMultiplier`, `touchMultiplier`) per surface (W3 + W5)

---

## §2 — Single-rAF discipline + variable refresh rate performance envelope (STRUCTURAL LOCK per §6.6 Row 13 propagation; Mayor amendment 2026-05-07)

### Universal concept

Motion budget is not a fixed gate; motion budget is a STATE MACHINE.

- **Idle**: compositor truly asleep. No `requestAnimationFrame`, no paint, no main-thread work. Display drops to its OS-level adaptive idle cadence (10Hz on iPhone/iPad ProMotion / ~24Hz on macOS ProMotion / display-floor on non-VRR hardware). Battery + CPU release ~95% in this state.
- **Active**: rAF inherits the display refresh rate. 60Hz floor on legacy hardware / 120Hz on Apple ProMotion devices (iOS 15+ Safari, macOS Safari) / up to 240Hz on capable desktop displays (Chrome 100+). No application cap — the page rides the hardware ceiling.

The single-rAF supervisor (§1 vertebra 4) is the load-bearing mechanism that makes this possible. One supervisor wakes/sleeps the loop based on motion-active-count; libraries (Lenis, GSAP, Motion v12) participate via their wake/sleep contracts. Component-level motion handles register on motion-start, release on motion-completion. When the active-count drops to zero, the supervisor suspends the loop; the compositor goes truly idle; the display drops to its adaptive low cadence.

### Examples that prove the pattern at frontier scale

- **Apple ProMotion** (iOS 15+ / iPadOS 15+ / macOS 14+ on capable hardware) — the OS-level precedent; 10Hz–120Hz adaptive on iPhone/iPad Pro; ~24Hz–120Hz on MacBook Pro 14"/16" mini-LED. Web pages on Safari inherit this for free if they don't artificially cap rAF.
- **Linear web app** — single-rAF supervisor with documented compositor-sleep on idle workspaces; cursor motion / pan wakes the loop at display ceiling
- **Stripe Press 2024 redesign** — GSAP `ticker.wake/sleep` discipline; published <1% main-thread time on idle article surfaces via Long Animation Frames API (LoAF) telemetry

### Prime's expression — five-layer implementation discipline

#### Layer 1 — Single-rAF supervisor (load-bearing; §1 vertebra 4)

The supervisor maintains an `active-motion-count`; loop runs when count > 0; loop suspends when count = 0. Lenis 1.2+ ships `start/stop`; GSAP ships `gsap.ticker.wake()` / `gsap.ticker.sleep()`; Motion v12 inherently sleeps when no animations queued. All three honor the supervisor's wake/sleep contract.

#### Layer 2 — Component-level motion-active contract

Every component that animates registers a motion-active handle on motion-start, releases on motion-completion. Per-component contracts ratified in §3 below. When all components release, the supervisor sleeps. CD5 ratifies the contract; W3 holds and releases per its motion spec.

#### Layer 3 — Mid-cadence motion uses deferred scheduling (NOT continuous rAF)

Atmospheric chrome ambient drift (§4 below) and cartography flicker (CD3-owned per §4) do NOT use rAF. They use `setTimeout` at slow intervals (currently inclined toward 30s tick for ambient drift; refinable at W3 + W5) so the compositor stays *truly idle* between ticks. Compositor-sleep with deferred wake is structurally cheaper than holding a steady mid-cadence rAF loop.

This is the key precision: there is no web equivalent of native iOS `CADisplayLink.preferredFrameRateRange(min, max, preferred)` — the page cannot request a specific intermediate rate (e.g., "please run at exactly 30Hz"). The web's primitive is binary: rAF on (display delivers its current cadence) OR rAF off (compositor sleeps; display drops to adaptive idle). Mid-cadence motion approximates via setTimeout — equivalent battery effect, structurally cheaper than steady mid-rate rAF.

#### Layer 4 — Display-ceiling delivery (no artificial cap)

The rAF loop, when awake, requests frames at the display refresh rate. The browser delivers what hardware supports. Per-frame work budget SHRINKS at higher cadence — this is the structural cost of capability-ceiling expansion; per-component motion specs honor at W3:

| Display ceiling | Per-frame work budget | Hardware example |
|---|---|---|
| **60Hz** | ≤ 16ms | Legacy desktops, most Android, baseline laptops |
| **120Hz** | ≤ 8ms | Apple ProMotion (iPhone Pro / iPad Pro / MacBook Pro 14"/16"); high-refresh Android |
| **144Hz** | ≤ 7ms | Mid-tier gaming monitors |
| **240Hz** | ≤ 4ms | High-end gaming monitors / content-creator displays |

#### Layer 5 — Long Animation Frames API (LoAF) instrumentation

`PerformanceObserver` watching `long-animation-frame` entries measures actual cadence in production. Two telemetry signals feed Row 13 Lighthouse CI propagation per §6.6 Shift Down meta-rule:

- **Idle telemetry** — zero LoAF entries during a 5s no-interaction window verifies compositor sleep
- **Active telemetry** — LoAF entries' `duration` ≤ frame-budget-at-cadence verifies single-rAF discipline holds

LoAF browser support in 2026: Chrome 123+ ships; Safari 17+ ships; Firefox at WICG stage. Polyfill via legacy `requestAnimationFrame` timing measurement covers Firefox + older browsers (~95%+ user coverage by traffic share).

### Performance envelope gates (per `feedback_metric_vs_gate_discipline.md`)

These are GATES, not metrics. Per-deviation justification at W3 component-implementation review per Goodhart's discipline. Per §6.6 Shift Down meta-rule, motion performance budget propagates upstream into CD5 ratification; gates do not defer to W5+.

| Gate | Threshold | Verification |
|---|---|---|
| **Idle compositor sleep** | Zero LoAF entries during 5s no-interaction window | LoAF telemetry; verifies Layer 1+2 honored across libraries |
| **Active per-frame budget** | ≤ 16ms at 60Hz / ≤ 8ms at 120Hz / ≤ 4ms at 240Hz | LoAF `duration` per entry vs. cadence-derived budget |
| **Hardware-ceiling delivery** | rAF inherits display refresh rate; 60Hz floor / 240Hz ceiling | No application cap; verified by frame-rate telemetry on capable hardware |
| **Mid-cadence motion** | setTimeout / requestIdleCallback for ambient drift; NOT continuous rAF | Code-review gate; LoAF telemetry confirms compositor sleep between ticks |
| **INP** (Interaction to Next Paint) | ≤ 200ms | Core Web Vitals 2024+; Row 13 Lighthouse CI |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Core Web Vitals; transform-only animation pattern (never animate `top` / `left` / `width` / `height` directly); Row 13 Lighthouse CI |
| **Reduced-motion respect (FLOOR)** | `prefers-reduced-motion: reduce` honored; static state OR ≤ 200ms opacity-only crossfade | WCAG 2.1 Success Criterion 2.3.3 Animation from Interactions; LAUNCH-NON-NEGOTIABLE per `feedback_excellent_to_use_with_evolution.md` |

### Reduced-motion-respect floor — STRUCTURAL LOCK

Per WCAG 2.1 SC 2.3.3 + `feedback_excellent_to_use_with_evolution.md`: the accessibility floor is launch-non-negotiable; the aesthetic ceiling evolves post-launch. When `prefers-reduced-motion: reduce` is set:

- All motion vectors clamp to static state OR ≤ 200ms opacity-only crossfade
- VRR envelope is moot at this user setting (the page is effectively static; compositor stays in idle)
- Reduced-motion supersedes every per-component motion pattern declared in §3 below
- Per-component reduced-motion fallback specified in §3 each entry

### Platform-substrate ripple (per §1.2 multipurpose-platform context)

This pattern lands at the brand library substrate level. Future Buildings (per §1.2 8 surface types: writing / content / animation / games / demos / databases / accounts / apps) inherit the VRR-aware motion register as the default Prime substrate. Prime's motion register becomes "compositor sleeps when nothing animates; wakes to display ceiling when something does" — Apple's ProMotion pattern translated to web. The DISpatch microsite is the substrate's first proof.

---

## §3 — Per-component motion specs (initial 6; CD4 component-stub references)

CD5 ratifies motion-pattern specs for the initial 6 components. The remaining 8 components in CD4's 14-component inventory carry motion specs deferred to W3 component-layer implementation per §0 C9 (component-implementation Wave; spec-level details).

For each component: **motion category + reduced-motion fallback + token-coupling + motion-active contract + budget envelope notes**. Specific durations / easings / amplitudes are W3 spec-level details, NOT CD5 blueprint scope.

### §3.1 — theme-cycler

**Motion category.** Cross-fade with paper-warmth color shift. Theme transition (light / dark / atmospheric mode swap) is GSAP-orchestrated timeline synchronized to single-rAF supervisor; warm-white anchor + atmospheric chrome re-render at new theme.

**Universal concept.** Theme transitions read as the publication's substrate breathing — paper warmth shifts with the time of day, not as a UI toggle producing a button-click effect.

**Token-coupling.** CD2 base palette (warm-white scale; lane pigments) + CD2 atmospheric chrome (`tokens.color.atmosphere.sky-high` / `sky-low` / `reflect` / `window-warm`; CD2-owned per §12 RES-009). All token references stubbed per §5.2 until CD2 ratifies OKLCH numerical values.

**Motion-active contract.** Holds active handle from theme-swap-initiated to theme-swap-complete; releases on completion.

**Reduced-motion fallback.** Instant theme swap (no cross-fade; tokens snap to new values).

**Budget envelope notes.** Active-state burst; no idle-state cost. Specific cross-fade duration refinable at W3 (currently inclined toward 240–360ms range per common editorial-surface theme-toggle patterns).

### §3.2 — scroll-pinned reveal (motion pattern)

**Motion category.** Lenis-driven scroll-progress → Motion v12 reveal of in-flow editorial blocks. Opacity + transform-Y transition triggered by scroll-progress crossing a per-block threshold.

**Universal concept.** In-flow editorial reveal reads as the substrate folding open as the reader walks the page; transform-Y patterns express physical motion (paper unfurling) not screen-effect motion (slide-from-right injected by JS).

**Token-coupling.** Editorial-block-level — references CD2 base palette opacity scale (refinable at W3); no atmospheric chrome direct coupling.

**Motion-active contract.** Holds active handle on reveal-start (scroll progress crosses threshold); releases on reveal-complete (transform-Y reaches resting state).

**Reduced-motion fallback.** No transform; immediate visibility on scroll-into-viewport (binary opacity 0 → 1; no transform-Y).

**Budget envelope notes.** Per-block burst; concurrent reveals serialize via supervisor active-count. Specific transform-Y amplitude + opacity easing refinable at W3 (currently inclined toward subtle amplitude — 16–24px range — to preserve reading-substrate register).

### §3.3 — DldsPanel (Disclosed-Lane Drift-Sensing)

**Motion category.** Expand-collapse with content-aware height + fade-in of disclosed lane content. Motion v12 layout transition for height; opacity transition for content reveal.

**Universal concept.** DLDS panels express META-register peer-behind-curtain disclosure — code blocks, JSON/YAML markup, terminal-search content folds open like a desk drawer revealing the workings underneath. Motion is functional (content disclosure) not decorative (animated punctuation).

**Token-coupling.** CD2 META-register surface tokens (refinable at W3); CD4 component-level spec.md ratifies the surface palette.

**Motion-active contract.** Holds active handle from disclosure-trigger to height + opacity settle; releases on settle.

**Reduced-motion fallback.** Instant expand-collapse (no fade; binary visibility).

**Budget envelope notes.** Active-state burst; layout transition (Motion v12) coordinates with content-fade (GSAP timeline) under single-rAF supervisor.

### §3.4 — ChapterRail scroll-progress motion

**Motion category.** Civic-wayfinding signage tracking scroll position. Progress indicator transform-X synchronized to Lenis scroll progress.

**Universal concept.** ChapterRail expresses Concept 3 from CD1 thesis (page furniture as civic wayfinding) — the chapter rail is a city's transit map, the progress indicator is the train's current position. Motion is wayfinding (the reader sees where they are in the article) not decoration.

**Token-coupling.** CD2 lane pigments (chapter-position color); CD2 nav-typography pairing per Concept 1 of CD1 thesis (nav typeface DISpatch-locked → Prime-platform-wide).

**Motion-active contract.** Holds active handle while scroll is active (Lenis is awake); releases when scroll settles + Lenis sleeps.

**Reduced-motion fallback.** Stepped indicator — no continuous animation; progress updates at chapter-boundary crossings only (binary chapter-marker activation).

**Budget envelope notes.** Tied to Lenis scroll-active state; co-sleeps with scroll. Transform-X is the only animated property (CLS-safe; layout-stable).

### §3.5 — Wordmark hover + load motion

**Motion category.** Institutional-anchor wordmark per CD1 thesis Concept 6. Load = subtle weight transition (font-variation-settings if available) + opacity entry. Hover = micro-scale or weight shift (refinable at W3).

**Universal concept.** Wordmark expresses Concept 6 (institutional anchor) — the publication's identity announces itself quietly on load; hover reveals the wordmark as live (not static logo). Motion is identity-articulation, not decoration.

**Token-coupling.** CD2 wordmark color resolution (DP-Q11 — copper-as-institution OR dispatch-red-with-lane; CD2 closes); CD1 thesis Concept 1 nav typography (Prime-platform-wide); variable font axis support if CD2 + CD4 type selection ratifies a variable face.

**Motion-active contract.** Load: holds active handle from page-mount to entry-complete (~400–600ms range; refinable at W3); releases. Hover: holds active handle from pointer-enter to pointer-leave; releases on leave.

**Reduced-motion fallback.** Static wordmark; no load entry transition (binary visibility on mount); no hover effect.

**Budget envelope notes.** Load is a once-per-page burst. Hover is interaction-driven; concurrent hovers do not stack (single wordmark per page).

### §3.6 — CosmologyMarker (added 2026-05-07 per Mayor adjudication; closes CD1 thesis Decision 4 cohesion gap)

**Motion category.** Cosmological-position transition. Opacity + transform-X transition synchronized to ChapterRail scroll-progress (§3.4) at chapter-boundary crossings; CD3-coupled district-context updates trigger position-marker shifts.

**Universal concept.** CosmologyMarker is the metro-map "you are here" wayfinding asset per CD1 thesis Concept 3 + Decision 4. Per CD1 thesis closure of DP-Q2: "graphics-only via metro-map cosmology marker on every article surface; Italian-in-text overlay eliminated" — meaning the metro-map carries the wayfinding LOAD V3 had distributed across multiple affordances. Motion expresses cosmological-position-change at chapter / canto / district boundaries; the reader sees where they are in the cosmology AND who their neighbors are AND what's coming.

**Token-coupling.** CD2 lane pigments per cosmology layer (Inferno wine-red dispatch markers; Purgatorio / Eden / Paradiso / Empyrean / Pillars per layer); CD3 district-context (`cartography.district.<name>` references; `cartography.marker.<role>` references); CD3 cartography substrate motion (flicker / grid-line awareness — CD3-owned per §4 below).

**Motion-active contract.** Holds active handle while scroll-progress crosses chapter/canto boundaries OR while CD3 district-context updates trigger position-marker shifts; releases at settle.

**Reduced-motion fallback.** Static current-position indicator; no transitions on boundary crossings (binary indicator state at scroll-stop).

**Budget envelope notes.** Co-sleeps with ChapterRail (§3.4 Lenis scroll-active state). District-context updates are infrequent (chapter / canto granularity, not per-frame); motion-active bursts are short (~200–400ms refinable at W3).

### Components deferred to W3 component-layer implementation

Per CD4 14-component inventory + §0 C9 descriptive blueprint discipline, motion specs for the remaining 8 components defer to W3:

| # | Component | CD5 deferred reason |
|---|---|---|
| 2 | **SiteNav** | W3 spec-level: per-mode affordance crossover (porous gradient per CD1 thesis Decision 8); motion category likely opacity + slide patterns |
| 4 | **ReadingProgress** | W3 spec-level: linear progress; co-sleeps with Lenis |
| 5 | **Footnote** | W3 spec-level: disclosure-on-hover or click; motion category likely fade + transform-Y |
| 6 | **CodeBlock + CopyButton** | W3 spec-level: copy-feedback motion; token-coupled to META-register surface |
| 9 | **CrossPost** | W3 spec-level: positionally-controlled per CD1 thesis Decision 8; motion likely entrance + dismiss |
| 10 | **SearchPalette** | W3 spec-level: open / close transitions; cmd-K-style overlay |
| 11 | **ChatPanel** | W3 spec-level: Virgil chatbot interface; entrance + message-stream motion |
| 12 | **LiveRoom** | W3 spec-level: live-presence motion (cursors, avatars); high-frequency motion-active discipline |

CD5 establishes the motion-register patterns + reduced-motion-respect discipline + VRR performance envelope; W3 instances implement per-component motion within those structural locks.

---

## §4 — Atmospheric layer motion-coupling rule (folded from atmosphere.md retirement per master plan §12 RES-009)

### Universal concept

Atmosphere reads as physical substrate when it does not compete for compositor budget. Per CD1 thesis Concept 4 + Decision 5: *"atmosphere is the substrate the publication is printed on; it carries warmth and weight without calling attention to itself."* Animation of the substrate breaks the substrate-not-effect read; the page reads as a styled-blog (effect layer) rather than a physical-paper publication (substrate layer).

Atmospheric chrome tokens express the substrate's perceptual register; their MOTION discipline is the structural mechanism that protects the register from spectacle-mode drift.

### Examples that prove the concept at frontier scale

- **The Paris Review Pentagram-Willey** — paper warmth as substrate; motion lives at the editorial layer above the substrate, never at the substrate
- **INQUE** — typewriter body + graphic headline; light/dark as page design (static page-level treatment; motion at content layer)
- **The Baffler Pentagram** — open space + visuals breathe (substrate static; component motion subtle)
- **NYT Magazine 2026** — atmospheric register through bespoke type + paper-warmth color anchors; motion register reserved for content layer

### Prime's expression — atmospheric layer motion-coupling rule (STRUCTURAL LOCK)

**Atmospheric chrome tokens are NOT animated as primary motion targets.**

The chrome tokens (`tokens.color.atmosphere.sky-high` / `sky-low` / `reflect` / `window-warm`; CD2-owned per §12 RES-009; ratified at CD2 workshop Section 4.5) animate ONLY at:

1. **Theme-cycle transitions** (theme-cycler component per §3.1 above) — chrome tokens shift to new theme values; GSAP-orchestrated cross-fade; once per theme-swap event
2. **Ambient drift** — slow, subtle warmth modulation expressing time-of-day or atmospheric breathing; cadence currently inclined toward ~30s tick (refinable at W3 + W5); uses `setTimeout` per §2 Layer 3 (NOT continuous rAF; compositor stays asleep between ticks)

The atmospheric-substrate visual layer (CD3-owned per §12 RES-009: P5.js paper grain + D3.js contour-ink + cartographic substrate per cartography.md) renders STATIC at typical scroll cadence. CD5 motion register treats CD3's atmospheric substrate as background scenography that does not compete for compositor budget.

### Cartography flicker — CD3-owned within CD5 envelope

Per CD1 thesis §4.4 Decision 9: cartography is the V1 MVP hero, with a dynamic-living layer above the D3 + P5 + CSV foundation. The dynamic-living layer includes flicker (lights in the city, never distracting), grid-line awareness, auto-correction. These ARE motion concepts.

**Ownership boundary.** CD3 owns cartography flicker IMPLEMENTATION (rendering pipeline, P5.js draw cycle, flicker pattern authorship). CD5 sets the structural BUDGET ENVELOPE within which CD3's flicker operates:

- Cartography flicker uses Layer 3 deferred scheduling (setTimeout / requestIdleCallback) — NOT continuous rAF
- Flicker ticks happen at low cadence (refinable at CD3; currently inclined toward 1-2s tick range to preserve "alive but never distracting" register per CD1 thesis dial principle)
- Compositor stays asleep between flicker ticks; flicker does NOT consume the editorial-layer motion budget
- The dial principle (CD1 thesis §4.4) maps directly onto this VRR state machine — cartography scales between *more* and *less* present per surface/page/article via flicker cadence + ambient-drift coupling

### Why this lock

If atmospheric chrome animates at scroll cadence, the dev-diary microsite reads as styled-blog (effect layer competing for attention with editorial content). If atmospheric chrome and substrate animate independently of each other, the cohesion mechanism breaks. If cartography flicker uses continuous rAF, the editorial-layer motion budget is consumed by background scenography.

The lock structurally enforces atmosphere-not-spectacle (§3.A 7-row table Row 4); without it, every downstream W3 + W5 instance has to relitigate the discipline. Locking the rule at CD5 makes W3 + W5 mechanically downstream.

### What the lock closes (substitution = §12 amendment)

- Atmospheric chrome animating at scroll cadence (e.g., scroll-driven sky-shift) — STRUCTURALLY EXCLUDED from the V1 atmospheric register; valid for other Buildings per §1.3 + CD1 thesis §3 alternative-register catalog
- Atmospheric substrate animating at typical scroll cadence — STRUCTURALLY EXCLUDED for the same reason
- Cartography flicker on continuous rAF — STRUCTURALLY EXCLUDED; CD3 implementation must use deferred scheduling per Layer 3

### What the lock does NOT close (refinable downstream)

- Specific ambient-drift cadence (currently inclined toward ~30s; refinable at W3 + W5)
- Specific flicker cadence + amplitude per cartography surface (CD3 + W3 + W5 dial-principle iteration)
- Future Buildings choosing alternative atmospheric registers (self-illumination / reflective-surface / luminance-inverted per CD1 thesis §3) — per-Building register flexibility per §1.3

---

## §5 — Tool partner workflow

### Universal concept

The motion production pipeline runs as: *concept exploration → state-machine prototyping → vector-animation authoring → high-fidelity production → runtime composition.* Each stage uses tools fit for that stage; the runtime composition stage is where §1's structural lock lives. The earlier stages produce design artifacts that feed runtime composition with specifications, not with code.

### Examples that prove the concept-family at industry scale

Per §3.A CD5 partner-tools row (Mayor 2026-05-07 ratified shape):

| Stage | Partner tool (currently inclined; per §6.5 framework at W3 / W5 dispatch) | Purpose |
|---|---|---|
| **Concept exploration** | **Origami Studio** (Facebook origin; node-based) | High-end interaction prototyping; explore micro-interactions before committing to runtime |
| **State-machine prototyping** | **ProtoPie** (cross-platform) | Advanced state-machine prototyping; communicate motion intent across design + engineering surfaces |
| **Vector-animation authoring (runtime state machines)** | **Rive** (web + native runtime state-machine) | Runtime state-machine vector animations; production-deployable to web + native |
| **Vector-animation distribution** | **Lottie / dotLottie** (Airbnb origin; dotLottie 2024+ for compressed delivery) | Vector animation distribution format; AfterEffects → Lottie pipeline |
| **High-fidelity production** | **Adobe After Effects** | Industry-baseline high-fidelity motion production; feeds Lottie distribution |
| **Runtime composition (§1 structural lock)** | **Motion v12 + GSAP + Lenis** | Runtime composition layer; single-rAF supervisor architecture |

### Per-tool incorporation discipline

Per §6.5 5-dimension framework + Stream-F provenance ledger (`tool-ledger/decisions/`): each tool decision logs Cost / Load heaviness / Use case / Capability ceiling / Capability floor / Risks data. CD5 ratifies the workflow SHAPE; Mayor adjudicates per-tool incorporation at W3 / W5 dispatch with full evidence per §6.5.

This is the descriptive blueprint per §0 C9 — currently inclined toward the named partners; alternatives deferred-with-research-citation per §1.7 reframe 2.3 (no rejections-only deferrals). Partner tools cited as EXAMPLES that prove the concept-family; Prime's workflow expression in DISpatch's register is the workflow shape itself, not the specific tool roster.

---

## §6 — Cross-stream coordination (concurrency-safe parallel band; per §4 W1 + §5.2 stub-vs-lock)

CD5 runs PARALLEL with CD2 / CD3 / CD4 in the W1 parallel band after CD1 SERIAL gate. CD6 SERIAL recombination reconciles all five sub-phases. CD5 references upstream / peer phases per §5.2 stub-vs-lock pattern.

### §6.1 — Reads from CD1 (SERIAL upstream; ratified)

CD5 reads from `representation/visual-system/thesis.md` (RATIFIED 2026-05-08):

- **Concept 4 (atmosphere as physical substrate)** — ratifies the atmosphere-not-spectacle universal concept; CD5 §4 motion-coupling rule structurally enforces
- **Concept 3 (metro-map wayfinding)** + **Decision 4 (CosmologyMarker as primary wayfinding asset)** — drives CD5 §3.6 CosmologyMarker addition (closes the CD1 ↔ CD5 cohesion gap surfaced at CD5 workshop adjudication)
- **Decision 9 (cartography-as-MVP-hero subtly + dial principle)** — drives CD5 §4 cartography flicker ownership boundary (CD3 implementation; CD5 budget envelope)
- **§3 provisional register lock (atmosphere-not-spectacle)** — drives CD5 §1 stack lock + §2 VRR envelope + §4 coupling rule

### §6.2 — Stubs from CD2 (PEER parallel band; in-flight)

CD5 references CD2's atmospheric chrome tokens BY NAME via §5.2 stub pattern:

- `tokens.color.atmosphere.sky-high` / `sky-low` / `reflect` / `window-warm` — referenced in §3.1 theme-cycler + §4 motion-coupling rule
- OKLCH numerical values stubbed per §5.2; CD2 ratifies values at CD2 workshop Section 4.5; W2 Stream-B Style Dictionary v4 token-pipeline compiles to runtime

CD5 does NOT declare chrome token values per §12 RES-009 — chrome tokens are CD2-owned. If CD2 ratifies a chrome token name change, this file references-by-name and inherits CD2's ratification at CD6 recombination.

### §6.3 — Stubs from CD3 (PEER parallel band; in-flight)

CD5 references CD3's atmospheric-substrate rendering pipeline as substrate within the §4 motion-coupling rule envelope:

- P5.js paper grain — substrate; static at scroll cadence
- D3.js contour-ink — substrate; static at scroll cadence
- Dynamic-living layer (flicker, grid-line awareness, auto-correction) — CD3-owned implementation; CD5 envelope (Layer 3 deferred scheduling)
- `cartography.district.<name>` + `cartography.marker.<role>` references in §3.6 CosmologyMarker — stubbed per §5.2; CD3 ratifies at CD3 workshop

### §6.4 — Stubs from CD4 (PEER parallel band; in-flight)

CD5 references CD4's component inventory:

- Initial 6 components ratified for motion specs at CD5 (theme-cycler / scroll-pinned reveal / DldsPanel / ChapterRail / Wordmark / CosmologyMarker per §3 above)
- Remaining 8 components in CD4's 14-component inventory — motion specs deferred to W3 component-layer per §0 C9
- Per-component spec.md stubs (slots / composition / variants / per-state motion / theme-cycler integration / per-theme token pairing) authored by CD4 per CD4 brief Section 3; CD5 motion patterns feed CD4 spec-level "per-state motion" entries at CD6 recombination

### §6.5 — Writes to CD6 (SERIAL recombination)

CD5 writes the motion register that CD6 reads at W1 recombination:

- Motion stack (§1) — CD6 reads as ratified structural lock; no relitigation
- VRR performance envelope (§2) — CD6 reads as ratified gate framework
- Per-component motion specs (§3) — CD6 reads as ratified initial-6 set; remaining 8 deferred-to-W3
- Atmospheric layer motion-coupling rule (§4) — CD6 reads as ratified structural lock; chrome tokens + substrate motion discipline mechanically downstream
- Tool partner workflow (§5) — CD6 reads as ratified workflow shape; per-tool selection W3 / W5

CD6 reconciles CD1 + CD2 + CD3 + CD4 + CD5 into the META × NARRATIVE article-pattern catalog + sonic-system v0 + brand-bible thesis-statement.md per §3.A CD6 sub-phase.

### §6.6 — Cross-surface signals (per §8.7)

Append to `v1-dev-diary-microsite/cc-ledger/cross-surface-signals.md` at session end:

- **DISCOVERY signal (CD5 → CD1 + CD4 + CD6)**: CD5 expanded initial component motion-spec set from 5 to 6 (added CosmologyMarker per CD1 thesis Decision 4 cohesion gap closure). CD6 recombination reads CosmologyMarker motion spec from §3.6 above; CD4 component spec.md inventory line item for CosmologyMarker can reference CD5 §3.6 motion-pattern spec at CD6.

---

## §7 — Mayor adjudication record (CD5 workshop 2026-05-07)

Append-only standing-history record per §0 C10 + Mayor 2026-05-02 four-verb vocabulary (create / append / amend / tombstone). Each entry: decision + reasoning + §6.5 5-dimension data.

### Decision 1 — Motion stack ratified at four-vertebra single-rAF composition (Option D)

**Decision.** Prime's expression of the composable runtime motion stack universal concept is Motion v12 + GSAP + Lenis + single-rAF supervisor — four-vertebra composition. Substitution at the lock tier = §12 amendment per §8.0 charter.

**Reasoning (Mayor 2026-05-07 CD5 workshop).** Capability ceiling + Capability floor tip the recommendation. Option D covers all three motion vectors (layout-position + timeline-orchestrated + scroll-driven) at frontier-grade; Options A (Motion v12 only), B (GSAP + Lenis only), C (bare CSS @keyframes + Lenis) close motion vectors off. Bundle-cost (~80kb gz) is absorbable inside Row 13 Lighthouse Performance ≥ 90 budget envelope. The single-rAF discipline is the cohesion mechanism — substitution invalidates the architecture at amendment level.

**5-dimension framework.**

| Dimension | A. Motion v12 only | B. GSAP + Lenis only | C. Bare CSS @keyframes + Lenis | D. Motion v12 + GSAP + Lenis + single-rAF (ratified) |
|---|---|---|---|---|
| 1. Cost | Lowest stack | Medium | Lowest | Highest (3 libs) |
| 2. Load heaviness | ~30kb gz | ~50kb gz | <5kb | ~80kb gz |
| 3. Use case | React-native layout only | Timeline + scroll | Static-leaning surfaces | All three vectors covered |
| 4. Capability ceiling | Capped at layout transitions | Capped at timeline + scroll | Capped at CSS-expressible | Unbounded |
| 5. Capability floor | Closes timeline orchestration | Closes React-native layout | Closes most editorial motion | Doesn't close any vector |
| 6. Risks | Timeline patterns won't compose | Layout transitions awkward | Won't reach principal-grade | Bundle-size pressure (mitigated) |

### Decision 2 — Atmospheric layer motion-coupling rule ratified at theme-cycle + ambient drift only; substrate static at scroll (Option C)

**Decision.** Atmospheric chrome NOT animated as primary motion target. Theme-cycle + ambient drift only. Atmospheric-substrate (CD3-owned per §12 RES-009) static at typical scroll cadence. Cartography flicker (CD3-owned) uses Layer 3 deferred scheduling within CD5 budget envelope.

**Reasoning (Mayor 2026-05-07 CD5 workshop).** Use case + Capability floor tip. Atmosphere-not-spectacle is the V1 register choice (CD1 thesis §3 ratified); Option A (substrate animates at scroll cadence) breaks the register; Option B (substrate fully static, no theme-cycle) closes theme-cycle UX off. Option C lands in the middle — preserves the dial principle (CD1 thesis §4.4); first building's right shape.

Mayor commentary: *"It puts us right in the middle between the highest and the lowest, so we could have the dial. It's a good landing spot for the first building."*

**5-dimension framework.**

| Dimension | A. Substrate animates at scroll | B. Substrate fully static | C. Theme-cycle + ambient drift only (ratified) |
|---|---|---|---|
| 1. Cost | Highest | Lowest | Medium |
| 2. Load heaviness | 30%+ compositor budget on substrate | Frees full budget | ~5% budget |
| 3. Use case | Spectacle-mode (different register) | Pure print-substrate; loses theme-cycle | Atmospheric register holds; theme-cycle preserved |
| 4. Capability ceiling | Maximum visual richness (spectacle-coded) | Maximum performance headroom | Atmospheric register at ceiling; theme-cycle UX expressive |
| 5. Capability floor | Closes atmosphere-not-spectacle | Closes theme-cycle UX | Doesn't close anything Prime currently inclines toward |
| 6. Risks | Apple-cohesion test fails | Theme-cycle feels jarring | Drift specifics defer to W3 (acceptable per §0 C9) |

### Decision 3 — Per-component motion specs initial set expanded to 6 (CosmologyMarker added)

**Decision.** Initial 6 components ratified for motion-pattern specs: theme-cycler / scroll-pinned reveal / DldsPanel / ChapterRail / Wordmark / **CosmologyMarker** (added). Remaining 8 components in CD4's 14-component inventory deferred to W3 component-layer implementation per §0 C9.

**Reasoning (Mayor 2026-05-07 CD5 workshop).** Capability floor + Use case tip. CD1 thesis Concept 3 + Decision 4 ratifies CosmologyMarker as the primary wayfinding asset on every article surface (per closure of DP-Q2: "graphics-only via metro-map cosmology marker on every article surface; Italian-in-text overlay eliminated"). A wayfinding asset that loads on every article surface but lacks a ratified motion spec at CD5 enters W3 under-scaffolded relative to its load. Adding CosmologyMarker closes the CD1 ↔ CD5 cohesion gap surfaced at workshop adjudication.

Mayor commentary: *"Yes, 100%. We have to add the cosmology marker."*

**5-dimension framework.**

| Dimension | A. Brief's 5 (theme-cycler + scroll-pinned + DLDS + ChapterRail + Wordmark) | B. 6 — add CosmologyMarker (ratified) |
|---|---|---|
| 1. Cost | Lower CD5 authoring | One additional motion-pattern entry (~4 lines) |
| 2. Load heaviness | 5 patterns | 6 patterns |
| 3. Use case | Covers chrome + nav + content reveal + disclosure + theme | Adds the THESIS-LEVEL wayfinding asset CD1 just locked as primary cosmology-marker affordance |
| 4. Capability ceiling | Initial 5 cover principal categories | Initial 6 cover principal categories + ratified thesis-level asset |
| 5. Capability floor | CosmologyMarker enters W3 with no motion-pattern scaffold; W3 component-implementor relitigates | Closes CD1 → CD5 cohesion gap |
| 6. Risks | W3 relitigation drift; metro-map "you are here" affordance under-specified at gate | None — addition is small + thesis-traced |

### Decision 4 — Performance budget reframed as variable refresh rate envelope (Mayor amendment 2026-05-07; Option B)

**Decision.** Motion budget gate reframed from fixed-60fps gate (brief's pre-name) to variable refresh rate envelope per Mayor amendment. Idle = compositor truly asleep (display drops to OS-level adaptive idle: 10Hz iPhone/iPad ProMotion / ~24Hz macOS ProMotion / display-floor on non-VRR hardware). Active = rAF inherits display refresh rate (60Hz floor / 120Hz ProMotion / up to 240Hz capable desktop). Per-frame work budget shrinks at higher cadence (≤16ms at 60Hz / ≤8ms at 120Hz / ≤4ms at 240Hz). Mid-cadence motion uses deferred scheduling (setTimeout / requestIdleCallback) NOT continuous rAF. INP ≤ 200ms / CLS ≤ 0.1 / reduced-motion respect (FLOOR per WCAG 2.1 SC 2.3.3) hold independent of VRR.

**Reasoning (Mayor 2026-05-07 CD5 workshop; ratified after precision Q on Apple ProMotion 10–120Hz envelope).** Capability ceiling + Capability floor + Use case all tip. Apple ProMotion native pattern translated to web; Linear web app + Stripe Press 2024 redesign prove the pattern at frontier scale. The platform-substrate ripple (per §1.2) is real — future Buildings inherit VRR-aware motion as the default Prime register. Cost is genuinely higher (LoAF instrumentation + per-component motion-active contracts) but cost is absorbed by the single-rAF discipline already locked at Decision 1; marginal cost is the LoAF telemetry + contract authoring (~2-3 lines per component spec at W3).

Mayor commentary: *"It can go down to 0, 1, 2, or 3 at static and then in motion can shoot up to 240 FPS. ... I want to hear what it would take to do variable refresh rate."* And on the precision Q (does this get us to Apple ProMotion 10–120Hz envelope?): *"Yes sir! Rip it and go, great refinement."*

The honest precision: there is no web equivalent of native iOS `CADisplayLink.preferredFrameRateRange(min, max, preferred)`. The web's primitive is binary — rAF on (display delivers its current cadence) OR rAF off (compositor sleeps; display drops to adaptive idle). The 10Hz/24Hz floor is reached INDIRECTLY via compositor-sleep; the 120Hz/240Hz ceiling is reached DIRECTLY via uncapped rAF. Mid-cadence motion approximates via setTimeout (compositor-sleeps between ticks; structurally cheaper than steady mid-rate rAF). Equivalent battery effect; not bit-identical to native API.

**5-dimension framework.**

| Dimension | A. Fixed 60fps gate (brief pre-name) | B. Variable refresh rate envelope (ratified) |
|---|---|---|
| 1. Cost | Lower — no state-machine, no library wake/sleep coordination, no LoAF instrumentation | Higher — supervisor + library coordination + LoAF instrumentation + per-component motion-active contract |
| 2. Load heaviness | Constant ~60fps when active; battery cost ongoing | Idle: 0fps (true compositor sleep); active: 60–240Hz hardware-dependent; load self-titrates per state |
| 3. Use case | Most editorial sites (NYT / Quanta / Baffler) — pleasant at fixed 60Hz | Apple ProMotion native pattern translated to web; Linear web app discipline; future high-frequency Buildings (live cartography / dashboards / real-time collab) inherit |
| 4. Capability ceiling | Caps at 60Hz; cannot express 120Hz+ smoothness; cannot express compositor-sleep | Caps at hardware ceiling (240Hz capable; 120Hz ProMotion native; 60Hz floor); compositor-sleep on idle |
| 5. Capability floor | Closes ProMotion expressiveness; closes battery release on idle; closes platform-substrate VRR pattern for future Buildings | Doesn't close — gracefully degrades to 60Hz on legacy; reduced-motion supersedes; mobile / desktop / legacy all flow through one discipline |
| 6. Risks | Misses ProMotion / VRR-capable; misses idle battery release; Apple-cohesion test gap on ProMotion devices | Implementation discipline must be enforced; LoAF API browser support varies (mitigated by polyfill); requires per-component motion-active contract authoring at W3 |

### Decision 5 — Tool partner workflow shape ratified

**Decision.** Workflow shape ratified per §3.A CD5 row + §5 above: concept exploration (Origami Studio) → state-machine prototyping (ProtoPie) → vector-animation authoring (Rive runtime state-machines) → vector-animation distribution (Lottie / dotLottie) → high-fidelity production (Adobe After Effects) → runtime composition (Motion v12 + GSAP + Lenis per §1 structural lock). Per-tool incorporation per §6.5 5-dimension framework at W3 / W5 dispatch with full evidence.

**Reasoning (Mayor 2026-05-07 CD5 workshop).** Currently inclined toward the named partners; alternatives deferred-with-research-citation per §1.7 reframe 2.3 (no rejections-only deferrals). Workshop ratifies the workflow SHAPE; per-tool selection deferred to evidence-base decisions at downstream Waves.

**5-dimension framework.** N/A — workflow-shape ratification per concept-family lock; per-tool 5-dim adjudication occurs at W3 / W5 dispatch per Stream-F provenance ledger discipline.

---

## §8 — Done criteria

Per CD5 brief done-criteria + §6.5 verification mechanism + Apple-cohesion test framing per §4 W1 Mayor gate:

- [x] File exists at `v1-dev-diary-microsite/representation/visual-system/motion.md` with YAML frontmatter (atmosphere.md retired per §12 RES-009; CD5 ships only this file)
- [x] All 8 sections populated; each section actionable for downstream W3 / W5 instances reading cold
- [x] Motion stack ratified — Motion v12 + GSAP + Lenis + single-rAF supervisor (STRUCTURAL LOCK at §8.0 charter level; substitution = §12 amendment)
- [x] Variable refresh rate performance envelope ratified — idle compositor sleep + active hardware ceiling + per-frame budget at cadence + LoAF instrumentation + INP ≤ 200ms + CLS ≤ 0.1 + reduced-motion respect (LAUNCH-NON-NEGOTIABLE FLOOR per WCAG 2.1 SC 2.3.3)
- [x] Atmospheric layer motion-coupling rule ratified — chrome tokens NOT animated as primary motion target; theme-cycle + ambient drift only; substrate static at scroll cadence; cartography flicker (CD3-owned) within Layer 3 envelope (STRUCTURAL LOCK at rule level)
- [x] Per-component motion specs ratified for the initial 6 components (theme-cycler / scroll-pinned reveal / DldsPanel / ChapterRail / Wordmark / CosmologyMarker) — patterns LOCK + reduced-motion-respect floor per component
- [x] Tool partner workflow ratified — Origami / ProtoPie / Rive / Lottie+dotLottie / After Effects / Motion v12 / GSAP / Lenis (concept-family LOCK; per-tool incorporation per §6.5 framework at W3 / W5 dispatch)
- [x] Cross-stream coordination explicit — CD1 reads (ratified) + CD2 chrome-token stubs (per §5.2) + CD3 atmospheric-substrate stubs (per §5.2) + CD4 component-stubs (per §5.2) + CD6 recombination point cited; atmosphere.md retirement folds-out documented per §12 RES-009
- [x] Mayor adjudication points logged with §6.5 5-dimension framework data inline at §7 (standing-history record)
- [x] Currently-inclined-toward-X muted language applied throughout register / aesthetic / specific timing references per §0 C8
- [x] Concept-first framing per §0 C7 + §1.1 — universal concepts cited first; reference platforms / partner tools cited as examples that prove

### Verification mechanism (per §6.5 + brief verification mechanism)

The CD5 workshop is principal-grade if a future W3 component-layer instance reading this file cold can immediately:

- Know the motion stack (Motion v12 + GSAP + Lenis + single-rAF supervisor) and not relitigate it
- Know the VRR performance envelope (idle compositor sleep at adaptive low cadence; active at hardware ceiling; per-frame budget at cadence; LoAF instrumentation; INP / CLS / reduced-motion floor) per §6.6 Row 13 propagation
- Know which 6 components have ratified motion-pattern specs and what each pattern's reduced-motion fallback + motion-active contract requires
- Know which 8 components carry deferred motion specs into W3 component-implementation
- Know which partner tools the production pipeline names (Origami → ProtoPie → Rive / Lottie+dotLottie → After Effects → Motion v12 / GSAP / Lenis runtime per §1 structural lock)
- Know which atmospheric chrome tokens (CD2-owned) are NOT animated as primary motion targets and how the motion-coupling rule structurally enforces atmosphere-not-spectacle
- Know that cartography flicker (CD3-owned) operates within Layer 3 deferred scheduling envelope and does not consume the editorial-layer motion budget

CD6 (W1 SERIAL recombination) reading CD1 + CD2 + CD3 + CD4 + this file cold can reconcile the five sub-phases into the META × NARRATIVE article-pattern catalog + sonic-system v0 + brand-bible thesis-statement.md without relitigating motion-stack or atmosphere-not-spectacle locks.

Apple-cohesion test (per §4 W1 Mayor gate + CD1 thesis §5): does Tim-Cook-on-stage feel match a CODA scene match a "change your password" email match the icon-corner-radius? CD5's atmosphere-not-spectacle motion register + variable-refresh-rate envelope cohere with CD2 lane pigments + CD3 cartography paradigm + CD4 component visual specs at the cross-surface integration level.

Per §0 C9: verification is descriptive ("did we produce what the brief scaffolded; does a future instance read it cold and execute against it") not prescriptive ("did we hit a 95% conformance metric") per `feedback_metric_vs_gate_discipline.md`.

---

*CD5 motion register ratified W1 Stream-A 2026-05-07. Mayor + CD5 instance ideation cycle per cd5-brief.md Sections 1-8 + §6.5 5-dimension framework + RES-008 Conductor support. PARALLEL band continues for CD2 / CD3 / CD4; CD6 SERIAL recombination reconciles all five sub-phases.*

---

## §9 — Amendment Ledger (this file)

Per `feedback_documentation_lifecycle.md` four-verb vocabulary (create / append / amend / tombstone). Append-only standing-history record. Original ratified content preserved verbatim per master plan §0 C10 + the discipline that ratified content is never edited. Amendments append supersession notices.

### RES-CD5-001 — Drift B absorption: CosmologyMarker → MetroMapMarker rename

**Status.** APPEND-AMENDMENT 2026-05-09 (W1 close cluster; CC-Mayor-delegated CD6 Brand Synthesis Pass).

**Affects.** All occurrences of "CosmologyMarker" in this file:
- Frontmatter `status` field (line 5)
- Frontmatter `upstream-cd1` field (line 15)
- §3 introduction (line 19; "initial 6 (theme-cycler / scroll-pinned reveal / DldsPanel / ChapterRail / Wordmark / CosmologyMarker)")
- §3.6 heading + body (5+ occurrences within §3.6)
- §6.1 (Decision 4 CosmologyMarker as primary wayfinding asset cite)
- §6.6 cross-surface signals (DISCOVERY signal text)
- §7 Decision 3 (multiple occurrences in option set + reasoning + 5-dim framework)
- §8 done criteria + verification mechanism

**Canonical name.** **MetroMapMarker** per CD4 §3.3 ratified rename from CosmologyMarker per DP-Q2 metro-map closure (CD4 RATIFIED 2026-05-08; thesis.md §6.1 closes DP-Q2 graphics-only via metro-map; CD4 §3.3 inventory-shifts audit-trail entry: "DP-Q2 closed metro-map (NOT pyramid) per CD1 Concept 3; rename follows ratification"). Per `representation/voice/thesis-statement.md` (W1 CD6 RATIFIED 2026-05-09) §7 Adjudication 2: in-place rename was an Option A/B/C 5-dim framework; Option B (in-place amend per amendment-ledger) selected.

**Provenance of drift.** This file authored 2026-05-07; CD4 ratified rename 2026-05-08 (one day after CD5 ratification). CD5 referenced the pre-rename name "CosmologyMarker" because CD4's DP-Q2 closure had not yet ratified. This is a parallel-band ratification-order artifact; not a defect in CD5 reasoning.

**Disposition.** APPEND amendment ledger entry (this entry) citing canonical name; original CD5 text preserved verbatim per ratified-content append-only discipline (modified from thesis-statement §7 Adjudication 2 Option B "in-place amend" to canonical-respecting "append-amendment with verbatim preservation" per documentation-lifecycle strictest reading; thesis-statement §7 Adjudication 2 disposition adjusted at this canon-respecting layer). Downstream consumers (W3 / W5) inherit canonical name via this amendment ledger entry + CD4 §3.3 inventory-shifts audit-trail + thesis-statement §3.2 7-Terrace canonical structure cite.

**Read-cold guidance for downstream.** When reading this file, treat "CosmologyMarker" everywhere as referring to **MetroMapMarker** (current canonical name; per CD4 §3.1 component #8 inventory entry + per-component spec scaffold at `representation/visual-system/components/MetroMapMarker/spec.md`). The semantic content of §3.6 motion-spec, §7 Decision 3, §6.6 cross-surface signal, and all other CosmologyMarker references holds — only the component name has shifted.

**Adjudicator.** CC-Mayor-delegated 2026-05-09 per Mayor "go through the whole thing reconcile everything using create / append / amend / tombstone principle" full-cycle delegation per `representation/voice/thesis-statement.md` §7 Adjudication 2.

**Pointer to standing-history.** CD4 §3.3 inventory-shifts audit-trail (CosmologyMarker → MetroMapMarker rename row); per-component spec at `representation/visual-system/components/MetroMapMarker/spec.md`; thesis-statement §7 Adjudication 2 5-dimension framework + disposition.

### RES-CD5-002 — Drift C-positive absorption: Component count 14 → 20 motion-spec re-key

**Status.** APPEND-AMENDMENT 2026-05-09 (W1 close cluster; CC-Mayor-delegated CD6 Brand Synthesis Pass).

**Affects.** All occurrences of "14-component" / "8 components" deferred-set framing in this file:
- Frontmatter `upstream-stubs` field (line 19; "CD4 (components) 14-component spec set")
- §3 introduction (line 169-170; "Initial 6 components ratified ... remaining 8 components in CD4's 14-component inventory")
- §3 deferred-list table heading (line 261; "Components deferred to W3 component-layer implementation")
- §6.4 (line 396-397; "Initial 6 components ratified for motion specs at CD5 ... Remaining 8 components in CD4's 14-component inventory")
- §7 Decision 3 (5-dim framework's "8 of 14" framing in option set descriptions)

**Canonical re-key.** Per CD4 ratified inventory 2026-05-08 (Mayor Cycle 1 + Cycle 2 LiveRoom inclusion): **20-component V1 inventory**, NOT 14-component. The component count expanded from 14 (default-14 brief) to 20 (Mayor-ratified within CD4 §3.1) via:
- 14 default-14 components retained (with 3 renames per CD1 ratification: Wordmark → MastheadWordmark; CosmologyMarker → MetroMapMarker; ChatPanel → VirgilChat)
- 6 NEW components per CD1 ratification: InstitutionalFixture / CartographyCanvas / ReceptionHero / EditorialDigest / LiveTicker / DistrictMap

**Re-keyed motion-spec deferred set.** Per thesis-statement §7 Adjudication 3: of the 20-component V1 inventory, **4 components have ratified motion specs at CD5** (#1 MastheadWordmark per §3.5 Wordmark hover + load motion; #3 ChapterRail per §3.4 scroll-progress motion; #7 DldsPanel per §3.3 expand-collapse; #8 MetroMapMarker per §3.6) + **2 motion patterns** (theme-cycler per §3.1; scroll-pinned reveal per §3.2 — these are MOTION PATTERNS applicable across components, NOT individual components). **16 of 20 components deferred to W3 component-layer implementation per §0 C9**.

The 16 components deferred:

| # | Component | CD5 deferred reason |
|---|---|---|
| 2 | SiteNav | W3 spec-level: per-mode affordance crossover (porous gradient per CD1 thesis Decision 8); motion category likely opacity + slide patterns |
| 4 | ReadingProgress | W3 spec-level: linear progress; co-sleeps with Lenis |
| 5 | Footnote | W3 spec-level: disclosure-on-hover or click; motion category likely fade + transform-Y |
| 6 | CodeBlock + CopyButton | W3 spec-level: copy-feedback motion; token-coupled to META-register surface |
| 9 | MetaArticleOpener | W3 spec-level: institutional / compressed / data-forward opener motion (per `meta-pattern.md` §3.4) |
| 10 | NarrativeArticleOpener | W3 spec-level: literary / spacious / voice-driven opener motion (per `narrative-pattern.md` §3.4) |
| 11 | InstitutionalFixture | W3 spec-level: ambient drift candidate per §4 atmospheric layer motion-coupling rule (paper-grain warm-paper substrate; not screen-illuminated) |
| 12 | CartographyCanvas | W3 spec-level: cartography flicker via Layer 3 deferred scheduling (CD3-owned implementation; CD5 §4 budget envelope) |
| 13 | ReceptionHero | W3 spec-level: feature-story hero entrance; reception walking-metaphor inheritance |
| 14 | EditorialDigest | W3 spec-level: list-chrome reveal; magazine-glossary entry-rendering |
| 15 | LiveTicker | W3 spec-level: live update motion register (META Wired/Hacker; new entries fade-in at top; Lenis-equivalent-aware) |
| 16 | DistrictMap | W3 spec-level: cartography-coupled at homepage zoom; flicker via Layer 3 (shared with CartographyCanvas) |
| 17 | CrossPost | W3 spec-level: positionally-controlled per CD1 thesis Decision 8; motion likely entrance + dismiss |
| 18 | SearchPalette | W3 spec-level: open / close transitions; cmd-K-style overlay |
| 19 | VirgilChat (renamed from ChatPanel per CD4 §3.3) | W3 spec-level: Virgil chatbot interface; entrance + message-stream motion |
| 20 | LiveRoom | W3 spec-level: live-presence motion (cursors, avatars); high-frequency motion-active discipline; flicker discipline shared with LiveTicker + CartographyCanvas |

**Provenance of drift.** This file authored 2026-05-07; CD4 ratified 20-component inventory 2026-05-08 (one day after CD5 ratification). CD5 referenced the pre-expansion 14-component count because CD4's Cycle 1 + Cycle 2 ratification had not yet ratified. This is a parallel-band ratification-order artifact; not a defect in CD5 reasoning.

**Disposition.** APPEND amendment ledger entry (this entry) citing canonical 20-component re-key; original CD5 text preserved verbatim per ratified-content append-only discipline. Downstream consumers (W3 / W5) inherit canonical 20-component inventory via this amendment ledger entry + CD4 §3.1 V1 inventory + thesis-statement §7 Adjudication 3 5-dimension framework.

**Read-cold guidance for downstream.** When reading this file, treat "14-component" framing everywhere as referring to **20-component canonical V1 inventory**; treat "8 of 14 deferred" framing as **16 of 20 deferred to W3** per the table above. The semantic content of CD5 ratified motion-pattern specs holds — only the component count + deferred-set re-key shifts.

**Adjudicator.** CC-Mayor-delegated 2026-05-09 per Mayor "go through the whole thing reconcile everything using create / append / amend / tombstone principle" full-cycle delegation per `representation/voice/thesis-statement.md` §7 Adjudication 3.

**Pointer to standing-history.** CD4 §3.1 V1 inventory + §3.3 inventory-shifts audit-trail; thesis-statement §7 Adjudication 3 5-dimension framework + disposition.

---

*Amendment Ledger §9 appended W1 close cluster 2026-05-09 per Mayor 2026-05-09 full-cycle delegation. RES-CD5-001 absorbs Drift B CosmologyMarker → MetroMapMarker rename per documentation-lifecycle append-only discipline. RES-CD5-002 absorbs Drift C-positive component count 14 → 20 motion-spec re-key per same discipline. Original ratified content preserved verbatim; canonical pointers appended.*
