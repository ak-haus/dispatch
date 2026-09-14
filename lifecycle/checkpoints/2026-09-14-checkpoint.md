---
title: checkpoint — 2026-09-14
status: active
---

# Checkpoint — 2026-09-14

**Diff vs 2026-08-20-checkpoint.md:** one Record-drift item closed (dispatch `AGENTS.md:11` Vercel-App claim is now verified-installed with citation, no longer "unverifiable"); all 6 prior flags for the Golden Board are still open (no build-session report between 2026-08-20 and 2026-08-31 touched them); one new drift item found (crossfire `src/index.md` omits `alerts/`).

**Verdict:** 0 register deltas since last checkpoint (register unchanged, all five re-verified) · 2 record-drift items this round (1 closed, 1 new) · 2 new flags for the Golden Board.

## Register deltas

Re-verified against the 2026-08-20 checkpoint's findings — no change on any of the five:

1. **(a) unchanged — still landed.** `dispatch/.github/workflows/` still has 15 files (`build.yml`, `unit.yml`, `e2e.yml`, `lighthouse.yml`, `storybook.yml`, `design-judge.yml`, `tokens.yml`, `tokens-lint.yml`, `content.yml`, `design.yml`, `ideation.yml`, `analytics-loop.yml`, `uptime.yml`, `naming.yml`, `typecheck.yml`).
2. **(b) unchanged — still landed.** `test` scripts present in `code/packages/ui/package.json:40`, `code/packages/tokens/package.json:24`, `code/apps/microsite-astro/package.json:16`, `code/apps/storybook/package.json:10`.
3. **(c) unchanged — still landed.** `crossfire/src/distribute/adapters/` still has 8 test files (beehiiv, bluesky, dev-to, hashnode, linkedin, mastodon, substack, threads).
4. **(d) unchanged — still stands.** `crossfire/scripts/feed-export.ts` has no matching test file; `grep feed-export .github/workflows/*` returns nothing — not referenced by CI.
5. **(e) unchanged — all 5 still stand:**
   - `deploy.md:22-25` — "Slack currently borrows Prime's `dante` app tokens... carried debt CLEANUP-1." `config.ts:111-116` reads `CROSSFIRE_SLACK_*` only (no fallback); `ISA.md:113-117` — CLEANUP-1 closed 2026-06-12, own app `crossfireqa` verified live. Doc stale.
   - `deploy.md:115-117` — "Vale binary is not baked into the worker image... degrades LOUDLY." `docker/ts-worker.Dockerfile:5-15` bakes the pinned Vale binary and sets `VALE_BINARY_PATH`; its own comment (line ~19) says the gate "now runs FOR REAL... no longer the LOUD-degraded 'vale-skipped' path." Doc stale.
   - `GENESIS.md:74,76,78` — Pipeline table cites `src/ingest/`, `src/reshape/fidelity-gate.ts`, `src/fault-tree/`. Actual `src/` = `alerts/ config.ts distribute/ durable/ feed/ observability/ reshape/ slack/ types/`. None of the cited paths exist. Doc stale.
   - `TASKS.md:20-21` — "Open debts (ISA.md register): own Slack app · Dev.to 429 re-drive · Vale-as-advisory · stale QA cards." `ISA.md:107-131` — "Open: _None — the register is clear"; all four closed/resolved 2026-06-12. Doc stale.
   - `ISA.md:50` — present-tense "Restate self-hosted as a single binary (droplet `prime-city-1`)," no qualifier. `ISA.md:227` — "Render replaces the droplet as the always-on host." Same file contradicts itself; line 50 still lacks a supersession pointer.

## Record drift

- **Closed since last checkpoint.** `dispatch/AGENTS.md:11` — last checkpoint logged this as "no contrary repo evidence found... unverifiable further from records alone." It now reads "the Vercel GitHub App is installed (2026-08-20, F3-a; verified against Vercel's API by `repoId`...)" — a concrete, dated, cited verification replacing the earlier unresolved claim. No further action.
- **New this round.** `crossfire/src/index.md` lists `durable/`, `reshape/`, `distribute/`, `slack/`, `observability/`, `config.ts`, `types/` as the contents of `src/` — omits `alerts/`, which now exists on disk (`ls src/` — 8 entries vs. 7 documented). Last checkpoint found this file "matches actual `src/` layout exactly"; it no longer does.
- **Still stands, unrepaired.** `crossfire/src/config.ts:43-48`'s schema-block comment ("fall back to the borrowed Prime `dante` vars... CLEANUP-1") still contradicts the implementation comment at `config.ts:112-113` ("No borrowed-Dante fallback... CLEANUP-1 closed"). Flagged in the 2026-08-20 checkpoint's Record-drift section but never carried to the Golden Board as a flag — elevating it below.
- `dispatch/AGENTS.md` — no "resolved" string anywhere (107 lines total); the 2026-08-20 checkpoint's note that the old `:34` "all resolved" claim no longer exists still holds. No action.
- Index files spot-checked (`dispatch/index.md`, `dispatch/lifecycle/index.md`, `dispatch/lifecycle/fixtures/index.md`, `dispatch/representation/visual-system/components/index.md`, `dispatch/representation/index.md`, all `index.md` files repo-wide in both repos via link-resolution check): all linked children exist on disk. Clean except the `crossfire/src/index.md` item above.
- `crossfire/STATE.html` — still in-tree, still self-admittedly superseded (`ISA.md:3-5`, dated 2026-06-10) — now 96 days stale, not 71. Unchanged status, elevating to flags again below since it was flagged 2026-08-20 and no build session has acted on it.

## Hygiene

- `git status --porcelain` clean on both repos.
- No branches beyond `main`/`origin/main` in either repo (both single-branch checkouts).
- No secrets-shaped strings (`sk-`, `xox[baprs]-`, AWS key, PEM headers) in tracked source in either repo.
- One pre-existing TODO unchanged: `crossfire/services/transcribe/app.py:44` — `TODO(D2+): pyannote diarization`; `requirements.txt:5` carries a second copy tagged `TODO(D4+)` for the same work — a harmless phase-tag mismatch between the two, not a new finding, no action.
- No new TODO/FIXME in dispatch or crossfire application code. (`config.ts`/`mastodon.*` grep hits for "TODO" were false positives from the substring in "MASTODON" — not real markers.)

## One-clicks

- **Interceptor extension load, codex upgrade, blob-token rotation decision** — still no repo-trackable evidence either way; no build-session report since 2026-08-20 references any of the three. Carry forward as open.
- **Supabase MCP reconnect** — `crossfire/AGENTS.md:11,32,51` and `deploy.md:18` still assert MCP-only migration law as standing; connection health is a live-session fact, not a record. Carry forward as open.
- **Stale Slack QA cards** — unchanged: `ISA.md:126-131` marks this RESOLVED (structural, historical `dante`-posted cards are permanently undeletable by a different app identity); `TASKS.md:20-21` still lists it as an open debt (see Record deltas (e) above — same doc-sync gap, not a new operational item).

## New flags for the Golden Board

1. `crossfire/src/config.ts:43-48` — delete or rewrite the schema-block comment to match the implementation comment at `:112-113` (own-app-only, no Dante fallback, CLEANUP-1 closed). Surfaced 2026-08-20, unrepaired since; filing formally now.
2. `crossfire/src/index.md` — add `alerts/` to the directory listing (new dir, currently undocumented).

Carried forward unchanged from 2026-08-20 (still open, not re-filed, listed there): `deploy.md:22-25` Slack rewrite · `deploy.md:115-117` Vale rewrite · `GENESIS.md:70-79` Pipeline table rewrite · `TASKS.md:20-21` open-debts line · `ISA.md:50` supersession pointer · `STATE.html` removal/relocation.
