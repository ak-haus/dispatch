---
title: checkpoint — 2026-10-12 (routine) — F67 was already fixed, 17 new advisories, no commits in 17 days
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-12 (routine)

Walked, oldest first, by each record's real arrival on `main`: `2026-09-21-checkpoint.md` (`74c0dbd`,
09:10:03), `2026-09-24-checkpoint.md` (`f179d7c`, 09:10:33, the newest *-checkpoint.md by filename —
register baseline), `2026-09-23-b33-f61.md` (`b0fba2a`, 09:15:08 — a build-session close whose filename
date precedes the baseline but whose merge to `main` lands after it; included for that reason, not
skipped on the name). All three merged within five minutes on 2026-09-25 and nothing has merged since —
`origin/main` HEAD is still `b0fba2a`, 17 days old. Since the baseline: F61 fully closed (Build 33);
F71–F73 filed; F49 diagnosed, not fixed. F67, which both checkpoints carried as open, is confirmed closed
— at Build 29, in the same commit that filed it.

**Verdict.** 2 register corrections (F67 closed, contra two checkpoints; F61 closed, confirmed first-hand);
6 items stand unchanged; 1 record-drift item resolved (`lifecycle/index.md`'s pointer), 2 stand (AGENTS.md
stale script names; the Build 27/30–32 close-record backfill, now also missing Build 33's own promised
backfill since nothing has merged since); 0 hygiene findings; advisories go from 0/0/0/0 to **0 critical ·
6 high · 6 moderate · 5 low**, all new since the baseline and none yet remediated. 1 new flag: 17 days
with no merge to `main` despite a Mon/Thu checkpoint cadence and three open flags (F71 WCAG AA, new
advisories) that need a build.

## Register

| Item | Delta |
|---|---|
| F61 (pull-quote-source + media) | **CLOSED**, confirmed — `src/lib/pull-quote.ts` + `ArticleSpread.tsx` now derive the quote from the MDX tree; `e2e/editorial-derivation.spec.ts` 9/9 green (`2026-09-23-b33-f61.md:57-99`). The 2026-09-24 report's "closed" claim for this half had no citation at the time it branched (`a05223d`); the only fixing commits (`8feb5df`/`585e7f1`) merged in `b0fba2a`, after both checkpoints. True now, unsupported then. |
| **F67** (`/about` scrollable-region-focusable) | **CORRECTION — CLOSED, not open.** Both `2026-09-21-checkpoint.md:89-93` and `2026-09-24-checkpoint.md:110-111` carry it open ("no evidence of a fix"). `SpheresSpread.tsx:340-345` (`<pre tabIndex={0} role="region" aria-label="Crossfire dossier deck source listing">`) was added in `4512fae`, the Build 29 commit whose own trailer reads "(F50 F51 F64 F53 F44 F45 F67)" — the same commit that filed it. Unchanged since; still on `main` today. Both checkpoints read the Build 29 record's prose (which undersold its own commit — see Record drift, carried forward) instead of the diff. |
| F71 (Crossfire depiction buttons, WCAG 2.2 SC 2.4.11) | stands open — filed at Build 33, needs Build 34 before D1; no commit since |
| F72 (`readingTime` authored-and-wrong) | stands open — AK's ruling, then a build; no commit since |
| F73 (`astro preview` backgrounds under agent detection) | stands open — `2026-09-23-b33-f61.md:206-208` names the fix as "a checkpoint adds it to AGENTS.md §Commands"; out of this routine's scope (report-only), flagged below |
| F49 (archive-lane 3rd Chromatic change) | **CHANGED** — diagnosed, not fixed. B33 traced it to `/wire`'s `dayLabel` (`WirePage.tsx:80`) printing the e2e stub's capture day as plain text; repair direction proposed (pin the stub's clock) but unvalidated, no commit |
| F42 (vitest/Storybook major) | unchanged — `microsite-astro/package.json:86` `vitest ^3.2.7`; `apps/storybook/package.json:23,33` `@storybook/addon-vitest`/`storybook` `^9.1.20` |
| F60 (DESIGN.md:311 WCAG 1.4.4 citation) | unchanged — `DESIGN.md:311` still cites SC 1.4.4 Resize Text for R1a, not re-grounded |
| F37 / CartographyCanvas → T8 | unchanged — `global.css:7` imports maplibre-gl's stylesheet; `CartographyCanvas.tsx` exists but `index.astro:48` and `ToolingBlock.astro:7` only reference it in comments/copy, still unmounted |
| F36 → B18 (share metadata) | unchanged — built, awaiting AK's real-platform card check |
| F28, F29, B3, B17, B6–B11 | unchanged — AK one-clicks / governance / parked rows; nothing in the repo bears on them this run |
| BR1 (branch hygiene) | holds — `git branch -r` = `origin/main` only |

## Record drift

1. **Resolved since the baseline: `lifecycle/index.md`'s "Latest" pointer.** Both prior checkpoints
   flagged it stale; `b0fba2a` updated it (`lifecycle/index.md:17`) to Build 33/F61, correctly naming
   F71–F73 and the Build 27/30–32 backfill debt. No action needed.
2. **`AGENTS.md:44-45` is still stale**, as the 2026-09-24 report found: `Next dashboard: cd code &&
   pnpm dev:next` and `build:next` name scripts that don't exist in `code/package.json`, and
   `code/apps/` holds only `microsite-astro` and `storybook`. Unchanged.
3. **The close-record backfill owed since 2026-09-21 is still owed, and has grown by one.** No
   `lifecycle/checkpoints/*.md` exists for PR #61 (Build 27), #62, #64 (Build 30), #65 (Build 31), or
   #66 (Build 32) — five merges, confirmed again this run (`git log --first-parent --diff-filter=A --
   lifecycle/checkpoints/*.md` still stops at the files already named by the 2026-09-21 and 2026-09-24
   reports). `2026-09-23-b33-f61.md:219-221` itself names this backfill as "a checkpoint's" to do;
   this routine does not do it, per charter (report-only).
4. **The Build 29 record (`2026-09-20-b29-phase-b-close.md`) still undersells its own commit**, as the
   2026-09-24 report found (F44/F45/F67 fixed in `4512fae` but absent from its "landed" table). This is
   almost certainly why both checkpoints misread F67 as open — carried forward as an explanation, not a
   new finding.
5. No contradiction found in `.claude/CLAUDE.md` this run. `representation/visual-system/components/
   index.md`'s 19 children match the 19 component folders on disk exactly — no drift (no component
   churn since the last check, consistent with zero commits since `b0fba2a`).

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31` — the same
  quoted Sentry SDK comment both prior reports found. No new hits.
- **Remote branches:** `git branch -r` returns `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, PEM headers, `ghp_…`,
  `xox[baprs]-…`) across `code`, `lifecycle`, `docs`, `.github`. The one pattern hit is the known
  false positive recorded since 2026-09-07: `code/apps/microsite-astro/deploy.md`'s Render disk id
  (`dsk-…`) contains the `sk-` substring; not a credential.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 6 high · 6 moderate · 5 low** across 642
production dependencies. All 17 are new since the last report (0/0/0/0, confirmed twice, most recently
2026-09-21). None are a direct dependency; all ride transitively through `astro` or `posthog-js`.

- **undici** (`apps__microsite-astro>astro>unifont>undici`, `>=8.0.0 <8.10.2`, patched `>=8.10.2`): 3
  high (`GHSA-rfgv-xxqx-mfg5`, `GHSA-w293-vg96-wgc3`, `GHSA-vp8m-p9jh-q5pm`), 5 moderate (incl.
  `GHSA-3wwx-pv8p-q78v`, a WebSocket DoS, CVE-2026-85024), 3 low. Created 2026-09-28/29.
- **sharp** (`apps__microsite-astro>sharp`, `<0.35.5`, patched `>=0.35.5`): 1 high, `GHSA-wq5f-xc86-pv6w`,
  created 2026-10-06.
- **source-map-js** (`...>@astrojs/react>vite>postcss>source-map-js`, `<1.2.2`, patched `>=1.2.2`): 1
  high, `GHSA-68fv-2mgg-jv7q`, created 2026-09-18.
- **http-cache-semantics** (`...>astro>http-cache-semantics`, no fix published, patched `<0.0.0`): 1
  high, `GHSA-ch52-4w7c-c8xp`, created 2026-09-18.
- **smol-toml** (`...>@astrojs/markdown-satteri>@astrojs/internal-helpers>smol-toml`, `<=1.8.0`, patched
  `>=1.9.0`): 1 moderate, `GHSA-r4xh-jqrq-34v2`, created 2026-10-05.
- **dompurify** (`...>posthog-js>dompurify`, `<=3.4.15`, patched `>=3.4.16`): 2 low,
  `GHSA-p98j-92pf-mc4p`/`GHSA-6688-9rhm-gjv2`, created 2026-09-30/10-05.

Report only; nothing upgraded.

## New flags for the Golden Board

- **New — 17 days with no merge to `main`.** `origin/main` has sat at `b0fba2a` (2026-09-25) through
  today; no Mon/Thu checkpoint and no build session landed in that span, despite F71 (a filed WCAG 2.2
  AA failure blocking D1), F72 (AK's ruling pending), and now 17 live advisories standing open. AK's to
  weigh whether the routine stalled or the backlog was deliberately parked.
- **F67 close two checkpoints missed** (above) is corrected in this report's register; no further
  action — closing it here, not silently.
- **F73** (`2026-09-23-b33-f61.md:206-208`) asks a checkpoint to add `ASTRO_PREVIEW_BACKGROUND=1`
  guidance to `AGENTS.md` §Commands. This routine is report-only and does not edit `AGENTS.md`; filing
  it here for whichever session (build or human) makes repo edits next.
