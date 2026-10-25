---
title: checkpoint — 2026-10-19 (routine) — F61 settled by a build the prior sweep never saw, 17 fresh advisories, F67 likely closed since Build 29 and misread three times running
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-19 (routine)

Walked by arrival on `main`: `2026-09-24-checkpoint.md` (`3473b80`, the newest routine report by filename;
merged as PR #70/`f179d7c`, 2026-09-25T09:10:33) and `2026-09-23-b33-f61.md` (Build 33's close record;
merged *after* the checkpoint, as PR #69/`b0fba2a`, 2026-09-25T09:15:08 — its filename date is earlier
but its content landed on `main` later, so it layers on top of the checkpoint rather than under it).
`2026-09-21-checkpoint.md` (PR #67/`74c0dbd`, 09:10:03) landed before both and was built, like the 09-24
report, directly off `a05223d` (`git show -s --format='%P'` on `3473b80` and `6a279b9` both name
`a05223d` as sole parent) — the two checkpoints never saw each other, which is why 09-24 only names
PRs #64–66 as record-less (see Record drift). Nothing closed since the 09-24 baseline; Build 33, unseen
by it, is what closed F61 and filed F71–73. `origin/main` HEAD is `b0fba2a`, nothing merged since.

**Verdict.** 9 register deltas (F61 reaffirmed closed by the record that actually did it; F49 explained,
not fixed; F67 reclassified — code evidence says it was fixed at filing and misread open three times;
the stale index pointer closed itself via Build 33; F71/F72/F73 newly open; Build 33's own deploy+smoke
still pending). 3 record-drift findings, the sharpest being that 09-24's own drift section undercounts
the close-ritual gap by two PRs. 0 hygiene findings. Advisories: 0/0/0/0 → **6 high · 6 moderate · 5
low**, all new. 2 new flags for the Golden Board.

## Register

| Item | Delta |
|---|---|
| F61 | Closed, reaffirmed — but by `585e7f1`/`8feb5df` (Build 33), not the commit 09-24 cited. `ArticleSpread.tsx` now reads the authored `<PullQuote>` (`b33-f61.md:69`); media half held from Build 32. |
| F67 (`<pre>` keyboard trap, WCAG 2.1.1) | **Reclassify — code says fixed, three records say open.** `SpheresSpread.tsx:340-345` carries `tabIndex={0}`, `role="region"`, `aria-label="Crossfire dossier deck source listing"` on the only `overflow-x-auto` region on `/about`. `git show 4512fae -- .../SpheresSpread.tsx` shows these three attributes added as `+` lines in the *same* commit whose message filed F67 (`2026-09-20-b29-phase-b-close.md:173-174`). The 09-21 and 09-24 checkpoints both read that record's prose ("Filed as F67") and never checked its diff. No regression pin exists (`grep -rl F67 code/.../e2e` is empty), so carry as open-pending-a-pin rather than closed outright — but it is very likely not a live defect. |
| F49 (archive-lane "3 changes") | Explained, not fixed. Build 33 traced it to `/wire`'s `dayLabel` (`WirePage.tsx:80`) printing the e2e stub's capture day as plain text (`e2e/helpers/wire-fixture.ts:41` stamps relative to `Date.now()`), so any PR built on a later day than `main`'s last build draws a third Chromatic change (`b33-f61.md:167-180`). Repair direction (pin the stub's clock) is stated but unapplied. |
| `lifecycle/index.md`'s "Latest" pointer | **Closed since 09-24.** `lifecycle/index.md:18`, `last_amended: 2026-09-23`, now names Build 33/F61, not Build 23 as 09-24 reported. Build 33's own PR updated it. |
| F71 (Crossfire depiction buttons, WCAG 2.2 SC 2.4.11) | New, open. `b33-f61.md:184-195`: six `<button>`s in the Crossfire depiction are tab stops with no handler and 0/9 visible points once focused. Not in F56's class; filed for **Build 34**, which has not opened (`origin/main` has nothing past `b0fba2a`). |
| F72 (`readingTime` authored, wrong) | New, open, **AK's.** `content.config.ts:80-82` still requires the authored string; `b33-f61.md:196-205` measured 333-479 words against `4 min read` on all six dispatches and recommends deriving it. No ruling recorded since. |
| F73 (Astro 7 backgrounds `astro preview` under agent detection) | New, open. `b33-f61.md:206-208` assigns this to "a checkpoint adds it to AGENTS.md §Commands." `AGENTS.md`'s Commands section (lines 44-70) carries no `ASTRO_PREVIEW_BACKGROUND` mention — still undone. (This checkpoint does not make that edit: a doc change is still a write outside the one report file this charter permits.) |
| Build 33 — deploy + smoke | Open. `b33-f61.md:223-228`: merge is done (`b0fba2a`), but the production deploy is ASK FIRST and the post-deploy `uptime (prod smoke)` is unconfirmed from this container (egress denies `dispatchmag.dev` per `b33-f61.md:13-16`). |
| F34, F35, F36→B18, F37, B12, B13, Build 22/B1, BR1, CartographyCanvas→T8, F42, F46, F60, F28, F29, B3(→E), B17, B6-B11 | Unchanged from 09-24's register; re-verified first-hand: `vitest` still `^3.2.7` and Storybook still `^9.1.20` (`code/apps/microsite-astro/package.json:86`, `code/apps/storybook/package.json:33`) for F42; `DESIGN.md:311` still cites WCAG SC 1.4.4 at the R1a line Build 29 called mis-grounded, for F60; `global.css:7` still imports `maplibre-gl/dist/maplibre-gl.css` and `CartographyCanvas` is referenced only in a comment and a label string, never mounted (`index.astro:48`, `ToolingBlock.astro:7`), for F37; `git branch -r` = `origin/main` only, for BR1; B18 still has no record of AK's real-platform card check past `2026-09-19-b18-share-metadata.md:120-121`. |

## Record drift

1. **09-24's close-ritual-gap finding undercounts by two PRs.** `2026-09-24-checkpoint.md:59-66` names only PRs #64-66 as merged with no `lifecycle/checkpoints` record. `2026-09-21-checkpoint.md:63-72` had already named PRs #61 (`ef03bd7`, Build 27, F32) and #62 (`71fba88`, the flag-ledger script, F25 half) with the same defect, and both still have none (`git show --stat` on `ef03bd7`/`71fba88`/`74ae7ad` touches no `lifecycle/` path). 09-24 dropped this because its branch forked from `a05223d` independently of the 09-21 checkpoint (same parent commit, confirmed above) and never read it. The gap is five PRs (#61, #62, #64, #65, #66), not three.
2. **F67 misread forward three times** (detailed in Register). The root cause is process, not code: a close record's prose ("Filed as F67") was taken as the full state without a diff check, and that reading propagated unchallenged through two further checkpoints.
3. `representation/visual-system/components/index.md`'s child list: not re-diffed this run; Build 33 touched only existing components (`ArticleSpread.tsx`, `ArticlesBrowser.tsx`, `SpheresSpread.tsx`), so no churn to check against. `AGENTS.md:44-45`'s `dev:next`/`build:next` drift (flagged 09-24) stands, unfixed.

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31`, the same quoted Sentry SDK comment 09-24 found. No new hits in `code/apps/microsite-astro/src`, `code/packages/*/src`.
- **Remote branches:** `git branch -r` = `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, `ghp_…`, `xox[baprs]-…`, PEM headers), scanned across `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`, 642 production dependencies: **0 critical · 6 high · 6 moderate ·
5 low** (17 total), all newly published since the 09-24 reading of 0/0/0/0 (and unchanged-since claimed by
both 09-24 and, implicitly, Build 33). By package: `undici` <8.10.2 → `>=8.10.2` (3 high, 5 moderate, 2
low across distinct GHSA entries); `sharp` <0.35.5 → `>=0.35.5`, high, librsvg RCE (`GHSA-wq5f-xc86-pv6w`);
`source-map-js` <1.2.2 → `>=1.2.2`, high; `http-cache-semantics` <=4.2.0, high, **no patched version
published yet**; `smol-toml` <=1.8.0 → `>=1.9.0`, moderate; `dompurify` <=3.4.15 → `>=3.4.16`, low (2
entries).

## New flags for the Golden Board

- **New — advisories regressed from 0/0/0/0 to 6 high/6 moderate/5 low.** None are code defects found by
  this audit; AK's or a build session's to weigh against Phase A's dependency-update policy (ADR-0002
  Decision 1, Phase E). `http-cache-semantics`'s advisory has no patched version yet — track, don't chase.
- **New — the close-ritual gap is two PRs wider than the last report stated** (Record drift #1), and the
  routine's own "newest report" method cannot see a sibling checkpoint merged moments earlier for the same
  cycle. Backfill for #61, #62, #64, #65, #66 remains a checkpoint's, per `b33-f61.md:219-221`'s own note
  on #64-66's predecessors.
