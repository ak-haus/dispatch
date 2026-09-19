---
title: checkpoint — 2026-09-19 (human-run) — the stranded sweeps land, B13 verified, advisories and share metadata filed
status: active
session_type: checkpoint
column: burn the ledger, protect the next build
---

# Checkpoint — 2026-09-19 (human-run)

> Opened by AK after a status query found `main` idle since 2026-08-31 and eight routine sweeps
> stranded off it. Opener: the Golden Board's "Human-run checkpoint". Scope: the Dispatch items named
> at that query. Crossfire is not hydrated on this machine, so its routine-reported findings are filed,
> not fixed. Checkpoints burn flags; they do not grow into builds (ADR-0002 Decision 4).

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| `origin/main` | `bfb6467` (B16 ChapterRail merge, 2026-08-31), no commits since |
| Production | `https://dispatchmag.dev/` 200; `uptime (prod smoke)` succeeded on every scheduled run 2026-08-20 → 2026-09-19 (about four a day, zero failures) |
| CI | every workflow green on the last `main` push and on each sweep-branch push through 2026-09-17 |
| Board | Golden Board artifact (last republished 2026-08-31) read in full |
| Routine | `trig_01AHZYKEE9YFAeejgGD6Ts1X`, Mon + Thu 13:00 UTC, last run 2026-09-17 succeeded, next 2026-09-21 |
| Working tree | clean, Windows checkout, hydrated |

## 1. The stranded sweeps — landed

Eight sweeps (2026-08-24 → 2026-09-17, nine commits) never reached `main`. The cause is in the
routine's own prompt: commit the report "to dispatch main … and push. If pushing to main is rejected,
push branch checkpoint/YYYY-MM-DD instead." Ruleset `21012416` requires fifteen status checks on every
push to `main`, so the direct push is always rejected and every run falls back to a branch. Three runs
also opened draft PRs (#37, #40, #44); five did not. Each later run diffs against
`2026-08-20-checkpoint.md`, the only report on `main`, so the same flags re-file every run.

Landed here by `git cherry-pick -x`: original author, date and SHA preserved in each commit, and each
file byte-identical to its branch (`git diff --quiet` per file). The draft PRs closed in favour of #51. What stays open is structural and AK's (F35 below).

## 2. Records amended (record-shaped, ≤15 min — this session's job)

- `lifecycle/index.md` — the "Latest" pointer advanced (six sweeps flagged it); the three B16 closes
  and the eight sweeps are now listed; `last_amended` 2026-09-19.
- The retired 12px floor (R1a, ADR-0004; `DESIGN.md:299`) is removed from three records that still
  asserted it: `.claude/CLAUDE.md:51` · `docs/runbooks/design-intent-to-code.md:18` ·
  `scripts/analytics-loop.mjs:107` (the `bearsOn` label the weekly issue prints; issue #50 cites it).
  No test asserts the label.
- **Not amended here:** `code/apps/microsite-astro/scripts/semantic-judge.mjs:78` still tells the
  dormant judge to score "the 12px minimum type floor". Any change under `code/` redeploys production
  (the Ignored Build Step), and a deploy is ask-first, so the line rides Build 22, which deploys
  anyway. The judge is dormant (C3), so the line has no live effect today.

## 3. B13 re-verified — the repair already happened

Measured first-hand with Lighthouse 12.6.1 (the version CI resolves), mobile form factor and simulated
throttling (the defaults `lhci autorun` uses), against `astro preview` of a fresh `pnpm build:astro`
of `bfb6467`. Three runs per surface:

| Surface | LCP (ms) | CLS | TBT (ms) | Bytes | Ratchet ceiling |
|---|---|---|---|---|---|
| `/dispatch/dispatch-01/` | 6313 · 6312 · 6317 | 0.0285 ×3 | 0 | 886 KB | LCP 8000 · CLS 0.42 · 1 MB |
| `/` | 13591 · 13593 · 13594 | 0 ×3 | 5–23 | 2,345 KB | LCP 17000 · CLS 0.05 · 3 MB |
| `/wire/` | 3158 · 3009 · 2858 | 0.0006 ×3 | 0 | 367 KB | LCP 4500 · CLS 0.08 · 600 KB |

- **B13's defect is gone.** Its 0.345 (2026-08-18) now measures 0.0285, identical to ADR-0004's
  2026-08-21 reading. Row status: **repair verified**. The remaining act, tightening the article CLS
  ceiling in `lighthouserc.cjs` from 0.42, is code-shaped and deploy-triggering, so it rides Build 22.
- **B12 needs re-grounding.** Home LCP is 13.6 s (13.2 s at 2026-08-18). Its LCP element is
  `<p class="dispatch-emboss font-mono text-[13px] …">`, a text line, not the map-hero image the row
  blames. The diagnosis must be redone before anyone repairs it.
- **Conditions.** Windows host; the PP faces are present locally (CI builds without them).
  `lhci autorun` crashes on this host after each audit (chrome-launcher's temp-profile cleanup hits
  EPERM), so the Lighthouse CLI ran directly. It saves its report before that cleanup
  (`lighthouse/cli/run.js`: `saveResults` precedes `kill()`).

## 4. Filed to the board

- **F34 — 18 production-dependency advisories, 4 critical; nothing surfaced them.** `pnpm audit --prod`
  (from `code/`, 2026-09-19): 4 critical · 8 high · 5 moderate · 1 low, all published 2026-07-20 →
  2026-09-17; the board recorded 4 accepted. GitHub shows 0 open Dependabot alerts although alerts are
  enabled (`vulnerability-alerts` answers 204). No scheduled job audits dependencies; E1 and E4 are
  unbuilt. Fix paths, from each advisory's patched range against the installed ranges:
  - About 10 clear with an in-range lockfile refresh: next ×2 critical, fast-uri ×4, svgo ×2,
    devalue, js-yaml (the js-yaml range is unverified).
  - 7 need Astro 7: astro ×5, including the critical AVIF-optimization RCE (fixed ≥7.2.8), and
    sharp ×2 (6.4.8 pins `^0.34`; 7.3.3 needs `^0.35.4`).
  - 1 needs maplibre-gl 5 → 6.

  Exposure today (assessed, not a security review): the Next.js pair lives in `apps/microsite-next`,
  which `vercel.json` does not build. maplibre's JS loads only inside CartographyCanvas, which no page
  mounts. Phase: the fix is **B1** (Build 22); the instrument half, a scheduled audit, is proposed as
  **E4 pulled forward**.
- **F35 — the routine's sweeps cannot land, and its register is frozen at 2026-08-18.** Beyond §1:
  the routine's prompt re-verifies register claims (a)–(c), which all closed by 2026-08-18. It also lists
  five one-clicks the board burned that day. It cannot see the board, so it reports them open every
  run. Changing the routine is persistent configuration, so it is AK's call. Options:
  - **(A)** the routine opens a ready PR, and the next human checkpoint merges it;
  - **(B)** the routine opens the PR and merges it itself, only when the diff is exactly its one
    report file and all fifteen checks pass;
  - **(C)** it stays off `main` but diffs against the newest `checkpoint/*` branch.

  Every option also refreshes the routine's register to the board's open rows. Recommendation: B.
- **F36 — no share metadata on any page; promoted to B18.** The live `/dispatch/dispatch-01` head
  carries charset, viewport and title only. There is no meta description, Open Graph or Twitter card,
  canonical link, RSS feed or JSON-LD; `src/` emits none. D1 names OG cards as a gate row, and no row
  built them.
- **F37 — maplibre's stylesheet ships to every page for a component no page mounts.** `global.css:7`
  imports `maplibre-gl/dist/maplibre-gl.css`; `CartographyCanvas`, its only JS consumer, is mounted
  nowhere. The CartographyCanvas disposition (B16's remainder) decides it: dropping the component also
  drops maplibre, its stylesheet and one critical advisory.
- **F38 — the archive lane has held "3 changes" on every records-only commit since 2026-09-03.**
  Commit statuses: `UI Tests: dispatch_playwright` reads "3 changes must be accepted as baselines" on
  `caa9cd6`, `8209f39`, `17ec4c8`, `4f2c617`, `ef4dc31` (the five September sweeps) and on this PR,
  while `main`'s last build (`bfb6467`, 2026-08-31) accepted 1. Under F19's lineage rule, a count that
  holds across commits is one pending baseline, not noise. So every PR, Build 22's included, inherits
  these three until AK dispositions them once. The three snapshots can't be named from here (the
  Chromatic UI needs AK's login).
  **Hypothesis, unverified:** every wall-clock date on the archived surfaces is wrapped in `data-live`
  and ignored (`CoverSpread.tsx:96`, `Marginalia.tsx:114`, `Colophon.tsx:48`, `ArticleSpread.tsx:78`,
  `CrossfireSpread.tsx:332`, the wire timestamps). But the text's width grows at the month rollover
  ("August" → "September"), which shifts neighbouring ink the diff does not ignore. That would also
  explain why the count began after 2026-08-31. If confirmed, the repair is a fixed-width date region,
  not a wider ignore.
- **B6 amended (Crossfire; routine-reported, not re-verified, since Crossfire is not hydrated here):**
  `src/index.md` omits `alerts/` and `feed/` (sweeps 08-24 → 09-14);
  `services/transcribe/requirements.txt:5` tags the diarization TODO D4+ where `app.py:44` says D2+
  (sweep 09-07).
- **The board's own drift, corrected at republish:**
  - the Phase A A6 row still read "wire next" (closed 2026-08-20);
  - the one-clicks intro still named two Sentry env vars and four adjudications as open (all burned
    or ruled);
  - the OQ-5–8 rows still carried AK chips (ruled 2026-08-21, #33);
  - the "Next ▸" opener still pointed at sitting 3 (done 2026-08-22).

## 5. AK's rulings — the same day

AK ruled on every open item after reading the close. This section records the rulings and what the
session did with each.

- **F38 — the archive lane.** AK reviewed the three standing changes in Chromatic and found them clean.
  PR #51 merged as `a22c5ff` with all contexts green. Draft PRs #37, #40 and #44 were closed as
  superseded.
- **F35 — the landing path.** AK's ruling: "whichever is the most technically acceptable and
  recommended standard in engineering and web development." The documented standard for bot PRs
  against a protected branch is the platform's native auto-merge, gated by the required checks with no
  bypass actor. Sources: GitHub Docs "Automatically merging a pull request"; Dependabot's
  `gh pr merge --auto --merge` pattern in GitHub Docs "Automating Dependabot with GitHub Actions";
  Renovate's `platformAutomerge` default. Renovate also recommends "Automatically delete head
  branches". Executed:
  - the repository settings `allow_auto_merge` and `delete_branch_on_merge` are on;
  - `.github/workflows/checkpoint-automerge.yml` enables auto-merge only for a same-repo
    `checkpoint/YYYY-MM-DD` PR whose whole diff is one new report, and switches it off if the shape
    breaks;
  - the routine now opens a ready PR, never pushes to `main`, never polls a PR, reads its register
    from the newest report instead of a frozen list, and audits Dispatch only (next item).
- **Crossfire — its own app.** AK's ruling: the Crossfire section inside Dispatch is a native
  integration of Crossfire the app inside Dispatch, not the whole of it, and Crossfire waits for its
  own firmness-and-stability run. Recorded as an amendment to ADR-0002 (supersedes its "Repos governed"
  line). Crossfire's open rows are parked, and D1 depends only on Dispatch's rows, including the
  Dispatch side of the integration.
- **CartographyCanvas — promoted, but not in Phase B.** AK's ruling: promote it, and move it to the
  design and architecture slices, because the development container that would let coding agents build
  the map AK needs is not established yet. B16 closes as the fork retirement it was sized as (3/3). The
  promotion becomes **T8** on the design/architecture tracks, blocked on that container. F37 (the
  sitewide maplibre stylesheet) rides with T8. maplibre-gl stays a dependency, so Build 22 patches it
  5 → 6 to clear its critical advisory.
- **Build 22 — B1, upgrade Astro.** AK picked it: "Upgrade Astro and do the best recommended action."
- **Branch hygiene (BR1) — done with AK's permission.** Nineteen remote branches deleted after
  verification: the eighteen below, plus this session's merged `claude/checkpoint-2026-09-19`. The
  remote now holds `main` only. Each is recoverable from the tip and PR ref below.

  | Branch | Tip | Landed by |
  |---|---|---|
  | `checkpoint/2026-08-20` | `fa9186a` | #24 (merge) |
  | `chromatic-storybook-project` | `4a96b55` | #10 (merge) |
  | `judge-is-ak` | `eea1262` | #11 (merge) |
  | `s1-visual-gates` | `0f0ccdc` | #9 (merge) |
  | `claude/b16-sitenav` | `3ac78da` | #47 (merge) |
  | `claude/b16-chapterrail` | `c2f0c03` | #48 (merge) |
  | `claude/phase-b-hardening-flags-7zli52` | `9119c86` | #34 (squash; tree identical) |
  | `claude/a14-tailwind-storybook-39aomk` | `42e1d1c` | #35 (squash) |
  | `claude/a14-checkpoint-records` | `b967d5f` | #36 (squash) |
  | `claude/b4-post-deploy-oracle-8ykx70` | `4d01747` | #39 / #41 (squash) |
  | `checkpoint/2026-08-24` | `0f3b450` | #51 (cherry-pick; draft #37) |
  | `checkpoint/2026-08-27` | `5af1ffd` | #51 (draft #40) |
  | `checkpoint/2026-08-31` | `c9c24f7` | #51 (draft #44) |
  | `checkpoint/2026-09-03` | `caa9cd6` | #51 |
  | `checkpoint/2026-09-07` | `8209f39` | #51 |
  | `checkpoint/2026-09-10` | `17ec4c8` | #51 |
  | `checkpoint/2026-09-14` | `4f2c617` | #51 |
  | `checkpoint/2026-09-17` | `ef4dc31` | #51 |

## Next opener

**Build 22 — B1 as a security build** (picked by AK, 2026-09-19). Order:

1. the in-range lockfile refresh;
2. Astro 7 with `@astrojs/react` 6 and `@astrojs/mdx` 8 (8.x requires astro `^7.2.6`);
3. maplibre-gl 5 → 6 (CartographyCanvas is promoted, so the dependency stays and gets patched).

Riding along: B13's ratchet tighten, and the semantic-judge 12px line.

Astro's v7 upgrade guide names three changes that can reach this site:
- **The Rust compiler.** Unclosed tags now error, and invalid nesting is no longer auto-corrected.
- **`compressHTML: 'jsx'` whitespace.** It can touch the inline `DIS`/`patch` wordmark spans.
- **The Sätteri Markdown default.** It covers MDX rendering, the heading slugs ChapterRail consumes,
  and `markdown.shikiConfig` at `astro.config.mjs:116`.

The pixel floor and both Chromatic lanes are the net. Expect an AK disposition.
