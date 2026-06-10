---artifact: cd4-component-spec
component: Footnote
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C5 multi-voice typography (footnote register marries Body slot for prose + Meta-code slot for citation reference) + C1 typeface containment + C7 article-as-sanctuary
mode-crossing: article-only — does NOT cross to reception per CD1 Concept 7 sanctuary affordance
upstream-cascade:
  - CD1 thesis — §2 Concept 1 5-typeface containment + §2 Concept 5 multi-voice typography
  - CD2 color tokens (tokens.color.text.* + tokens.color.chrome.*)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: Footnote — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Footnote — Spec scaffold

In-text reference + sidebar pop. The footnote-marker (citation reference) sits inline; clicking/tapping pops the footnote prose into a sidebar (or popover on mobile). Per CD1 Concept 5: footnotes participate in the multi-voice typographic system — citation reference uses Meta-code typography (technical-grotesque silhouette); footnote prose uses Body typography (long-form sanctuary register).

## Field 1 — Structure

- **Top-level element role.** Two-part composition:
  - **Inline marker.** `<a href="#footnote-N" id="footnote-ref-N" role="doc-noteref">` wrapping `<sup>N</sup>` (or per-publication numbering convention)
  - **Sidebar popover OR endnote.** `<aside role="doc-footnote" id="footnote-N" aria-labelledby="footnote-ref-N">` containing footnote prose + back-link to ref
- **Slot composition.** Composed of:
  - Marker (citation reference; Meta-code typography)
  - Prose (footnote content; Body typography)
  - Optional back-link to inline reference (Nav typography for navigation chrome)
- **Three-layer destination.** `/components/custom` — Prime extension; in-text + sidebar coordination
- **Mode-crossing declaration.** Article-only. Does NOT render on reception (reception has no footnotes); per CD1 Concept 7 sanctuary affordance.

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `sidebar-popover` (currently inclined desktop) | desktop breakpoint | inline marker; clicking pops footnote into right sidebar margin |
| `mobile-bottom-sheet` | mobile breakpoint | inline marker; tap opens footnote in bottom-sheet |
| `endnote` (alternative; per Mayor adjudication) | per article preference | footnotes collected at article end; marker links to endnote |
| `inline-aside` (alternative) | per article preference | footnote renders inline in flow as an aside; no popover |

## Field 3 — States

- **Interaction states.** Marker: `idle` / `hover` / `focus` / `active`; footnote sidebar/sheet: `hidden` / `opening` / `open` / `closing`
- **Lifecycle states.** N/A (static prose; no async lifecycle)

Keyboard navigation: tab to marker; enter opens footnote sidebar/sheet; tab into sidebar to navigate footnote content; escape closes sidebar; tab past sidebar returns to article flow.

## Field 4 — Accessibility

- **ARIA.** Marker `role="doc-noteref"` + `aria-describedby="footnote-N"` + `aria-expanded` reflecting sidebar state; footnote container `role="doc-footnote"` + `aria-labelledby="footnote-ref-N"`; back-link to ref with semantic `<a href="#footnote-ref-N">`
- **Keyboard navigation.** Tab to marker → enter opens sidebar → tab into sidebar → escape closes sidebar → focus returns to marker
- **Screen-reader behavior.** Marker announces "Footnote N, link"; footnote prose read inline when expanded OR in dedicated landmark when sidebar/sheet variant; back-link announces "Return to footnote reference, link"
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: marker `tokens.color.text.accent` on `tokens.color.atmosphere.sky-low`; footnote prose `tokens.color.text.primary` on `tokens.color.atmosphere.sky-low`; CD2 ratifies threshold values
- **Reduced-motion contract.** Sidebar/sheet open/close animations removed; instant appearance-toggle

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion
- **Per-state motion.** Sidebar `hidden → open` slide-in (~200ms ease-out); mobile bottom-sheet `hidden → open` slide-up (~250ms ease-out); marker `idle → hover` color shift (~150ms)
- **Reduced-motion fallback.** All motion removed; instant appearance-toggle
- **Atmospheric chrome interaction.** Sidebar/sheet background consumes `tokens.color.atmosphere.window-warm` (warm-paper margin substrate)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens
- **Per-theme pairing.** Marker color + footnote prose color + sidebar substrate color per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.text.accent` (marker); `tokens.color.text.primary` (footnote prose); `tokens.color.chrome.text` (back-link); `tokens.color.atmosphere.window-warm` (sidebar substrate)
- **Typography tokens.** `tokens.type.meta.500` for marker (Meta-code slot, component-locked — citation reference); `tokens.type.body.400` for footnote prose (Body slot, DISpatch-locked — long-form sanctuary register); `tokens.type.nav.400` for back-link (Nav slot)
- **Spacing tokens.** `tokens.space.scale.<n>` for sidebar padding + footnote-content spacing
- **Atmospheric chrome tokens.** `tokens.color.atmosphere.window-warm` for sidebar/sheet substrate
- **Cartography tokens.** N/A — no cartography coupling

## Field 8 — Storybook 9 contract

- **Story names.** `SidebarPopoverDesktop` / `MobileBottomSheet` / `Endnote` / `InlineAside` / `MarkerHover` / `SidebarOpen` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `markerNumber` (number) + `footnoteContent` (string; default fixture) + `reducedMotion` (bool) + `sidebarOpen` (bool)
- **Decorators.** Theme-provider + reduced-motion-media-query + atmospheric-substrate + breakpoint-emulator + article-flow decorator (renders marker inline in body-text fixture)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Text + chrome + atmospheric tokens; CD2 ratifies values + APCA pairings
- **CD5 dependency.** Sidebar/sheet motion durations + ease curves; CD5 ratifies
- **Multi-voice typography integration.** Per CD1 Concept 5: footnotes participate in multi-voice typography. Marker (Meta-code) + prose (Body) + back-link (Nav) = three-typeface-voice composition within one component. The composition is structural (containment governance enforced at token level); the reader experiences the type-voice shift as wayfinding (Meta-code = technical-citation register; Body = long-form sanctuary register).
