---
title: checkpoint — 2026-08-27
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-08-27

**Diff vs. last report** (`2026-08-23-a14-story-lane-tailwind.md`, a build session): nothing on the
records register moved — that session shipped A14 (Tailwind in the story lane) and left two proposed
rows (F28, B16 amendment) for AK to place; it did not touch crossfire's records. The last *records*
session was `2026-08-22-phase-b-promotion.md`, and the last true *checkpoint* sweep was
`2026-08-20-checkpoint.md`. Diffed against that one: **zero of its findings closed in the 7 days /
3 sessions since.**

**Verdict:** 0 register deltas since the last checkpoint (a–c stay landed, d and all 5 of e still
stand, unrepaired for a 2nd consecutive checkpoint); 2 new record-drift findings; 2 new flags.

## Register deltas

1. **(a) still landed.** `dispatch/.github/workflows/` has 15 files (`analytics-loop.yml`,
   `build.yml`, `content.yml`, `design-judge.yml`, `design.yml`, `e2e.yml`, `ideation.yml`,
   `lighthouse.yml`, `naming.yml`, `storybook.yml`, `tokens-lint.yml`, `tokens.yml`,
   `typecheck.yml`, `unit.yml`, `uptime.yml`), matching `AGENTS.md:39-44`'s 15-required-context claim.
2. **(b) still landed.** `test` scripts exist in `code/packages/ui/package.json:3`,
   `code/packages/tokens/package.json`, `code/apps/storybook/package.json`.
3. **(c) still landed.** `crossfire/src/distribute/adapters/` has 8 `.test.ts` files (substack,
   bluesky, beehiiv, dev-to, mastodon, linkedin, hashnode, threads), plus 8 more test files
   elsewhere in `src/` (durable, reshape, feed, alerts). `ci.yml:11-19` runs all via `bunx vitest run`.
4. **(d) still stands.** `crossfire/scripts/feed-export.ts` (123 lines) has no matching `.test.ts`;
   `ci.yml` runs `bunx vitest run` but nothing targets this file directly.
5. **(e) all 5 still stand — unfixed since first flagged 2026-08-20:**
   - `deploy.md:23-24` still says Slack "borrows Prime's `dante` app tokens," CLEANUP-1 open. `config.ts:112-116` and `ISA.md:113-120` show CLEANUP-1 closed 2026-06-12 (own app `crossfireqa`, no fallback). Doc stale.
   - `deploy.md:115-117` still says Vale "is not baked into the worker image." `docker/ts-worker.Dockerfile:5-25` bakes it and sets `VALE_BINARY_PATH`. Doc stale.
   - `GENESIS.md:56-79`'s architecture/pipeline table still cites `src/ingest/`, `src/fault-tree/`, `src/reshape/fidelity-gate.ts`. None exist — actual `src/` is `alerts/ config.ts distribute/ durable/ feed/ observability/ reshape/ slack/ types/`. Doc stale.
   - `TASKS.md:20-21` still lists 4 "open debts" (own Slack app, Dev.to 429, Vale-advisory, stale QA cards). `ISA.md:107-109` says "Open: _None — the register is clear"; `ISA.md:113-131` shows all 4 closed/resolved 2026-06-12. Doc stale.
   - `ISA.md:50` still states present-tense "Restate self-hosted as a single binary (droplet `prime-city-1`)" with no qualifier, contradicted by `ISA.md:227` ("Render replaces the droplet as the always-on host"). Self-contradiction uncorrected.

## Record drift

- `crossfire/src/config.ts:43-48`'s doc-comment still reads "fall back to the borrowed Prime `dante` vars," contradicting the implementation comment two blocks down (`config.ts:112-113`, "No borrowed-Dante fallback... CLEANUP-1 closed"). Same file, same contradiction as 2026-08-20, unrepaired.
- **New.** `dispatch/lifecycle/index.md:18` points to "Latest: [2026-08-22 Phase B register promotion]" as the newest checkpoint entry; `2026-08-23-a14-story-lane-tailwind.md` postdates it (Phase A landed 14/14) and isn't listed. `last_amended: 2026-08-22` (line 6) is unchanged, confirming the index wasn't touched after that build session closed.
- **New.** `crossfire/src/index.md` lists `durable/ reshape/ distribute/ slack/ observability/ config.ts types/` but omits `alerts/` and `feed/`, both present on disk (`ls src/`). `git log -- src/index.md` shows one commit (`5ffd3f6`, the harness retrofit) — before `feed/` (added in PR #2) and `alerts/` (added in PR #3, which also added `monitor.test.ts`) existed.
- `crossfire/STATE.html` (245 lines) remains in-tree, still titled "ISA v4 · Checkpoint (D2 done · D3 paused)". `ISA.md:3-5` (unchanged from 2026-08-20) already calls it a superseded artifact; D3/D4 closed long ago per `ISA.md:126,135,194`. Flagged 2026-08-20, still not moved or removed, 78 days past its own supersession date.
- `dispatch/AGENTS.md:11`'s Vercel-GitHub-App-installed claim (dated 2026-08-20, F3-a) is corroborated by `2026-08-20-ledger.md:150` ("F3-a — the App is installed") and by `build.yml`'s Ignored-Build-Step framing at `AGENTS.md:12-14`. No contradiction found; this item closed between the 2026-08-20 checkpoint and today and stays closed.
- `dispatch/index.md` and `dispatch/lifecycle/fixtures/index.md` children spot-checked: all resolve to real files/dirs, no drift.

## Hygiene

- `git status --short` clean on both repos; no uncommitted files.
- No merged-but-undeleted branches — both repos are single-branch (`main`) checkouts here.
- No new TODO/FIXME in application code. `posture.ts:31` (`dispatch/code/apps/microsite-astro/src/lib/observability/`) contains "TODO" only inside a quoted upstream Sentry SDK doc-comment, predating this window (`git log` shows last touch 2026-08-20). The only crossfire `TODO`/`FIXME` grep hits were false positives (`MASTODON` contains the substring `TODO`); the one real pre-existing TODO, `services/transcribe/app.py:44` (`pyannote diarization`), is unchanged and scoped.
- No secrets-shaped strings in tracked source. Two regex hits (`deploy.md:63`, `ISA.md:142`) matched Render service/disk resource IDs (`srv-…`, `dsk-…`), not credentials — pattern collision, no action.

## One-clicks

- Interceptor extension load, codex upgrade, blob-token rotation decision: still no repo-trackable evidence either way (session/environment state). Carried forward as open, unchanged since 2026-08-20.
- Supabase MCP reconnect: `crossfire/AGENTS.md:11,32,51` and `deploy.md:18` still assert MCP-only migration law as standing; connection health itself is not a repo fact. Carried forward as open.
- Stale Slack QA cards: `ISA.md:126-131` still marks this RESOLVED (structural) — the 2-3 historical cards are permanently undeletable by design. `TASKS.md:21` still lists it as open (see Register deltas §e) — doc-sync flag, not an operational item.

## New flags for the Golden Board

1. `dispatch/lifecycle/index.md:18` — update the "Latest" pointer (and `last_amended`) to `2026-08-23-a14-story-lane-tailwind.md`, or to whichever checkpoint follows this one.
2. `crossfire/src/index.md` — add `alerts/` and `feed/` to the directory list; both exist and are untracked by the index since PR #1.

The 6 flags filed 2026-08-20 (`deploy.md` ×2, `GENESIS.md`, `TASKS.md`, `ISA.md:50`, `STATE.html`) are not re-filed here — they are already on the board and confirmed still open above, not new.
