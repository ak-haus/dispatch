---
title: checkpoint — 2026-10-22 (routine) — F67 was already fixed, a 23-advisory jump, the backfill gap turns five
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-22 (routine)

Newest routine report: `2026-09-24-checkpoint.md` (`f179d7c`). Walked, oldest first, by each record's
own arrival on `main`: `2026-09-21-checkpoint.md` (`74c0dbd`), `2026-09-24-checkpoint.md` (`f179d7c`,
the baseline — it restates every open item), `2026-09-23-b33-f61.md` (`b0fba2a`, a build-session close
that landed five minutes after the baseline and is this register's only post-baseline record). `HEAD`
is still `b0fba2a` — nothing has merged to `main` since. Closed since the baseline: F61 (confirmed,
unchanged) and, per this sweep's own re-verification, **F67** (the baseline believed it open).

**Verdict.** 1 register delta (F67 reclassified closed); 3 record-drift findings (one now resolved,
one confirmed still stale, one close-ritual gap now covering a third build with no record); 0 hygiene
findings; 23 new advisories (0 critical/7 high/10 moderate/6 low), none present at the last report.

## Register

- **F67 — the baseline's "appears unaddressed" was wrong; it was fixed in the same commit that filed
  it.** `2026-09-24-checkpoint.md:110-111` carries it forward as open ("has no evidence of a fix in
  `main`"). Measured first-hand: `SpheresSpread.tsx:340-345` has `tabIndex={0}`, `role="region"`,
  `aria-label="Crossfire dossier deck source listing"` on the `<pre>` the violation was filed against,
  with a comment at lines 334-339 citing F67 by name. `git show 4512fae -- .../SpheresSpread.tsx`
  shows this landed in the Build 29 commit itself, alongside the filing (`2026-09-20-b29-phase-b-close.md:173-174`
  files it; the commit body separately lists "F67" among its fixes). **Closed.**
- **F61** — stands closed. `ArticleSpread.tsx:167-191` reads `featured.data.pullQuote`, matching Build
  33's claim (`2026-09-23-b33-f61.md:69`). No regression.
- **F71** (Crossfire depiction buttons, focus-obscured, WCAG 2.2 SC 2.4.11) — stands open, unchanged.
  `CrossfireSpread.tsx:767-768` (`+ Follow`) and `:988` ("More") are still bare `<button>`s with no
  handler and no fix commit; no Build 34 record exists in this folder.
- **F72** (`readingTime` authored and wrong, AK's ruling pending) — stands open. `content.config.ts:80-81`
  still only regex-validates the field; no computation found under `src/lib`. No record shows AK
  ruled (a)/(b)/(c).
- **F73** (Astro 7 backgrounds `astro preview` under agent detection) — stands open. Neither
  `AGENTS.md` nor `.claude/CLAUDE.md` mentions `ASTRO_PREVIEW_BACKGROUND`; the checkpoint action Build
  33 asked for (`2026-09-23-b33-f61.md:208`) has not happened.
- **F36 / B18** (share metadata) — stands BUILT, un-dispositioned. No record since `ead3295` shows
  AK's real-platform card check.
- **F42** (vitest/Vite range) — stands, Phase T. `apps/microsite-astro/package.json:86` and
  `apps/storybook/package.json:23,33,38` still pin `vitest`/`@storybook/addon-vitest`/`storybook`
  `^9.1.20`/`^3.2.7`, unchanged.
- **F60** (R1a mis-grounded citation) — stands, Phase T. `DESIGN.md:311` still cites WCAG SC 1.4.4 for
  the angular requirement; not re-grounded.
- **F46** (home card banners at full plate size) — stands, rides T5/OQ-7, unchanged.
- **F29, F28** (AK governance/one-clicks) — stand, unaddressable by this sweep.
- **B3→E, B17** — stand as filed, unchanged.
- **B6–B11** (Crossfire) — parked; not audited, per the ADR-0002 2026-09-19 amendment.

## Record drift

1. **Resolved since the baseline: `lifecycle/index.md`'s "Latest" pointer.** Both `2026-09-21-checkpoint.md:60-61`
   and `2026-09-24-checkpoint.md:73-78` flagged it stuck on Build 23. PR #69 (`b0fba2a`) updated it in
   the same commit as Build 33's code and record (`git show b0fba2a --stat` shows all three files in
   one diff); `lifecycle/index.md:7` now reads `last_amended: 2026-09-23` and names Build 33 latest.
2. **Confirmed still stale: `AGENTS.md`'s Next-dashboard line.** `AGENTS.md:44` still reads
   `Next dashboard: cd code && pnpm dev:next`. `code/apps/` holds only `microsite-astro` and
   `storybook`; `code/package.json`'s `scripts` block has no `dev:next` or `build:next` entry. Same
   finding as `2026-09-24-checkpoint.md:80-83`; still unfixed.
3. **Close-ritual gap, now three builds.** `2026-09-21-checkpoint.md` and `2026-09-24-checkpoint.md`
   both flag Builds 27, 30, 31, 32 as merged with no `lifecycle/checkpoints` record. That backfill has
   not happened; `2026-09-23-b33-f61.md:219-221` restates it as "remains a checkpoint's" and this sweep
   finds no new file for any of the four. This routine does not write it (out of scope for a
   records-auditor sweep); it is now carried forward a third time.

`representation/visual-system/components/index.md`'s child list was re-diffed against
`representation/visual-system/components/` and matches exactly (20 of 20). No other drift found.

## Hygiene

- **TODO/FIXME:** one hit, unchanged — `apps/microsite-astro/src/lib/observability/posture.ts:31`, a
  quoted Sentry SDK comment, not a live TODO.
- **Remote branches:** `git branch -r` = `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, `ghp_…`, `xox[baprs]-…`, PEM
  headers), scanned across `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 7 high · 10 moderate · 6 low**, 642 production
dependencies. The last two routine reports (`2026-09-21-checkpoint.md:84`, `2026-09-24-checkpoint.md:99-101`)
both read 0/0/0/0; all 23 are new since. By package: **undici** (11 advisories, moderate-to-high, DoS,
cookie disclosure, TLS-validation bypass and cache-poisoning classes; patched `>=8.10.2`), **vite** (6,
moderate-to-high, including an `fs.allow` bypass and the arbitrary-file-read `?vite-wasm-instance`
advisory filed 2026-10-21; patched `>=8.3.3`), **dompurify** (2 low, `IN_PLACE` sanitize-hook issues;
patched `>=3.4.16`), **source-map-js** (1 high, event-loop DoS; patched `>=1.2.2`), **sharp** (1 high,
librsvg CVE-2026-96889; patched `>=0.35.5`), **smol-toml** (1 moderate, quadratic-time parse; patched
`>=1.9.0`), and **http-cache-semantics** (1 high, cross-user disclosure via `max-stale`; `patched_versions`
reads `<0.0.0` — **no fixed version published**). Report only; nothing upgraded by this sweep.

## New flags for the Golden Board

- **New — 23 production-dependency advisories, 0 critical/7 high/10 moderate/6 low, up from 0/0/0/0.**
  AK's to weigh against F34's prior pattern (18 → 2 → 0 across Builds 22-23): whether this is another
  scheduled dependency bump or needs an out-of-cycle one. `http-cache-semantics`'s advisory currently
  has no patched version at all.
