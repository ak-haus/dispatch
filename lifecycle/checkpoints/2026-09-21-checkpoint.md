---
title: checkpoint — 2026-09-21 (routine) — four undocumented build sessions, F61's non-media half still open
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-21 (routine)

Walked oldest to newest by arrival on `main`: `2026-09-19-sweep-landing.md` (`acb7bbe`),
`2026-09-19-checkpoint.md` (`3b5cd6b`, the newest routine report — register baseline),
`2026-09-19-b1-astro7.md` (`ec1852e`), `2026-09-19-b5-dead-weight.md` (`072d1de`),
`2026-09-19-b18-share-metadata.md` (`ead3295`), `2026-09-19-f40-b12-speed.md` (`4e143ff`),
`2026-09-19-b26-instruments-cleanup.md` (`855e417`), `2026-09-20-b29-phase-b-close.md` (`8ed901d`).
`origin/main` HEAD is `a05223d`, five PRs (#61, #62, #64, #65, #66) ahead of the newest record on the
folder and none of them wrote one — see Record drift. Closed since the baseline report: F34 (advisories,
`072d1de`), F40 and B12 (`4e143ff`), F31/F30/F41 and F33's desktop half (`855e417`), F32 and half of F25
(`ef03bd7`/`71fba88`), Phase B itself plus F27/F39/F44/F45/F48/F50/F51/F53-copper/F64 (`8ed901d`), F53's
lane half and F54 (`14ac640`), F63/F66 (`b5dedb1`), F55/F47/F52/F56/F57/F58/F59/F62/F65 and F61's media
half (`a05223d`).

**Verdict.** 0 stale register rows contradicted by fixed code; 2 record-drift findings (a stale index
pointer, and four merged build sessions with no close record); 0 hygiene findings; 0 new advisories.
1 new flag: F61's non-media half — the defect B29 itself measured — is still unfixed and was never
re-filed once B32 closed only its media half.

## Register

- **F34** (advisories) — closed, re-verified: `pnpm audit --prod --json` from `code/` today reports
  0 critical/high/moderate/low across 642 dependencies. Matches Build 23's close.
- **F44/F45** (title suffix, favicon) — closed: `StackLayout.astro:80-81` now emits both favicon links;
  line 74's comment records the title fix.
- **F53** — both halves closed. Lane half: `DESIGN.md:23,53,178,211,257` carry
  `--dispatch-lane-editorial-label` / `oklch(0.52 0.16 41)`, the token B30 landed. Copper half held from
  Build 29. Dark-cycle half still rides T4 as filed; unchanged.
- **F42** (vitest/Vite range) — stands, Phase T, unchanged: `code/apps/microsite-astro/package.json:84`
  still pins `vitest ^3.2.7`; `code/apps/storybook/package.json:23,33` still pin
  `@storybook/addon-vitest`/`storybook` `^9.1.20`.
- **F33** — desktop half stands closed (Build 26's guard, `.storybook/vitest.setup.ts:60`); mobile half
  stands open. Neither B30 nor B32 touches it.
- **F61 — only the media half is closed; the half B29 identified as the real defect is not.** B29
  (`2026-09-20-b29-phase-b-close.md:56-66`) measured the row's premise false and stated F61 "is now one
  engineering defect class, entire": `ArticleSpread.tsx:173`'s hardcoded pull quote is dispatch-01's
  opening sentence, not its authored `<PullQuote>`. B32 (`a05223d`) fixes only "F61 media half"
  (`ArticlesBrowser.tsx:92,245,650`, all media/category defaults). The quote is still literal today —
  `ArticleSpread.tsx:176` renders `"DISpatch publishes as a magazine, reads as a notebook..."` verbatim,
  and `featured.data` (`ArticleSpread.tsx:96-204`) never surfaces a pull-quote field. No record states
  this half is still open; see New flags.
- **F49** (archive-lane diff) — status unconfirmed. B29 filed it Phase C with "Build 29 runs the
  container anyway," but no record (including B29's own) states a result. Not re-measured this run
  (Chromatic needs AK's login); stands as unconfirmed.
- **BR1** (branch hygiene) — holds: `git branch -r` = `origin/main` only.
- **Phase B** — stands closed (`2026-09-20-b29-phase-b-close.md:22-39`); nothing since reopens a B row.
- **B18** — stands BUILT, un-dispositioned: no record or commit after `ead3295` shows AK's real-platform
  card check named in `2026-09-19-b18-share-metadata.md:120-121`.
- **B6–B11** (Crossfire) — parked per the 2026-09-19 ADR-0002 amendment; not re-verified, per charter.

## Record drift

- **`lifecycle/index.md`'s "Latest" pointer is stale.** `lifecycle/index.md:16` still names
  "2026-09-19 Build 23 · B5" as latest. Nine build sessions have merged to `main` since B5's PR
  (`072d1de`): B18, F40/B12, B26, both B27 PRs, B29, B30, B31, B32. The pointer predates all of them.
- **Four build sessions merged with no `lifecycle/checkpoints` close record.** `git log --first-parent`
  shows PR #61 ("Build 27 · chapter navigation on phones," `ef03bd7`, fixes F32), PR #62 ("Records: the
  flag ledger counts itself," `71fba88`, half-closes F25 and adds `scripts/audit-flag-ledger.mjs`), PR
  #64 (B30, F53/F54, `14ac640`), PR #65 (B31, F63/F66, `b5dedb1`) and PR #66 (B32, nine flags plus F61's
  media half, `a05223d`) — none of their diffs touch `lifecycle/` (`git show <sha> --stat | grep
  lifecycle` returns empty for all five). This contradicts the close ritual (ADR-0002 §Decision 4: "every
  new discovery lands on the board with a phase assignment, never as an untracked aside") and
  `lifecycle/index.md:15`'s own description of the checkpoints folder as carrying "each session's
  discoveries." This register was reconstructed from commit diffs and titles alone, which is why F61's
  residual half (above) went untracked.

## Hygiene

- **TODO/FIXME:** none in application code (`code/apps/microsite-astro/src`, `code/packages/ui/src`,
  `code/packages/tokens/src` — 0 hits).
- **Remote branches:** `git branch -r` = `origin/main` only; nothing to compare against `--merged`.
- **Secrets-shaped strings:** none found (`AKIA…`, `sk-…`, `ghp_…`, `xox[baprs]-…`, PEM headers) across
  `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 0 high · 0 moderate · 0 low** (642 dependencies).
Unchanged from Build 23's close; no advisory has appeared since.

## New flags for the Golden Board

- **F61 residual — the pull-quote hardcode B29 identified is still live.** `ArticleSpread.tsx:176`
  renders a literal string instead of the featured dispatch's authored `<PullQuote>`
  (e.g. `dispatch-01.mdx:83`'s "The cartography is the visual hero, but not the product model.", per
  B29's own citation). B32 closed only F61's media half; this half was never re-filed once separated
  from it.
- **Close-ritual gap — five PRs since Build 26 landed with no lifecycle record** (see Record drift). The
  next build or checkpoint should backfill records for B27 (both PRs), B30, B31 and B32 and refresh
  `lifecycle/index.md`'s pointer, or the register will keep drifting from what `git log` alone can show.
