---
title: `code/` — Prime DISpatch microsite hybrid foundation
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# `code/` — Prime DISpatch microsite hybrid foundation

Astro 6 + Next.js 15 **co-foundational hybrid** monorepo. Per master plan §1.7 reframe 2.6 + §3.B platform foundation: both frameworks integrated into the platform substrate from the start, both accessible from the infrastructure level throughout. NOT parallel-peers; NOT umbrella+bolt-on. Both load-bearing.

Composition patterns (when to reach for which framework, hybrid composition recipes, dial mechanics) documented at [../lifecycle/runbook/sop/hybrid-foundation.md](../lifecycle/runbook/sop/hybrid-foundation.md).

## Workspace layout

| Path | Purpose | Owning Wave/Stream |
|---|---|---|
| `apps/microsite-next/` | Next.js 15 surface — App Router + RSC + Server Actions. Interactive / authenticated / dashboard / admin surfaces. | W2-S-A scaffold; W5 fills |
| `apps/microsite-astro/` | Astro 6 surface — Server Islands + Content Layer. Document-heavy / editorial / static-shell-with-islands surfaces. | W2-S-A scaffold; W5 fills |
| `packages/tokens/` | Design tokens (Style Dictionary v4 outputs — `tokens.css` / `tokens.tailwind.config.ts` / `tokens.toon`). | W2-S-D fills |
| `packages/` (future) | Shared workspace packages — `ui/` (W3-S-A), `brand-bible/` (W3-S-A), `voice/` (W4), `content-schema/` (W4 — Zod discriminated union per §3.C). | W3+ |
| `tooling/` (future) | Shared build/lint/test configs (eslint / prettier / vitest / playwright). | W3+ |

## Common commands

```bash
pnpm install            # install all workspace deps
pnpm dev:next           # Next.js dev server
pnpm dev:astro          # Astro dev server
pnpm build              # build all workspaces in parallel
pnpm build:next         # Next.js production build
pnpm build:astro        # Astro production build
pnpm typecheck          # typecheck all workspaces
```

## Stack lock (W2-S-A bedrock)

| Layer | Lock | Reference |
|---|---|---|
| Node | 22 LTS (pinned in `.nvmrc`) | engines.node `>=22.0.0` |
| Package manager | pnpm 10.33.0 (pinned via `packageManager` field) | engines.pnpm `>=10.0.0` |
| TypeScript | 5.7+ strict (shared config in `tsconfig.base.json`) | `noUncheckedIndexedAccess` + `verbatimModuleSyntax` enabled |
| Astro | 6 (STABLE per master plan §1.7 reframe 2.6; Cloudflare acq Jan 16 2026; MIT preserved) | App Router-equivalent: Astro 6 routing |
| Next.js | 15 (App Router + RSC + Server Actions) | React 19 baseline |

## Discipline references

- Composition strategy: [../lifecycle/runbook/sop/hybrid-foundation.md](../lifecycle/runbook/sop/hybrid-foundation.md)
- Architectural rationale: master plan §1.7 reframe 2.6 + §3.B Stream-B platform foundation
- File ownership: master plan §5.1 (Stream-B owns `lifecycle/` + code repos; Stream-D owns `lifecycle/runbook/`)
- Eventual destination: `buildings/dev-diary/` repo per W5 deliverable (V1 builds in-place inside `prime-city-brand-sandbox/v1-dev-diary-microsite/code/`)

## What this scaffold does NOT contain (downstream Wave fills)

- Component library (W3-S-A — shadcn/ui MCP + 14 components from CD4 specs)
- Content schema implementation (W4 — Zod discriminated union per §3.C)
- Application services (W4 — Hexagonal+DDD agent-server + prime-mcp + CrewAI Flows + LangGraph + A2A + OpenTelemetry)
- Microsite implementation (W5 — landing page + article surfaces + multimedia pipeline + Vale.sh)
- Deploy lane wiring (W2-S-C concurrent — Vercel Hobby primary; Cloudflare Pages alt)
- Secrets + IaC (W2-S-B concurrent — Doppler + OpenTofu)

## Live vendor paths

**Vercel project:** `dispatch` (`[redacted-vercel-project]`) | production branch: `main`  
**Deploy config:** `vercel.json` at repo root (`3-purgatorio/4-buildings-terrace/dispatch/code/vercel.json`) — source of truth; dashboard overrides are drift.

**Post-deploy mandatory check:** after every production deploy, verify `HTTP 200` on the root route before declaring success. A Vercel `READY` status does NOT guarantee pages were built — the Astro/Vite trap (below) produces `READY` with zero rendered HTML.

### Astro 6.3.x + Vite version trap

**Symptom:** Vercel reports `READY`, live site returns 404 on every route, `dist/` contains only public assets and no rendered HTML.

**Root cause:** Astro 6.3.x requires Vite `^7.3.2` as a hard dependency. If `pnpm.overrides.vite` pins below `7` (e.g., `"vite": "^6.x"`), pnpm resolves a Vite version that is incompatible with Astro 6.3.x. The build exits 0 with `0 page(s) built` and no error message.

**Current status (2026-05-23):** NOT active. Lock file resolves `vite@7.3.3` for `@tailwindcss/vite` (Astro surface). Storybook uses `vite@6.4.2` separately — this is safe because Storybook is a distinct workspace package.

**Guard:** never add `pnpm.overrides.vite` pinning below `7` to the root `package.json`. If a dep requires Vite 6, isolate it in its own workspace package so the Astro surface stays on Vite 7+.

**Verification command:**
```bash
# After a production deploy, run:
curl -sI https://<deployment-url>/ | grep "HTTP"
# Must return HTTP/2 200 — anything else means the Astro surface did not build
```

See `2-paradiso/3-cadence-sphere/departments/vercel/cap-policy.standard.md` for deploy caps and `2-paradiso/3-cadence-sphere/departments/vercel/project-registry.standard.md` for the full project registry.
