---
title: checkpoint — 2026-10-05 (routine) — Build 33 absorbed, 13 production advisories newly open
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-05 (routine)

Walked, oldest first, by each record's own arrival on `main`: `2026-09-21-checkpoint.md` (`74c0dbd`),
`2026-09-24-checkpoint.md` (`f179d7c`, the newest routine report), `2026-09-23-b33-f61.md` (`b0fba2a`,
Build 33's close record — filename-dated before the newest report but merged after it, last of the
three). Nothing has closed on `main` since `b0fba2a`; that is still `origin/main` HEAD. Since the newest
routine report: two of its own claims are corrected below (F67, F61's cited commit); F71–F73 (filed by
Build 33, merged after the report ran) enter the register for the first time; 13 production advisories
(0 critical/4 high/5 moderate/4 low) are newly present where the last report measured zero.

**Verdict.** 6 register deltas (F67 reclassified closed, F61 reconfirmed closed on the correct commit,
F71/F72/F73 newly registered open, F49 clarified-open); 3 drift findings (two in the newest report's own
text, one resolved pointer); 0 hygiene findings; 13 advisories newly open, all new since the last report's
0/0/0/0; 1 new flag (the advisory remediation path).

## Register

- **F61 — closed, but `2026-09-24-checkpoint.md:44-46` cites the wrong commit.** It credits `e0593f3`
  for F61's media half; `e0593f3` is `fix(b32): a hostile wire feed degrades nothing (F62)` — unrelated.
  The real fixes are Build 33's `8feb5df`/`585e7f1` (pull-quote half) and Build 32's `cc1dc4f` (media
  half). Confirmed firsthand: `ArticleSpread.tsx:167,190` now renders `featured.data.pullQuote`, not a
  literal. Build 33's branch (`8feb5df`…`dace8e6`) was cut from `a05223d` alongside the 2026-09-21
  checkpoint branch and merged last, as `b0fba2a` — after both checkpoint PRs — which is why neither
  checkpoint record saw `b33-f61.md` directly.
- **F67 — closed, and was closed before the newest report ran.** `2026-09-24-checkpoint.md:50-55` carries
  it forward as open ("not in any B30–B32 commit message, appears unaddressed"). `git show
  4512fae -- .../SpheresSpread.tsx` shows the fix landed in the same commit that filed it: `tabIndex={0}`
  and `role="region"` on the scrollable `<pre>`, confirmed live today at `SpheresSpread.tsx:340,343-344`.
  The report's own Record-drift #2 noticed Build 29's table undersold its commit but stopped short of
  rechecking F67 itself.
- **F71 — open, newly registered.** `b33-f61.md:184-195`: six decorative `<button>` elements in
  `CrossfireSpread.tsx:767-769,801-810` (`+ Follow`, Like/Comment/Repost/Send) are tab stops with no
  handler, and each sits beneath another dossier card once focused — WCAG 2.2 SC 2.4.11. Confirmed still
  present, no handler or `tabIndex`/`aria-hidden` change since. Blocks D1 until Build 34.
- **F72 — open, newly registered, AK's.** `b33-f61.md:196-205`: `readingTime` is authored and wrong.
  Confirmed: all six `content/dispatch/dispatch-0{1-6}.mdx:9-10` still read `4 min read` against
  `content.config.ts:80-81`'s format contract. Needs AK's ruling between deriving it at build time
  (recommended) and a drift-check gate.
- **F73 — open, newly registered, process.** `b33-f61.md:206-208`: Astro 7 backgrounds `astro preview`
  under agent detection, going stale across rebuilds; fix is `ASTRO_PREVIEW_BACKGROUND=1`. `AGENTS.md`
  carries no mention of it — not yet landed into §Commands.
- **F49 — clarified, still open.** `b33-f61.md:167-180`: the archive lane's third Chromatic change is
  `/wire`'s `dayLabel` (`WirePage.tsx:80`), driven by the e2e fixture stamping relative to `Date.now()`
  (`e2e/helpers/wire-fixture.ts:41`), not a regression. Repair direction (pin the stub's clock) is
  proposed, not implemented.
- **F34, B12, B13 residual, semantic-judge, Build 22/B1, F44/F45, F53, BR1, Phase B, F42, F37/
  CartographyCanvas→T8, B18 (BUILT, awaiting AK), F46/OQ-7, F60, F29, F28, B3(→E), B17, B6–B11** — stand
  as `2026-09-24-checkpoint.md` and `2026-09-21-checkpoint.md` left them; re-verified first-hand:
  `vitest` still `^3.2.7` (`code/apps/microsite-astro/package.json:86`), Storybook still `^9.1.20`
  (`code/apps/storybook/package.json:23,33`); `global.css:7` still imports `maplibre-gl.css`;
  `CartographyCanvas` still unmounted (`EditorialDistrictMapHero.tsx:59`, `ToolingBlock.astro:7`);
  `git branch -r` = `origin/main` only. B6–B11 not audited (ADR-0002 §Decision 4 amendment).

## Record drift

1. **`2026-09-24-checkpoint.md:50-55` misclassified F67 as open** (see Register). The commit it cites as
   silent on F67, `4512fae`, is the commit that fixed it.
2. **`2026-09-24-checkpoint.md:44-46` cites the wrong commit for F61's media half** (see Register).
3. **`lifecycle/index.md`'s "Latest" pointer, flagged stale by `2026-09-24-checkpoint.md:73-78`, is now
   current.** `lifecycle/index.md:6,18` names Build 33/F61, `last_amended: 2026-09-23` — fixed between
   the newest report and now, by `b33-f61.md`'s own merge. No longer drift.
   `AGENTS.md:44-45` (`dev:next`/`build:next`, scripts that no longer exist) remains stale, unchanged
   from the newest report.
4. **The close-ritual gap persists.** PR #61 (B27, `ef03bd7`) and PRs #64–66 (B30–B32) still carry no
   `lifecycle/checkpoints/*.md` file (`git show <sha> --stat` touches no `lifecycle/` path for any of
   them). `b33-f61.md:219-221` itself records the backfill for "Builds 27, 30, 31 and 32" as still owed
   to a future checkpoint, not done by this one (writing it is a build-session act, outside this
   session's one-file charter).

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31` — a quoted
  Sentry SDK comment, not a live TODO. Unchanged from the last two reports.
- **Remote branches:** `git branch -r` returns `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none found (`AKIA…`, `sk-…`, `ghp_…`, `xox[baprs]-…`, PEM headers) across
  `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 4 high · 5 moderate · 4 low**, 642 production
dependencies — all new since the last report's 0/0/0/0 (F34, unchanged through 2026-09-24).

- **`undici@8.10.0`** (11 advisories: 3 high, 5 moderate, 3 low — WebSocket-subprotocol DoS, TLS
  cert-validation bypass via `BalancedPool`, cross-origin cache poisoning, plus DoS/disclosure/
  truncation variants). Patched `>=8.10.2`. Transitive: `astro@7.3.3` → `unifont@0.7.5` → `undici`
  (`pnpm why undici -r`).
- **`dompurify@3.4.14`** (1 low — detached-subtree DOM XSS via `IN_PLACE`). Patched `>=3.4.16`.
  Transitive: `posthog-js@1.418.5` → `dompurify` (`pnpm why dompurify -r`).
- **`http-cache-semantics@4.2.0`** (1 high — cross-user cached-response disclosure via `max-stale`).
  No patched version yet (advisory reports `<0.0.0`). Transitive: `astro@7.3.3` → `http-cache-semantics`
  (`pnpm why http-cache-semantics -r`).

All three are transitive of `astro` or `posthog-js`, not direct `package.json` entries — a fix is a
`pnpm.overrides` bump (or waiting on `astro`/`posthog-js` to bump `unifont`/`undici`/`dompurify`
upstream) for the first two; the third has no fix to pin yet.

## New flags for the Golden Board

- **New — 13 production advisories, two with available patches, one without.** AK's or a build's to
  weigh: add `pnpm.overrides` for `undici@>=8.10.2` and `dompurify@>=3.4.16` now; `http-cache-semantics`
  stays watched until a patched release exists (tracked by its GHSA, `GHSA-ch52-4w7c-c8xp`).
