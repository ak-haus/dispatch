---
title: DISpatch microsite — Astro app
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-06-11
---
# DISpatch microsite

The DISpatch editorial surface — Prime's dev-diary magazine. A JS-first
scrollytelling site: Astro 6 static output with React 19 islands, animated
by GSAP + ScrollTrigger, Motion, and Lenis smooth scroll, styled with
Tailwind v4 on the DISpatch token bridge. Eleven static pages: home, six
MDX dispatches (`/dispatch/[id]`), about, sitemap, article surface, and a
token preview.

## Commands

Run from this directory (or via `pnpm --filter microsite-astro <cmd>` from
the workspace root `code/`):

| Command | What it does |
|---|---|
| `pnpm dev` | regenerate the commit feed, then dev server at `http://localhost:4321` |
| `pnpm build` | regenerate the commit feed, then production build → `dist/` |
| `pnpm preview` | serve the production build locally |
| `pnpm exec tsc --noEmit --project tsconfig.json` | typecheck |
| `pnpm astro sync` | re-validate content collections after frontmatter changes |
| `pnpm commits:generate` | rebuild `src/data/commits.json` from `git log` |

After CSS or `@theme inline` edits: `rm -rf .astro node_modules/.vite` and
restart dev — Tailwind v4 caches inlined values.

## Structure

```text
/
├── scripts/              build-time tooling (commit feed, cartography)
├── public/               static assets (banners/, cartography/, fonts/)
├── src/
│   ├── content/dispatch/ the dispatches (.mdx) — editor-owned
│   ├── content.config.ts Zod schema for dispatch frontmatter
│   ├── components/       React islands + Astro components
│   ├── layouts/          StackLayout (Lenis wiring) + article layouts
│   ├── lib/              search index builder + pure query helpers
│   ├── data/             commits.json — generated from git log at build
│   └── pages/            Astro routes (incl. /dispatch/[id])
├── deploy.md             Vercel deploy guide (current truth)
└── doppler.yaml          Doppler scope: project prime-city, config dev
```

## Rules of the room

Build discipline lives in the repo-root `CLAUDE.md` (JS-first motion stack,
Tailwind v4 `@theme inline` semantics, CSS scoping checks, wordmark law:
DIS is always red). Visual canon lives in `canon-brief.md` and
`representation/visual-system/`. Content is editor-owned MDX; the schema is
the contract. Engagement metrics and platform URLs in frontmatter are
honest-only — real numbers or nothing.
