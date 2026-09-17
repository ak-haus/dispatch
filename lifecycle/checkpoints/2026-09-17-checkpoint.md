---
title: checkpoint — 2026-09-17
status: active
---

# Checkpoint — 2026-09-17

**Verdict:** vs `2026-08-20-checkpoint.md` (only prior checkpoint report) — 0 register deltas (all 6 filed flags still open, register unchanged), 2 new record-drift findings + 1 drift item closed on its own + 2 standing, 2 new Golden Board flags.

**Diff against last run:** none of the 6 flags filed 2026-08-20 have closed. One drift item resolved itself: dispatch `AGENTS.md:11`'s Vercel-install ambiguity is gone (see Record drift). Two new drift findings surfaced, both downstream of dispatch's ADR-0004 (ratified 2026-08-21, after the last checkpoint) — a live CI script judges against a rule ADR-0004 retired.

## Register deltas (re-verification of ADR-0002 §4 register)

(a) Still landed, unchanged. dispatch `.github/workflows/` holds 15 files (`build.yml`, `unit.yml`, `e2e.yml` among them) — `naming.yml`+`typecheck.yml` are not alone.
(b) Still landed, unchanged. `test` scripts stand at `code/packages/ui/package.json:40`, `code/packages/tokens/package.json:24`, `code/apps/microsite-astro/package.json:16`, `code/apps/storybook/package.json:10`.
(c) Still landed, unchanged. crossfire `src/distribute/adapters/` carries 8 `*.test.ts` files (beehiiv, bluesky, dev-to, hashnode, linkedin, mastodon, substack, threads).
(d) Still stands, unchanged. crossfire `scripts/feed-export.ts` has no matching test file and is not referenced in `.github/workflows/ci.yml`.
(e) All 5 still stand, re-verified first-hand, unchanged:
  1. `deploy.md:22-25` says Slack "borrows Prime's `dante` app tokens"; `src/config.ts:112-115` + `ISA.md:113-119` show CLEANUP-1 closed 2026-06-12 (own app, no runtime fallback).
  2. `deploy.md:115-117` says Vale "is not baked into the worker image"; `docker/ts-worker.Dockerfile:5-24` bakes it and sets `VALE_BINARY_PATH`.
  3. `GENESIS.md:70-79` pipeline table cites `src/ingest/`, `src/fault-tree/`, `src/reshape/fidelity-gate.ts`; current `src/` = `alerts config.ts distribute durable feed observability reshape slack types` — no ingest, no fault-tree, no fidelity-gate.ts (that logic now lives in `src/durable/gate.ts`).
  4. `TASKS.md:20-21` lists 4 open debts (own Slack app, Dev.to 429, Vale-advisory, stale QA cards); `ISA.md:107-109` reads "Open: None"; `ISA.md:113-131` shows all 4 closed 2026-06-12.
  5. `ISA.md:50` states present-tense "Restate self-hosted as a single binary (droplet `prime-city-1`)" with no qualifier; `ISA.md:227` says "Render replaces the droplet as the always-on host" — no supersession pointer added at line 50 since last flagged.

## Record drift

- **Closed since last run.** dispatch `AGENTS.md:11` no longer carries the "Vercel GitHub App not installed" ambiguity flagged 2026-08-20 — it now reads "the Vercel GitHub App is installed (2026-08-20, F3-a; verified against Vercel's API by `repoId`)." No action; recorded for the diff.
- **New — ADR-0004's retirement of the 12px type floor is not propagated.** `docs/adr/0004-doctrine-grounding-and-audit-tracks.md` (2026-08-21) + `DESIGN.md:299-306` ("Type must scale; there is no fixed pixel floor") retire it. Three docs still assert it live: `.claude/CLAUDE.md:51` ("12px floor"), `docs/runbooks/design-intent-to-code.md:18` ("12px floor"), `scripts/analytics-loop.mjs:107` (`bearsOn: [... '12px floor']`). One is not a doc but an active judging instruction: `code/apps/microsite-astro/scripts/semantic-judge.mjs:78` still tells the semantic judge to score shipped surfaces against "the 12px minimum type floor" — a live check enforcing a retired rule.
- **New — `lifecycle/index.md:16` stale pointer.** Names "Latest: 2026-08-30 B15…" as newest; three newer checkpoint files exist and aren't listed: `2026-08-31-b16-chapterrail.md`, `2026-08-31-b16-searchpalette.md`, `2026-08-31-b16-sitenav.md`.
- Standing, unchanged: crossfire `src/config.ts:44-46` comment still describes reading "the borrowed Prime `dante` vars... when unset," contradicting its own `:112-113` comment ("No borrowed-Dante fallback... CLEANUP-1 closed"). Same file, two contradicting comments.
- Standing, unchanged: crossfire `STATE.html` (root, 19451 bytes) still in-tree; `ISA.md:4-5` still calls it superseded (dated 2026-06-10 — 99 days now).
- Re-checked, no action: dispatch `AGENTS.md` (107 lines) has no "resolved" string anywhere — the 2026-08-20 note that this claim was already cleaned up still holds.

## Hygiene

- `git status --porcelain` clean on both repos.
- No merged-undeleted branches — both repos are single-branch `main` checkouts (`git branch -a` shows only `main`/`origin/main`).
- No secrets-shaped strings (`sk-`, `xox[baprs]-`, AWS-key, PEM headers) found in tracked source, either repo.
- No new TODO/FIXME in application code. dispatch `code/apps/microsite-astro/src/lib/observability/posture.ts:31` contains a "TODO(v11)" string, but it's a quoted excerpt from the installed `@sentry/core` package's own source (the surrounding comment documents it as a quote) — not a first-party TODO, no action. crossfire `services/transcribe/app.py:44` `TODO(D2+)` is the same pre-existing, phase-scoped item noted 2026-08-20 — unchanged.

## One-clicks

All carried forward unchanged — no repo-trackable evidence either way, same as 2026-08-20:
- Interceptor extension load, codex upgrade, blob-token rotation decision — session/environment state, not visible in records.
- Supabase MCP reconnect — MCP-only migration law still asserted as standing (crossfire `AGENTS.md:11,32,51`, `deploy.md:18`); connection health itself isn't a repo fact.
- Stale Slack QA cards — `ISA.md:126-131` still marks this resolved-structural (undeletable by design, ages out); `TASKS.md:20-21` still lists it as an open debt — same doc-sync flag as register (e)4, not a separate item.

## New flags for the Golden Board

1. `.claude/CLAUDE.md:51`, `docs/runbooks/design-intent-to-code.md:18`, `scripts/analytics-loop.mjs:107`, `code/apps/microsite-astro/scripts/semantic-judge.mjs:78` (dispatch) — strip the retired 12px-floor language per ADR-0004/R1a. `semantic-judge.mjs` is the one with live effect (an actual judging criterion) — prioritize it.
2. `lifecycle/index.md:16` (dispatch) — update the "Latest" pointer to the 2026-08-31 B16 trio (ChapterRail/SearchPalette/SiteNav fork retirements).

**Carried forward, still open — 0 of 6 closed since 2026-08-20:**
3. crossfire `deploy.md:22-25` — rewrite Slack section (own app, no fallback).
4. crossfire `deploy.md:115-117` — rewrite Vale section (baked in).
5. crossfire `GENESIS.md:70-79` — rewrite pipeline table to the `src/durable/` layout.
6. crossfire `TASKS.md:20-21` — delete/update "open debts" (all 4 closed per `ISA.md`).
7. crossfire `ISA.md:50` — add a supersession pointer to `:227`.
8. crossfire `STATE.html` — candidate for removal/relocation to the private ops archive.
