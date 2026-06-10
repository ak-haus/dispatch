---artifact: cd4-component-spec
component: VirgilChat
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C7 digital-native + print-derived simultaneously (Virgil = Dante's guide; thematic coupling to cosmology) + C5 META × NARRATIVE (chat carries both registers per turn) + C1 typeface containment (Nav chrome + Meta-code for code-segments + Body for prose-segments)
mode-crossing: porous-gradient — chat panel is opt-in per master plan §11 Q8 production-feature; available on reception (homepage); article-surface availability deferred (W3 may surface; not V1 ship default; sanctuary preservation discipline)
upstream-cascade:
  - CD1 thesis — §2 Concept 7 walking metaphor (Virgil as Dante's guide; thematic coupling) + §3 marriage-of-registers + Mayor 2026-05-08 "Virgil chatbot" naming
  - CD2 color tokens (tokens.color.lane.* per voice-turn + tokens.color.chrome.* + tokens.color.atmosphere.*)
  - CD3 cartography (cartography.district.* — chat may suggest district navigation per turn)
  - CD5 motion (chat-panel motion register; turn-by-turn animation; reduced-motion fallback)
  - master plan §11 Q8 (production opt-in chat agent feature framing)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: VirgilChat — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# VirgilChat — Spec scaffold

*Renamed from ChatPanel per Mayor 2026-05-08 Concept 7 naming.* In-page Virgil chatbot — the Inferno-guide for navigating DISpatch. Per CD1 Concept 7 walking metaphor: Virgil is Dante's guide through the Inferno; the chatbot named after the guide carries cosmological-thematic coupling, not arbitrary "ChatPanel" framing. Per master plan §11 Q8: production opt-in feature; not load-bearing for V1 ship but scaffolded so opt-in users get principal-grade chat surface.

## Field 1 — Structure

- **Top-level element role.** `<aside role="complementary" aria-labelledby="virgil-chat-title">` (or `<dialog role="dialog">` if W3 ratifies modal pattern); chat panel composition
- **Slot composition.** Composed of:
  - Header — "Virgil" identity + close-toggle + minimize-toggle
  - Conversation region — `<ol role="log" aria-live="polite">` of turn `<li>`s
  - Per-turn composition:
    - Turn-author indicator (Reader OR Virgil; Meta-code typography for indicator)
    - Turn prose (Body typography for prose; Meta-code for code-segments inline)
    - Turn metadata (timestamp; Meta-code typography)
    - Optional cited-article links (per turn; Nav typography)
    - Optional MetroMapMarker compact-variant if turn references cosmological-position
  - Composer region — `<textarea>` input + send button
  - Footer — "Virgil reads what you read" disclosure (production opt-in framing per §11 Q8 transparency)
- **Three-layer destination.** `/components/patterns` — compound; multi-register turn-based UI
- **Mode-crossing declaration.** Porous-gradient. Chat panel is a global affordance (opt-in per §11 Q8); trigger HIDDEN by default on article surfaces per article-as-sanctuary discipline; user may toggle availability per surface (W3 ratifies user-preference persistence). Currently inclined: panel available on reception by default; opt-in for article surfaces; user-toggle persists per session.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `default-floating` | reception default | floating panel; user-positioned; minimize/close affordances |
| `expanded` | user-toggled OR initial open | full conversation visible; composer focused |
| `minimized` | user-toggled minimize | header bar only; click expands |
| `mobile-bottom-sheet` | mobile breakpoint | bottom-sheet pattern |
| `closed` | user-toggled close OR pre-opt-in | panel not rendered; trigger button only (in SiteNav or floating) |

## Field 3 — States

- **Interaction states.** Per-turn cited-article link `idle` / `hover` / `focus` / `active`; composer textarea `idle` / `focus`; send button `idle` / `hover` / `focus` / `active` / `disabled` (when composer empty); minimize/close toggles
- **Lifecycle states.** `closed` / `opening` / `open` / `streaming-turn` (Virgil response streaming) / `awaiting-input` / `error` (LLM API failure)

Keyboard navigation: trigger button focusable; cmd-/ (or per Mayor preference) opens panel; escape closes; tab through composer + send; up-arrow in composer recalls last user-message (W3 may surface).

## Field 4 — Accessibility

- **ARIA.** `<aside role="complementary" aria-labelledby="virgil-chat-title">` OR `<dialog role="dialog" aria-modal>` per W3; `<ol role="log" aria-live="polite" aria-relevant="additions">` for conversation (NEW Virgil turns announced via aria-live politeness rate-limited to avoid overwhelming reader); composer `<textarea aria-label="Ask Virgil about DISpatch">`; per-turn `<li>` with author indication
- **Keyboard navigation.** Trigger opens panel; tab through composer + send; arrow-keys within conversation (W3 ratifies); escape closes panel
- **Screen-reader behavior.** Aside/dialog landmark announced; new Virgil turns announced via aria-live politeness; per-turn announces author + prose; cited-article links announce link-text + URL
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: turn prose (Body) + turn metadata (Meta-code) + author indicator (Meta-code) on `tokens.color.atmosphere.sky-low`; per-author lane pigment for turn-distinction (Reader vs Virgil); CD2 ratifies threshold values
- **Reduced-motion contract.** Turn-by-turn animation removed (instant turn-arrival); panel open/close animations removed; streaming-typing animation removed (full turn appears at completion)

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; motion is per-turn animation only (chat-bubble pattern; restrained per CD1 Concept 4 atmospheric-not-spectacle discipline)
- **Per-state motion.** Panel `closed → open` slide-in (~250ms ease-out); per-turn slide-in (~200ms ease-out); streaming-typing animation (~16ms cadence per character per single-rAF discipline; OR token-batched if model streams tokens not characters); send-button `idle → hover` color shift (~150ms)
- **Reduced-motion fallback.** All motion removed; turns appear instantly at completion (no streaming animation); panel open/close instant
- **Atmospheric chrome interaction.** Chat panel substrate consumes `tokens.color.atmosphere.window-warm` (warm-paper register; printed-conversation feel); backdrop minimal (panel is non-modal floating)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; conversation history preserved across theme transitions
- **Per-theme pairing.** Per-author lane pigments + turn prose + turn metadata + composer chrome + atmospheric substrate per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.lane.reader.fill` + `tokens.color.lane.virgil.fill` (per-author turn-distinction; CD2 ratifies whether Virgil gets dedicated lane pigment or inherits dispatch-red); `tokens.color.text.primary` (turn prose); `tokens.color.text.meta` (turn metadata + author indicator); `tokens.color.chrome.text` (composer + send button chrome)
- **Typography tokens.** `tokens.type.meta.500` for author indicator + timestamp + composer-shortcut hints (Meta-code slot per CD1 Concept 1 + chat-as-terminal-search register); `tokens.type.body.400` for turn prose (Body slot for prose register); `tokens.type.meta.500` for code-segments inline in turns; `tokens.type.nav.500` for cited-article links (Nav slot)
- **Spacing tokens.** `tokens.space.scale.<n>` for panel padding + per-turn spacing + composer region + send button
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` substrate
- **Cartography tokens.** `cartography.district.<name>` if Virgil suggests district navigation per turn; `cartography.marker.<role>` if MetroMapMarker compact-variant rendered per turn

## Field 8 — Storybook 9 contract

- **Story names.** `Closed` / `DefaultFloating` / `Expanded` / `Minimized` / `MobileBottomSheet` / `Streaming` / `Error` / `WithCitedArticles` / `WithMetroMapMarker` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `panelState` (enum) + `conversation` (array; default fixture with mix of Reader + Virgil turns) + `streamingTurn` (object; in-progress Virgil turn) + `reducedMotion` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + LLM-emulator decorator (mocks chat API streaming responses) + child-component decorators (MetroMapMarker compact-variant + cited-article fixtures)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations; aria-live politeness rate-limit + focus management load-bearing

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Per-author lane + text + chrome + atmospheric tokens; CD2 ratifies values + APCA pairings + Virgil-specific lane pigment decision
- **CD3 dependency.** District navigation suggestions per turn; CD3 ratifies cartography encoding
- **CD5 dependency (load-bearing).** Streaming-typing cadence + per-turn animation + reduced-motion fallback; CD5 ratifies discipline; streaming-typing motion is the highest-risk for compositor budget per Lighthouse CI Row 13
- **§11 Q8 production-feature framing.** Virgil is opt-in production feature; V1 ships scaffold + reception default availability; user-preference for article-surface availability persists per session. Per Mayor confirms in W3 production decision.
- **Rename audit (ChatPanel → VirgilChat).** Per CD1 Concept 7 + Mayor 2026-05-08 "Virgil chatbot" naming. Default-14 brief used "ChatPanel"; Mayor-coined rename follows ratification. See catalogue §3.3 audit trail.
- **META × NARRATIVE register marriage in single component.** VirgilChat hosts BOTH registers per turn — Meta-code metadata + Body prose + Meta-code code-segments inline IS the marriage of registers per CD1 Concept 5. The marriage is structural; reader experiences turn-by-turn type-voice shift as wayfinding (Meta-code = technical-event register; Body = prose-conversation register).
- **LiveRoom relationship (deferred to W3+).** LiveRoom (deferred per catalogue §3.2) shares some compositional patterns with VirgilChat (multi-author turn-based UI; live update register). When LiveRoom reactivates at future-Building scope, VirgilChat composition pattern may inform LiveRoom spec.
