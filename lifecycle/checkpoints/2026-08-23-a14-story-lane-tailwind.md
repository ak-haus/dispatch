---
title: build session close — 2026-08-23 A14 story-lane Tailwind compile (F12 instrument half)
status: active
session_type: build
column: give the story lane a Tailwind compile, then one declared reset
---

# Build session close — 2026-08-23 (A14, the F12 instrument half)

> **Landed:** [PR #35](https://github.com/ak-haus/dispatch/pull/35), merged as `a49178c`. Phase A is now
> complete (14/14). **Two numbers the row was carrying turned out wrong**, both corrected by first-hand
> measurement before anything was accepted: the affected population is **18, not 19**, and the Chromatic
> reset is **335, not 137**. The second is the finding that matters — F12 was understated a second time.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| `git log -1 origin/main` at start | `56c418c` — the Phase B promotion pass |
| Working tree at session start | clean |
| Board read | A14 row + the promotion checkpoint, via the published artifact |
| Re-verification | all three registers, first-hand, before any edit |

---

## The registers, re-verified first

The row's instruction was to distrust the board and re-measure. Two registers held exactly as filed; one
did not.

| Register | Filed | Re-verified 2026-08-23 |
|---|---|---|
| `.storybook/main.ts` declares no Tailwind plugin | yes | **Confirmed** — no plugin, no `viteFinal`, no PostCSS; `tailwind` grep across the app returns nothing |
| `preview.tsx` imports exactly four stylesheets | yes | **Confirmed** — `@prime-dispatch/tokens/css`, `fonts.css`, `letterpress.css`, `preview.css` |
| Affected population | **19** (15 A + 4 B) | **18** (15 A + **3** B) |

### The population correction — `SiteNav` is bucket D

The promotion sort put `SiteNav` in bucket B (hybrid: co-located CSS **and** raw utilities). It has the
CSS. It does **not** have the utilities. Every class it emits is a `prime-site-nav__*` BEM hook, all
defined in its own `SiteNav.css`; the only other strings in the file are routes, SVG geometry, `is-active`
/ `is-disabled` state hooks, and prose. Zero raw Tailwind utilities.

`packages/ui` is **byte-identical** to the promotion commit (`git diff 56c418c..HEAD -- code/packages/ui/`
is empty), so this is a **measurement correction, not register drift** — the register did not move, the
earlier reading of it was wrong. Buckets settle at **A 15 · B 3 · C 22 · D 7**.

A second, smaller correction in the same sweep: the first pass of the re-measure produced 16 and 3, because
a naive `className=` extractor misses `cva()`. `badge` and `button` declare their utilities inside
`cva(...)` arguments, not attributes. They are bucket A, exactly as filed. Recorded because the same trap
will catch B15's sweep.

---

## The finding: F12 was understated a second time

The row was sized against **137 stories** — the story count of the 18 utility-bearing components. The
actual Chromatic diff came back **335 of 354**. That gap is not noise and it is not the population
correction; it is a different defect the flag never named.

`@import "tailwindcss"` does not only bring utilities. It brings the **base layer**. Confirmed in the
built bundle:

```css
@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}
```

That is **preflight** — a universal reset. It zeroes UA margins and padding on every `p`, `h1`, `ul` and
`button` in every story, so it moves baselines **regardless of whether a component uses a single utility**.
Bucket C and bucket D stories move too.

**Preflight is part of what ships.** `microsite-astro/src/styles/global.css:1` is `@import "tailwindcss"`,
so the live surface has always had it and the story lane never did. So the instrument was not merely
failing to apply utilities to 18 components — **it was mismeasuring the base layer on all 354 stories.**
The flag's mechanism was right and its blast radius was wrong, twice over.

### The ruling

Both paths were built and measured before the question went to AK, so the choice was between two
verified options rather than an estimate:

| | Preflight in | Utilities only |
|---|---|---|
| Chromatic reset | **335 stories** | ≈137 stories |
| Utilities compiled | 146 / 169 | 146 / 169 |
| Base layer matches production | **yes** | no |
| Matches the reset size A14 was scoped against | no (2.4×) | yes |

**AK ruled 2026-08-23: keep preflight, accept the 335.** Utilities-only would have matched the approved
sizing while leaving the entire base layer diverging from production — a smaller F12 wearing a smaller
number, inherited by whoever next trusts the lane. Taking 335 once is the cheaper end state than resetting
twice.

The reset is this row's declared risk, and it was approved deliberately and once, not story-by-story.

---

## What shipped

Four changes, all inside `apps/storybook`, plus the lockfile. **Zero components touched**, as scoped.

- **`@tailwindcss/vite` via `viteFinal`** in `.storybook/main.ts` — the *only* declaration site. The
  vitest story-test rail inherits it: addon-vitest builds its Vite config with
  `presets.apply("viteFinal", {})` and strips only the docgen plugins (`pluginsToIgnore`). Verified by
  adding a duplicate to `vitest.config.ts`, then removing it and re-running: 354 tests green either way.
  Declaring it twice would be a second Tailwind scan per run for no coverage, so it is declared once.
- **`.storybook/tailwind.css`** — a purpose-built entry, deliberately **not** an import of `global.css`,
  which carries page furniture the story lane must not inherit (the masthead `!important` block,
  `body.dispatch-hero`, maplibre chrome, the shadcn sitemap shim). It imports `tailwindcss`,
  `tw-animate-css` (**load-bearing**, not cosmetic — `hover-card.tsx` and `Footnote.tsx` both use
  `animate-in` / `fade-in-0` under `data-[state]` variants), and `@prime-dispatch/tokens/theme`: the
  generated, drift-gated `@theme inline` block, consumed **by package subpath** rather than hand-copied,
  because a copy would silently escape the drift gate.
- **`@source "../../../packages/ui/src"` with `source(none)`** — auto-detection roots at the CSS file and
  walks up, which would sweep `storybook-static/`, making the compiled utility set a function of whether
  the runner's disk was clean. It also excludes `node_modules`, and `packages/ui` resolves *through*
  `node_modules` — which is the F12 defect, re-created. Naming the path explicitly makes the utility set a
  pure function of the library.
- **Imported first in `preview.tsx`**, mirroring `global.css`. Tailwind's output is layered and the token
  and page stylesheets are not, so unlayered rules outrank utilities — the same cascade the shipped
  surface establishes. The three hybrids therefore resolve here exactly as they resolve in production:
  their own stylesheet wins, utilities fill the gaps. Reordering that line would give the story lane a
  precedence the microsite does not have.

## Acceptance

| Criterion | Result |
|---|---|
| A bucket-A story renders with utilities applied (`AuthorByline` probe) | **Met** — 30 of its 35 unique utilities compile, from **0** before |
| Reset stated in the PR body and reconciled against the population | **Met** — 335 stated and root-caused; the 137 utility figure and the preflight remainder separated |
| Gate #11 chromatic green on the new floor | **Met** — `chromatic (story lane)` success; 335 baselines accepted by AK |
| Gate #9 storybook still green | **Met** — 47 files / 354 tests, a11y green; isolation canary green |
| The 14 `-linux` e2e pixel baselines do not move | **Met** — untouched, still 14, no `-darwin` generated |

Also green: repo `typecheck` 0 errors across all four packages · `unit` 99 · `content` · `tokens (drift)` ·
`tokens-lint` · `design (contract drift)` · `naming` · `ideation`. The tokens emitter was verified
deterministic (a rebuild produced no diff).

**Local harness note.** The story-test rail could not run in the build container as shipped: it ships
Chromium build 1194 while Playwright 1.62.1 resolves build 1234. Aliased locally to run the gate; the shim
is outside the repo and was not committed. CI installs the correct build and is unaffected.

---

## Two things filed, not fixed

Both were measured in this session. Neither is in A14's scope, and both were deliberately left alone.

### 1. Twenty-two utilities name token slots the theme never registers

With the compile in place, **146 of the 169** distinct utilities the affected components use resolve. Of
the remaining 23, one is `group` — a marker class Tailwind correctly emits no rule for. The other **22**
name slots absent from the generated `@theme inline`:

| Used in `packages/ui` | What the theme actually registers |
|---|---|
| `text-text-strong` · `text-text-muted` · `text-text-accent` · `text-surface-page` · `text-rail-edge` | no `--color-text-strong` / `-muted` / `-accent`, no `--color-surface-*`, no `--color-rail-edge` |
| `bg-surface-page` · `bg-surface-inset` · `bg-rail-edge` · `bg-text-strong` (+ `hover:` forms) | — |
| `border-rail-edge` · `bg-`/`border-lane-{editorial,institutional,dispatch}` | `--color-lane-*-strong` only |
| `font-title` · `font-code` | `--font-narrative` · `--font-civic` · `--font-mono` |

**These are dead on both surfaces.** A real `pnpm build:astro` carries none of the 22 in its production
CSS either, and the microsite's own sources consistently use the registered names (`bg-lane-editorial-strong`
at `about.astro:94` and `preview/tokens.astro:53`). So this is a **library-side naming defect against the
token contract** — not something A14 introduced, and not fixable here without editing components (B15) or
the token emitter (a governance decision that is AK's, not an agent's).

**It matters to B15 specifically.** B15's acceptance is an *empty* Chromatic diff. Converting one of these
22 to co-located CSS is a **behaviour change, not a like-for-like port**, because the utility currently
renders nothing. Each one needs a decision — author the real value, or drop the declaration — and the
second choice is the only one that keeps B15's diff empty.

The reset makes this residual visible instead of invisible, which is what an instrument is for.

### 2. B16's production `@source` gap — confirmed by measurement

The promotion checkpoint flagged this as **inference**, explicitly noting it "must be verified first-hand
at execution" because the records container had no `node_modules`. This session had one.

**Confirmed.** `global.css:1` is a bare `@import "tailwindcss"` and there is still no `@source` anywhere in
the repo outside this PR's file. Measured against a real `pnpm build:astro`: **32 theme-backed utilities
are used only by `packages/ui` and by no microsite source — and zero of the 32 appear in the microsite's
built CSS.** Tailwind does not scan the library from the shipped entry. `packages/ui` reaches the app as a
symlink at `apps/microsite-astro/node_modules/@prime-dispatch/ui`, and v4 auto-detection excludes
`node_modules`.

Nothing bites today, because every library component the microsite consumes is bucket D, CSS-only. **The
moment B16 moves a utility-styled component onto the live surface it renders bare in production** — the
same defect A14 just removed from the story lane, on the surface readers actually see. B16 must land an
`@source` before its first migration, not after.

The microsite was deliberately left untouched: it is B16's surface, not A14's.

---

## What this session did not do

The defer test held. No component was converted (that is B15). No fork was migrated (B16). No token slot
was registered and no emitter was edited (AK's call). The microsite was not fixed. A build-generated
`commits.json` that a diagnostic build regenerated was reverted rather than shipped.

## Next opener

**Build 17 — B4**, the post-deploy oracle upgrade plus the `AGENTS.md` amendment, carrying F24's fold-in.

Phase A is complete at 14/14, so nothing precedes it under ADR-0002 Decision 1. **B15 is now unblocked** —
A14 established the true floor, which was the whole ordering constraint — but it queues behind B4, which
was displaced from Build 16 when AK ruled F12 into Phase A and is otherwise unchanged.

**One thing B4 should absorb from this session.** The mandatory post-deploy check
(`curl -sI https://dispatchmag.dev/`) **could not be run from the build container.** The environment's
network policy denies `dispatchmag.dev:443` at the agent proxy — 403 to CONNECT, logged as
`connect_rejected` — and the Vercel API is unreachable for the same reason.

Production was verified instead by dispatching the **`uptime (prod smoke)`** workflow, which runs the
header oracle **and** the hydration smoke from inside CI. Result: **success, run dispatched 18:43:04Z**,
against a merge at **18:39:30Z**.

**State the limit precisely.** That run proves production served a 200 *and* hydrated, three and a half
minutes after the merge. It does **not** bind the check to a deployment SHA: the smoke reports no commit,
and nothing reachable from this session does either. That production is on `a49178c` is a sound inference
— the Vercel GitHub App is installed, the merge diff touches `code/`, so the Ignored Build Step did not
cancel it — but it is **inference, not measurement**, and is recorded as such. The board's prod line was
updated to the verified fact (smoke green, post-merge) rather than to an unconfirmed SHA.

The consequence for B4 is not the oracle choice — B4 is already ruled toward the E2E smoke, and this
session is evidence for that ruling. It is the **reachability** constraint, which is new: an agent-run
session may be structurally unable to perform the check `AGENTS.md` currently makes mandatory. B4's
amendment should name the CI-dispatched synthetic as the sanctioned path rather than assuming a local
`curl`, and should say what an agent does when the live surface is unreachable from its own container.

---

## Proposed rows — drafted for AK to place

The flag ledger lives outside this repo, so these are drafted here rather than filed. Both are measured,
not inferred; the measurements are above. **Neither is a new discovery about intent — both are gaps
between what the code says and what the token contract registers.**

### Proposed — `F28`: twenty-two utilities name unregistered token slots

- **Mechanism.** `packages/ui` components reference `text-text-strong`, `bg-surface-page`,
  `border-rail-edge`, `font-title`, `font-code`, and the un-suffixed `bg-`/`border-lane-*` forms. The
  generated `@theme inline` registers none of them — it has `--color-text-body-*`, `--color-lane-*-strong`,
  `--font-narrative` / `--font-civic` / `--font-mono`. Tailwind emits no rule for an unregistered slot, so
  the utilities are inert.
- **Measured.** 22 of the 169 distinct utilities the 18 utility-bearing components use. Verified absent
  from the microsite's production CSS as well, so the defect is **not** story-lane-only.
- **Not a rendering regression.** These were inert before A14 and are inert after it. A14 only made them
  visible, by making their neighbours work.
- **Two directions, and the choice is editorial.** Either register the missing slots in the token emitter
  (`packages/tokens`, which is drift-gated and CI-governed — a canon change, AK's alone), or correct the
  call sites to the registered names. The second is cheaper and touches only `packages/ui`; the first is
  the right answer if these names are what the canon *intends* to expose.
- **Phase.** Reads as **B**, and it should be **sequenced into B15**, not run beside it — B15 rewrites
  exactly these call sites, and doing both in one pass is the only way its "empty Chromatic diff"
  acceptance stays meaningful.
- **Cost of deferring.** Static today. Sharp at B15: converting an inert utility to real CSS is a
  behaviour change, so a B15 executed without this decision will either produce a non-empty diff it cannot
  explain, or silently ship colours and faces that were never rendering.

### Proposed — `B16` amendment: the production `@source` gap is confirmed, and gates B16's first migration

Not a new row — a **hardening of B16's existing "latent coupling worth naming" note**, which the promotion
checkpoint explicitly marked as inference pending first-hand verification.

- **Verified 2026-08-23**, against a real `pnpm build:astro` with `node_modules` installed: 32 theme-backed
  utilities are used only by `packages/ui`; **zero** appear in the microsite's built CSS. `packages/ui`
  resolves as a symlink under `apps/microsite-astro/node_modules`, and Tailwind v4 auto-detection excludes
  `node_modules`. There is still no `@source` anywhere in the repo outside `.storybook/tailwind.css`.
- **Amendment to B16's acceptance.** Add, as a precondition rather than a step: *`global.css` declares an
  `@source` covering `packages/ui/src`, and a utility-styled library component is proven to render styled
  in a production build, before any fork is migrated.*
- **Why it must be first.** B16's method ends with "switch the microsite to the subpath import, delete the
  fork." Executed against today's `global.css`, that ships a bare-rendering component to
  **dispatchmag.dev** — and the pixel floor excludes the homepage hero by design, so the gates most likely
  to catch it are the ones that do not cover it.
- **Cheap.** One line in `global.css`, and A14's file is a working reference for the mechanism and the
  path arithmetic.
