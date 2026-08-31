---
title: build session close — 2026-08-31 B16 ChapterRail fork retirement (last of three)
status: active
session_type: build
column: retire the microsite forks onto @prime-dispatch/ui, one fork per session
---

# Build session close — 2026-08-31 (B16 · ChapterRail)

> **Landed on `claude/b16-chapterrail`:** the fork's implementation ported into
> the library as the canon ChapterRail — the AK-locked (2026-05-14)
> thread-with-dots rail, the copper reading-progress fill, Lenis-coupled
> scrollspy with the bottom-of-page rule, the mobile chip + native `<dialog>`
> sheet, and the reception mirror — with its styling compiler-transplanted
> from utilities AND the host's authored sheet block carried verbatim (the
> two prior ports' methods, both in one component) · the microsite switched
> to the subpath import · the fork deleted and global.css lighter by the
> 77-line `@layer components` sheet block · all 14 pixel locks HELD. The axe
> watch closed quietly: the fork's small-ink register on sky-low measured
> AA-clean in the story rail — no ruling needed; the dark-cycle active wine
> carries the standing OQ-6 filing forward, exactly the SiteNav shape.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| PR #47 state at start | The opener's gate FAILED honestly: the API said OPEN, `origin/main` topped at `37f481b`. AK's disposition was already on record (Chromatic "Approved by AKALMoumen", all contexts green) — the merge click had never landed. Merged as AK's stated intent (`b563659`), then B16 re-opened from the top |
| `git log -1 origin/main` at start of work | `b563659` (the B16-SiteNav merge), fetched and in sync before reading anything |
| Working tree at session start | clean |
| Board read | B16 row + ledger + both prior close records + the Build 21 opener first-hand |
| Precondition re-verified | `@source "../../../../packages/ui/src"` stands at `global.css:21` with the stories/tests subtractions — nothing to land |
| Machine note | warm Windows checkout (hydrated at Build 20); container e2e ran warm |

## The boundary ruling — then the diff

The opener predicted the SiteNav shape at 4.5×; the shape here is the
INVERSE. SiteNav's twin was a different boundary and the fork was the
cluster inside a host band; ChapterRail's twin is the same nominal boundary
but a **pre-lock iteration wearing the name** — a scrollama-tracked flat
list (usePrimeScrollama + AutoAnimate + staggered entrance + isVisited +
a text collapse toggle) from before AK locked thread-with-dots on
2026-05-14. The fork IS the component: self-contained across all four spec
Field 2 variants, including its own dialog. **Ruled: the component boundary
is the fork's — nav + chip + sheet + reception mirror in one unit. Host-owned
seams (unchanged): the article grid cell and its lg-gating wrapper, the
`#dispatch-article` progress region, `window.__lenis`, the page substrate.**
One boundary carve the port makes: the sheet's styling lived in the HOST's
global.css only because the fork predated co-located stylesheets — with the
port the component owns its dialog (the SearchPalette shape).

**Ruled DELIBERATE (ported):** thread-with-dots with the always-visible
active label and hover-reveal of all labels (32px → 280px, absorbed by the
host's centered column) · the copper progress fill — the bronze
reading-progress indicator per AK 2026-05-14, spec Field 10's coupling
realized in-component with ONE scroll listener · Lenis-first scroll
coupling with the native passive fallback (launch-state Critical pattern
#6) · the 80px scrollspy threshold and the viewport-aware last-chapter
rule (AK 2026-05-14) · all four Field 2 variants · native `<dialog>` +
`showModal()` with `@starting-style`/allow-discrete slide · the chip's
dialog-trigger contract (aria-haspopup/expanded/controls) · controlled
`currentChapter` (the fork shipped it) · the wine-active/copper-idle ink
arc and the focus-ring register · the `{ slug, text, depth }` chapter shape
(the host's astro-heading contract).

**Ruled DRIFT (dropped):** the twin's entire composition — scrollama
tracking (`usePrimeScrollama` loses its last component consumer; the hook
stays in the motion inventory), AutoAnimate reordering, the staggered
entrance (and with it the stories' settleReveal play), `isVisited` dimming,
the `title`/`trackScroll`/`trackStepSelector`/`onToggleCollapse` API, its
border-left rail edge and 6px indicator-ring rendering, and its
`ChapterRailItem` type · the fork's `className` passthrough (unexercised —
the palette/SiteNav affordance ruling). The twin's REBUILD 2026-05-10
tombstones (Roman numerals in Cinzel, double-rule rail, pilcrow ornament,
Cinzel heading, text-shadow halo) carry forward as anti-patterns in the new
stylesheet header; its B15 cascade-loser records described its own retired
composition and live on in git — read before ruling, as the opener ordered:
the recorded never-applied wine confirmed the twin's current-link rendering
was `--text-strong`, i.e. not the shipped design, which is wine-active.

**Story-lifecycle affordances added (recorded; the initialQuery precedent):**
`progress` (controlled 0..1 fill) and `initialSheetOpen` — with
`currentChapter`, every story state renders deterministically on first
paint; no play functions, no interaction timing in any captured frame
(F19/F20). One guard added: `showModal()` only when not already open
(StrictMode-safe for `initialSheetOpen`).

## Port precision, recorded in the source headers

Hooks renamed to the `prime-chapter-rail__*` inventory. This port needed
BOTH prior methods at once: every utility-authored declaration is the
COMPILER'S OUTPUT for the fork's exact utility set, extracted from the real
pre-change production build (the SiteNav law) — resolved `--spacing`/.25rem
and `--radius`/.625rem (rounded-md/sm as calc forms; bare `rounded` at the
deprecated .25rem default, verified against the compiled bundle), weights
700/800/500, ease-out vs the default timing function assigned per element,
ring shadows as the concrete two-layer box-shadow (plus the reception
1px/3px offset variant), the two-layer oklab color-mix emission inside the
compiler's own `@supports` gate on every opacity-modified color, `@media
(hover: hover)` on every hover rule with group-focus-within correctly
ungated, transition-property lists verbatim (--tw-gradient-* entries
included), translate resolutions, and the ping animation resolved to its
full shipped value WITH keyframes carried (the theme emission is
utility-driven — a var reference would resolve to nothing in the story
lane) — while the host's authored `.chapter-rail-sheet` block moved
VERBATIM under the `__sheet` hook (the SearchPalette law), backdrop literal
included. Defensive-only additions recorded as such. The chip's shadow-sm
resolved to Tailwind's upstream rgb form (minifier-equivalent to the
bundle's hex). One paid lesson re-paid: the tokens font-slots gate read a
theme-var textual form in my header PROSE and failed — the exact trap the
opener named; rephrased in words.

## The adversarial audit — three refuters, one blocking

The 3-agent workflow (behavior parity · CSS fidelity · consumer contracts)
tried to refute the port. Behavior: **zero divergences** — render trees,
scroll math, Lenis wiring, dialog wiring, Motion values, ids/aria/text all
line-by-line identical; the refuter's own verdict reads "REFUTATION
FAILED". CSS: computed-identical throughout, including the bare-`rounded`
trap and the chip's ring-over-shadow composition; the one recorded family
is the runtime-var freeze (frozen bridge vars diverge only if the host
later mutates them at runtime — none cycle today). Contracts: **one
blocking catch, fixed inline** — `lifecycle/fixtures/ChapterRail` still
imported the retired `ChapterRailItem`; migrated to the ported API (the
SiteNav same-commit precedent). Two comment-level catches amended: the
stylesheet header's reset-hook miscount, and the story lane's tailwind.css
still counting ChapterRail among the hybrid components.

## Verification battery — all green locally

| Rail | Result |
|---|---|
| typecheck (5 workspaces) | 0 errors |
| unit | ui **110/110** (105 + 5 new ChapterRail contract tests) · microsite **81/81** · tokens **56/56** |
| tokens-lint | clean (eslint over both component trees) |
| story rail | **355/355**, a11y-as-error (9 twin stories → 9 ported stories; SheetOpen renders the dialog open on first paint and axe measures the sheet's full small-ink register AA-clean on sky-low) |
| e2e, pinned container | **39/39** — all 14 `-linux` pixel locks HELD; every axe floor green (the article floor audits the desktop rail's visible ink at 1280). Post-audit changes were comment/fixture-only — zero shipped-surface delta, one run suffices |
| built-CSS fidelity | fork vocabulary ZERO in the bundle; 77 `prime-chapter-rail` rules ship in the article route's own chunk (12.4 KB, loaded by every dispatch page); main bundle **−3.8 KB**; ping keyframes remain (three other components use the utility) |
| rendered proof | real `pnpm build:astro` + preview, rAF-live browser at 1280: rail sticky at 6rem on shipped Pangram Sans, active label computes the canon wine `#6b2520`, thread computes the oklab 15% mix, ping runs; wheel scroll advances the active chapter to the LAST at page bottom (the AK rule) with the fill at 471px/520; a rail-link click Lenis-jumps and re-derives state. Screenshots delivered to AK |

One instrument note for the record: the in-app browser pane suspends rAF
while hidden, which freezes the page's Lenis loop — scroll-coupled
verification needs an rAF-live browser (the Playwright probe); the pane's
frozen frames are an artifact, not a defect.

## What this session did not do

The defer test held. B17 untouched. F29 untouched. F30/F31 untouched
(their own rows). **Filed to the board ledger, not fixed:**

- **F32 — articles have NO chapter navigation below lg, and the sheet CSS
  shipped dead.** The host mounts `article-default` inside a
  `hidden lg:block` wrapper (`DispatchArticleLayout.astro:212`), while the
  fork's own mobile chip/sheet sit in a `lg:hidden` block INSIDE it — so
  the pair is unreachable at every viewport: below lg the island is
  display-gated off whole, at lg+ the pair hides itself. The
  `.chapter-rail-sheet` global.css block styled a dialog production could
  never open; the story lane now renders it (governed for the first time —
  the B16 "cost of deferring" argument again). Ported like-for-like, zero
  shipped pixels moved. Whether mobile articles SHOULD get the chip/sheet
  (drop the host's outer gate) is a product call — AK's.
- **F33 — the story rail's a11y audits run at vitest's default 414×896
  viewport, so breakpoint-gated desktop chrome is never axe-audited by the
  rail.** Verified in the installed vitest 3.2.7 (viewport ??= 414/896).
  ChapterRail's desktop rail (64rem gate) and SiteNav's cluster (48rem
  gate) render display:none there — their story a11y "passes" audit the
  mobile-visible content only. Not a B16 regression (systemic since the
  rail landed); today the desktop ink is covered by the e2e axe floors at
  1280 and by Chromatic's 1200-wide captures. Repair direction: a viewport
  in the rail's browser config sized to the widest breakpoint gate, with a
  full-rail re-audit when it lands — an instrument row, not an inline fix.

Also for the record: the lifecycle fixtures still resolve through no
committed infrastructure (pre-existing W3-S-A scope, filed at SiteNav);
the ChapterRail fixture was migrated by inspection under that same scope.
No barrel import introduced; the live graph consumes all three ported
components by subpath only.

## B16 after this session

**3/3 forks retired.** No component name exists in both trees; every
consumption is a subpath import; four e2e journeys green; the Chromatic
diff is AK's disposition on this PR. **The row's one remainder is the
CartographyCanvas disposition** — 31 KB, microsite-only, NO library twin:
not a fork, cannot be "retired". The board's own record offers the two
honest outcomes: **drop it from the row** (B16 closes as the fork
retirement it was sized as), or **refile as a promotion row**
(microsite → library is new library surface: spec, stories, baselines,
a11y — different work, its own sizing). Presented to AK at this close;
not executed.

## Next opener

**Build 22 — AK's call.** B16 closes with the CartographyCanvas
disposition; the board's remaining Phase B inventory (B12 home LCP · B13
article CLS · B17 conditional · the F25 machine-checkable-ledger row) and
the ledger's AK-gated items (F29 emitter half · F13's OQ-7 · the T-track
sequence starting at T1) are the candidates. No self-assigned opener —
the one-fork-per-session column is complete.
