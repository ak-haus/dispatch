# ADR-0002 — Golden-readiness doctrine: the release program + vertical design stack for Dispatch & Crossfire

- **Status:** **Accepted** (AK, 2026-08-18) — ratified in-session with three clarifications: the Chromatic-class tooling ban is reversed immediately; PR #6 lands first (done, `4e9e57e`); visual-testing tooling is adopted professionally, not grudgingly.
- **Date:** 2026-08-18
- **Deciders:** AK (final authority)
- **Repos governed:** `ak-haus/dispatch` + Crossfire (release doctrine is shared; work items are per-repo)
- **Verification behind this record:** two first-hand repo audits + a cited practice-research sweep, then a three-lens adversarial panel (doctrine / feasibility / completeness) — all three returned holds-with-amendments; the amendments are folded in below. Working board: the "Golden Board" artifact (session-to-session contract).

> **Publication note (2026-08-18, B14 public cut).** Republished in redacted form: Crossfire's audit register and
> instrument details are private until its own public-cut decision (B10) and are summarized here. The unredacted
> original is preserved in the private ops archive. The doctrine, decisions, and Dispatch-side program are unchanged.

---

## Context

AK asked which of five practices — Hardening Sprint, Stabilization/code-freeze, Bug Bash, RC Validation, Regression+E2E — should run to make both products golden. The audited answer: the five are not peers, and neither product could currently pass any of them, because standing instruments barely existed at audit time:

- **Dispatch:** CI = file-naming lint (ignoring `code/` wholesale) + typecheck only; no build job; the sole vitest suite was unrunnable (missing devDeps, no test script, not in CI) and protected a package the live app doesn't consume; zero E2E for a JS-first product; the runtime oracle was a curl *header* check that already missed a shipped React #418 hydration bug; axe-core installed but imported nowhere; 4 accepted advisories pending the planned Astro 7 major. *(All Phase-A rows below have since landed — the register on the working board records the closure.)*
- **Crossfire:** audited to the same depth; its instrument register is tracked privately with the product (Crossfire stays private until its own public-cut decision).

## Decision 1 — the program (taxonomy + sequence)

| Practice | Kind | Ruling |
|---|---|---|
| Regression + E2E | standing instrument | **Phase A — first.** The only compounding option |
| Hardening | calendar phase | **Phase B — exactly once** for code, scoped to the re-verified residual register. Recurring hardening = weakened Definition of Done → fix the gates (Scrum.org anti-patterns; SAFe dropped hardening from HIP→IP). **Carve-out:** *records* reconciliation recurs on a standing lint cadence |
| Bug Bash | time-boxed event | **Phase C** — agentic adversarial sweep + AK as the human eye; Dispatch live surface read-only; Crossfire on its local stack only (ask-first law); every confirmed find → a pinned regression test |
| RC Validation | gate | **Phase D — "golden" is declared here and nowhere else**, per product, AK sole sign-off (DRAFT→DONE law). Crossfire's RC gate is its engine-resume run, defined in its private register. Dispatch adds AK-owned editorial rows incl. the ticker-while-paused presentation |
| Stabilization / code freeze | calendar phase | **Rejected as a phase.** CD eliminates code freezes (continuousdelivery.com verbatim; DORA trunk-based capability); for Crossfire a freeze is vacuous, for Dispatch it is the anti-pattern. *Conditional:* a short freeze **window** around a discrete dated launch event remains legitimate change management |

**Phase E — what keeps golden golden:** scheduled CI runs between pushes; mechanical re-run triggers for environment-sensitive suites ("prose asks; gates enforce"); recurring database-posture re-verification; a dependency-update policy; pinned images.

**Stage-Gate ⇄ CD reconciliation** (both are cited in the kickoff principle): Cooper's gates are project-level go/no-go decision points — preserved as Phase D with AK as authority. CD's elimination targets code-flow freezes — a different altitude. No contradiction.

**Key Dispatch Phase A rows** (full ordered register lives on the Golden Board): CI build job; Playwright E2E on 4 read-only journeys against a local build with the feed stubbed (never prod); axe pass in-suite; Lighthouse budget; unit tests for the live wire logic; ui-suite repair as cheap win; client error tracking + uptime synthetic. Crossfire's Phase A register (sanitizer fixtures, hermetic adapter suites, gate tests, a durability gauntlet, pipeline alerting — with the standing laws that CI never holds platform credentials and **no test may ever publish**) is tracked privately; its rows landed 2026-08-18.

## Decision 2 — tooling supersession (the reversal)

The prior PAI-wide ban on Chromatic-class tools (Playwright, Cypress, Storybook-centric visual testing) is **superseded** (AK, 2026-08-18): it cost multiple iterations and dead ends. Replacing law:

- **Interceptor** — all *interactive* verification on AK's machine (unchanged).
- **Playwright** — the CI E2E harness in repo pipelines.
- **Chromatic / Percy / Applitools-class** — visual regression riding the existing Storybook (`code/apps/storybook`); AI perceptual diffing preferred over pixel diffing.
- **axe-core** — the a11y engine (already a dependency; goes live in Phase A).
- **agent-browser** — remains the scraping rail only; never a verification tool.

The superseded ban lines were amended in place in the governing canon.

## Decision 3 — the vertical design stack (adopted; architecture session gated)

AK's eight-stage vertical AI design pipeline is adopted as the target architecture, with his tool roster: **(1) Ideation** — Figma Make, Uizard, Midjourney, Nano Banana Pro; **(2) Design systems** — Supernova for token management (maps directly onto the tokens-package debt: `0.0.0-w3-s-a-bridge` → real pipeline), Figma native AI, design linting; **(3) Design-to-code** — v0, Claude Code, Cursor, Figma MCP; **(4) Visual testing/QA** — Percy/Applitools/Chromatic + Autonoma-class semantic review (folds into Phase A/B); **(5) Docs & governance** — Storybook as the component-doc surface with LLM-generated stories, Zensical as the docs-as-code hub, dual-layer spec/stack docs; **(6) UX analytics loop** — PostHog and/or LogRocket feeding findings back to the system; **(7) Open Design** (`nexu-io/open-design`) — brand extraction to a versionable `DESIGN.md` wired into the coding agents (Stage 1–3 workspace); **(8) Zensical Studio** for authoring.

**Gate:** the concrete architecture (which tools, wired how, in which order) is NOT designed inside this ADR. Next step per the kickoff principle: a dedicated **design-architecture session** producing ADR-0003 with an industry-validated pipeline mapped stage-by-stage, every step demonstrably advancing shipping and agent-compatible. Until ADR-0003, only the already-owned assets move (Storybook, axe, tokens, Figma MCP, Nano Banana Pro).

## Decision 4 — session protocol (continuity without derailment)

The program is **multi-session by design**. Two session types, with the Golden Board artifact as the cross-session contract:

- **Build sessions** advance exactly one board column (a Phase A cluster, the design-architecture ADR, Phase B). They do NOT stop to fix flags — new flags are *filed to the board*, not chased.
- **Checkpoint sessions** (between builds, small) burn the flag ledger: re-verify the register first-hand, resolve one-clicks, reconcile records, run the standing lints. Checkpoints keep repairs from ever hijacking a build session's momentum.
- **Open ritual** (every session): hydrate repos → read the board → re-verify the rows it will touch first-hand. **Close ritual:** update board + memory + wiki; every new discovery lands on the board with a phase assignment, never as an untracked aside.

## Consequences

Positive: "golden" becomes a declared, gated state per product rather than a mood; instruments compound; the design stack gets a governed on-ramp; flags stop derailing builds. Negative/accepted: Phase A adds CI cost and a new harness dependency (Playwright); visual-testing vendors introduce accounts/spend (choice deferred to ADR-0003); the board is one more surface to maintain (mitigated by the close ritual).

**Supersession.** This ADR supersedes the PAI Playwright ban (recorded in amended canon). If ADR-0003 changes stack choices named here, it marks the specific lines superseded — no silent overwrite.
