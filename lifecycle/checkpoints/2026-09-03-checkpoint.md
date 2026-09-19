---
title: checkpoint — 2026-09-03
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-03

**Diff vs. last report** (`2026-08-31-checkpoint.md` — never merged, still open as draft PR #44; read directly
off branch `checkpoint/2026-08-31` since `main` never received it): one closure claimed by #44 itself
(`lifecycle/index.md:16`'s "Latest" pointer) has gone stale again — B16's three fork-retirement closes
(SearchPalette, SiteNav, ChapterRail, all 2026-08-31, merged as PRs #45/#47/#48) landed on `main` after
#44 was cut, and the pointer still names B15. Two more branches joined the merged-but-undeleted set
(`claude/b16-chapterrail`, `claude/b16-sitenav`). Nothing else on #44's register, drift, or hygiene list moved.

**Verdict:** 0 register deltas (6th consecutive sweep with (d) and all 5 of (e) unrepaired); 1 new
record-drift finding (`lifecycle/index.md` Latest pointer, re-staled); 2 new hygiene flags (2 more
merged branches undeleted; 3 checkpoint-sweep PRs now stuck in draft, one for as long as 10 days).

## Register deltas
1. **(a)/(b)/(c) still landed, unchanged.** `dispatch/.github/workflows/` still has all 15 files.
   `test` scripts still present in `code/packages/ui`, `code/packages/tokens`, `code/apps/microsite-astro`,
   `code/apps/storybook` `package.json`s. `crossfire/src/distribute/adapters/` still has 8 `.test.ts`
   files; `ci.yml:11-19` still runs `bunx vitest run` over all of `src/`.
2. **(d) still stands.** `crossfire/scripts/feed-export.ts` has no matching test file anywhere in the repo.
3. **(e) all 5 still stand.** `deploy.md:23` still says Slack "currently borrows Prime's `dante` app tokens"
   (CLEANUP-1 open) against `src/config.ts:114-116` (reads `CROSSFIRE_SLACK_*` only) and `ISA.md:113-117`
   (CLEANUP-1 closed 2026-06-12). `deploy.md:115` still says Vale "is not baked into the worker image"
   against `docker/ts-worker.Dockerfile:5-24` (fetch stage + `VALE_BINARY_PATH`). `GENESIS.md:74,76,78`
   still cites `src/ingest/`, `src/reshape/fidelity-gate.ts`, `src/fault-tree/` — none exist; actual `src/`
   is `alerts/ config.ts distribute/ durable/ feed/ observability/ reshape/ slack/ types/`. `TASKS.md:20-21`
   still lists 4 "open debts" against `ISA.md:107-131` ("Open: None — the register is clear," all 4 closed
   2026-06-12). `ISA.md:50` still states the droplet present-tense with no pointer to line 227's Render
   supersession. Crossfire `main` is byte-identical to the last sweep (`c9b27d8`, 2026-08-18) — none of
   these could have changed.

## Record drift
- **NEW.** `dispatch/lifecycle/index.md:16` — the "Latest" pointer still names the 2026-08-30 B15 close.
  Three B16 fork-retirement closes landed since and are more recent: `2026-08-31-b16-searchpalette.md`
  (10:23), `-sitenav.md` (15:24), `-chapterrail.md` (16:31, merged as `main`'s current tip, PR #48,
  "the last fork retires... 3/3" — F14 fully closed). The pointer needs to name ChapterRail as latest.
  This is the same pointer #44 (2026-08-31) had just fixed after B15 — it re-stales every time a build
  session closes without a following checkpoint landing on `main` to catch it.
- `crossfire/src/index.md:4-8` and `crossfire/AGENTS.md:28-29` still both list `src/`'s children and both
  omit `alerts/` and `feed/` — present since 2026-08-18 with real code+tests (`alerts/monitor.ts`,
  `feed/contract.ts`, `feed/sanitize.ts`, each with a `.test.ts`). Unrepaired since 2026-08-24 (10 days).
- `crossfire/src/config.ts:46`'s doc-comment ("fall back to the borrowed Prime `dante` vars") still
  contradicts the implementation two blocks down (`config.ts:114-116`, no fallback read). Unrepaired
  since 2026-08-20.
- `crossfire/STATE.html` still in-tree, still titled "D2 done · D3 paused," still self-admitted superseded
  by `ISA.md:3-5` (dated 2026-06-10) — 85 days now.
- `dispatch/AGENTS.md:11`'s Vercel App claim: confirmed true, not drift (F3-a closed 2026-08-20, unchanged).

## Hygiene
1. **Three checkpoint-sweep PRs remain open in draft, unmerged into `main`:** #37 (2026-08-24 sweep, 10
   days old), #40 (2026-08-27 sweep, 7 days old), #44 (2026-08-31 sweep, 3 days old). Each new checkpoint
   session re-derives the same register/drift facts from scratch because the prior sweep's record never
   lands. **Root cause, confirmed this sweep:** a direct push of this very report to `main` was rejected
   by GitHub — ruleset GH013 on `refs/heads/main` requires 15 of 15 status checks, which a lone-markdown-file
   commit can never satisfy outside a PR run through CI. That is almost certainly why #37/#40/#44 exist as
   branches/PRs at all (a checkpoint session hit the same rejection each time) — but PRs alone don't merge
   themselves, and draft state additionally hides them from merge-readiness. This report becomes a fourth
   stranded branch (`checkpoint/2026-09-03`) for the same reason — see close note.
2. **6 branches on `origin` are merged into `main` but not deleted** (verified via `git merge-base
   --is-ancestor <branch> origin/main`, this sweep, fresh fetch): `checkpoint/2026-08-20` (PR #24),
   `chromatic-storybook-project`, `judge-is-ak`, `s1-visual-gates` — all carried from 2026-08-31, still
   undeleted — **plus two new**: `claude/b16-chapterrail` (PR #48) and `claude/b16-sitenav` (PR #47),
   both merge-commit ancestors of `main`'s current tip.
3. Crossfire: single branch (`main`), clean tree, unchanged since 2026-08-18.
4. Both repos: `git status --porcelain` empty. No new TODO/FIXME beyond the two pre-existing scoped
   markers (`posture.ts:31` — a quoted upstream SDK comment, not a live TODO; `services/transcribe/app.py:44`
   — `TODO(D2+): pyannote diarization`, named-phase). No secrets-shaped strings: the only regex hits
   (`deploy.md`, `ISA.md`) are Render resource IDs (`srv-`/`dsk-` prefixes coincidentally matching an
   `sk-`-shaped pattern), confirmed non-secret by content, none quoted here.

## One-clicks
- Interceptor extension load, codex upgrade, blob-token rotation decision: no repo-trackable evidence
  either way — session/environment state, not a repo fact. Carried forward open, unchanged since 2026-08-20.
- Supabase MCP reconnect: `crossfire/AGENTS.md:11,32,51` still assert MCP-only migration law as standing;
  connection health itself isn't a repo fact. Carried forward open.
- Stale Slack QA cards: `ISA.md:126-131` marks this RESOLVED (structural); `TASKS.md:21` still lists it
  open — same doc-sync item as register delta (e) above, not a distinct operational item.

## New flags for the Golden Board
1. **`dispatch/lifecycle/index.md:16`** — repoint "Latest" from the B15 close to `2026-08-31-b16-chapterrail.md`
   (F14 fork-retirement column fully closed, 3/3).
2. **Delete 6 merged branches**: `checkpoint/2026-08-20`, `chromatic-storybook-project`, `judge-is-ak`,
   `s1-visual-gates`, `claude/b16-chapterrail`, `claude/b16-sitenav` — `git push origin --delete`, no code risk.
3. **Land or close #37, #40, #44** — three checkpoint sweeps' records are invisible to `main` and to every
   session that opens after them; each re-discovers the same facts. Recommend AK take these out of draft
   and merge in date order (or explicitly supersede #37/#40 with #44's content, since #44 already restates
   their findings) rather than let a fourth accumulate.
4. **AK decision needed on the `main` ruleset vs. the checkpoint protocol.** GH013 requires 15/15 status
   checks on every push to `main`, including a records-only markdown commit — structurally incompatible
   with ADR-0002's "commit ONLY that file... to main" instruction. Either exempt checkpoint PRs (path-scoped
   ruleset bypass) or change the protocol to always land via a non-draft PR + explicit merge, not a direct push.

Not re-filed (already on the board via #44, confirmed still open above): the 5 crossfire doc-vs-code
contradictions, `STATE.html` removal, `crossfire/src/index.md`+`AGENTS.md` alerts/feed omission,
`config.ts:46` stale comment.
