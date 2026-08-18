# AGENTS.md — Dispatch (the agent's map; read this first)

> The vendor-neutral instruction file for any AI agent in this repo (Claude reads it via `@AGENTS.md` in
> `.claude/CLAUDE.md`, which also carries the full **editorial discipline**). Terse + TRUE — a MAP, not a manual.
> Dispatch is an **editorial Astro/Next scrollytelling microsite** that showcases Prime, **live at dispatchmag.dev**.
> The founding **master plan** is historical (purged with Prime V1, 2026-06-10 — in the private `ak-haus/prime-city`
> history); current governance lives in THIS repo's canon (`representation/`, `specs/`, this file). The repo
> remains a Lane-P tenant of Prime.

## ⚠ Dispatch is LIVE — the boundary (read this first)
Live at **dispatchmag.dev** (Vercel). Deploys are **manual CLI** (the Vercel GitHub App is not installed).
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
- Deploy verify: `curl -sI https://dispatchmag.dev/ | grep HTTP`. CI = eight gates on every push/PR: `build (astro)` ·
  `e2e (playwright + axe)` · `lighthouse (budget ratchet)` · `naming convention (ls-lint)` · `typecheck (tsc)` ·
  `unit (vitest)` · `tokens (drift gate)` · `design (contract drift gate)` — plus a 6h `uptime (prod smoke)` cron.
  Red = do-not-merge.

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
- **the editorial discipline** (JS-first · the animation stack · Tailwind v4 · the wordmark · pitfalls) → `.claude/CLAUDE.md`.
- **the master plan** (founding constitutional spec) → historical, in the private `ak-haus/prime-city` history (Prime V1
  purged 2026-06-10). **terms** → `GLOSSARY.md`.

## Where to go deeper (read on-demand)
- The editorial discipline + dev rules → `.claude/CLAUDE.md`. The visual canon → `representation/visual-system/` (CD1–5).
  The decision records → `docs/adr/`. The provenance record → `PRESERVATION.md`.
