---
title: Article-frontmatter-driven Crossfire data architecture
origin: prime-authored
status: active
captured: 2026-05-13
authored-by: Claude Sonnet 4.6
reviewed-by: AK (pending)
priority: launch-blocker for editorial autonomy
related-context: context/2026-05-13_dispatch-cc8-build-state.md
parent-spec: specs/Claude brief — Crossfire (cross-fire/)
sphere: 3-purgatorio/4-buildings-terrace
audience: [citizens, mayor, eden]
authority: mayor
last_amended: 2026-05-17
load_bearing: true
---

# Spec: Article-frontmatter-driven Crossfire data

## Why this spec exists

Today, every Crossfire entry — the 6 platform-shaped cards on the homepage,
each card's media asset, each card's destination URL, the engagement metrics —
is hardcoded in `src/components/home/CrossfireSpread.tsx` as the
`SLOT_FIXTURES` array and the `TODAY_STORY` constant.

This means the editor (AK) cannot change tomorrow's Crossfire entry without
asking an engineer (Claude) to edit a `.tsx` file. That is unacceptable for a
publication that ships one story per day.

This spec proposes the data-layer change that makes Crossfire fully
editor-owned via plain-text MDX frontmatter.

## When to wire this

**AFTER the design spec is locked.** Per AK 2026-05-13: refinement on the
visual layer is still active; wiring data automation now would lock the data
shape against a design that may still move. Capture this spec, hold it, wire
when the design freezes.

## Current shape

```ts
// src/components/home/CrossfireSpread.tsx (today)
const TODAY_STORY = {
  title: 'An agent arrives into a Building already under construction',
  dek: '...',
  author: 'AK Almoumen',
  authorHandle: '@dispatch_prime',
  authorRole: 'Mayor · Prime City',
  date: '2026-05-13',
  dateLabel: 'May 13, 2026',
  readingTime: '7 min read',
  siteUrl: 'dispatch.prime/dispatch-01',
} as const

const SLOT_FIXTURES: CrossfireSlot[] = [
  { kicker: 'I · The site', platform: 'dispatch', media: { ... }, ... },
  { kicker: 'II · The newsletter', ... },
  { kicker: 'III · The LinkedIn post', ... },
  { kicker: 'IV · The Hashnode article', ... },
  { kicker: 'V · The Dev.to article', ... },
  { kicker: 'VI · The Instagram post', ... },
]
```

## Proposed shape

Move the data into the dispatch's MDX frontmatter. Editor only ever touches
markdown; Crossfire reads the featured (most recent) dispatch and renders.

```yaml
# src/content/dispatch/dispatch-01.mdx
---
title: An agent arrives into a Building already under construction
kicker: Editorial District · today
dek: A dispatch on what it feels like to wake up inside a city you did not assemble.
author:
  name: AK Almoumen
  role: Mayor · Prime City
date: 2026-05-13
readingTime: 7 min read
provenance:
  lane: Hybrid
  summary: Drafted by AK, edited by Claude, fact-checked by AK.
tags: [editorial, prime-city, agent-arrival]
hero:
  src: /cartography/district.png
  alt: Editorial District render

# NEW: Crossfire surfaces — one entry per surface this story shipped to.
crossfire:
  surfaces:
    - kind: dispatch
      url: /dispatch/dispatch-01
      media:
        kind: image           # image | video | audio
        src: /cartography/district.png
        alt: Editorial District cartographic render
        caption: Editorial District · cycle render
    - kind: newsletter
      issueNumber: 6
      subject: An agent arrives into a Building already under construction
      sentTo: 1247             # subscriber count at send
      media:
        kind: image
        src: /banners/dispatch-02.png
    - kind: linkedin
      url: https://www.linkedin.com/feed/update/urn:li:activity:...
      handle: '@ak-almoumen'
      excerpt: Wake up inside a city you did not assemble — and what the construction team needs from you when you do.
      engagement:                # optional, falls back to defaults if absent
        likes: 247
        comments: 43
        reposts: 12
      media:
        kind: image
        src: /cartography/district.png
    - kind: hashnode
      url: https://primecity.hashnode.dev/an-agent-arrives
      tags: [prime-city, dev-diary, construction]
      engagement:
        likes: 184
        comments: 23
        bookmarks: 47
      media:
        kind: image
        src: /cartography/district.png
    - kind: dev
      url: https://dev.to/akalmoumen/an-agent-arrives-...
      tags: [devjournal, primecity, construction, scrollytelling]
      engagement:
        reactions: 412
        comments: 38
      media:
        kind: image
        src: /cartography/district.png
    - kind: instagram
      url: https://www.instagram.com/p/...
      handle: dispatch.prime
      caption: An agent arrives into a Building already under construction
      engagement:
        likes: 2418
      media:
        kind: video           # video for IG reel
        src: /cartography/district.mp4
        poster: /cartography/district.png
---

# An agent arrives into a Building already under construction

[article body here in markdown / mdx]
```

## Schema additions (Zod, in `src/content.config.ts`)

```ts
const mediaKind = z.enum(['image', 'video', 'audio'])

const mediaAsset = z.object({
  kind: mediaKind,
  src: z.string(),
  poster: z.string().optional(),         // for video
  alt: z.string().optional(),
  caption: z.string().optional(),
})

const surfaceKind = z.enum([
  'dispatch', 'newsletter', 'linkedin', 'hashnode', 'dev', 'instagram',
])

const crossfireSurface = z.object({
  kind: surfaceKind,
  url: z.string().optional(),            // optional for newsletter / dispatch
  handle: z.string().optional(),
  excerpt: z.string().optional(),
  caption: z.string().optional(),
  tags: z.array(z.string()).max(8).optional(),
  issueNumber: z.number().int().optional(),
  subject: z.string().optional(),
  sentTo: z.number().int().optional(),
  engagement: z.object({
    likes: z.number().int().optional(),
    comments: z.number().int().optional(),
    reposts: z.number().int().optional(),
    bookmarks: z.number().int().optional(),
    reactions: z.number().int().optional(),
  }).optional(),
  media: mediaAsset,
})

const dispatch = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/dispatch' }),
  schema: z.object({
    // ... existing fields ...
    crossfire: z.object({
      surfaces: z.array(crossfireSurface).min(1).max(6),
    }).optional(),
  }),
})
```

## Component changes

### `CrossfireSpread.tsx` becomes data-driven

```tsx
// In EditorialDistrictMapHero.tsx (parent composer):
<CrossfireSpread
  story={featured.data}                    // pass the whole frontmatter
  surfaces={featured.data.crossfire?.surfaces ?? []}
/>

// In CrossfireSpread.tsx:
export function CrossfireSpread({ story, surfaces }: Props) {
  // Render N surfaces dynamically; map each surface.kind to its
  // PlatformThumbnail variant (existing components stay).
  // Fall back to a "draft" placeholder if surfaces array is empty.
  ...
}
```

### Per-surface URL rules

- `dispatch` — defaults to `/dispatch/${entry.id}` if no url provided
- `newsletter` — no url; renders the email mockup with subject + sentTo
- `linkedin / hashnode / dev / instagram` — `url` is required; the "View on
  X" CTA in the card footer links to it

### Engagement defaults

If a surface's `engagement` block is missing, render the platform card without
metrics (no faux numbers). The platform thumbnail components already gate
their engagement rows on data presence.

## Migration

1. Add the `crossfire` block to the existing `dispatch-01.mdx`
2. Update `content.config.ts` schema (add `crossfire` block, optional)
3. Refactor `CrossfireSpread` to accept `surfaces` prop, render dynamically
4. Delete `SLOT_FIXTURES` and `TODAY_STORY` constants
5. Pass `featured.data.crossfire?.surfaces` from parent
6. Verify `pnpm build` passes; verify dev preview matches the prior render
7. Document the new frontmatter shape in `specs/dispatch-article-template.md`

## Editor workflow after wiring

1. Editor writes `src/content/dispatch/dispatch-02.mdx` with frontmatter
   describing today's story + the 6 surface entries
2. Pushes to GitHub
3. Vercel rebuilds
4. Crossfire updates within ~30s of the push hitting `main`

No code touched. No engineer involved. Editor owns the surface.

## Out of scope (future spec, not now)

- Auto-fetching engagement counts from each platform's API (would need
  serverless functions + per-platform OAuth + a refresh cron)
- Cross-posting automation (write once → publish everywhere via Buffer / n8n)
- A web-based editor UI (Decap CMS, TinaCMS, or Sanity could front this)

## Acceptance criteria

- [ ] Editor can swap tomorrow's Crossfire entry by editing one MDX file
- [ ] Schema validation catches missing required fields before build
- [ ] Existing visual identity unchanged (no regressions)
- [ ] All 6 platform thumbnails still render correctly with real data
- [ ] Build passes; type-check passes
- [ ] No `SLOT_FIXTURES` or `TODAY_STORY` constants remain in the code

---

*Captured 2026-05-13 from the CC8 design-refinement session. Hold until
design spec is locked, then loop into finalization.*
