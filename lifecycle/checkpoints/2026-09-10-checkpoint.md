---
title: checkpoint — 2026-09-10
status: active
---

# Checkpoint — 2026-09-10

**Diff against 2026-08-20-checkpoint.md:** one item closed — `dispatch/AGENTS.md:11`'s Vercel-App claim now matches repo state (previously "unverifiable from records alone," now the doc itself asserts installation with a verification citation). All 6 prior New-flags remain open (doc side unrepaired). Two new record-drift findings surfaced (stale index files), not present at last check.

**Verdict:** 0 register deltas (a–e reconfirmed unchanged since 2026-08-20), 6 record-drift findings (1 closed, 2 new, 3 standing), 2 new flags.

## Register deltas

1. **(a) Still landed.** `dispatch/.github/workflows/` still carries 15 files incl. `build.yml`/`unit.yml`/`e2e.yml`/`lighthouse.yml`; unchanged from last check.
2. **(b) Still landed.** `test` scripts still present in `code/packages/ui/package.json`, `code/packages/tokens/package.json`, `code/apps/microsite-astro/package.json`, `code/apps/storybook/package.json`.
3. **(c) Still landed.** `crossfire/src/distribute/adapters/` still has 8 adapter test files (substack, bluesky, beehiiv, dev-to, mastodon, linkedin, hashnode, threads); `ci.yml:20` still runs `bunx vitest run` over all.
4. **(d) Still stands.** `crossfire/scripts/feed-export.ts` has no matching test file; no `feed-export` reference in `.github/workflows/`.
5. **(e) All 5 still stand**, unchanged from last check:
   - `deploy.md:23` "Slack currently borrows Prime's `dante` app tokens" vs `config.ts:112-116`/`ISA.md:113` (own app, CLEANUP-1 closed 2026-06-12).
   - `deploy.md:115-117` "Vale binary is not baked into the worker image" vs `docker/ts-worker.Dockerfile:5-24` (bakes it, sets `VALE_BINARY_PATH`).
   - `GENESIS.md:70-79` cites `src/ingest/`, `src/fault-tree/`, `src/reshape/fidelity-gate.ts`; none exist — actual `src/` is `alerts config.ts distribute durable feed observability reshape slack types`.
   - `TASKS.md:20-21` lists 4 open debts; `ISA.md:113,126` shows all 4 closed 2026-06-12.
   - `ISA.md:50` "Restate self-hosted as a single binary (droplet `prime-city-1`)" present-tense, uncontradicted locally by line 227 ("Render replaces the droplet") — no supersession marker added.

## Record drift

1. **CLOSED.** `dispatch/AGENTS.md:11` no longer claims the Vercel GitHub App is absent — it now reads "installed (2026-08-20, F3-a; verified against Vercel's API by `repoId`)." Matches repo state; no action.
2. **Standing.** `crossfire/src/config.ts:45-47` schema-block comment ("fall back to the borrowed Prime `dante` vars… CLEANUP-1") still contradicts its own implementation comment at `config.ts:112-113` ("No borrowed-Dante fallback… CLEANUP-1 closed"). Same file, two comments disagreeing.
3. **Standing, no action.** `dispatch/AGENTS.md:34` "all resolved" claim: string absent from the file (107 lines now, up from 81 at last check — grown, not reverted); already clean.
4. **NEW.** `crossfire/src/index.md` claims to enumerate `src/`'s children (`durable`, `reshape`, `distribute`, `slack`, `observability`, `config.ts`, `types`) but omits `alerts/` and `feed/`, both real directories in `src/` today. Last checkpoint found this file "matches actual layout exactly" — it no longer does.
5. **NEW.** `dispatch/lifecycle/index.md`'s "Latest" pointer names `checkpoints/2026-08-30-b15-idiom-convergence.md` as the newest checkpoint. Three later session-close records exist and are unlisted: `2026-08-31-b16-sitenav.md`, `2026-08-31-b16-searchpalette.md`, `2026-08-31-b16-chapterrail.md`.
6. **Standing.** `crossfire/STATE.html` — self-admitted superseded by `ISA.md:3-5` on 2026-06-10, still in-tree 92 days later, title still reads "D2 done · D3 paused" though D3/D4 closed (`ISA.md:126,135,218`).

Spot-check, clean: `dispatch/lifecycle/fixtures/index.md` children (ChapterRail, Footnote, MastheadWordmark, ReadingProgress, SiteNav) match the actual `fixtures/` directory.

## Hygiene

- `git status --porcelain` clean on both repos; no uncommitted files.
- No merged-but-undeleted branches — both repos are single-branch `main` checkouts (`git branch -a` shows only `main`/`origin/main`).
- No secrets-shaped strings in tracked source (`sk-`, `xox[baprs]-`, AWS key, PEM headers) — all hits are literal-format mentions inside comments/docs describing token naming (`qa-bridge.ts:39`, `deploy.md:63`, `ISA.md:142`), none are actual credential values.
- One pre-existing TODO, scoped: `crossfire/services/transcribe/app.py:44` `TODO(D2+): pyannote diarization`. No new TODO/FIXME in application code on either repo — the only other TODO hit (`dispatch/code/apps/microsite-astro/src/lib/observability/posture.ts:31`) is a quoted excerpt from Sentry's own upstream source inside a doc comment, not a Dispatch-owned marker.

## One-clicks

- Interceptor extension load, codex upgrade, blob-token rotation decision: no repo-trackable evidence either way (session/environment facts). Carry forward as open.
- Supabase MCP reconnect: `crossfire/AGENTS.md:11,32,51` and `deploy.md:18` still assert MCP-only migration law as standing; connection health itself is a live session fact, not a record. Carry forward as open.
- Stale Slack QA cards: `ISA.md:126` still marks RESOLVED (structural, cards permanently undeletable by design); `TASKS.md:21` still lists it as an open debt — same doc-sync flag as last checkpoint (#4 below), not a new operational item.

## New flags for the Golden Board

1. `crossfire/src/index.md` — add `alerts/` and `feed/` to the children list (both real, both missing).
2. `dispatch/lifecycle/index.md` — advance the "Latest" pointer past B15 to the three 2026-08-31 B16 closes (SiteNav, SearchPalette, ChapterRail).

Prior 6 flags (2026-08-20 checkpoint) remain open, unrepaired: `deploy.md:22-25` Slack section, `deploy.md:115-117` Vale section, `GENESIS.md:70-79` Pipeline table, `TASKS.md:20-21` open-debts line, `ISA.md:50` droplet supersession marker, `STATE.html` removal/relocation.
