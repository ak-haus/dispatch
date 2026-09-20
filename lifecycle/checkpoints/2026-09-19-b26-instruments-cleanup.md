---
title: build session close — 2026-09-19 instruments and cleanup (Build 26 · F42 · F31 · F33 · F41 · F30)
status: active
session_type: build
column: the story rail's own gaps, then the dead surfaces
---

# Build session close — 2026-09-19 (Build 26 · F42 · F31 · F33 · F41 · F30)

> Four instrument flags and one removal. Two of the four rows did not survive first-hand
> re-verification as filed: **F42 names the wrong importer** and **F33 is inverted** — the story rail
> audits the desktop chrome and has never audited the mobile half. Both are corrected below against
> measurement, not argument. F31 closed and immediately earned its keep: the sweep it enabled found a
> real dual-vite type defect that the old exclusion had been hiding. F41 closed on AK's ruling, and
> F30 retired with it.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| Branch base | `origin/main` at `fcc9812`; #58 merged `4e143ff` |
| Post-deploy smoke on that merge | green — `uptime` run `35477602617`, 2026-09-20T00:00:20Z |
| Hydration | `pnpm install --frozen-lockfile` clean; Playwright Chromium already present |
| Baseline typecheck | 0 errors across all four projects before any edit |
| Baseline rail | 47 files / 355 tests green, 18.7 s |

---

## F42 — the row names the wrong importer; the release exists but the rail cannot take it

**Re-filed, corrected. Not closed.**

The row read: *"Since Build 22 the Astro app resolves Vite 8.3.0, and `@vitest/mocker` 3.2.7 declares a
peer of Vite 5–7; `pnpm install` prints the unmet peer … The repair is a vitest release whose peer range
includes Vite 8."* Three things measured differently.

**1. The release exists.** `@vitest/mocker` peer ranges, read from the registry:

| version | `vite` peer | accepts Vite 8 |
|---|---|---|
| 3.2.7 (installed, `V3` dist-tag — the newest 3.x) | `^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0-0` | no |
| 4.1.11 (`V4`) | `^6.0.0 \|\| ^7.0.0 \|\| ^8.0.0` | yes |
| 5.0.1 (`latest`) | `^6.0.0 \|\| ^7.0.0 \|\| ^8.0.0` | yes |

**2. The story rail is not the pinned importer.** The warning, reproduced first-hand:

```
apps/microsite-astro
└─┬ @vitest/browser 3.2.7
  └─┬ @vitest/mocker 3.2.7
    └── ✕ unmet peer vite@"^5.0.0 || ^6.0.0 || ^7.0.0-0": found 8.3.0
```

It names `apps/microsite-astro`, not `apps/storybook`. Two facts behind it. `vitest@3.2.7` takes `vite`
as a **direct dependency**, not a peer, so the rail installs its own — the lockfile resolves
`@vitest/mocker@3.2.7` against `vite@6.4.3` and `vite@7.3.6`, and there is no vite-8 variant of it in
the tree. And the astro app never declares `@vitest/browser`: it is an *optional* peer of vitest that
this workspace's `auto-install-peers=true` fills from apps/storybook's copy. The astro app's
`vitest.config.ts` is `environment: 'happy-dom'` over pure TS units — it does not run browser mode at
all. So the unmet peer sits on a package that importer never loads.

**3. What actually blocks the rail is Storybook, not vitest.**

| package | `vitest` peer | also requires |
|---|---|---|
| `@storybook/addon-vitest@9.1.20` (installed) | `^3.0.0` | `storybook@^9.1.20` |
| `@storybook/addon-vitest@10.6.0` (latest) | `^3.0.0 \|\| ^4.0.0` | `storybook@^10.6.0`, `@vitest/browser-playwright@^4.0.0` |

So vitest 4 costs a Storybook 9 → 10 major plus the v4 browser-provider split
(`@vitest/browser` → `@vitest/browser-playwright`). **Vitest 5 is not available on a stable Storybook
at all**: `latest` (10.6.0) reads `^3.0.0 || ^4.0.0`, and the first peer range admitting `^5.0.0` is
`11.0.0-alpha.1` on the `next` dist-tag — an alpha, so not a candidate. Either way it is a build of
its own, not an inline fix.

**What the Vite split actually cost, and what landed for it.** The split is not only a warning. F31's
sweep put `packages/ui/vitest.config.ts` under tsc for the first time and it failed immediately:
`@vitejs/plugin-react@5.2.0` had resolved against `vite@8.3.0` (hoisted from Astro 7, whose peer range
allows it) while `vitest/config`'s `defineConfig` is typed against `vite@7.3.6` — two Vite type
universes in one eleven-line file, down to `rolldown`'s `PluginContextMeta` vs `rollup`'s.

> `Type 'Plugin<any>[]' is not assignable to type 'PluginOption'` … `Property 'rolldownVersion' is
> missing in type … rollup … PluginContextMeta`

Repaired by declaring `vite@^7.3.6` in `packages/ui` so the plugin and the runner agree on one Vite —
the same "declare it in the workspace" rule the module-resolution record already carries. That importer
is out of the warning now; `apps/microsite-astro` remains, and remains the row.

---

## F31 — closed: the stories and the ui tests are gated

The row was exact: `packages/ui/tsconfig.json` excluded `src/**/*.stories.tsx`, `src/**/*.test.ts` and
`src/**/*.test.tsx`, and `apps/storybook/tsconfig.json` included `.storybook/**/*` and `src/**/*` — a
directory that **does not exist** in that app. Nothing covered the 47 story files or the 12 test files.
Two more authored files were uncovered for the same reason: `packages/ui/test-setup.ts` and both
`vitest.config.ts` files, all outside their tsconfig's `include`.

**Why the filed repair direction could not work as written.** The row proposed sweeping
`../packages/ui/src/**/*.stories.tsx` from the storybook app "which holds the SB types." Tried first;
tsc resolves a bare import from the *importing file's* directory, not the tsconfig's, so all 47 story
files still failed `TS2307: Cannot find module '@storybook/react-vite'` — with 96 `TS7006` implicit-any
errors cascading off the untyped `Meta`/`StoryObj`. 143 errors, one root cause.

**What landed instead.** `packages/ui` now declares what its own source imports — `@storybook/react-vite`
(the only bare import in the stories besides `react`), plus `storybook@^9.1.20`, because
`auto-install-peers` otherwise satisfied the undeclared peer with `storybook@10.2.13` against an app
pinned to 9. With the dependency declared where the code lives, one program covers the package:

- `packages/ui/tsconfig.json` — `include: ["src/**/*", "test-setup.ts", "vitest.config.ts"]`,
  `exclude` down to `node_modules`/`dist`, `rootDir: "."` (it was `./src`, which rejects the root files;
  the `outDir` beside it was dead under `noEmit` and went with it). `test-setup.ts` is not optional
  here — it carries `@testing-library/jest-dom/vitest`, so the matcher types only reach the `.test`
  files when it is in the same program.
- `apps/storybook/tsconfig.json` — its own tree plus its `vitest.config.ts`; the phantom `src/**/*` is gone.

Both ride `pnpm -r --parallel typecheck`, which **is** the `typecheck (tsc)` context. No new ruleset seat.

**Negative test.** Appending `{ args: { currentChapter: "not-a-number" } }` to a ChapterRail story —
the row's own stated failure mode, an arg-shape drift that still renders — now fails the gate:

```
ChapterRail.stories.tsx(205,48): error TS2322: Type 'string' is not assignable to type 'number'.
```

Reverted after the run. The gate is green over all 47 stories, 12 test files and 4 root configs.

---

## F33 — the row is inverted: the rail audits desktop and has never audited mobile

**Corrected and guarded. The remaining half is re-filed.**

The row read: *"vitest's viewport is 414×896 … Components whose desktop rendering hides below a
breakpoint … render display:none in the rail's browser, so their story a11y 'passes' audit only the
mobile-visible content."* The cited vitest source line is real —
`resolved.browser.viewport.width ??= 414` sits in the installed 3.2.7 — but it never reaches the story.

**Measurement.** A throwaway probe story, run in the rail and then deleted:

```
PROBE inner=1200 outer=1280 screen=1280 parent=1280 isTop=false mq64=true display=block
```

`mq64` is `(min-width: 64rem)`, the library's widest gate. It is **open**, and ChapterRail's desktop
rail computes `display: block`. Setting `browser.viewport` to `500×900` — at the top level and again
per instance — changed nothing: still 1200.

**Mechanism.** `@storybook/addon-vitest` owns the width, not vitest. In
`dist/vitest-plugin/test-utils`:

```js
var DEFAULT_VIEWPORT_DIMENSIONS = { width: 1200, height: 900 }
…
setViewport = async (parameters = {}, globals = {}) => { … await page.viewport(viewportWidth, viewportHeight) }
```

and `testStory` calls `await setViewport(composedStory.parameters, composedStory.globals)` before every
single story run. Unless a story declares `parameters.viewport.defaultViewport`, every story is forced
to 1200×900 — overriding whatever vitest resolved. That is why an earlier negative test (a nameless
`<button>` injected inside the 64rem-gated desktop rail) failed on *both* a "mobile" and a "desktop"
instance: both were rendering at 1200.

**What this means.** Every width gate in the library is **below** 1200, so all of it is audited today:

| component | gate |
|---|---|
| AgentTraceCallout · CartographyStrip ×2 · ComparisonGrid · PlotChart · SiteNav | 48rem |
| PullQuote ×3 (one at 64rem) · ChapterRail ×2 | up to 64rem |

11 gated blocks across 7 components, widest 64rem = 1024px. The board's note that "nothing has slipped"
was right; the reason was not Chromatic and the e2e floors covering for the rail — the rail was covering
it directly. The genuinely unaudited half is **mobile**: ChapterRail's mobile chip and `<dialog>` sheet
are `hidden at lg+`, and the rail has never rendered them.

**What landed.** The desktop coverage was an accident of a vendor default that nothing pinned. It is now
an invariant — an `afterEach` guard in `.storybook/vitest.setup.ts` that fails the lane if the rail ever
renders below the library's widest gate, naming `DEFAULT_VIEWPORT_DIMENSIONS` as the thing to check. It
runs `afterEach` and not `beforeEach` because `setViewport` fires inside the addon's own test function.
Negative-tested by raising the constant to 1600: the lane went red with the intended message on every
story. Cost: nothing measurable — 355 tests, 16.0 s against an 18.7 s baseline.

**Re-filed.** Auditing the mobile half is a real instrument row, not an inline fix: `browser.viewport` is
not the lever, so it needs story-level `parameters.viewport` (which would move the *whole* rail to
mobile and give up the desktop scan) or a second rail pass with its own preview annotations. Costed, not
attempted here.

---

## F41 — closed: four consumer-less surfaces removed · F30 retired with them

AK ruled **remove all four** (2026-09-19), with the measurements below in hand.

Verified before asking: `next-shell`'s only two importers were in `microsite-next`, deleted at Build 23;
`data`, `forms` and `state` have no subpath export, no re-export from `src/index.ts`, and no importer
anywhere in the repo. The cluster is closed — `next-shell` → `state/theme-cycler-blocking-script` and
`data/use-stub-query.ts` → `state/theme-cycler` (type-only) are internal, and its one live edge,
`next-shell` → `motion/LenisRoot`, leaves `LenisRoot` in place in the `motion` barrel.

| removed | count |
|---|---|
| Files (`src/next-shell.ts`, `src/data/`, `src/forms/`, `src/state/`) | 14 |
| Runtime deps, used nowhere else in the repo | 4 — `zustand`, `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers` |
| Package exports | `./next-shell` |
| ui suite | 110 → **86** tests, 12 → **9** files (theme-cycler 10, data 9, use-schema-form 5) |

**F30 is retired, not deferred.** The collision was two protocols on the `prime-cycle` key: the
library's zustand store persisting `{"state":{"cycle":…},"version":1}`, against the shipped raw string
that the microsite's blocking FOUC script and the ported SiteNav both read. `state/` held the losing
side, so removing it leaves exactly one writer. The two places that documented the hazard —
`SiteNav.tsx`'s header and the assertion comment in `site-nav.test.tsx` — now record current truth
instead: the raw string is the only protocol on that key, and the two ends agree by construction. The
unit assertion pinning the raw string stays.

---

## Verification

| Gate | Result |
|---|---|
| `typecheck (tsc)` | 0 errors — 4 projects, now including 47 stories + 12 test files + 4 root configs |
| `unit (vitest)` — tokens | 56 pass |
| `unit (vitest)` — ui | **86** pass / 9 files (was 110 / 12; the 24 belong to the removed surfaces) |
| `unit (vitest)` — microsite-astro | 106 pass / 7 files |
| `storybook (stories + a11y gate)` | 355 pass / 47 files, a11y-as-error, audit-width guard live |
| `tokens (drift gate)` | build + 56 tests, no generated-file drift |
| `design (contract drift gate)` | `DESIGN.md` unchanged |
| `tokens-lint (governance gate)` | eslint clean; component stylesheets literal-free |
| `naming convention (ls-lint)` | clean |
| `content (schema gate)` | `astro sync` clean |
| `build (astro)` | 14 pages; `commits.json` churn restored, as the hydration record requires |
| `e2e (playwright + axe)` | run in the pinned container |

## What this leaves open

- **F42** stays open against `apps/microsite-astro`, with the blocker measured: vitest 4 needs Storybook
  9 → 10 and the browser-provider split; vitest 5 is unavailable to Storybook at any version.
- **F33** stays open for the **mobile** half only; the desktop half is closed and now guarded.
- **F30** closes with F41.
- Noted in passing, not filed: `motion/LenisRoot` has no importer either now that `next-shell` is gone.
  It stays exported from the `motion` barrel, which is a library-API question rather than dead weight —
  the microsite drives Lenis itself from `StackLayout.astro`.
