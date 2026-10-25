---
title: checkpoint — 2026-10-01 (routine) — F67 was already closed, advisories regress from zero, the prior routine report skipped its own predecessor
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-01 (routine)

Walked by arrival on `main`: `2026-09-24-checkpoint.md` (`f179d7c`, 2026-09-25T09:10:33 — the newest
routine report, filename-dated latest, register baseline) and `2026-09-23-b33-f61.md` (`5acacb9`/
`3a64892`/`dace8e6`, arrived 2026-09-25T09:15:08 — after the routine report, despite its earlier
filename date; `git log --diff-filter=A` on each file is the source). `2026-09-21-checkpoint.md`
(`74c0dbd`, 09:10:03) arrived 30s before the routine report but was never walked by it — see Record
drift 2. Since the routine report: F67 is corrected from open to closed; its stale-index-pointer
finding is resolved; F61 stands closed; Build 33 filed F71–F73; `pnpm audit` regresses from 0/0/0/0 to
3 high / 5 moderate / 4 low, all new since 2026-09-28.

**Verdict.** 3 register deltas (F67 closed, the index pointer closed, advisories regressed); 3 record-
drift findings (Build 29's record undersells its own commit a second way, the routine report's own walk
gap, a still-stale AGENTS.md line); 0 hygiene findings; 3 new flags (F71–F73, filed at Build 33, none
fixed).

## Register

- **F67 — CLOSED, correcting the routine report.** `2026-09-24-checkpoint.md:50-53` carries it as "not
  in any B30–B32 commit message, appears unaddressed." It shipped earlier: `SpheresSpread.tsx:340-345`
  has `tabIndex={0} role="region" aria-label=…` today, and `git blame -L338,344` dates it to `4512fae`
  (2026-09-20), whose own commit trailer reads "fix(b29): … (F50 F51 F64 F53 F44 F45 **F67**)." The
  build's own record, `2026-09-20-b29-phase-b-close.md:173-174`, states only "Filed as F67" and its
  landed table (`:187-198`) omits it — the same undersell pattern the routine report already caught for
  F44/F45 (`2026-09-24-checkpoint.md:67-72`), extending to a third flag from the same commit.
- **lifecycle/index.md pointer — CLOSED.** The routine report's finding 3 (`2026-09-24-checkpoint.md:
  73-78`) is stale: `lifecycle/index.md:7` now reads `last_amended: 2026-09-23` and its Latest entry
  (`:18`) correctly names Build 33, including the line "(Close records for Builds 27 and 30–32 are a
  checkpoint's backfill.)" Build 33's own PR landing after the routine report explains the gap the
  report measured.
- **F71, F72, F73 — open, filed at Build 33, no fix on `main`.** F71 (`b33-f61.md:184-195`, WCAG 2.2
  SC 2.4.11 on the Crossfire depiction buttons) awaits Build 34, named as the opener before D1. F72
  (`:196-205`, authored `readingTime` vs. a measured 333–479 words) awaits AK's ruling among three
  options. F73 (`:206-208`, `astro preview` backgrounds under agent detection) names its own fix
  ("a checkpoint adds it to AGENTS.md §Commands") — not done; `grep` for `AI_AGENT`/
  `ASTRO_PREVIEW_BACKGROUND` across `AGENTS.md` and `.claude/CLAUDE.md` returns nothing. Recorded as a
  line, not actioned — this session writes no code or docs changes.
- **Close-ritual gap for Builds 27, 30, 31, 32 — still open, independently reconfirmed.** No
  `lifecycle/checkpoints/*.md` exists for PR #61 (`ef03bd7`, Build 27), #62 (`71fba88`), #64 (`b35dde5`,
  Build 30), #65 (`cc204e8`, Build 31) or #66 (`a05223d`, Build 32). First flagged at
  `2026-09-21-checkpoint.md:63-72,94-96`; the routine report's own drift finding 1
  (`2026-09-24-checkpoint.md:59-66`) only names #64–#66, missing #61/#62 because it never walked the
  2026-09-21 report (Record drift 2); `b33-f61.md:219-221` and `lifecycle/index.md`'s own Latest line
  both still call this "a checkpoint's backfill" — unclaimed by any session since.
- **Unchanged, re-verified first-hand:** F37 (`global.css:7` still imports `maplibre-gl/dist/
  maplibre-gl.css`; `CartographyCanvas.tsx` exists but is referenced only in comments —
  `index.astro:48`, `EditorialDistrictMapHero.tsx:59` — never mounted). F42 (`package.json:86` still
  pins `vitest ^3.2.7`; `apps/storybook/package.json:23,33` still pin `^9.1.20`). F60 (`DESIGN.md:311`
  still cites WCAG 1.4.4). F46 (rides T5/OQ-7, unaddressed). F36→B18 (built, still awaiting AK's
  real-platform card check). BR1 (`git branch -r` = `origin/main` only). F28, F29, B3(→E), B17
  (conditional, unfired). B6–B11 — not audited (ADR-0002 §Decision 4 amendment, 2026-09-19).

## Record drift

1. **Build 29's record undersells its own commit, a third time.** Beyond F44/F45 (already caught), F67
   also landed in `4512fae` unlisted in `2026-09-20-b29-phase-b-close.md`'s landed table — see Register.
2. **The 2026-09-24 routine report never walked `2026-09-21-checkpoint.md`.** Its own stated walk
   (`2026-09-24-checkpoint.md:10-16`) runs `2026-09-19-b26-instruments-cleanup.md` →
   `2026-09-20-b29-phase-b-close.md` → PRs #64–#66, skipping the 2026-09-21 report entirely, even
   though `74c0dbd` (2026-09-21's merge) landed on `main` 30 seconds before `f179d7c` (the 2026-09-24
   report's own merge). That report accordingly dropped 2026-09-21's PR #61/#62 half of the close-ritual
   finding (Register, above). The substance survived only because Build 33 and `lifecycle/index.md`
   independently restate it — a report that "restates every open item" is not reliable proof an item was
   seen, only that nothing else contradicted it this round.
3. **`AGENTS.md:44-45` is still stale.** "Next dashboard: `cd code && pnpm dev:next`" and
   "`build:next`" name scripts `code/package.json` does not define; `code/apps/` holds only
   `microsite-astro` and `storybook` (`ls code/apps/`). Flagged at `2026-09-24-checkpoint.md:80-83`;
   unchanged since.

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31` — the same
  quoted Sentry SDK comment as every prior report. No new hits in `apps/microsite-astro/src`,
  `packages/ui/src`, `packages/tokens/src`.
- **Remote branches:** `git branch -r` returns `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, PEM headers, `ghp_…`,
  `xox[baprs]-…`) across `code`, `lifecycle`, `docs`, `.github`. One historical false-positive
  (`2026-09-07-checkpoint.md:40`, a Render disk id) is prior report text, not a live hit.

## Advisories

`pnpm audit --prod --json` from `code/`: **3 high · 5 moderate · 4 low · 0 critical**, 642 production
dependencies — regressed from 0/0/0/0 at the routine report (which matched Build 23's close, unchanged
through Build 33). All 12 are new since 2026-09-28, all created after both the routine report and Build
33 landed:

- **11 × `undici`** (ids 1239932, 1240035/37/40/43/45/47/49/51/53/54; 3 high, 5 moderate, 3 low),
  vulnerable `>=8.0.0 <8.10.2`, patched `>=8.10.2`, via `apps/microsite-astro > astro > unifont >
  undici` — a transitive pull from Astro's own font pipeline, not a direct dependency.
- **1 × `dompurify`** (id 1240621, low), vulnerable `>=3.4.13 <=3.4.15`, patched `>=3.4.16`, via
  `apps/microsite-astro > posthog-js > dompurify`.

No fix applied — report only.

## New flags for the Golden Board

- **F71** (WCAG 2.2 AA, Crossfire depiction focus, filed Build 33) — unfixed; Build 34 is its named
  opener and precedes D1.
- **F72** (`readingTime` authored vs. measured, filed Build 33) — awaits AK's ruling among (a) derive
  and retire the field, (b) keep authored with a build-time disagreement check, (c) hand-correct.
- **F73** (`astro preview` backgrounds under agent detection, filed Build 33) — its own fix
  ("a checkpoint adds it to AGENTS.md §Commands") is still undone; carried forward rather than actioned,
  per this session's charter.
