---
title: DISpatch Cartography AI Pipeline
origin: prime-authored
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
status: active
load_bearing: true
last_amended: 2026-05-17
---
# DISpatch Cartography AI Pipeline

End-to-end workflow for turning a static cartographic illustration into an interactive, layered, dynamic-feeling map experience. Three independent steps that compound when combined.

```
0-terra/cartography-sources/district.png              ← the base illustration (already in place)
   │
   ├─→ Step 1: Segmentation         → src/lib/generated-zones.ts        (clickable polygons)
   ├─→ Step 2: Depth map             → 0-terra/cartography/district.depth.png (3D parallax)
   └─→ Step 3: Motion (RunwayML)     → 0-terra/cartography/district.webp   (ambient animation)
```

---

## Step 1 — Segmentation → exact-match hot zones

Color-based connected-component analysis. Finds the red highlighted buildings and blue water regions in the illustration, traces each as a polygon, and writes them out as a TypeScript array that `CartographyCanvas` imports. After this runs, every visible red building has its own hover state and click target, exactly matching the illustration's geometry.

**Why this approach (not SAM/Replicate):** the illustration's regions are color-distinct. A pure-JS color predicate is free, instant, deterministic, and produces tighter polygons than a general-purpose segmentation model. Total cost: $0. Total deps: `jpeg-js` + `pngjs`.

### Install + run

```bash
cd code/apps/microsite-astro
pnpm install                     # picks up jpeg-js + pngjs from package.json
pnpm cartography:segment         # reads district.png, writes generated-zones.ts
```

Expected output:

```
▸ Reading 0-terra/cartography-sources/district.png
▸ 928×1232 (2052KB PNG)
▸ Segmenting "dispatch"...
  found 12 candidate region(s) ≥ 60px
▸ Segmenting "water"...
  found 1 candidate region(s) ≥ 800px

▸ Summary:
    [dispatch-1] area=18234px polygon-vertices=14
    [dispatch-2] area=8211px polygon-vertices=9
    ...
    [water] area=89432px polygon-vertices=22

✓ Wrote N zone(s) → src/lib/generated-zones.ts
```

Reload the homepage — `CartographyCanvas` now reads from `generated-zones.ts` (falls back to hand-coded zones if file is empty). Hover over the red buildings: each has its own tooltip and click target.

### Tuning the color predicates

Open `scripts/segment-cartography.mjs` and edit `CATEGORIES`:

```js
{
  id: 'dispatch',
  match: (r, g, b) => r > 110 && r > g + 30 && r > b + 30,  // adjust thresholds
  minPixels: 60,        // filter out noise smaller than this
  maxRegions: 8,        // keep only N largest regions
}
```

If buildings are missing → loosen the predicate. If noise gets picked up → tighten it or raise `minPixels`.

### Adding new categories

Want green parks clickable too? Add a category:

```js
{
  id: 'park',
  label: 'Civic Park',
  description: 'Green space within the district',
  match: (r, g, b) => g > 120 && g > r + 20 && g > b + 10,
  minPixels: 200,
  maxRegions: 5,
}
```

Re-run `pnpm cartography:segment`.

---

## Step 2 — Depth map → parallax / 3D feel

Depth Anything v2 generates a per-pixel grayscale depth map from the flat illustration. White = foreground (buildings), black = background (water, sky). The depth map drives a parallax effect: as the user scrolls or moves the mouse, near pixels shift more than far pixels. The flat illustration gains visible volume without re-drawing.

### Setup (one-time)

```bash
# 1. Sign up at replicate.com (~10 seconds, GitHub OAuth)
# 2. Get an API token: https://replicate.com/account/api-tokens
# 3. Add to Doppler:
doppler secrets set REPLICATE_API_TOKEN r8_xxxxxxxxxxxxx
# OR add to .env:
echo "REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxx" >> .env

# 4. Install Replicate SDK
pnpm add -D replicate
```

### Run

```bash
pnpm cartography:depth
```

Cost: ~$0.001 per image. Output: `0-terra/cartography/district.depth.png`.

### Wiring the depth map (CSS approach — light + fast)

Add to `global.css`:

```css
.cartography-depth-layer {
  background-image: url('/cartography/district.webp');
  background-size: 100% auto;
  /* The depth map is the parallax driver */
  mask-image: url('/cartography/district.depth.png');
  mask-mode: luminance;
  mask-size: 100% auto;
  transform: translateZ(0);  /* hardware accel */
}
```

In `CartographyCanvas`, render this layer above the base illustration. As `window.scrollY` increases, apply a small `translate3d(0, calc(var(--scroll) * 0.15), 0)` to the depth layer — bright (foreground) pixels appear to drift up faster than dark (background) pixels because the mask reveals only those pixels.

### Wiring the depth map (Three.js approach — fancier, more setup)

For a real 3D plane with vertex displacement:

```bash
pnpm add three @react-three/fiber @react-three/drei
```

Then a `<DepthMapPlane>` component that loads the base + depth as textures, renders a subdivided plane, and uses `displacementMap={depthTexture}` on the material. Mouse moves the camera; the buildings appear to rotate.

This is a separate component, ~80 lines. Can ship as a follow-up.

---

## Step 3 — Animated WebP → ambient motion

RunwayML Gen-3 (or Pika, Krea, Luma) converts a still image into a 4-6 second motion loop. Subtle paper texture drift, contour breathing, water shimmer, light shifts across buildings. Output as MP4, convert to animated WebP, drop into `0-terra/cartography/` — browsers play it as a background image automatically.

### Workflow

1. **Sign up at runwayml.com** (or pika.art / krea.ai / lumalabs.ai — all have free trial credits)
2. **Upload `0-terra/cartography-sources/district.png`**
3. **Image-to-video** with a prompt like:
   ```
   subtle ambient motion, paper texture drift, soft light shift across buildings,
   gentle water shimmer in the blue regions, contour lines slowly breathing,
   cinematic editorial atmosphere, very slow, looping seamlessly
   ```
4. **Export** as 4-second MP4 at 24fps (the shortest option — keeps file size manageable)
5. **Convert MP4 → animated WebP** with ffmpeg:
   ```bash
   ffmpeg -i loop.mp4 -loop 0 -plays 0 \
     -vf "fps=24,scale=1200:-1:flags=lanczos" \
     -c:v libwebp -lossless 0 -compression_level 6 -q:v 70 \
     district.webp
   ```
   Target: under 2MB. If larger, drop `-q:v` to 50 or reduce `fps=18`.

6. **Drop into the folder** — `code/apps/microsite-astro/0-terra/cartography/district.webp`
7. **Update the Astro probe order** in `src/pages/index.astro` to prefer `district.webp`:
   ```ts
   const districtImageName = [
     'district.webp',   // ← move first to prefer the animated version
     'district.svg',
     'district.png',
     'district.jpg',
   ].find(...)
   ```

Reload — the page now has ambient motion under everything else.

### No ffmpeg installed?

Use [cloudconvert.com/mp4-to-webp](https://cloudconvert.com/mp4-to-webp) (free, no signup for one-off conversion).

---

## Combining all three — the full effect

After all three steps:

```
LAYER 1 (back):    district.webp        ambient motion (Step 3)
LAYER 2 (mid):     depth-driven parallax (Step 2, applied to LAYER 1)
LAYER 3 (front):   SVG hot zones        clickable + tooltips (Step 1)
LAYER 4 (overlay): wordmark + editorial callouts + district labels (existing)
```

What this feels like to a visitor:

- They land on the page → the illustration is *breathing* (ambient WebP motion)
- They move their mouse → buildings shift slightly (depth parallax)
- They hover over a red building → tooltip appears with the dispatch metadata
- They click → navigate to the article
- They scroll → the whole city slides past, district labels reveal in sequence

The static illustration **feels procedurally generated** because every element responds to interaction, even though the underlying asset is a fixed JPG/PNG/WebP.

---

## Iteration cycle (the feedback loop)

Once all three layers are wired, the iteration cycle becomes:

```
1. Edit prime-city-map.ts            → procedural civic geometry (roads, blocks, contours)
2. GET /api/cartography.svg          → live procedural SVG export
3. Send through Adobe Firefly        → AI-texturized variant
4. Vectorizer.ai or rasterize        → final illustration asset
5. Drop in 0-terra/cartography/       → updates base layer
6. pnpm cartography:segment          → regenerates hot zones
7. pnpm cartography:depth            → regenerates depth map
8. (optional) re-do RunwayML pass    → regenerates animated motion
```

Steps 1–2 happen in code. Steps 3–4 happen in AI tools. Steps 5–8 are one-line operations. Total turnaround per iteration: ~5 minutes once you have the workflow down.

The canonical authored civic geometry stays in code (commit-tracked, reviewable). The *aesthetic treatment* lives entirely in the AI pipeline, swappable without touching app code.
