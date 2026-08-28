---
title: records — 2026-08-26 B4 build session close (post-deploy oracle + F24)
status: active
session_type: records
column: B4 — the post-deploy oracle upgrade, carrying F24
---

# Records — 2026-08-26 (Build 17 · B4, carrying F24; closed 2026-08-28)

> Build session. One code PR ([#39](https://github.com/ak-haus/dispatch/pull/39), merged `aa65f4d`
> 2026-08-28 14:49Z), fifteen contexts green, AK's policy-A disposition on the one declared archive batch
> (accepted 14:48Z, ~44 hours after the PR opened — the session held green and re-armed check-ins until the
> click, per the drive-to-green posture). B4's two ruled halves shipped; F24's fold-in shipped with its
> promotion-pass precision honored; one inline fix rode along under the defer test. Phase B now has its
> first executed row.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| `git log -1 origin/main` at start | `d45ed75` — A14 close record |
| Working tree at session start | clean, branch `claude/b4-post-deploy-oracle-8ykx70` = main |
| Board read | full artifact, all 1235 lines, via the saved read |
| Re-verification | all three opener questions, first-hand (below) |

## The opener's three questions, re-verified

1. **"Is AGENTS.md:11 still false?" — NO.** PR #30 (sitting 1, `d45936c`, 2026-08-20) amended it in passing
   with the full Ignored Build Step precision; the commit message says so and the line stands true. **The
   board's B4 row still quoting the old false text is the EIGHTH ledger-drift instance (F25 class)** — the row
   was written when B4 unblocked and never learned that sitting 1, hours later, executed its second half
   early. What remained false-as-mandatory was the *curl*: `AGENTS.md:26–27/31/40`, `code/README.md`, and the
   S4 runbook all still named the header check as the mandatory post-deploy gate. Amended in #39.
2. **"Does the Ignored Build Step still read `git diff HEAD^ HEAD --quiet ./` vs `rootDirectory: code`?"**
   The exact string carries on the 2026-08-20 first-hand measurement (the Vercel build log quoted at
   `2026-08-20-ledger.md:184–192`) — the Vercel API is unreachable from this session's container (no token in
   the environment, and the A14 close measured the egress denial of the API host). **The behavior re-verified
   itself live on this session's own pushes**: `1e76352` (touches `code/`) drew a preview build READY;
   `51ce582` (workflows-only) drew `Canceled by Ignored Build Step` — the guard's two branches, both observed
   2026-08-26.
3. **"Is `@playwright/test` still a caret range?" — YES** (`^1.62.1`, `package.json:72`). Now exact-pinned.

## What shipped (#39)

- **The oracle swap.** `uptime.yml` fires on `deployment_status`, filtered to successful **Production**
  deployments — the E2E smoke (`smoke:prod`, the hydration proof) runs against exactly the deployed commit on
  every production deploy, stays `workflow_dispatch`-able on demand, and the curl survives only as its
  fast-fail first step. The A14 close's reachability constraint is honored in canon: an agent session may be
  unable to reach the live surface at all, so AGENTS.md names *dispatching the workflow* as the sanctioned
  path, never a local curl.
- **F24.** `@playwright/test` pinned `1.62.1`; `mcr.microsoft.com/playwright:v<pin>-noble` is **derived from
  the pin** (`scripts/playwright-container-image.mjs`, hard-fails on a range). `pnpm test:e2e` dispatches:
  native only inside that image, docker-run of the same image anywhere else, no native fallback — no
  `-darwin` file can exist, and a local `--update-snapshots` lands in the container volume, so a local run
  cannot enshrine a baseline at all. CI's e2e jobs + the uptime smoke run inside the derived container, which
  retires the F15 CDN-stall class for them (browsers baked, nothing downloads).
- **Gate integrity, from the pre-push adversarial review** (21-agent panel; every finding verified by a
  refuter before it counted): the derive step uses assignment form — `echo "$( … )"` swallows the
  substitution's failure under `bash -e`, greening the drift gate on the exact drift it guards; the
  ruleset-required e2e context carries `!cancelled()` + an in-job pin assertion, because **GitHub counts a
  skipped required check as passing** — without it, any `playwright-image` failure would auto-pass the whole
  e2e suite into a merge; the uptime job repeats the event filter and reds with the real cause when the
  derive job fails. The same panel caught the first cut of the inline fix masking locked-canon text
  (wordmark + issue label) from AK's review lane — rescoped to the date text only.
- **Rode along (defer test held: blocked this row's gate daily · <15 min · inside the harness B4 owns).**
  The 2026-08-24 checkpoint's flag 4: the Chromatic e2e lane diffed on the calendar date. The hero's
  wall-clock label is now `data-live`, scoped to the date text — and it renders in **five** places, not the
  flag's four (`CrossfireSpread.tsx:331` also receives the prop). Proof on this PR: a code+workflows diff on
  a new day drew **1** archive change (the declared attribute change), where the checkpoint's records-only
  PR had drawn 3.

## Measured on the way

- **The pixel floor did not move under the container.** The 14 committed `-linux` baselines passed unchanged
  in `mcr.microsoft.com/playwright:v1.62.1-noble` — 14/14 on three of four runs, zero regeneration. The one
  miss was `masthead-404-desktop` at **84px / ratio 0.01**, desktop-only, correlated across in-run retries,
  green on the same commit's sibling run — **F20's managed signature exactly**; routed, not chased (fourth
  occurrence; still under the ~5/140 reopen trigger, no mobile spread).
- **One container trap paid for:** in a `container:` job the workspace bind mount is owned by the runner UID
  while steps run as root, and `actions/checkout` writes its `safe.directory` entry under a temporary HOME —
  so any later git invocation (Chromatic reads ancestry) dies on "dubious ownership". One explicit
  `git config --global --add safe.directory "$GITHUB_WORKSPACE"` after checkout. The raw runner never showed
  this because UIDs matched.
- **Left unfixed, on the record:** `docs/adr/0001-crossfire-live-activity.md:152` still describes the curl
  check as the mandatory gate — an ADR is a dated decision record, not current-truth canon, so it was not
  amended; noted here so the next reader knows it is historical.

## The gate's first live firing — its own merge

The merge of PR #39 (`aa65f4d`, 14:49:14Z) touched `code/`, so the Vercel App built production — and the
new `deployment_status` trigger fired `uptime (prod smoke)` against exactly that deployed commit at
**14:50:34Z, 80 seconds after the merge**, with no human in the loop (run `33182184037`, triggered by
`vercel[bot]`, head `aa65f4d`): **success end to end at 14:52:25Z, 3m11s after the merge** — the image
derived from the pin in 6s, the smoke job initialized inside `v1.62.1-noble`, the fail-fast guard
correctly skipped (image non-empty), curl fast-fail passed, and the hydration proof went green in 2s
against the freshly deployed commit. The old ritual — a human remembering to curl — is
retired by demonstration, not just by prose. Continuity datum: the 6h cron ran green three times during
the disposition wait (08-27 08:11Z · 08-27 21:57Z · 08-28 10:14Z), all on the pre-B4 workflow from main.

## Ledger deltas this session files

- **Eighth F25 instance** (board B4 row vs the already-amended AGENTS.md:11) — corrected at this republish.
- **F24 CLOSED-EXECUTED** (rode B4, as promoted). **F15 narrowed**: the stall class is structurally gone from
  the containerized jobs (e2e ×3, uptime); it survives only where browser installs remain (design-judge,
  storybook).
- **PR #37 flag 4 (the date-wolf) closed by this PR** with the five-site correction — noted for whoever
  merges #37, whose row should record it closed rather than pending.

## Next opener

**Build 18 — B15**, component idiom convergence (the F12 code half). Unblocked since A14; queued behind B4 by
the promotion pass; nothing else in the column is both unblocked and un-gated. Its opener carries a hard
precondition: **confirm the ui/-primitives exclusion with AK before executing — if it does not hold, the row
roughly doubles.** SearchPalette should be sequenced so its stylesheet work aligns with B16's cheapest fork.
