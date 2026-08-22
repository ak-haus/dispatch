---
title: records — 2026-08-22 Phase B register promotion (F12 · F14 · F23 · F24)
status: active
session_type: records
column: promote the homeless hardening flags, or lose them
---

# Records — 2026-08-22 (the promote-or-lose pass)

> Third pre-Phase-B sitting. **No code changed today** — that is the point of the pass, and it is why it
> was cheap. ADR-0002 Decision 1 rules Phase B "exactly once for code, scoped to the re-verified residual
> register." A code-hardening item still sitting in the flag ledger when B opens is homeless: there is no
> second Phase B, and the ADR is explicit that recurring hardening means a weakened Definition of Done.
> Four flags were re-verified first-hand and given rows (or their correct phase). Every number below was
> measured in this session, not carried over from the filing.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| `git log -1 origin/main` | `f72b42b` — adjudication sitting 2 |
| Working tree at session start | clean |
| Board read | Ledger + Phase B column, via the published artifact |
| Re-verification | all four flags, file:line, first-hand |

---

## Summary of the pass

| Flag | Filing held? | Disposition |
|---|---|---|
| F12 | **Confirmed, but understated** — 8 named, 19 affected | **Split recommended: A14 (instrument) + B15 (code). AK rules the phase.** |
| F14 | **Confirmed, with two corrections** — 5 named, 3 real forks | **B16** — sized, not started |
| F23 | **Confirmed exactly as filed**, file:line | **B17** — conditional row, do-not-execute-yet |
| F24 | **Confirmed, plus one precision the flag lacked** | **Folded into B4** — no row of its own |

---

## F12 — the phase is contested, and the flag undercounts

### What was measured

Storybook runs no Tailwind compile. `.storybook/main.ts` declares no PostCSS or Tailwind plugin;
`preview.tsx` imports exactly four stylesheets — `@prime-dispatch/tokens/css`, `fonts.css`,
`letterpress.css`, `preview.css`. A grep for `tailwind` across the whole Storybook app returns nothing.
The mechanism in the filing is real.

The population is not. The flag names eight components with "ZERO co-located CSS." Sorting all 47
story-bearing components in `packages/ui` by styling idiom gives four buckets, not two:

| Bucket | n | Components |
|---|---|---|
| **A** — Tailwind utilities, no co-located CSS | **15** | the flag's 8 (`AgentTraceCallout` · `ArticleDateline` · `AuthorByline` · `CartographyStrip` · `ComparisonGrid` · `DropCap` · `PlotChart` · `PullQuote`, all `custom/`) **+ 7 `ui/` primitives** (`avatar` · `badge` · `button` · `card` · `hover-card` · `separator` · `skeleton`) |
| **B** — hybrid: co-located CSS **and** raw utilities | **4** | `ChapterRail` · `Footnote` · `ReadingProgress` · `SiteNav` (all `custom/`) |
| **C** — class hooks, no CSS file | **22** | `LiveTicker` · `SearchPalette` (`custom/`) · all 8 `patterns/` · 12 headless `ui/` |
| **D** — CSS-only, canon-correct | **6** | `DldsPanel` · `ImageWithCaption` · `InstitutionalFixture` · `MastheadWordmark` · `MetaArticleOpener` · `NarrativeArticleOpener` |

Three things follow that the filing does not say:

1. **A Tailwind compile resets 19 baselines, not 8** — buckets A and B both depend on utilities. The four
   hybrids have a CSS file, so the flag's "zero co-located CSS" filter skips them, yet they still render
   partially bare.
2. **Bucket C is a different defect, and a compile does not touch it.** `prime-live-ticker__*`,
   `prime-search-palette__*` and `prime-dialog__*` are defined in **no stylesheet anywhere in the repo** —
   grep across every `.css`, `.astro` and `.scss` returns zero. For `ui/` and `patterns/` that is declared
   deliberate: `dialog.tsx:27` — "Class hooks … wired to chrome at the ROOF, not here." For `LiveTicker`
   and `SearchPalette`, which sit in `custom/`, it is not obviously deliberate, and construction Rule 7
   (`representation/visual-system/components/construction-rules.md:98`; restated in the S4 runbook at
   `docs/runbooks/design-intent-to-code.md:41`) presumes a stylesheet per component.
3. **The canon-correct bucket is the minority** — 6 of 47.

### Arguing the phase, honestly

The board asked for the argument before the assignment. Both readings are real.

**For Phase A.** Chromatic is a standing instrument in the CI ruleset (gate #11, added at S1), as is
Storybook (gate #9, S5). ADR-0002 Decision 1 sorts work by *kind*: standing instruments are Phase A, "the
only compounding option"; hardening is a one-time calendar phase. F12 says an instrument is not measuring
what it claims to measure — repairing that is Phase A by definition. The cost behaves like instrument
debt, too: it **compounds**. B12's LCP is 13.2s today and 13.2s in a month, but F12 grows with every story
added, because the eventual reset gets larger and less reviewable. And Phase B is scoped to the
*re-verified residual register* — you cannot trust the visual claims in that register while the visual
instrument baselines bare renders. Putting F12 wholly in B means B executes with one of its own
verification instruments known-invalid. Precedent exists for a late Phase A row: **A13, "instrument
sharpening — verify-pass follow-ups,"** landed after A1–A12 for exactly this reason.

**For Phase B.** The fix is component code across up to 19 components plus their baselines — a code sweep,
and ADR-0002 puts code hardening in B, once. It blocks nothing shipping and no reader sees it. The flag
itself says it is "not a defect in the components" but an idiom mismatch, which is canon-conformance
cleanup — B5/B6-shaped. And if any instrument imperfection can reopen Phase A, Phase A never closes, which
is the same weakened-DoD failure ADR-0002 legislates against, just wearing the other jersey.

**Recommendation — split it, because the halves are different kinds of work.** The fused flag is what makes
the phase look ambiguous; separated, each half sorts cleanly.

### A14 — Phase A, instrument repair *(PROPOSED — AK rules the phase)*

- **Scope.** Give Storybook a Tailwind compile so the story lane renders what the microsite renders:
  `@tailwindcss/vite` in `.storybook/main.ts`, a Tailwind entry in `preview.tsx`, and an `@source` covering
  `packages/ui/src`. Then **one** deliberate, declared Chromatic baseline reset. **Touches zero components.**
- **Acceptance.** (1) A bucket-A story renders with utilities applied — `AuthorByline` (29 utility hits) is
  the clearest probe. (2) The reset is a single reviewed build whose diff count is stated in the PR body and
  matches the re-verified population (19). (3) Gate #11 green on the new floor. (4) The 14 `-linux` e2e pixel
  baselines are untouched — different harness; if they move, something is wrong.
- **Cost of deferring.** Compounds. Every push adds baselines to a floor that is not evidence, and the
  one-time reset grows monotonically. Defer past B and Phase C's adversarial bug bash runs its visual sweep
  against an instrument known to be invalid — which spends the bug bash's credibility, not just its time.

### B15 — Phase B, code hardening *(gated on A14)*

- **Scope.** Converge the `custom/` layer on the canon-correct co-located stylesheet (Rule 7). Re-verified
  target: **bucket A's 8** + **bucket B's 4 hybrids** + **bucket C's 2** (`LiveTicker`, `SearchPalette`,
  whose hooks are authored nowhere). **Deliberately excluded:** the 7 Tailwind-styled `ui/` primitives and
  the headless `ui/` + `patterns/` sets, because those layers declare themselves roof-styled. **Confirm that
  exclusion with AK before executing — if it does not hold, the row roughly doubles.**
- **Acceptance.** Every `custom/` story component has a co-located `.css`; zero raw Tailwind utilities remain
  in `custom/` sources; and the Chromatic diff for the sweep is **empty**, because A14 already established
  the true floor. A non-empty diff means the conversion changed rendering and must be read pixel by pixel.
- **Cost of deferring.** Static, not compounding — which is precisely why this half is B and the other is
  not. The ordering constraint is the real cost: **B15 must not ship before A14.** Converting the idiom while
  the lane still renders bare makes the sweep unreviewable, because the baselines cannot show what changed.

---

## F14 — confirmed, but the flag names five and there are three

### Corrections from first-hand measurement

- **`@prime-dispatch/ui` IS a declared dependency** — `microsite-astro/package.json:34`, `workspace:*`. The
  flag's "not even a declared dependency" was true at filing and is **stale as of S4**; the seam is open, and
  `preview/figure.astro:10` already consumes `ImageWithCaption` by subpath.
- **`CartographyCanvas` has no library twin.** 31KB, microsite-only; nothing named `CartographyCanvas` exists
  anywhere in `packages/ui`. It is not a fork and cannot be migrated. Drop it from the row, or refile it as a
  **promotion** candidate (microsite → library), which is different work with a different acceptance.
- **`PullQuote` is not a fork.** The microsite file is a 16-line `.astro` presentational wrapper; the library
  twin is `.tsx`. A re-implementation in another language for another runtime, not a copy. Converge it in
  minutes or leave it — either way it does not size the row.

### The three real forks

| Component | Microsite fork | Library twin | Ratio |
|---|---|---|---|
| `ChapterRail` | 759 LOC | 169 LOC | 4.5× |
| `SiteNav` | 492 LOC | 163 LOC | 3.0× |
| `SearchPalette` | 384 LOC | 147 LOC | 2.6× |
| **total** | **1,635** | **479** | — |

That ratio is the finding. This is not drift around a shared core — the microsite copies are substantially
different components wearing the same names, and most of the divergence is probably deliberate and
load-bearing. A delete-and-import migration would silently drop shipped behaviour.

### B16 — Phase B

- **Method, per fork, in order.** Diff fork against twin → classify **every** divergence as deliberate (port
  into the library behind a prop or variant) or drift (drop) → land the library change with its story and
  baseline → switch the microsite to the subpath import → delete the fork → e2e green.
- **Sizing.** **One build session per fork, not one for all three.** `SearchPalette` is the cheapest entry
  (384 LOC, and its twin is bucket-C, so the library side needs a stylesheet authored anyway — that overlaps
  B15 and should be sequenced with it). `ChapterRail` is the largest and goes last.
- **Acceptance.** No component name exists in both `microsite-astro/src/components/` and
  `packages/ui/src/components/`; every consumption is a subpath import, never the barrel (the law recorded at
  `figure.astro:3`); all four e2e journeys green; the Chromatic diff reviewed and intentional.
- **Cost of deferring.** The gates govern `packages/ui` while the live surface renders something else — so
  the brand contract, the token drift gate and the story lane are all asserting things about code no reader
  sees. The gap widens every time either copy is edited, and there are two copies of three components being
  edited independently.
- **Latent coupling worth naming.** `microsite-astro/src/styles/global.css:1` is `@import "tailwindcss"`, and
  there is **no `@source` directive anywhere in the repo**. Tailwind v4 does not scan workspace packages
  resolved through `node_modules` by default. Nothing bites today, because the only library components the
  microsite consumes — `ImageWithCaption`, and `DldsPanel` beneath it — are bucket D, CSS-only. **The moment
  B16 lands a Tailwind-styled library component on the live surface, it renders bare in production the same
  way it renders bare in Storybook.** Same root cause, second surface — which is another argument for doing
  A14's `@source` work first. *This one is inference, not measurement:* `node_modules` is not installed in the
  records container, so it must be verified first-hand at execution.

---

## F23 — confirmed exactly as filed; promoted as a conditional row

Re-verified file:line, and the filing is accurate in every particular:

| Claim | Verified |
|---|---|
| 13 `!important` | `global.css:126–147`, four rules, **13** |
| `fixed` overrides `sticky` | `global.css:127` `position: fixed !important` vs `Masthead.tsx:138` `'sticky top-0 z-50'` |
| Motion writes inline | `Masthead.tsx:124` `<motion.header>`, `animate={{ opacity: 1, y: hidden ? '-110%' : 0 }}` (`:128–135`) |
| Two timings | CSS `0.35s ease` (`:132`) vs Motion `0.4s cubic-bezier(0.22,1,0.36,1)` (`:136`) |
| Motion's animation is dead on hero pages | Both state rules — `:not(.past-hero)` (`:134`) and `.past-hero` (`:139`) — declare `opacity`/`transform` `!important`, and **one always matches**, so the inline writes always lose |
| The component concedes it | `Masthead.tsx:129–132` — "we layer this on top" |

### B17 — Phase B, **CONDITIONAL: do not execute yet**

A register row whose content is an instruction not to act is still a register row. That is the point of
this pass.

- **Trigger — fires only on:** a change to masthead show/hide, the `past-hero` toggle, the hero cover
  spread's top alignment, or the Lenis-velocity hook in `EditorialDistrictMapHero`. **Never as a standalone
  refactor.**
- **Scope when it fires.** Pick one owner. Recommended: CSS keeps hero-page *positioning* (the `fixed`
  promotion, which Motion cannot express), Motion owns `opacity`/`transform` on every page — meaning delete
  the `opacity`/`transform`/`transition` `!important` from `:134–147` and let `data-hidden` drive Motion.
  **Do not simply delete the block:** `position: fixed` is load-bearing for the flush cover spread
  (rationale at `:117–122`).
- **Acceptance.** Exactly one system writes `opacity`/`transform` on `header`; one timing constant, not two;
  the cover spread still renders flush with no cream sliver; the reduced-motion path (`:144–147`) preserved.
  Verified by AK's eyes plus the Chromatic archive lane — **not** the pixel floor, which excludes the
  homepage hero by design.
- **Cost of deferring.** Near zero *today*: inert, no symptom, no gated surface affected — which is exactly
  why it earns a conditional row rather than a slot. The cost is conditional and sharp: the next person to
  touch masthead motion debugs a dead animation with no failing test to point at, because no gate covers
  that surface. The row exists to make their first ten minutes cheap. **The real cost is not filing it at
  all** — with no second Phase B, an unfiled trap becomes permanent undocumented debt the moment B closes.

---

## F24 — confirmed; folded into B4, no row of its own

All four repo-correctness claims verified:

| Claim | Verified |
|---|---|
| `.gitignore:33` | exactly `*-chromium-darwin.png` |
| Only linux baselines tracked | **14** `-chromium-linux.png`, **0** darwin |
| All CI on ubuntu | **18** `runs-on:` declarations, all `ubuntu-latest` |
| Sanctioned baseline factory | `update-visual-baselines` is `workflow_dispatch`-gated, `e2e.yml:186–188` |

The repo is already correct: nothing Apple-gated can reach main. The defect is local-signal only.

**One precision the flag lacks.** There is **no `container:` in any workflow** — CI runs Playwright directly
on the ubuntu runner, keyed to a version derived at runtime (`e2e.yml:80–87`). And `@playwright/test` is
`"^1.62.1"` (`microsite-astro/package.json:72`) — a **caret range, not an exact pin**. So the fix direction
("run the suite through the pinned linux container `mcr.microsoft.com/playwright:v1.62.1-noble`") introduces
a container to CI for the first time *and* requires exact-pinning the dependency. Without the pin, the image
tag and the resolved version drift apart, and the container makes local signal *differently* wrong rather
than right. That precision belongs in B4's acceptance.

- **Attached to B4**, which already opens the e2e harness for the post-deploy smoke. No separate row.
- **Acceptance (rides B4's).** `pnpm test:e2e` means the same thing on macOS and Linux — same runner image,
  same baselines, no `-darwin` file generated locally. Exact-pin `@playwright/test` and derive the container
  tag from it, so the two cannot diverge.
- **Cost of deferring.** A Mac-local `pnpm test:e2e` reports green while gating nothing, so a developer can
  hold a false pass right up until CI contradicts it. Bounded — CI is the real gate and it is correct —
  which is why this is a fold-in and not a row.

---

## What this pass did not do

The defer test held. No component was converted, no fork migrated, no `!important` deleted, no container
introduced. Four flags became rows; one row says "do not execute yet"; one flag's phase goes to AK with the
argument written out rather than assumed.

## Next opener

**Build 16 — B4**, the post-deploy oracle upgrade plus the `AGENTS.md:11` amendment, now carrying F24's
fold-in. It was already unblocked by F3-a and AK already ruled its substance on 2026-08-20.

**Optional alternative, if AK rules F12 into Phase A first:** **A14** is the cheaper session and it unblocks
B15 and de-risks B16's production-surface coupling. Either is a legitimate opener; B4 is the default because
it was unblocked first.
