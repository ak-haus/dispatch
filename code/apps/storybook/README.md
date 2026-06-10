---
title: `apps/storybook` — Prime DISpatch component documentation surface
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# `apps/storybook` — Prime DISpatch component documentation surface

Storybook 9 (React + Vite) sibling app to `microsite-next` and `microsite-astro`. Indexes the `@prime-dispatch/ui` component library across the whole brand-bible-registry.

## Why this lives in `apps/` (not in `packages/ui/`)

Research-derived (c) HYBRID placement per W3-S-A research — see [research artifacts](../../cc-ledger/diffs/W3-S-A/research/):

- **Storybook RFC #22521** (maintainer guidance) explicitly calls package-scoped Storybook (`packages/ui/.storybook/`) a "counter-pattern" because it ties component logic to Storybook concerns
- **Vercel official Turborepo design-system starter** uses `apps/docs/` for Storybook with `packages/ui` for component source — 5 of 7 surveyed precedents follow this shape
- **shadcn/ui MCP registry consumer pattern is Storybook-blind** — registry JSON has zero Storybook fields; placement choice is pure DX, not contract-shaping

This means `@prime-dispatch/ui` stays Storybook-free as a workspace package; consumers (`microsite-next`, `microsite-astro`, future Buildings) install it without the Storybook devDependency tax. Storybook lives here alongside the other consumer apps.

## Common commands

```bash
# Dev server (port 6006)
pnpm --filter storybook dev
# or from monorepo root:
pnpm dev:storybook

# Static build (output: storybook-static/)
pnpm --filter storybook build
# or from monorepo root:
pnpm build:storybook

# Typecheck
pnpm --filter storybook typecheck
```

## Configuration

| File | Purpose |
|---|---|
| `.storybook/main.ts` | Framework config + stories glob (`../../../packages/ui/src/components/**/*.stories.@(ts\|tsx\|mdx)`) + addons (a11y + docs) |
| `.storybook/preview.tsx` | Global decorators + parameters; imports `@prime-dispatch/tokens/css` so every story renders against real Vellum atmospheric scale + lane pigments + chrome aliases |

## Addons (W3-S-A bridge)

| Addon | Purpose | Consumer signal |
|---|---|---|
| `@storybook/addon-docs` | Auto-generated component documentation from JSDoc + TSX prop signatures | Mayor + future Building authors read here |
| `@storybook/addon-a11y` | Inline axe-core a11y violations in the story panel | Master plan §6.6 Row 6 verification ladder green-line at component-author time |

W3-S-B (visual regression substrate) wires Chromatic Free integration on top of this Storybook surface. Vale.sh (voice fidelity + DLDS lane validation) wires per master plan §6.6 Row 7.

## Token bridge state (W3-S-A)

Stories load `@prime-dispatch/tokens/css` which currently surfaces W2-S-D's verbatim sample outputs (color tokens only — 4 platform + 12 dispatch + 1 asset stub). Phase 1 chrome components reference typography / spacing / motion slots by CSS custom property naming convention (e.g., `var(--type-title-700)`) so the variables become live as soon as W2-S-D round 2 ratifies typography + spacing + motion + theme tokens.

## Discipline references

- W3-S-A dispatch brief: `v1-dev-diary-microsite/cc-ledger/dispatches/W3/cc7-dispatch-brief-w3.md` §3.1
- Master plan §4 W3 + §5.5 + §5.8 + §8.14 (per-component-commit discipline)
- Master plan §6.6 verification ladder rows 5 (Chromatic) + 6 (axe-core) + 22 (Vibe Fidelity)
- CD4 catalogue: `v1-dev-diary-microsite/representation/visual-system/components.md`
- Research artifacts: `v1-dev-diary-microsite/cc-ledger/diffs/W3-S-A/research/`
