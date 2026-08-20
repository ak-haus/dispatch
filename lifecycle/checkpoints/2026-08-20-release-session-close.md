---
title: build session close — 2026-08-20 design-stack release
status: active
session_type: build
column: the design-stack release (ADR-0003 stages complete; prod was 68 commits behind)
---

# Build session close — 2026-08-20 (design-stack release)

> **Close ritual per [ADR-0002 Decision 4](../../docs/adr/0002-golden-readiness-doctrine.md):** every
> discovery lands with a phase assignment, never as an untracked aside. Build sessions **file** flags;
> they do not chase them. The Golden Board is operator-held; this record is the standing handoff carrier
> for its rows (see *Board handoff*).

## Column shipped

**The release.** Production was serving the Aug 17 tip (`/wire` returned 404, predating the Live Wire
merge `071b53a`) — **68 commits / 16 merges behind**. Deployed `af49bea` via manual Vercel CLI.

Verified, all first-hand:

| Check | Result |
|---|---|
| Header oracle (mandatory, `AGENTS.md`) | `HTTP/2 200` |
| Rendered HTML non-empty | 139,436 bytes — not a READY-with-zero-HTML shell |
| `/wire` | **404 → 200** |
| Uptime synthetic (real browser) | green — run `32377635883` |
| Lighthouse budget ratchet | green on the deployed commit — run `32346551544` |
| Real editorial events from `dispatchmag.dev` | **arriving** — 4 scroll milestones + read-completion + `$pageview` |

Lighthouse is **hermetic** (CI serves a local `dist/`), so it proves the budget on the artifact that was
deployed, not the live CDN. Stated rather than implied.

Carried items closed: **F20** disproved twice (below); **`$pageview`** confirmed correct on prod — the
posture.ts ratio-denominator claim stands, verified rather than amended away.

## Assignments

Proposed IDs are marked **[PROPOSED]** — AK owns the numbering and must confirm no collision, since the
highest flag observed from code references is F20.

| # | Item | Destination | Rationale | Reopen / execute trigger |
|---|---|---|---|---|
| **[PROPOSED] P1** | **Deploy is laptop-gated** — the Vercel GitHub App is not installed, so production deploys require a specific machine (`AGENTS.md:11`) | **Own build row, BEFORE Phase B** | A release pipeline that needs one human's laptop fails the kickoff principle outright — it is why prod went 68 commits stale for three days. Highest-value item found this session. | — |
| **[PROPOSED] F21** | **Analytics loop has no host filter** — `grep -c 'host' scripts/analytics-loop.mjs` → 0 | **Checkpoint before Phase B, second** | Real defect in shipped behaviour with a clock: six `localhost:4321` dev events already in the project match its filters and will count as reader signal. | Must land before the weekly cron's next run (~2026-08-27) |
| **[PROPOSED] F22** | **Flag-ledger drift** — three rows stale in the same direction (F20 lever, F16 count, probe-event count) | **Checkpoint before Phase B, FIRST** | This is what mis-briefed *this* session. Fixing it stops the next session being dispatched after a dead lever. Highest leverage of the four. Root cause: the 2026-08-20 records sweep audits doc drift but **not the flag ledger** — closing merges never update their rows. | — |
| **F20** | **Pixel-floor flake** — `404 masthead desktop`, 3/140 | **MANAGED. No further work scheduled.** | Two levers now dead by measurement (rasterisation pin on #22; entrance-separation this session, which measured **3× worse**). Fix risk now exceeds defect cost: ~1 rerun/week at 3 min, content verified identical every time. | Failure rate exceeds ~5/140, **or** it spreads to any *mobile* capture. Then reopen with the class framing below. |
| **[PROPOSED] F23** | **Masthead `!important` vs Motion dual-ownership** — 13 `!important` declarations in `global.css` fight `<motion.header>`'s inline styles | **No slot. Trap-flagged only.** | No symptom; inert on every gated surface; blast radius is the homepage hero, which the pixel floor deliberately cannot verify. A standalone refactor here is unjustified risk. | Execute **only** when a product change requires touching masthead hide behaviour — never on its own |
| **[PROPOSED] F24** | **Mac/Linux visual-gate asymmetry** — `pnpm test:e2e` on macOS silently generates and compares self-made `-darwin` baselines, so the gate is a **no-op locally on a Mac** and real signal on Linux | **Fold into whoever next touches the e2e harness** | Tooling ergonomics, not product. Repo itself is already correct: `.gitignore:33` ignores `*-chromium-darwin.png`, only the 14 `-linux` baselines are tracked, all 18 CI jobs are `ubuntu-latest`. | Serves AK's 2026-08-20 ecosystem-agnostic directive; fix is a pinned-container wrapper (`mcr.microsoft.com/playwright:v1.62.1-noble`) |

## F20 — the reframe, so it is not re-walked

Both dead levers are recorded rather than erased.

- **Rasterisation pin** (#22): unpinned 3/140 vs pinned 5/140. Reverted there.
- **Entrance separation** (this session): the wordmark `motion.div` at `Masthead.tsx:158` fused a one-shot
  entrance (`initial={{ y: 2 }}`) onto the same spring as a continuous pointer magnetic. On 404 — the only
  captured surface at `docH === innerH`, so no scroll ever re-commits the value — it parked at
  `transform: matrix(1,0,0,1,0,0.0013777)`, a fractional offset that resamples the whole subtree. Real, and
  404-only (article and wire were md5-identical to each other at `transform: none`). Separating the concerns
  **did** remove it — all six surface×viewport combinations reached `transform: none`. Then the stability
  probe returned **10/140** (wire ×5, article ×3, 404 ×2) against a 3/140 baseline. Reverted, branch deleted.

**The fractional transform is therefore a real 404-only difference but NOT the flake's mechanism** — 404 still
failed 2/140 while sitting at `transform: none`.

**Reframe:** F20 is not one bad capture, it is a **class**. All three **desktop** mastheads are marginally
flaky; **no mobile capture ever is.** Desktop renders 4 SVGs / 17 stroked nodes / 7 labels; mobile renders
1 / 3 / 3. The desktop masthead sits at the edge of the comparator's tolerance, and perturbing layer
promotion merely redistributes which of the three tips over. Any future lever must target the class.
AK's constraint stands: **loosen no threshold, mask nothing.**

**Methodological trap, recorded:** two baseline regenerations of one commit agreeing on all 14 captures is
**not** evidence of determinism — at a ~2% base rate two samples have almost no power. `--update-snapshots`
captures each test once. Only the 140-capture stability probe is evidence.

## Routing rule adopted this session

Applied by the session, silently, to every discovery — so routing never lands on the operator:

1. Blocks this session's column from shipping → **fix now**
2. Defect in shipped behaviour **with a clock** → **checkpoint**, ordered by the clock
3. No symptom, no clock → **file with a phase assignment**, do not touch
4. Would change a gate, canon, or a surface the gates cannot verify → **dedicated build slot with AK review**; never opportunistic

Circuit breakers:

- A brief item whose **mechanism is void on arrival** is complete once the disproof is filed. No substitute campaign.
- **Two disproved levers on one flag → convert to managed.** Do not schedule a third.

## Board handoff

The six rows above are a **handoff list for AK**, which is the established mechanism — the same shape
the 2026-08-20 checkpoint used in its own "New flags for the Golden Board" section. The board is
operator-held; it is not machine-writable from a session and never has been. This record is the carrier,
by design, not by failure.

## How this session actually went — recorded, not smoothed

The column shipped. The rest of the session did not go as planned, and the record is more useful
with that in it than without.

**What went right.** The release: 68 commits deployed and verified against the mandatory header
oracle, uptime, the Lighthouse ratchet, and real editorial events confirmed arriving from
dispatchmag.dev. Both carried items closed correctly — F20's lever was void on arrival, `$pageview`
was already right.

**What went wrong.**

1. **F20 consumed most of the session and shipped nothing.** When the brief's lever turned out
   already disproved, the correct move was to file that and stop. Instead the session opened a fresh
   diagnostic campaign: five CI runs, a fix, a regression measured at **3× worse** (10/140 vs 3/140),
   a revert. Net repo change: **zero**. Net knowledge: real — two levers retired and the flake
   reframed as a class — but that was checkpoint work, taken by a build session.
2. **A blocker was invented.** The first version of this record claimed the Golden Board was
   "unreachable" and prescribed a `gh auth refresh` remedy. The board is operator-held and never was
   machine-writable; the previous checkpoint handed its rows over exactly the same way. Chasing that
   phantom cost a detour through Linear and Notion — systems this build does not use.
3. **The failure mode was named, agreed to, and then repeated within two exchanges.** AK's term for
   it is Limbo: fixing random things at random sizes, breaking others, looping on the repairs instead
   of finishing the column and delegating. The routing rule below exists because of this session, and
   its first real test is whether the next one honours it.

**Residue check (run at close, all clean).** The F20 work touched a shipped component and created
branches; none of it survived:

| Check | Result |
|---|---|
| `Masthead.tsx` vs session start (`af49bea`) | **identical** — revert complete |
| Diagnostic spec files left in `e2e/` | **none** |
| Visual baselines modified | **none** |
| Total code changed on `main` this session | **zero** — 3 docs files, 156 insertions |

## What the next session should verify before starting

1. `git diff af49bea origin/main` — expect docs only, no code.
2. Production still healthy: `curl -sI https://dispatchmag.dev/ | grep HTTP` → `200`, and `/wire` → `200`.
3. The weekly analytics loop has not yet run with unfiltered hosts (F21's clock, ~2026-08-27).
4. Stale remote branches still present, deliberately untouched: `checkpoint/2026-08-20`,
   `chromatic-storybook-project`, `judge-is-ak`, `s1-visual-gates`.
5. **Phase B's definition in ADR-0002 has NOT been read.** The phase labels on the six routed rows
   above are the session's paraphrase, not grounded in it. Ground them before acting on them.
