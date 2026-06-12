---
title: DISpatch microsite — Vercel deploy guide
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-06-11
---
# DISpatch microsite — Vercel deploy guide

> Amended 2026-06-11 (V2 revival). Dispatch lives in its own repo,
> `github.com/ak-haus/dispatch`, production branch `main`. The committed
> `code/vercel.json` is the authoritative build contract. The old
> prime-city monorepo paths (`v1-dev-diary-microsite/...`,
> `working/v1-dev-diary-microsite`) are dead.

This microsite (Astro 6, static output) deploys to Vercel from `main` of
`github.com/ak-haus/dispatch`. The `code/` folder is the pnpm workspace
root; the microsite is one workspace member.

## Setup (current truth)

1. Vercel project: **dispatch** (`[redacted-vercel-project]`, team
   `[redacted-vercel-team]`) — preserved from V1 and re-linked to
   `ak-haus/dispatch` at revival (2026-06-11).
2. Project settings — encoded in the committed `code/vercel.json`, which is
   authoritative:
   - **Root Directory** → `code`
   - **Install Command** → `pnpm install --frozen-lockfile`
   - **Build Command** → `pnpm --filter microsite-astro build`
   - **Output Directory** → `apps/microsite-astro/dist`
   - **Framework Preset** → Astro
   - **Node Version** → 22.x (the microsite requires `>=22.12.0`)
3. **Production Branch** → `main`.

## Environment variables

Set these in **Project Settings → Environment Variables** before the first build.
Scope each to **Production**, **Preview**, and **Development** as needed.

| Variable | Required? | Purpose |
|---|---|---|
| `PUBLIC_MAPBOX_TOKEN` | Optional but recommended | Mapbox token for cartographic surfaces (`index.astro`, `DispatchArticleLayout.astro`). Falls back to empty string — map tiles will be blank without it. |

No other `import.meta.env.*` references exist in `src/`. No secrets are
needed at build time; everything `PUBLIC_*` is intentionally client-exposed.

## What `code/vercel.json` does

Sits at the workspace root (`code/`) and pins the full build contract:
framework `astro`, `installCommand: pnpm install --frozen-lockfile`,
`buildCommand: pnpm --filter microsite-astro build`, and
`outputDirectory: apps/microsite-astro/dist`. Because the Root Directory is
the workspace root, pnpm finds `pnpm-lock.yaml` and
`pnpm-workspace.yaml` directly — no "include files outside root" toggle
games, no auto-detection ambiguity.

## If the first build fails

- **"Lockfile not found" / "ERR_PNPM_NO_LOCKFILE"** → Root Directory is not
  `code`. Set it to `code` in Project Settings → General, redeploy.
- **Build command ran in the wrong folder** → a stale override in Project
  Settings is shadowing `code/vercel.json`. Clear the overrides; the
  committed file wins.
- **Node version errors** → set Node to 22.x in Project Settings → General.

## Rollback

Every push to `main` creates a new production deployment. To roll back,
open the Vercel project → **Deployments** tab → find the last known-good
deploy → three-dot menu → **Promote to Production**. Promotion is instant
(Vercel reassigns the production alias to that deploy's immutable URL) and
does not require a rebuild.
