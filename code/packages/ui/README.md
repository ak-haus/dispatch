---
title: `@prime-dispatch/ui`
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# `@prime-dispatch/ui`

Prime DISpatch component library — 20 V1 components per CD4 ratified inventory.

## Three-layer organization (per CD4 §3.1 ratified 2026-05-08)

| Layer | Purpose | V1 count | Examples |
|---|---|---|---|
| `src/components/custom/` | Prime extensions — components Prime authored against thesis register; not derivable from shadcn primitives | 11 | MastheadWordmark, SiteNav, ChapterRail, ReadingProgress, Footnote, DldsPanel, MetaArticleOpener, NarrativeArticleOpener, InstitutionalFixture, LiveTicker, SearchPalette |
| `src/components/patterns/` | Business compositions — compounds, cartography-coupled, homepage compositions | 9 | CodeBlockCopyButton, MetroMapMarker, CartographyCanvas, ReceptionHero, EditorialDigest, DistrictMap, CrossPost, VirgilChat, LiveRoom |
| `src/components/ui/` | shadcn base primitives | **0 — intentionally empty per CD4 §7** | (none — Prime's register pulls past shadcn defaults) |

The intentionally-empty `ui/` layer is a deliberate Prime deviation from the standard shadcn+Storybook pattern. CD4 §7 documents the rationale: Prime's register lock requires bespoke chrome that shadcn primitives don't carry; the layer is preserved for forward-pointer compatibility (future Buildings MAY add shadcn primitives if their register tolerates it) and to keep the 3-layer naming convention coherent across all Buildings.

## Component file pattern (per per-component-commit discipline § master plan §8.14)

Each component sits in its own directory with this shape:

```
src/components/<layer>/<ComponentName>/
├── <ComponentName>.tsx          — implementation
├── <ComponentName>.stories.tsx  — Storybook 9 stories (consumed by apps/storybook)
├── <ComponentName>.registry.json — shadcn/ui MCP registry manifest (forward-pointer; consumed at W5+)
└── index.ts                     — barrel re-export
```

Smoke-test fixtures live separately at `v1-dev-diary-microsite/lifecycle/fixtures/<ComponentName>/` per W3 dispatch brief §3.1 (out-of-tree from `code/` so fixtures can be consumed by tooling that doesn't build the full workspace).

## Token consumption (per CD4 §4 Field 7 + W3-S-A bridge)

Components consume design tokens through `@prime-dispatch/tokens` — never hex literals, never raw font names.

```ts
// Component CSS imports the token CSS variables (loaded once at app/storybook root):
//   import "@prime-dispatch/tokens/css";
//
// Component code uses CSS custom properties:
//   className="masthead-wordmark"
//   <style>{`.masthead-wordmark { color: var(--wordmark-dis); }`}</style>
```

Phase 1 chrome components reference typography / spacing / motion slots by CSS custom property naming convention (e.g., `var(--type-title-700)`, `var(--space-scale-4)`, `var(--motion-fast)`) so the variables become live the moment they're defined upstream — no consumer rewrites required.

## Future Buildings consumption (forward-pointer; W5+)

Per master plan §4 W5: future Buildings install components from this library via shadcn/ui MCP registry — `npx shadcn@latest add @prime-dispatch/<ComponentName>` resolves through the MCP server to this package's registry JSON manifests. The `<ComponentName>.registry.json` files are the canonical manifest source; they ship as forward-pointers in W3-S-A, fully wire at W5 microsite implementation.

## Discipline references

- CD4 catalogue: `v1-dev-diary-microsite/representation/visual-system/components.md` §3.1 (V1 inventory) + §4 (7-field spec template) + §7 (semantic componentization, W3 deferred)
- Per-component spec scaffolds: `v1-dev-diary-microsite/representation/visual-system/components/<Name>/spec.md`
- W3-S-A dispatch brief: `v1-dev-diary-microsite/cc-ledger/dispatches/W3/cc7-dispatch-brief-w3.md` §3.1
- Master plan §5.5 + §5.8 + §8.14 (per-component-commit discipline)
- Master plan §6.6 verification ladder rows 5 (Chromatic) + 6 (axe-core a11y) + 22 (Vibe Fidelity)
