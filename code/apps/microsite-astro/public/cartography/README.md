---
title: Cartography assets
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# Cartography assets

Drop commissioned or AI-generated map illustrations here. The microsite picks
them up automatically based on filename convention.

## Filename convention

| File | Used by | Aspect | Notes |
|---|---|---|---|
| `district.webp` (or `.jpg`, `.png`) | Homepage hero | ~3:2 (1200×800) | Editorial District view; DISpatch building near 41% L, 52% T |
| `neighborhood.webp` (or `.jpg`, `.png`) | Article page atmospheric frame | ~16:9 | Tight view around DISpatch building |

## How wiring works

The Astro pages probe for these files at request time and pass the URL through
to `CartographyCanvas` via the `backgroundImage` prop. When the file exists, it
renders below the SVG civic geometry overlay at high opacity (the SVG ink lines
and DISpatch marker compose on top). When absent, the SVG renders alone with
the procedural geometry.

To wire a new file:

1. Drop the asset into this directory.
2. Update `src/pages/index.astro` or `src/layouts/DispatchArticleLayout.astro`:
   - Pass `backgroundImage="/cartography/district.webp"` to the hero/frame.

## Authoring guidance

Per the Build Spec:

- Hand-drawn aesthetic preferred — ink on warm vellum substrate
- Cross-hatched building footprints
- Visible contour line density
- Highlighted DISpatch building anchor (accent-prime red)
- No labels — labels are handled by the SVG overlay (none for now)
- Higher elevation NW, lower SE (terrain gradient)

The SVG overlay sits on top, so the image carries the texture/atmosphere and
the SVG carries the canonical authored geometry (roads, district outlines,
the live DISpatch marker pulse).
