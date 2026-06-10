---artifact: cd4-component-spec
component: LiveRoom
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 walking metaphor (offices-window — co-working presence) + C5 META × NARRATIVE (presence carries both registers; META for activity events + NARRATIVE for ambient prose) + C1 typeface containment (Meta-code for activity + Body for prose-segments)
mode-crossing: reception-primary — homepage offices-window for live co-working presence; article-surface availability DEFERRED per CD1 Concept 7 article-as-sanctuary discipline (W3 may surface optionally for opt-in users; not V1 ship default)
upstream-cascade:
  - CD1 thesis — §2 Concept 7 walking metaphor (reception ↔ offices ↔ missives; LiveRoom IS an offices-window) + §3 marriage-of-registers + Mayor 2026-05-08 ratification "build a spec that can then be refactored by W3"
  - CD2 color tokens (tokens.color.lane.* per author + tokens.color.chrome.* + tokens.color.atmosphere.*)
  - CD3 cartography (cartography.district.* — room may surface district-context per active author)
  - CD5 motion (presence motion register; very-subtle per CD1 Concept 4 atmospheric-not-spectacle; reduced-motion fallback to static-presence-list)
  - master plan §11 Q8 (production opt-in feature framing — Mayor confirms in W3)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: LiveRoom — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# LiveRoom — Spec scaffold

Live-coworking room surface — the offices-window where multiple authors (Mayor + AI agents-of-record + future citizens) work together visibly. Per CD1 Concept 7 walking metaphor: the homepage glossary lets the reader peek into the offices; LiveRoom IS the structured peek — who is in which office, what they are working on, what register they are working in. Per Mayor 2026-05-08 ratification: spec scaffold lands at CD4 so W3 can refactor against it (semantic-componentization adoption test-case anchor) + future-Building inheritance pattern is preserved before V1 launch closes.

## Field 1 — Structure

- **Top-level element role.** `<aside role="complementary" aria-labelledby="live-room-title">` (or `<dialog role="dialog">` if W3 ratifies modal pattern); presence panel composition
- **Slot composition.** Composed of:
  - Header — "Live in the offices" + minimize/close affordances + active-author count
  - Presence region — `<ul role="list">` of active-author `<li>`s
  - Per-author composition:
    - Author identity (handle + ai_role per voice/lane-schema.md; Meta-code typography)
    - Activity indicator (idle / writing / committing / reviewing — Meta-code typography for state-label; subtle pulse for live state)
    - Optional activity-preview prose (Body typography; one-line snapshot of what the author is working on; ambient — never breaks confidentiality boundaries)
    - Optional cosmology-position indicator (which district / building / cosmology layer the author is operating in)
    - Lane-pigment per-author for register-distinction (per CD2 lane pigments)
  - Optional join-room affordance (DEFERRED to W3 production opt-in per §11 Q8; placeholder slot for V1 spec scaffold)
  - Footer — "Activity is voluntarily-disclosed by the author" disclosure (production opt-in framing per §11 Q8 transparency; mirrors VirgilChat's "Virgil reads what you read" pattern)
- **Three-layer destination.** `/components/patterns` — compound; multi-author presence UI; shares compositional DNA with VirgilChat (turn-based) and LiveTicker (live updates) but distinct role contract (co-working presence, not conversation OR event-feed)
- **Mode-crossing declaration.** Reception-primary at V1 ship. Renders on homepage as offices-window. Article-surface availability DEFERRED per article-as-sanctuary discipline (CD1 Concept 7); W3 may surface optionally as opt-in user-preference (similar to VirgilChat's article-surface deferral); not V1 ship default. Per CD1 Concept 7 walking metaphor: the offices-window IS reception's view; article surfaces are sanctuaries (the missive itself).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default-floating` | reception default | floating panel; user-positioned; minimize/close affordances |
| `expanded-room` | user-toggled OR initial open | full presence region visible; per-author activity-preview rendered |
| `minimized` | user-toggled minimize | header bar only with active-author count badge; click expands |
| `mobile-bottom-sheet` | mobile breakpoint | bottom-sheet pattern |
| `closed` | user-toggled close OR pre-opt-in | panel not rendered; trigger button only (in SiteNav or floating) |
| `empty-room` | no active authors at moment | quiet placeholder ("the offices are quiet — check back later") with subdued visual weight |
| `single-author-mayor` | only Mayor active (common at early V1) | full presence panel rendered with single-author display; "Mayor is in the editorial office" |

## Field 3 — States

- **Interaction states.** Per-author `idle` / `hover` (author-card highlights for read-state) / `focus` / `active` (clickable to navigate to author-cosmology-position OR author-bio surface — W3 ratifies); minimize/close toggles + optional join-room button
- **Lifecycle states.** `closed` / `opening` / `open` / `presence-streaming` (live presence updates active; new authors arrive / leave) / `error` (presence-feed websocket / fetch failure — fallback to static-presence-list rendering OR `empty-room` variant)

Keyboard navigation: trigger button focusable; tab through visible authors; enter on author-card navigates per W3-ratified target; escape closes panel.

## Field 4 — Accessibility

- **ARIA.** `<aside role="complementary" aria-labelledby="live-room-title">` OR `<dialog role="dialog" aria-modal>` per W3; `<ul role="list" aria-live="polite" aria-relevant="additions removals">` for presence region (NEW author arrivals + departures announced via aria-live politeness rate-limited); per-author `<li>` with author-handle aria-label; activity-indicator `<span role="status" aria-label="<author> is <activity>">`
- **Keyboard navigation.** Trigger opens panel; tab through visible authors; arrow-keys within presence region (W3 ratifies); escape closes panel
- **Screen-reader behavior.** Aside/dialog landmark announced; presence changes announced via aria-live politeness; per-author announces handle + ai_role + activity-state; activity-preview prose read on focus
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: author-handle (Meta-code) + activity-state (Meta-code) + activity-preview (Body) on `tokens.color.atmosphere.sky-low`; per-author lane pigment for distinction; CD2 ratifies threshold values
- **Reduced-motion contract.** Activity pulse animation removed; new-author slide-in animation removed (instant arrival); panel open/close animations removed; static presence rendering

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; presence motion is the LiveRoom's signature visual identity (per CD1 Concept 7 walking metaphor — the offices-window feels alive); restraint per CD1 Concept 4 atmospheric-not-spectacle (very-subtle pulse; never demanding attention)
- **Per-state motion.** Panel `closed → open` slide-in (~250ms ease-out); per-author `idle → arriving` slide-in (~200ms ease-out); activity-indicator subtle pulse for active states (writing / committing — very-slow; ~2s cadence; per CD1 Concept 4 motion-coupling rule applied as ambient-drift-on-active-elements); per-author `idle → departing` fade-out (~250ms ease-in); minimize-toggle `idle → hover` color shift (~150ms)
- **Reduced-motion fallback.** All motion removed; instant arrival/departure; no pulse; presence rendered as static list
- **Atmospheric chrome interaction.** LiveRoom panel substrate consumes `tokens.color.atmosphere.window-warm` (warm-paper register; printed-presence-card feel; consistent with VirgilChat substrate per shared compositional DNA); activity-pulse color consumes `tokens.color.atmosphere.window-warm` for warmth-tinted glow (subtle; "lights in the offices")

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; presence list preserved across theme transitions
- **Per-theme pairing.** Per-author lane pigments + author-handle text + activity-state text + activity-preview text + atmospheric substrate per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.lane.<author-lane>.fill` per author (CD2 ratifies whether per-author lane pigments inherit from voice/lane-schema.md OR are dedicated LiveRoom-author lanes); `tokens.color.text.meta` (author-handle + activity-state + activity-preview chrome); `tokens.color.text.primary` (activity-preview prose); `tokens.color.chrome.text` (panel chrome); `tokens.color.atmosphere.window-warm` (activity-pulse)
- **Typography tokens.** `tokens.type.meta.500` for author-handle + activity-state + activity-cadence labels (Meta-code slot per CD1 Concept 1 + offices-window-as-terminal-window register); `tokens.type.body.400` for activity-preview prose (Body slot for prose register); `tokens.type.nav.500` for panel header + minimize/close affordances (Nav slot); `tokens.type.meta.400` for footer disclosure
- **Spacing tokens.** `tokens.space.scale.<n>` for panel padding + per-author spacing + per-author internal spacing (handle / activity-state / preview)
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` substrate; activity-pulse warmth
- **Cartography tokens.** `cartography.district.<name>` for per-author district indicator; `cartography.layer.<cosmology>` for per-author cosmology-position indicator (which layer the author is operating in)

## Field 8 — Storybook 9 contract

- **Story names.** `Closed` / `DefaultFloating` / `ExpandedRoom` / `Minimized` / `MobileBottomSheet` / `EmptyRoom` / `SingleAuthorMayor` / `MultiAuthor` / `WithActivityPreviews` / `PresenceStreaming` / `Error` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `panelState` (enum) + `presence` (array; default fixture with mix of Mayor + AI agents-of-record + optional citizen-future-fixture) + `reducedMotion` (bool) + `lifecycleState` (enum: `opening | open | presence-streaming | error`)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate (warm-paper) + presence-feed-emulator decorator (mocks live presence updates) + voice-library-decorator (provides DLDS author-attribution fixtures from voice/lane-schema.md)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations; aria-live politeness rate-limit + focus management load-bearing
- Row 13 (Lighthouse CI motion-performance budget) — LiveRoom presence-pulse motion consumes compositor budget; W3 implementation gate validates Lighthouse CI metrics include LiveRoom presence-pulse in benchmark; reduced-motion fallback is the relief valve

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Per-author lane + meta + chrome + atmospheric tokens; CD2 ratifies values + APCA pairings + per-author lane discipline (inherit from voice/lane-schema.md OR dedicated LiveRoom-author lanes)
- **CD3 dependency.** Per-author district + cosmology-position indicators; CD3 ratifies cartography encoding
- **CD5 dependency.** Activity-pulse cadence + arrival/departure motion + reduced-motion fallback; CD5 ratifies discipline; presence-pulse register may share discipline with LiveTicker per-entry-arrival flicker + CartographyCanvas ambient flicker per CD1 thesis §4.4 dial principle (single flicker discipline applied across three components)
- **§11 Q8 production-feature framing.** LiveRoom is opt-in production feature parallel to VirgilChat. V1 ships scaffold + reception default availability for empty-room/single-author-Mayor variants (low-risk surface to validate spec contract). Multi-citizen presence + join-room interactivity DEFERRED to production opt-in per Mayor confirms in W3.
- **VirgilChat compositional DNA shared.** Both LiveRoom and VirgilChat are multi-author / live-update register components. Both consume Meta-code + Body typography per turn / per author; both consume warm-paper atmospheric substrate; both have aria-live politeness disciplines. W3 implementation may extract shared composition primitives (e.g., `LivePresenceList` / `MultiAuthorTurnFrame`) — per Mayor 2026-05-08 framing: "if VirgilChat needs to do such an astounding amount of things after V1, we could just pull VirgilChat, split it up into component parts, and then push it up." LiveRoom is the second instance of this pattern; shared primitives become discoverable when two instances exist.
- **LiveTicker compositional DNA shared.** Both LiveRoom and LiveTicker carry live-update register; both consume warm-paper substrate; both render flicker per CD1 thesis §4.4 dial principle. LiveTicker = event-feed (commits / infra / agent-activity); LiveRoom = presence-feed (who is active right now). Distinct role contracts; complementary on homepage; share flicker discipline.
- **Semantic-componentization adoption test-case anchor.** Per Mayor 2026-05-08 ratification framing: "If it does help with semantic-componentization adoption, I think we at least build a spec that can then be refactored by W3." LiveRoom's compositional structure (multi-author / live-update / presence-pulse / lane-pigment-per-author / cosmology-position-per-author) is a strong test-case for semantic-componentization adoption decision per master plan §3.A descriptive consideration framing — the spec encodes brand typographic rules + spatial relationships + accessibility standards as machine-readable contract; W3 implementation can validate semantic-componentization patterns against this anchor. CD4 catalogue §7 Mayor adjudication point (W3 deferred) gains a concrete artifact to anchor against.
- **Future-Building inheritance discipline.** Per master plan §1.7 reframe 2.12 (mod-able + upgradable + downgradable) + §9 W7 brand-to-buildings handoff: future Buildings (e.g., Prime nightlife district / Prime studio district) may surface co-working room patterns. LiveRoom V1 spec scaffolds the inheritance pattern so future Buildings can adopt-and-mod without re-deriving from scratch. Per Mayor 2026-05-08 framing: "we create it so it does not fall through the cracks or get forgotten." V1 inheritance preserved structurally; future Building Mayor-gated decisions per §1.3 5-narrow-certification gates.
- **Granular-reversion discipline (Mayor 2026-05-08).** LiveRoom is a distinct component, NOT folded into VirgilChat or LiveTicker, because granular reversion requires component-level boundaries — at commit/merge time, LiveRoom reverts independently if regression surfaces; collapsing into composite would lose this property at the moment it matters (post-deploy regression triage).
