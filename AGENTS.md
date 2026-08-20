# AGENTS.md — Dispatch (the agent's map; read this first)

> The vendor-neutral instruction file for any AI agent in this repo (Claude reads it via `@AGENTS.md` in
> `.claude/CLAUDE.md`, which also carries the full **editorial discipline**). Terse + TRUE — a MAP, not a manual.
> Dispatch is an **editorial Astro/Next scrollytelling microsite** that showcases Prime, **live at dispatchmag.dev**.
> The founding **master plan** is historical (purged with Prime V1, 2026-06-10 — in the private `ak-haus/prime-city`
> history); current governance lives in THIS repo's canon (`representation/`, `specs/`, this file). The repo
> remains a Lane-P tenant of Prime.

## ⚠ Dispatch is LIVE — the boundary (read this first)
Live at **dispatchmag.dev** (Vercel). The **Vercel GitHub App is installed** (2026-08-20, F3-a; verified against
Vercel's API by `repoId`, never the dashboard — the B14 rename makes "linked to the archive repo" the live failure
mode). So a merge to `main` **can deploy production by itself** — but only when the commit touches `code/`: the
project's Ignored Build Step (`rootDirectory: code`) cancels any build whose diff is outside it, which is why a
records-only commit shows `CANCELED` and that is the guard working, not a failure. Manual CLI deploys still work and
are still the way to force one.
- **NEVER:** commit secrets (Doppler `prime-city`); ship a **placeholder** (a colored rectangle / registration marks)
  on launch-ready code — real assets live in `code/apps/microsite-astro/public/`; animate **layout** properties
  (`width`/`height`/`top`/`left`/`margin`/`padding`) — use `transform`+`opacity`; resurrect the dead V1 rails
  (superseded 2026-08-17 by the standalone Crossfire product; their records live in the private ops archive).
- **ASK FIRST (confirm before):** a **Vercel deploy** — and after it the **mandatory** post-deploy check
  `curl -sI https://dispatchmag.dev/ | grep HTTP` (must be `200`: Astro 6 + Vite can report READY with **zero**
  rendered HTML); touching the **locked visual canon** (CD1–5 — palette/typography/cartography/lanes); editing
  content (`.mdx` — **AK owns content**).
- **ALWAYS:** read `DESIGN.md` (repo root — the generated brand contract) before generating or editing any UI;
  verify before claiming done — `tsc --noEmit` clean + a Tailwind cache-reset + the post-deploy `curl`
  200; keep secrets in Doppler; stay in the scope you were asked. *(House style, enforced in `.claude/CLAUDE.md`,
  not a safety control: motion/JS over static — the visual product is the JS; split the `DISpatch` wordmark, `DIS` red.)*

## Commands (the real ones — pnpm monorepo; run from `code/` unless noted)
- Dev (the LIVE Astro surface): `cd code/apps/microsite-astro && pnpm dev` (`:4321`) · Next dashboard: `cd code && pnpm dev:next`.
- Build: `cd code && pnpm build` (or `build:astro` / `build:next`). Type-check: `cd code && pnpm typecheck`.
- Tokens (Style Dictionary): `cd code/packages/tokens && pnpm build`. Content collections: `pnpm astro sync`.
- After CSS / `@theme inline` edits: `rm -rf .astro node_modules/.vite` then restart `pnpm dev` (Tailwind v4 caches inlined values).
- Deploy verify: `curl -sI https://dispatchmag.dev/ | grep HTTP`. CI = **fifteen required contexts** on every push/PR
  (ruleset `21012416`; the count is machine law, not prose — read it with
  `gh api repos/ak-haus/dispatch/rulesets/21012416`): `build (astro)` · `content (schema gate)` ·
  `e2e (playwright + axe)` · `lighthouse (budget ratchet)` · `naming convention (ls-lint)` · `typecheck (tsc)` ·
  `unit (vitest)` · `tokens (drift gate)` · `tokens-lint (governance gate)` · `design (contract drift gate)` ·
  `storybook (stories + a11y gate)` · `chromatic (story lane)` · `UI Tests: dispatch_storybook` ·
  `UI Tests: dispatch_playwright` · `ideation (provenance law)` — plus a 6h `uptime (prod smoke)` cron and the
  non-blocking `design-review (evidence packet)` AK reads per PR. **Red = do-not-merge.** A new stage ships its gate
  AND registers it; a gate that is not required is decoration.
- **Name the flag in the PR** (F25 interim rule, adopted 2026-08-20). A PR that closes or changes a tracked flag or
  board row **names its ID in the title or the body** — `F18`, `R1`, `A6`. The flag ledger lives *outside* this repo,
  so no gate can bind to it and no query can find a close that was only remembered. Naming the ID makes the close
  ritual reconcile by `gh pr list --search`, not by recall — which is the failure this rule exists for: the ledger has
  drifted five times, most sharply when a row still read "held for disposition" for a PR that had merged the day
  before. The machine-checkable in-repo ledger is a separate, larger piece of work; this line is the zero-cost half.

## Authoring a dispatch (ADR-0003 §Stage 8 — there is no CMS)
**AK OWNS CONTENT.** An agent may *draft*; AK signs off. Creating or editing any `.mdx` is an ASK-FIRST action, and
PR review **is** the content review — there is no other approval surface. Never invent a fact, a byline, a metric, or
a published URL to satisfy a field: omit the optional field instead.
- **Where.** `code/apps/microsite-astro/src/content/dispatch/<slug>.{md,mdx}` — the filename **is** the route
  (`dispatch-03.mdx` → `/dispatch/dispatch-03/`, enumerated by `src/pages/dispatch/[id].astro`); `index.md` is excluded
  from the collection. `.md` for prose-only, `.mdx` to embed components (`<PullQuote />`) at exact paragraph anchors.
- **The contract.** The zod schema in `src/content.config.ts` is the **named editorial contract** — the only source of
  truth for what frontmatter is legal. Required: `title` (≤120) · `kicker` (≤60) · `dek` (≤360) ·
  `author{name, role, handle?}` · `date` · `readingTime` (must match `4 min read`) ·
  `provenance{lane: Human-led|Hybrid|AI-led, summary ≤280}` · `tags` (1–8). Optional: `hero{src, alt, credit?}` ·
  `crossfire{surfaces: 1–6}` (each surface **requires** `media`; `engagement` is honest-only — real numbers or absent;
  `url` only when a real published URL exists).
- **Check before you push** (from `code/`): `pnpm --filter microsite-astro exec astro sync` — ~1.5s, and it is the same
  loader + schema CI runs. Then `pnpm build:astro` for the MDX half.
- **The two gates layer** (measured, astro 6.4.8): `content (schema gate)` catches malformed YAML **and** schema
  violations, naming the file and the failing field; `build (astro)` owns MDX compile/import errors — `sync` does not
  compile MDX and will pass a broken component import. Neither gate replaces the other; both are required.
- **Never widen the schema to fit a draft.** Widening it is an *editorial* decision, AK's alone — not a wiring fix.
  Fix the draft; if the contract genuinely lacks a field, file an OQ in `DESIGN.md` §Adjudicated questions (edit the
  emitter `code/packages/tokens/scripts/emit/layout-design-md.mjs`, never the generated file) and stop.

## Layout (navigate by this; folders carry an `index.md` — `ls` a folder and read it)
- `code/` — the **pnpm monorepo**: `apps/microsite-astro` (Astro 6, **LIVE**) · `apps/microsite-next` (Next 15 dashboard) ·
  `apps/storybook` · `packages/tokens` (Style Dictionary) · `packages/ui` · `vercel.json` (deploy SoT).
- **Brand canon** — `representation/visual-system/` (the **CD1–5** ratified Decision Docs: thesis · color · cartography ·
  components · motion). `lifecycle/` — component build records + fixtures. `specs/` — curated product specs.
- `docs/adr/` — the decision records (ADR-0001 Live Wire · ADR-0002 golden-readiness · ADR-0003 design stack) ·
  `inspo/` (design inspiration) · `PRESERVATION.md` (the provenance record; operational history lives in the private ops archive).

## Concept → path (resolve a name to its home)
- **microsite-astro** (the LIVE editorial surface) → `code/apps/microsite-astro`. **tokens pipeline** → `code/packages/tokens`.
- **the brand contract** (agent-facing compilation of the canon; generated, never hand-edited) → `DESIGN.md`.
- **the canon / CD1–5** (locked visual identity) → `representation/visual-system/`.
- **the editorial contract** (what frontmatter is legal; AK's to widen) → `code/apps/microsite-astro/src/content.config.ts`.
- **the editorial discipline** (JS-first · the animation stack · Tailwind v4 · the wordmark · pitfalls) → `.claude/CLAUDE.md`.
- **the master plan** (founding constitutional spec) → historical, in the private `ak-haus/prime-city` history (Prime V1
  purged 2026-06-10). **terms** → `GLOSSARY.md`.

## Where to go deeper (read on-demand)
- The editorial discipline + dev rules → `.claude/CLAUDE.md`. The visual canon → `representation/visual-system/` (CD1–5).
  The decision records → `docs/adr/`. The provenance record → `PRESERVATION.md`.
