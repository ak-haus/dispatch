---artifact: cd4-component-spec
component: CodeBlock + CopyButton (compound)
authored: W1 Stream-A CD4 (PCP-163)
authored-date: 2026-05-08
status: active
template-version: 1.0 (CD4 7-field spec contract)
universal-concepts: C1 typeface containment (Meta-code slot, component-locked) + C5 META × NARRATIVE distinction (META content native to code surface)
mode-crossing: article-only primary — appears in article body content; condensed mirror on reception (LiveTicker may render compact code-block snippets per offices-window framing)
upstream-cascade:
  - CD1 thesis — §2 Concept 1 5-typeface containment (Meta-code slot) + §2 Concept 5 META × NARRATIVE register marriage
  - CD2 color tokens (tokens.color.lane.*; tokens.color.code.* — syntax highlighting)
verifies-against:
  - master plan §6.6 Row 2 (component spec contract)
  - master plan §6.6 Row 5 (component visual regression — Chromatic snapshots in W3+)
  - master plan §6.6 Row 6 (accessibility — axe-core zero violations in W3+)
title: CodeBlock + CopyButton — Spec scaffold
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# CodeBlock + CopyButton — Spec scaffold

Compound: code surface + copy affordance. Per CD1 Concept 1 + Concept 5: CodeBlock IS where META register lives natively. Per CD1 thesis §3 marriage-of-registers: "rip through the screen via beautifully composed boxes (not effects); peer-behind-the-curtain content (DLDS panels, JSON/YAML markup, code blocks, terminal-search, live commit-tickers) feels native, not laminated." The compound is one spec because CopyButton is contextually coupled to CodeBlock; W3 implementation may split or keep compound.

## Field 1 — Structure

- **Top-level element role.** `<figure aria-labelledby="code-caption-N">` containing `<pre>` + `<code>` + CopyButton overlay/adjacent
- **Slot composition.** Composed of:
  - `<pre><code>` rendering code with optional syntax-highlighting (W3 ratifies highlighter library — currently inclined: shiki or rehype-pretty-code per master plan §3.B Astro patterns)
  - Optional `<figcaption>` for code-caption (line-numbers, language label, file-path, etc.)
  - CopyButton: `<button aria-label="Copy code to clipboard">` overlaid top-right OR adjacent
  - Optional `diff` indicators (additions / deletions / context) for `diff` variant
- **Three-layer destination.** `/components/patterns` — compound business composition
- **Mode-crossing declaration.** Article-only primary (article body content). LiveTicker on reception may render compact code-block snippets as part of "what's happening in the offices" preview (Mayor adjudicates at W3 whether this constitutes the same component or LiveTicker uses an inline compact-code variant of CodeBlock).

## Field 2 — Variants

| Variant | Trigger | Behavior |
|---|---|---|
| `static` | default | code rendered with syntax-highlighting; CopyButton enabled |
| `runnable` | per article opt-in | adds Run button + output panel (W3 implementation; possibly via Stackblitz / CodeSandbox / Sandpack) |
| `diff` | code-as-diff | renders additions / deletions / context with per-line indicators |
| `compact-livesnippet` | rendered in LiveTicker on reception | small code snippet without line-numbers; CopyButton optional |

## Field 3 — States

- **Interaction states.** CopyButton: `idle` / `hover` / `focus` / `active` / `copied` (transient post-copy success state ~2s) / `error` (clipboard API failure)
- **Lifecycle states.** CodeBlock: `loading` (rare; if dynamic code-load) / `loaded` / `error` (rare; syntax-highlight failure — fallback to plain `<pre>`)

Keyboard navigation: tab to CopyButton (CodeBlock content itself is non-focusable in `<pre>` semantics); enter triggers copy; focus stays on button to display `copied` state visually + announce to screen readers.

## Field 4 — Accessibility

- **ARIA.** `<figure>` with `aria-labelledby` referencing caption; `<button aria-label="Copy code to clipboard">` with `aria-live="polite"` for `copied` confirmation; optional `<figcaption>` providing code context
- **Keyboard navigation.** Tab to CopyButton; enter triggers copy; copy-success announced via `aria-live`
- **Screen-reader behavior.** Code content read inline (per `<pre>` semantics); CopyButton announces "Copy code to clipboard, button"; copy-success announces "Code copied" via live region
- **Color contrast contract.** APCA threshold per master plan §3.A CD2 row; pairings: code-text on code-background (consider syntax-highlight token-pairs); CopyButton on CodeBlock background; CD2 ratifies threshold values
- **Reduced-motion contract.** CopyButton state-transitions removed; instant `idle ↔ copied` toggle without animation

## Field 5 — Motion

- **Motion register.** Single-rAF discipline per CD5; minimal motion
- **Per-state motion.** CopyButton `idle → copied` color shift + glyph swap (~200ms); `copied → idle` decay back (~2s timeout); `error` shake animation (W3 ratifies whether shake appears or just color shift)
- **Reduced-motion fallback.** All transitions become instant; no shake; copy-success indicated by glyph + color change without animation
- **Atmospheric chrome interaction.** CodeBlock background CONSUMES atmospheric token (`tokens.color.atmosphere.window-warm` darkened OR dedicated `tokens.color.code.background` per CD2; META register may justify a slightly darker substrate for "rip through the screen via beautifully composed boxes" framing)

## Field 6 — Theme

- **Theme tokens consumed.** Light / dusk / dark per CD2 ratification; reduced-motion-light / reduced-motion-dark variants
- **Theme-cycler integration.** Re-renders with new theme tokens; syntax-highlight palette shifts per theme
- **Per-theme pairing.** Code background + syntax-highlight palette + CopyButton chrome per theme

## Field 7 — Tokens

- **Color tokens.** `tokens.color.code.background`; `tokens.color.code.text` (default code text); `tokens.color.code.<role>` for syntax-highlight roles (keyword / string / comment / function / etc. — CD2 ratifies role inventory per syntax-highlighter library); `tokens.color.code.diff.<role>` for diff variant
- **Typography tokens.** `tokens.type.meta.500` for code text (Meta-code slot, component-locked per CD1 Concept 1); `tokens.type.meta.400` for figcaption + line-numbers; `tokens.type.meta.500` for CopyButton glyph
- **Spacing tokens.** `tokens.space.scale.<n>` for CodeBlock padding + line-height + CopyButton margin
- **Atmospheric chrome tokens.** N/A at component itself; CodeBlock has its own substrate (`tokens.color.code.background`)
- **Cartography tokens.** N/A — no cartography coupling

## Field 8 — Storybook 9 contract

- **Story names.** `Static` / `Runnable` / `Diff` / `CompactLivesnippet` / `CopyButtonHover` / `CopyButtonCopied` / `CopyButtonError` / `LightTheme` / `DuskTheme` / `DarkTheme` / `ReducedMotion`
- **Arg patterns.** `variant` (enum) + `theme` (enum) + `code` (string; default fixture) + `language` (string; default `typescript`) + `caption` (string; optional) + `reducedMotion` (bool) + `copyState` (enum: `idle | copied | error`)
- **Decorators.** Theme-provider + reduced-motion-media-query + clipboard-emulator decorator (mocks navigator.clipboard) + syntax-highlighter decorator (provides shiki/rehype output fixtures)

## Field 9 — Verification ladder cross-references (master plan §6.6)

- Row 2 (component spec contract) — this file
- Row 5 (Chromatic snapshots) — per Field 8 stories
- Row 6 (axe-core a11y) — Field 4 contract; zero violations

## Field 10 — Cross-stream coordination notes

- **CD2 dependency.** Code-syntax-highlight palette per role + chrome/atmospheric tokens; CD2 ratifies values + APCA pairings; syntax-highlight token role inventory ratified at CD2 per syntax-highlighter library choice (shiki / rehype-pretty-code / per master plan §3.B Astro patterns)
- **CD5 dependency.** CopyButton motion + error-shake (if ratified); CD5 ratifies durations + ease curves
- **Compound discipline.** CodeBlock + CopyButton are spec'd as compound at CD4; W3 implementation may split into two components (CodeBlock + CopyButton) with explicit composition pattern OR keep compound. Mayor adjudicates at W3 implementation gate.
- **LiveTicker coupling.** LiveTicker on reception may render `compact-livesnippet` variant of CodeBlock per offices-window framing. W3 ratifies whether LiveTicker hosts a compact CodeBlock instance or implements its own compact-code surface; coupling discipline avoids two-component drift.
- **META × NARRATIVE register marriage.** Per CD1 Concept 5: CodeBlock IS where META register lives natively (Meta-code typography; technical-grotesque silhouette; "peer-behind-the-curtain content"). The component's typographic + atmospheric register is META; this register is bounded to the CodeBlock surface (per CD1 Concept 1 component-locked containment); META register does not escape into article body prose (Body slot DISpatch-locked).
