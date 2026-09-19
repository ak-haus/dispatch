---
title: checkpoint — 2026-09-19 (routine) — register holds, no drift, no new flags
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-19 (routine)

Against the newest prior report, `2026-09-19-sweep-landing.md` (`e2303aa`/`e011b8f`/`6e5cc15`, merged
`acb7bbe`): nothing closed since. That report is same-day; no build session has run against `main`
since it landed (`git log --oneline -3` shows `acb7bbe` as tip).

**Verdict.** 0 register deltas, 0 record drift, 0 new hygiene findings, 0 new flags. Every open Dispatch
item re-verified first-hand still stands exactly as filed; F35's landing mechanism (this run's own path)
is confirmed wired correctly.

## Register

- **F34** (18 prod-dependency advisories) — stands. `pnpm audit --prod --json` from `code/`
  (2026-09-19): 4 critical · 8 high · 5 moderate · 1 low, same as filed. Breakdown re-verified against
  the JSON: 10 in-range (`next` ×2 critical, `fast-uri` ×4 high, `svgo` ×2, `devalue`, `js-yaml`), 7
  need Astro 7 (`astro` ×5 incl. the critical `<7.2.8` AVIF RCE, `sharp` ×2), 1 needs `maplibre-gl`
  (`<=6.4.0` critical, patched `>=6.4.1` — installed is still `^5.24.0`, `code/apps/microsite-astro/package.json`).
  No new advisory. Fix rides Build 22 (B1), not yet opened.
- **F35** (landing path) — resolved, re-verified. `.github/workflows/checkpoint-automerge.yml` exists,
  gates on `checkpoint/YYYY-MM-DD` + single-file diff, enables `gh pr merge --auto --merge`, disables on
  shape break. This routine now targets that path per its own prompt.
- **F36** (no share metadata, → B18) — stands. `StackLayout.astro:9,33` takes a `description` prop but
  renders it only as visible body text (`StackLayout.astro:198`, inside a `<p>`), never as
  `<meta name="description">`. No `og:`, `twitter:`, `canonical`, RSS/feed route, or `application/ld+json`
  anywhere under `code/apps/microsite-astro/src` (checked `StackLayout.astro`,
  `DispatchArticleLayout.astro`, and a repo-wide grep). Unchanged, open.
- **F37** (sitewide maplibre stylesheet, rides T8) — stands. `global.css:7` still imports
  `maplibre-gl/dist/maplibre-gl.css`; no `<CartographyCanvas` usage anywhere in `src/pages` or
  `src/components` (only comments referencing it, e.g. `EditorialDistrictMapHero.tsx:45,55`,
  `index.astro:49`). Blocked on the design-container precondition per AK's 2026-09-19 ruling; open.
- **B12** (home LCP re-grounding) — stands, unaddressed since filed; not a code-shaped fix a checkpoint
  can perform. Open.
- **B13's residual** (article CLS ratchet ceiling, `lighthouserc.cjs:52`) — stands at `0.42`, unchanged
  from the filed value. Rides Build 22.
- **Semantic-judge 12px line** (`code/apps/microsite-astro/scripts/semantic-judge.mjs:78`) — stands
  verbatim, still names "the 12px minimum type floor." Rides Build 22 per the prior report's reasoning
  (any `code/` change redeploys prod; a deploy is ask-first).
- **Build 22 (B1, Astro upgrade)** — not started. `astro` is still `^6.4.8`, `@astrojs/react` `^5.0.7`,
  `@astrojs/mdx` `^5.0.6` (`code/apps/microsite-astro/package.json`). Expected: it is a build-session
  item, not a checkpoint action.
- **BR1** (branch hygiene) — holds. `git branch -r` returns only `origin/main`; no stray branches
  reaccumulated.
- **CartographyCanvas → T8** — stands, still unmounted (see F37 above); no change to its component spec.
- **B6 / Crossfire items** — not re-verified per charter (Crossfire's own program, ADR-0002 §Decision 4
  amendment 2026-09-19); not audited here.

## Record drift

None found. `lifecycle/index.md`'s "Latest" pointer correctly names `2026-09-19-sweep-landing.md`
(`last_amended: 2026-09-19`) — already current, no correction needed. `representation/visual-system/components/index.md`'s
child list matches the actual component directories 1:1 (20/20, diffed by `ls`). The three records
amended for the retired 12px floor (`.claude/CLAUDE.md:51`, `docs/runbooks/design-intent-to-code.md:18`,
`scripts/analytics-loop.mjs:107`) — not re-checked line-by-line this run since the prior report dated
the amendment to itself, same day; no intervening commit could have reverted them (`git log` shows only
the ruling merge after). The generated component/fixture `index.md` stubs (e.g.
`representation/visual-system/components/CartographyCanvas/index.md`,
`lifecycle/fixtures/ChapterRail/index.md`) carry `status: active` / `last_amended: 2026-05-18` regardless
of subject state — this is their standing generated-scaffold shape (no README/content beyond the
stub), not a new claim to contradict; not flagged.

## Hygiene

- **TODO/FIXME:** one hit in application code, `code/apps/microsite-astro/src/lib/observability/posture.ts:31`
  — it is a quoted excerpt from the Sentry SDK's own internal comment (`"TODO(v11): Remove
  \`sendDefaultPii\`…"`), explaining why this file's logic is written the way it is. Not a live TODO
  against Dispatch code.
- **Remote branches:** `git branch -r` = `origin/main` only. Nothing to compare against
  `--merged`; no merged-but-undeleted branches.
- **Secrets-shaped strings:** none found (`AKIA…`, `sk-…`, PEM headers, `ghp_…`, `xox[baprs]-…`) across
  `code`, `lifecycle`, `docs`, `.github`. Consistent with the 2026-09-07 sweep's finding of the same
  false-positive-free result.

## Advisories

`pnpm audit --prod --json` (from `code/`): **4 critical · 8 high · 5 moderate · 1 low** (18 total), zero
low/info beyond the one `low`. Identical in count and package set to F34 as filed — no new advisory
since the newest report (`next`, `astro`, `fast-uri`, `maplibre-gl`, `sharp`, `js-yaml`, `svgo`,
`devalue`; no unseen package name in the advisory list). Report only; nothing changed.

## New flags for the Golden Board

None.
