---
title: checkpoint — 2026-09-28 (routine) — F61 fully closed by Build 33, F67 wrongly carried as open
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-28 (routine)

Walked, oldest first, by each record's own arrival on `main`: `2026-09-24-checkpoint.md` (`f179d7c`,
2026-09-25T09:10:33, the newest routine report by filename — register baseline), then
`2026-09-23-b33-f61.md` (Build 33's close record, `b0fba2a`, 2026-09-25T09:15:08). Despite its
2026-09-23 filename, Build 33 landed on `main` **after** the routine report above (three PRs merged
the same morning, out of creation order — see Record drift 3), so none of its findings reached that
report's register. `2026-09-21-checkpoint.md` predates the routine report by filename and its content
is subsumed by it; not walked separately. Since the routine report: F61 closed in full (Build 33);
F67 confirmed already fixed since Build 29 — contradicting the report's own "still open" call; the
stale `lifecycle/index.md` pointer self-repaired by Build 33; F49 root-caused, still unfixed; F71–F73
filed and stand open.

**Verdict.** 4 register deltas (F61 closed, F67's "open" call corrected to closed, the index-pointer
drift closed, F49 diagnosed); 4 record-drift findings (two of them corrections to the routine report
itself); 0 hygiene findings; advisories unchanged at 0/0/0/0; 3 new flags for the Golden Board.

## Register

| Item | Delta |
|---|---|
| F61 | **CLOSED**, confirmed — Build 33 derives the pull quote from the authored `<PullQuote>` (`2026-09-23-b33-f61.md:57-70`), commits `8feb5df`/`585e7f1`/`7197a91`, landed at `b0fba2a`. The routine report's claim that F61 (both halves) closed earlier via `e0593f3` is wrong: `e0593f3` is `fix(b32): a hostile wire feed degrades nothing (F62)`; F61's media half is `cc1dc4f`; the pull-quote half was still literal through PR #66 (`ArticleSpread.tsx:176`, as `2026-09-21-checkpoint.md:41-48` measured). |
| F67 | **CLOSED, and was already closed when the routine report called it open.** `SpheresSpread.tsx:340-345` carries `tabIndex={0} role="region" aria-label=…` — landed in Build 29's own commit `4512fae` (2026-09-20), the same commit whose message files F67. `2026-09-24-checkpoint.md:110-111` says F67 "has no evidence of a fix in main"; the fix predates that report by two checkpoint cycles. |
| `lifecycle/index.md` "Latest" pointer | **CLOSED** — Build 33 (`5acacb9`) repoints it to itself, `last_amended: 2026-09-23`. Resolves the routine report's drift item 3. |
| F49 (archive-lane diff) | **Root-caused, still open.** Build 33 measured the third Chromatic diff as `/wire`'s `dayLabel` (`WirePage.tsx:80`), env-dependent build-date text, and named it "likely what F38's standing '3 changes' were" (`2026-09-23-b33-f61.md:167-180`). Absent from the routine report's register entirely, though open per `2026-09-21-checkpoint.md:49-51` — a dropped row, not a closed one. Repair direction on record, unvalidated: pin the e2e clock stub. |
| F71 (new) | Open — WCAG 2.2 SC 2.4.11 focus-obscured, six untargetable `<button>`s on the Crossfire depiction (`2026-09-23-b33-f61.md:184-195`). Session named: Build 34, before D1. |
| F72 (new) | Open — `readingTime` authored `4 min read` on all six dispatches against measured 333–479 words; AK's ruling on derive-vs-author is owed (`2026-09-23-b33-f61.md:196-205`). |
| F73 (new) | Open — Astro 7 backgrounds `astro preview` under agent-env detection, a stale-server hazard for local probes; fix named as `ASTRO_PREVIEW_BACKGROUND=1`, and the author names its home as "a checkpoint adds it to AGENTS.md §Commands" (`2026-09-23-b33-f61.md:206-208`) — not done here, see New flags. |
| F37 / CartographyCanvas | unchanged — `global.css:7` still imports maplibre; no `<CartographyCanvas` render site in `src` today. |
| F42 (Storybook 9→10) | unchanged — `code/apps/storybook/package.json:23,33` still `^9.1.20`; `vitest ^3.2.7` pinned in both apps. |
| F46 | unchanged — rides T5/OQ-7, out of scope by design (`2026-09-20-b29-phase-b-close.md:87`). |
| F60 | unchanged — `DESIGN.md:311` still cites SC 1.4.4 as "the mechanical check"; Build 29's re-grounding (`4512fae` commit body) explains why R1a doesn't depend on it but never edits the citation text. |
| F36 → B18 | unchanged — BUILT, still awaiting AK's real-platform card check. |
| F28, F29, B3(→E), B17, B6–B11 | unchanged — AK one-clicks / canon governance / parked for Crossfire's own run; nothing re-verifiable by code. |
| BR1 (branch hygiene) | holds — `git branch -r` = `origin/main` only. |

## Record drift

1. **The routine report itself carried two items wrong.** F61's premature/misattributed closure
   citation and F67's false "still open" call, both above — corrected in the Register, not the board.
2. **Three build sessions (#64–#66) still have no `lifecycle/checkpoints/*.md` close record.**
   Unresolved since the prior two reports; `2026-09-23-b33-f61.md:220-221` names the same backfill as
   still owed to "a checkpoint." Carrying forward.
3. **Filename date does not track `main`-arrival order at this folder's tail.**
   `2026-09-23-b33-f61.md` landed at `b0fba2a` (2026-09-25T09:15:08), after `checkpoint/2026-09-21`
   (`74c0dbd`, 09:10:03) and `checkpoint/2026-09-24` (`f179d7c`, 09:10:33) — three PRs merged the same
   morning out of creation order (PR #69 after PR #70). A selection rule keyed on filename date alone
   would have missed F71–F73 entirely; they surfaced only by checking every file's actual arrival
   commit.
4. `AGENTS.md:44-45` still names `pnpm dev:next`/`build:next`; neither script exists in
   `code/package.json` (checked today). Unchanged since the routine report.

No other drift found; `representation/visual-system/components/index.md`'s child list matches its
directory 1:1 (checked today).

## Hygiene

- TODO/FIXME: one hit, unchanged — `code/apps/microsite-astro/src/lib/observability/posture.ts:31`, a
  quoted Sentry SDK doc string, not a live TODO. No new hits.
- Remote branches: `git branch -r` = `origin/main` only; nothing merged-and-undeleted.
- Secrets-shaped strings: none in tracked source (`AKIA…`, `sk-…`, PEM headers, `ghp_…`,
  `xox[baprs]-…`), scanned across `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 0 high · 0 moderate · 0 low**, 642 production
dependencies. Unchanged since the routine report; no new advisory.

## New flags for the Golden Board

- **F73 needs its AGENTS.md §Commands line.** Build 33 names this checkpoint as the place to add
  `ASTRO_PREVIEW_BACKGROUND=1`'s note; writing anything beyond this report is outside this routine's
  charter, so it is filed for the next build session or an explicit governance exception.
- **The F61/F67 register errors share one cause worth a process note.** The routine report's walk
  stopped at PR #66 and never saw Build 33, yet it asserted F67 unaddressed by checking only B30–B32
  commit messages rather than re-reading the code — the fix had shipped two checkpoint cycles earlier,
  in Build 29. Re-verifying "still open" claims against code, not prior-report prose, caught both.
- **F49's diagnosis (Build 33) is likely the same standing defect as F38's "3 changes."**
  (`2026-09-23-b33-f61.md:178`). AK's to confirm and merge the rows if so.
