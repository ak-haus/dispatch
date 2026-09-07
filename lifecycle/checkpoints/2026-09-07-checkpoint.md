---
title: checkpoint — 2026-09-07
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-07

**Diff against 2026-08-20-checkpoint.md:** 1 of that report's 6 record-drift lines closed (dispatch `AGENTS.md:11`'s Vercel claim, resolved same-day by the 2026-08-20 ledger burn and B4). The other 5 filed flags (deploy.md Slack/Vale, GENESIS.md pipeline table, TASKS.md open debts, ISA.md droplet line, STATE.html) are unactioned 18 days later — all still stand, unchanged. Two new drift lines surfaced this run (both index files, both from real work landing since 08-20 without an index update).

**Verdict:** 0 register deltas (register items a–e unchanged since 2026-08-20), 6 record-drift lines (2 new, 1 closed, 3 carried), 1 hygiene flag, 3 new flags for the Golden Board.

## Register deltas

All five re-verified first-hand; none changed since the 2026-08-20 checkpoint.
- **(a)** Still landed. `dispatch/.github/workflows/` has 15 files (naming.yml, typecheck.yml, unit.yml, e2e.yml, build.yml, lighthouse.yml, storybook.yml, design-judge.yml, tokens.yml, tokens-lint.yml, content.yml, design.yml, ideation.yml, analytics-loop.yml, uptime.yml).
- **(b)** Still landed. `test` scripts exist in `code/packages/ui/package.json`, `code/packages/tokens/package.json`, `code/apps/microsite-astro/package.json`, `code/apps/storybook/package.json`.
- **(c)** Still landed. `crossfire/src/distribute/adapters/` has 8 `.test.ts` files (beehiiv, bluesky, dev-to, hashnode, linkedin, mastodon, substack, threads) — all 8 adapters covered.
- **(d)** Still stands. `crossfire/scripts/feed-export.ts` has no matching test file; `crossfire/.github/workflows/ci.yml`'s `bunx vitest run` step doesn't reach it (no `.test.ts` exists to collect).
- **(e)** All 5 still stand:
  - `deploy.md:22-25` — Slack "currently borrows Prime's `dante` app tokens." Contradicted by `src/config.ts:112-116` (own app, no borrowed-Dante fallback, CLEANUP-1 closed) and `ISA.md:110-117`.
  - `deploy.md:115-117` — "Vale binary is not baked into the worker image." Contradicted by `docker/ts-worker.Dockerfile:4-24` (fetches, bakes, and sets `VALE_BINARY_PATH`).
  - `GENESIS.md:57-79` — architecture/pipeline table cites `src/ingest/`, `src/fault-tree/`, `src/reshape/fidelity-gate.ts`. None exist; current `src/` is `alerts/ config.ts distribute/ durable/ feed/ observability/ reshape/ slack/ types/` (confirmed via `ls`), matching `ISA.md:197`'s "Legacy V1 surface retired."
  - `TASKS.md:20-21` — lists 4 open debts (own Slack app, Dev.to 429, Vale-advisory, stale QA cards). `ISA.md:113` says the register is clear ("None"); `ISA.md:117-131` shows all 4 closed 2026-06-12.
  - `ISA.md:50` — present-tense "Restate self-hosted... droplet `prime-city-1`," no qualifier; `ISA.md:227` says "Render replaces the droplet as the always-on host." Same contradiction, same lines, as 08-20.

## Record drift

- **CLOSED since last checkpoint:** dispatch `AGENTS.md:11` now reads the App as installed (verified against Vercel's API by `repoId`, per the 08-20 ledger's F3-a). This is accurate and current — no action.
- `src/config.ts:43-48`'s schema-comment ("fall back to the borrowed Prime dante vars") still contradicts its own file's implementation comment at `config.ts:111-113` ("No borrowed-Dante fallback... CLEANUP-1 closed"). Unrepaired since 08-20.
- dispatch `AGENTS.md:34` "all resolved" — re-confirmed absent (55-line file, no "resolved" string). Already closed at 08-20; no action.
- **NEW.** `dispatch/lifecycle/index.md:16` "Latest" pointer names the 2026-08-30 checkpoint as newest; three later checkpoints exist and are unlisted — `2026-08-31-b16-chapterrail.md`, `2026-08-31-b16-searchpalette.md`, `2026-08-31-b16-sitenav.md`. Frontmatter `last_amended: 2026-08-28` also predates the 2026-08-30 reference already in the body.
- **NEW.** `crossfire/src/index.md` lists `durable/`, `reshape/`, `distribute/`, `slack/`, `observability/`, `config.ts`, `types/` as `src/`'s children. Two directories exist and are unlisted: `alerts/` (`monitor.ts`, 146 lines + test) and `feed/` (`contract.ts` + `sanitize.ts`, 272 lines + tests) — both post-date the index. `feed/` in particular matches ADR-0001's Phase-0/2 sanitized-ledger contract; if it is the Live Wire writer, that ADR's status line is now stale too and worth a build-session look, not a checkpoint fix.
- `crossfire/STATE.html` — still in-tree, still self-admittedly superseded (`ISA.md:3-5`, dated 2026-06-10, now 89 days). Title still reads "D2 done · D3 paused" though both have long closed (`ISA.md:117,197`).

## Hygiene

- `git status --porcelain` clean on both repos; both are single-branch `main` checkouts (no merged-undeleted branches to prune).
- No secrets-shaped strings in tracked source (`sk-`, `xox[baprs]-`, AWS key, PEM headers). One false-positive: `deploy.md:63` and `ISA.md:142` match the `sk-` pattern only because a Render disk id (`dsk-d8lvh9cvikkc73buqveg`) contains the substring — not a credential. `crossfire/.env.example` remains shape-only.
- **NEW.** `crossfire/services/transcribe/requirements.txt:5` tags the pyannote-diarization TODO `TODO(D4+)`; `crossfire/services/transcribe/app.py:44` tags the same feature `TODO(D2+)`. Same debt, two different phase gates — minor, but one of the two is wrong.
- `dispatch/code/apps/microsite-astro/src/lib/observability/posture.ts:31` "TODO(v11)" is a quoted excerpt from the Sentry SDK's own internal comment (explaining why the file sets `dataCollection` explicitly), not a project TODO — no action.
- No new orphaned TODO/FIXME in application code beyond the item above.

## One-clicks

Restated, all still open — none verifiable from repo records alone:
- Interceptor extension load, codex upgrade — session/environment state, no repo signal either way.
- Supabase MCP reconnect — `crossfire/AGENTS.md:11,32,51` assert MCP-only migration law as standing; connection health itself isn't a record.
- Blob-token rotation decision — no repo evidence a decision was made; `docs/adr/0001-crossfire-live-activity.md:203` names `BLOB_READ_WRITE_TOKEN` as the credential but rotation policy is undecided.
- Stale Slack QA cards — operationally resolved per `ISA.md:126` (structural: old `dante`-identity cards can't be programmatically deleted); `TASKS.md:21` still lists it as an open debt. Doc-sync only, already filed under Register delta (e).

## New flags for the Golden Board

1. `dispatch/lifecycle/index.md:16` — update "Latest" to the actual newest checkpoint and bump `last_amended`; three B16 close records are currently invisible to anyone navigating from the index.
2. `crossfire/src/index.md` — add `alerts/` and `feed/` to the children list; confirm whether `feed/contract.ts`/`sanitize.ts` is ADR-0001's ledger writer and if so update that ADR's phase status.
3. `crossfire/services/transcribe/requirements.txt:5` vs `app.py:44` — reconcile the diarization TODO's phase tag (D2+ vs D4+) to one value.

The 5 flags carried from 08-20 (deploy.md Slack/Vale sections, GENESIS.md pipeline table, TASKS.md open-debts line, ISA.md:50 supersession pointer, STATE.html disposition) remain open and are not restated in full here — see Register delta (e) and Record drift above for current citations.
