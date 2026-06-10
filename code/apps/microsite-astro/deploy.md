---
title: DISpatch microsite — Vercel deploy guide
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# DISpatch microsite — Vercel deploy guide

This microsite (Astro 6, static output) deploys to Vercel from the
`working/v1-dev-diary-microsite` branch of `github.com/ak-haus/prime-city`.

It lives three folders deep: `v1-dev-diary-microsite/code/apps/microsite-astro/`.
The `code/` folder is a pnpm workspace; the microsite is one workspace member.
Getting Vercel to honor that nesting is the only non-obvious step.

## First-time setup

1. Go to **vercel.com → Add New → Project**. Import `ak-haus/prime-city`.
2. On the configure screen:
   - **Root Directory** → click **Edit** → paste:
     `v1-dev-diary-microsite/code/apps/microsite-astro`
   - **Important:** check **Include source files outside of the Root Directory
     in the Build Step**. Without this, Vercel only uploads the leaf folder
     and pnpm cannot find the workspace root (`code/pnpm-workspace.yaml`) or
     the lockfile (`code/pnpm-lock.yaml`). Build will fail with "no lockfile
     found" or "workspace root not detected."
   - **Framework Preset** → Astro (should auto-detect from `vercel.json`).
   - **Build Command** → leave on default (`pnpm run build`). Vercel runs it
     from the Root Directory; pnpm walks up to find the workspace root.
   - **Install Command** → leave on default. Vercel detects pnpm from
     `packageManager` in the root `package.json` (pnpm@10.33.0) and runs
     `pnpm install` at the workspace root.
   - **Output Directory** → leave blank. `vercel.json` sets it to `dist`.
   - **Node Version** → 22.x (the microsite requires `>=22.12.0`).
3. **Production Branch** → Settings → Git → set to `working/v1-dev-diary-microsite`.
   (Or merge to `main` later and switch back to `main`.)

## Environment variables

Set these in **Project Settings → Environment Variables** before the first build.
Scope each to **Production**, **Preview**, and **Development** as needed.

| Variable | Required? | Purpose |
|---|---|---|
| `PUBLIC_MAPBOX_TOKEN` | Optional but recommended | Mapbox token for cartographic surfaces (`index.astro`, `DispatchArticleLayout.astro`). Falls back to empty string — map tiles will be blank without it. |

No other `import.meta.env.*` references exist in `src/`. No secrets are
needed at build time; everything `PUBLIC_*` is intentionally client-exposed.

## What `vercel.json` does

Sits at the microsite root and declares: framework hint, `outputDirectory: dist`,
clean URLs, security headers (X-Frame-Options, Referrer-Policy, Permissions-Policy
without FLoC), and immutable cache headers for `/_astro/*` (hashed bundles) and
`/fonts/*`. It deliberately does NOT pin `buildCommand` or `installCommand` —
Vercel's pnpm-workspace auto-detection is more reliable than a hardcoded
command, which would run inside the leaf folder where no lockfile lives.

## If the first build fails

- **"Lockfile not found" / "ERR_PNPM_NO_LOCKFILE"** → the "Include files
  outside Root Directory" toggle is off. Turn it on, redeploy.
- **"Cannot find workspace root"** → same fix.
- **Workspace detection fails entirely** → as a fallback, override
  **Install Command** to `cd ../../.. && pnpm install --frozen-lockfile`
  and **Build Command** to `cd ../../.. && pnpm --filter microsite-astro build`.
  Output Directory stays `dist`. Use this only if the toggle approach fails.
- **Node version errors** → set Node to 22.x in Project Settings → General.

## Rollback

Every push to `working/v1-dev-diary-microsite` creates a new production
deployment. To roll back, open the Vercel project → **Deployments** tab →
find the last known-good deploy → click the three-dot menu → **Promote to
Production**. Promotion is instant (Vercel just reassigns the production
alias to that deploy's immutable URL) and does not require a rebuild.
