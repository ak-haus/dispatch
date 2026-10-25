---
title: checkpoint — 2026-10-08 (routine) — advisories regress 0→17 (6 high); F67 was already closed; B33's F71–F73 post-date the last report
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-08 (routine)

Walked the newest routine report, `2026-09-24-checkpoint.md` (landed `f179d7c`, 2026-09-25T09:10:33).
No other record in `lifecycle/checkpoints/` is dated 2026-09-24 or later, so it alone forms the
register. One build-session close record, `2026-09-23-b33-f61.md`, landed on `main` (`b0fba2a`,
2026-09-25T09:15:08) five minutes *after* the checkpoint PR itself merged — a merge-queue race, not
a process gap — so its content post-dates the register despite its earlier filename date; it is
folded into Register/New flags below rather than re-walked as its own record. Nothing has landed on
`main` since (`b0fba2a` is still `origin/main`'s tip, two weeks idle).

**Verdict.** 1 register item closed that the prior report carried as open (F67 — already fixed in
the commit that filed it); 7 other baseline items unchanged; B33's close record adds F61's full
closure (already recorded) and three new open items (F71, F72, F73) the register never saw; 1 drift
finding closed (the index "Latest" pointer), 1 stands and gains a third instance (the Build 29 table),
1 stands unchanged (AGENTS.md); 0 hygiene findings; **advisories regress from 0/0/0/0 to 0 critical ·
6 high · 6 moderate · 5 low**, entirely new since the last report and unrelated to any code change.

## Register

**Baseline items, from `2026-09-24-checkpoint.md`:**

| Item | Delta |
|---|---|
| F42 (vitest/Storybook majors) | unchanged — `vitest` still `^3.2.7` (`code/apps/microsite-astro/package.json:86`, `code/apps/storybook/package.json:38`); `storybook` still `^9.1.20` (`code/apps/storybook/package.json:33`), not 10 |
| F46 (home card banners full-size) | unchanged — still rides T5/OQ-7 (`2026-09-20-b29-phase-b-close.md:87`) |
| F60 (R1a citation) | unchanged — `DESIGN.md:304-315` (identical since `f72b42b`, 2026-08-22, predating F60's filing) still keeps WCAG SC 1.4.4 inside R1a's grounding ("as the mechanical check"); the emitter (`code/packages/tokens/scripts/emit/layout-design-md.mjs:322-329`) matches verbatim — no source/generated drift, but the re-grounding `2026-09-20-b29-phase-b-close.md:118-126` calls for has not happened |
| **F67 (`/about` scrollable-region-focusable)** | **CLOSED, mistracked as open.** The prior report called it "unaddressed"; it was fixed in the *same* commit that filed it. `4512fae` ("Build 29", commit message names `F67` directly) added `tabIndex={0}`, `role="region"`, `aria-label="Crossfire dossier deck source listing"` to the `<pre>` at `code/apps/microsite-astro/src/components/home/SpheresSpread.tsx:339-345`, with a comment citing F67 by name. Confirmed via `git log -p -- .../SpheresSpread.tsx`. No dedicated e2e pin exists for it, but `/about` is in the axe route set since F54 |
| F29 (22 unregistered-slot utilities) | unchanged — AK's governance call, nothing landed |
| F28 (Build 59 baseline banner) | unchanged — AK one-click, Chromatic UI only |
| B3 → E (records reconciliation) | unchanged — rehomed to the standing lint cadence; this routine fulfils it |
| B17 (masthead single-owner repair) | unchanged — conditional, filed, trigger not fired |
| B6–B11 (Crossfire) | not audited (ADR-0002 §Decision 4 amendment, 2026-09-19) |
| F36 → B18 (share metadata) | unchanged — built, still awaiting AK's real-platform sign-off |

**From B33's close record (`2026-09-23-b33-f61.md`), landed after the register was compiled:**

| Item | Status |
|---|---|
| F61 (five invented-data surfaces) | Already recorded CLOSED in the 09-24 register; B33 confirms full settlement (derivation rules for newest/number/date/cover/dateline/quote/note/typeface, `2026-09-23-b33-f61.md:57-71`). No register delta |
| F71 — new, open | WCAG 2.2 SC 2.4.11 (Focus Not Obscured, AA): the six Crossfire depiction buttons in home spreads are real tab stops with no visible focus state (`2026-09-23-b33-f61.md:184-195`). Targets "Build 34, before D1" |
| F72 — new, open | `readingTime` is authored `4 min read` on all six dispatches against a measured 333–479 words (~2 min); AK's ruling needed among three options (`2026-09-23-b33-f61.md:196-205`) |
| F73 — new, open | Astro 7 backgrounds `astro preview` under agent detection, serving a stale `dist/`; asks "a checkpoint adds it to AGENTS.md §Commands." Not added — `AGENTS.md:44-61`'s Commands section carries no `ASTRO_PREVIEW_BACKGROUND` mention. Outside this routine's report-only charter; carried forward |

## Record drift

1. **CLOSED since the last report: `lifecycle/index.md`'s "Latest" pointer.** It now reads
   `last_amended: 2026-09-23` and names the B33 record (`lifecycle/index.md:7`). It landed via PR #69
   (`b0fba2a`, 2026-09-25T09:15:08), five minutes after the checkpoint PR merged — the fix was already
   in flight when the prior report ran, not produced by this routine.
2. **Stands, and gains a third instance: the Build 29 record undersells its own commit.**
   `2026-09-20-b29-phase-b-close.md`'s "What landed in this build" table (lines 189-194) lists only
   F50, F64, F51, F53(copper). The prior report caught F44/F45 missing from it; F67 (above) is a third
   fix `4512fae` made with no row in that table.
3. **Stands, unchanged: `AGENTS.md:44-45`.** `Next dashboard: cd code && pnpm dev:next` and
   `build:next` still name scripts absent from `code/package.json` (`dev:astro`, `dev:storybook`,
   `build`, `build:astro`, `build:tokens`, `build:storybook` — no `*:next` entry).

No other drift found. `representation/visual-system/components/index.md` was checked against B33's
touched files (`ArticlesBrowser`, `EditorialDistrictMapHero`, `SitemapAtlas`, `StoryCardCluster`,
`ArticleSpread`, `Colophon`, `CoverSpread`, `CrossfireSpread`, `DLDSSpread`, `Marginalia`,
`shared/initials`) — none are new lifecycle-fixture components, so the index's child list is
unaffected.

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31` — the same
  quoted Sentry SDK comment as the last report, not a live TODO. No new hits.
- **Remote branches:** `git branch -r` returns `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, PEM headers, `ghp_…`,
  `xox[baprs]-…`), scanned across `code`, `lifecycle`, `docs`, `.github`.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 6 high · 6 moderate · 5 low**, 642 production
dependencies — up from 0/0/0/0 at the 2026-09-24 report. Every advisory is new since that report
(earliest `created: 2026-09-28`); nothing in the dependency tree changed on `main` (last commit
2026-09-25) — the advisory feed moved, not the code.

| Package | Path | Sev. | Count | Patched |
|---|---|---|---|---|
| `undici` | `apps/microsite-astro > astro > unifont > undici` | 3 high, 4 moderate, 2 low | 9 | `>=8.10.2` |
| `http-cache-semantics` | `apps/microsite-astro > astro > http-cache-semantics` | high | 1 | **none published** (`patched_versions: "<0.0.0"`) |
| `source-map-js` | `apps/microsite-astro > @astrojs/react > vite > postcss > source-map-js` | high | 1 | `>=1.2.2` |
| `sharp` | `apps/microsite-astro > sharp` | high | 1 | `>=0.35.5` (CVE-2026-96889, librsvg) |
| `smol-toml` | `apps/microsite-astro > @astrojs/markdown-satteri > @astrojs/internal-helpers > smol-toml` | moderate | 1 | `>=1.9.0` |
| `dompurify` | `apps/microsite-astro > posthog-js > dompurify` | low×2 | 2 | `>=3.4.16` |

(undici breakdown: high — unrequested-subprotocol DoS, BalancedPool TLS-cert bypass, cross-origin
cache poisoning; moderate — permessage-deflate DoS, RetryHandler DoS, Set-Cookie cross-user
disclosure, WebSocketStream DoS; low×2 — response splitting, dump-interceptor truncation.)

## New flags for the Golden Board

- **New — advisories regressed 0→17 since the last report, 6 high, all transitive.** Report only, per
  charter; the fixes above are version bumps a build session owns, not this routine. One advisory
  (`http-cache-semantics`, high, cross-user cache disclosure) has no patched version yet — track it,
  do not expect a bump to close it today.
- **F67 was closed, not open — carry the correction, not the old row.** The Golden Board should drop
  F67 from open rows; it closed at Build 29 (`4512fae`) and was only ever mistracked, per Record
  drift #2.
- **F71, F72, F73 need board rows.** Filed by B33 (`2026-09-23-b33-f61.md`) after the last report
  compiled; none has a Golden Board entry yet. F73 also asks for an `AGENTS.md` §Commands edit this
  routine does not make.
- **The close-ritual-lapsing flag (09-24) did not recur.** The one build session since (B33) shipped
  its own close record on time; no new instance to report.
