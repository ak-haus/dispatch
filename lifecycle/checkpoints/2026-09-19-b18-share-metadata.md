---
title: build session close — 2026-09-19 B18 · share metadata from the editorial contract (Build 24)
status: active
session_type: build
column: B18 — share-metadata surface
---

# Build session close — 2026-09-19 (Build 24 · B18 · share metadata)

> B18 was promoted from F36 at the 2026-09-19 checkpoint: every page's head carried charset, viewport
> and title only, and D1 names "OG cards on real platforms" as a gate row that nothing built. The goal
> was to emit description, canonical, the Open Graph + Twitter card, an RSS feed and Article JSON-LD,
> with every value taken from the zod editorial contract, and to change nothing a reader sees.

## Open ritual — verified, not assumed

| Check | Result |
|---|---|
| Branch base | `origin/main` at `072d1de` (#56, Build 23), deployed; `uptime (prod smoke)` green on it |
| Live head, `/dispatch/dispatch-01` | charset · viewport · title only: 0 description, 0 `og:`, 0 `twitter:`, 0 canonical, 0 RSS link, 0 JSON-LD |
| Feeds | `/rss.xml`, `/feed.xml`, `/feed`, `/rss`, `/atom.xml` all 404 |
| Served URL form | `/dispatch/dispatch-01/` answers 308 → `/dispatch/dispatch-01`, which answers 200; `/` answers 200 |

## What landed

1. **One share module** (`src/lib/share/share.ts`). Canonical URL, card resolution, JSON-LD and the
   serializers all live here, so no two tags can disagree. It is pure; filesystem lookups are
   injected (`public-files.ts`).
2. **Head tags** (`ShareMeta.astro`, rendered by `StackLayout`, the single `<head>` owner).
   - Every route carries a description, the Open Graph + Twitter large-image card, `og:site_name` and
     the feed link.
   - A self-canonical and `og:url` in the served no-slash form. The build sees `/foo/`
     (`build.format: 'directory'`, Astro docs), so the slash is stripped.
   - Dispatches add `og:type article`, `article:published_time` and Article JSON-LD (headline,
     description, datePublished, image, url).
   - `og:title` is unbranded; WhatsApp's documentation asks for exactly that. `og:site_name` carries
     the brand.
3. **Cards** (`/og/<slug>.jpg`). These are 1200×630 JPEG renditions: each dispatch's banner plate,
   and the district map for every other route.
   - They use `sharp.strategy.attention`. The plates run 0.75–1.78 aspect, and a centre crop cuts
     dispatch-06's wordmark in half.
   - Sizes run 38–208 KB each, against WhatsApp's documented 600 KB ceiling.
   - The endpoint calls `sharp` directly, because `astro:assets` does not process `public/`.
   - `sharp` is declared at the lockfile's existing 0.35.4 (Astro's own), so no new version arrived.
4. **Feed** (`/rss.xml`). This is an RSS 2.0 summary feed via `@astrojs/rss` (+9 packages).
   - Items are newest first, with no-slash permalink guids.
   - The byline goes in `dc:creator`, because RSS `<author>` must be an e-mail address (RSS Best
     Practices Profile).
   - `atom:link rel=self` is declared.
   - The W3C Feed Validation Service reports it **valid**, 0 errors. Its one warning, "self
     reference doesn't match document location", comes from validating pasted text.
5. **OQ-9 filed** (DESIGN.md §Adjudicated questions, through the emitter). The contract's `author`
   names a byline, not what kind of author it is, so the JSON-LD ships without `author`. Four options
   are recorded for AK.

## Decisions for AK's disposition

- **No canonical on the 404 or the two noindex previews.** This departs from the row's literal
  "every route emits canonical". The 404 is served at every unknown address, so it has no URL of its
  own. A canonical beside `noindex` is a mixed signal; Google's John Mueller: "don't mix noindex and
  rel=canonical". All three still carry a description and a card.
- **Summary feed, not full text.** The row's field list names the dek, not the body, and the
  scroll-told page is the product.
- **Card crops.** A contact sheet of all seven went to AK in session. The real-platform check (D1's
  row) runs on production after the merge.

## Verification

| Check | Result |
|---|---|
| `pnpm audit --prod` | No known vulnerabilities |
| `pnpm typecheck` | 0 errors (microsite-astro, 100 files) |
| Unit | microsite-astro 98/98 (+17 share-module tests) |
| Site build | 14 pages + 7 cards + `/rss.xml`; neither leaks into the sitemap |
| e2e, pinned container | `share-metadata.spec.ts` 9/9. It checks each head against its page's h1, dek, `<time>` and banner alt, against the feed, and against every card's JPEG dimensions and size. `sharp`'s linux binary resolves in the image |
| Mutation | canonical left un-normalized → 5 of 9 tests red with the exact URL mismatch |
| Independent review (fresh context, given the diff and the brief, not my conclusions) | sourcing law clean; no blocking bug. **One defect in the spec, fixed in this PR:** it assumed every dispatch has a banner plate, so a valid new dispatch with no plate, or with a contract `hero`, would have turned e2e red. It now accepts every contract-legal card source, collects the cards from the pages rather than assuming one per dispatch, and parses the feed as XML (well-formed; the RSS 2.0 fields present exactly once). Proven by running it with dispatch-06's plate removed: 9/9 |
| Advisor (commitment boundary) | adopted xmlns/og:image:type/absolute URLs; "directory format serves `/about/`" refuted by the live 308; "author = Organization" disputed (contradicts the visible byline) and carried into OQ-9 |

## Filed, not chased

The defect test is the same for each: none blocks this row's gate.

- **F43 — the sitemap lists URLs that redirect.** `@astrojs/sitemap` emits `/foo/`, production
  answers 308 → `/foo`, and the new canonical names `/foo`. Google treats the sitemap as a
  canonical signal, so the two now disagree. The likely repair is Astro `trailingSlash: 'never'`.
  It touches the sitemap-discovered e2e journey, so it is its own change. The independent review
  argued B18 is what makes the two disagree and proposed a narrower repair: an `@astrojs/sitemap`
  `serialize` step that strips the slash. That is a few lines, and AK can fold it in.
- **F44 — the home `<title>` reads "DISpatch — DISpatch".** `StackLayout` appends the brand to a
  page title that is already the brand. `og:title` is unaffected.
- **F45 — `favicon.svg` ships but nothing references it.** The head declares no icon, and browsers
  fall back to `/favicon.ico`.
- **F20, measured again.** `masthead-404-desktop` failed 3 of 6 desktop runs on unmodified `main`
  (`072d1de`) with 265/172/2-pixel diffs, the same signature the ledger recorded 2026-08-20. Mobile
  went 6 of 6. The branch drew it 1 of 3. This predates B18. The 140-capture probe, not a burst, is
  what judges the reopen trigger.

## Known properties, recorded

- **Scrapers cache cards by URL.** `/og/<slug>.jpg` does not change when a plate changes. Facebook
  and LinkedIn cache the page scrape anyway, so a changed card needs a re-scrape through each
  platform's debugger.
- **A local `hero.src` that is not an image** would fail the build inside sharp. Every consumer
  already treats `hero` as an image; the contract does not say so.

## B18 after this build

**Built; DRAFT for AK's sign-off.** The row closes on D1's own terms: AK checks the cards on real
platforms against production.
