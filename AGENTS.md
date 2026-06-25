# AGENTS.md — Dispatch (the agent's map; read this first)

> The vendor-neutral instruction file for any AI agent in this repo (Claude reads it via `@AGENTS.md` in
> `.claude/CLAUDE.md`, which also carries the full **editorial discipline**). Terse + TRUE — a MAP, not a manual.
> Dispatch is an **editorial Astro/Next scrollytelling microsite** that showcases Prime, **live at dispatchmag.dev**.
> Governance is **external**: the authoritative spec is the **master plan** (in `~/prime-city`, `v1-dev-diary-microsite/plans/`);
> this repo is a Lane-P tenant of Prime.

## ⚠ Dispatch is LIVE — the boundary (read this first)
Live at **dispatchmag.dev** (Vercel). Deploys are **manual CLI** (the Vercel GitHub App is not installed).
- **NEVER:** commit secrets (Doppler `prime-city`); ship a **placeholder** (a colored rectangle / registration marks)
  on launch-ready code — real assets live in `code/apps/microsite-astro/public/`; animate **layout** properties
  (`width`/`height`/`top`/`left`/`margin`/`padding`) — use `transform`+`opacity`; resume the **DEAD** `cross-fire`
  backend or the `automations/` n8n (superseded → the standalone `~/crossfire` product).
- **ASK FIRST (confirm before):** a **Vercel deploy** — and after it the **mandatory** post-deploy check
  `curl -sI https://dispatchmag.dev/ | grep HTTP` (must be `200`: Astro 6 + Vite can report READY with **zero**
  rendered HTML); touching the **locked visual canon** (CD1–5 — palette/typography/cartography/lanes); editing
  content (`.mdx` — **AK owns content**).
- **ALWAYS:** default to **motion/JS over static** — the visual product *is* the JavaScript (static is the failure
  state); split the **`DISpatch` wordmark** (`DIS` is always red); verify with `tsc --noEmit` + a Tailwind cache-reset
  before claiming done (see `.claude/CLAUDE.md`).

## Commands (the real ones — pnpm monorepo; run from `code/` unless noted)
- Dev (the LIVE Astro surface): `cd code/apps/microsite-astro && pnpm dev` (`:4321`) · Next dashboard: `cd code && pnpm dev:next`.
- Build: `cd code && pnpm build` (or `build:astro` / `build:next`). Type-check: `cd code && pnpm typecheck`.
- Tokens (Style Dictionary): `cd code/packages/tokens && pnpm build`. Content collections: `pnpm astro sync`.
- After CSS / `@theme inline` edits: `rm -rf .astro node_modules/.vite` then restart `pnpm dev` (Tailwind v4 caches inlined values).
- Deploy verify: `curl -sI https://dispatchmag.dev/ | grep HTTP`. CI = `.github/workflows/naming.yml` (the first CI — a typecheck gate is owed).

## Layout (navigate by this; folders carry a `README.md` — `ls` a folder and read it)
- `code/` — the **pnpm monorepo**: `apps/microsite-astro` (Astro 6, **LIVE**) · `apps/microsite-next` (Next 15 dashboard) ·
  `apps/storybook` · `packages/tokens` (Style Dictionary) · `packages/ui` · `vercel.json` (deploy SoT).
- **Brand canon** — `representation/visual-system/` (the **CD1–5** ratified Decision Docs: thesis · color · cartography ·
  components · motion). `lifecycle/` — the append-only operator **runbook** + `deploy/`. `Specs/` — product RFCs.
- `context/` (session snapshots) · `incidents/` · `INSPO/` (design inspiration) · `automations/` (**DEAD** n8n) · `PRESERVATION.md` (the cold-storage snapshot record).

## Concept → path (resolve a name to its home)
- **microsite-astro** (the LIVE editorial surface) → `code/apps/microsite-astro`. **tokens pipeline** → `code/packages/tokens`.
- **the canon / CD1–5** (locked visual identity) → `representation/visual-system/`. **the runbook** (operator spine) → `lifecycle/runbook.md`.
- **the editorial discipline** (JS-first · the animation stack · Tailwind v4 · the wordmark · pitfalls) → `.claude/CLAUDE.md`.
- **the master plan** (constitutional spec — what the microsite IS) → external, `~/prime-city/v1-dev-diary-microsite/plans/`. **terms** → `GLOSSARY.md`.

## Where to go deeper (read on-demand)
- The editorial discipline + dev rules → `.claude/CLAUDE.md`. The visual canon → `representation/visual-system/` (CD1–5).
  The operator runbook → `lifecycle/`. The cold-storage / dead-rails record → `PRESERVATION.md`.
