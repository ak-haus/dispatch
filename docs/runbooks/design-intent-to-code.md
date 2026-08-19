# Runbook — the design-intent-to-code lane (ADR-0003 §Stage 3, board S4)

> **Status:** operational since 2026-08-19 (S4 build). **Executor:** any ally session (Claude Code
> primary; Cursor sanctioned secondary, off the CI critical path). **Proof artifact:**
> `ImageWithCaption` (CD7 #24) — the first component taken through this lane end to end.

This lane turns **design intent** into shipped code. It is deliberately not a Figma-translation
lane: Dispatch's canon is markdown + tokens and **no Figma files exist**, so the ADR reframed the
stage around the inputs this repo actually has. Read this before building a component; the failure
modes at the bottom are the ones already paid for.

---

## The four inputs (read in this order, first-hand)

| # | Input | Where | What it settles |
|---|---|---|---|
| 1 | **The brand contract** | `DESIGN.md` (repo root) | Colors, the eight typography slots, the universal type rules (wordmark split, 12px floor, letterpress), motion gates, do's and don'ts. **Generated** — never hand-edit; edit `code/packages/tokens/scripts/emit/layout-design-md.mjs`. |
| 2 | **The generated tokens** | `code/packages/tokens/` → `dist/tokens.css` + `tokens.theme.css` | The only sanctioned values. Construction Rule 4: components consume `var(--token)`, never a literal. |
| 3 | **The component registry** | `code/apps/storybook` over `packages/ui` | What already exists, and the story idiom to match. |
| 4 | **The canon** | `representation/visual-system/` — CD1–5, plus `components-multimedia.md` (CD7) for #21–31, plus `components/construction-rules.md` | What the component *is*: the 7-field spec, the 7 hard rules, the tombstoned inventions you must not re-propose. |

Figma is a **dormant, read-only inbound lane** (register §4, option A). `.mcp.json` carries the
entry; it is **inactive** until AK performs the one-time OAuth, and only *if* a design artifact ever
originates in Figma. Nothing in this lane waits on it.

---

## The procedure

1. **Pick a component the canon already ratifies.** CD4's 20 are all built; the live gap is CD7
   §2.1 rows #21–31. Building an *unratified* component is a canon question, not a lane run — stop
   and take it to AK.
2. **Read the four inputs above, first-hand.** Then read the tombstone record named in
   `MANIFEST.yaml → chiseled-history` so you do not re-invent something already killed.
3. **Author the component** at `code/packages/ui/src/components/custom/<Name>/`:
   - `<Name>.tsx` + `<Name>.css` + `index.ts` + `<Name>.stories.tsx`, and export it from
     `packages/ui/src/index.ts`.
   - **Use a co-located `.css` file, not Tailwind utilities.** Storybook runs no Tailwind compile,
     so a utility-classed component renders unstyled in the story lane and Chromatic snapshots a
     fiction. Construction Rule 7 assumes a stylesheet anyway (each one opens with its own
     anti-pattern list).
   - Compose ratified components rather than restyling their concerns — the DLDS provenance band is
     `DldsPanel`, not a new band.
4. **Give it a render surface.** The story lane sees Storybook; the pixel floor and the evidence
   packet only see **routes**. Add cases to a `/preview/*` proving ground
   (`src/pages/preview/figure.astro` is the worked example — `noindex`, sitemap-excluded, static,
   eager-loaded). **Do not** reach for an article: AK owns content.
5. **Wire the gates** (details in the next section).
6. **Run the oracle locally**, then push and let CI be the judge.

### Local oracle — run all four before pushing

```bash
cd code && pnpm --filter @prime-dispatch/tokens build && pnpm --filter @prime-dispatch/tokens test
```

```bash
cd code && pnpm --filter @prime-dispatch/ui exec tsc --noEmit && pnpm --filter storybook test
```

```bash
cd code/apps/microsite-astro && pnpm exec astro check
```

```bash
cd code/apps/microsite-astro && pnpm test:e2e
```

`visual.spec.ts` will fail locally on a Mac — that is correct, not a defect. Baselines are
CI-linux only.

---

## The done-oracle — Stage-4 green

The lane has no acceptance criterion of its own. **The Stage-4 gates are the oracle**, and they are
ruleset-required: red is do-not-merge, mechanically.

| Mechanism | Gate | What the component must do |
|---|---|---|
| **Story lane** | `storybook (stories + a11y gate)` → Chromatic `dispatch_storybook` | Every story renders in headless Chromium and is **axe-green** (`a11y.test = "error"`). Cycle stories (dawn/dusk/night) + a reduced-motion story are expected coverage. |
| **Pixel floor** | `e2e (playwright + axe)` → `visual.spec.ts` | An element-scoped `toHaveScreenshot` per variant × 2 viewports, against **committed CI-linux baselines**. |
| **Evidence packet** | `design-review (evidence packet)` | The proving ground joins `judge.capture.spec.ts`, so the surface appears in the per-PR artifact **AK** reviews. |

Plus the always-on gates the change will touch: `typecheck`, `unit`, `build (astro)`, `tokens`
(drift), `design` (contract drift), `naming` (ls-lint), `lighthouse`.

### Baselines — the only sanctioned procedure

Baselines are generated in the CI linux runner, **never on a Mac** (documented rendering variance),
and a `*-chromium-darwin.png` is gitignored so a local run cannot enshrine a Mac render.

```bash
gh workflow run e2e.yml --ref <your-branch>
```

Then download the `visual-baselines` artifact from that run and commit its contents into
`code/apps/microsite-astro/e2e/visual.spec.ts-snapshots/`. Committing a baseline is a deliberate,
human-signed act — that is why the job is `workflow_dispatch` and never runs on push.

### The judge

**The judge for this lane is AK** (register §8, ruled 2026-08-19). CI produces the deterministic
evidence packet and links it on the PR; there is no LLM verdict, no calibration window, no ratchet.
`scripts/semantic-judge.mjs` stays in-tree and dormant — re-arming it is a register decision, never
a CI edit.

---

## The deferral test

The lane ships components **inside existing canon**. It makes no new visual decisions.

- A question the four inputs **can** answer → answer it and build.
- A question they **cannot** answer → file an **OQ** and build everything that does not depend on the
  answer. Do not decide it, and do not quietly narrow the component to avoid it. OQs surface in
  `DESIGN.md` §Adjudicated questions — which is generated, so **write the OQ into
  `code/packages/tokens/scripts/emit/layout-design-md.mjs` and rebuild**, never into the file itself;
  the contract drift gate rejects a hand-edit. OQ-7 and OQ-8 are the worked examples.
- A **mechanical defect** with one obviously correct answer (a broken ARIA pair, an unresolvable
  token) → repair it, document the repair inline, and name it in the PR. That is not a decision.

---

## Failure modes (each one has already cost a session)

- **Tailwind utilities in a `packages/ui` component.** Storybook has no Tailwind compile: the story
  lane captures an unstyled component and calls it green. Use a co-located stylesheet.
- **A token that resolves to nothing.** Before S4 the engine withheld the six `theme:true` font
  slots from `tokens.css`, so `var(--font-body)` was empty wherever Tailwind was absent.
  `__tests__/font-slots.test.mjs` now fails closed on this for every `var()` a component stylesheet
  reaches for — keep it passing rather than working around it.
- **Re-authoring page-owned treatment.** The letterpress (`.dispatch-emboss` / `.dispatch-burnin`)
  carries its own dusk/night overrides; a component reproducing it violates Rule 5. Apply the class
  and let `src/styles/letterpress.css` define it — Storybook imports that same file.
- **Capturing mid-entrance.** `whileInView` fires on intersection, so a capture must scroll the
  element into view *and* wait for the settled value. Batch-scrolling several elements then waiting
  once leaves the earlier ones unfired — settle each one individually.
- **Duplicate landmark names.** `DldsPanel` names its complementary landmark after the lane, so two
  same-lane instances on one page collide on axe `landmark-unique`. Pass an instance-specific
  `aria-label`.
- **Placeholder media.** Stories and preview pages use real shipped assets from
  `microsite-astro/public/` (Storybook reaches them via `staticDirs`). A colored rectangle on
  launch-ready code is a standing NEVER.
