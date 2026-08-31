---
title: build session close — 2026-08-31 B16 SearchPalette fork retirement (first of three)
status: active
session_type: build
column: retire the microsite forks onto @prime-dispatch/ui, one fork per session
---

# Build session close — 2026-08-31 (B16 · SearchPalette)

> **Landed on `claude/b16-searchpalette`:** the production `@source` precondition
> (proven before any import switched) · the fork's implementation ported into the
> library as the canon SearchPalette · the microsite switched to the subpath import ·
> the fork and its search lib deleted · global.css lighter by the palette's 347-line
> block. **One ruled rendering change rode along:** the palette's small ink moved to a
> new AA meta-ink pair after the story rail's axe gate measured every fork pairing
> below 4.5:1 — AK ruled the fix mid-session; dark cycles are pixel-unchanged.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| `git log -1 origin/main` at start | `22955cc` (the B15 close), fetched and in sync before reading anything |
| Working tree at session start | clean |
| Board read | Every line of the published artifact; B16 row + B15 close + A14 close §2 first-hand |
| Precondition re-verified | `global.css:1` bare `@import "tailwindcss"`; the only `@source` in the repo was `.storybook/tailwind.css` — exactly as A14 measured |

## The precondition — landed and proven FIRST

`@source "../../../../packages/ui/src"` in global.css (stories + tests subtracted —
they never render on this surface; auto-detection stays ON, unlike the story lane,
because the microsite's own sources are the primary vocabulary). Proven against a
real `pnpm build:astro` **before any import switched**, by A14's own instrument
inverted:

- 41 utility-shaped tokens are used only by `packages/ui`; **13 → 25 compiled** once
  the `@source` landed. The 16 still-absent are exactly the F29 dead-slot register
  plus non-utility prop strings — dead slots stay dead, as they must.
- Byte cost **+958 B (+0.56%)**; additive-only (zero existing rules changed; the theme
  block gains `--animate-pulse`, `--text-xl`, `--text-xl--line-height`).

## The diff — every divergence classified

The twin was not a diverged copy; it was a **different component wearing the name**:
Radix Dialog + cmdk, a groups/items API, cmdk's own filtering, zero styling (the B15
landing zone). The fork implements the spec: native `<dialog>` + `showModal()` (Field 1
verbatim), the combobox/listbox + `aria-activedescendant` + live-region contract
(Field 4), `@starting-style` + `allow-discrete` at 250/200ms (Field 5), the four
variants (Field 2), search as a pure function over the server-rendered index (Field 10),
and the full match anatomy — type badge, DLDS lane pigment, `<mark>` highlight, kicker.
**Ruling: the fork's architecture is DELIBERATE end to end; the twin's composition is
the drift and retires.** The "cmdk-based per CD4 §3.1 #18" claim in `ui/command.tsx`'s
header does not survive first-hand reading — CD4 #18 names the *affordance* ("cmd-K
palette"), not the cmdk library; spec Field 1 names the structure.

Dropped as drift: the twin's Radix/cmdk shell, its groups API and `placeholder`/
`emptyMessage`/`className` affordances (never exercised by any host), its
CommandEmpty axe workaround (obsolete with cmdk), its story portal-bridge decorator
(the preview decorator now owns the cycle attribute on `<html>`). Converged as drift:
the fork's `DldsLane` type name collided with library canon (pigment lanes,
`DldsPanel.tsx:21`) — the disclosure taxonomy is **`SearchRecordLane`** in the library.

Port precision, recorded in the source headers: hooks renamed to
`prime-search-palette__*`; CSS carried **verbatim** (minifier-equivalence verified
pre/post build: every remaining textual diff is `flex:none`≡`0 0 auto`,
`#0000`≡`transparent`, calc-stripping); `-webkit-backdrop-filter` authored explicitly
(the fork rode global.css through Tailwind's Lightning pass — a library stylesheet
does not, and the built CSS proved the prefix lost); `sr-only` became the `__sr` hook
with the compiled rule's declarations transplanted (custom/ carries no raw utilities);
`aria-controls` conditional on the list existing (the A13 ruling, same dialog, trigger
side); `initialQuery` added (spec Field 8's `query` arg) so story lifecycle states
render deterministically on first paint — no play functions, no interaction timing in
any captured frame (F19/F20 law). The dialog keeps `id="dispatch-search-palette"` —
the microsite SiteNav trigger's `aria-controls` names it.

## The gates' catch — and AK's mid-session ruling

The story rail (axe-as-error) rejected six of the nine new stories: **the fork's
entire small-ink register fails AA on the window-warm card** — faint on warm 4.03 ·
muted on warm 4.41 · muted inside the accent-18% `<mark>` tint 3.35 · muted on the
code chip 3.94 (settled token values, not motion artifacts — computed independently
and matching axe's own readings). The fork shipped this for months; no instrument
could see it until the styled palette finally rendered on a governed surface, which
is the B16 "cost of deferring" argument made flesh. Even `muted-deep` (0.46) fails
the tinted surfaces.

**AK RULED 2026-08-31: the meta-ink pair.** Two spec-aligned slots through the S2
engine (spec Field 7 `tokens.color.text.meta`), darkened within the ink family, C/H
held: `--dispatch-text-meta` dawn oklch(0.40 0.010 88) — 6.20 warm · 5.71 selected ·
4.71 mark · 5.54 code — and `--dispatch-text-meta-faint` dawn oklch(0.44 0.010 88) —
5.23 warm · 4.81 selected (faint runs never sit in mark/code). Dusk/night alias the
cycle body inks (the muted-deep precedent), so **dark cycles are pixel-unchanged**.
Ten B16 nodes anchored in `packages/tokens/__tests__/contrast.test.mjs` (56/56).
Visible cost: the palette's dawn small print darkens one step — AK's to accept at
the Chromatic disposition.

Type size needed **no** ruling: the 12px floor was retired at sitting 2 (ADR-0004 —
the founded requirement is angular/scalable), and the palette's type is rem-authored
throughout.

## Verification battery — all green locally

| Rail | Result |
|---|---|
| typecheck (5 workspaces) | 0 errors |
| unit | ui **100/100** (99 + 1 new) · microsite **81/81** · tokens **56/56** (10 new B16 contrast nodes) |
| story rail | **356/356**, a11y-as-error (354 + 2 net new stories; 9 palette stories rebaselined) |
| tokens-lint | clean (the ported CSS is var()/color-mix only) |
| e2e, pinned container | **39/39** — all 14 `-linux` pixel locks HELD (the `@source` + the global.css excision moved zero shipped pixels); every axe floor green |
| built-CSS fidelity | palette declarations minifier-equivalent to the fork's, selector-renamed; old name zero occurrences |
| rendered proof | real `pnpm build:astro` + preview: library-served palette opens, searches, highlights, keyboard-navigates; computed styles resolve the canon slots (window-warm card, JetBrains Mono input, Crimson body) |

One harness note for the record: the e2e container syncs `git ls-files`, so an
untracked new file is invisible inside it — the first container run failed resolving
the not-yet-added `search.ts`. Add before running.

## What this session did not do

The defer test held. SiteNav and ChapterRail untouched (their own sessions — the
microsite SiteNav still hosts the trigger, and its `aria-controls` contract is why the
library palette keeps the fork's id). B17 untouched. F29 untouched (the meta-ink pair
is two *new* ratified slots via the sanctioned pipeline, not a registration of the
dead-slot names — that governance call stays AK's). No barrel import introduced; the
barrel's SearchPalette exports updated to the new API but the live graph still
consumes by subpath only.

## Next opener

**Build 20 — B16, SiteNav** (492 LOC fork vs 163 twin, 3.0×): the middle fork. Its
library twin is bucket D (canon-correct BEM with its own `SiteNav.css`), so the diff
starts from a real stylesheet rather than a landing zone; the fork hosts the palette
trigger whose `aria-controls`/id contract this session preserved. ChapterRail
(759 vs 169) stays last.
