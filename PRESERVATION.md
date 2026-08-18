# Dispatch — provenance record

> **Status: LIVE** at **https://dispatchmag.dev** (Vercel; manual-CLI deploys). This file is the repo's
> provenance record. Operational history — incidents, infrastructure snapshots, power-state ledgers —
> lives in the private ops archive, not in the product repo.

## Provenance

- **Origin:** built as Prime's V1 dev-diary microsite; extracted from the Prime V1 tree as a cold-storage
  snapshot on **2026-06-09** when V1 was marked for deconstruction.
- **Revival:** **2026-06-11**, as a Prime V2 Lane-P tenant. Build verified, Vercel production restored
  (`dispatchmag.dev`), honesty repairs shipped the same day: real search hrefs, BuildTicker rendering the
  repo's own git log at build time, all fabricated engagement removed, dead CI purged, dependencies triaged.
- **Rails superseded:** the V1 in-repo backend (`cross-fire`), LLM proxy, and workflow-automation defs were
  superseded by the standalone **Crossfire** product and purged from this repo **2026-08-17**; the B14 public
  cut (**2026-08-18**) relocated their records — with this repo's full pre-cut history — to the private ops archive.
- **Public cut:** **2026-08-18** (B14) — history sanitized for publication; the repo is part of the product.

## What Dispatch is

Prime's editorial microsite — a JS-first scrollytelling publication. A self-contained **pnpm** monorepo
(`code/`): an Astro 6 website (`microsite-astro`), a secondary Next.js surface (`microsite-next`), Storybook,
and the `@prime-dispatch/tokens` + `@prime-dispatch/ui` libraries. Plus design canon (`representation/`,
`canon-brief.md`), curated product specs (`specs/`), and inspiration (`inspo/`).

## Data + secrets posture

- The `dispatch` database schema is registered and **intentionally empty by design** — no tables without
  producers (Prime constitution Principle II); a static site needs none.
- Secrets live in Doppler. **Never** in code, chat, or commits — this repo's history is verified clean
  (gitleaks, before and after the B14 cut).
