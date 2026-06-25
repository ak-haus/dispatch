# GLOSSARY — Dispatch controlled vocabulary

> One preferred term per concept. Metaphors live here; directories stay literal (the naming SOP). The term authority
> an agent consults to resolve a name. Depth: `representation/visual-system/` (CD1–5) + the external master plan.

## Surfaces
- **microsite-astro** — the **LIVE** editorial surface (Astro 6, Server Islands + Content Layer); shipped to
  dispatchmag.dev. `code/apps/microsite-astro`.
- **microsite-next** — the secondary Next 15 dashboard surface (App Router, RSC); in development. `code/apps/microsite-next`.
- **hybrid foundation** — Astro 6 + Next 15 as **co-foundational** (not parallel peers); composition patterns in `lifecycle/runbook/sop/`.
- **cross-fire** — the former Hono voice-ingest backend. **DEAD / superseded** by the standalone `~/crossfire` product. Do not resume.

## Visual system
- **DISpatch wordmark** — `DIS` always renders dispatch-red, split into two spans (see `.claude/CLAUDE.md`). No exception.
- **tokens pipeline** — Style Dictionary v4 → `tokens.json` → CSS + Tailwind config + toon exports. `code/packages/tokens`.
- **CD1–5** — the five ratified **Decision Docs** (the locked visual canon): thesis · color · cartography · components · motion. `representation/visual-system/`.
- **cartography** — the vectorized district/zone map used as the editorial substrate (SVG/PNG/MP4); token-driven layers paint on it.
- **lanes** (dispatch / editorial / platform) — three semantically distinct pigment groups inherited via `--lane-*`; **not** interchangeable.
- **letterpress** (`.dispatch-emboss` / `.dispatch-burnin`) — the editorial text effect on the cartographic substrate (`text-shadow` + `mix-blend-mode:multiply`).
- **cycle** (dawn / dusk / night) — the three-tier color scheme per `[data-prime-cycle]`; dawn is base, dusk+night are runtime overrides.
- **scrollytelling** — GSAP ScrollTrigger + Lenis choreography for article narrative; the default motion-first approach.

## Process + governance
- **content collection** — the Astro Content Layer schema (`content.config.ts`); dispatches are `.mdx` in `src/content/dispatch/`. AK owns content.
- **the master plan** — the **external** constitutional spec (in `~/prime-city`, `v1-dev-diary-microsite/plans/`) — what the microsite IS. This repo is a Lane-P tenant.
- **the runbook** — the append-only operator spine (`lifecycle/runbook.md`), grows per **Wave** (W2→W8 delivery cadence).
- **five durability axes** — Adaptable · Evolutionary · Mod-able · Upgradable · Downgradable (the runbook's enforced mechanism).
- **per-component-commit** — Conventional Commits scoped to a spec section; every shippable unit atomic (surgical rollback).
- **chiseled history** — append-only canon preservation: rejected ideas tombstone, source files vaporize; git holds the diff archive.

## Conventions
- **Files:** lowercase-kebab for content; language-native for code (TS/JS `camelCase`); ALL-CAPS-KEBAB reserved for root
  meta (`README`, `AGENTS`, `GLOSSARY`, `CLAUDE`) + `PRESERVATION`.
- **Folders:** lowercase, by function, literal. Metaphors (cartography, lanes, cycle, letterpress, Waves) live here +
  in code/docs, **never** as directory names. *(`INSPO/` + `Specs/` are pre-existing capitalized dirs — flagged for a
  follow-up rename to `inspo/`/`specs/`; ls-lint ignores them until then.)* **Rename, don't delete**; supersede in git.
