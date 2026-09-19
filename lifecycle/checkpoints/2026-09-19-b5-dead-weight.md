---
title: build session close — 2026-09-19 B5 · dead-weight removal: microsite-next (Build 23)
status: active
session_type: build
column: B5 — dead-weight removal
---

# Build session close — 2026-09-19 (Build 23 · B5 · dead-weight removal)

> AK's ruling, the same day as Build 22: "Remove the microsite." `microsite-next` was a nine-file
> Next 15 scaffold from the 2026-05-11 shell phase, never deployed. The goal was to remove it and
> what existed only for it, change nothing a reader sees, and leave the live docs true.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| Branch base | `origin/main` at `ec1852e` (#54, Build 22), deployed; `uptime (prod smoke)` green |
| Advisories carried in | 2, both `sharp` 0.34.5, pinned by `next` inside `microsite-next` (Build 22's close) |
| Production on Astro 7 | Lighthouse 12.6.1, mobile, simulated, three runs each against dispatchmag.dev: article CLS 0.0000 ×3, LCP 6.49 s, perf 71 · home CLS 0.0000, LCP 12.6–12.8 s, perf 62–67 |

The article figure re-confirms B13's closure on the new build. The home LCP is B12's, unchanged in
kind.

## What landed — three commits

1. **The app is gone.** `code/apps/microsite-next/` (9 files) and the root `dev:next` and `build:next`
   scripts. B5's first item, the unbacked `next lint` script, left with the app. B5's second item
   ("axe goes live in A2 instead of dead-dep") still stood: A2 runs axe through
   `@axe-core/playwright`, and the direct `axe-core` entry in the app's production dependencies had
   no importer anywhere. It is removed; `@axe-core/playwright` keeps its own `axe-core` 4.13.0.
2. **Lockfile: removals only.** The `microsite-next` importer is gone, and `microsite-astro`'s
   importer changes by the one `axe-core` line. Every other importer is byte-identical. 41 packages
   left and none arrived: `next` and `@next/*`, `sharp` 0.34.5 with its 24 `@img/*` binaries,
   `styled-jsx`, `@swc/helpers`, `@tailwindcss/postcss`, `client-only`, `@opentelemetry/api` and
   `@alloc/quick-lru`. Astro's own `sharp` 0.35.4 is untouched, and the `vitest` entry is identical to
   `main`'s.
3. **The docs tell the truth.** The hybrid foundation is superseded: `GLOSSARY.md` marks it the way
   its `cross-fire` entry already does, and `code/README.md` now describes the Astro 7 monorepo.
   `AGENTS.md`, `PRESERVATION.md`, the Storybook and ui manifests and READMEs, and two token-generator
   comments drop `microsite-next`. The regenerated `DESIGN.md` and `tokens.css` change by exactly
   those three comment lines. The same edits close the "Astro 6" drift Build 22 left in nine live
   places: `AGENTS.md`, `GLOSSARY.md`, `PRESERVATION.md`, `code/README.md`, `code/package.json`, and
   the Astro app's config comment, `package.json`, `README.md` and `deploy.md`.

## Verification

| Check | Result |
|---|---|
| `pnpm audit --prod` | No known vulnerabilities. 18 this morning, 2 after Build 22, 0 now: **F34 closed** |
| `pnpm typecheck` | tokens · storybook · ui · microsite-astro (93 files, 0 errors) |
| Tests | tokens 56/56 · ui 110/110 · microsite-astro 81/81 · Storybook rail (Chromium) 355/355 |
| Token drift | rebuilt; 152 tokens conformant to DTCG 2025.10; the generated diff is the three intended lines |
| Site build | 14 pages built |

## Filed, not chased

- **F41 — four ui-package surfaces have no consumer.** `@prime-dispatch/ui/next-shell` had two
  importers, both in `microsite-next`. The `data`, `forms` and `state` modules have none at all: no
  subpath export and no root re-export, and `SiteNav.tsx:63` declares its own `PrimeCycle`. Their
  header comments now say so. Removing them is B5-class work beyond AK's ruling, so it waits for
  AK. Removing `state` would also retire one of F30's two theme-cycler protocols.
- **F42 — `vitest` 3.2.7 runs outside its supported Vite range.** Since Build 22 the Astro app
  resolves Vite 8.3.0, and `@vitest/mocker` 3.2.7 declares a peer of Vite 5–7; `pnpm install` prints
  the unmet peer. All suites pass. The repair is a `vitest` release whose peer range includes Vite 8,
  checked against its upgrade guide before it lands.
- **B3 gains two lines.** `canon-brief.md:82` and `:231` still say "Astro 6 + Next.js 15 hybrid" and
  "Astro 6 native". Five historical notes in `representation/` canon still cite the hybrid
  foundation: `voice/thesis-statement.md:551`, `visual-system/motion.md:19`,
  `cartography/editorial-district/first-render/README.md:35`, `typography/README.md:89`, and
  `MANIFEST.yaml:85`, which points at a `lifecycle/runbook/sop/hybrid-foundation.md` that does not
  exist. Both documents carry their own amendment mechanics, so they are AK's, not a silent edit.
- **Records upkeep.** `lifecycle/index.md` stops listing routine sweeps. Since F35 they land by
  auto-merge as one file each and cannot update the index, so the folder listing is their index.

## B5 after this build

**Closed.** Both of its items are done. F41 is B5-class, but it is a new finding, not part of the
row as filed.

## Next opener

The merge redeploys production with no reader-visible change; after it, the post-deploy smoke must
pass. Build 24: B18, share metadata, the one D1 prerequisite with no builder.
