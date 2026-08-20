---
title: checkpoint — 2026-08-20
status: active
---

# Checkpoint — 2026-08-20

**Verdict:** first checkpoint on file (no prior report to diff against) — 3 register deltas, 6 record-drift findings, 6 new flags.

## Register deltas

1. **(a) FALSE, now landed.** `dispatch/.github/workflows/` has 15 files, not 2 — `build.yml`, `unit.yml`, `e2e.yml`, `lighthouse.yml`, `storybook.yml`, `design-judge.yml`, `tokens.yml`, `tokens-lint.yml`, `content.yml`, `design.yml`, `ideation.yml`, `analytics-loop.yml`, `uptime.yml` all now exist alongside `naming.yml`/`typecheck.yml`. Matches Phase A landing noted in ADR-0002 §Context footnote and AGENTS.md:29-32's 15-context ruleset.
2. **(b) FALSE, now landed.** `test` scripts exist in `code/packages/ui/package.json`, `code/packages/tokens/package.json`, `code/apps/microsite-astro/package.json` (`vitest run`), `code/apps/storybook/package.json`. `unit.yml` runs `--filter microsite-astro test` and `--filter @prime-dispatch/ui test` in CI.
3. **(c) FALSE, now landed.** `crossfire/src/distribute/adapters/` has 8 test files (substack, bluesky, beehiiv, dev-to, mastodon, linkedin, hashnode, threads), not 1. `ci.yml`'s `bunx vitest run` covers all.
4. **(d) STILL STANDS.** `crossfire/scripts/feed-export.ts` has zero matching test file; not referenced by `ci.yml`.
5. **(e) ALL 5 STILL STAND** (doc side unrepaired even where code moved further):
   - `deploy.md:22-25` says Slack "borrows Prime's dante app tokens," CLEANUP-1 open. `config.ts:112-116` + `ISA.md:110-117` show CLEANUP-1 closed 2026-06-12, dedicated app, no fallback. Doc stale.
   - `deploy.md:115-117` says Vale "is not baked into the worker image." `docker/ts-worker.Dockerfile:5-25` bakes it and sets `VALE_BINARY_PATH`. Doc stale.
   - `GENESIS.md:70-79` "Pipeline" table cites `src/ingest/`, `src/fault-tree/`, `src/reshape/fidelity-gate.ts` as key files. None exist — `src/` is now `alerts/ config.ts distribute/ durable/ feed/ observability/ reshape/ slack/ types/`. `ISA.md:194` confirms: "Legacy V1 surface retired... hand-rolled fault-tree/state machine... deleted." Doc stale.
   - `TASKS.md:20-21` lists 4 "open debts" (own Slack app, Dev.to 429, Vale-advisory, stale QA cards). `ISA.md:110-131,184-188` shows all 4 closed 2026-06-12. Doc stale.
   - `ISA.md:50` states present-tense "Restate self-hosted as a single binary (droplet `prime-city-1`)" with no qualifier. `ISA.md:227` says "Render replaces the droplet as the always-on host" — the doc contradicts itself across sections; line 50 needs a historical/superseded marker.

## Record drift

- `config.ts:43-48`'s schema-block comment ("fall back to the borrowed Prime dante vars") contradicts its own implementation comment at `config.ts:112-113` ("No borrowed-Dante fallback... CLEANUP-1 closed"). Same file, two contradicting comments — the schema-block one is stale, should be deleted or updated.
- `dispatch/AGENTS.md:34` "all resolved" claim (cited in this charter) no longer exists in the file (81 lines total, no "resolved" string anywhere) — already cleaned up in a prior rewrite. No action needed.
- `dispatch/AGENTS.md:11`'s Vercel-GitHub-App-not-installed claim: no contrary repo evidence found (no `.vercel/`, no Vercel Action in workflows) — stands unchanged, unverifiable further from records alone.
- Index files spot-checked clean: `dispatch/index.md` children all resolve; `dispatch/lifecycle/index.md` children resolve, and its `code/vercel.json` deploy-source-of-truth claim checks out (`code/vercel.json` exists); `crossfire/src/index.md` matches actual `src/` layout exactly.
- `STATE.html` (crossfire root) is a self-admitted superseded artifact — `ISA.md:3-5`: "This supersedes the prior ISA framing (STATE.html)," dated 2026-06-10. Still in-tree 71 days later, still titled "D2 done · D3 paused" though D3/D4 have since closed (`ISA.md:126,135,194`).

## Hygiene

- `git status --porcelain` clean on both repos; no uncommitted files.
- No merged-but-undeleted branches (both repos are single-branch `main` checkouts here).
- No secrets-shaped strings found in tracked source (`sk-`, `xox[baprs]-`, AWS key, PEM headers) across either repo; `crossfire/.env.example` is shape-only as required.
- One pre-existing TODO: `crossfire/services/transcribe/app.py:44` — `TODO(D2+): pyannote diarization`. Scoped to a named future phase, not orphaned; no action.
- No new TODO/FIXME in dispatch application code (`code/apps/microsite-astro/src`, `code/packages`).

## One-clicks

- Interceptor extension load, codex upgrade, blob-token rotation decision: no repo-trackable evidence either way — session/environment state, not verifiable from records. Carry forward as open.
- Supabase MCP reconnect: `crossfire/AGENTS.md:11,32,51` and `deploy.md:18` all assert MCP-only migration law as standing; no repo signal on connection health itself (that's a live session fact, not a record). Carry forward as open.
- Stale Slack QA cards: `ISA.md:126` marks this RESOLVED (structural) — the 2-3 historical cards are inert and permanently undeletable by design (posted by the old `dante` identity). `TASKS.md:21` still lists it as an open debt — see Record drift above; this is a doc-sync flag, not an open operational item.

## New flags for the Golden Board

1. `deploy.md:22-25` — rewrite Slack section to match `config.ts`/`ISA.md:110-117` (own app, no fallback).
2. `deploy.md:115-117` — rewrite Vale section to match `docker/ts-worker.Dockerfile` (baked in).
3. `GENESIS.md:70-79` — rewrite Pipeline/Key-files table to match `src/durable/` layout; drop `src/ingest/`, `src/fault-tree/`, `fidelity-gate.ts` references (retired, per `ISA.md:194`).
4. `TASKS.md:20-21` — delete or update "Open debts" line; all 4 cited items closed per `ISA.md`.
5. `ISA.md:50` — add a supersession pointer to line 227 (Render replaces droplet) so the doc doesn't contradict itself top-to-bottom.
6. `STATE.html` — candidate for removal or relocation to the private ops archive, matching the pattern already used for dispatch's V1 rails (dispatch `AGENTS.md:14`); self-admitted superseded 71 days ago, never moved.
