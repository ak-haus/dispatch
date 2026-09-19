---
title: `code/` — the Prime DISpatch monorepo
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-09-19
---
# `code/` — the Prime DISpatch monorepo

An Astro 7 editorial site in a pnpm monorepo: the live site (`apps/microsite-astro`), its Storybook (`apps/storybook`), and the shared `@prime-dispatch/tokens` and `@prime-dispatch/ui` packages.

## Workspace layout

| Path | Purpose | Owning Wave/Stream |
|---|---|---|
| `apps/microsite-astro/` | Astro 7 surface — Server Islands + Content Layer. Document-heavy / editorial / static-shell-with-islands surfaces. | W2-S-A scaffold; W5 fills |
| `packages/tokens/` | Design tokens (Style Dictionary v4 outputs — `tokens.css` / `tokens.tailwind.config.ts` / `tokens.toon`). | W2-S-D fills |
| `packages/` (future) | Shared workspace packages — `ui/` (W3-S-A), `brand-bible/` (W3-S-A), `voice/` (W4), `content-schema/` (W4 — Zod discriminated union per §3.C). | W3+ |
| `tooling/` (future) | Shared build/lint/test configs (eslint / prettier / vitest / playwright). | W3+ |

## Common commands

```bash
pnpm install            # install all workspace deps
pnpm dev:astro          # Astro dev server
pnpm build              # build all workspaces in parallel
pnpm build:astro        # Astro production build
pnpm typecheck          # typecheck all workspaces
```

## Stack lock (W2-S-A bedrock)

| Layer | Lock | Reference |
|---|---|---|
| Node | 22 LTS (pinned in `.nvmrc`) | engines.node `>=22.0.0` |
| Package manager | pnpm 10.33.0 (pinned via `packageManager` field) | engines.pnpm `>=10.0.0` |
| TypeScript | 5.7+ strict (shared config in `tsconfig.base.json`) | `noUncheckedIndexedAccess` + `verbatimModuleSyntax` enabled |
| Astro | 7 (7.3.3) | Astro routing; requires Vite 8 |

## Discipline references

- Architectural rationale: master plan §1.7 reframe 2.6 + §3.B Stream-B platform foundation
- Eventual destination: `buildings/dev-diary/` repo per W5 deliverable (V1 builds in-place inside `prime-city-brand-sandbox/v1-dev-diary-microsite/code/`)

## What this scaffold does NOT contain (downstream Wave fills)

- Component library (W3-S-A — shadcn/ui MCP + 14 components from CD4 specs)
- Content schema implementation (W4 — Zod discriminated union per §3.C)
- Application services (W4 — Hexagonal+DDD agent-server + prime-mcp + CrewAI Flows + LangGraph + A2A + OpenTelemetry)
- Microsite implementation (W5 — landing page + article surfaces + multimedia pipeline + Vale.sh)
- Deploy lane wiring (W2-S-C concurrent — Vercel Hobby primary; Cloudflare Pages alt)
- Secrets + IaC (W2-S-B concurrent — Doppler + OpenTofu)

## Live vendor paths

**Vercel project:** `dispatch` (project IDs live in the Vercel dashboard, not this repo) | production branch: `main`  
**Deploy config:** `code/vercel.json` (the single authoritative file) — source of truth; dashboard overrides are drift.

**Post-deploy mandatory gate (B4, 2026-08-26):** the `uptime (prod smoke)` workflow — it auto-runs on every
production `deployment_status` and is dispatchable on demand. It proves a `200` **and** island hydration with a real
browser; a Vercel `READY` status does NOT guarantee pages were built — the Astro/Vite trap (below) produces `READY`
with zero rendered HTML, and a header check alone cannot see JS death either.

### Astro + Vite version trap

**Symptom:** Vercel reports `READY`, live site returns 404 on every route, `dist/` contains only public assets and no rendered HTML.

**Root cause:** Astro requires one Vite major as a hard dependency (Astro 7.3.3 requires `^8.0.13`). If `pnpm.overrides.vite` pins below it, pnpm resolves a Vite that Astro cannot use. On Astro 6.3 (Vite 7) the build exited 0 with `0 page(s) built` and no error message.

**Current status:** not active. The lockfile resolves `vite@8.3.0` for the Astro surface. Storybook uses `vite@6.4.3` in its own workspace package, and vitest's own dependency resolves `vite@7.3.6`; neither builds the site.

**Guard:** never add a `pnpm.overrides.vite` pin below the major Astro requires (8 today) to the root `package.json`. If a dep requires an older Vite, isolate it in its own workspace package so the Astro surface keeps its Vite.

**Verification:**
```bash
# After a production deploy the uptime (prod smoke) workflow runs the real gate
# (header oracle + hydration proof). For a quick first look at a preview URL:
curl -sI https://<deployment-url>/ | grep "HTTP"
# HTTP/2 200 is necessary but NOT sufficient — it cannot see JS death
```

See `2-paradiso/3-cadence-sphere/departments/vercel/cap-policy.standard.md` for deploy caps and `2-paradiso/3-cadence-sphere/departments/vercel/project-registry.standard.md` for the full project registry.
