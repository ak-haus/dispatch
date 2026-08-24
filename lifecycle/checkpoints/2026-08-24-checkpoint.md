---
title: checkpoint — 2026-08-24
status: active
---

# Checkpoint — 2026-08-24

**Diff against prior checkpoint (2026-08-20-checkpoint.md):** one closure since — the dispatch AGENTS.md:11
Vercel-app claim, which that checkpoint carried as "stands unchanged, unverifiable," is now resolved and
cited with a verification date. Everything else that checkpoint left standing (the 5 crossfire doc
contradictions, `feed-export.ts` untested, `config.ts` comment split, `STATE.html` in-tree, the four
one-clicks) is unchanged as of this sweep.

**Verdict:** 1 register delta, 2 record-drift findings (new), 3 new flags for the Golden Board.

## Register deltas

1. **(a)(b)(c) still landed, re-confirmed.** `dispatch/.github/workflows/` has 14 files including
   `build.yml`/`unit.yml`/`e2e.yml` (no bare naming+typecheck-only state). `test` scripts exist in
   `code/packages/ui/package.json:40`, `code/packages/tokens/package.json:24`,
   `code/apps/microsite-astro/package.json:16`, `code/apps/storybook/package.json:10`. Crossfire has 8
   adapter test files under `src/distribute/adapters/*.test.ts` (substack, bluesky, beehiiv, dev-to,
   mastodon, linkedin, hashnode, threads).
2. **(d) still stands.** `crossfire/scripts/feed-export.ts` (5007 bytes) has no matching `.test.ts`
   anywhere in the repo; `crossfire/.github/workflows/ci.yml` is the only workflow and doesn't reference it.
3. **(e) all 5 still stand, unchanged since 2026-08-20** — none of the five files have a commit since the
   dates already on record: `deploy.md:22-25` (Slack "borrows... dante" tokens) last touched 2026-06-20,
   still contradicts `config.ts:113-116` + `ISA.md:110-117` (own app, no fallback, closed 2026-06-12).
   `deploy.md:115-117` (Vale "not baked into the worker image") still contradicts
   `docker/ts-worker.Dockerfile:5-25` (fetch stage + `VALE_BINARY_PATH`). `GENESIS.md:70-79`'s pipeline
   table still cites `src/ingest/`, `src/fault-tree/`, `src/reshape/fidelity-gate.ts`; `src/` is
   `alerts/ config.ts distribute/ durable/ feed/ observability/ reshape/ slack/ types/` — none of the
   three cited paths exist. `TASKS.md:20-21` still lists all 4 debts as open; `ISA.md:110-131` still
   closes all 4 (2026-06-12). `ISA.md:50` still states the droplet present-tense with no pointer to the
   Render supersession at `ISA.md:227`.
4. **dispatch AGENTS.md:11 Vercel-app claim — CLOSED, register delta.** The 2026-08-20 checkpoint carried
   this as unverifiable from records. It now reads "the Vercel GitHub App is installed (2026-08-20, F3-a;
   verified against Vercel's API by `repoId`...)" — resolved and dated, matching the assumption the
   2026-08-23 build session (`lifecycle/checkpoints/2026-08-23-a14-story-lane-tailwind.md:220-224`) relied
   on for its production-inference argument.

## Record drift

- **New — `crossfire/src/index.md` omits two live subdirectories.** Its Children list (`durable/`,
  `reshape/`, `distribute/`, `slack/`, `observability/`, `config.ts`, `types/`) has not been touched since
  2026-06-24, but `src/alerts/` and `src/feed/` were added 2026-08-18 (PR #3, "Instruments Build 2") and
  are both present in `ls src/` today. The 2026-08-20 checkpoint asserted this index "matches actual
  `src/` layout exactly" — that was already wrong at the time (alerts/feed predate it by two days); this
  sweep is the first to catch it.
- **New — `dispatch/lifecycle/index.md:16` is one cycle behind.** Its "Latest" pointer names the
  2026-08-22 Phase B promotion checkpoint. The 2026-08-23 A14 build-session close
  (`lifecycle/checkpoints/2026-08-23-a14-story-lane-tailwind.md`, committed `d45ed75`) landed after the
  index's `last_amended: 2026-08-22` stamp and is not mentioned.
- `config.ts:43-48`'s schema-comment ("fall back to the borrowed Prime dante vars") still contradicts the
  implementation comment at `config.ts:112-113` ("No borrowed-Dante fallback... CLEANUP-1 closed") —
  unchanged since 2026-08-20, still unflagged on the board (see New flags below).
- `dispatch/AGENTS.md` — re-checked, still no "resolved" string anywhere (97 lines); the AGENTS.md:34
  claim from the ADR charter no longer applies, as noted in the prior checkpoint. No action.
- `STATE.html` (crossfire root) — still in-tree, still titled "D2 done · D3 paused"
  (`STATE.html:6`), still self-admittedly superseded by `ISA.md:3-5`, dated 2026-06-10. 75 days now.

## Hygiene

- `git status --porcelain` clean on both repos; no uncommitted files.
- No merged-but-undeleted branches — both repos are single-branch `main` checkouts (`git branch -a`
  shows only `main`/`remotes/origin/main` in each).
- No secrets-shaped strings (`sk-`, `xox[baprs]-`, AWS key, PEM headers) in tracked source in either repo;
  `crossfire/.env.example` remains shape-only.
- No new TODO/FIXME in application code. Two pre-existing, scoped markers unchanged:
  `crossfire/services/transcribe/app.py:44` (`TODO(D2+): pyannote diarization`) and
  `crossfire/services/transcribe/requirements.txt:5` (`TODO(D4+)`, same item, comment form). One
  pre-existing versioned marker in dispatch: `code/apps/microsite-astro/src/lib/observability/posture.ts:31`
  (`TODO(v11): ...`), scoped to a named future release, not orphaned.

## One-clicks

- Interceptor extension load, codex upgrade, blob-token rotation decision: no repo-trackable evidence
  either way, unchanged — session/environment state, not a record. Carry forward open.
- Supabase MCP reconnect: `crossfire/AGENTS.md:11,32,51` still assert MCP-only migration law as standing;
  no repo signal on live connection health. Carry forward open.
- Stale Slack QA cards: `ISA.md:126` still marks this RESOLVED (structural); `TASKS.md:21` still lists it
  as an open debt. Same doc-sync flag as register delta (e) above, not a new operational item.

## New flags for the Golden Board

1. `crossfire/src/index.md` — add `alerts/` and `feed/` to the Children list (present since 2026-08-18,
   never indexed).
2. `dispatch/lifecycle/index.md:16` — advance the "Latest" checkpoint pointer to the 2026-08-23 A14
   build-session close.
3. `crossfire/src/config.ts:43-48` — delete or rewrite the schema-block comment; it still describes a
   borrowed-Dante fallback that `config.ts:112-116` and `ISA.md:110-117` say was removed 2026-06-12.

Standing flags 1–6 from the 2026-08-20 checkpoint (the 5 doc contradictions + `STATE.html` removal) remain
open and unchanged; not re-filed here to avoid duplication.
