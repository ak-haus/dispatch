---
title: checkpoint — 2026-09-24 (routine) — near-complete Phase C landed, three builds shipped with no close record
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-24 (routine)

Walked, oldest first, by each record's own arrival on `main`: `2026-09-19-sweep-landing.md` (`acb7bbe`),
`2026-09-19-checkpoint.md` (`3b5cd6b`, the newest prior routine report), `2026-09-19-b1-astro7.md`
(`ec1852e`), `2026-09-19-b5-dead-weight.md` (`072d1de`), `2026-09-19-b18-share-metadata.md` (`ead3295`),
`2026-09-19-f40-b12-speed.md` (`4e143ff`), `2026-09-19-b26-instruments-cleanup.md` (`855e417`),
`2026-09-20-b29-phase-b-close.md` (`8ed901d`/`4512fae`) — then three merged PRs (#64 `b35dde5`, #65
`cc204e8`, #66 `a05223d`) that carry no checkpoint record at all (see Record drift). Since the newest
routine report: F34 (advisories), B12, B13's residual, the semantic-judge line, Build 22, F39–F45, F48,
F50–F67 (nearly all of Phase C) closed; F36/B18 built and awaiting AK's sign-off; F37, F42, F46, F60,
F67, F29, F28, B3(→E), B17, B6–B11(parked) stand open.

**Verdict.** 11 baseline register items resolved (9 closed, 1 built-pending-AK, 1 unchanged); roughly 24
flags filed and closed across Builds 22–32; 3 record-drift findings, the most serious being three merged
build sessions (#64–#66) with zero lifecycle close records; 0 hygiene findings beyond the known Sentry
excerpt; advisories now 0/0/0/0 (was 18); 1 process flag for the Golden Board (below).

## Register

**Baseline items, from `2026-09-19-checkpoint.md`:**

| Item | Delta |
|---|---|
| F34 (18 advisories) | **CLOSED** — `pnpm audit --prod` 18 → 2 (Build 22) → 0 (Build 23, `microsite-next` removed); still 0 today |
| F35 (landing path) | unchanged, resolved |
| F36 → B18 (share metadata) | **CHANGED** — built at Build 24 (`ShareMeta.astro`, `/rss.xml`, OG cards); `2026-09-20-b29-phase-b-close.md:31` "BUILT, closes on AK's real-platform check" — still open, awaiting AK |
| F37 (maplibre stylesheet) | unchanged — rides T8; `global.css:7` still imports it, `CartographyCanvas` still unmounted |
| B12 (home LCP) | **CLOSED** — `2026-09-19-f40-b12-speed.md:210` 12700 → 6620 ms, re-measured on production |
| B13 residual (CLS ceiling) | **CLOSED** — 0.42 → 0.28 (Build 22) → 0.05 (Build 25, faces hydrated in CI) |
| semantic-judge 12px line | **CLOSED** — `code/apps/microsite-astro/scripts/semantic-judge.mjs:78` now scores "type that scales with no fixed pixel floor" |
| Build 22 / B1 (Astro upgrade) | **CLOSED** — `astro` `^6.4.8` → `7.3.3`, deployed; `package.json` confirms 7.x today |
| BR1 (branch hygiene) | holds — `git branch -r` = `origin/main` only |
| CartographyCanvas → T8 | unchanged, still unmounted, rides with F37 |
| B6 / Crossfire | not audited (ADR-0002 §Decision 4 amendment, 2026-09-19) |

**Flags accumulated during the walk, closed:** F31, F38, F39, F40, F41 (F30 retired with it), F43, F44,
F45, F48, F50, F51, F53 (copper half, `Build 29`; lane half, `Build 30`/`b35dde5`, `tokens.css:102`
`--dispatch-lane-editorial-label`; dark-cycle half still rides T4), F54, F55, F56, F57, F58, F59, F61
(both the pull-quote-source defect and, per commit `e0593f3`, the media half), F62, F63, F64, F65, F66.
Verified a sample first-hand rather than trusting commit prose alone: `tokens.css:102` and
`contrast.test.mjs:130-138` confirm F53's lane fix; `StackLayout.astro:73-81` confirms F44/F45.

**Still open:** F42 (Phase T — `vitest` 3.2.7 stays; a Storybook 9→10 major is required, unstarted) ·
F46 (rides T5/OQ-7, unaddressed) · F60 (Phase T — `DESIGN.md:311` still cites WCAG 1.4.4 for R1a, the
citation Build 29 found mis-grounded; not yet re-grounded) · F67 (new at Build 29, `/about`'s
`scrollable-region-focusable` violation — not in any B30–B32 commit message, appears unaddressed) · F29,
F28 (AK one-clicks/governance, per `2026-09-20-b29-phase-b-close.md`) · B3 (moved to E) · B17
(conditional, filed) · B6–B11 (parked for Crossfire).

## Record drift

1. **Three build sessions merged with no checkpoint record.** `git log --diff-filter=A -- lifecycle/checkpoints/*.md` stops at `4512fae` (the Build 29 record). PRs #64 (`b35dde5`, "F53 F54"), #65
   (`cc204e8`, "F63 F66") and #66 (`a05223d`, "F55 F47 F52 F57" / "F56 F58 F59" / "F65, F61 media half" /
   "F62") all landed real code and new e2e specs (`code/apps/microsite-astro/e2e/public-routes.spec.ts`,
   `ssr-reveal.spec.ts`, `reduced-motion.spec.ts`, `keyboard-floor.spec.ts`, `media-honesty.spec.ts`,
   `menu-reachability.spec.ts`, `reflow.spec.ts`, `scroll-lock.spec.ts`, `dead-links.spec.ts`) but no
   `lifecycle/checkpoints/*.md` file. This breaks ADR-0002 §Decision 4's close ritual and the audit
   trail this routine depends on — the register above for those items rests on commit messages and a
   spot-check, not a written record.
2. **The Build 29 record undersells its own commit.** `2026-09-20-b29-phase-b-close.md`'s "What landed
   in this build" table (lines 187-198) lists only F50, F64, F51, F53(copper) with pins. The commit it
   describes, `4512fae`, also fixed F44 and F45 ("F44 conditional brand suffix. F45 both icons
   declared.", commit body) and filed F67 — none of which appear in the record's own landed table, only
   in its sort table as still-open Phase C rows. `StackLayout.astro:73-81` confirms F44/F45 are in fact
   fixed on `main`.
3. **`lifecycle/index.md:18`'s "Latest" pointer is stale.** It still names Build 23
   (`2026-09-19-b5-dead-weight.md`), `last_amended: 2026-09-19`. Five build sessions have landed since
   (B18, F40/B12, the instruments cleanup, Build 29, and the three unrecorded builds above) with no
   index update. `2026-09-19-b5-dead-weight.md:73-74` itself explains routine sweeps can no longer touch
   the index (auto-merge, single-file diff) — but build-session closes still can and, until Build 24,
   did; that convention lapsed here too.

No other drift found. `AGENTS.md:44-45` was checked against the repo (`code/apps/` now holds only
`microsite-astro` and `storybook`; `code/package.json` carries no `dev:next`/`build:next` script) and
**is** stale — `Next dashboard: cd code && pnpm dev:next` and `build:next` both name a script that no
longer exists, missed by the Build 23 doc sweep that otherwise removed `microsite-next` from this file's
layout line. `representation/visual-system/components/index.md`'s child list was not re-diffed this run
(no B-phase component churn since the last check). `status: active` is uniform across all 25 checkpoint
records and all 68 repo `index.md` files — it is schema boilerplate, not a per-item signal, so it is not
treated as drift.

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31` — a quoted
  Sentry SDK comment, not a live TODO. No new hits since the last report.
- **Remote branches:** `git branch -r` returns `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, PEM headers, `ghp_…`,
  `xox[baprs]-…`), scanned across `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 0 high · 0 moderate · 0 low** across 642
production dependencies. Down from 18 at the last routine report (F34, closed at Build 23) and unchanged
since. No new advisory.

## New flags for the Golden Board

- **New — the close ritual is lapsing under load.** Three consecutive build sessions (#64–#66) shipped
  without a `lifecycle/checkpoints/*.md` record, and the one record that did land (`4512fae`) omitted
  two of the fixes its own commit made. Both are process gaps in ADR-0002 §Decision 4's close ritual,
  not code defects; AK's to weigh (a required file in the PR, or a lint checking every merge to
  `code/apps/microsite-astro` against a same-PR checkpoint file).
- **F67** (`/about`'s `scrollable-region-focusable` `<pre>`, WCAG 2.1.1, filed at Build 29) has no
  evidence of a fix in `main`; carrying it forward as open rather than closing it silently.
