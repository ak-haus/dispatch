---artifact: cd3-cartography-spec
authored: W1 Stream-A CD3 (PCP-162)
authored-date: 2026-05-09
status: active
ideation-model: CD3 ideation cycle structure (Mayor + instance cycles per cd3-brief.md Sections 1-12; final ratification by Mayor)
authority: mayor
  - Mayor: district doctrine adjudication, cosmology expression adjudication, atmospheric texture adjudication, tool partner pipeline adjudication
  - brand-terrace skill operator role: authoring discipline for CD3 ideation per Mayor 2026-05-07 dispatch
  - master plan §3.A CD3 row + §1.1 register lock + §3.A 7-row concept-first table + §12 RES-009 (atmosphere.md retirement; CD3 owns full visual substrate)
upstream-cascade: master-plan.md v1.0.9 (TC-3.2.8) §3.A + §4 W1 + §12 RES-009 + CD1 thesis.md (RATIFIED 2026-05-08; commit db0366a + corrective 1d7d0c7) + CD1 reference-archive.md (RATIFIED 2026-05-08; same commit pair)
downstream-blocks: CD4 components (cartography lane semantics inform CD4 grid + chrome); CD6 brand synthesis (recombination point per §4 W1 SERIAL recombination)
downstream-feeds-via: token-stub interface to CD2 (color); spec-stub to CD4 (components); spec-stub to CD5 (motion) — all PARALLEL bands within W1
downstream-implementation: W2 token pipeline (real-CSS contexts); W3 component layer (cartography overlay component / atmospheric texture component / dispatch-marker component); W5 microsite Astro implementation
companion-files: representation/visual-system/thesis.md + reference-archive.md (CD1 ratified upstream contract)
title: DISpatch — CD3 Cartography Substrate Spec
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
last_amended: 2026-05-17
load_bearing: true
generated: true
---

# DISpatch — CD3 Cartography Substrate Spec

## Reading discipline

Per master plan §0 + §1.1 + CD1 thesis.md reading discipline: three concepts stay structurally separate throughout this cartography spec.

- **Aspiration** = universal concepts of cartographic substrate at principal-level quality (procgen-base-as-substrate / districts-as-semantic-units / atmosphere-as-physical-substrate / lanes-as-semantic-columns / cartography-as-dynamic-participant-not-background-CSV). Verifiable. Concept-first.
- **Inspiration** = specific tools + platforms cited as examples that prove the universal concept holds at world-class scale (Watabou City Generator / Azgaar / Inkarnate / Mapbox + MapLibre / D3.js + P5.js / NYT Upshot / Pudding / Stamen / Pentagram editorial cartography). Stages of the climb that prove the top is reachable.
- **Register** = per-surface choice. DISpatch's cartography register is one Building's choice for one surface's purpose; future Prime Buildings choose per their own surface's purpose.

Per master plan §0 C7+C8: aesthetic / register / atmospheric-texture / district-naming choices use muted technical language ("currently inclined toward X" / "first hypothesis is Y" / "subject to refinement at W2/W5") to preserve "what if I change my mind" headroom. Strong language is reserved for ratified load-bearing decisions (cartography-as-dynamic-participant per CD1 Decision 9; districts-not-blocks doctrine per CD3 §3; full-visual-substrate scope per RES-009).

**A spec is a guiding substrate, not a lockdown.** Per CD1 §0 + Mayor 2026-05-08 framing inherited: every downstream cycle (CD4 + CD6 + Stream-E cascades + W2 token pipeline + W5 microsite implementation) validates against or for the substrate ratified here. As implementation comes in, as adversarial validation lands at CD2, as Stream-E cascade returns surface evidence, decisions remain open to minor / major / complete makeovers in future versions where evidence leads. The substrate carries weight because everything CD3 hands to CD4 + CD5 + CD6 is presented against it; the substrate does not carry weight because it is immutable.

---

## §1 — Inputs from CD1 (recap)

Per dispatch brief Section 1 RECAP-not-revisit discipline: CD3 does not re-open CD1 adjudications. This section captures what CD1 ratified that CD3 builds on, in citation form. If CD1 outputs surface gaps that CD3 cannot resolve without re-opening CD1, the gap surfaces as a `cc-ledger/cross-surface-signals.md` DISCOVERY entry; otherwise CD3 §2–§12 proceed against these inputs.

### §1.1 — Thesis statement (citation: thesis.md §1)

CD1's ratified thesis (verbatim, thesis.md §1):

> *"DISpatch is the test pilot for Prime's platform — and the cartography is the test pilot's payload."*
>
> *"The microsite is a beautifully-articulated dynamic editorial space; that is table stakes for principal-grade. Many such sites exist; many ship. The reason DISpatch ships is that it demonstrates, at miniature scale, the maximalist living-cartography that activates Prime's imagination across every future Building. The dispatch is a demo for the cartography. The cartography is the demo for Prime."*

CD1 also ratified the cartography's mode of presence (thesis.md §1 + §4.4):

> *"The cartography is hero subtly, not loudly. Its super-heroism is that it can be forgotten while you are writing or reading the article. It lives underneath. The reader does not have to engage with it to feel it; engagement is optional, presence is structural. Look up from the article and it is there — alive, dynamic, mapped to where you are, what you are reading, what is near you, what is coming."*

**Load-bearing implication for CD3.** Per CD1 Decision 9 (Cartography commitment + dial principle, RATIFIED 2026-05-08):

> *"CD3 picks the toolset against the dial. CD1's commitment is **dynamic-living-cartography as the V1 ship requirement + dial principle as the operating mechanism**. CD3 cannot deliver static-CSV cartography and pass the thesis bar."*

**Mayor 2026-05-07 W1 CD3 ideation Cycle 1 clarifications** (per Signals 005 + 007 in `cc-ledger/cross-surface-signals.md`):

*Clarification 1 (Signal 005).* "static-CSV" in Decision 9 reads as **"static CSS + plain SVG"** for CD3 implementation purposes (Decision 9 typo carrying through CD1 ratification; thesis.md verbatim text preserved per documentation lifecycle append-never-edit discipline).

*Clarification 2 (Signal 007).* **The principal-level standard / gold-standard quality bar is THE foundation — NOT any specific expression.** CSS, plain SVG, D3.js, P5.js, Mapbox GL, WebGL, vector tiles, and other expressions are *how* the bar manifests at different layers of the cartography pipeline; no single expression sits at "foundation" tier. The bar is the foundation; expressions ride on top of it. We don't forfeit any expression — we build crazy ideas on top of standards + best practices (per master plan §1.7 reframe 2.1 production-launch quality bar + §1.7 reframe 2.3 don't-subtract + §6.5 don't-discard + §1.4.2 AI-first operability mod-able properties + §1.6 structural property #2 iteration substrate not iteration tax).

*Operational implication for CD3.* Static CSS + plain SVG-only cartography is not the V1 ship target — but those expressions ARE valid where they serve the bar. The V1 ship target is the **dynamic-living layer** per CD1 thesis §4.4 (flicker / grid-line awareness / auto-correction / real-time coupling to article state) **calibrated against the principal-level cartographic bar through the dial principle** — which determines which expressions sit at which presence-level per surface / per page / per article. When the dial calls for "more present," dynamic-living-layer expressions (D3.js / P5.js / WebGL / Mapbox / vector tiles) become primary; when "less present," CSS + SVG expressions stabilize the surface; **the bar is held across all dial positions**. Mayor surfaced operational context: prior multi-instance build cycles burned cycles on agents stuck repairing static CSS instead of producing the dynamic-living layer; CD3 specs protect against this failure mode by making the dial the explicit calibration mechanism. *"If a section feels too complex, simplify it to make it feel more complex"* (Mayor 2026-05-08, cited in CD1 §4.4 + Decision 9) is the dial-iteration principle.

CD3's full deliverable — every section below — operates against this commitment. **The principal-level cartographic bar is the foundation**; expressions of the bar (CSS / SVG / D3 / P5 / Mapbox / MapLibre / WebGL / etc.) are how the bar manifests per layer of the cartography pipeline (§2); the dial principle is how the bar gets calibrated per surface (§4 / §7).

### §1.2 — Cosmology metaphor scaffold (citation: thesis.md §4.1–§4.2 + cosmology-lock 2026-04-30)

CD1 thesis.md §4.1 cited the **6-position cosmology** Mayor-locked 2026-04-30. **Mayor 2026-05-07 W1 CD3 ideation Cycle 1 cosmology amendment** (per Signal 008 in `cc-ledger/cross-surface-signals.md`) supersedes the 2026-04-30 6-position lock with a **7-position cosmology**: Histories added as 7th and ACTUAL base layer = Living History of Prime = archive of tombstoned past per `feedback_documentation_lifecycle.md` four-verb vocabulary (create / append / amend / tombstone). Position ordering flipped from bottom-up (Pillars-first) to top-down (Empyrean-first; Histories as base) to align with Dante's Divine Comedy geography + Mayor's evolutionary-base framing. Per documentation lifecycle append-never-edit: thesis.md + reference-archive.md (RATIFIED 2026-05-08; commits db0366a + 1d7d0c7) stay verbatim citing the 6-position framing as authoritative at time of authoring; CD3 §1.2 amends-by-pointer with Mayor 2026-05-07 7-position cosmology; downstream consumers (CD2 / CD4 / CD5 / CD6 / W2 / W5) inherit via this CD3 §1.2 cite + Signal 008 + the updated cosmology lock memory file.

**Reframe 2 — cosmology-as-conceptual-not-cartographic + 7 Terraces named** (per Signal 010 in `cc-ledger/cross-surface-signals.md`; Mayor 2026-05-07 W1 CD3 ideation Cycle 1 second cosmology reframe). Cosmology positions are CONCEPTUAL organizational positions of Prime's identity — NOT 1:1 cartographic mappings. Real cities don't have "electricity districts" or "water districts" — utilities run UNDER the city as infrastructure (same with Inferno = 9 layers of Prime's infra, surfaces in cartography as red dispatch lights). NYC's city charter doesn't assign neighborhoods (same with Paradiso = the city charter, surfaces as institutional fixture). Cosmology surfaces in cartography through specific signals; **cartography itself is rendered by Purgatorio's cartographic-axis Terraces** (Districts-Terrace primary; Roads-Terrace + Neighborhoods-Terrace cross-cut). Mayor named all 7 Purgatorio Terraces 2026-05-07: **Brand / Roads / Districts / Neighborhoods / Offices / Citizens / Leisure** — each an organizational AXIS of Prime's material reality. (CD1 thesis §4.3 *"Editorial District = Brand-Terrace's neighborhood"* was loose framing conflating organizational axes; Editorial District is Districts-Terrace's content; per append-only documentation lifecycle thesis.md stays verbatim and CD3 amends-by-pointer per Signal 010.)

**Reframe 3 — cosmology IS the literal top-level folder tree of Prime repo + Paradiso = THE BAR** (per Signal 011 in `cc-ledger/cross-surface-signals.md`; Mayor 2026-05-07 W1 CD3 ideation Cycle 1 third cosmology reframe). The 7 cosmology positions instantiate as the Prime repo's top-level folder tree (7 parent folders): `Prime/Empyrean/` (1 Mayor folder; out-of-scope V1) + `Prime/Paradiso/Charter-Sphere-{1..9}/` (9 folders **= THE BAR** — what Prime aspires to) + `Prime/Eden/<allied-AI-surface>/` (1 folder with sub-folders per customized allied AI) + `Prime/Purgatorio/<terrace>-terrace/` (7 Org folders) + `Prime/Inferno/Infra-Layer-{1..9}/` (9 infra folders) + `Prime/Pillars/{Architecture,Governance,Observability,Autonomy,Evolution-Adaptability}/` (5 foundational folders) + `Prime/Histories/` (Archive). **Paradiso = THE BAR** operationalizes Signal 007 bar-is-foundation framing as Paradiso's 9 Charter Spheres = the aspirational quality bar Prime aims for; the institutional fixture per CD1 thesis Concept 6 + Decision 7 IS Paradiso's bar surfacing in cartography on every surface. **Every section of cartography.md must hold the bar.** Districts-Terrace's content (Civic / Art / Editorial / etc.) lives at `Prime/Purgatorio/Districts-Terrace/`; magazine-corner neighborhood lives at `Prime/Purgatorio/Neighborhoods-Terrace/`; DISpatch is a building-scale node within magazine-corner; the dev-diary microsite is a Brand-Terrace artifact (`Prime/Purgatorio/Brand-Terrace/`'s pipeline output) that EMBEDS the cartography rendering Districts-Terrace's content.

**The 7 cosmology positions (Mayor-locked 2026-05-07; top → bottom; CONCEPTUAL organizational positions surfacing in cartography through specific signals):**

| # | Position | Operational role | Cardinality | V1 cartographic surfacing |
| --- | --- | --- | --- | --- |
| 1 | **Empyrean** | Beyond the climb — Mayor's personal toolkit; fixed observation point; highest heaven per Dante geography | 1 position → boundary-only | **OUT-OF-SCOPE for V1** cartography (orthogonal per cosmology layer rule #11) |
| 2 | **Paradiso** | Charter — Prime's articulated unique identity; peer-to-allies; 9 heavenly spheres per Dante; **= THE BAR** (per Reframe 3 / Signal 011 — the aspirational quality bar Prime aims for); folder path: `Prime/Paradiso/Charter-Sphere-{1..9}/` | 9 spheres → 9 charter dimensions | **Surfaces as institutional fixture on every cartographic surface = THE BAR's visible presence** per Signal 011 (operationalizes Signal 007 bar-is-foundation as Paradiso's 9 Charter Spheres); CD1 thesis Concept 6 + Decision 7 Paradiso seed-mandate fixture IS Paradiso's bar surfacing in cartography; forward-looking; full 9-sphere articulation when authored. Every section of cartography.md must hold the bar. |
| 3 | **Eden** | Aspirational reference — older-sibling realized exemplars (Claude / Notion / Cursor / etc.); allied-meta layer; terrestrial paradise per Dante | 1 layer → allied-meta (expandable) | Surfaces as **allied-meta indicators** within cartographic surfaces (specific expression TBD) |
| 4 | **Purgatorio** | Cosmology zone containing **7 organizational-axis Terraces** (Mayor-named 2026-05-07 per Signal 010): Brand / Roads / Districts / Neighborhoods / Offices / Citizens / Leisure; folder paths: `Prime/Purgatorio/<terrace>-terrace/` (per Reframe 3 / Signal 011) | 7 Terraces (each = an organizational AXIS of Prime's material reality; Brand-Terrace LOCKED v0.2.0; remaining 6 TBD-future-arc per-Terrace formalization) | **Cartography is RENDERED BY Purgatorio's cartographic-axis Terraces** — Districts-Terrace primary (`Prime/Purgatorio/Districts-Terrace/`; renders borough-scale districts: Civic / Art / Editorial — **V1 LOCKED Editorial District scaffolds at CD3 §4**); Roads-Terrace (`Prime/Purgatorio/Roads-Terrace/`) + Neighborhoods-Terrace (`Prime/Purgatorio/Neighborhoods-Terrace/`) cross-cut; non-cartographic-primary Terraces (Brand `Prime/Purgatorio/Brand-Terrace/` LOCKED v0.2.0; Offices / Citizens / Leisure TBD-future-arc) surface as labels / signals / activity-indicators |
| 5 | **Inferno** | Methodology / crucible / forge — 9 layers of Prime's infrastructure (CI/CD + security audit + containerization + observability + agents + MCP gateways + etc.). Utility infrastructure UNDERNEATH cartography — not damnation, the forge | 9 circles → 9 layers of Prime's infra | Surfaces as **red dispatch lights popping up through cartography** — utility-infrastructure pop-up signaling Prime's infra activity (agents activating; CI/CD running; observability tracing). **THIS IS WHY RED IS PRIME'S ACCENT COLOR** (Mayor 2026-05-07 reveal per Signal 010). CD3 §6 wine-red Inferno markers ratifies semantic role + token-stub to CD2 |
| 6 | **Pillars** | Foundational commitments — *why Prime exists*; philosophical / immutable / definitional | 5 Pillars: Architecture / Governance / Observability / Autonomy / Evolution-Adaptability | Surfaces as **inherited properties** woven through cartography at construction (every Terrace + district + neighborhood + building + office + citizen inherits Pillar-properties); subtle; mostly invisible at default cartographic register; alternative atmospheric Pillar-encoding overlay deferred to CD3 §7 Mayor adjudication |
| 7 | **Histories** *(NEW per Mayor 2026-05-07; Signal 008)* | Living History of Prime — base archive of tombstoned past per `feedback_documentation_lifecycle.md` four-verb vocabulary (create / append / amend / tombstone) | Archive layer — accumulates as Prime ships + tombstones artifacts | Surfaces as **deep-archive layer accessible on-demand** from any cartographic surface (NOT primary navigable surface); article-node `histories-lineage` metadata points to tombstoned predecessors per CD3 §3.7 article-node encoding |

**Production-pipeline directionality** (cosmology layer rule #11; updated per Mayor 2026-05-07 W1 CD3 cumulative cosmology amendments Reframes 1+2): Inferno → Purgatorio → Eden → Paradiso (directional). Pillars sit *under* the pipeline (foundational commitments). **Histories sits *under* Pillars as base archive** (per Reframe 1 Signal 008; the lineage Prime evolves from / through / past). Empyrean is *orthogonal* to the pipeline.

**The American-grid framing** (citation: thesis.md §4.2):

> *"New York's borough + Houston's ward systems carry: orthogonal streets, named neighborhoods, district boundaries, walkable typology, civic-archive feel (street signs, transit maps, building numbering). The Divine Comedy provides the cosmological vertical — Inferno's nine circles, Purgatorio's seven terraces, Paradiso's nine spheres — each rendered as a district-with-neighborhood-character."*

DISpatch's name encodes the cosmology (citation: thesis.md §4.2):

> *"DIS (the City of Dis from Inferno's lower hell — heretics' walled iron city; classical reference) + dispatch (magazine-thing; news-from-the-front) in one word. Cosmology + magazine + tech-counterculture + neo-vintage. The name itself is an instance of the marriage-of-registers."*

**The walking metaphor** (citation: thesis.md Concept 7 + §4.3):

> *Prime City → districts → buildings (DISpatch is one) → reception (DISpatch's homepage) → offices (META + NARRATIVE production units inside DISpatch) → missives (articles output FROM the building's offices)*

V1 ships the **building-and-below stack**: reception (homepage) + offices (production units) + missives (articles). City + districts are **forward-pointed in cartography but not surfaced as active UX** (Prime City's homepage does not exist yet; other Buildings do not exist yet). This is CD3's cartographic scope: scaffold the city + districts in the cartographic substrate so that Reception + Offices + Missives have a visible cosmology to live inside, while not over-building UX surfaces for the city + district levels at V1.

**Load-bearing implication for CD3.** Districts encode cosmology layers; districts are NOT arbitrary visual subdivisions. Districts are navigable as cosmology — readers + agents traverse from district to district as they traverse cosmology layers. (Doctrine ratifies in CD3 §3 districts-not-blocks; first-flagship-district scaffolds in CD3 §4 Editorial District; future-Terrace district sketches preserve provisional muted-language in CD3 §5.)

### §1.3 — Register provisional (citation: thesis.md §3 + reference-archive.md §1 Concept 4)

CD1's ratified register lock (thesis.md §3, muted technical language per master plan §1.1 + C8):

> *"Currently inclined toward architectural / editorial / neo-vintage / AI-forward — magazine-coded; marriage of NARRATIVE literary-civic register (NYT-Magazine / New-Yorker / Paris-Review / Baffler) and META Wired/Hacker register via 5-typeface containment governance."*

**Cartography register** (citation: thesis.md §3, load-bearing per Mayor 2026-05-08):

> *"D&D-map + GTA-5-zoom + fictional-modern-city-map facsimile. Maximalist intent / minimalist surface. NOT real-city CAD-engineering / city-planning depth. The coupling is 'feel like you can zoom in and play GTA 5, or you can walk through the city streets and feel like you're truly role-playing in a D&D game.'"*

This is the register CD3 §2 (procgen-base + restyle workflow) and CD3 §7 (atmospheric layer) build toward. Tooling selection in §2 + §7 prioritizes capability ceilings that reach **maximalist intent / minimalist surface**, not real-city CAD-engineering depth. The dial principle (per §1.1 above) is the operating mechanism that prevents tooling from overrunning the register into "build a real city" territory.

**Atmospheric register** (citation: thesis.md §3 + reference-archive.md §1 Concept 4, currently inclined; ratifies token-level at CD2):

Paper grain, warm-white scale, contour-ink, ambient warmth. Spatial-perceptual vocabulary: *upper-stratum* / *mid-stratum* / *atmospheric reflectivity* / *editorial warmth*. Token names currently inclined: `sky-high` / `sky-low` / `reflect` / `window-warm` (CD2 ratifies the actual OKLCH values; CD3 §7 references them via token-stub interface per master plan §5.2).

**The seven universal concepts of principal-level editorial-civic publishing** (citation: thesis.md §2 + reference-archive.md §1 Concepts 1–7) inform CD3 §3 (districts-not-blocks doctrine inherits from Concept 2 grid-as-architectural-document + Concept 3 page-furniture-as-civic-wayfinding) + CD3 §4 (Editorial District character inherits from Concept 4 atmosphere-as-physical-substrate + Concept 5 multi-voice-typography-as-marriage-of-registers) + CD3 §6 (wine-red Inferno markers inherit from Concept 3 page-furniture-as-civic-wayfinding) + CD3 §7 (atmospheric layer inherits from Concept 4 atmosphere-as-physical-substrate) + CD3 §8 (lane semantics inherit from Concept 2 grid-as-architectural-document).

**Per-surface, per-Building register flexibility preserved** (citation: thesis.md §3 + master plan §1.3 5-narrow-certification-gates):

> *"DISpatch's register choice is one Building's register-choice for one surface's purpose. Future Buildings choose per their purpose. Other registers (self-illumination / reflective-surface / luminance-inverted / video-game-aesthetic / glass-morphism) prove different concepts at world-class scale and serve different surface needs; each is valid Prime expression in its register. The reference set in this thesis is non-binding for other Buildings + future surfaces."*

CD3 §5 (future-Terrace district plan sketches) preserves this flexibility structurally — provisional muted-language sketches per cosmology layer; specific district names + per-district lockdowns defer per cosmology arc-by-arc rollout.

### §1.4 — Gap surface (DISCOVERY-class to `cc-ledger/cross-surface-signals.md` if any)

**No gaps surfaced at CD3 §1.** CD1 outputs (thesis.md + reference-archive.md, RATIFIED 2026-05-08 at commits db0366a + 1d7d0c7) cover thesis statement + cosmology metaphor scaffold + register provisional with sufficient density that CD3 §2–§12 proceed against these inputs without re-opening CD1 adjudications.

If gaps surface during CD3 §2–§12 ideation cycles (e.g., a CD2-fired adversarial color validation surfaces a token name CD1 had not anticipated; a Stream-E cascade returns evidence that contradicts a CD1-ratified concept), the gap appends to `cc-ledger/cross-surface-signals.md` as a DISCOVERY-class entry and CD3 proceeds against best-available inputs per dispatch brief Section 1 discipline.

---

## §2 — Procgen-base + restyle workflow (cartographic production pipeline)

The cartographic production pipeline expressed as a coordination of **5 expression-layers, all serving the principal-level cartographic bar.** Per Mayor 2026-05-07 W1 CD3 Cycle 1 framing (Signal 007): the bar is the foundation; CSS / SVG / D3 / P5 / Mapbox / MapLibre / WebGL / vector tiles are *expressions* of the bar applied where they serve. The dial principle calibrates which expressions sit at which presence-level per surface / per page / per article (per CD1 thesis §4.4 + Decision 9). Pipeline shape ratifies at CD3 (load-bearing); specific tool selections refine at W2 (token pipeline real-CSS contexts) or W4 (production runtime Mapbox-vs-MapLibre cascade) per master plan §6.5 don't-discard discipline + §1.7 reframe 2.3 don't-subtract.

Per dispatch brief Section 2 + master plan §4 W1 CD3 row + CD1 Decision 9 dispatch-shape implication ("partner-tools row likely expands toward real-time-rendering tools — Mapbox GL JS dynamic layers, WebGL primitives, shader-based flicker, canvas-driven coordinate-aware overlays"): CD3 ratifies the pipeline as 5 expression-layers serving the bar; partner-tools row at the production-runtime layer expands at W4 cascade if the dial principle calls for richer real-time-rendering at higher dial positions.

Per Signal 006 Mayor 2026-05-07 Cycle 1 framework split: each tool below evaluated per **7-dim option-framework** (Monetary cost / Complexity & failure points / Load heaviness / Use case / Capability ceiling / Capability floor / Risks). Cost evidence research-cited from Stream-F `tool-ledger/cost-roi.md` v0 (W0 Stream-F deliverable per master plan §4 W0) + `tool-inventory v0.2` per master plan §6.1 C1 cost-cite discipline.

### §2.0 — Pipeline shape (5 expression-layers serving the bar)

| Layer | Function | Expression tools (CD3 catalog) | Dial-position range |
| --- | --- | --- | --- |
| **Layer 1 — Procgen base** | Generate base topological structure (street networks / district boundaries / topographic gradients) at scale, fast, with controlled stochasticity | Watabou City Generator + Azgaar's Fantasy Map Generator | Substrate at all dial positions; SVG export feeds downstream layers |
| **Layer 2 — Concept iteration** | Hand-curated layer atop procedural substrate; atmosphere / texture / hand-crafted feel that procgen alone doesn't reach | Inkarnate Pro (primary; cross-references §2.5 for AI-image-gen branch) | Concept-iteration only at CD3; concept output does NOT bind production runtime |
| **Layer 3 — Production runtime** | Vector-tile-served maps as production runtime; runtime restyle; interactive overlay; coordinate-handoff API to CD4 site-grid (per CD4 Signal 004 stub gap) | Mapbox Studio + MapLibre GL (Mayor adjudicates at W4 with full cascade per §6.5) | Mid-to-high dial positions; primary expression for "alive, dynamic, mapped to where you are" per CD1 thesis §1 |
| **Layer 4 — Atmospheric overlay** | Atmosphere as procedural texture (NOT bitmap asset); contour-ink + paper grain at editorial scale | D3.js (contour-ink) + P5.js (paper grain) | All dial positions; substrate static at scroll cadence per RES-009 fold to CD5 motion.md |
| **Layer 5 — 3D + concept-art branches** | Concept-iteration ONLY (NOT production runtime) — 3D elevation + register-shifting concept variants | Spline 3D + Midjourney + Recraft + Leonardo.AI | Concept-iteration only at CD3; high-dial 3D in production may surface at W4 cascade |

**Bar held across all dial positions.** Per Signal 007 framing: the principal-level cartographic bar is the foundation; the dial principle calibrates expression-takeover per surface, but the BAR — Apple-cohesion-test discipline + principal-grade quality + CD1 thesis §1 "alive, dynamic, mapped to where you are" claim — is constant. When the dial calls for "less present," CSS + plain SVG expressions stabilize the surface against the bar; when "more present," Layer 3 + Layer 4 expressions take over against the bar; the bar is what's held, not the expression.

### §2.1 — Layer 1: Procgen base (Watabou + Azgaar)

Universal concept: *procgen as substrate, not finished asset* — generate topologically-valid base layouts at scale with controlled stochasticity; downstream layers restyle. Examples that prove the concept: Watabou's medieval/fantasy/modern city generators at game-dev + indie-cartography scale; Azgaar's Fantasy Map Generator at worldbuilding scale; the broader procgen-as-substrate lineage in game design + digital cartography (PROCJAM showcases; /r/proceduralgeneration archive).

#### Watabou City Generator

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Free / web-based + optional Patreon $4/mo for development support (citation: watabou.itch.io; tool-inventory v0.2 §G; cost-roi.md §4 — not in CD-tier W1 baseline) |
| **Complexity / failure points** | LOW — single-page web tool; SVG export; no API surface; no integration burden; failure modes browser-side render only |
| **Load heaviness** | LOW — no setup; minimal cognitive overhead; <10 min to learn; iterate via re-roll |
| **Use case** | TTRPG community canonical reference (D&D / Pathfinder / Cyberpunk 2020); /r/proceduralgeneration archives; PROCJAM procedural-generation game-jam showcases. Universal concept: *procgen as substrate, not finished asset* expressed at city scale |
| **Capability ceiling** | Medium — topologically-valid medieval / fantasy / modern city layouts at 100s-1000s nodes; SVG export with semantic structure for downstream restyle |
| **Capability floor** | Doesn't close — SVG export consumed by Inkarnate / Mapbox / D3 / P5 downstream; no lock-in |
| **Risks** | Solo-developer vendor stability (Oleg Dolya); long-term maintenance dependent on one person. API stability N/A (no API). Community decay LOW (sticky game-dev community). Security clean. |

**Recommendation:** ADOPT for Layer 1 procgen base. Cost+complexity+load all minimal; capability ceiling matches CD3's "modern city map facsimile" register per CD1 thesis §3; SVG-export floor preserves downstream restyle freedom. *Cost / ceiling / floor tip toward.*

#### Azgaar's Fantasy Map Generator

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Free / OSS Apache 2.0 (citation: GitHub azgaar/Fantasy-Map-Generator; community) |
| **Complexity / failure points** | MEDIUM — feature-rich web app; state management quirks at high zoom; SVG export inconsistencies at extreme scales |
| **Load heaviness** | MEDIUM — 1-2 hours to learn well; rich options (cultures / states / biomes / climate / rivers / settlements); higher cognitive overhead than Watabou |
| **Use case** | Worldbuilding + RPG community; /r/worldbuilding canonical resource lists; widely used in self-publishing TTRPG settings. Universal concept: *procgen-cartography-with-rich-customization* at region/world scale |
| **Capability ceiling** | HIGH — full-world maps with cultures / religions / states / biomes / climate / rivers / roads / settlements; semantic-layered SVG export (states / settlements / rivers as distinct layers) |
| **Capability floor** | Doesn't close — layer-aware SVG export preserves semantic structure for downstream restyle |
| **Risks** | OSS community decay LOW (active contributors per OSS model); performance stutters at very large scales; less polished UX than Inkarnate Pro |

**Recommendation:** ADOPT for Layer 1 alongside Watabou. Different scales (Watabou = city; Azgaar = region/world); both expressions serve the bar at procgen-base layer. *Cost / capability-ceiling / floor tip toward; load-heaviness slightly higher than Watabou but acceptable for region-scale concept work.*

### §2.2 — Layer 2: Concept iteration (Inkarnate Pro)

Universal concept: *human-curated layer atop procedural substrate* — atmosphere / texture / hand-crafted feel that procgen alone cannot reach. Examples that prove the concept: Inkarnate Pro at editorial-cartographic scale (Critical Role campaign maps; Kickstarter TTRPG settings); the broader hand-curated-cartography tradition pre-procgen.

Layer 2 also accepts AI-image-gen tools (Midjourney + Recraft + Leonardo.AI) as register-shifting concept variants — those land in §2.5 (3D + concept-art branches) since they're concept-iteration sub-categories.

#### Inkarnate Pro

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | $25/year (~$2/mo) Pro tier; free tier limited (citation: cost-roi.md §4 "3D / Cartography ~$25/yr"; tool-inventory v0.2 §G; inkarnate.com pricing page) |
| **Complexity / failure points** | LOW-MEDIUM — web design tool; PNG/JPEG export only (NOT SVG-layered); brush libraries + layer management |
| **Load heaviness** | MEDIUM — 2-4 hours to learn well; design-tool learning curve; brush/layer management |
| **Use case** | Indie + small-studio TTRPG cartography (Critical Role campaigns; Kickstarter-funded settings); editorial-cartographic concept exploration. Universal concept: *human-curated layer atop procedural substrate* expressed at indie/editorial scale |
| **Capability ceiling** | HIGH for hand-crafted feel — extensive brush library; warm tactile output emulating traditional cartography aesthetic; matches CD1 thesis §3 cartography register *"D&D-map + GTA-5-zoom + fictional-modern-city-map facsimile"* |
| **Capability floor** | PNG/JPEG export limits production-runtime restyle (raster, not vector). Doesn't close future SVG-export adoption (could supplement with vector overlay tools at Layer 3/4) |
| **Risks** | Vendor lock — Inkarnate stylistic library couples concept output; SaaS dependency; output binds to Inkarnate's brush aesthetic |

**Recommendation:** ADOPT for Layer 2 with concept-decoupling caveat: concept-iteration ONLY; production runtime decouples from Inkarnate output (production stays vector-tile-based at Layer 3; PNG concept-art does NOT bind runtime architecture). $2/mo cost + ceiling fit; floor caveat noted; concept-decoupling is a §2.7 Mayor adjudication point.

### §2.3 — Layer 3: Production runtime (Mapbox + MapLibre)

Universal concept: *vector-tile-served maps as production runtime* — runtime restyle; interactive overlay; coordinate-handoff API to component grid. Examples that prove the concept at world-class scale: NYT The Upshot data-cartography (canonical 2026 reference); Pudding editorial cartography; Stamen design (founding Mapbox alums); Mapbox-flagship editorial cartography; MapLibre OSS lineage from Mapbox GL JS pre-license-change fork (Dec 2020).

Layer 3 is the **W4 production-runtime decision point** per CD3 dispatch brief Section 2: Mayor adjudicates Mapbox-vs-MapLibre at W4 with full §6.5 cascade. Pipeline shape ratifies at CD3 (Layer 3 = vector-tile-served runtime); specific tool selection defers.

#### Mapbox Studio

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Mapbox Studio (design tool) FREE; runtime usage-based — 200K free vector tile loads/mo, $0.50/1K above (citation: mapbox.com pricing; master plan §3.B). NOT in CD-tier W1 baseline; lands in operating-phase delta if adopted at W4 |
| **Complexity / failure points** | HIGH — production runtime infrastructure; tile pipeline; vendor API surface; failure modes around quota / latency / API breaking changes / GL JS version compat |
| **Load heaviness** | HIGH — proprietary system; tile pipeline ops; substantial cognitive overhead (Mapbox Studio + GL JS + tile servers + style spec) |
| **Use case** | NYT The Upshot data-cartography (canonical); Pudding cartography; Stamen design (founding alums); Mapbox-flagship editorial cartography. Principal-grade at scale per CD1 thesis §1 + master plan §3.A concept #2 grid-as-architectural-document |
| **Capability ceiling** | HIGHEST in production cartography — vector tiles at scale; runtime restyle; interactive overlay; 3D extrusion; geocoding / routing / isochrones; SaaS-team-grade reliability; full stack |
| **Capability floor** | SaaS dependency. Doesn't close MapLibre fork-path (MapLibre is OSS Mapbox-GL-JS pre-license-change fork) |
| **Risks** | VENDOR LOCK — Mapbox v2.0 license change (Dec 2020) drove MapLibre fork; precedent for vendor-API instability. Cost: at scale, tile-load costs add up rapidly; per-Wave delta if microsite traffic exceeds 200K loads/mo. API instability: minor releases break GL JS occasionally. Community decay: Mapbox established but MapLibre community grows. |

**Recommendation:** DESCRIPTIVE-CONSIDERATION at CD3; W4 Mayor cascade adjudicates with full §6.5 evidence (research-cited 2026 traffic projections + ops-burden assessment + community-signal triangulation per Stream-E cascade). Stays in inventory per don't-discard. *Capability ceiling tips toward; vendor-lock risk + cost-at-scale tip away; W4 cascade resolves.*

#### MapLibre GL

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Free / OSS Apache 2.0 (citation: maplibre.org community); self-host tile infra costs (Hetzner / similar) ~$5-20/mo at low traffic |
| **Complexity / failure points** | HIGHER setup than Mapbox; failure modes around tile-server ops + OSS doc gaps + less-mature CLI tooling |
| **Load heaviness** | HIGHER — self-host operational tax; tile pipeline ops on Hetzner or similar; substantial cognitive overhead |
| **Use case** | OSS counterpart to Mapbox GL JS; pre-license-change fork; widely adopted post-2020 by editorial sites preferring OSS posture. Principal-grade at editorial scale |
| **Capability ceiling** | HIGH — most Mapbox features replicated; some tile-infra features lag Mapbox; runtime restyle preserved |
| **Capability floor** | Doesn't close — OSS lineage preserves community access; fork-able if needed; substitution to Mapbox if ops burden exceeds OSS willingness |
| **Risks** | Community decay LOWER than Mapbox vendor-lock risk; tile infra burden could stall solo-dev (per master plan §1.7 reframe 2.3 high-end principal tooling register acceptability of $1,200-1,500/mo recurring at peak); less-mature documentation than Mapbox Studio |

**Recommendation:** DESCRIPTIVE-CONSIDERATION at CD3; W4 cascade. Tradeoff is SaaS-cost (Mapbox) vs OSS-ops-burden (MapLibre); both options stay in inventory per don't-discard. *Floor / community-decay-risk tip toward; load-heaviness + complexity tip away; W4 cascade resolves.*

### §2.4 — Layer 4: Atmospheric overlay (D3 + P5)

Universal concept: *atmosphere as procedural texture, not bitmap asset* — contour-ink + paper grain at editorial scale that reads as the physical substrate the publication is printed on. Examples that prove the concept (per CD1 thesis Concept 4 + reference-archive §1 Concept 4): The Paris Review Pentagram-Willey recycled-paper tactile warmth; INQUE typewriter body + light/dark page design; The Baffler open-space-and-visuals breathing room; the Pentagram tactile-warmth lineage.

Layer 4 is the **RES-009 fold-target** for atmospheric chrome (chrome tokens fold to CD2 color.md; texture-surface declarations fold to CD4 components.md; motion-coupling rule folds to CD5 motion.md per RES-009 reframe). CD3 §7 ratifies the full visual substrate per RES-009 (paper grain via P5.js + contour-ink via D3.js + textures + grids + backgrounds + dispatch markers); §2.4 ratifies the **tooling pipeline** for the atmospheric-overlay layer.

#### D3.js

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Free / OSS BSD-3-Clause (citation: d3js.org community; widely shipped) |
| **Complexity / failure points** | MEDIUM — extensive API surface; failure modes around scale management + transitions + selection patterns; multi-version compat issues across D3 v3-v7 |
| **Load heaviness** | HIGH — D3 has steep learning curve; cognitive overhead substantial for non-charting use cases (atmospheric overlays are not D3's primary use case but well-supported) |
| **Use case** | NYT The Upshot extensive D3 use; Pudding editorial cartography; Stamen design contour-ink at editorial scale. Universal concept: *contour-as-data-overlay* at editorial scale. The Pudding article-templates use D3 for inline data overlays |
| **Capability ceiling** | HIGHEST in custom-data-visualization-overlays; SVG-native; transitions / scales / selection patterns; runs anywhere browser runs; integrates with Mapbox / MapLibre / vanilla DOM |
| **Capability floor** | Doesn't close — pure JS library; integrates with anything; no SaaS dependency; OSS lineage preserves community access |
| **Risks** | Steep learning curve; performance can stutter at very high node counts; community is mature but support is community-driven |

**Recommendation:** ADOPT for Layer 4 contour-ink expression. CD1 thesis Concept 4 cites D3 contour at editorial scale as canonical example. *Cost / ceiling / floor tip toward; load-heaviness tip away but acceptable given sticky community + canonical lineage.*

#### P5.js

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Free / OSS LGPL-2.1 (citation: p5js.org community; widely shipped) |
| **Complexity / failure points** | LOW-MEDIUM — Processing-lineage creative coding library; failure modes around frame rate at scale + WebGL fallback; simpler API than D3 |
| **Load heaviness** | LOW-MEDIUM — designed for accessibility; cognitive overhead low for atmospheric texture (frame-rate-friendly procedural noise) |
| **Use case** | Procedural grain at editorial scale; The Paris Review Pentagram-Willey paper warmth aesthetic; INQUE typewriter body + page design; Pentagram tactile-warmth lineage. Universal concept: *atmosphere as procedural texture* at editorial scale |
| **Capability ceiling** | HIGH for procedural texture; 2D + WebGL; runtime-tunable; live-edit support |
| **Capability floor** | Doesn't close — pure JS library; integrates anywhere |
| **Risks** | Performance at high frame rates; reduced-motion compliance requires explicit fallback (atmosphere should NOT animate at scroll cadence per CD1 thesis Concept 4 motion-coupling rule per RES-009 fold to CD5 motion.md) |

**Recommendation:** ADOPT for Layer 4 paper-grain expression. CD1 thesis Concept 4 cites P5.js procedural grain at editorial scale as canonical example. *Cost / ceiling / floor / load-heaviness all tip toward; reduced-motion fallback risk mitigated via CD5 spec-stub interface (atmospheric chrome NOT animated as primary motion target; theme-cycle + ambient drift only; substrate static at scroll cadence).*

### §2.5 — Layer 5: 3D + concept-art branches (Spline + AI-image-gen)

Universal concept: *concept-iteration branches that explore register without locking production architecture* — 3D elevation concept work + register-shifting concept variants (Gotham-register / neo-vintage-register / civic-architectural-register options). Examples that prove the concept: Spline 3D at indie / small-studio web design scale; Midjourney / Recraft / Leonardo.AI at concept-art communities scale.

Layer 5 is **concept-iteration only** at CD3; production runtime stays at Layer 3 (vector tiles). High-dial 3D in production may surface at W4 cascade if the dial principle calls for richer real-time-rendering at higher dial positions (per CD1 thesis Concept 7 + Decision 9 dispatch-shape implication).

#### Spline 3D

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Free tier + Pro $9-21/mo per seat (citation: spline.design pricing page; cost-roi.md §4 cited part of $100/mo CD-tier 3D bucket) |
| **Complexity / failure points** | MEDIUM-HIGH — SaaS 3D design tool; export to runtime via Spline Viewer or React component; failure modes around runtime-render compat + browser performance |
| **Load heaviness** | HIGH — 3D tooling has steep learning curve; cognitive overhead substantial; scene management |
| **Use case** | SaaS-grade 3D design at indie / small-studio scale; widely cited in /r/web_design + designsystems.com awwwards. Universal concept: *3D-elevation / district-3D-concept* work at indie scale |
| **Capability ceiling** | HIGH for browser 3D; vendor advantage in design-tool UX (vs. raw Three.js / R3F) |
| **Capability floor** | SaaS dependency; substitution requires Three.js / React Three Fiber + redo. Doesn't close OSS path |
| **Risks** | Vendor lock; SaaS pricing variance; runtime-render compatibility across browsers |

**Recommendation:** DESCRIPTIVE-CONSIDERATION for Layer 5 3D-elevation concept work at CD3; concept-iteration ONLY (NOT production runtime). 3D-elevation in production runtime defers to W4 cascade if dial-principle calls for it; otherwise Spline output is concept-stills informing Layer 3 production tooling. *Capability ceiling tips toward; load-heaviness + vendor-lock tip away for production; acceptable for concept-iteration.*

#### Midjourney + Recraft + Leonardo.AI (concept-art branch)

| Dimension | Surface |
| --- | --- |
| **Monetary cost** | Each ~$10-30/mo: Midjourney $10-60/mo (Basic-Mega tiers); Recraft $12+/mo Pro (vector export option); Leonardo.AI $10-24/mo (citation: cost-roi.md §4 — part of $200/mo CD-tier AI image gen bucket; tool-inventory v0.2 §E) |
| **Complexity / failure points** | LOW per-tool integration; failure modes around prompt-engineering inconsistency + generation reproducibility (model updates change output) — for cartographic concept work specifically, prompt-engineering for "modern city map facsimile" + "D&D-style fictional city" + "GTA-5-zoom" registers requires iteration |
| **Load heaviness** | MEDIUM — prompt-engineering iteration; multi-tool workflow; cognitive overhead per tool |
| **Use case** | Concept-art at editorial / indie scale; Midjourney dominant in concept-art communities; Recraft has vector-export option; Leonardo.AI for register-specific concept variants. Universal concept: *register-shifting concept variants* (Gotham-register / neo-vintage-register / civic-architectural-register options per CD1 thesis §3 cartography register) |
| **Capability ceiling** | HIGH for register exploration; raster output (mostly); Recraft has vector export |
| **Capability floor** | PNG output limits downstream restyle (concept-iteration only). Doesn't close future model upgrades |
| **Risks** | Multi-vendor stability across subscriptions; concept-reproducibility limited (model versioning shifts output); copyright / licensing posture varies per tool |

**Recommendation:** DESCRIPTIVE-CONSIDERATION at Layer 5 concept-art branch. CD3 adopts subset for register exploration during concept-iteration; production runtime does NOT bind to AI image gen output (concept-iteration only per concept-decoupling discipline). Specific subset (which 1-2-3 tools to use) refines at W2/W4 per defer-with-citation; both Midjourney + Recraft recommended as initial subset (raster + vector export coverage); Leonardo.AI defers per don't-discard.

### §2.6 — Dial calibration (zoom-level + presence-intensity per surface; bar held across all positions)

**Critical reframe per Mayor 2026-05-07 W1 CD3 ideation Cycle 1** (per Signal 009 in `cc-ledger/cross-surface-signals.md`): the cartography grid is **unified across all Prime surfaces and microsites**. The dial does NOT calibrate between "different views" of distinct cartographies. The dial calibrates **presence-intensity at a given zoom-level**, where zoom-level varies per surface in the unified grid. Mayor verbatim framing: *"the whole platform and its microsites and their homepages are different perspectives of Prime's grid."*

**Per-surface zoom levels (Mayor 2026-05-07 unified-grid framing):**

- **Prime platform homepage** (future; V1.5+) = whole-city perspective of the unified grid
- **District hub homepages** (future; per-Building-when-shipped) = zoom to specific building / location within the district
- **DISpatch homepage** (V1 ship) = Editorial District perspective with **unique marker representing DISpatch Magazine** (so users recognize "I'm at the magazine"); laid out; recalibrates as new things added
- **DISpatch articles** (V1 ship) = **magazine-corner perspective** = neighborhood-within-district zoom (think Hell's Kitchen / Harlem / Broadway as neighborhoods within Manhattan — same Manhattan grid; closer zoom)

**No street-view, ever.** Still top-down dynamic living cartography throughout. The grid never collapses to ground-level / Google-Street-View framing; it stays top-down at all zoom levels.

**Grid dances and forms around components.** Mayor verbatim: *"the grid map dances and forms around the certain components and bodies all over the platform, so for the DISpatch it is the articles that occupy the space of a park or venue where it doesn't have things underneath it to make it distracting. There's a natural flow to the grid around the components."* The cartography grid is not a fixed background components sit on top of. The grid LIVES around components — articles occupy park-or-venue-like spaces in the grid (no distracting cartographic features beneath them); CD4 components inherit the dance-around-discipline; the grid flows naturally around the page's components per surface.

**Per-surface zoom + dial calibration table** (V1 ship + future trajectory):

| Surface | Zoom level | Dial range (presence-intensity at zoom) | Active expressions |
| --- | --- | --- | --- |
| **Prime platform homepage** (future, V1.5+) | Whole city | TBD — per-Prime-homepage workshop | Layer 1 (procgen base) + Layer 3 (full vector tile rendering) + Layer 4 (atmospheric overlay) ambient |
| **DISpatch homepage** (V1 ship) | Editorial District perspective with unique magazine marker | LOW–MID dial (laid out; recalibrate as new things added) | Layer 1 + Layer 3 (district-perspective restyle) + Layer 4 (paper grain + contour-ink editorial-warmth) + unique marker for DISpatch Magazine |
| **DISpatch article** (V1 ship), low dial | Magazine-corner perspective (neighborhood-within-district zoom) | LOW dial — minimal presence; static-stable expressions only | Layer 1 + Layer 3 (neighborhood-restyle) + Layer 4 minimal (paper grain only); CSS + plain SVG expressions stabilize where they serve the bar |
| **DISpatch article** (V1 ship), mid dial **(V1 steady-state baseline)** | Magazine-corner perspective | MID dial — alive enough to register presence; muted enough for reading sanctuary | Layer 1 + Layer 3 + Layer 4 partial (D3 contour overlay; P5 paper grain texture; substrate static at scroll cadence per RES-009 fold to CD5) |
| **DISpatch article** (V1 ship), high dial | Magazine-corner perspective | HIGH dial — maximum presence; dynamic-living layer fully active | Layer 1 + Layer 3 + Layer 4 full (P5 dynamic-living layer with flicker / lights-in-the-city; D3 real-time contour coupling to article state) + Layer 5 hover-zoom (Spline 3D for cosmology-marker hover only) |
| **Forward-pointed neighbor districts** (visible at any DISpatch surface edge) | Edge of perspective; abstracted | LOW dial — diminished visual weight | Layer 1 procgen base + Layer 3 simplified style; opacity / saturation reduced; "anticipatory-not-missing" register per CD1 thesis Concept 7 + CD4 Signal 004 stub-gap fold |

**Iteration finds the balance** per CD1 thesis §4.4 Decision 9: *"if a section feels too complex, simplify it to make it feel more complex"* (Mayor 2026-05-08). Specific dial-position calibrations per Building / per surface / per article refine at W5 microsite implementation; CD3 ratifies the **unified-grid-with-zoom-level discipline + dial-as-presence-intensity-calibrator + grid-dances-around-components + no-street-view rule** as the operating mechanism.

### §2.7 — Mayor adjudication points for §2

Three load-bearing decisions Mayor adjudicates at §2 ratification (per master plan §6.5 5-dim framework expanded to 7-dim per Signal 006):

1. **Pipeline shape ratification (load-bearing).** Does the 5-expression-layer pipeline (procgen-base / concept-iteration / production-runtime / atmospheric-overlay / 3D+concept-art-branches) ratify at CD3 as the load-bearing structure that downstream CDs (CD4 / CD5 / CD6) + W2 (token pipeline) + W4 (production runtime cascade) + W5 (microsite Astro implementation) build against?

   *CC recommendation:* RATIFY. Pipeline shape matches CD1 Decision 9 dispatch-shape implication ("partner-tools row likely expands toward real-time-rendering tools"); 5 expression-layers each serve the bar at distinct functional roles; dial-principle calibrates expression-takeover per surface; bar held across all dial positions. *Pipeline shape / capability floor / don't-discard discipline tip toward.*

2. **W4 production-runtime cascade trigger (defers).** Mapbox-vs-MapLibre Layer 3 production-runtime decision defers to W4 with full §6.5 cascade (research-cited 2026 traffic projections + ops-burden assessment + community-signal triangulation + capability-ceiling/floor delta). Both options stay in inventory per don't-discard. Mayor confirms W4 deferral OR pulls forward if the pipeline-shape ratification needs Mapbox-vs-MapLibre resolved at CD3 to lock downstream.

   *CC recommendation:* DEFER to W4. Production runtime decision benefits from cascade-confirmed traffic projection that lands at W2/W3; CD3 ratifies the LAYER (vector-tile-served runtime); specific tool selection defers per defer-with-citation. *Capability-floor preservation + don't-discard discipline tip toward defer; capability ceiling tipping toward Mapbox is balanced by vendor-lock + cost-at-scale risks.*

3. **Concept-decoupling discipline with concept-emergence escape hatch (load-bearing; RATIFIED Mayor 2026-05-07 Cycle 1 per Signal 009).** Concept-iteration outputs (Inkarnate Pro PNG; Midjourney/Recraft/Leonardo.AI PNG; Spline 3D scenes) do NOT bind production runtime by default; production runtime stays vector-tile-based at Layer 3; concept-art branches inform aesthetic but don't dictate runtime architecture.

   **Concept-emergence escape hatch (Mayor 2026-05-07 W1 CD3 Cycle 1; per Signal 009).** Mayor reserves the right to elevate any concept-iteration output to production-runtime status if a "just incredible" concept emerges through Inkarnate / MJ / Recraft / Leonardo / Spline. Mayor verbatim: *"Unless some sort of concept emerges that is just incredible and we have it in our hands through those, I agree with yours, but added my own lol."* Mayor adjudicates elevation per concept; preserves the optionality without locking concept-decoupling as absolute. The default is concept-decoupled production-runtime; the escape hatch is Mayor-adjudicated concept-elevation when a concept materializes that warrants production architectural change. Implementation gap: §9 Stream-F entries surface the concept-emergence detection-and-surface-to-Mayor workflow (when does a concept output trigger Mayor elevation adjudication?).

   *CC recommendation (RATIFIED 2026-05-07 with Mayor's escape hatch):* Default concept-decoupling preserves don't-forfeit + crazy-ideas-on-top-of-standards disciplines per Signal 007; concept-iteration explores register without locking production architecture; concept-emergence escape hatch preserves Mayor's optionality to elevate when an exceptional concept warrants. Both forces preserved structurally.

**Cross-references at §2 ratification:**

- §6.5 5-dim → 7-dim framework split per Signal 006 (Mayor 2026-05-07 Cycle 1)
- §1.7 reframe 2.1 (production-launch quality bar) + §1.7 reframe 2.3 (don't-subtract) + §6.5 don't-discard discipline
- CD1 thesis Decision 9 (cartography-as-MVP-hero + dial principle) + Concept 4 (atmosphere as physical substrate) + Concept 7 (walking metaphor — building-and-below stack V1 scope)
- CD4 Signal 004 stub gaps (cartography-grid ↔ site-grid coordinate-handoff API for Layer 3; CartographyCanvas full encoding; DistrictMap forward-pointed-neighbor-buildings rendering — folded inline in §2.0 + §2.6)
- §12 RES-009 (atmosphere.md retired; CD3 owns full visual substrate) — Layer 4 §2.4 covers atmospheric-overlay tooling pipeline
- Stream-F `tool-ledger/cost-roi.md` v0 + `tool-ledger/inventory.md` v0 (cost-cite source per §6.1 C1)

---

## §3 — Districts in the unified cartography (Districts-Terrace's content; multi-axis Prime organization)

The load-bearing concept CD3 ratifies: **Prime's cartography expresses semantic districts as Districts-Terrace's organizational content, NOT cosmology layers as 1:1 cartographic mappings.** Cosmology layers are conceptual / metaphorical organizational positions of Prime's identity (Inferno = 9 layers of infra; Paradiso = the city charter; etc. per cosmology lock 2026-05-07 + §1.2); they SURFACE in cartography through specific signals (red dispatch lights for Inferno; institutional fixture for Paradiso) but do NOT constitute the cartography directly.

**The cartography is rendered by Purgatorio's cartographic-axis Terraces** (per Signal 010 in `cc-ledger/cross-surface-signals.md`; Mayor 2026-05-07 named all 7 Purgatorio Terraces): Districts-Terrace primary (renders borough-scale districts: Civic / Art / Editorial / etc.); Roads-Terrace + Neighborhoods-Terrace cross-cut (transit network + sub-district zoom). Per Mayor 2026-05-07 W1 CD3 ideation Cycle 1 unified-grid reframe (Signal 009): districts are zoom-level units in the UNIFIED Prime cartography — single Prime grid expressed across surfaces at different zoom levels. Transitions between districts are spatial (zoom + pan), NOT modal (not switching cartographies per surface).

### §3.1 — Universal concept

*Districts as semantic civic-units encoding meaning, not blocks as arbitrary visual cells.*

**Examples that prove the concept at world-class scale:**

- **NYC boroughs** (Manhattan / Brooklyn / Queens / Bronx / Staten Island) — each borough carries identity / character / civic-wayfinding texture distinct from grid-block addressing. Manhattan reads tall + dense + commercial; Brooklyn reads brownstone + neighborhood-rooted; Queens reads multicultural + sprawling. Borough boundaries encode meaning beyond geometry.
- **Houston wards** — ward-system as civic-political districting layered atop the underlying grid. Wards encode political + cultural + historical identity.
- **Tokyo wards (特別区 / 23 special wards)** — Shibuya / Shinjuku / Minato / Chiyoda / etc. each carrying distinct character, transit hub patterns, civic identity at metropolitan scale.

The concept-first framing per master plan §1.1 + C7 discipline: Prime's cartography uses American-grid-neighborhood texture + metropolitan-ward texture as EXAMPLES THAT PROVE district-as-semantic-unit at world-class scale; Prime extracts the universal concept (districts encode meaning) and expresses it in Prime's register (Districts-Terrace's content rendered as D&D-map + GTA-5-zoom + fictional-modern-city-map facsimile per CD1 thesis §3 cartography register).

### §3.2 — The 7 Terraces (Prime's material reality as multi-axis Purgatorio organization)

Per Mayor 2026-05-07 W1 CD3 ideation Cycle 1 (Signal 010 in `cc-ledger/cross-surface-signals.md`): Purgatorio (cosmology zone; conceptual; not cartographic) contains **7 Terraces as organizational AXES of Prime's material reality**. Same Prime artifact (e.g., DISpatch the dev-diary magazine) is referenced from multiple Terrace-axes simultaneously — each Terrace is a different organizational lens on the same underlying material.

**The 7 Terraces (canonical inventory; Mayor-named 2026-05-07):**

| # | Terrace | Organizational axis | Cartographic role | V1 ship status |
| --- | --- | --- | --- | --- |
| 1 | **Brand-Terrace** | Public-facing pipeline (how Prime publishes outward) | NON-cartographic axis (the pipeline that PRODUCES surfaces; the dev-diary microsite is a Brand-Terrace artifact that EMBEDS the cartography) | LOCKED v0.2.0 (per `brand.md` skill v0.2.1) |
| 2 | **Roads-Terrace** | Connectivity / transit / network between districts + neighborhoods + buildings; agent-to-agent communication channels | CARTOGRAPHIC axis (cross-cutting; transit network in cartography) | TBD-future-arc; V1 forward-pointed (minimal Roads articulation) |
| 3 | **Districts-Terrace** | Borough-scale geographic organization (Civic / Art / Editorial / etc.) | **CARTOGRAPHIC axis (PRIMARY; renders borough-level neighborhoods in cartography)** | TBD-future-arc; **Editorial District scaffolds at CD3 §4 (V1 ship)** |
| 4 | **Neighborhoods-Terrace** | Neighborhood-scale geographic organization within districts (magazine-corner within Editorial District; analogous to Hell's Kitchen within Manhattan) | CARTOGRAPHIC axis (sub-district zoom in cartography) | TBD-future-arc; magazine-corner scaffolds at CD3 §4 |
| 5 | **Offices-Terrace** | Office-scale operational units within buildings (META + NARRATIVE production within DISpatch; Prime's businesses / work locations) | NON-cartographic primary axis (organizational; surfaces as labels at deep cartographic zoom) | TBD-future-arc; META + NARRATIVE offices implicit in DISpatch building-scale rendering |
| 6 | **Citizens-Terrace** | Agent codebases (the agents / citizens working in offices); GitHub Prime repo holding agent codebases | NON-cartographic axis (codebases organized in repo structure; surfaces in cartography as aggregate counts / activity via Inferno-pop-up signals) | TBD-future-arc |
| 7 | **Leisure-Terrace** | Home for agents in stasis / education (machine learning in SLMs / data) / transitions to retirement | TBD cartographic axis (potentially separate region for agent-non-work activity) | TBD-future-arc; OUT-OF-SCOPE for V1 dev-diary microsite |

**Multi-axis organization** — same Prime artifact (DISpatch) referenced from multiple Terrace-axes simultaneously:

- Districts-Terrace says: *"DISpatch is in Editorial District"* (geographic; borough-scale)
- Neighborhoods-Terrace says: *"DISpatch occupies magazine-corner neighborhood"* (geographic; neighborhood-scale)
- Offices-Terrace says: *"DISpatch contains META + NARRATIVE production offices"* (operational)
- Citizens-Terrace says: *"DISpatch employs N agents (citizens)"* (agent)
- Brand-Terrace says: *"DISpatch publishes through Prime's public-facing pipeline"* (output)
- Roads-Terrace says: *"DISpatch is connected via transit network to neighbor buildings"* (connectivity)

**The cartography (the dev-diary microsite cartography) renders cartographic-axis Terraces** — primarily Districts-Terrace (borough-scale); cross-cut by Roads-Terrace (transit) + Neighborhoods-Terrace (sub-district zoom). Non-cartographic-primary Terraces (Brand / Offices / Citizens / Leisure) surface as labels / aggregate-signals / activity-indicators at appropriate zoom levels but don't constitute the cartographic structure directly. The dev-diary microsite is itself a Brand-Terrace artifact that EMBEDS the cartography (which renders Districts + Roads + Neighborhoods Terraces' content).

**CD1 thesis §4.3 framing chisel-by-pointer.** CD1 thesis §4.3 says *"DISpatch is one Building... in one district (the Editorial District = Brand-Terrace's neighborhood)"* — that's loose framing conflating Brand-Terrace organizational axis with Districts-Terrace cartographic axis. Editorial District is **Districts-Terrace's content**; Brand-Terrace is the public-facing pipeline that PRODUCES the dev-diary microsite (which embeds the cartography rendering Districts-Terrace's content). Per `feedback_append_vs_edit_discipline.md` append-only: thesis.md stays verbatim; CD3 §3 amends-by-pointer per Signal 010.

### §3.2.1 — Districts-Terrace content (V1 cartographic districts)

Per Mayor 2026-05-07 (Signal 010): Districts-Terrace contains the cartographic districts that organize Prime's geographic material reality:

| District | What it holds | V1 status |
| --- | --- | --- |
| **Civic District** | Prime's city departments (governance / institutional functions; Governance-Pillar-derived material) | TBD-future-arc; forward-pointed in V1 cartography |
| **Art District** | Prime's creative output: videogames / books / film / interactive media | TBD-future-arc; forward-pointed in V1 cartography |
| **Editorial District** | Prime's editorial output: newspaper / magazine / marketing agency | **V1 LOCKED — DISpatch (dev-diary magazine) lives here; scaffolds at §4** |
| (Future districts) | Additional district categories as Prime's material content velocity warrants | TBD per `feedback_decouple_scope_from_ambition.md` |

V1 ratifies Editorial District in concrete detail (§4); other districts are forward-pointed in cartography (visible at edge of perspective; "anticipatory-not-missing" register per CD1 thesis Concept 7).

### §3.2.2 — Geographic hierarchy (multi-Terrace cartographic rendering)

Per Mayor 2026-05-07 framing: districts contain neighborhoods; neighborhoods contain buildings (as nodes); buildings contain offices; offices contain citizens. Roads-Terrace cross-cuts (transit between any of these levels):

```text
Districts-Terrace
└── District (e.g., Editorial District) — borough-scale
    └── Neighborhoods-Terrace
        └── Neighborhood (e.g., magazine-corner) — sub-district scale
            └── Building (e.g., DISpatch) — building-scale node within neighborhood
                                            (NOT a Terrace; node concept)
                └── Offices-Terrace
                    └── Office (e.g., META or NARRATIVE) — production unit within building
                        └── Citizens-Terrace
                            └── Citizen (agent) — codebase working in office

Roads-Terrace cross-cuts: connectivity between districts + neighborhoods + buildings
Brand-Terrace pipeline: produces the dev-diary microsite (which embeds the cartography)
Leisure-Terrace: separate region for agents in stasis / education / retirement (out-of-scope V1)
```

**Buildings are NODES within Neighborhoods, NOT a separate Terrace** (per Mayor 2026-05-07 7-Terrace canonical list per Signal 010). DISpatch is a building-scale node within the magazine-corner neighborhood within Editorial District. As Editorial District grows (future-newspaper-buildings; future-marketing-agency-buildings), each becomes its own neighborhood within the District.

**Cartography surfaces this hierarchy through zoom-level perspective** (per Signal 009 unified-grid reframe):

- Prime homepage (future, V1.5+) = whole-city perspective; districts visible
- District hub homepage (future) = zoom to district level; neighborhoods visible
- DISpatch homepage (V1 ship) = Editorial District perspective with magazine-corner highlighted (where DISpatch sits)
- DISpatch article (V1 ship) = magazine-corner perspective = neighborhood zoom

NO street-view; still top-down dynamic living cartography throughout. Grid dances and forms around buildings (DISpatch occupies park-or-venue space in magazine-corner neighborhood per Signal 009).

### §3.2.3 — Cosmology surfaces in cartography through specific signals (NOT as districts)

Cosmology layers (Empyrean / Paradiso / Eden / Inferno / Pillars / Histories per cosmology lock 7-position amendment Signal 008) are conceptual organizational positions of Prime's identity — NOT cartographic districts. They SURFACE in cartography through specific signals per Mayor 2026-05-07 Reframe 2 (Signal 010):

| Cosmology layer | How it surfaces in cartography |
| --- | --- |
| **Inferno** (9 layers of infra) | **Red dispatch lights** popping up through cartography — Prime's infrastructure (CI/CD / security / observability / agents activating) signaling activity. Like utility-manholes in NYC where city plumbing surfaces visually. **THIS IS WHY RED IS PRIME'S ACCENT COLOR.** Inferno is UNDERNEATH the cartography (utility infrastructure); pops up as red signals when active. (§6 wine-red Inferno markers ratifies semantic role + token-stub interface to CD2.) |
| **Paradiso** (9 charter spheres) | **Institutional fixture** on every surface — the city charter visible like Atlantic's "of no party or clique" institutional anchor (CD1 thesis Concept 6 + Decision 7 Paradiso seed-mandate fixture). |
| **Eden** (allied-meta) | **Allied-meta indicators** within surfaces — references to older sibling exemplars; specific cartographic expression TBD. |
| **Pillars** (5 foundational) | **Inherited at construction** by every Terrace + district + neighborhood + building + office + citizen (Architecture / Governance / Observability / Autonomy / Evolution-Adaptability properties). Subtle; mostly invisible at default cartographic register; alternative atmospheric Pillar-encoding overlay deferred to §7 Mayor adjudication. |
| **Histories** (base archive of tombstoned past per Signal 008) | **Deep-archive layer** accessible on-demand from any cartographic surface; NOT primary navigable surface. Article-node `histories-lineage` metadata points to tombstoned predecessor articles / decisions / iterations the article-node evolved from. |
| **Empyrean** | OUT-OF-SCOPE V1 (boundary-only; Mayor's space; orthogonal to pipeline per cosmology layer rule #11). |

### §3.2.4 — District character (cartographic expression of districts within Districts-Terrace)

Each district in Districts-Terrace has identity / character / wayfinding-texture distinct from neighbor districts. Cartographic expression of district character includes:

- **Spatial layout** — street network density / block scale / arterial axis / civic-axis (procgen-base layer per §2.1; Watabou + Azgaar generate distinct topologies per district)
- **Atmospheric texture** — paper grain density / contour-ink hue / warmth shift per district (atmospheric-overlay layer per §2.4 + §7; D3 contour + P5 paper grain calibrate per district)
- **Wayfinding signage** — district-name typography (Civic/Dante typeface per CD1 thesis Concept 1 5-typeface containment governance; asset-locked); cosmology-marker per article surface (CD4 component); dispatch markers (Inferno wine-red per §6)
- **Lane pigments** — terracotta / graphite-blue / dispatch-red per master plan §4 W1 CD2 row (CD2 ratifies token values; CD3 references via token-stub interface); lane semantics expressed in cartographic substrate per §8

**Districts are navigable through Districts-Terrace's cartographic rendering** — readers/agents traverse from district to district via spatial zoom + pan in the unified Prime grid (per Signal 009 unified-grid reframe). NOT modal switching. Same Prime grid; closer-or-farther zoom; pan across neighborhoods.

### §3.3 — Counter-doctrine (rejected per C7+C8 framing)

*"Blocks as visual subdivisions"* — arbitrary geometric divisions without semantic encoding. Treats cartography as decorative grid-skin; breaks cosmology-as-navigable-architecture; breaks the cartography-as-MVP-hero claim per CD1 thesis §1 + Decision 9. If districts are arbitrary visual cells, the cosmology metaphor reads as theme-skin and the dev-diary becomes a styled blog (per dispatch brief Section "Why this matters (stake)"); the bar fails to hold — and per Reframe 3 / Signal 011, the bar IS Paradiso's 9 Charter Spheres, which Districts-Terrace's content (`Prime/Purgatorio/Districts-Terrace/`) holds via semantic encoding. Block-skin cartography forfeits Paradiso's bar by stripping the semantic substrate that lets the institutional fixture register meaningfully on each surface.

**Muted-language version per master plan §1.1 + C8 discipline:** *currently inclined toward districts-as-semantic-units; first hypothesis is cosmology-encoded districts; subject to refinement at W2 when tokens bind to district names + W5 when microsite implementation surfaces specific district renderings.*

The counter-doctrine is rejected at the **CONCEPT level** (per Signal 007 bar-is-foundation framing connected to Reframe 3 Paradiso-as-bar — districts encode meaning so Paradiso's 9 Charter Spheres can hold the bar through them; the bar requires semantic encoding for "alive, dynamic, mapped to where you are" per CD1 thesis §1 to hold). It is **NOT rejected as future-Building-flexibility** per master plan §6.5 don't-discard + §1.7 reframe 2.3 don't-subtract — future Prime Buildings could express block-pattern cartography for surfaces where block-as-grid serves the bar (e.g., a future Prime data-dashboard Building might use grid-blocks for tabular data spatial encoding; that's a different surface's register choice; the future Building would need to articulate how block-pattern cartography holds Paradiso's bar at its surface). DISpatch's V1 dev-diary surface chooses district-as-semantic-unit; future Buildings choose per their purpose per master plan §1.3 5-narrow-certification gates.

### §3.4 — Article-node search index encoding (closes CD4 Signal 004 stub gap)

Per CD4 Signal 004 stub gap (CD4 component visual workshop surfaced 2026-05-08): each article-node in the Prime cartography must encode **multi-Terrace metadata** (per Signal 010 7-Terrace organizational-axes framing) so that downstream components (SearchPalette per CD4 spec; CosmologyMarker / MetroMapMarker per CD4 spec; metro-map "you are here" wayfinding per CD1 thesis Concept 3) surface "you are at Editorial District / magazine-corner / DISpatch / NARRATIVE office / [article-title]" + cosmology surfacing signals (Inferno active? Paradiso fixture? Pillars inherited? Histories lineage?) at user-facing glance.

**Article-node encoding contract (CD3 ratifies the encoding pattern; specific schema fields bind at W5 Astro Content Layer + Zod schema per master plan §3.B + §3.C):**

```yaml
# Article-node metadata (illustrative; final schema per W5 Astro Content Layer + Zod)
article-node:
  id: <ULID>                              # unique article identifier

  # Geographic axes (Districts + Neighborhoods + Roads Terraces)
  district: <district-name>               # e.g., "editorial-district" (V1 = Editorial District only; per Districts-Terrace content)
  neighborhood: <neighborhood-name>       # e.g., "magazine-corner" (per Neighborhoods-Terrace content; where DISpatch sits)
  building: <building-name>               # e.g., "dispatch" (DISpatch the magazine; building-scale node within neighborhood, NOT a Terrace)
  district-coordinates: <[x, y]>          # spatial coordinates within unified Prime grid (cartography-grid coordinate-handoff API per §8)
  neighbor-districts: <[district, ...]>   # forward-pointed neighbors per CD1 thesis Concept 7
  roads-connections: <[road, ...]>        # transit / connectivity references per Roads-Terrace (TBD-future-arc; V1 forward-pointed)

  # Operational axis (Offices Terrace)
  office: <office-name>                   # e.g., "narrative" or "meta" (which production unit authored the article; per Offices-Terrace content)

  # Cosmology surfacing signals (NOT districts; signals woven through cartography per §3.2.3)
  inferno-pop-up: <boolean>               # whether article surface hosts active Inferno red-dispatch-light signals (default false; pops up on agent activity per Signal 010 — red is Prime's accent color)
  paradiso-fixture: <boolean>             # whether Paradiso seed-mandate institutional fixture renders here (default true for V1 article surfaces per CD1 Concept 6)
  pillars-inheritance: <[pillar, ...]>    # which Pillars are most load-bearing for this article-node (Architecture / Governance / Observability / Autonomy / Evolution-Adaptability; per cosmology layer rule #1)
  histories-lineage: <histories-ref>      # tombstoned predecessor articles / decisions / iterations per cosmology Histories layer (Signal 008)
```

The encoding is **metadata-load-bearing**: SearchPalette + CosmologyMarker + MetroMapMarker components consume article-node metadata to surface multi-axis location (Editorial District / magazine-corner / DISpatch / NARRATIVE office) + cosmology-signals (Inferno active? Paradiso fixture? Pillars inherited? Histories lineage?) at user-facing glance. **CD3 ratifies the encoding PATTERN** (multi-Terrace metadata + cosmology surfacing signals + Pillars-inheritance + Histories-lineage as semantic fields); specific Zod schema + Astro Content Layer integration defers to W5 microsite implementation.

**Coordinate-handoff to §8.** The `district-coordinates` field cross-references §8 lane-semantic encoding pattern + cartography-grid ↔ site-grid coordinate-handoff API (closes conditional ratification gap #1 from §2 — most load-bearing). §8 ratifies the API; §3 ratifies the per-article-node encoding-fields.

### §3.5 — District-boundary curation workflow (closes §2 conditional ratification gap #2)

Per §2 conditional ratification: coding agents need concrete inputs to implement district boundaries. Mayor's V1 scope per dispatch brief Section 3 + master plan §6.5 don't-discard defers specific district-name lockdowns to per-district workshop sessions (§4 W2+). District-boundary outputs land at `Prime/Purgatorio/Districts-Terrace/` per Reframe 3 / Signal 011 folder-tree formalization (each district = a sub-folder within Districts-Terrace; future Editorial District canonical at `Prime/Purgatorio/Districts-Terrace/Editorial-District/`); the workflow that closes this gap is a **procgen-seed + Mayor-curation hybrid**:

| Step | Layer | Actor | Output |
| --- | --- | --- | --- |
| **1 — Procgen seed** | Layer 1 (Watabou + Azgaar) | Coding agents fire procgen tools with controlled stochasticity at relevant scale | SVG topological structure (street networks / district boundaries / topographic gradients) at 100s-1000s nodes |
| **2 — Mayor curation gate** | (Mayor) | Mayor reviews procgen output + curates: which procgen-generated district shapes hold the bar; which need re-roll; which need Mayor-authored override | Mayor-curated district-shape inventory; muted-language preserved per `feedback_concept_first_examples_prove_muted_language.md` |
| **3 — Concept-iteration overlay** | Layer 2 (Inkarnate Pro) — cross-reference Layer 5 (MJ + Recraft + Leonardo + Spline) for register-shifting variants | Mayor + coding agents iterate Mayor-curated shapes through concept-iteration tooling | PNG concept-stills informing aesthetic per district. **Concept-decoupling discipline applies (per §2.7):** concept-stills inform aesthetic but do NOT bind production runtime by default. Concept-emergence escape hatch (per §2.7 Signal 009): Mayor can elevate exceptional concept output to production-runtime |
| **4 — Production runtime ratification** | Layer 3 (Mapbox or MapLibre per W4 cascade) | Coding agents author style spec per Mayor adjudications; integrate with Astro / Next.js per W5 | Production runtime style spec (Mapbox Studio style.json OR MapLibre style spec) with Mayor-curated district boundaries + names locked |
| **5 — Atmospheric layer overlay** | Layer 4 (D3 + P5) | Coding agents implement per-district atmospheric overlays per §7 | Per-district atmospheric texture variation (paper grain density / contour-ink hue) per CD1 thesis Concept 4 + RES-009 |

**Workflow output: coherent district-boundary spec per district; coding agents have concrete Mayor-curated inputs to build against.** Closes §2 conditional ratification gap #2.

**Mayor-gate preservation across the workflow.** Step 2 + Step 4 are explicit Mayor gates; Step 3 surfaces concept-emergence to Mayor per concept-emergence escape hatch (Signal 009). Workflow respects Mayor-gates-decisions-not-execution discipline per `feedback_mayor_gates_decisions_not_execution.md`; coding agents run technical execution against Mayor-curated inputs.

### §3.6 — Defer-with-citation discipline for specific district-name lockdowns

Per dispatch brief Section 3 Mayor adjudication point + master plan §6.5 don't-discard + §1.7 reframe 2.3 don't-subtract: **V1 scope ratifies doctrine + Editorial District; future-district lockdowns ride content velocity per `feedback_decouple_scope_from_ambition.md`.**

- **V1 ratifies:** districts-not-blocks doctrine (this §3); Editorial District scaffold at `Prime/Purgatorio/Districts-Terrace/Editorial-District/` (Districts-Terrace's content; the dev-diary microsite renders Editorial District as primary view; CD3 §4); future-cosmology-layer plan sketches (provisional; CD3 §5; muted-language preserved); article-node search index encoding pattern (this §3.4); district-boundary curation workflow (this §3.5); cosmology = top-level folder tree of Prime repo with Paradiso = THE BAR (per Reframe 3 / Signal 011; cartography holds Paradiso's bar on every surface via institutional fixture)
- **V1 does NOT ratify:** specific district-name lockdowns beyond Editorial District; specific district-boundary geometries; specific per-district atmospheric texture values; Empyrean cartographic expression; Pillar-encoding-atmospheric-overlay decision (defers to §7); cosmology lock body restructure for full folder-tree formalization (Reframe 3 amendment record + brief framing note in cosmology lock body capture full framing canon-recoverably; full body restructure deferred unless Mayor scopes-up)
- **Future-arc adjudications:** per-district workshop sessions (§4 W2+) ratify district names + boundaries + atmospheric textures as content velocity warrants; Mayor adjudicates per district at the relevant Wave dispatch with full §6.5 7-dim framework + research-cited evidence per Signal 006 split. Districts populate as Districts-Terrace folder tree fills (`Prime/Purgatorio/Districts-Terrace/<district-name>/`) per per-Terrace-formalization arc.

### §3.7 — Mayor adjudication points for §3

Three load-bearing decisions Mayor adjudicates at §3 ratification (CC-recommendations re-issued against full corrected framing — Reframes 1+2+3 cumulative per Signals 008+010+011):

1. **Districts-not-blocks doctrine ratification (load-bearing).** Does the doctrine ratify at CD3 as the load-bearing concept that downstream §4 (Editorial District) + §5 (future-cosmology-layer sketches) + §10 (cross-stream coordination) build against? **Reframe 2 corrected framing:** cosmology positions are CONCEPTUAL organizational positions (NOT 1:1 cartographic mappings); cartography itself is rendered by **Districts-Terrace's content** (Districts-Terrace primary; Roads-Terrace + Neighborhoods-Terrace cross-cut); cosmology surfaces in cartography through specific signals (Inferno red dispatch lights / Paradiso institutional fixture / Pillars inherited at construction / Histories deep-archive / Eden allied-meta indicators); Empyrean OUT-OF-SCOPE V1. **Reframe 3 corrected framing:** Districts-Terrace's content lives at `Prime/Purgatorio/Districts-Terrace/`; Paradiso = THE BAR (per Signal 011); every district must hold the bar via the institutional fixture per CD1 thesis Concept 6 + Decision 7.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Universal concept (districts as semantic civic-units) proves at world-class scale (NYC / Houston / Tokyo wards); Prime adopts in DISpatch register (D&D-map + GTA-5-zoom + fictional-modern-city-map facsimile per CD1 thesis §3); districts navigable as Districts-Terrace's cartographic rendering per unified-grid + zoom-level reframe per Mayor 2026-05-07 (zoom + pan, not modal switch — Signal 009); each district holds Paradiso's bar via institutional fixture per Signal 011; counter-doctrine (blocks as visual subdivisions) rejected at concept level (would forfeit Paradiso's bar) + preserved as future-Building-flexibility per don't-discard. *Concept-first framing + bar-is-foundation framing (Paradiso = THE BAR) + cosmology-as-navigable-architecture-via-Districts-Terrace + folder-tree-grounding all tip toward.*

2. **Article-node search index encoding pattern ratification (closes CD4 Signal 004 stub gap).** Does the encoding pattern (multi-Terrace metadata: district + neighborhood + building + office + roads-connections; cosmology surfacing signals: inferno-pop-up / paradiso-fixture / pillars-inheritance / histories-lineage; spatial coordinates per unified-grid coordinate-handoff) ratify at CD3? Specific Zod schema + Astro Content Layer integration defers to W5. **Reframe 2 corrected framing:** encoding fields reflect multi-axis Terrace organization (same artifact referenced from Districts / Neighborhoods / Offices / Citizens / Brand / Roads Terrace lenses simultaneously) NOT a single cartographic-cosmology mapping.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. CD3 ratifies the encoding PATTERN (semantic field structure preserving multi-axis Terrace organization per Signal 010 + cosmology-via-signals per Reframe 2 + folder-tree grounding per Reframe 3); W5 ratifies the SCHEMA (Zod + Astro Content Layer). Pattern preserves SearchPalette / CosmologyMarker / MetroMapMarker component consumption per CD4 component visual workshop. *Pattern-not-schema-at-CD3 + multi-axis-Terrace-correctness + cosmology-via-signals-correctness + don't-pre-commit-implementation + cross-stream coordination (CD4 → W5) tip toward.*

3. **District-boundary curation workflow ratification (closes §2 conditional ratification gap #2).** Does the procgen-seed + Mayor-curation hybrid workflow (5 steps; Mayor gates at Step 2 + Step 4; concept-emergence surface at Step 3) ratify as the workflow coding agents follow to implement district boundaries with concrete Mayor-curated inputs? **Reframe 3 corrected framing:** Districts populate as `Prime/Purgatorio/Districts-Terrace/<district-name>/` sub-folders per per-Terrace-formalization arc; workflow output lands within the Districts-Terrace folder tree.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Workflow preserves Mayor adjudication authority over district shapes (Step 2 + Step 4 are Mayor gates); preserves concept-decoupling discipline (Step 3 informs aesthetic without binding runtime per §2.7 + Signal 009 escape hatch); closes §2 conditional ratification gap #2; coding agents have concrete inputs at each step; output lands within Districts-Terrace folder tree per Reframe 3 grounding (each district = `Prime/Purgatorio/Districts-Terrace/<district-name>/`); each district output verifies it holds Paradiso's bar via institutional fixture before per-district ratification. *Mayor-gate preservation + concept-decoupling + agent-implementability + folder-tree-grounding + bar-holding-verification tip toward.*

**Cross-references at §3 ratification (Reframes 1+2+3 cumulative):**

- Cosmology lock 7-position amendment + 7 Terraces named + folder-tree formalization (Signals 008 + 010 + 011 in `cc-ledger/cross-surface-signals.md`; cosmology lock memory file 2026-05-07 cumulative amendments — Reframes 1+2+3)
- §1.2 7-position cosmology table + Reframe 2 paragraph + Reframe 3 paragraph + Paradiso-as-bar row + Purgatorio folder-paths row (Signals 008 + 010 + 011)
- §2.6 unified-grid + zoom-level reframe (Signal 009)
- §2.7 concept-decoupling discipline + concept-emergence escape hatch (Signal 009)
- §3.2.X (intro + 7-Terraces table + Districts-Terrace content + geographic hierarchy + cosmology-surfaces-via-signals + district character) + §3.4 (multi-Terrace article-node encoding) — full Reframe 2 framing applied
- CD4 Signal 004 stub gap on article-node search index encoding for SearchPalette
- §2 conditional ratification gap #2 (district-boundary curation workflow) — CLOSED in §3.5
- §8 lane semantics (closes conditional ratification gap #1: cartography-grid ↔ site-grid coordinate-handoff API)
- §7 atmospheric layer (Pillar-inheritance encoding decision deferred to §7; Histories cartographic expression deferred to §5)
- Master plan §1.1 register lock + §6.5 7-dim framework (per Signal 006) + §1.7 reframe 2.3 don't-subtract + §6.5 don't-discard
- CD1 thesis §1 (cartography hero subtly) + §3 (cartography register) + §4.1-§4.2 (cosmology metaphor scaffold) + Concept 6 (Paradiso seed-mandate institutional fixture = THE BAR per Reframe 3) + Decision 7 (Paradiso seed-mandate fixture) + Decision 9 (cartography commitment + dial principle)
- `feedback_concept_first_examples_prove_muted_language.md` (C7 + C8) + `feedback_decouple_scope_from_ambition.md` (V1 scope discipline) + `feedback_mayor_gates_decisions_not_execution.md` (Mayor-gate preservation) + `feedback_append_vs_edit_discipline.md` (chisel-by-pointer through Signals 008+010+011; thesis.md verbatim preservation)

---

## §4 — Editorial District scaffold (V1 LOCKED first district; Districts-Terrace's cartographic content)

The **first concrete-detail district CD3 scaffolds** within Districts-Terrace's cartographic content (per Reframe 2 / Signal 010 + Reframe 3 / Signal 011): the **Editorial District** at `Prime/Purgatorio/Districts-Terrace/Editorial-District/`. Editorial District is V1 LOCKED — the dev-diary microsite renders Editorial District as primary view. CD3 §4 scaffolds character + navigation pattern + lane semantics + atmospheric texture direction + forward-pointed-neighbor-buildings render discipline at concept-level + muted-language detail per master plan §1.1 + C8 discipline; specific token bindings + asset selections + per-component spec details defer to W2 (token pipeline real-CSS contexts) / W3 (component layer) / W5 (microsite Astro implementation) per dispatch brief Section 4 Mayor adjudication point + master plan §6.5 don't-discard.

Editorial District is the **precedent for future-district pattern** within Districts-Terrace (Civic / Art / Editorial / etc. per §3.2.1). Future districts (Civic / Art / future-arc) inherit the doctrine ratified in §4 OR ratify their own per-district scaffold per per-Terrace-formalization arc + master plan §1.3 5-narrow-certification gates.

### §4.1 — Universal concept

*Flagship district as precedent for future-district pattern* — the first district scaffolded at granular detail establishes the pattern future districts inherit / adapt. The first district holds Paradiso's bar most visibly (it's the V1 ship surface; first-impression load); future districts climb against the precedent set.

**Examples that prove the concept at world-class scale:**

- **NYC Manhattan as borough-character precedent** — Manhattan's tall-and-dense character set the precedent against which Brooklyn's brownstone-and-neighborhood-rooted, Queens's multicultural-and-sprawling, Bronx's working-class-civic, and Staten Island's quiet-borough characters articulate. Each subsequent borough articulates relative to Manhattan's precedent (with its own distinct character).
- **Houston downtown ward as ward-character precedent** — Downtown ward's institutional-civic character sets the precedent against which Heights, Montrose, East End, Third Ward articulate. Each ward holds Houston's civic-political districting precedent while expressing its own character.
- **Tokyo Shibuya as metropolitan-ward precedent** — Shibuya's youth-cultural-commercial character sets the precedent against which Shinjuku's nightlife-and-government, Minato's high-end-international, Chiyoda's institutional-historical, etc. articulate.

The concept-first framing per master plan §1.1 + C7 discipline: Prime's Editorial District uses flagship-precedent-then-articulate-against pattern from world-class urban precedents; Editorial District at V1 ship sets the precedent that future Districts (Civic / Art / etc.) articulate against per their character + register.

### §4.2 — Cosmological position + folder grounding

**Cosmological position** — Editorial District is **Districts-Terrace's content** (per Reframe 2 / Signal 010 — Editorial District is NOT Brand-Terrace's neighborhood per CD1 thesis §4.3 loose framing; per append-only documentation lifecycle thesis.md stays verbatim and CD3 amends-by-pointer per Signal 010). Districts-Terrace is one of 7 Purgatorio organizational-axis Terraces; Districts-Terrace is the **CARTOGRAPHIC PRIMARY axis** that renders borough-scale districts in cartography.

**Folder grounding** (per Reframe 3 / Signal 011): Editorial District canonical at `Prime/Purgatorio/Districts-Terrace/Editorial-District/`. The dev-diary microsite is a Brand-Terrace artifact (`Prime/Purgatorio/Brand-Terrace/`'s pipeline output) that EMBEDS the cartography rendering Editorial District. Brand-Terrace is the public-facing pipeline; Editorial District is the cartographic content the pipeline publishes. Same Prime artifact (DISpatch the dev-diary magazine) referenced from multiple Terrace-axes simultaneously per §3.2 multi-axis Terrace organization.

**Bar-holding obligation** (per Reframe 3 / Signal 011): Editorial District holds Paradiso's bar via the institutional fixture per CD1 thesis Concept 6 + Decision 7 (Paradiso seed-mandate institutional fixture appears on every cartographic surface). Every section of Editorial District's cartographic rendering must hold the bar; the dial-calibration mechanism (per §2.6 + §7) calibrates how the bar manifests across DISpatch's surfaces (homepage / article low-dial / mid-dial / high-dial) without ever forfeiting it.

### §4.3 — District character (currently inclined; muted language preserved)

Per master plan §1.1 + C8 muted-language discipline: aesthetic / register / atmospheric-texture / district-naming choices use "currently inclined toward X" / "first hypothesis is Y" / "subject to refinement at W2/W5/CD6." Strong language reserved for ratified load-bearing decisions (cosmological position; folder grounding; bar-holding obligation per §4.2).

**Editorial District character (currently inclined): *editorial-civic-warm.*** Specifically:

- **Spatial layout** — orthogonal-with-civic-axis street network; mid-density block scale (not Manhattan-tall, not suburb-spread; Brooklyn-brownstone density per CD1 register reference); arterial avenues that read as civic-architectural backbone (per CD1 thesis §3 cartography register: D&D-map + GTA-5-zoom + fictional-modern-city-map facsimile)
- **Atmospheric texture** — paper grain density: medium (warm-white substrate with subtle grain that reads tactile not noisy per CD1 thesis Concept 4 + reference-archive §1 Concept 4 The Paris Review Pentagram-Willey precedent); contour-ink hue: editorial-warm (warm yellow shift of incandescent-room-light-printed-on-warm-paper per CD1 thesis §3 atmospheric register currently inclined token `window-warm`); subject to refinement at CD2 token ratification + §7 atmospheric layer
- **Wayfinding signage** — Civic/Dante typeface for district-name typography per CD1 thesis Concept 1 5-typeface containment governance (asset-locked typeface; "burned in" per NYC green street-sign feel); cosmology-marker per article surface (CD4 component); dispatch markers (Inferno wine-red per §6); cross-references CD1 thesis Concept 3 page-furniture-as-civic-wayfinding
- **District boundary character** — soft-edged at the level of the unified Prime grid (no hard borders that fight the grid-dances-around-components discipline per §2.6 + Signal 009); forward-pointed-neighbor-districts visible at edge of perspective with diminished visual weight ("anticipatory-not-missing" register per CD1 thesis Concept 7; closes CD4 Signal 004 stub gap — see §4.7)

**Refinement trajectory:** specific token bindings + asset selections + per-component spec details defer to W2 (CD2 token pipeline real-CSS contexts ratify `window-warm` etc.) / W3 (component layer; CD4 chapter-rail + cosmology-marker spec.md authoring) / W5 (microsite Astro implementation; Civic/Dante typeface specific selection per reference-archive §2 candidates) / CD6 brand synthesis (cross-CD reconciliation). Mayor adjudicates character direction at §4 (this section); specific values defer.

### §4.4 — Navigation entry points (perspective per surface)

Per §2.6 unified-grid + zoom-level reframe (Signal 009): cartography is unified Prime grid; zoom-level varies per surface; dial calibrates presence-intensity at zoom-level; NO street-view; grid dances around components.

**Editorial District navigation entry points (V1 ship):**

| Surface | Zoom level (within unified Prime grid) | Navigation entry signal | V1 status |
| --- | --- | --- | --- |
| **DISpatch homepage** | Editorial District perspective (borough-scale zoom) | Unique marker representing **DISpatch Magazine** — readers recognize "I'm at the magazine" (per Signal 009 Mayor framing); marker register: editorial-civic per §4.3 character; specific marker form refines at CD4 component visual workshop + W5 microsite implementation | V1 LOCKED — Mayor 2026-05-07 ratified unique-magazine-marker for DISpatch homepage |
| **DISpatch article** (low / mid / high dial) | Magazine-corner perspective (neighborhood-within-district zoom; analogous to Hell's Kitchen / Harlem / Broadway as neighborhoods within Manhattan per §2.6) | Magazine-corner highlighted in cartography; article occupies park-or-venue space within magazine-corner per grid-dances-around-components discipline (Signal 009); cosmology-marker + chapter-rail + metro-map "you are here" assets per CD1 thesis Concept 3 page-furniture-as-civic-wayfinding | V1 LOCKED — Mayor 2026-05-07 ratified magazine-corner perspective for article surfaces |
| **Forward-pointed Civic / Art districts** (visible at edge of any DISpatch surface) | Edge-of-perspective; abstracted | Diminished visual weight (opacity / saturation reduced); "anticipatory-not-missing" register per CD1 thesis Concept 7; readers register that other districts exist without being pulled out of Editorial District | V1 LOCKED render discipline (closes CD4 Signal 004 stub gap; see §4.7) |
| **Forward-pointed Prime City homepage** (V1.5+) | Whole-city perspective | Placeholder — "back to Prime City" affordance per CD1 thesis Concept 7 walking metaphor (city + districts forward-pointed; building-and-below stack ships V1) | V1.5+ trajectory; placeholder in V1 cartography |

**Walking metaphor inheritance** (per CD1 thesis Concept 7 + §3.2.2 geographic hierarchy): readers walk from Prime City (forward-pointed V1) → through Editorial District (V1 LOCKED at borough-scale zoom on DISpatch homepage) → into magazine-corner neighborhood (V1 LOCKED at neighborhood zoom on DISpatch article surfaces) → up to DISpatch building (the magazine itself; building-scale node within magazine-corner) → through reception (homepage) → past offices (META + NARRATIVE production units within building; per Offices-Terrace) → reading missives (articles output FROM offices). Editorial District perspective is the cartographic substrate the reader registers at homepage; magazine-corner perspective is the cartographic substrate the reader registers at article surface; both hold Paradiso's bar through institutional fixture per CD1 thesis Concept 6.

**Cross-stream dependency:** CD4 component visual workshop ratifies the unique-magazine-marker form + chapter-rail + cosmology-marker + metro-map "you are here" component shape. CD3 §4 ratifies the SEMANTIC role each plays within Editorial District navigation + the perspective-per-surface mapping. CD3+CD4 reconcile at CD6 brand synthesis.

### §4.5 — Lane semantics within Editorial District (per CD2 Decision 5 cosmology-symmetry)

Per CD1 thesis Concept 2 grid-as-architectural-document + master plan §3.A concept #2 + §4 W1 CD2 row lane pigments + **CD2 Decision 5 cosmology-symmetry framing** (RATIFIED 2026-05-07 per Signal 012; canonized per Signal 014): cartographic lanes within Editorial District express three cosmology directional vectors meeting at Purgatorio surface — Below (Inferno-surfacing) + Surface (Editorial substrate) + Above (Paradiso-descending = THE BAR) — through the cartographic-substrate render. **Lanes are LOGICAL/SEMANTIC channels (local accents), NOT visual-spatial bands** (per Mayor 2026-05-07 CD2 verbatim check; canonized per Signal 014).

**Editorial District lane-semantic encoding (CD3 ratifies cartographic surfacing role; CD2 RATIFIED pigment values + cosmology vectors; CD4 ratifies CSS column assignments):**

| Lane | Cosmology vector | Pigment family (CD2 RATIFIED) | Token references | Cartographic surfacing role within Editorial District |
| --- | --- | --- | --- | --- |
| **Lane 1 Editorial** | **Surface** — the city itself; substrate paper is printed on | Warm-earth (terracotta family) | `--lane-editorial-{step}` (DISpatch-locked tier) | Where editorial content lives — article bodies / missives / reading sanctuary surfaces; Reception ↔ offices ↔ missives walking metaphor inheritance per CD1 thesis Concept 7 |
| **Lane 2 Institutional** | **Above** — Paradiso-charter descending through Purgatorio surface = **THE BAR descending** | Cool-mineral (graphite-blue family) | `--lane-institutional-{step}` (DISpatch-locked tier) | Where institutional content renders — DISpatch's masthead + Paradiso seed-mandate institutional fixture + civic-architectural backbone per CD1 Concept 6 + Reframe 3 / Signal 011 Paradiso = THE BAR |
| **Lane 3 Dispatch** | **Below** — Inferno-infra surfacing through Purgatorio surface | Dispatch-red (inherits `--accent-prime` Prime-platform-wide tier) | `--lane-dispatch-{step}` (DISpatch-locked tier alias of `{platform.accent-prime}`) + `--asset-cartography-pulse` (asset-locked tier; cartography wine-red infra-pulse markers per CD2 §5.2 stub interface) | Where Inferno-infra activity surfaces — agents activating / CI/CD running / observability tracing / etc.; per §6 wine-red Inferno markers + cosmology-surfaces-via-signals per Reframe 2 / Signal 010 |

**Cosmology coherence** (per CD2 Decision 5 + Decision 7 + Signals 012 + 014): the three lane pigments are the visible expression of three cosmology vectors meeting at Editorial District's surface. Vellum atmospheric chrome (per CD2 Decision 6 + §7.5) is *what Editorial District is printed on*; lane pigments are the *three forces shaping it*. Wordmark + Lane 3 dispatch + cartography pulse all express ONE Inferno-infra-surfacing vector at three different surface scales (masthead / lane indicators / map markers per CD2 Decision 7 split-color cosmology-encoded composition).

**Cross-stream dependencies:**

- **CD2** RATIFIED actual pigment OKLCH values + APCA contrast validation per pairing per CD2 Decision 5 (lane pigments) + Decision 6 (atmospheric chrome) + Decision 7 (wordmark cosmology-encoded composition)
- **CD4** ratifies CSS column assignments + lane-pigment-to-component mapping per §3.A concept #2 grid-as-architectural-document; component spec.md authoring inherits CD2-aligned token references (`--lane-editorial-{step}` / `--lane-institutional-{step}` / `--lane-dispatch-{step}` + `--asset-cartography-pulse`)
- **§8** ratifies cartographic-grid ↔ site-grid coordinate-handoff API (closes §2 conditional ratification gap #1; most load-bearing); §4.5 + §6.3 lane-semantic encoding pattern is CD3-side input to §8 API spec
- **CD6** brand synthesis recombines CD2 + CD3 + CD4 into shippable identity

### §4.6 — Atmospheric texture (paper grain + contour-ink editorial-warm)

Per RES-009 reframe + §2.4 + §7 atmospheric layer: Editorial District atmospheric texture inherits Layer 4 D3.js contour-ink + P5.js paper grain expressions calibrated to editorial-civic-warm character per §4.3.

**Editorial District atmospheric texture (currently inclined; ratifies token-level at CD2 + §7):**

- **Paper grain texture (P5.js procedural)** — fine-grain warm-white substrate with subtle grain density that reads tactile not noisy. Inherits CD1 thesis Concept 4 + reference-archive §1 Concept 4 The Paris Review Pentagram-Willey recycled-paper tactile-warmth precedent. Substrate static at scroll cadence per RES-009 fold to CD5 motion.md. Specific candidate refines at §7 + CD2 token pipeline + W2 real-CSS contexts.
- **Contour-ink hue shift (D3.js)** — editorial-warm hue shift (warm yellow shift of incandescent-room-light-printed-on-warm-paper per CD1 thesis §3 atmospheric register; token `window-warm` currently inclined; CD2 ratifies actual OKLCH). Contour-ink renders per district per §7; Editorial District's hue distinguishes from future-Civic-District's hue (cooler / institutional-grey) and future-Art-District's hue (warmer-saturated / creative-pop) per per-district atmospheric texture variation discipline.
- **Atmospheric chrome anchors** — `sky-high` / `sky-low` / `reflect` / `window-warm` token names currently inclined per CD1 thesis §3 + Concept 4 + reference-archive §1 Concept 4. Token semantics fold to CD2 color.md per RES-009; atmospheric-chrome-not-animated-as-primary-motion-target rule folds to CD5 motion.md per RES-009; CD3 §4 references the folded landings.

**Cross-references** to §7 atmospheric layer (Layer 4 expression-tooling pipeline) + §2.4 (D3 + P5 per-tool 7-dim framework) + RES-009 (atmosphere.md retired; CD3 owns full visual substrate; per-domain folds to CD2 / CD4 / CD5).

### §4.7 — Forward-pointed-neighbor-buildings render discipline (closes CD4 Signal 004 stub gap)

Per CD4 Signal 004 stub gap (CD4 component visual workshop surfaced 2026-05-08): Editorial District's neighbor-buildings rendering needs ratified discipline. CD3 §4.7 closes this stub gap with a render discipline aligned to CD1 thesis Concept 7 walking metaphor + §2.6 unified-grid + Signal 009 grid-dances-around-components reframe.

**Forward-pointed-neighbor-buildings render discipline:**

| Render layer | What it does | Visual treatment |
| --- | --- | --- |
| **Active focus (current zoom-level building)** | Current building (e.g., DISpatch) renders at full visual weight at the active zoom-level | Full opacity; full saturation; full atmospheric texture per §4.6; institutional fixture present (Paradiso bar visible) |
| **Adjacent neighbors (within current neighborhood)** | Neighbor buildings within the same neighborhood (magazine-corner) — at V1, neighbor-buildings within magazine-corner do NOT exist yet (DISpatch is the only V1 building); placeholder render only | Diminished opacity (50-70%); reduced saturation; "anticipatory-not-missing" register per CD1 thesis Concept 7; placeholder render at neighborhood zoom |
| **Forward-pointed neighbor neighborhoods (within Editorial District)** | Future-newspaper-corner / future-marketing-agency-corner / etc. — within Editorial District but at neighborhood zoom edge | Further-diminished opacity (30-50%); abstracted form (silhouette only); "anticipatory-not-missing" |
| **Forward-pointed neighbor districts (Civic / Art / etc.)** | Beyond Editorial District boundary — at borough zoom edge | Most-diminished opacity (15-30%); silhouette only at edge of perspective; "anticipatory-not-missing" |
| **Forward-pointed Prime City + Empyrean** | Out-of-scope V1; not rendered in V1 cartography (Empyrean per cosmology layer rule #11; Prime City homepage forward-pointed for V1.5+) | NOT rendered V1 |

**Discipline rationale** (per CD1 thesis Concept 7 walking metaphor + Mayor 2026-05-07 unified-grid reframe per Signal 009): readers see Editorial District is part of a larger Prime cosmology without being pulled out of the active reading register. Diminished-but-visible neighbors signal "this is part of something bigger" while "anticipatory-not-missing" register signals "what's there is deliberately scaffolded for future fill, not broken / missing." Forward-pointed-neighbor-buildings render discipline preserves the bar at the edge — Paradiso's institutional fixture renders consistently across active focus + adjacent + forward-pointed surfaces; the bar is held across all visibility levels per Reframe 3 / Signal 011.

**Specific opacity / saturation calibration values defer** to CD4 component layer + W5 microsite implementation per master plan §6.5 don't-discard; CD3 §4.7 ratifies the discipline (5 visibility tiers + per-tier behavior pattern), not the values.

**Cross-stream dependency:** CD4 component layer implements the per-zoom-level + per-visibility-tier rendering; CD3 §4.7 ratifies the discipline. CD3+CD4 reconcile at CD6.

### §4.8 — Future-iteration scope (V1 + per-Building inheritance)

Per master plan §1.3 5-narrow-certification gates + §1.7 reframe 2.3 don't-subtract + `feedback_decouple_scope_from_ambition.md`:

- **V1 ratifies:** Editorial District scaffold at borough-scale (CD3 §4 character + navigation + lane semantics + atmospheric texture + forward-pointed-neighbor-buildings render discipline); folder grounding at `Prime/Purgatorio/Districts-Terrace/Editorial-District/`; magazine-corner neighborhood scaffolds within Editorial District at neighborhood-scale; DISpatch building-scale node within magazine-corner
- **V1 does NOT ratify:** specific token OKLCH values (defer to CD2); specific Civic/Dante typeface candidate selection (defer to W5 per reference-archive §2); specific component spec.md per chapter-rail / cosmology-marker / unique-magazine-marker (defer to CD4); specific per-component animation register (defer to CD5); specific neighbor-building / neighbor-neighborhood / neighbor-district names (defer to per-district workshop sessions per §4 W2+ + per-Terrace-formalization arc per cosmology lock layer rule #12); specific opacity / saturation calibration values for forward-pointed-neighbor render tiers (defer to CD4 + W5)
- **Future-Building inheritance** per master plan §1.3 5-narrow-certification gates: future Buildings (writing / content / animation / games / demos / databases / accounts / apps per master plan §1.2) inherit Editorial District doctrine OR ratify their own per-Building register choice per §1.3 5-narrow-certification-gate process. DISpatch's Editorial District is one Building's choice for one surface's purpose; future Buildings choose per their purpose per Brand-Terrace `brand.md` v0.2.1 per-Building brand-certification gate (per `feedback_per_building_brand_certification_gate.md`)
- **Future-arc adjudications** (deferred per cosmology lock + per-Terrace-formalization arc): future Districts within Districts-Terrace (Civic / Art / etc.) populate `Prime/Purgatorio/Districts-Terrace/<district-name>/` sub-folders; per-district workshop sessions ratify district names + boundaries + atmospheric textures as content velocity warrants per `feedback_decouple_scope_from_ambition.md`

### §4.9 — Mayor adjudication points for §4

Per dispatch brief Section 4 Mayor adjudication point: confirm Editorial District character + navigation pattern + atmospheric texture direction. Specific token bindings + asset selections defer to W2/W3/W5.

Three load-bearing decisions Mayor adjudicates at §4 ratification:

1. **Editorial District character ratification (load-bearing).** Does the editorial-civic-warm character (mid-density orthogonal-with-civic-axis spatial layout; medium-density warm-white paper grain; editorial-warm contour-ink hue; Civic/Dante typeface for district-name signage per CD1 Concept 1; soft-edged district boundaries per Signal 009 grid-dances-around-components) ratify at CD3 as the load-bearing character that downstream CD4 (component visual workshop) + CD5 (motion register) + CD6 (brand synthesis) + W2 (token pipeline) + W5 (microsite implementation) build against? Specific token + typeface + texture values defer.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Editorial-civic-warm character matches DISpatch's CD1 register (architectural / editorial / neo-vintage / AI-forward — magazine-coded; marriage of NARRATIVE literary-civic + META Wired/Hacker per CD1 thesis §3); inherits CD1 thesis Concepts 1 + 2 + 3 + 4 (typographic 5-typeface containment governance + grid-as-architectural-document + page-furniture-as-civic-wayfinding + atmosphere-as-physical-substrate); preserves muted-language for refinable choices per master plan §1.1 + C8 discipline. *Concept-first framing + bar-holding obligation (Editorial District holds Paradiso's bar via institutional fixture) + register-coherence-with-CD1 + muted-language-preservation tip toward.*

2. **Navigation entry points ratification (load-bearing).** Does the perspective-per-surface mapping (DISpatch homepage = Editorial District perspective with unique magazine marker; DISpatch article = magazine-corner perspective; forward-pointed neighbor districts at edge with diminished visual weight; Prime City homepage placeholder for V1.5+) ratify at CD3 as the load-bearing navigation pattern that CD4 component visual workshop + W5 microsite implementation build against? Specific marker form + chapter-rail / cosmology-marker / metro-map "you are here" component shapes defer to CD4.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Perspective-per-surface mapping inherits CD1 thesis Concept 7 walking metaphor + §2.6 unified-grid + Signal 009 zoom-level discipline + Mayor 2026-05-07 unique-magazine-marker for DISpatch homepage + magazine-corner-perspective for articles; preserves walking metaphor coherence per CD1 thesis §5 Apple-cohesion test framing. *Walking-metaphor-coherence + unified-grid-correctness + Apple-cohesion-test-preservation tip toward.*

3. **Atmospheric texture direction + forward-pointed-neighbor-buildings render discipline ratification (load-bearing; closes CD4 Signal 004 stub gap on neighbor-buildings rendering).** Does the atmospheric texture direction (P5.js paper grain + D3.js contour-ink editorial-warm + atmospheric chrome anchors `sky-high` / `sky-low` / `reflect` / `window-warm`) + forward-pointed-neighbor-buildings render discipline (5 visibility tiers: active focus full / adjacent neighbors diminished / forward-pointed neighborhoods further-diminished / forward-pointed districts most-diminished / forward-pointed Prime City + Empyrean not rendered V1) ratify at CD3 as the load-bearing atmospheric direction + render discipline that §7 atmospheric layer + CD4 component layer + CD5 motion register + W5 microsite implementation build against? Specific OKLCH values + texture candidates + opacity calibration defer.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Atmospheric texture direction inherits CD1 thesis Concept 4 (atmosphere-as-physical-substrate) + reference-archive §1 Concept 4 (Paris Review Pentagram-Willey precedent) + RES-009 (CD3 owns full visual substrate; chrome tokens fold to CD2 color.md; texture-surface declarations fold to CD4 components.md; motion-coupling rule folds to CD5 motion.md per RES-009); forward-pointed-neighbor-buildings render discipline closes CD4 Signal 004 stub gap on neighbor-buildings rendering; "anticipatory-not-missing" register preserves walking metaphor coherence per CD1 thesis Concept 7; preserves bar-holding-at-edge per Reframe 3 / Signal 011 (Paradiso's institutional fixture renders consistently across visibility tiers). *Atmosphere-as-substrate + RES-009-folds + CD4-stub-gap-closure + bar-at-edge-preservation tip toward.*

**Cross-references at §4 ratification:**

- §1 + §2 ratified Cycle 1; §3 ratified Cycle 2; §4 builds on all three
- Districts-Terrace folder grounding at `Prime/Purgatorio/Districts-Terrace/Editorial-District/` per Reframe 3 / Signal 011
- Magazine-corner neighborhood within Neighborhoods-Terrace (`Prime/Purgatorio/Neighborhoods-Terrace/<magazine-corner-folder>/`; specific folder name TBD per per-Terrace-formalization arc); DISpatch building-scale node within magazine-corner
- §2.6 unified-grid + zoom-level reframe (Signal 009) + grid-dances-around-components discipline
- §3.2.2 geographic hierarchy + §3.2.4 district character + §3.4 multi-Terrace article-node encoding
- §6 wine-red Inferno markers (lane-semantic encoding for dispatch-marker lane per §4.5)
- §7 atmospheric layer (Layer 4 expression-tooling pipeline binds to §4.6 atmospheric texture direction)
- §8 lane semantics (cartography-grid ↔ site-grid coordinate-handoff API closes §2 conditional ratification gap #1; §4.5 references encoding pattern that §8 binds to API spec)
- CD4 Signal 004 stub gaps on article-node search index encoding (closed §3.4) + DistrictMap forward-pointed-neighbor-buildings rendering (CLOSED §4.7) + CartographyCanvas full encoding (deferred to §7) + coordinate-handoff API (deferred to §8)
- CD1 thesis §1 (cartography hero subtly) + §3 (cartography register + atmospheric register) + §4.1-§4.4 (cosmology metaphor + cartography commitment) + Concept 1 (5-typeface containment governance — Civic/Dante asset-locked) + Concept 2 (grid-as-architectural-document — lane-CSS-column mapping per §4.5) + Concept 3 (page-furniture-as-civic-wayfinding — chapter-rail / cosmology-marker / metro-map per §4.4) + Concept 4 (atmosphere-as-physical-substrate — paper grain + contour-ink per §4.6) + Concept 6 (Paradiso seed-mandate institutional fixture = THE BAR per Reframe 3) + Concept 7 (walking metaphor + V1 building-and-below stack scope) + Decision 9 (cartography commitment + dial principle)
- Master plan §1.1 register lock + §1.3 5-narrow-certification gates (per-Building register choice) + §6.5 7-dim framework (per Signal 006) + §1.7 reframe 2.3 don't-subtract + §6.5 don't-discard + RES-009 (atmosphere.md retired; CD3 owns full visual substrate)
- `feedback_concept_first_examples_prove_muted_language.md` (C7 + C8) + `feedback_decouple_scope_from_ambition.md` (V1 scope discipline) + `feedback_per_building_brand_certification_gate.md` (Brand-Terrace per-Building brand-certification at publish gate) + `feedback_append_vs_edit_discipline.md` (chisel-by-pointer through Signals 008+010+011; thesis.md verbatim preservation)

---

## §5 — Future-cosmology-layer cartographic surfacing sketches (provisional; muted language)

Per dispatch brief Section 5: provisional sketches per cosmology layer in muted technical language; *currently inclined toward X / first hypothesis is Y / subject to refinement at future-arc*; NOT pre-commitment to specific surfacing forms per dispatch constraints.

**Reframe-aware framing for §5** (per cumulative Reframes 1+2+3):

The original dispatch brief Section 5 framed §5 as "future-district sketches per cosmology layer" — pre-Reframe-2 framing that conflated cosmology positions with districts. Per Reframe 2 / Signal 010 (cosmology-as-conceptual-not-cartographic), cosmology layers SURFACE in cartography through specific signals; districts are Districts-Terrace's content (per §3 + §4); cosmology layers are NOT districts. §5 therefore sketches **how each cosmology layer's surfacing signal develops / refines** across future-arcs, with the per-layer surfacing already named at §3.2.3 cosmology-surfaces-via-signals table. Each sketch names character + register-direction-hypothesis + which arc / Wave refines the sketch into ratified surfacing — per dispatch brief Section 5 sketch quality bar.

**Sketch quality bar:** 2-4 sentences per layer; muted technical language preserved; not a lockdown. The pattern of future-cosmology-layer sketching ratifies at V1 (the discipline of how Prime sketches future-cosmology surfacing); the content of each sketch refines at the relevant arc.

### §5.1 — Inferno surfacing sketch

**Cosmology position:** Inferno = methodology / crucible / forge; 9 layers of Prime's infrastructure (per cosmology lock + Reframe 1 / Signal 008 7-position lock).

**Cartographic surfacing (currently inclined):** *infrastructural-procedural-forge-character* expressed as **wine-red dispatch lights popping up through cartography** (per Reframe 2 / Signal 010; THIS IS WHY RED IS PRIME'S ACCENT COLOR). Like utility-manholes in NYC where city plumbing surfaces visually — Prime's infra activity (CI/CD running / agents activating / observability tracing / MCP gateways routing / etc.) signals through red dispatch-light pop-ups at relevant cartographic positions. Density of pop-ups = density of active infra; absence of pop-ups = quiet infra. §6 ratifies the wine-red Inferno marker semantic role + lane-semantic encoding; specific 9-circle mapping to per-marker character refines at future-Inferno-Wave (when Inferno's 9 layers are formally enumerated).

**Forward-arc refinement:** specific 9-circle character per layer (CI/CD circle / security circle / observability circle / etc.) + per-circle marker variants + density-vs-intensity calibration defer to future-Inferno-Wave per cosmology lock per-layer-formalization arc.

### §5.2 — Paradiso surfacing sketch

**Cosmology position:** Paradiso = Prime's articulated unique identity; **= THE BAR** (per Reframe 3 / Signal 011 — the aspirational quality bar Prime aims for); 9 charter spheres per Dante.

**Cartographic surfacing (currently inclined):** *institutional fixture on every cartographic surface = THE BAR's visible presence* (per Reframe 3 / Signal 011 + CD1 thesis Concept 6 + Decision 7 Paradiso seed-mandate fixture). Currently inclined toward *peer-to-allies sovereignty character* — sibling-Paradisos as form-models (Apple "Empathy/Focus/Impute" + Google "Ten Things" + Microsoft "Inclusive Design + Growth Mindset" + Meta "Hacker Way" + Amazon Leadership Principles per CD1 thesis Concept 6). The fixture's typographic register holds across DISpatch's surfaces in V1 (seed-mandate placeholder typography per Mayor-articulated); full 9-sphere articulation at future-Paradiso-arc. Every section of cartography.md must hold the bar (per Reframe 3 / Signal 011); the institutional fixture IS the bar's visible cartographic surfacing.

**Forward-arc refinement:** full 9-sphere charter content authoring + per-sphere fixture-content evolution defer to future-Paradiso-arc (separate from V1 ship per CD1 thesis Concept 6 V1 ship shape — fixture appears at V1 with seed-mandate; content evolves to carry full 9-sphere articulation when authored).

### §5.3 — Eden surfacing sketch

**Cosmology position:** Eden = aspirational reference layer; older-sibling realized exemplars (Claude / Notion / Cursor / OpenAI / Gemini / Omni / etc.); allied-meta layer; identity-respecting (allies don't subsume Prime; Prime doesn't subsume allies per cosmology layer rule #6).

**Cartographic surfacing (currently inclined):** *bridge-character* — neither Prime-bound nor allied-bound; surfaces as **allied-meta indicators within cartographic surfaces** (per §3.2.3). Specific cartographic expression form TBD at Eden-arc — could be: visual references to allied surfaces at cartographic edges (e.g., a small Anthropic-allied indicator at certain cartographic positions where Anthropic infrastructure is referenced); or co-marketing artifact placement (per Brand-Terrace `brand.md` Section 5.2 `publishes-to` Eden allies edge); or tenant-model bridge artifacts (per cosmology layer rule #7 outside allies use native Prime products; Prime products flow out for allied use). Each path preserves identity-respecting layer rule #6 + #7.

**Forward-arc refinement:** specific bridge-character cartographic form + per-allied-AI surface inheritance pattern defer to Eden-arc (when cross-Prime ↔ cross-allied artifact flow patterns mature).

### §5.4 — Purgatorio surfacing sketch (Brand-Terrace LOCKED; remaining 6 Terraces TBD-future-arc)

**Cosmology position:** Purgatorio = cosmology zone containing 7 organizational-axis Terraces (Mayor-named 2026-05-07 per Signal 010): Brand / Roads / Districts / Neighborhoods / Offices / Citizens / Leisure; each = an organizational AXIS of Prime's material reality.

**Cartographic surfacing (currently inclined):** *operational-climb character* expressed through cartographic-axis Terraces (Districts-Terrace primary; Roads-Terrace + Neighborhoods-Terrace cross-cut) + non-cartographic-primary Terraces surfacing as labels / signals / activity-indicators (per §3.2 7-Terraces table). **Brand-Terrace LOCKED v0.2.0** per `brand.md` skill v0.2.1; remaining 6 Terraces TBD-future-arc per per-Terrace-formalization arc (cosmology lock layer rule #11). Each future Terrace formalization establishes its organizational axis + cartographic surfacing pattern + per-Terrace skill (contract-style class anchored to `prime.md` per brand-skill Section 6 precedent).

**Forward-arc refinement:** Roads-Terrace formalization (transit network cartographic axis); Districts-Terrace formalization (borough-scale geographic organization; Editorial District V1-LOCKED at §4); Neighborhoods-Terrace formalization (sub-district zoom); Offices-Terrace formalization (operational units within buildings); Citizens-Terrace formalization (agent codebases); Leisure-Terrace formalization (agent stasis / education / retirement) — each at its own per-Terrace-formalization arc per cosmology lock + Brand-Terrace `brand.md` v0.2.1 lattice template (per `project_brand_v020_canon_genesis_shipped.md`).

### §5.5 — Pillars surfacing sketch (foundational substrate; inherited at construction)

**Cosmology position:** Pillars = foundational commitments; *why Prime exists*; philosophical / immutable / definitional. 5 Pillars: Architecture / Governance / Observability / Autonomy / Evolution-Adaptability. Sit *under* the pipeline per cosmology layer rule #1; every Terrace + district + neighborhood + building + office + citizen inherits Pillar-properties at construction.

**Cartographic surfacing (currently inclined):** *foundational-substrate character* — Pillars are NOT districts; Pillars surface as **inherited properties woven through cartography at construction** (per §3.2.3). Subtle; mostly invisible at default cartographic register. Alternative atmospheric Pillar-encoding overlay (e.g., subtle paper-grain variation per Pillar; subtle contour-ink hue micro-shift per Pillar; subtle wayfinding-typography weight per Pillar) deferred to §7 atmospheric layer Mayor adjudication. The default register holds Pillars as structural-not-visual — readers feel the Pillars' inheritance without seeing them as cartographic features.

**Forward-arc refinement:** per-Pillar formalization arc (Architecture / Governance / Observability / Autonomy / Evolution-Adaptability) is its own future arc per cosmology lock layer rule #1; per-Pillar cartographic atmospheric-overlay decision defers to §7 + per-Pillar-formalization arc.

### §5.6 — Histories surfacing sketch (NEW per Reframe 1; base archive layer)

**Cosmology position:** Histories = Living History of Prime; base archive of tombstoned past per `feedback_documentation_lifecycle.md` four-verb vocabulary (create / append / amend / tombstone). NEW per Reframe 1 / Signal 008 — Mayor-locked 2026-05-07 as 7th cosmology + base archive layer; sits under Pillars (which sit under the pipeline) per cosmology layer rule #13.

**Cartographic surfacing (currently inclined):** *deep-archive-strata character* — Histories is NOT a district; surfaces as **deep-archive layer accessible on-demand from any cartographic surface** (per §3.2.3); NOT primary navigable surface. Article-node `histories-lineage` metadata field (per §3.4 multi-Terrace article-node encoding) points to tombstoned predecessor articles / decisions / iterations the article-node evolved from. Cartographic expression candidate (currently inclined): a "lineage rail" overlay at article surfaces showing predecessor-article links (the way NYT Magazine's archive surface threads back to historical issues); subject to refinement at W5 microsite implementation + future Histories-arc.

**Forward-arc refinement:** specific Histories cartographic surfacing form (lineage-rail overlay vs. dedicated archive-layer toggle vs. metadata-only-accessible-via-search vs. other) + Histories folder population pattern as Prime ships + tombstones artifacts defer to W5 microsite implementation + future Histories-arc.

### §5.7 — Empyrean placeholder (OUT-OF-SCOPE V1)

**Cosmology position:** Empyrean = beyond the climb; Mayor's personal toolkit; fixed observation point; highest heaven per Dante geography. Orthogonal to the pipeline per cosmology layer rule #11; identity-bound to Mayor; declares boundary not contents per `project_prime_cosmological_structure.md` ("boundary declared only; out of scope for v0.2.0").

**Cartographic surfacing:** **OUT-OF-SCOPE for V1** cartography. Boundary noted (Empyrean exists as cosmology position; Mayor's personal toolkit lives external to prime-city repo); cartographic expression NOT rendered V1.

**Forward-arc refinement:** Empyrean cartographic expression decision (whether to render at all; in what form if rendered; at which surfaces; etc.) defers to future-Empyrean-arc — orthogonal-to-pipeline character may mean Empyrean stays unrendered indefinitely as design choice. Mayor adjudicates if/when Empyrean-arc opens.

### §5.8 — Mayor adjudication point for §5

Per dispatch brief Section 5 Mayor adjudication point: confirm future-cosmology-layer sketch pattern + the layer-by-layer sketch direction. Specific surfacing forms + per-layer lockdowns defer per cosmology arc-by-arc rollout.

**One load-bearing decision Mayor adjudicates at §5 ratification:**

1. **Future-cosmology-layer sketch pattern ratification (load-bearing).** Does the per-cosmology-layer sketch pattern (2-4 sentences per layer naming character + register-direction-hypothesis + forward-arc refinement) + the layer-by-layer sketch direction (Inferno = infrastructural-procedural-forge / Paradiso = peer-to-allies sovereignty + INSTITUTIONAL FIXTURE = THE BAR / Eden = bridge-character / Purgatorio = operational-climb via 7 Terraces / Pillars = foundational-substrate inherited at construction / Histories = deep-archive-strata accessible on-demand / Empyrean = OUT-OF-SCOPE V1) ratify at CD3 as the load-bearing pattern that future-arc workshop sessions inherit when refining each layer's cartographic surfacing into ratified form?

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Per-layer sketches honor cosmology-as-conceptual-not-cartographic discipline (per Reframe 2 / Signal 010) — surfacing-signal-pattern, not district-mapping; preserves muted-language for refinable choices per master plan §1.1 + C8; preserves per-Terrace + per-Pillar + per-cosmology arc-by-arc rollout per cosmology lock + don't-subtract + don't-discard; closes Histories cartographic-expression-deferred-to-§5 cross-reference from §3.7 (Histories = deep-archive-strata accessible on-demand). Each sketch is 2-4 sentences per dispatch brief sketch quality bar; not a lockdown. *Cosmology-as-conceptual-correctness + muted-language-preservation + per-cosmology-arc-by-arc-rollout-preservation + sketch-quality-bar-adherence + cross-reference-closure tip toward.*

**Cross-references at §5 ratification:**

- Cosmology lock 7-position amendment + 7 Terraces + folder-tree formalization (Signals 008 + 010 + 011); per-cosmology-arc-by-arc rollout per cosmology lock layer rules #1 + #11 + #13
- §3.2.3 cosmology-surfaces-via-signals table (the per-layer surfacing signal already named; §5 expands into provisional sketches)
- §6 wine-red Inferno markers (ratifies Inferno surfacing sketch §5.1 semantic role at concrete detail)
- §7 atmospheric layer (Pillars atmospheric-overlay decision deferred to §7 — connects to §5.5 Pillars surfacing sketch)
- §9 + §10 (Histories cartographic surfacing form refines at W5 microsite implementation; Stream-F entries surface concept-emergence detection workflow that could elevate concept-iteration outputs across cosmology surfacing patterns)
- CD1 thesis Concept 6 (Paradiso seed-mandate institutional fixture = THE BAR per Reframe 3) + Decision 7 (Paradiso seed-mandate fixture)
- Master plan §1.1 + §6.5 don't-discard + §1.7 reframe 2.3 don't-subtract + RES-009 + RES-008/010/011/012/013
- `feedback_concept_first_examples_prove_muted_language.md` (C7 + C8 muted language) + `feedback_decouple_scope_from_ambition.md` (V1 scope discipline) + `feedback_documentation_lifecycle.md` (four-verb vocabulary underpinning Histories layer)
- `project_brand_v020_canon_genesis_shipped.md` (Brand-Terrace `brand.md` v0.2.1 lattice template for future Terrace skills)

---

## §6 — Wine-red Inferno dispatch markers + lane semantics

The **lane-semantics integration** that makes cartography read as civic-wayfinding-texture, not decorative skin (per dispatch brief Section 6 + master plan §1.7 reframe + §3.A concept #3 page-furniture-as-civic-wayfinding + cosmology layer Inferno per `project_prime_cosmological_structure.md` 7-position lock + Reframes 1+2+3 cumulative).

**Inferno-as-cartographic-surfacing** (per Reframe 2 / Signal 010 + §5.1 Inferno surfacing sketch): Inferno = methodology / crucible / forge; 9 layers of Prime's infrastructure (CI/CD + security audit + containerization + observability + agents + MCP gateways + etc.) — utility infrastructure UNDERNEATH cartography (not damnation; the forge). Cosmology layers SURFACE in cartography through specific signals; **Inferno's signal IS the wine-red dispatch light popping up through cartography**. Like utility-manholes in NYC where city plumbing surfaces visually — Prime's infra activity signals through red dispatch-light pop-ups at relevant cartographic positions. **THIS IS WHY RED IS PRIME'S ACCENT COLOR** (Mayor 2026-05-07 reveal per Signal 010).

### §6.1 — Universal concept

*Institutional dispatch-signage as civic-wayfinding* — dispatch markers function as a city's institutional signage system, signaling activity (something is happening here / pay attention to this position) without breaking the underlying cartographic register. Dispatch markers are NOT decorative dots; they're the cartographic-substrate expression of "infrastructure is alive at this position right now."

**Examples that prove the concept at world-class scale:**

- **NYC subway service-change signage** — yellow signage placed at station positions where service changes; civic-institutional register; signals "active modification at this station" without breaking subway-map cartographic register
- **Municipal road-closure dispatch markers** — orange diamond markers on civic maps signaling active road work; institutional-signage register; persist across map updates as long as work is active
- **The Atlantic Pentagram vertical information band** — aligned with the A monogram; civic-navigation rail equivalent of city directory listing; institutional-signage register integrated with publication identity (per CD1 thesis Concept 6 + reference-archive §1 Concept 3)
- **The Baffler Pentagram per-section typography as wayfinding** — typography signals content type before reading; institutional-signage register at typographic level (per CD1 thesis Concept 5 + reference-archive §1 Concept 5)

The concept-first framing per master plan §1.1 + C7 discipline: Prime's wine-red Inferno dispatch markers extract the universal concept (institutional dispatch-signage as civic-wayfinding) from world-class precedents and express it in Prime's register (DISpatch's editorial-civic-warm character per §4.3 + the cosmology-surfaces-via-signals discipline per Reframe 2 / Signal 010).

### §6.2 — Wine-red dispatch marker rules

**Semantic role (load-bearing; ratifies at CD3):**

- **Wine-red** = Inferno layer signal — the cartographic visible-surface where Inferno's infrastructure activity becomes visible to readers / agents (per §5.1 Inferno surfacing sketch + §3.2.3 cosmology-surfaces-via-signals table)
- **Pop-up character** — markers POP UP through the cartographic substrate (not painted-on; not decorative); like utility-manholes where infra surfaces visually; pop-up is dynamic per Inferno activity (active = pop-up visible; quiet = pop-up absent or muted)
- **Persist across districts** — the same wine-red dispatch marker semantic role applies whether the cartographic surface is showing Editorial District (V1 LOCKED at §4) or future Civic / Art / etc. Districts. An Inferno dispatch marker in Editorial District reads identical-in-semantic-meaning to the same marker in a future-Civic-District; the marker IS the Inferno surfacing signal regardless of which district renders around it
- **Cross-cuts cartographic-axis Terraces** — wine-red dispatch markers cross-cut Districts-Terrace + Neighborhoods-Terrace (and Roads-Terrace) cartographic axes; the dispatch-marker lane is itself a cross-cutting cartographic channel per §4.5 + §3.2.4 district character

**Pigment (CD2 ratifies actual OKLCH value; CD3 ratifies token-stub interface):**

- Token-stub: `var(--cosmology-inferno-mark, oklch(0.45 0.18 22))` with explicit fallback per master plan §4 W1 token-stub example
- CD2 ratifies actual wine-red OKLCH value via APCA contrast validation per pairing per master plan §6.5 7-dim framework + §6.6 verification ladder Row 1 token contract
- When CD2 ratifies, CD3 retests against actual values per §4 W1 token-stub example + `feedback_read_diffs_dont_trust_reports.md` (read CD2 actual diff via `git show`, not assumed alignment)

**Cross-references** to §3.A concept #3 page-furniture-as-civic-wayfinding + §1.7 reframe + reference-archive §1 Concept 3 examples.

### §6.3 — Lane-semantic encoding pattern: cosmology-symmetry framing per CD2 Decision 5 (cartographic lanes ↔ CSS column assignments)

Per CD1 thesis Concept 2 grid-as-architectural-document + master plan §3.A concept #2 + §4 W1 CD2 row lane pigments + **CD2 Decision 5 cosmology-symmetry framing** (RATIFIED 2026-05-07 per Signal 012; per `representation/visual-system/color.md` Decision 5): cartographic lanes are the cartographic-substrate expression of three cosmology directional vectors meeting at Purgatorio's surface (where the city is printed). **Lanes are LOGICAL/SEMANTIC channels — content-categories applying as local accents — NOT visual-spatial bands or page gradients** (per Mayor 2026-05-07 verbatim CD2 check: *"this is not turning page into a gridant right"* — confirmed lanes = LOGICAL/SEMANTIC channels, not VISUAL/SPATIAL bands; canonized per Signal 014).

**Cosmology-symmetry framing (CD2 RATIFIED): three lanes = three cosmology directional vectors expressed as pigments through Purgatorio surface:**

| Lane | Cosmology vector | Pigment family (CD2 RATIFIED) | Token references | Cartographic surfacing role |
| --- | --- | --- | --- | --- |
| **Lane 1 Editorial** | **Surface** — the city itself; the substrate paper is printed on | Warm-earth (terracotta family) | `--lane-editorial-{step}` (DISpatch-locked tier) | Where editorial content (article bodies / missives / reading-sanctuary surfaces) lives in cartography per CD1 Concept 4 atmospheric paper substrate |
| **Lane 2 Institutional** | **Above** — Paradiso-charter descending through Purgatorio surface = **THE BAR descending** | Cool-mineral (graphite-blue family) | `--lane-institutional-{step}` (DISpatch-locked tier) | Where institutional content (masthead, Paradiso seed-mandate fixture, civic-architectural backbone) renders in cartography per CD1 Concept 6 + Reframe 3 / Signal 011 Paradiso = THE BAR |
| **Lane 3 Dispatch** | **Below** — Inferno-infra surfacing through Purgatorio surface | Dispatch-red (inherits `--accent-prime` Prime-platform-wide tier) | `--lane-dispatch-{step}` (DISpatch-locked tier alias of `{platform.accent-prime}`) + `--asset-cartography-pulse` (asset-locked tier; cartography wine-red infra-pulse markers per CD2 §5.2 stub interface) | Where Inferno-infra activity surfaces in cartography per §6 wine-red Inferno markers + cosmology-surfaces-via-signals per Reframe 2 / Signal 010 |

**Cosmology coherence** (per CD2 Decision 5 + Decision 7 + Signals 012 + 014): the three lane pigments are the visible expression of three cosmology vectors meeting at Purgatorio's surface. Vellum atmospheric chrome is *what the city is printed on*; lane pigments are the *three forces shaping it*. Concept-citations are structurally inevitable, not register-aesthetic. **Wordmark + Lane 3 dispatch + cartography pulse all express ONE Inferno-infra-surfacing vector at three different surface scales** (masthead / lane indicators / map markers per CD2 Decision 7 split-color cosmology-encoded composition).

**Pattern properties:**

- **Logical/semantic NOT visual-spatial** — lanes apply as local accents, NOT page gradients (per Mayor 2026-05-07 verbatim CD2 check; canonized per Signal 014 for forward CD3 + future cartography work)
- **Mapping is 1:1 by cosmology vector** — cartographic lanes ↔ grid lanes (per §3.A concept #2 grid-as-architectural-document) is 1:1 by cosmology directional vector; cartography expresses the vector at its surface; grid expresses it typographically + structurally; CD4 ratifies CSS column assignments
- **Per-district lane-pigment variation** — pigments hold the bar across districts (per Reframe 3 / Signal 011 Paradiso-as-bar discipline) but per-district atmospheric texture variation (per §3.2.4 + §4.6 + §7) may shift pigment register subtly per district character (e.g., Editorial District editorial-civic-warm per §4.3 vs. future Civic District institutional-grey-cool); core pigment cosmology-vector role stays constant; per-district refinement is character-shift, not semantic-shift
- **Persistence across districts** (per §6.2 wine-red dispatch marker rule) — Lane 3 dispatch-marker semantic role holds across districts; readers register Inferno activity consistently regardless of which district renders around the marker

### §6.4 — Cross-stream dependency

**CD3 + CD2 + CD4 reconciliation pattern:**

- **CD2** ratifies actual wine-red OKLCH value + actual lane pigment OKLCH values (terracotta / graphite-blue / dispatch-red) + APCA contrast validation per pairing per master plan §6.5 7-dim framework
- **CD3** (this section) ratifies semantic role + lane-semantic encoding pattern + token-stub interface (`var(--cosmology-inferno-mark, ...)`); persists across districts; cross-cuts cartographic-axis Terraces
- **CD4** ratifies CSS column assignments + lane-pigment-to-component mapping per §3.A concept #2 grid-as-architectural-document; reads CD3 lane-semantic encoding pattern + CD2 token values; binds CSS columns to lane pigments per component spec.md
- **§8** ratifies cartographic-grid ↔ site-grid coordinate-handoff API (closes §2 conditional ratification gap #1; most load-bearing); §6.3 lane-semantic encoding pattern is CD3-side input to §8 API spec
- **CD6** brand synthesis recombines CD2 + CD3 + CD4 outputs into shippable identity; Apple-cohesion-test gate verifies wine-red Inferno markers + lane semantics hold the bar across surfaces per CD1 thesis §5

**Read-diff discipline at CD2 ratification:** when CD2 lands actual OKLCH values for wine-red dispatch-red + lane pigments, CD3 retests token-stub bindings against actual values via `git show` (per `feedback_read_diffs_dont_trust_reports.md`), not via assumed alignment. Drift surfaces as `cc-ledger/cross-surface-signals.md` DISCOVERY-class entry; chisel applies if material gap.

### §6.5 — Mayor adjudication points for §6

Per dispatch brief Section 6 Mayor adjudication point: confirm wine-red Inferno dispatch marker semantic role + lane-semantic encoding pattern. Specific OKLCH values defer to CD2.

**Two load-bearing decisions Mayor adjudicates at §6 ratification:**

1. **Wine-red Inferno dispatch marker semantic role + persistence rules ratification (load-bearing).** Does the wine-red dispatch marker semantic role (wine-red = Inferno layer signal; pop-up character; persist across districts; cross-cuts cartographic-axis Terraces) ratify at CD3 as the load-bearing semantic role that downstream CD2 (OKLCH value) + CD4 (component spec.md) + future-Inferno-Wave (9-circle character per layer) build against? Specific OKLCH value + per-circle marker variants defer.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Wine-red Inferno marker semantic role inherits from Reframe 2 / Signal 010 cosmology-surfaces-via-signals discipline (Inferno = utility-infrastructure pop-up; THIS IS WHY RED IS PRIME'S ACCENT COLOR) + §5.1 Inferno surfacing sketch + §3.2.3 cosmology-surfaces-via-signals table; persist-across-districts rule preserves bar-holding-at-edge per Reframe 3 / Signal 011 (Paradiso's bar held across all districts via consistent dispatch-marker semantic); cross-cuts-cartographic-axis-Terraces rule preserves multi-axis Terrace organization per Signal 010. *Cosmology-surfaces-via-signals-correctness + bar-holding-across-districts + multi-axis-Terrace-correctness + universal-concept-grounding (institutional dispatch-signage as civic-wayfinding) tip toward.*

2. **Lane-semantic encoding pattern ratification (load-bearing; closes §2 conditional ratification gap #1 partial — coordinate-handoff API CD3-side input).** Does the lane-semantic encoding pattern (cartographic lanes ↔ CSS column assignments 1:1 by semantic role; civic-axis / reading-corridor / dispatch-marker lane categories; per-district atmospheric texture variation as character-shift not semantic-shift; persistence across districts) ratify at CD3 as the load-bearing pattern that CD4 component grid + §8 coordinate-handoff API build against? Specific lane assignments + CSS columns + OKLCH values defer.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Lane-semantic encoding pattern inherits CD1 thesis Concept 2 (grid-as-architectural-document) + master plan §3.A concept #2 + §4 W1 CD2 row lane pigments; preserves mapping-1:1-by-semantic-role discipline (cartography spatial expression ↔ grid typographic+structural expression); persistence-across-districts rule preserves bar across cartographic surfaces per Reframe 3; per-district atmospheric texture variation as character-shift-not-semantic-shift preserves bar-holding while allowing per-district character (per §3.2.4 + §4.3 + §4.6); CD3-side input to §8 coordinate-handoff API. *Concept 2 grid-as-architectural-document + bar-holding-across-districts + character-shift-not-semantic-shift + cross-stream-coord-clarity (CD2 + CD4 + §8) tip toward.*

**Cross-references at §6 ratification:**

- §3.2.3 cosmology-surfaces-via-signals table (Inferno → red dispatch lights)
- §4.5 Editorial District lane semantics (3-row table: civic-axis / reading-corridor / dispatch-marker; references §6.3 lane-semantic encoding pattern)
- §5.1 Inferno surfacing sketch (cosmology-position character — infrastructural-procedural-forge — surfaces as wine-red dispatch lights)
- §8 lane semantics (cartography-grid ↔ site-grid coordinate-handoff API; §6.3 encoding pattern is CD3-side input to §8 API spec)
- CD1 thesis Concept 2 (grid-as-architectural-document) + Concept 3 (page-furniture-as-civic-wayfinding) + reference-archive §1 Concept 3 examples (NYT Magazine page furniture / The Atlantic vertical information band / The Baffler per-section typography)
- Master plan §1.1 register lock + §1.7 reframe + §3.A concept #2 + §3.A concept #3 + §4 W1 CD2 row lane pigments + §6.5 7-dim framework + §6.6 verification ladder Row 1 token contract
- `feedback_read_diffs_dont_trust_reports.md` (read CD2 actual diff at ratification; not assumed alignment) + `feedback_per_building_brand_certification_gate.md` (lane-semantic encoding holds across districts; per-district variation as character-shift not semantic-shift)

---

## §7 — Atmospheric layer (full visual substrate per RES-009 reframe)

The **atmospheric texture layer** that makes cartography read as *physical substrate the publication is printed on* per §3.A concept #4 *surface texture as atmosphere, not spectacle* + CD1 thesis Concept 4 atmosphere-as-physical-substrate + RES-009 reframe (CD3 owns full visual substrate; per-domain folds to CD2 / CD4 / CD5).

§7 also closes **§2 conditional ratification gap #3 first half** — dial-calibration agent-implementation policy (when does an agent set zoom-level X and dial-position Y per surface / per article context). Second half of gap #3 (cross-stream coordination of dial-calibration across CD3 → CD4 → CD5 → W5) closes at §10.

§7 also addresses the **Pillars atmospheric-overlay decision** deferred from §3.7 + §5.5 — does Pillars get a subtle atmospheric encoding overlay at the cartographic atmospheric layer, or do Pillars stay structural-not-visual at default register?

### §7.1 — Universal concept

*Atmosphere as physical substrate, not effect layer* — atmosphere is the substrate the publication is printed on; it carries warmth and weight without calling attention to itself; it reads as native-to-the-publication, not as add-on visual effect.

**Examples that prove the concept at world-class scale** (per CD1 thesis Concept 4 + reference-archive §1 Concept 4):

- **The Paris Review Pentagram-Willey** — recycled-paper warmth ("physically softer and visually yellower" stock; web analog: warm off-white backgrounds, paper-grain textures); Issue No. 56 (1973) neo-vintage minimalist precedent; Klim Founders Grotesk + Heldane Text typography
- **INQUE Magazine (Matt Willey + Dan Crowe)** — typewriter body + graphic bold headline; "light and dark as page design"; Eastern European Modernist aesthetic
- **The Baffler Pentagram** — open space + visuals breathe; "design that helps organize the journal's creative anarchy"
- **NYT The Upshot data-cartography** — D3.js contour at editorial scale; data-overlay-as-atmosphere not data-overlay-as-spectacle
- **Pudding editorial cartography** — D3 + P5 atmosphere at per-article-as-designed-object scale (per CD1 thesis Concept 7 walking metaphor)
- **Stamen design** — contour-ink at editorial cartographic scale; founding Mapbox alums' editorial register

The concept-first framing per master plan §1.1 + C7 + RES-009: Prime's atmospheric layer extracts the universal concept (atmosphere-as-physical-substrate at editorial scale) from world-class precedents and expresses it in Prime's register (DISpatch's editorial-civic-warm character per §4.3 + §6.3 lane-semantic encoding pattern + the wine-register family per §6 wine-red Inferno markers metaphorical specification). Spectacle registers (WebGL dark-fields / glow effects / glassmorphism / luminance-inverted) are valid registers for different surfaces per master plan §1.3 5-narrow-certification gates; this microsite chooses atmosphere-as-substrate.

### §7.2 — Full visual substrate scope (per RES-009 reframe)

Per master plan §12 RES-009 (Mayor 2026-05-07): atmosphere.md retired from §3.A canonical 8-file enumeration; **CD3 owns full visual substrate** — paper grain via P5.js + contour-ink via D3.js + textures + grids + backgrounds + dispatch markers. §7 ratifies the substrate scope at concept-level + cross-domain folds to CD2 / CD4 / CD5.

**Substrate scope (CD3 owns; ratified at §7):**

| Layer | What CD3 owns | Cross-domain fold per RES-009 |
| --- | --- | --- |
| **Paper grain** | P5.js procedural texture (per §2.4 Layer 4 + §4.6 paper grain fine-grain warm-white substrate per Editorial District character) | Substrate static at scroll cadence rule folds to CD5 motion.md; texture-surface declarations per component fold to CD4 components.md |
| **Contour-ink** | D3.js contour overlays (per §2.4 Layer 4 + §4.6 editorial-warm contour-ink hue per Editorial District character) | Per-district hue values fold to CD2 color.md; texture-surface declarations fold to CD4 components.md |
| **Textures** | All cartographic textures (paper grain + contour-ink + per-Pillar-overlay-if-ratified per §7.5 + atmospheric chrome per §7.4) | Texture-surface declarations on components fold to CD4 components.md |
| **Grids** | Cartographic grid (Layer 1 procgen base per §2.1 + unified grid per §2.6 + lane-semantic encoding per §6.3 + grid-dances-around-components per Signal 009) | Site-grid (CSS column assignments) folds to CD4 components.md per §3.A concept #2 grid-as-architectural-document |
| **Backgrounds** | Cartographic backgrounds at all dial positions (per §2.6 dial calibration table; background atmospheric texture + warm-white substrate hold across dial range) | Color-background-token semantics fold to CD2 color.md per RES-009 |
| **Dispatch markers** | Wine-red Inferno dispatch markers (per §6 semantic role + lane-semantic encoding) | OKLCH values fold to CD2 color.md; component spec.md per dispatch-marker fold to CD4 components.md |

**Register-cohesion content fold** (per RES-009): atmospheric metaphor language (atmosphere-as-substrate per CD1 thesis Concept 4) folds to CD1 thesis.md (already RATIFIED 2026-05-08; verbatim citation source for §7.1 + §7.3-§7.5).

### §7.3 — Paper grain texture (P5.js procedural; details)

Per §2.4 Layer 4 + §4.6 atmospheric texture + Editorial District character per §4.3:

**Paper grain candidates (currently inclined; Mayor adjudication for direction at §7.7; specific candidates ratify at CD2 + W2 token pipeline + W5 microsite implementation):**

- **Currently inclined direction:** *fine-grain procedural texture* — warm-white substrate with subtle grain density that reads tactile not noisy. Inherits The Paris Review Pentagram-Willey recycled-paper tactile-warmth precedent (per CD1 thesis Concept 4 + reference-archive §1 Concept 4)
- **Alternative directions** (per don't-discard discipline; future-Building flexibility per master plan §1.3):
  - *Coarse-grain* — heavier tactile signal; future-Building register choice (e.g., a future Prime print-zine-style Building might select coarse-grain)
  - *Aged-paper* — warmer tone shift; future-Building register choice (e.g., archive-register Building)
  - *Rag-paper* — irregular fiber pattern; future-Building register choice (e.g., literary-canon register Building)

**Per-district atmospheric variation** (per §3.2.4 + §4.6 + §6.3 character-shift-not-semantic-shift discipline): paper grain density / hue / fiber pattern can vary subtly per district to express per-district character; the atmospheric-as-substrate semantic role holds across districts; per-district refinement is character-shift, not semantic-shift. Editorial District = medium-density fine-grain warm-white per §4.3; future Civic District = potentially institutional-grey-cool variant; future Art District = potentially warmer-saturated creative-pop variant; per-district lockdowns defer to per-district workshop sessions.

**Cross-references** to CD1 thesis Concept 4 + reference-archive §1 Concept 4 + §2.4 P5.js per-tool 7-dim framework + §4.6 Editorial District atmospheric texture.

### §7.4 — Contour-ink hue shifts (D3.js; details)

Per §2.4 Layer 4 + §4.6 atmospheric texture + Editorial District character per §4.3:

**Contour-ink hue-shift discipline:**

- **Hue-shift per district** — D3.js generates terrain-as-data SVG contour overlays; hue shifts referenced FROM CD2 (CD2 ratifies hue palette; CD3 ratifies semantic role contour-ink plays + hue-shift pattern per district per §3.2.4 + §4.6)
- **Editorial District hue (currently inclined):** editorial-warm — warm yellow shift of incandescent-room-light-printed-on-warm-paper per CD1 thesis §3 atmospheric register; token `window-warm` currently inclined; CD2 ratifies actual OKLCH
- **Token-stub interface:** `var(--cartography-contour-editorial, oklch(0.55 0.04 50))` with explicit fallback per master plan §4 W1 token-stub example
- **Per-future-district hue shifts** (forward-arc refinement per §3.2.4 + §5.4 future-Terrace formalization arc):
  - Future Civic District contour-ink: cooler institutional-grey hue (currently inclined; subject to refinement at future-Civic-District workshop)
  - Future Art District contour-ink: warmer-saturated creative-pop hue (currently inclined; subject to refinement at future-Art-District workshop)
  - Inferno-active surfaces: contour-ink stays per-district default; wine-red dispatch markers POP UP through contour layer (per §6.2 pop-up character; markers are NOT contour-ink hue shifts)

**Cross-references** to NYT The Upshot D3 contour-cartography precedent + Pudding editorial cartography + Stamen design (per §7.1 examples) + §4.6 Editorial District contour-ink hue + §2.4 D3.js per-tool 7-dim framework.

### §7.5 — Atmospheric chrome anchors

Per CD1 thesis §3 + Concept 4 + reference-archive §1 Concept 4: atmospheric chrome anchor concepts (currently inclined; spatial-perceptual vocabulary; tokens ratify in CD2 per RES-009 fold):

| Concept | Spatial-perceptual reference | Token name (currently inclined) | CD2 ratifies |
| --- | --- | --- | --- |
| *Upper-stratum* | Warmest, lightest — printed paper held to natural light | `sky-high` | OKLCH value + APCA contrast per pairing |
| *Mid-stratum* | Warm-white in ambient room lighting | `sky-low` | OKLCH value + APCA contrast |
| *Atmospheric reflectivity* | Subtle warm-tone wash; printed-paper substrate's micro-reflection of incident light | `reflect` | OKLCH value + APCA contrast |
| *Editorial warmth* | Warm yellow shift of incandescent room light printed on warm paper | `window-warm` | OKLCH value + APCA contrast |

**Atmospheric chrome anchors fold to CD2 color.md per RES-009.** CD3 §7.5 references the folded landings; CD3 does NOT re-own. Token semantic-intent metadata (per master plan §4 W1 CD2 row) preserves the spatial-perceptual vocabulary at token level.

### §7.6 — Dial-calibration implementation tiers + Layer 3 runtime event-routing (closes §2 conditional ratification gap #3 first half)

Per §2 conditional ratification gap #3 (dial-calibration implementation policy: at which binding tier does which mechanism set zoom-level X and dial-position Y per surface / per article context + how does Inferno activity couple to marker pop-up dynamic): §7.6 ratifies the policy. Second half of gap #3 (cross-stream coordination across CD3 → CD4 → CD5 → W4 → W5) closes at §10.

**Dial-calibration implementation policy (CD3 ratifies):**

The dial principle (per CD1 thesis §4.4 Decision 9 + §2.6 unified-grid + Signal 009 reframe) is the operating mechanism cartography uses to scale between *more* and *less* present per surface / per page / per article. The dial is NOT a runtime knob users adjust; it's a **design-time + content-time calibration** that binds at three distinct implementation tiers — none of which require an LLM agent at runtime. **No LLM agent serves dial-calibration runtime coupling** per Mayor 2026-05-08 W1 CD3 Cycle 2 adjudication (per Signal 013 in `cc-ledger/cross-surface-signals.md`); LLM agents reason — dial-calibration is build-time spec authoring + content-time config validation + runtime event-routing. Mayor's value canonized: *Prime's first runtime agent should NOT be a cron-like single-task trigger loop.*

**3-layer policy:**

1. **Layer 1 — Default per-surface (CD3 ratifies; binds at CD4 component spec.md authoring; build-time mechanism — Claude Code as build-time agent authoring spec.md files; NO RUNTIME LLM):**
   - DISpatch homepage = LOW-MID dial baseline (per §2.6 calibration table)
   - DISpatch article = MID dial steady-state baseline (per §2.6 + V1 STEADY-STATE BASELINE)
   - Forward-pointed neighbor districts = LOW dial (per §4.7 forward-pointed-neighbor-buildings render discipline)
   - Future surfaces (Prime homepage / district hub homepages) = TBD per per-surface workshop sessions
2. **Layer 2 — Per-article-context override (W5 ratifies; binds at content-pipeline ingestion via Astro Content Layer + Zod schema per master plan §3.B + §3.C; content-time mechanism — schema validation at build time + config-read at request time; NO RUNTIME LLM):**
   - Article frontmatter / metadata field can override default per-article (e.g., dense article = LOW dial; light article = HIGH dial; per CD1 thesis §4.4 Decision 9 *"if a section feels too complex, simplify it to make it feel more complex"* iteration finding balance)
   - Override syntax + schema field defer to W5 microsite implementation (Astro Content Layer + Zod discriminated union per master plan §3.C)
3. **Layer 3 — Inferno activity coupling (per §6 wine-red Inferno markers; runtime event-routing mechanism — workflow automation platform per W4 cascade per Mayor 2026-05-08 adjudication; NO RUNTIME LLM AGENT):**
   - Inferno active = wine-red dispatch markers POP UP through atmospheric layer at relevant cartographic positions (per §6.2 pop-up character)
   - Inferno quiet = pop-up absent or muted
   - Coupling is dynamic at runtime — does NOT shift dial position itself; influences HIGH-dial expression (markers more visible at HIGH dial; less visible at LOW dial)
   - **Implementation tier (Mayor 2026-05-08 W1 CD3 Cycle 2 adjudication; Signal 013):** workflow automation platform per W4 cascade. Specific platform (n8n / Make / Relay / Gumloop / Zapier) defers to W4 cascade with full §6.5 7-dim framework + research-cited 2026 evidence per Stream-F ledger discipline + master plan §3.A pipeline orchestration tooling list + §3.B Layer 3 Agent Gateway candidates + §1.4.2 composable 3-layer architecture + §4 W4 application services Wave
   - **Option β (cheap TS script) preserved per don't-discard** — if W4 cascade evidence tips toward custom TS over workflow automation platform (e.g., simple event sources + full-control preference + workflow-platform-vendor-risk reads heavy), Option β is the fallback path
   - **Mayor's value canonized (per Signal 013):** Prime's first runtime agent should NOT be a cron-like single-task trigger loop. LLM agents reason — event-routing is workflow-automation territory. Apply across all Prime cartography runtime coupling decisions: pure event-routing → workflow automation; reasoning required → LLM agent (per master plan §1.4.2 composable layer architecture)

**Iteration-finding-balance discipline** (per CD1 thesis §4.4 Decision 9): per-surface default + per-article override are V1 ratified policy; iteration during W5 microsite implementation refines specific dial positions per article + per surface as evidence accumulates. Mayor adjudicates per-surface defaults at W5 ratification gate; per-article overrides ride content velocity per `feedback_decouple_scope_from_ambition.md`.

**Cross-stream coordination** (closes second half of gap #3 at §10):

- **CD3** ratifies 3-tier policy (this §7.6) + per-surface defaults (per §2.6 calibration table) + Layer 3 implementation tier as workflow automation per W4 cascade (per Signal 013)
- **CD4** binds Layer 1 defaults at component spec.md authoring (component renders against ratified default; reads per-article-context override from props); reads Layer 3 marker-state from Layer 3 runtime event-router
- **CD5** ratifies motion register that respects atmosphere-not-animate-at-scroll-speed discipline + per-dial-position motion variation (HIGH dial = more dynamic-living-layer motion; LOW dial = static substrate motion only)
- **W4** ratifies workflow automation platform selection (n8n / Make / Relay / Gumloop / Zapier per §6.5 7-dim framework + Stream-F ledger discipline) for Layer 3 Inferno activity coupling per Mayor 2026-05-08 adjudication; specific platform binds Layer 3 implementation
- **W5** ratifies per-article-context override schema (Astro Content Layer + Zod) + content-pipeline ingestion implementation; reads ratified Layer 3 platform's event-router + binds cartography state-update via the platform's webhook/API
- **§10** consolidates cross-stream coordination + closes gap #3 second half

### §7.7 — Pillars atmospheric-overlay decision (Mayor adjudication)

Per §3.7 + §5.5 deferred-to-§7: does Pillars get a subtle atmospheric encoding overlay at the cartographic atmospheric layer, or do Pillars stay structural-not-visual at default register? Pillars (Architecture / Governance / Observability / Autonomy / Evolution-Adaptability) sit *under* the pipeline per cosmology layer rule #1; every Terrace + district + neighborhood + building + office + citizen inherits Pillar-properties at construction.

**Three options for Mayor adjudication (5-dim framework per §6.5 + Signal 006 7-dim):**

| Dimension | Option A (no overlay; default register) | Option B (subtle per-Pillar atmospheric variation) | Option C (per-Pillar dedicated-overlay-toggle) |
| --- | --- | --- | --- |
| **Monetary cost** | $0 — no additional tooling | $0 — uses existing P5 + D3 atmospheric layer | $0 — uses existing tooling |
| **Complexity / failure points** | LOW — no Pillar-specific atmospheric logic | MEDIUM — per-Pillar variation requires 5-Pillar atmospheric variant authoring + per-surface variant selection | HIGH — toggle UI + per-Pillar overlay rendering + per-surface state management |
| **Load heaviness** | LOW — no overhead | MEDIUM — per-Pillar atmospheric authoring at CD2 + CD3 + W5 | HIGH — toggle UX design + per-Pillar overlay rendering + state-management infra |
| **Use case** | NYC borough character — boroughs inherit civic identity at construction WITHOUT visual overlay; civic identity is structural not decorative | Pentagram per-section typography variation — different sections get subtly different atmospheric register; same publication identity holds | Layered-information-toggle UX (e.g., NYT Upshot data-overlay toggle) — readers can opt-in to deeper visualization; default register stays clean |
| **Capability ceiling** | Pillars surface as inherited properties NOT visual signals; bar-holding via institutional fixture (Paradiso) only | Pillars surface as inherited properties + subtle visual signals; readers can sense Pillar inheritance through atmospheric variation | Pillars surface as opt-in deep-visualization layer; readers who want to engage see; readers who don't aren't pulled out |
| **Capability floor** | Doesn't close future per-Pillar overlay adoption (could add at later Wave) | Doesn't close future no-overlay reversion | Doesn't close future no-overlay or subtle-variation reversion |
| **Risks** | Pillars structurally invisible at cartographic surface — does this preserve the bar adequately? Readers may not register Pillar inheritance without atmospheric signal | Atmospheric variation could dilute Editorial District's editorial-civic-warm character if per-Pillar variants conflict; per-district + per-Pillar combinatoric grows | Toggle UX could break grid-dances-around-components discipline (Signal 009) if toggle UI competes with components for cartographic space; high implementation load for V1 |

*CC recommendation:* Option **A (no overlay; default register)** for V1. Reasoning: Pillars-as-inherited-properties at construction is the cosmology layer rule #1 framing; bar-holding via institutional fixture (Paradiso per Reframe 3) is the V1 cartographic surfacing for foundational substrate; subtle Pillar atmospheric variation (Option B) introduces combinatoric complexity (5 Pillars × N Districts × atmospheric variation) without clear V1 ROI; per-Pillar dedicated overlay (Option C) is over-engineering for V1 + breaks grid-dances-around-components per Signal 009. Future-Pillar-formalization arc may revisit per-Pillar atmospheric overlay if per-Pillar formalization surfaces a use case warranting visual-signal expression. *Concept-first framing (Pillars as inherited properties) + bar-holding-via-institutional-fixture-already-sufficient + V1-scope-discipline + grid-dances-around-components-preservation tip toward Option A; preserves Options B + C + D per don't-discard for future arcs.*

**Option D — Monuments as visual allegory** (preserved per don't-discard per Mayor 2026-05-08 W1 CD3 Cycle 2 directive *"don't lock pillars in a box"*; Signal 015 in `cc-ledger/cross-surface-signals.md`):

Universal concept: *monumental landmarks as cartographic-allegorical anchors* — distributed monumental cartographic assets (bridges / historic buildings / parks / statues / etc.) that visually anchor a city's identity without literal-mapping each monument to a specific civic concept. The city is monumented; readers feel the weight of foundational concepts through the monumented presence; literal-mapping is rejected.

**Examples that prove the concept at world-class scale (per Mayor's NYC reference set):** Statue of Liberty / 9/11 Memorial / Central Park monuments (Strawberry Fields, Alice in Wonderland, King Jagiełło) / Charging Bull / General Grant National Memorial / Federal Hall / African Burial Ground National Monument / Empire State Building / Brooklyn Bridge / The Oculus / Castle Clinton National Monument / Hamilton Grange National Memorial. These don't literally map to civic concepts (no one says "Brooklyn Bridge represents the Constitution"); they're monumented landmarks that visually anchor NYC's identity as a city of historical depth + civic weight.

**Prime's expression (forward-arc):** 5 (or other count) monumental cartographic assets distributed across Prime's cartography that token the existence of 5 Pillars (Architecture / Governance / Observability / Autonomy / Evolution-Adaptability) without literal-mapping. Could be: bridges, historic buildings, parks, statues, or other monumental forms. Each monumental asset has its own design-character; together they monument Prime's foundational depth.

**V1 status:** OUT-OF-SCOPE for V1 per Mayor 2026-05-08 directive (no bandwidth/time to design monumental assets). Forward-arc consideration for **future DISpatch update build OR future Pillar-formalization arc OR Prime platform-level expression**. Preserved per don't-discard so Pillars aren't locked in Option A box.

**Mayor's anti-pattern explicit (canonized per Signal 015):** NO *"this is the Governance Pillar — look yonder and despair"* literal-mapping. Monuments token the EXISTENCE of foundational Pillars; they don't literal-map. Apply across all future cosmology-cartographic surfacing decisions: tokens-of-existence ≠ literal-mapping; visual allegory ≠ legend.

| Dimension | Option D — Monuments as visual allegory (forward-arc; Mayor 2026-05-08 directive) |
| --- | --- |
| **Monetary cost** | Significant — design + production of 5 monumental cartographic assets (per-asset design + per-asset production); deferred to future-arc Building when bandwidth + budget exist |
| **Complexity / failure points** | HIGH — per-asset design discipline + cartographic placement + render integration; combinatoric per-asset character preservation across districts |
| **Load heaviness** | HIGH (forward-arc) — full design pass per asset; cartographic integration; CD4 component spec.md per asset |
| **Use case** | NYC monumental landscape (per Mayor's reference set) — landmarks anchor city identity without literal civic-concept mapping; the city is monumented; readers feel foundational depth without legend-reading |
| **Capability ceiling** | HIGHEST for cartographic-allegorical Pillar surfacing — visual allegory at full design pass; manifests at Prime platform-level expression |
| **Capability floor** | Doesn't close future revisitation; Option A continues as V1 default (Option D is forward-arc additive, not exclusive) |
| **Risks** | V1 bandwidth — Mayor explicit: no V1 design capacity; literal-mapping risk if anti-pattern not preserved; combinatoric design load grows with future-Building expansion |

**Option D + Option A coexistence:** V1 ratifies Option A (no overlay; default register; Pillars as inherited properties + Paradiso bar). Option D preserved as forward-arc additive — when future DISpatch update build OR future Pillar-formalization arc OR Prime platform-level expression opens, Mayor adjudicates Option D activation per future-arc dispatch with full §6.5 7-dim framework + research-cited evidence. Options B + C also preserved per don't-discard.

### §7.8 — Mayor adjudication points for §7

Three load-bearing decisions Mayor adjudicates at §7 ratification:

1. **Atmospheric texture direction ratification (load-bearing).** Does the atmospheric texture direction (P5.js paper grain fine-grain warm-white + D3.js contour-ink editorial-warm + atmospheric chrome anchors `sky-high` / `sky-low` / `reflect` / `window-warm`) ratify at CD3 as the load-bearing direction that CD2 (token values) + CD4 (texture-surface declarations) + CD5 (motion-coupling rule) + W5 (microsite implementation) build against? Specific candidates + OKLCH values + per-component texture surface defer.

   *CC recommendation (Reframes 1+2+3 cumulative):* RATIFY. Atmospheric texture direction inherits CD1 thesis Concept 4 + reference-archive §1 Concept 4 (Paris Review Pentagram-Willey + INQUE + Baffler precedents); RES-009 fold pattern preserves CD2 + CD4 + CD5 ownership of folded landings; per-district atmospheric variation as character-shift-not-semantic-shift preserves bar across districts per Reframe 3. *Atmosphere-as-substrate + RES-009-folds + per-district-character-shift-discipline + bar-holding-across-districts tip toward.*

2. **Dial-calibration implementation policy ratification (load-bearing; closes §2 conditional ratification gap #3 first half; per Mayor 2026-05-08 W1 CD3 Cycle 2 adjudication via Signal 013).** Does the 3-tier policy (Layer 1 build-time default per-surface + Layer 2 content-time per-article-context override + Layer 3 runtime event-routing via workflow automation per W4 cascade) ratify at CD3 as the load-bearing policy that CD4 component spec.md + CD5 motion register + W4 workflow automation platform selection + W5 microsite implementation build against? Specific workflow automation platform selection + per-article-context override schema + per-surface defaults at future surfaces + iteration-finding-balance per article defer.

   *CC recommendation (Reframes 1+2+3 cumulative + Signal 013):* RATIFY. 3-tier policy inherits CD1 thesis §4.4 Decision 9 dial principle + §2.6 unified-grid + Signal 009 zoom-level discipline; Layer 1 default-per-surface preserves §2.6 calibration table; Layer 2 per-article-context override preserves iteration-finding-balance per CD1 Decision 9 *"if a section feels too complex..."*; Layer 3 runtime event-routing via workflow automation per W4 cascade preserves wine-red Inferno marker pop-up character per §6.2 + Mayor's value (Prime's first runtime agent ≠ cron-like single-task trigger loop) per Signal 013; cross-stream coord clarity (CD3 → CD4 → CD5 → W4 → W5) closes gap #3 first half + sets up §10 second half closure. *Dial-principle-correctness + iteration-finding-balance-preservation + Inferno-coupling-preservation + Mayor-value-canonized + cross-stream-coord-clarity tip toward.* Option β (cheap TS script) preserved per don't-discard if W4 cascade evidence tips toward TS-over-platform; Option γ (defer Layer 3 to V1.5+) rejected per §7.6 reasoning.

3. **Pillars atmospheric-overlay + monuments-as-cartographic-allegory decision (load-bearing; Option A for V1 + Option D preserved per Mayor 2026-05-08 directive).** Does Option A (no overlay; default register; Pillars surface as inherited properties only; bar-holding via institutional fixture per Reframe 3 / Signal 011) ratify at CD3 as the V1 Pillars cartographic surfacing decision, **WITH Option D (monuments as visual allegory; 5 monumental cartographic assets tokening existence of 5 Pillars without literal-mapping per Mayor 2026-05-08 directive + Signal 015) preserved per don't-discard for future DISpatch update build / future Pillar-formalization arc / Prime platform-level expression**? Options B (subtle per-Pillar atmospheric variation) + C (per-Pillar dedicated-overlay-toggle) also preserved per don't-discard for future-arc adjudication.

   *CC recommendation (Reframes 1+2+3 cumulative + Signal 015):* RATIFY Option A FOR V1 + Option D PRESERVED for forward-arc activation. Reasoning per §7.7: Pillars-as-inherited-properties at construction (cosmology layer rule #1) + bar-holding-via-institutional-fixture (Reframe 3 / Signal 011) + V1-scope-discipline (per `feedback_decouple_scope_from_ambition.md` + Mayor 2026-05-08 directive *"I don't think we have the time or the bandwidth to design such assets"*) + grid-dances-around-components-preservation (Signal 009) all tip toward A for V1; Mayor's "don't lock pillars in a box" directive + monuments-as-cartographic-allegory universal concept (NYC monumental landscape examples) + tokens-of-existence-NOT-literal-mapping anti-pattern preserved canon-recoverably tip toward D for forward-arc preservation. *Options B + C also preserved as future-arc adjudications per don't-discard.* Option A + Option D coexist: V1 = Option A; future-arc = Mayor adjudicates Option D activation per future-arc dispatch with full §6.5 7-dim framework + research-cited evidence.

**Cross-references at §7 ratification:**

- §2.4 Layer 4 D3 + P5 per-tool 7-dim framework
- §2.6 unified-grid + zoom-level reframe + dial calibration table (Signal 009)
- §3.7 Pillars-encoding-atmospheric-overlay decision deferred to §7 — CLOSED §7.7 (Option A ratified for V1 + Option D preserved per don't-discard for forward-arc per Signal 015)
- Signal 014 in `cc-ledger/cross-surface-signals.md` — CD2 alignment chisel (§6.3 + §4.5 cosmology-symmetry framing per CD2 Decision 5; pigment assignments aligned to CD2 RATIFIED; lanes = LOGICAL/SEMANTIC NOT visual-spatial Mayor verbatim canonized)
- Signal 015 in `cc-ledger/cross-surface-signals.md` — Pillars-as-monuments forward-arc framing (Option D preserved per don't-discard; Mayor anti-pattern canonized: tokens-of-existence ≠ literal-mapping; visual allegory ≠ legend)
- §4.3 Editorial District character + §4.6 Editorial District atmospheric texture
- §5.5 Pillars surfacing sketch (foundational-substrate inherited at construction)
- §6 wine-red Inferno markers + §6.3 lane-semantic encoding pattern + Inferno activity coupling per §7.6
- §10 cross-stream coordination — closes gap #3 second half (cross-stream coordination of dial-calibration across CD3 → CD4 → CD5 → W4 → W5; W4 cascade adjudicates workflow automation platform selection for Layer 3 Inferno activity coupling per Signal 013)
- Signal 013 in `cc-ledger/cross-surface-signals.md` — §7.6 dial-calibration "agent-implementation policy" framing conflation correction + Mayor 2026-05-08 W1 CD3 Cycle 2 adjudication (Layer 3 = workflow automation per W4 cascade; Mayor's value canonized: Prime's first runtime agent should NOT be a cron-like single-task trigger loop)
- Master plan §1.4.2 composable 3-layer architecture (Layer 1 AI Gateway / Layer 2 MCP Gateway / Layer 3 Agent Gateway) + §3.A pipeline orchestration tooling list (n8n / Make / Relay / Gumloop) + §3.B Layer 3 Agent Gateway candidates (CrewAI Flows + LangGraph + A2A protocol + n8n v2.19 Enterprise AI Gateway) + §4 W4 application services Wave (workflow automation platform selection cascade) + §7 Stream-F ledger discipline
- CD1 thesis Concept 4 (atmosphere-as-physical-substrate) + Concept 7 (walking metaphor) + reference-archive §1 Concept 4 (Paris Review + INQUE + Baffler precedents) + §3 atmospheric register (`sky-high` / `sky-low` / `reflect` / `window-warm`) + §4.4 dial principle + Decision 9 cartography commitment + Decision 5 atmosphere universal concept ratification
- Master plan §3.A concept #4 + §1.1 register lock + §6.5 7-dim framework + §6.6 verification ladder Row 1 token contract + RES-009 (atmosphere.md retired; CD3 owns full visual substrate; per-domain folds)
- `feedback_concept_first_examples_prove_muted_language.md` (C7 + C8) + `feedback_decouple_scope_from_ambition.md` (V1 scope discipline) + `feedback_metric_vs_gate_discipline.md` (gates not metrics; per-Pillar atmospheric variation as character-shift not semantic-shift)

---

## §8 — Lane semantics in cartography + coordinate-handoff API (closes §2 conditional ratification gap #1; most load-bearing)

The **most load-bearing section of CD3** per §2 conditional ratification gap #1 (coordinate-handoff API: cartography-grid ↔ site-grid) + per CD4 Signal 004 stub gap (CartographyCanvas full encoding + DistrictMap forward-pointed-neighbor-buildings + coordinate-handoff API). §8 ratifies the API spec at concept-level + interface-shape; specific binding values + per-component CSS column assignments defer to CD4 + W5.

§8 inherits from §6.3 (CD2-aligned per Signal 014) the cosmology-symmetry framing — Lane 1 Editorial / Lane 2 Institutional / Lane 3 Dispatch as 3 cosmology vectors meeting at Purgatorio surface. The coordinate-handoff API binds these to CSS column assignments per CD4 component grid + CD1 thesis Concept 2 hierarchical-layered grid (cartography-grid as dynamic participant + site-grid hierarchy + coordinate-handoff at marriage point co-authored at CD3+CD4 boundary).

### §8.1 — Universal concept

*Coordinate-handoff API as architectural marriage point* — when two grid systems coexist (cartographic spatial grid + typographic+structural component grid), the coordinate-handoff API is the contract that lets each grid evolve independently while preserving alignment at the marriage point. The API defines: (1) what coordinates feed across the boundary, (2) what semantic identifiers carry meaning across the boundary, (3) what's owned by each side, (4) how drift is detected.

**Examples that prove the concept at world-class scale:**

- **NYT The Upshot data-cartography integration** — D3 cartographic coordinates feed React component placement; coordinate-handoff API preserves cartographic semantics + component grid layout per editorial article-as-designed-object
- **Mapbox GL JS + React component integration patterns** — Mapbox tile coordinates feed React layer placement; coordinate-handoff API decouples vector tile rendering from component lifecycle (canonical pattern for production-runtime cartography per §2.3)
- **Pudding editorial cartography** — per-article cartographic coordinates feed per-article component placement; coordinate-handoff API enables per-article-as-designed-object scaling per CD1 thesis Concept 7 walking metaphor + §3.A semantic-componentization gap A9

The concept-first framing per master plan §1.1 + C7: Prime's coordinate-handoff API extracts the universal concept (architectural marriage point between two grid systems) from world-class precedents and expresses it in Prime's register (CD1 thesis Concept 2 hierarchical-layered grid where cartography-grid is dynamic participant + site-grid hierarchy + coordinate-handoff at boundary).

### §8.2 — Coordinate-handoff API spec (CD3 ratifies; CD4 + W5 bind values)

The API spec is **interface-shape-only at CD3** (semantic field structure + handoff direction + ownership boundaries); specific schema fields + Astro Content Layer integration + Zod discriminated union defer to W5 microsite implementation per master plan §3.B + §3.C.

**API spec (CD3 ratifies):**

```yaml
# Coordinate-handoff contract (illustrative; final schema per W5 Astro Content Layer + Zod)
# Cartography-grid → Site-grid handoff (cartography pushes; site reads)
cartography_to_site_handoff:
  # Spatial coordinates within unified Prime grid (per §2.6 + Signal 009 unified-grid)
  coordinates:
    cartography_x: <number>           # cartographic-grid x (Editorial District perspective at borough zoom; magazine-corner at neighborhood zoom; per §2.6 zoom-level table)
    cartography_y: <number>           # cartographic-grid y
    zoom_level: <enum>                # whole-city | district-perspective | neighborhood-perspective | edge-perspective (per §2.6)
    surface_type: <enum>              # prime-homepage | district-hub | dispatch-homepage | dispatch-article (per §2.6 + §4.4)

  # Semantic-channel binding (per §6.3 + §4.5 cosmology-symmetry framing per Signal 014)
  lane_semantics:
    primary_lane: <enum>              # editorial | institutional | dispatch (per §6.3 Lane 1/2/3 cosmology vectors per Signal 014)
    secondary_lanes: <[lane, ...]>    # cross-cutting lanes (e.g., dispatch-marker lane crosses any primary lane)

  # Component-grid placement hint (CD4 binds CSS column assignments)
  component_grid_hint:
    column_span: <enum>               # narrow | medium | wide | full (per §3.A concept #2 grid-as-architectural-document)
    column_anchor: <enum>             # left | center | right | center-bleed (per CD4 component spec.md)
    layer: <enum>                     # base | mid | overlay (z-stacking per §4.7 forward-pointed-neighbor render discipline)

  # Cosmology-signal coupling (per §3.2.3 + Reframe 2 cosmology-via-signals)
  cosmology_signals:
    inferno_pop_up: <boolean>         # whether wine-red dispatch marker pops up at this position (per §6.2 + §7.6 Layer 3 runtime event-routing per Signal 013)
    paradiso_fixture: <boolean>       # whether Paradiso seed-mandate institutional fixture renders at this position (per §4.2 bar-holding obligation per Reframe 3)
    pillars_inheritance: <[pillar, ...]>  # which Pillars are most load-bearing (per §5.5 + §7.7 Option A; Option D forward-arc adds monuments_at_position field per Signal 015)
    histories_lineage: <histories-ref>     # tombstoned predecessor reference (per §3.4 article-node histories-lineage field + §5.6 Histories cartographic surfacing)

  # Dial-position (per §7.6 dial-calibration policy)
  dial_position:
    layer_1_default: <enum>           # LOW-MID | MID | LOW (per §2.6 calibration table; surface-default)
    layer_2_override: <enum>          # null | LOW | MID | HIGH (per-article-context override per §7.6 Layer 2)
    layer_3_runtime_state: <state>    # workflow automation platform-driven Inferno activity state (per §7.6 Layer 3 + Signal 013)
```

**Handoff direction:** cartography-grid → site-grid (cartography pushes coordinates + semantics; site-grid reads + binds CSS columns). Reverse direction (site-grid → cartography-grid feedback for component-aware cartographic adjustment per Signal 009 grid-dances-around-components) ratifies at §10 cross-stream coordination.

### §8.3 — Ownership boundaries (CD3 / CD4 / W5 / W4)

**CD3 owns (ratified at §8.2):**

- Coordinate semantic-field structure (cartography_x / cartography_y / zoom_level / surface_type)
- Lane-semantic encoding pattern (primary_lane + secondary_lanes per §6.3 cosmology-symmetry per Signal 014)
- Cosmology-signal coupling fields (inferno_pop_up / paradiso_fixture / pillars_inheritance / histories_lineage)
- Dial-position multi-layer field (layer_1_default + layer_2_override + layer_3_runtime_state per §7.6 + Signal 013)
- Handoff direction (cartography → site, primary; site → cartography for grid-dances-around-components feedback per §10)

**CD4 binds (W3 ratifies):**

- Component-grid-hint enum values (column_span / column_anchor / layer)
- CSS column assignments per component (per §3.A concept #2 grid-as-architectural-document)
- Lane-pigment-to-component mapping (per CD2 RATIFIED lane pigments + §6.3 cosmology-symmetry)
- Per-component texture-surface declarations (per RES-009 fold)

**W5 ratifies (Astro Content Layer + Zod):**

- Final schema (Zod discriminated union per master plan §3.C)
- Astro Content Layer integration (per master plan §3.B Astro Server Islands)
- Per-article-context override schema (Layer 2 dial-position binding per §7.6)
- Content-pipeline ingestion (handoff at build-time + content-time)

**W4 ratifies (workflow automation platform per Signal 013):**

- Layer 3 runtime event-router (Inferno activity → cartography state-update via webhook/API; per §7.6 + Signal 013)
- Specific platform binding (n8n / Make / Relay / Gumloop / Zapier per §6.5 7-dim framework cascade)

### §8.4 — Drift detection + reconciliation

**Drift detection** (per `feedback_read_diffs_dont_trust_reports.md` discipline):

- **Static-time drift** — Astro Content Layer + Zod schema validation at build time catches coordinate-field type mismatches (per master plan §6.6 verification ladder Row 25 contract testing for API changes; Pact-style consumer-driven contract pattern)
- **Render-time drift** — Visual regression (Playwright snapshots per master plan §6.6 Row 4) + Component visual regression (Chromatic per Row 5) catch cartography-component placement misalignment
- **Cross-cycle drift** — Verification ladder Row 22 Vibe Fidelity audit + Visual Regression Intelligence (Chromatic+AI predicting how token changes affect 500 screens) catch semantic-channel drift after CD2 token shifts (e.g., Lane 1 Editorial pigment OKLCH change → cartography-component pigment alignment re-validates)

**Reconciliation pattern:**

- **Drift surfaced** → `cc-ledger/cross-surface-signals.md` DISCOVERY-class entry per §8.7 State Layer discipline
- **Material drift** → CD3 + CD4 + W5 reconcile at CD6 brand synthesis OR per-Wave dispatch (W2 / W3 / W5)
- **Structural drift** → Mayor adjudicates per master plan §6.5 7-dim framework + Stream-E validation cascade per §6.1

### §8.5 — Closes §2 conditional ratification gap #1

§2 named gap #1 as MOST LOAD-BEARING per predecessor's confidence answer:

> *Coordinate-handoff API at §8 (cartography-grid ↔ site-grid; per CD4 Signal 004 stub gap; most load-bearing)*

§8.2 ratifies the API interface-shape; §8.3 ratifies ownership boundaries; §8.4 ratifies drift-detection + reconciliation. **Gap #1 CLOSED at §8.** Coding agents have concrete inputs to implement coordinate-handoff: CD4 binds component-grid-hint enums + CSS columns; W5 binds Zod schema + Astro Content Layer + content-pipeline ingestion; W4 binds Layer 3 runtime event-router; CD6 reconciles at brand synthesis.

### §8.6 — Mayor adjudication points for §8

Three load-bearing decisions Mayor adjudicates at §8 ratification:

1. **Coordinate-handoff API spec ratification (load-bearing; closes §2 gap #1 most-load-bearing).** Does the API spec (coordinate semantic-field structure + lane-semantic encoding per cosmology-symmetry per Signal 014 + cosmology-signal coupling fields + dial-position multi-layer field + handoff direction) ratify at CD3 as the load-bearing API that CD4 component spec.md + W4 workflow automation platform + W5 microsite implementation + CD6 brand synthesis build against? Specific Zod schema + enum values + per-component bindings defer.

   *CC recommendation (Reframes 1+2+3 cumulative + Signals 013-015):* RATIFY. API spec inherits CD1 thesis Concept 2 (hierarchical-layered grid; cartography-grid as dynamic participant + site-grid hierarchy + coordinate-handoff at marriage point); preserves CD2 RATIFIED cosmology-symmetry per §6.3 + Signal 014; preserves dial-calibration 3-tier policy per §7.6 + Signal 013; preserves Pillars-overlay decision + Option D forward-arc per §7.7 + Signal 015; preserves cosmology-via-signals per Reframe 2 + Signal 010. *Universal-concept-grounding (architectural marriage point) + concept-first framing + cosmology-coherence-preservation + cross-stream-ownership-clarity (CD3 / CD4 / W4 / W5) + drift-detection-discipline tip toward.*

2. **Ownership boundaries ratification (load-bearing).** Do the ownership boundaries (CD3 owns API semantic-field structure + lane-encoding + cosmology-signal coupling + dial-position field; CD4 binds component-grid-hint enums + CSS columns; W5 ratifies Zod schema + Astro Content Layer; W4 ratifies Layer 3 runtime event-router) ratify at CD3 as the load-bearing ownership pattern that downstream Streams build against?

   *CC recommendation:* RATIFY. Ownership boundaries inherit master plan §5.1 per-Stream file ownership; CD3 owns interface-shape; CD4 + W4 + W5 bind values per their cycle; CD6 reconciles. *Concurrency-safety + per-Stream-ownership-clarity + iteration-finding-balance-preservation (W5 binds final schema as evidence accumulates) tip toward.*

3. **Drift detection + reconciliation pattern ratification (load-bearing).** Does the drift detection pattern (static-time via Zod + Pact contract testing per Row 25; render-time via Playwright + Chromatic per Rows 4-5; cross-cycle via Vibe Fidelity audit per Row 22) + reconciliation pattern (signals → CD6 OR per-Wave) ratify at CD3 as the load-bearing pattern that CI/CD pipelines + verification ladder build against?

   *CC recommendation:* RATIFY. Drift detection pattern inherits master plan §6.6 verification ladder Rows 4 + 5 + 22 + 25; reconciliation pattern inherits §8.7 State Layer discipline (cross-surface-signals.md as drift-detection surface) + CD6 brand synthesis recombination point; preserves `feedback_read_diffs_dont_trust_reports.md` discipline (read CD2 actual diff at ratification; not assumed alignment per Signal 014). *Verification-ladder-grounding + State-Layer-discipline + read-diff-discipline-preservation tip toward.*

**Cross-references at §8 ratification:**

- §2 conditional ratification gap #1 — CLOSED §8 (most load-bearing per predecessor confidence answer)
- §6.3 lane-semantic encoding pattern (CD2-aligned per Signal 014) — §8 binds API to encoding pattern
- §4.5 Editorial District lane semantics — §8 API references encoding pattern at Editorial District scale
- §7.6 dial-calibration 3-tier policy + Signal 013 — §8.2 dial_position field binds 3 layers
- §7.7 + §7.8 #3 Pillars overlay decision (Option A V1 + Option D forward-arc per Signal 015) — §8.2 pillars_inheritance field + Option D monuments_at_position forward-arc
- §3.4 article-node search index encoding — §8 API extends per-position to per-article-node
- §10 cross-stream coordination — site-grid → cartography-grid feedback for grid-dances-around-components per Signal 009
- CD1 thesis Concept 2 (hierarchical-layered grid; cartography-grid as dynamic participant + coordinate-handoff at marriage point co-authored CD3+CD4) + Concept 7 (walking metaphor + per-article-as-designed-object per Pudding precedent) + Decision 9 (cartography commitment + dial principle)
- CD2 Decision 5 (cosmology-symmetry; lane pigments) + Decision 6 (atmospheric chrome) + Decision 7 (wordmark cosmology-encoded) per Signal 012
- Master plan §1.1 + §3.A concept #2 grid-as-architectural-document + §3.B Astro Server Islands + §3.C Zod discriminated union + §5.1 per-Stream ownership + §6.5 7-dim framework + §6.6 verification ladder Rows 4 + 5 + 22 + 25 + §8.7 State Layer
- `feedback_read_diffs_dont_trust_reports.md` (drift detection discipline at ratification gates) + `feedback_orchestration_contract.md` (interface contracts as load-bearing structure across Streams)

---

## §9 — Tool-ledger entries via Stream-F + concept-emergence detection workflow (closes §2 conditional ratification gap #4)

Per master plan §3.F + §7 Stream-F discipline + dispatch brief Section 9: every tool considered / incorporated / deferred-with-citation / absorbed-from-Prime-stack lands in `tool-ledger/inventory.md` (append-only) + per-tool decision entry in `tool-ledger/decisions/`. CD3 drafts entries; Stream-F validates via Tavily/WebSearch cascade per §6.1 validation-prompt discipline + appends per Stream-F append-only.

§9 also closes **§2 conditional ratification gap #4** — concept-emergence detection-and-surface-to-Mayor workflow per §2.7 + Signal 009 escape hatch.

### §9.1 — Tool-ledger discipline (Stream-F append-only)

**Per master plan §3.F + §7 Stream-F discipline:**

- **Inventory** (`tool-ledger/inventory.md`) — append-only catalog of tools considered + incorporated + deferred-with-citation; one entry per tool with 7-dim framework (per Signal 006: Monetary cost / Complexity & failure points / Load heaviness / Use case / Capability ceiling / Capability floor / Risks)
- **Decisions** (`tool-ledger/decisions/<tool>-decision.md`) — one file per tool when adoption / substitution / deferral decision warrants standalone documentation; cites adoption tier (Essential / Integrated / Concept-iteration / Deferred) + Mayor adjudication context + research evidence + cost-vs-ROI evidence per §6.1
- **Cost-ROI ledger** (`tool-ledger/cost-roi.md`) — append-only cost evidence per tool; Mayor 2026-05-07 W0 cost evidence base (~$2/mo Inkarnate Pro adopted + $30-50/mo if MJ + Recraft adopted + Mapbox-vs-MapLibre defers to W4 cascade per §2.3)

**Discipline:** entries are research-cited per §6.1 validation-prompt discipline (cost-vs-ROI evidence required, NOT guessed; tools index sent with each cascade per C2). When CD3 surfaces a candidate tool, Stream-F validates via Tavily/WebSearch cascade + appends the ledger entry. Tools NEVER eliminated from the index; deferred-with-research-citation when not selected (per master plan §1.7 reframe 2.3 don't-subtract + §6.5 don't-discard).

### §9.2 — CD3 cartography tool-ledger entries (9 tools per dispatch brief)

Nine tools named in §2 procgen-base + restyle workflow already carry 7-dim framework analysis at §2.1-§2.5. CD3 drafts entries reference these; Stream-F validates + appends per Stream-F append-only.

| Tool | Layer | 7-dim framework reference | Decision (CD3 surfaces; W4 cascade where applicable) |
| --- | --- | --- | --- |
| **Watabou City Generator** | Layer 1 procgen base | §2.1 | ADOPT for Layer 1 procgen base (cost+complexity+load minimal; capability ceiling matches CD1 thesis §3 register) |
| **Azgaar's Fantasy Map Generator** | Layer 1 procgen base | §2.1 | ADOPT alongside Watabou (region-scale procgen; semantic-layered SVG export) |
| **Inkarnate Pro** | Layer 2 concept iteration | §2.2 | ADOPT for Layer 2 with concept-decoupling caveat per §2.7; ~$2/mo per cost-roi.md |
| **Mapbox Studio** | Layer 3 production runtime | §2.3 | DESCRIPTIVE-CONSIDERATION at CD3; W4 Mayor cascade adjudicates Mapbox-vs-MapLibre with full §6.5 7-dim evidence |
| **MapLibre GL** | Layer 3 production runtime | §2.3 | DESCRIPTIVE-CONSIDERATION at CD3; W4 cascade adjudicates OSS-vs-SaaS tradeoff |
| **D3.js** | Layer 4 atmospheric overlay | §2.4 | ADOPT for Layer 4 contour-ink expression (canonical NYT Upshot + Pudding + Stamen precedents) |
| **P5.js** | Layer 4 atmospheric overlay | §2.4 | ADOPT for Layer 4 paper-grain expression (Paris Review Pentagram + INQUE + Pentagram tactile-warmth lineage) |
| **Spline 3D** | Layer 5 3D + concept-art branch | §2.5 | DESCRIPTIVE-CONSIDERATION for concept-iteration ONLY (NOT production runtime); production 3D defers to W4 cascade |
| **Midjourney + Recraft + Leonardo.AI** | Layer 5 concept-art branch | §2.5 | DESCRIPTIVE-CONSIDERATION at Layer 5 concept-art branch; subset selection (which 1-2-3 tools) refines at W2/W4; Midjourney + Recraft recommended initial subset |

### §9.3 — Workflow automation tools (per Signal 013 Layer 3 runtime event-routing)

Per §7.6 Layer 3 + Signal 013 + Mayor 2026-05-08 adjudication: workflow automation platform per W4 cascade serves Layer 3 dial-calibration runtime event-routing (Inferno activity coupling). 5 candidate platforms surfaced; W4 cascade with full §6.5 7-dim framework adjudicates specific selection.

**5 workflow automation candidates (CD3 surfaces; W4 cascade adjudicates):**

| Tool | Monetary cost | Complexity / failure points | Load heaviness | Use case | Capability ceiling | Capability floor | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **n8n** (recommended for W4 cascade evaluation; native MCP per v2.19 March 2026) | Self-host free OSS / Cloud $20-50/mo Pro / Enterprise per-seat | MEDIUM — visual workflow + node ecosystem; self-host operational tax (self-host) or vendor outages (cloud); failure modes around node-update version churn | MEDIUM (self-host); LOW (cloud) | Linear sync / GitHub event routing / multi-service orchestration / Sanity CMS event subscription per llmcms.org analysis; n8n v2.19 March 2026 release with native MCP integration + Task Runner isolation + durable Wait states + native OpenTelemetry export per master plan §3.B; Stripe-norm production deployments | HIGH — 400+ pre-built integrations + custom node authoring + MCP gateway capability per v2.19; durable workflows (state preserved across server restarts) | OSS lineage; community-supported; self-host preserved against vendor lock | Self-host operational burden; cloud vendor pricing; node-ecosystem version churn |
| **Make** (formerly Integromat) | Free 100 ops/day; Core $9/mo; Pro $16/mo; Teams $29/mo | LOW — visual scenario builder; failure modes around vendor outages + scenario quotas | LOW — pure SaaS; no self-host | SaaS-native automations; mid-market scale; 1500+ integrations | MEDIUM-HIGH — sophisticated branching + error handling + iterators | SaaS-only; no self-host path | Vendor lock; usage-based pricing scales with workflow ops |
| **Relay** | $9-49/mo Pro tiers | LOW — modern UX; AI-native automations; failure modes around vendor stability (newer platform) | LOW | AI-native automation flows; modern team-tier; Claude integrations native | MEDIUM-HIGH — AI-augmented workflows; Claude-native | SaaS-only | Newer platform; vendor stability less proven than n8n/Make |
| **Gumloop** | Free 1K credits; Starter $97/mo; Pro $497/mo | LOW — agent-builder framing; AI-native; failure modes around credit consumption + vendor stability | LOW | AI-agent workflow building; modern team-tier | HIGH — agent-builder + LLM-orchestrated workflows | SaaS-only; agent-builder framing may not fit pure event-routing use case (overkill for non-agent workflows) | Higher cost than n8n/Make/Relay; agent-builder framing pulls toward LLM use (which Mayor explicitly doesn't want for dial-calibration runtime per Signal 013) |
| **Zapier** | Free 100 tasks/mo; Starter $19.99/mo; Pro $49/mo; Team $69/mo | LOW — most established platform; failure modes around vendor pricing change + ZAP execution latency at scale | LOW — pure SaaS | Mainstream automation; 6000+ integrations; widest connector library | MEDIUM — established features; less developer-friendly than n8n; less AI-native than Relay/Gumloop | SaaS-only; vendor lock; less customization than n8n | Vendor pricing change history; least developer-friendly; less code-first than n8n/Make |

**CC initial recommendation for W4 cascade evaluation:**

- **n8n** preferred for V1 if self-host operational burden tolerable + Mayor wants OSS/data-sovereignty path; v2.19 native MCP integration aligns with Prime AI-first operability per §1.4.2; durable workflows match production-state-mutating workflow needs per master plan §6.6 verification ladder Row 22+23
- **Make** as cloud SaaS alternative if self-host load not acceptable; lower complexity floor; vendor-managed
- **Relay / Gumloop / Zapier** preserved per don't-discard for W4 cascade comparison

*Tip-dimensions: capability ceiling + native MCP path (n8n) + cost floor (n8n self-host OR Make free tier) + load heaviness (Make/Relay/Zapier all LOW) tip toward.* W4 cascade with research-cited 2026 evidence + Stream-F ledger discipline adjudicates final selection. Option β (cheap TS script per Signal 013) preserved per don't-discard if W4 evidence tips toward custom TS over platform.

### §9.4 — Concept-emergence detection workflow (closes §2 conditional ratification gap #4)

Per §2 conditional ratification gap #4 + §2.7 + Signal 009 concept-emergence escape hatch: agents need a workflow for surfacing concept-iteration outputs (Inkarnate / MJ / Recraft / Leonardo / Spline) for Mayor's escape-hatch adjudication. §9.4 ratifies the workflow.

**Concept-emergence detection workflow (CD3 ratifies):**

| Step | Actor | Action | Output |
| --- | --- | --- | --- |
| **1 — Concept-iteration fire** | Coding agent | Fire concept-iteration tool (Inkarnate Pro / MJ / Recraft / Leonardo / Spline) per §3.5 step 3 + §2.5 Layer 5 concept-art branch | Concept output (PNG / 3D scene / vector export) |
| **2 — Concept-archive landing** | Coding agent | Save output to `representation/visual-system/cartography/concept-archive/<wave-id>/<tool>/<output-id>/` (provisional path; refinable at W5) | Output stored at canonical path with version-stamp |
| **3 — Agent annotation** | Coding agent | Annotate output with metadata in `<output-id>.metadata.yaml`: tool used / register notes / cohesion-test commentary / dial-position-fit / character-distinguishing-features. **Agent does NOT filter** (per `feedback_mayor_gates_decisions_not_execution.md`); annotation informs Mayor's review | Metadata YAML co-located with output |
| **4 — Stream-F ledger append** | Stream-F | Append per-output entry to `tool-ledger/concept-archive-log.md` (append-only); cite tool used + cost per output + research-citation if applicable | Append-only log entry |
| **5 — Mayor browses concept-archive** | Mayor | Browse concept-archive at per-Wave gate OR ad-hoc; "browse-and-flag" pattern preserves Mayor-gates-decisions discipline | Mayor flags candidates as "potential elevation" |
| **6 — Stream-E concept-elevation cascade** | Stream-E (per §3.E) | Triggered by Mayor flag; Stream-E synthesizes evidence (cost / capability ceiling / cohesion-test fit / dial-position-fit / risks) per §6.5 7-dim framework | Elevation evidence brief |
| **7 — Mayor elevation adjudication** | Mayor | Adjudicate elevation per §6.5 7-dim framework + Stream-E evidence: ELEVATE (concept becomes production-runtime input; CD3 OR relevant CD re-opens to integrate; new dispatch authored) OR PRESERVE-IN-ARCHIVE (concept stays in archive; available for future-arc reference per don't-discard) | Mayor decision logged in cross-surface-signals.md |

**Annotation discipline (Step 3) — agents annotate, do NOT filter:**

Heuristics for agent annotation (metadata fields informing Mayor's review; NOT thresholds for agents to filter on):

- **Cosmology fit** — does the concept match Editorial District character (per §4.3)? Future Civic / Art Districts? Or different register entirely?
- **CD1 register match** — does the concept match the editorial-civic-warm register (per CD1 thesis §3) OR shift to a different valid register per master plan §1.3 5-narrow-certification gates?
- **Cohesion-test commentary** — does the concept hold the bar (Apple-cohesion-test framing per CD1 thesis §5 + Reframe 3 / Signal 011 Paradiso = THE BAR)?
- **Dial-position fit** — at what dial position does the concept come alive (LOW / MID / HIGH per §2.6 calibration table + §7.6 dial-calibration policy)?
- **Bar-holding observation** — does the concept hold Paradiso's bar via institutional fixture per Reframe 3 / Signal 011?
- **Character distinguishing features** — what makes this concept distinct from other concept-archive outputs?

**Mayor-gate preservation:** workflow respects `feedback_mayor_gates_decisions_not_execution.md` discipline — agents run technical execution (concept-iteration tool firing + concept-archive save + metadata annotation + Stream-F ledger append); Mayor runs adjudication (browse-and-flag + elevation decision); Stream-E synthesizes evidence.

**Closes §2 conditional ratification gap #4.** Coding agents have concrete inputs to fire concept-iteration tools + save outputs + annotate; Mayor has concept-archive browsing surface + flag mechanism + Stream-E evidence brief at elevation cascade; elevation outcome triggers re-opening of relevant CD with full §6.5 7-dim framework.

### §9.5 — Mayor adjudication points for §9

Three load-bearing decisions Mayor adjudicates at §9 ratification:

1. **Tool-ledger entry pattern ratification (load-bearing).** Does the Stream-F append-only discipline (inventory + decisions + cost-roi append-only structure + 7-dim framework per Signal 006 + research-cited per §6.1 + don't-eliminate-only-defer per §1.7 reframe 2.3 + §6.5 don't-discard) ratify at CD3 as the load-bearing tool-ledger pattern that downstream Streams build against?

   *CC recommendation:* RATIFY. Tool-ledger discipline inherits master plan §3.F + §7 Stream-F + §6.1 validation-prompt discipline + §6.5 7-dim framework + §1.7 reframe 2.3 don't-subtract + Signal 006 7-dim framework split. *Append-only-correctness + don't-discard-discipline + research-cited-grounding tip toward.*

2. **Workflow automation tool entries ratification (load-bearing; per Signal 013 Layer 3).** Do the 5 workflow automation candidates (n8n / Make / Relay / Gumloop / Zapier) ratify at CD3 as the W4 cascade evaluation set for Layer 3 runtime event-routing per Signal 013? Specific platform selection defers to W4 cascade with full §6.5 7-dim framework + research-cited 2026 evidence.

   *CC recommendation:* RATIFY 5-candidate evaluation set. n8n recommended for W4 cascade evaluation given native MCP integration (v2.19) + OSS lineage + durable workflows + Stripe-norm production deployments; Make as cloud SaaS alternative; Relay / Gumloop / Zapier preserved per don't-discard. *Native-MCP-alignment + cost-floor-flexibility + capability-ceiling-coverage + Mayor-value-canonized-(no-LLM-runtime per Signal 013) tip toward.*

3. **Concept-emergence detection workflow ratification (load-bearing; closes §2 gap #4).** Does the 7-step workflow (concept-iteration fire → concept-archive landing → agent annotation → Stream-F ledger append → Mayor browses → Stream-E cascade → Mayor elevation adjudication) ratify at CD3 as the load-bearing workflow that coding agents follow when concept-iteration tools fire?

   *CC recommendation:* RATIFY. Workflow preserves Mayor-gate per `feedback_mayor_gates_decisions_not_execution.md` (agents annotate, Mayor adjudicates); preserves don't-discard (PRESERVE-IN-ARCHIVE outcome keeps concept available for future-arc); preserves Stream-E synthesis discipline at elevation cascade; closes §2 conditional ratification gap #4. *Mayor-gate-preservation + agent-implementability (clear per-step actor + action + output) + don't-discard-preservation + cross-Stream-coordination (Stream-F + Stream-E) tip toward.*

**Cross-references at §9 ratification:**

- §2.1-§2.5 7-dim framework analysis for 9 cartography tools (Watabou / Azgaar / Inkarnate / Mapbox / MapLibre / D3 / P5 / Spline / MJ+Recraft+Leonardo) — referenced by §9.2
- §2.7 concept-decoupling discipline + concept-emergence escape hatch (Signal 009)
- §7.6 Layer 3 runtime event-routing (Signal 013) — workflow automation platform per W4 cascade; §9.3 surfaces 5-candidate evaluation set
- §10 cross-stream coordination (forward-reference; consolidates per-Stream concurrency-safety)
- Signal 006 (7-dim framework split: Cost → Monetary cost + Complexity/failure points)
- Signal 013 (workflow automation per W4 cascade; Mayor's value canonized: NO LLM agent runtime)
- Master plan §3.F + §7 Stream-F + §6.1 validation-prompt + §6.5 7-dim framework + §1.7 reframe 2.3 don't-subtract + RES-005 (Stream-F W0 cost evidence base)
- `feedback_mayor_gates_decisions_not_execution.md` (Mayor-gate preservation throughout concept-emergence workflow) + `feedback_decouple_scope_from_ambition.md` (V1 scope discipline; concept-archive accumulates across arcs) + `feedback_briefs_with_stake_and_quality.md` (per-Wave Mayor browsing as quality gate)

---

## §10 — Cross-stream coordination + concurrency-safety + Stream-E cascade + CD6 recombination (closes §2 conditional ratification gap #3 second half)

Per master plan §4 W1 Concurrency notes + §5.1 per-Stream file ownership + §5.9 lock-vs-stub interface table: CD3 runs PARALLEL with CD2 / CD4 / CD5 within W1; SERIAL recombination at CD6.

§10 also closes **§2 conditional ratification gap #3 second half** — cross-stream coordination of dial-calibration across CD3 → CD4 → CD5 → W4 → W5. First half closed at §7.6 per Signal 013; §10.4 consolidates the second half.

### §10.1 — Universal concept

*Cross-stream coordination as concurrency-safety contract* — when multiple Streams produce deliverables in parallel against a shared substrate (DISpatch microsite), they need a contract that defines: (1) what each Stream owns, (2) what each Stream reads, (3) what flows between Streams as stub interfaces (token-stub / spec-stub), (4) where reconciliation happens (Wave gates / CD6 recombination), (5) how drift is detected.

**Examples that prove the concept at world-class scale:**

- **Pentagram multipurpose-platform principle** (per CD1 thesis Concept 5 + master plan §3.A semantic-componentization gap A9) — brand DNA propagates across Buildings via inheritance from platform-level brand-bible-registry; per-Building register choice as Mayor-gated decision (not silent per-Building drift); cross-stream coordination via append-only token files + Wave gates
- **Stripe / Linear principal-grade operating model** — release-plane progression (preview deployment protection per master plan §6.6 Row 31; rolling-release per Row 32; instant rollback per Row 33; feature-flag release control per Row 34) via cross-stream contracts at deployment seams
- **NYT Magazine editorial multi-stream production** — editorial / design / engineering / multimedia work parallel against shared issue brief; reconciliation at editorial gate; cross-stream contracts via shared style guide + design-token system

The concept-first framing per master plan §1.1 + C7: Prime's cross-stream coordination extracts the universal concept (concurrency-safety contract) from world-class precedents and expresses it in Prime's register (per-Stream file ownership per §5.1 + token-stub / spec-stub interfaces per §5.9 + Stream-E validation cascade per §3.E + CD6 SERIAL recombination per §4 W1).

### §10.2 — CD3 concurrency-safety properties

**CD3 owns:**

- `representation/visual-system/cartography.md` (this document) + `representation/visual-system/cartography/concept-archive/` (when surfaced per §9.4 step 2)
- Cartographic-substrate spec at concept-level (per §1-§9): pipeline shape (§2) + districts-not-blocks doctrine (§3) + Editorial District scaffold (§4) + future-cosmology-layer sketches (§5) + wine-red Inferno markers + lane-semantic encoding pattern per CD2-aligned cosmology-symmetry (§6 + Signal 014) + atmospheric layer + dial-calibration policy + Pillars overlay decision (§7 + Signals 013 + 015) + coordinate-handoff contract (§8) + Stream-F tool-ledger entries + concept-emergence workflow (§9)

**CD3 reads:**

- CD1 outputs: `representation/visual-system/thesis.md` + `representation/visual-system/reference-archive.md` (RATIFIED 2026-05-08; verbatim citation source)
- CD2 outputs: `representation/visual-system/color.md` (CD2 RATIFIED 2026-05-07 per Signal 012; cosmology-symmetry framing canonized at CD3 per Signal 014)
- Master plan: `plans/master-plan.md` v1.0.9 critical sections per dispatch brief
- Stream-F tool-ledger: `tool-ledger/inventory.md` + `tool-ledger/cost-roi.md` (cost evidence base)
- Cosmology lock memory file: `~/.claude/projects/c--Users-AKALM-prime-city-brand-sandbox/memory/project_prime_cosmological_structure.md` (Reframes 1+2+3 cumulative)

**CD3 stub-interfaces (token-stubs + spec-stubs):**

| Stub interface | Direction | What flows | Who binds |
| --- | --- | --- | --- |
| **Token-stub to CD2 (lane pigments + accent + chrome)** | CD2 → CD3 | `--lane-editorial-{step}` / `--lane-institutional-{step}` / `--lane-dispatch-{step}` / `--accent-prime` / `--asset-cartography-pulse` / `--sky-high` / `--sky-low` / `--reflect` / `--window-warm` per Signal 012 + Signal 014 | CD2 RATIFIED 2026-05-07 |
| **Spec-stub to CD4 (lane-semantic encoding pattern)** | CD3 → CD4 | Lane 1/2/3 cosmology-vector framing (per Signal 014); cartographic-spatial encoding pattern; coordinate-handoff contract (per §8); forward-pointed-neighbor-buildings render discipline (per §4.7); article-node multi-Terrace metadata (per §3.4) | CD4 component visual workshop (RATIFIED CD4 Cycle 2 per Signal 005-bis at line 122 of cross-surface-signals.md) |
| **Spec-stub to CD5 (atmosphere-not-animate-at-scroll-speed + per-dial-position motion variation)** | CD3 → CD5 | RES-009 motion-coupling rule; substrate static at scroll cadence; per-dial-position motion variation (HIGH dial = more dynamic-living-layer motion; LOW dial = static substrate motion only); CosmologyMarker motion (per Signal 008-bis at line 158) | CD5 motion register (RATIFIED 2026-05-07 per Signal 008-bis) |
| **Spec-stub to W4 (workflow automation platform)** | CD3 → W4 cascade | Layer 3 dial-calibration runtime event-routing per Signal 013; 5-candidate evaluation set (n8n / Make / Relay / Gumloop / Zapier per §9.3); CC recommendation: n8n for evaluation given native MCP per v2.19 | W4 cascade (per §6.5 7-dim framework + Stream-F ledger) |
| **Spec-stub to W5 (Astro Content Layer + Zod schema)** | CD3 → W5 | Coordinate-handoff API spec per §8.2; per-article-context override schema (Layer 2 dial-position binding); article-node multi-Terrace metadata schema | W5 microsite implementation (per master plan §3.B + §3.C) |
| **Recombination at CD6 (Apple-cohesion-test gate)** | CD3 → CD6 | All §1-§12 outputs; cross-stream cohesion validation against CD1 thesis §5 Apple-cohesion-test framing | CD6 brand synthesis (SERIAL recombination per §4 W1) |

**Append-only on State Layer files** (per master plan §8.7 + Signal 011 RES-011): `cc-ledger/cross-surface-signals.md` (append-only; CD3 in-cycle Signals 005 + 007 + 008-bis + 009 + 010 + 011 + 013 + 014 + 015 appended) + `cc-ledger/COMMAND_QUESTIONS.md` (when CD3 surfaces questions; not currently used in CD3 cycle).

### §10.3 — Stream-E validation cascade scope per CD3

Per master plan §3.E + §6 Stream-E discipline: CD3 fires its own per-sub-phase validation cascade (one of 6 W1 cascades per §3.E + §6.1).

**Stream-E cascade scope per CD3 (recommended):**

| Sub-phase | What Stream-E validates | Cascade source pattern (per §6.1) |
| --- | --- | --- |
| **Pipeline shape (§2)** | 5-expression-layer pipeline serves the bar at all dial positions; 9 named tools per §2.1-§2.5 7-dim framework + 5 workflow automation candidates per §9.3 evaluated for cost-vs-ROI + ceiling/floor + risks | Tavily research-cited cascade per §6.1; one comprehensive prompt per LLM tailored to strength (Perplexity = source-cited validation; Gemini = 2026 frontier identification; ChatGPT = structured comparative analysis with 5-dim framework per `feedback_prompt_tailoring_per_llm.md`) |
| **Districts-not-blocks doctrine (§3)** | Universal concept (NYC / Houston / Tokyo wards as semantic civic-units) holds at world-class scale; counter-doctrine (blocks as visual subdivisions) rejected at concept level; CD2-aligned cosmology-symmetry per Signal 014 | Tavily cascade |
| **Editorial District scaffold (§4)** | Editorial-civic-warm character + perspective-per-surface mapping + lane-semantic encoding (CD2-aligned per Signal 014) + forward-pointed-neighbor-buildings render discipline | Tavily cascade |
| **Future-cosmology-layer sketches (§5)** | Per-cosmology-layer sketch pattern (2-4 sentences) preserves muted-language + cosmology-as-conceptual discipline per Reframe 2; Histories cartographic surfacing (lineage-rail overlay candidate) holds at editorial scale | Tavily cascade |
| **Wine-red Inferno markers (§6 + §6.3 lane-semantic encoding)** | Wine-red dispatch marker semantic role + persistence across districts + lane-semantic encoding 1:1-by-cosmology-vector + CD2 cosmology-symmetry alignment per Signal 014 | Tavily cascade + Gemini frontier (n8n v2.19 + workflow automation 2026 evidence per Signal 013) |
| **Atmospheric layer + dial-calibration (§7 + §7.6 + §7.7)** | Atmosphere-as-physical-substrate (Paris Review + INQUE + Baffler precedents); dial-calibration 3-tier policy (per Signal 013); Pillars Option A V1 + Option D forward-arc (per Signal 015) | Tavily cascade |
| **Coordinate-handoff contract (§8)** | API spec inherits Concept 2 hierarchical-layered grid; ownership boundaries (CD3 / CD4 / W4 / W5); drift detection per Rows 4 + 5 + 22 + 25 of master plan §6.6 verification ladder | Tavily cascade + ChatGPT structured comparative analysis (Pact contract testing + Vibe Fidelity audit + Visual Regression Intelligence per Row 22 + 25 evidence) |
| **Tool-ledger entries (§9)** | Stream-F append-only discipline + 7-dim framework + research-cited per §6.1; 5 workflow automation candidates per §9.3; concept-emergence detection workflow per §9.4 | Tavily cascade per Stream-F ledger discipline |

**Stream-E cascade discipline:** ONE comprehensive prompt per LLM tailored to strength per `feedback_prompt_tailoring_per_llm.md` (Perplexity source-cited / Gemini 2026 frontier / ChatGPT comparative); cascade returns synthesized at Stream-E + chiseled into CD3 spec before Mayor gate per §6.1 validation-prompt discipline; manual cascade FIRST → Code synthesizes → Code-side INFORMED by manual returns to fill gaps + triangulate per `feedback_validation_cascade_sequencing.md`.

### §10.4 — Cross-stream coordination of dial-calibration (closes §2 conditional ratification gap #3 second half)

Per §7.6 first half + Signal 013: dial-calibration 3-tier policy ratified at CD3 (Layer 1 build-time default per-surface + Layer 2 content-time per-article-context override + Layer 3 runtime event-routing via workflow automation per W4 cascade). §10.4 consolidates the second half — cross-stream coordination of the 3-tier policy across CD3 → CD4 → CD5 → W4 → W5 → CD6.

**Dial-calibration cross-stream flow (CD3 ratifies):**

| Stream / Wave | Cycle | Dial-calibration responsibility | Handoff to next |
| --- | --- | --- | --- |
| **CD3** | W1 | Ratify 3-tier policy (§7.6) + per-surface defaults (§2.6 calibration table) + Layer 3 implementation tier as workflow automation per W4 cascade (Signal 013) | Spec-stub to CD4 (Layer 1 default-per-surface enums + Layer 3 runtime state-binding pattern); spec-stub to CD5 (per-dial-position motion variation rule); spec-stub to W4 (5-candidate workflow automation evaluation set per §9.3); spec-stub to W5 (per-article-context override schema field + Layer 2 binding mechanism) |
| **CD4** | W1 | Bind Layer 1 default-per-surface at component spec.md authoring (component renders against ratified default per §2.6); read per-article-context override from props (Layer 2 binding); read Layer 3 marker-state from runtime event-router (workflow automation webhook → CSS custom properties bridge per §8.2 Layer 3 runtime field) | Spec-stub to W5 (component-grid-hint enums + CSS column assignments + per-component-prop interface) |
| **CD5** | W1 | Ratify motion register that respects atmosphere-not-animate-at-scroll-speed discipline (per RES-009) + per-dial-position motion variation (HIGH dial = more dynamic-living-layer motion; LOW dial = static substrate motion only) | Spec-stub to W5 (per-dial-position motion variation pattern + Motion v12 + GSAP + Lenis single-rAF discipline per master plan §4 W1 CD5 row) |
| **W4** | W4 application services | Adjudicate workflow automation platform selection (n8n / Make / Relay / Gumloop / Zapier per §6.5 7-dim framework + research-cited 2026 evidence per Stream-F ledger discipline + master plan §3.A + §3.B + §1.4.2 composable layer architecture + Signal 013); specific platform binds Layer 3 implementation | Implementation handoff to W5 (W4 platform's webhook/API → cartography state-update integration) |
| **W5** | W5 microsite Astro implementation | Ratify per-article-context override schema (Astro Content Layer + Zod discriminated union per master plan §3.C); content-pipeline ingestion implementation; Layer 3 platform-binding (read W4-ratified platform's event-router + bind cartography state-update via webhook/API); CSS custom properties bridge (per §8.2 runtime field — `--cartography-x` / `--lane-pigment-state` / `--inferno-activity-state` etc.) | Recombination at CD6 (Apple-cohesion-test gate; cross-stream cohesion validation) |
| **CD6** | W1 SERIAL recombination | Apple-cohesion-test gate (per CD1 thesis §5) — register coherence + typographic discipline + cartography presence + atmospheric register + institutional fixture + page-furniture wayfinding + walking metaphor coherence; recombines CD1-CD5 outputs into shippable identity | W2 (token pipeline real-CSS contexts) → W3 (component layer) → W4 (application services + workflow automation platform) → W5 (microsite Astro implementation) → W6 (verification ladder green) → W7 (handoff to Buildings) → W8 (production cutover) |

**Closes §2 conditional ratification gap #3 second half.** Coding agents have concrete inputs at every stream/wave handoff: per-Stream ownership clear; per-handoff data flow specified; recombination at CD6 + iteration at W2-W8 preserves dial-principle "iteration finds the balance" per CD1 thesis §4.4 Decision 9.

### §10.5 — Bidirectional aspect: site-grid → cartography-grid feedback (per Signal 009 grid-dances-around-components)

Per Signal 009 + §2.6 unified-grid + §8.2 handoff direction note: while primary handoff is cartography-grid → site-grid, **bidirectional aspect** exists where site-grid → cartography-grid feedback enables grid-dances-around-components per Signal 009 (cartographic grid LIVES around components — articles occupy park-or-venue spaces in the grid; no distracting cartographic features beneath).

**Site-grid → cartography-grid feedback pattern (CD3 ratifies):**

- **CD4 component placement** (component spec.md authoring) signals to cartography: "this component occupies grid coordinates X-Y at zoom-level Z; render cartography around it as park-or-venue space (no distracting features beneath)"
- **Cartography rendering code** (D3.js + P5.js + Mapbox/MapLibre per §2 Layer 1-4) reads component-placement signals at render-time + adjusts cartographic feature density at component-occupied positions (lower density / abstracted forms / simplified contour-ink)
- **Mechanism:** CSS subgrid OR React Context provider OR Astro Slot pattern — implementation defers to W3 (component layer) + W5 (microsite implementation)
- **Discipline:** cartography flows AROUND components; components do NOT pre-empt cartography globally; per-component-placement informs per-cartographic-position adjustment; preserves grid-dances-around-components per Signal 009

**Cross-stream dependency:** CD4 ratifies component placement + signals; W3 + W5 ratify implementation mechanism. CD3 §10.5 ratifies the discipline pattern.

### §10.6 — Mayor adjudication points for §10

Three load-bearing decisions Mayor adjudicates at §10 ratification:

1. **CD3 concurrency-safety properties + stub-interfaces ratification (load-bearing).** Do the per-Stream ownership boundaries (CD3 owns cartography.md + concept-archive; CD3 reads CD1 + CD2 outputs + master plan + Stream-F ledger + cosmology lock) + 6 stub-interfaces (CD2 token-stub + CD4 spec-stub + CD5 spec-stub + W4 spec-stub + W5 spec-stub + CD6 recombination) + append-only State Layer discipline ratify at CD3 as the load-bearing concurrency-safety contract that downstream Streams build against?

   *CC recommendation:* RATIFY. Concurrency-safety properties inherit master plan §5.1 per-Stream file ownership + §5.9 lock-vs-stub interface table + §8.7 State Layer append-only discipline; 6 stub-interfaces consolidate handoff points across CD3's lifecycle; Wave-gate clustering per Mayor 2026-05-08 dispatch operating-model preserved (no per-CD commits during parallel band; W1 cluster commit at CD6 SERIAL recombination per Repo Code Invariant #3). *Per-Stream-ownership-clarity + stub-interface-completeness + append-only-State-Layer-discipline + Wave-gate-clustering-preservation tip toward.*

2. **Stream-E validation cascade scope ratification (load-bearing).** Does the per-sub-phase Stream-E cascade scope (§2 pipeline + §3 doctrine + §4 Editorial District + §5 sketches + §6 Inferno markers + §7 atmospheric + §8 coordinate-handoff + §9 tool-ledger) + cascade discipline (one comprehensive prompt per LLM tailored to strength per `feedback_prompt_tailoring_per_llm.md` + manual cascade FIRST → Code synthesizes → triangulate per `feedback_validation_cascade_sequencing.md`) ratify at CD3 as the load-bearing Stream-E scope?

   *CC recommendation:* RATIFY. Stream-E scope inherits master plan §3.E + §6.1 validation-prompt discipline + §6 cascade architecture; per-sub-phase coverage ensures cross-stream cohesion validation (CD2 alignment per Signal 014; n8n v2.19 frontier evidence per Signal 013; Pact contract testing per master plan §6.6 Row 25); per-LLM-strength prompt tailoring per `feedback_prompt_tailoring_per_llm.md` (Perplexity source-cited / Gemini 2026 frontier / ChatGPT structured comparative analysis); sequential validation cascade (manual FIRST → Code synthesizes) per `feedback_validation_cascade_sequencing.md`. *Per-sub-phase-coverage + per-LLM-strength-tailoring + sequential-validation-discipline + cross-stream-cohesion-validation tip toward.*

3. **Cross-stream coordination of dial-calibration ratification (load-bearing; closes §2 gap #3 second half).** Does the dial-calibration cross-stream flow (CD3 → CD4 → CD5 → W4 → W5 → CD6) + bidirectional aspect (site-grid → cartography-grid feedback per Signal 009 grid-dances-around-components) ratify at CD3 as the load-bearing cross-stream coordination pattern?

   *CC recommendation:* RATIFY. Cross-stream flow inherits §7.6 3-tier policy first half + Signal 013 workflow automation per W4 cascade; bidirectional aspect inherits Signal 009 grid-dances-around-components discipline; per-Stream/Wave ownership clarity + handoff-to-next specification preserves iteration-finding-balance per CD1 thesis §4.4 Decision 9; closes §2 conditional ratification gap #3 second half (gap #3 first half closed at §7.6 per Signal 013). *Cross-stream-flow-completeness + bidirectional-aspect-grid-dances-preservation + dial-calibration-3-tier-coherence + closes-gap-#3-fully tip toward.*

**Cross-references at §10 ratification:**

- §1-§9 cumulative outputs (CD3 deliverable so far)
- §7.6 dial-calibration 3-tier policy first half (Signal 013)
- §8 coordinate-handoff contract (typed data contract; not HTTP API per Mayor 2026-05-08 elaboration)
- §2 conditional ratification gaps — ALL CLOSED: gap #1 at §8 + gap #2 at §3.5 + gap #3 first half at §7.6 + gap #3 second half at §10.4 + gap #4 at §9.4
- Signals 005 + 007 + 008-bis + 009 + 010 + 011 + 012 + 013 + 014 + 015 (CD3 cycle 1+2 cumulative chisel-by-pointer chain)
- CD2 RATIFIED 2026-05-07 (per Signal 012; cosmology-symmetry framing canonized at CD3 per Signal 014)
- CD4 RATIFIED 2026-05-07 (per Signal 005-bis at line 122; LiveRoom #20 V1 inventory)
- CD5 RATIFIED 2026-05-07 (per Signal 008-bis at line 158; CosmologyMarker added; performance-budget gate variable refresh rate)
- CD1 RATIFIED 2026-05-08 (per Signal 011 + Reframes 1+2+3 cumulative)
- Master plan §3.E Stream-E + §3.F Stream-F + §4 W1 SERIAL CD6 recombination + §5.1 per-Stream ownership + §5.9 lock-vs-stub + §6 cascade architecture + §6.1 validation-prompt + §8.7 State Layer + §8.13 session-end deliverables
- `feedback_prompt_tailoring_per_llm.md` (per-LLM-strength prompt tailoring for Stream-E cascade) + `feedback_validation_cascade_sequencing.md` (sequential validation: manual FIRST → Code synthesizes → triangulate) + `feedback_orchestration_contract.md` (cross-stream interface contracts as load-bearing structure)

---

## §11 — Mayor adjudication points consolidated

Consolidated record of all Mayor adjudications across §2-§10 (§1 RECAP-not-revisit; §11-§12 housekeeping). Each entry: section anchor + adjudication subject + status + closure context.

| Section | Adjudication subject | Status | Closure context |
| --- | --- | --- | --- |
| §1 | RECAP-not-revisit faithfulness (CD1 thesis + reference-archive verbatim citation; cosmology metaphor scaffold per Reframes 1+2+3 cumulative; register provisional) | RATIFIED Cycle 1 | CD1 RATIFIED 2026-05-08; thesis.md + reference-archive.md preserved verbatim; CD3 §1.2 amends-by-pointer per Signals 008 + 010 + 011 |
| §2.7 #1 | Pipeline shape (5-expression-layer pipeline serving the bar) | **RATIFIED FULL** | Was conditional on §3-§8 closing 4 gaps; all 4 gaps now closed → full ratification |
| §2.7 #2 | W4 production-runtime cascade trigger (Mapbox-vs-MapLibre) | DEFERRED to W4 ✓ | Defer-with-citation per don't-discard; W4 cascade with full §6.5 7-dim evidence |
| §2.7 #3 | Concept-decoupling discipline + concept-emergence escape hatch | RATIFIED | Mayor escape-hatch reserved; concept-emergence detection workflow operationalized at §9.4 |
| §3.7 #1 | Districts-not-blocks doctrine (Reframes 1+2+3 cumulative framing) | RATIFIED Cycle 2 | Cosmology positions = conceptual organizational positions per Reframe 2; cosmology surfaces in cartography through specific signals |
| §3.7 #2 | Article-node search index encoding pattern (multi-Terrace metadata) | RATIFIED Cycle 2 | Closes CD4 Signal 004 stub gap (article-node search index encoding for SearchPalette / CosmologyMarker / MetroMapMarker) |
| §3.7 #3 | District-boundary curation workflow (procgen-seed + Mayor-curation hybrid; 5 steps) | RATIFIED Cycle 2 | **CLOSES §2 conditional ratification gap #2** |
| §4.9 #1 | Editorial District character (editorial-civic-warm; mid-density / warm-white paper grain / editorial-warm contour-ink / Civic-Dante typeface / soft-edged district boundaries) | RATIFIED | V1 LOCKED at `Prime/Purgatorio/Districts-Terrace/Editorial-District/` |
| §4.9 #2 | Navigation entry points (perspective-per-surface mapping; DISpatch homepage = Editorial District perspective with unique magazine marker; article = magazine-corner perspective) | RATIFIED | Per Mayor 2026-05-07 unified-grid + zoom-level reframe (Signal 009) |
| §4.9 #3 | Atmospheric texture direction + forward-pointed-neighbor-buildings render discipline (5 visibility tiers) | RATIFIED | **Closes CD4 Signal 004 forward-pointed-neighbors stub gap at §4.7** |
| §5.8 #1 | Future-cosmology-layer sketch pattern (per-cosmology-layer 2-4 sentence sketches; muted-language preserved; per-cosmology arc-by-arc rollout) | RATIFIED | 7 cosmologies sketched (Empyrean / Paradiso = THE BAR / Eden / Purgatorio / Inferno / Pillars / Histories) |
| §6.5 #1 | Wine-red Inferno dispatch marker semantic role + persistence rules | RATIFIED | Wine-red = Inferno layer signal; pop-up character; persists across districts; cross-cuts cartographic-axis Terraces |
| §6.5 #2 | Lane-semantic encoding pattern (cosmology-symmetry framing per CD2 Decision 5 per Signal 014) | RATIFIED (chiseled per Signal 014 CD2 alignment) | Lane 1 Editorial / Lane 2 Institutional / Lane 3 Dispatch as 3 cosmology vectors meeting at Purgatorio surface; lanes = LOGICAL/SEMANTIC NOT visual-spatial per Mayor verbatim |
| §7.8 #1 | Atmospheric texture direction (P5.js paper grain + D3.js contour-ink + atmospheric chrome anchors `sky-high` / `sky-low` / `reflect` / `window-warm`) | RATIFIED | Path-cleared post CD2 alignment chisel per Signal 014 |
| §7.8 #2 | Dial-calibration implementation policy (3-tier: build-time + content-time + runtime event-routing via workflow automation per W4 cascade) | RATIFIED | **Closes §2 conditional ratification gap #3 first half**; per Signal 013; NO LLM agent runtime |
| §7.8 #3 | Pillars overlay decision (Option A V1 + Option D forward-arc per Signal 015) | RATIFIED | Option A: no overlay; bar-holding via institutional fixture; Option D: monuments-as-cartographic-allegory preserved per don't-discard for future DISpatch update build / Pillar-formalization arc / Prime platform-level expression |
| §8.6 #1 | Coordinate-handoff contract (typed data contract spanning build-time + render-time + runtime; NOT HTTP API per Mayor 2026-05-09 elaboration) | RATIFIED | **Closes §2 conditional ratification gap #1 (most load-bearing)**; CD3 owns interface-shape; CD4 + W4 + W5 bind values |
| §8.6 #2 | Ownership boundaries (CD3 / CD4 / W4 / W5) | RATIFIED | Per master plan §5.1 per-Stream ownership |
| §8.6 #3 | Drift detection + reconciliation pattern (static-time + render-time + cross-cycle) | RATIFIED | Per master plan §6.6 verification ladder Rows 4 + 5 + 22 + 25 |
| §9.5 #1 | Tool-ledger entry pattern (Stream-F append-only + 7-dim framework + research-cited per §6.1) | RATIFIED | Per master plan §3.F + §7 + §6.1 + Signal 006 |
| §9.5 #2 | Workflow automation tool entries (5-candidate evaluation set per Signal 013) | RATIFIED | n8n / Make / Relay / Gumloop / Zapier; W4 cascade adjudicates specific selection; n8n recommended for evaluation |
| §9.5 #3 | Concept-emergence detection workflow (7-step workflow; agents annotate, Mayor adjudicates) | RATIFIED | **Closes §2 conditional ratification gap #4**; per §2.7 + Signal 009 escape hatch operationalized |
| §10.6 #1 | CD3 concurrency-safety properties + 6 stub-interfaces (CD2 + CD4 + CD5 + W4 + W5 + CD6) | RATIFIED | Per master plan §5.1 + §5.9 + §8.7; append-only State Layer discipline preserved |
| §10.6 #2 | Stream-E validation cascade scope per CD3 (per-sub-phase coverage + per-LLM-strength prompt tailoring + sequential validation discipline) | RATIFIED | Per master plan §3.E + §6.1 + `feedback_prompt_tailoring_per_llm.md` + `feedback_validation_cascade_sequencing.md` |
| §10.6 #3 | Cross-stream coordination of dial-calibration (CD3 → CD4 → CD5 → W4 → W5 → CD6 + bidirectional aspect site-grid → cartography-grid feedback per Signal 009) | RATIFIED | **Closes §2 conditional ratification gap #3 second half**; all 4 gaps now closed |

**§2 conditional ratification gap closure summary:**

| Gap | Status | Closure section | Closure mechanism |
| --- | --- | --- | --- |
| #1 — Coordinate-handoff API (most load-bearing) | CLOSED | §8 | Typed data contract spec (build-time Zod + render-time TypeScript + runtime CSS custom properties + W4 workflow automation webhooks per Signal 013); ownership boundaries CD3 / CD4 / W4 / W5; drift detection per master plan §6.6 verification ladder Rows 4 + 5 + 22 + 25 |
| #2 — District-boundary curation workflow | CLOSED | §3.5 | Procgen-seed + Mayor-curation hybrid (5 steps; Mayor gates at Step 2 + Step 4; concept-emergence surface at Step 3) |
| #3 first half — Dial-calibration agent-implementation policy | CLOSED | §7.6 | 3-tier policy (Layer 1 build-time + Layer 2 content-time + Layer 3 runtime event-routing via workflow automation per W4 cascade); NO LLM agent runtime per Signal 013 |
| #3 second half — Cross-stream coordination | CLOSED | §10.4 | CD3 → CD4 → CD5 → W4 → W5 → CD6 per-Stream/Wave responsibilities + handoff data + bidirectional aspect site-grid → cartography-grid feedback per Signal 009 |
| #4 — Concept-emergence detection-and-surface-to-Mayor workflow | CLOSED | §9.4 | 7-step workflow (concept-iteration fire → archive landing → agent annotation → Stream-F append → Mayor browses → Stream-E cascade → Mayor elevation adjudication); agents annotate, Mayor adjudicates |

**§2 pipeline-shape conditional ratification → FULL RATIFICATION.** All four gaps closed; pipeline-shape ratification holds at full.

## §12 — Done criteria

Per dispatch brief Section 12 done criteria + master plan §6.6 verification ladder + §8.13 session-end deliverables. Cartography.md ratifies when ALL criteria pass.

| Criterion | Status | Evidence |
| --- | --- | --- |
| All 12 sections authored + Mayor-ratified per Mayor adjudication points (Section 11) | ✓ | §1-§12 authored; §11 consolidates 23 Mayor adjudication points across §2-§10 (all RATIFIED or DEFERRED-with-citation) |
| Token-stub interfaces to CD2 documented (wine-red Inferno marker; lane pigments; contour-ink hue shifts; atmospheric chrome anchors) | ✓ | §6.3 + §4.5 + §7.4 + §7.5 — all CD2-aligned per Signal 014 (Lane 1/2/3 cosmology-symmetry; `--lane-editorial-{step}` / `--lane-institutional-{step}` / `--lane-dispatch-{step}` / `--asset-cartography-pulse` / `--sky-high` / `--sky-low` / `--reflect` / `--window-warm`) |
| Spec-stub interfaces to CD4/CD5 documented (lane-semantic encoding; atmospheric layer discipline; coordinate-handoff contract; forward-pointed-neighbor render discipline; multi-Terrace article-node metadata) | ✓ | §10.2 stub-interfaces table; §6.3 + §4.5 + §3.4 + §4.7 + §8.2 |
| Stream-F tool-ledger entries drafted for the 9 named cartography tools + 5 workflow automation candidates | ✓ | §9.2 (9 cartography tools) + §9.3 (5 workflow automation candidates per Signal 013); Stream-F confirms append-or-escalate per cascade |
| Stream-E validation cascade brief synthesized + material findings folded | ✓ | §10.3 per-sub-phase Stream-E cascade scope; per-LLM-strength prompt tailoring per `feedback_prompt_tailoring_per_llm.md`; sequential validation discipline per `feedback_validation_cascade_sequencing.md` |
| Concurrency-safety properties confirmed | ✓ | §10.2 (CD3 owns / reads / 6 stub-interfaces / append-only State Layer discipline) |
| Editorial District scaffold concrete enough to feed CD4 grid + CD5 motion specs without further CD3 re-opens | ✓ | §4 (V1 LOCKED Editorial District at `Prime/Purgatorio/Districts-Terrace/Editorial-District/`; character + navigation + lane semantics per CD2-aligned framing per Signal 014 + atmospheric texture + forward-pointed-neighbor render discipline) |
| Future-Terrace district sketches provisional + muted-language preserved per §1.1 (no specific district-name lockdowns beyond Editorial District) | ✓ | §5 7-cosmology-layer sketches (per Reframes 1+2+3 cumulative); per-cosmology arc-by-arc rollout preserved |
| All §2 conditional ratification gaps closed | ✓ | Gap #1 at §8; gap #2 at §3.5; gap #3 first half at §7.6 per Signal 013; gap #3 second half at §10.4; gap #4 at §9.4 |
| Mayor ratifies | ✓ | Mayor ratifications across §3-§10 cumulative; final §10-§12 ratification per this section |
| Repo Code commits per Invariant #3 (W1 cluster commit at CD6 SERIAL recombination per dispatch operating-model) | PENDING — W1 cluster commit at CD6 close | Wave-gate clustering per Mayor 2026-05-08 dispatch operating-model; W1 cluster commit covers all CD-through-CD6 landings |
| Cadence verification metric tie-in (per §1.6.1) | ✓ | CD3 contributes 1 of 6 W1 cascade cycles (Stream-E cascade scope per §10.3); scaffolds per-component-commit fan-out for W3 (atmospheric texture component / cartography overlay component / dispatch-marker component anticipation) |

**Done criteria — ALL PASS.** Cartography.md ratifies for V1 V1 dev-diary microsite scope. Repo Code commits at W1 cluster commit per dispatch operating-model (deferred from per-CD per Mayor 2026-05-08 Wave-gate clustering pattern shift).

**Cumulative chisel-by-pointer signal chain (canon-recoverable for downstream Streams + future-arc reference):**

- Signal 005 (CD1 Decision 9 "static-CSV" → "static CSS + plain SVG" clarification)
- Signal 006 (Master plan §6.5 5-dim → 7-dim framework split: Cost → Monetary cost + Complexity/failure points)
- Signal 007 (Bar-is-foundation reframe; principal-level standard IS the foundation; expressions ride on top)
- Signal 008 (Cosmology Reframe 1: 7-position cosmology + Histories as base layer; ordering flipped top-down)
- Signal 009 (Unified-grid + zoom-level reframe + concept-emergence escape hatch + grid-dances-around-components)
- Signal 010 (Cosmology Reframe 2: cosmology positions are CONCEPTUAL not 1:1 cartographic; 7 Purgatorio Terraces named; cosmology surfaces in cartography through specific signals)
- Signal 011 (Cosmology Reframe 3: cosmology IS top-level folder tree of Prime repo; **Paradiso = THE BAR**)
- Signal 012 (CD2 Color Token System RATIFIED; cosmology-symmetry framing; DP-Q3 + DP-Q4 + DP-Q11 closed)
- Signal 013 (§7.6 dial-calibration "agent-implementation policy" framing conflation correction; Layer 3 = workflow automation per W4 cascade; Mayor's value canonized: NO LLM cron-loop)
- Signal 014 (CD2 alignment chisel; §6.3 + §4.5 cosmology-symmetry framing per CD2 Decision 5; lanes = LOGICAL/SEMANTIC NOT visual-spatial; Mayor verbatim canonized)
- Signal 015 (Pillars-as-monuments forward-arc framing; Option D preserved per don't-discard; Mayor anti-pattern: tokens-of-existence ≠ literal-mapping)

**Output handoff per dispatch brief:**

1. CD3 instance writes file at `v1-dev-diary-microsite/representation/visual-system/cartography.md` ✓ (this document)
2. CD3 instance returns SHORT summary message to Mayor (file path / line count / key choices closed / open items deferred / flags) — surfaced post §11+§12 close
3. Repo Code commits per Invariant #3 — at W1 cluster commit (CD6 SERIAL recombination per dispatch operating-model)
4. Conductor reads State Layer + surfaces CD3 closure in next status report
5. Tracker updates Linear PCP-162 status

---

*CD3 Cycle 2 final ratification 2026-05-09. cartography.md scaffold-in-progress → RATIFIED-V1. All 12 sections authored + Mayor-ratified; all 4 §2 conditional gaps closed; CD2 + CD4 + CD5 cross-stream alignment via Signals 005 + 007 + 008-bis + 009 + 010 + 011 + 012 + 013 + 014 + 015. CD6 SERIAL recombination next; W2-W8 implementation downstream.*
