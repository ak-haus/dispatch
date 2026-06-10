---
title: `components/ui/` — intentionally empty at V1
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# `components/ui/` — intentionally empty at V1

Per **CD4 §7 (semantic componentization, W3 deferred)** and **CD4 §3.1 ratified 2026-05-08**, Prime's V1 inventory contains zero `/components/ui` shadcn base primitives.

## Why empty

Prime's register lock (per CD1 thesis §3 marriage-of-registers) pulls past shadcn defaults. The Title / Body / Nav / Meta-code / Civic-Dante 5-typeface containment governance, the marriage of NARRATIVE literary-civic register with META Wired/Hacker register, and the cartography coupling at the structural layer collectively require bespoke chrome. shadcn primitives presume a different register baseline (modern-default / Vercel-aesthetic) that Prime intentionally departs from.

## Why preserve the layer

Three reasons the directory exists despite zero V1 contents:

1. **Forward-pointer compatibility.** Future Buildings (per master plan §3.A multipurpose-platform principle) MAY adopt shadcn primitives if their register tolerates it. The 3-layer naming convention stays coherent across Buildings even when individual Buildings populate the layers differently.
2. **3-layer naming consistency.** All Building component libraries inherit the `custom/` + `patterns/` + `ui/` shape. Removing the layer here would create per-Building structural divergence and break the brand-bible-registry consumer pattern's predictability.
3. **shadcn/ui MCP registry semantics.** When future Buildings consume Prime components via `npx shadcn@latest add @prime-dispatch/<Name>`, the MCP server resolves component categories by 3-layer path. Preserving `ui/` as an empty-but-valid path keeps the registry contract honest about what Prime ships at each layer.

## When to add a primitive

Per **master plan §11 Q9 + CD4 §6**: Mayor adjudicates per-component on `/ui` adoption. The earned-place gate is at W3 implementation (today's wave). To-date no Phase 1 chrome component has surfaced as needing a shadcn primitive; the layer remains empty.

If a future component requires a primitive (e.g., a `Dialog` primitive shared by SearchPalette + CrossPost + VirgilChat), it lands here under the standard shadcn naming convention with full attribution + migration guidance back to upstream shadcn/ui.
