---
title: checkpoint — 2026-10-15 (routine) — F67 wrongly carried as open, F71–F73 unregistered, advisories regressed 0→17
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-10-15 (routine)

Walked, oldest first, by each record's own arrival on `main`: `2026-09-24-checkpoint.md` (`f179d7c`,
the newest prior routine report, arrived 2026-09-25T09:10:33) — then `2026-09-23-b33-f61.md`
(tip `dace8e6`, merged as `b0fba2a`, arrived 2026-09-25T09:15:08, five minutes *after* the checkpoint
despite its older filename date; its own `git log --diff-filter=A` line is the newest for that path).
No other `lifecycle/checkpoints/*.md` file is dated or arrived later. `b0fba2a` is `origin/main`'s
current tip; nothing has landed since. Since the newest routine report: Build 33 (F61) settled, F71,
F72 and F73 filed with no checkpoint since to carry them onto the register.

**Verdict.** 1 register item corrected (F67, wrongly carried forward as open — it closed at Build 29);
1 register item re-verified closed by a different route than assumed (F61, fully settled at Build 33,
superseding the "media half" close the last report credited to PR #66 alone); 9 baseline items
confirmed unchanged; 2 record-drift findings; 0 hygiene findings beyond the known Sentry excerpt;
advisories regressed from 0/0/0/0 to **0 critical · 6 high · 6 moderate · 5 low** (new, see Advisories);
4 new flags for the Golden Board (F71, F72, F73, the advisories regression).

## Register

**Baseline items, from `2026-09-24-checkpoint.md`, re-verified first-hand:**

| Item | Delta |
|---|---|
| F67 (`/about` scrollable-region-focusable) | **CORRECTED — CLOSED, not open.** `2026-09-24-checkpoint.md` carried it forward as unaddressed ("no evidence of a fix in main"). `code/apps/microsite-astro/src/components/home/SpheresSpread.tsx:340-346` has `tabIndex={0}`, `role="region"`, `aria-label="Crossfire dossier deck source listing"` on the `<pre>`, with a comment at `:334-339` naming F67 by number. `git log -S"F67"` traces it to `4512fae` (Build 29) — the same commit `2026-09-24-checkpoint.md:67-72` already flagged for omitting F44/F45 from its own landed table. F67 is a third fix that commit made and its own record's table never listed |
| F61 (pull-quote-source + media defects) | **RE-VERIFIED CLOSED, fuller than assumed.** The last report credited closure to PR #66's media half (`e0593f3`). `2026-09-23-b33-f61.md` (Build 33, arrived *after* that report) is a dedicated rebuild: eight derivation rules replace invented data across home, `/article`, `/sitemap`, the feed and the share card (`code/apps/microsite-astro/src/lib/dispatch.ts`, `pull-quote.ts`, `share/share.ts`, `typefaces.ts`, `shared/initials.ts`, all present with matching `.test.ts` files). Nine e2e pins (`e2e/editorial-derivation.spec.ts`) read 9/9 red on `main`, 9/9 green on the branch |
| F36 → B18 (share metadata) | unchanged — still "BUILT, closes on AK's real-platform check" (`2026-09-20-b29-phase-b-close.md:31`); no later record rules it |
| F37 (maplibre stylesheet) / CartographyCanvas → T8 | unchanged — `code/apps/microsite-astro/src/styles/global.css:7` still imports `maplibre-gl/dist/maplibre-gl.css`; `EditorialDistrictMapHero.tsx:59` still marks CartographyCanvas "currently unused"; `ToolingBlock.astro:7` only names it in copy |
| F42 (vitest/Storybook) | unchanged — `code/apps/microsite-astro/package.json:86` still pins `vitest@^3.2.7`; `code/apps/storybook/package.json` still `storybook@^9.1.20`. Per `2026-09-19-b26-instruments-cleanup.md:234-235`, the precise blocker is vitest 4 needing Storybook 9→10 plus the browser-provider split; vitest 5 is unavailable to Storybook at any version |
| F46 (home card banners, full plate size) | unchanged — rides T5/OQ-7, out of scope by the opener (`2026-09-20-b29-phase-b-close.md:87`) |
| F60 (DESIGN.md R1a citation) | unchanged — `DESIGN.md:304-311` still grounds R1a partly in "WCAG SC 1.4.4 Resize Text" for the mechanical check; `2026-09-20-b29-phase-b-close.md:118-126` found 1.4.4 passes via browser zoom regardless of root font size, so the citation is still mis-grounded, not re-grounded |
| F29, F28 (AK one-clicks/governance) | unchanged — both answerable only in tooling needing AK's login; no disposition recorded |
| B3 (records reconciliation → E) | unchanged, confirmed stale — `canon-brief.md:82` and `:231` still read "Astro 6 + Next.js 15 hybrid" / "Vercel (Astro 6 native)"; the repo has been Astro 7.3.3 with Next.js removed since Build 22/23 |
| B17 (masthead single-owner repair) | unchanged — conditional, filed, no trigger fired |
| BR1 (branch hygiene) | holds — `git branch -r` = `origin/main` only; `git branch -r --merged origin/main` matches exactly |
| B6–B11 / Crossfire | not audited (ADR-0002 §Decision 4 amendment, 2026-09-19) |

**Still open, confirmed:** F42, F46, F60, F29, F28, B3 (→E), B17 (conditional), B6–B11 (parked), and now
F71, F72, F73 (below — filed by Build 33, never carried onto a register until this sweep).

## Record drift

1. **`lifecycle/index.md`'s "Latest" pointer is current, but its narrative chain still has a gap.**
   `5acacb9` (inside Build 33's own PR) correctly moved "Latest" to
   `checkpoints/2026-09-23-b33-f61.md` (`lifecycle/index.md:18`), closing the staleness
   `2026-09-24-checkpoint.md` flagged. But the same line's "Prior" still jumps straight from Build 33
   to "2026-09-19 Build 23 · B5" — the narrative omits Builds 24–32 entirely (B18, F40/B12,
   instruments cleanup, the two `b27` sessions, Build 29's phase-b close, and Builds 30–32).
   `2026-09-23-b33-f61.md:219-221` itself names the gap: "the backfill of close records for Builds
   27, 30, 31 and 32 (checkpoint 2026-09-21) remains a checkpoint's" — restated here because the
   2026-09-21 and 2026-09-24 routine reports both passed without doing it, and this one, bound to a
   single new file, cannot either.
2. **`AGENTS.md:44-45` still names a removed Next.js dashboard.** `cd code && pnpm dev:next` /
   `build:next` are quoted; `code/package.json`'s `scripts` block has no `dev:next` or `build:next`
   entry, and `code/apps/` holds only `microsite-astro` and `storybook`. Unchanged since the last
   report; the Build 23 doc sweep that removed `microsite-next` from this file's layout line missed
   these two command lines.

No other drift found. `representation/visual-system/components/index.md` was spot-checked against
Build 33's changed components: all modify components already indexed, or are plain `src/lib` helpers,
not new top-level folders — no index entry is missing.

## Hygiene

- **TODO/FIXME:** one hit, `code/apps/microsite-astro/src/lib/observability/posture.ts:31` — the same
  quoted Sentry SDK comment as the last report. No new hits.
- **Remote branches:** `git branch -r` returns `origin/main` only; nothing merged-and-undeleted.
- **Secrets-shaped strings:** none in tracked source (`AKIA…`, `sk-…`, PEM headers, `ghp_…`,
  `xox[baprs]-…`), scanned across `code`, `lifecycle`, `docs`, `.github`. The one pattern hit is
  `lifecycle/checkpoints/2026-09-07-checkpoint.md:40`'s own prose quoting the `sk-` substring of a
  Render disk id — a record of a past false positive, not a live match.

## Advisories

`pnpm audit --prod --json` from `code/`: **0 critical · 6 high · 6 moderate · 5 low**, 642 production
dependencies (count unchanged). This is a **regression** from 0/0/0/0 at the last two routine reports.
By package (highest severity, patched range):

| Package | Severity | Resolved via | Vulnerable | Patched |
|---|---|---|---|---|
| `undici` | high | `apps/microsite-astro > astro > unifont > undici@8.10.0` | `>=8.0.0 <8.10.2` | `>=8.10.2` |
| `sharp` | high | `apps/microsite-astro > sharp@0.35.4` (direct, `package.json:58` pins `^0.35.4`) | `<0.35.5` | `>=0.35.5` |
| `source-map-js` | high | `astro > @astrojs/react > vite > postcss > source-map-js@1.2.1` | `>=1.0.0 <1.2.2` | `>=1.2.2` |
| `http-cache-semantics` | high | `astro > http-cache-semantics@4.2.0` | `<=4.2.0` | none published (`<0.0.0`) |
| `smol-toml` | moderate | `@astrojs/markdown-satteri > @astrojs/internal-helpers > smol-toml@1.8.0` | `<=1.8.0` | `>=1.9.0` |
| `dompurify` | low | `posthog-js > dompurify@3.4.14` | `>=3.4.13 <=3.4.15` | `>=3.4.16` |

`@astrojs/markdown-satteri` is new in the tree (`code/apps/microsite-astro/package.json:30`, pinned
`0.4.1`, added by Build 33's Satteri processor swap per `2026-09-23-b33-f61.md:73-79`) and is the sole
path to the `smol-toml` advisory. The other five packages (`undici`, `sharp`, `source-map-js`,
`http-cache-semantics`, `dompurify`) are pre-existing transitive or direct deps whose resolved versions
drifted into the vulnerable range; none was touched by a commit this sweep traced. `sharp` is one
patch release behind its own `^0.35.4` range. `http-cache-semantics` has no patched version published
upstream as of this run.

## New flags for the Golden Board

- **F71 — decorative Crossfire-depiction buttons are keyboard-focusable but visually hidden when
  focused (WCAG 2.2 SC 2.4.11, AA).** Filed and measured at Build 33 (`2026-09-23-b33-f61.md:184-195`);
  its own session is named as **Build 34, before D1**. No commit since `b0fba2a` touches it — unfixed.
- **F72 — `readingTime` is authored and measured wrong** (`4 min read` on all six dispatches against
  333–479 measured words, ≈1.4–2.0 min at 238 wpm). `2026-09-23-b33-f61.md:196-205` ranks three options
  and recommends deriving it at build time; explicitly **AK's ruling** to make first. Unruled.
- **F73 — Astro 7's `astro preview` backgrounds itself under agent-env detection and goes stale across
  rebuilds**, a probe hazard for any future agent session. `2026-09-23-b33-f61.md:206-208` says "a
  checkpoint adds it to AGENTS.md §Commands" (the fix is `ASTRO_PREVIEW_BACKGROUND=1`). Not added —
  `grep -rn "ASTRO_PREVIEW_BACKGROUND" AGENTS.md .claude/CLAUDE.md` returns nothing. This routine
  writes only its own report and cannot add it either; it stands open for a build session's commit.
- **Advisories regression, 0/0/0/0 → 0/6/6/5.** F34 closed this register row at Build 23 specifically
  to reach zero; it is not zero now. No single commit in `f179d7c..b0fba2a` is implicated beyond the
  one new `smol-toml` path — the rest reflect ordinary upstream drift in transitive ranges. AK's to
  weigh whether this reopens F34 or is tracked as a new row; either way it is a Phase A/E instrument
  (the dependency-update policy in ADR-0002's Phase E) going unexercised.
