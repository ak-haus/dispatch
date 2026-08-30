---
title: build session close — 2026-08-30 B15 component idiom convergence (F12 code half)
status: active
session_type: build
column: converge custom/ on co-located stylesheets; the sweep's Chromatic diff must be empty
---

# Build session close — 2026-08-30 (B15, the F12 code half)

> **Landed:** [PR #42](https://github.com/ak-haus/dispatch/pull/42) — 13 components, one commit each,
> `packages/ui` only. **The acceptance held exactly: `UI Tests: dispatch_storybook` read
> "354 tests unchanged"** — the sweep's Chromatic diff is EMPTY on the true floor A14 built.
> The gate ran before any code and AK ruled both forks; a flag-number collision (F28) was caught
> and corrected pre-merge; the e2e ARCHIVE lane (astro surface, outside this row's diff) held one
> change for AK's policy-A disposition.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| `git log -1 origin/main` at start | `f72b42b` locally; fast-forwarded to `31bd1a4` (B4 close) before reading anything |
| Working tree at session start | clean |
| Board read | Every line of the published artifact; B15 row + promotion checkpoint + A14 close first-hand |
| Re-verification | bucket membership · dialog.tsx:27 · orphan hooks · the 22 dead slots — all re-measured; `packages/ui` byte-identical to the A14 merge, so A14's figures carried |

## The gate — ruled before any code

The row's gate was AK's confirmation of the exclusion. He answered both AskUserQuestion rounds
with questions — *is there a practical reason the exclusion holds? is dropping engineeringly
sound?* — so the grounds were measured before the ruling:

- **The headless ui/ + patterns/ sets cannot be "converged" at all**: their `prime-*__` hooks are
  authored in zero stylesheets repo-wide, so a stylesheet for them is new design, which cannot
  produce an empty diff — and two-owner styling is the B17 defect class.
- **The 7 styled primitives are bound to upstream shadcn by their own canon**
  (`ui/README.md`, authority: mayor — "standard shadcn naming convention with full attribution +
  migration guidance back to upstream"); converting them severs upstream diffability for zero
  rendering change. And the co-located-CSS law's written scope is `custom/` authoring
  (`design-intent-to-code.md:41`); **Rule 7 proper is the anti-pattern-header rule** — the board's
  paraphrase ("presumes a stylesheet per component") slightly overstated it.
- **Dropping the dead slots is the only like-for-like port**: the theme registers none of them
  (re-verified), production CSS carries none, and porting them as `var()` would fail the
  `font-slots` guard — the gate written against exactly this defect class at S4.

**AK RULED 2026-08-30:** exclusion **HOLDS** at 13 components, **with a standing note — the
excluded sets (7 shadcn primitives · headless ui/ + patterns/ hook inventories) go to the
follow-up architecture/design sprints as DESIGN BUILD-OUTS**; and the 22 dead slots **DROP with
record** (the emitter-registration half stays open as F29, his governance call).

## What shipped

- **Bucket A (8):** DropCap · PullQuote · ArticleDateline · CartographyStrip · AgentTraceCallout ·
  ComparisonGrid · AuthorByline · PlotChart — utilities replaced by BEM hooks + co-located
  stylesheets whose declarations are **compiler transplants**: every rule taken from what the
  story-lane compile actually emits, Tailwind-default theme vars resolved concrete, inlined token
  stacks re-pointed at their canon `var()` slots. Composition roof-styles the ui/ primitives via
  className (CartographyStrip→Badge/AspectRatio, ComparisonGrid→Card/Badge, AuthorByline→Avatar,
  flat classes because HoverCardContent portals).
- **Hybrids (3):** ChapterRail · Footnote · ReadingProgress — **only cascade winners folded**
  (layered utilities lose to the unlayered files): link `uppercase`, toggle `mt-4`, `space-y-2`
  child margins (ChapterRail); marker `inline-flex`, back-link `uppercase`, flow-prose
  `text-sm`/`leading-relaxed`, the popover panel + flattened tw-animate-css fade (Footnote);
  label placement (ReadingProgress). Every loser recorded in its header — including ChapterRail's
  authored-but-never-applied `text-accent-prime` current-link wine and ReadingProgress's `z-[60]`.
- **Bucket C (2):** LiveTicker · SearchPalette — hook inventories authored as canon files with
  Rule 7 headers and deliberately zero visual declarations (LiveTicker's design → the design
  sprints; **SearchPalette.css is structured as B16's landing zone** for the 384-LOC fork's port).
- **Stories:** two settle-selector updates (`figure.not-prose` → `figure.prime-pull-quote`;
  `.not-prose > *` → `.prime-comparison-grid > *`) — the only story edits, riding their
  components' commits.

## The dead-intent record (F29's docket)

The drop ruling preserved shipped rendering exactly, and it surfaced how much authored intent had
never rendered:

- **AgentTraceCallout's entire visual register never shipped** — dark inverse surface
  (`bg-text-strong`), page-ink text, mono voice. It ships transparent, left rule in currentColor.
- **Every lane paint in the sweep was dead**: PullQuote's em-rule, ArticleDateline's dot,
  ComparisonGrid's five card top-bars, ReadingProgress's fill, AgentTraceCallout's border. The
  lane/variant modifier classes stand in the new stylesheets as declared seams styling nothing.
- `font-title` and `font-code` intents never rendered anywhere; both focus-ring offsets ship
  Tailwind's default white (dark cycles included); `not-prose` was a no-op (no typography plugin;
  `.prose-dispatch` scopes by child combinator).

**Flag-number collision caught pre-merge:** the A14 close drafted this register row as "F28", but
the board ledger had already assigned F28 at sitting 2. Repo pointers corrected to **F29** in a
records commit before merge; the board files the row as F29 with the alias noted.

## Acceptance

| Criterion | Result |
|---|---|
| Every custom/ story component has a co-located `.css` | **Met** — 20/20, each with a Rule 7 anti-pattern header |
| Zero raw utilities in custom/ sources | **Met** — compiler-verified across all 20 (two residual scanner hits are prop-value strings in no className) |
| Chromatic diff for the sweep EMPTY | **Met** — `UI Tests: dispatch_storybook`: **354 tests unchanged** |
| Local oracle ahead of CI | 100 story screenshots pre/post: **99/100 byte-identical**; the 100th (ComparisonGrid Variant Matrix) proved **self-flaky at ±1 RGB on the identical build** (Motion stagger AA — F20's class; no conversion signal) |
| Rails | story rail 354/354 a11y-as-error · unit 99/99 · typecheck clean · tokens-lint clean · font-slots 3/3 |
| Astro surface untouched | **Met** — diff is `packages/ui` only; no dependency changes |

**The one held check, dispositioned:** `UI Tests: dispatch_playwright` (the e2e ARCHIVE lane —
astro journey surfaces, outside this diff) reported **1 change**. B15 cannot plausibly have moved
it: the astro graph consumes only ImageWithCaption/DldsPanel (untouched) by subpath, and the
barrel is excluded from the live graph by design. **AK read it in the Chromatic UI and accepted
it as baseline (build 77, "Approved by AKALMoumen")** — policy A run exactly as designed.
**Merged as `3dbcb0e`** (merge commit, deliberately not squashed: the row's one-component-per-
commit bisectability is preserved on main).

## Method notes worth keeping

- **Ask the compiler, not memory**: a small oracle (`@tailwindcss/node` `compile().build(candidates)`
  against the story-lane entry) yielded per-component emitted CSS + the theme var table — every
  ported declaration is compiler truth. The cva() trap A14 warned about was neutralized by
  tokenizing all quoted strings and letting Tailwind decide what is a utility.
- **The hybrid fold rule**: fold ONLY utilities that win the cascade today; a layered utility that
  loses to the unlayered stylesheet is archaeology, and folding it would be a rendering change.
- **A local pixel oracle is cheap**: storybook-static + Playwright screenshots, byte-compared
  pre/post, caught the methodology before Chromatic had to — and calibrated what ±1-RGB
  self-flake looks like so the one non-identical shot could be dispositioned honestly.

## What this session did not do

The defer test held. No fork migrated (B16). No masthead touched (B17). No dead slot authored and
no emitter edited (F29 — AK's). No excluded layer converted (design sprints, per the ruling).
The astro surface untouched.

## Next opener

**Build 19 — B16, SearchPalette**: the cheapest fork entry, its landing zone now exists, and its
precondition is written on the board (the production `@source` gap must be closed and proven
before any import switches). ChapterRail and SiteNav fork sessions follow; B12/B13 (perf repairs)
remain the alternative if AK prefers — nothing structural orders them.
