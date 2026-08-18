# ADR-0001 — Dispatch "Live Wire": surfacing Crossfire publish activity on a static editorial site

- **Status:** **Accepted** (AK, 2026-08-17) — build scheduled as the next session. Decided: Alternative B + both surfaces (homepage ticker + `/wire`) + rolling 50-event/30-day window + the three researched decisions in the Addendum (Vercel Blob rail · one-contract/two-islands architecture · rich-but-compact card)
- **Date:** 2026-08-17
- **Deciders:** AK (final authority)
- **Governing law:** the Prime constitution, the Lane-P docking contract, and Dispatch `AGENTS.md`

> **Publication note (2026-08-18, B14 public cut).** This ADR is republished in redacted form: sections describing
> Crossfire's private internals (schema, file paths, deployment topology, enforcement mechanics) are summarized
> rather than quoted. The unredacted original is preserved in the private ops archive. The decision, the
> alternatives, their scores, and the Dispatch-side contract are unchanged.

---

## Context

Dispatch (editorial Astro microsite, live at dispatchmag.dev on Vercel, manual-CLI deploys) should display, in near-real-time, Crossfire firing posts across social media. Crossfire (a separate, private product) stays its own app, repo, and infrastructure; Dispatch gets a backend-level nested integration that surfaces a live activity display.

**What Crossfire emits.** Crossfire is a durable-execution content pipeline: one source flows through ingest → reshape → human QA approval → distribution to external platforms. Every successful publish lands as a row in Crossfire's authoritative publish record, and every status transition is history-tracked. Per canon the engine is currently paused; the deployed stack was verified end-to-end 2026-06-12. (Pipeline internals are Crossfire-private — see the publication note.)

**The hard boundaries** (all non-negotiable):

1. **No cross-schema reads between tenants.** Tenant database roles are denied on sibling schemas, enforced at the grant layer and proven by a re-runnable negative-probe matrix (Lane-P docking law). Dispatch cannot read Crossfire's tables; Crossfire cannot write into Dispatch's schema.
2. **No tables without producers** (constitution Principle II): a `dispatch` table requires a real producer plus a green probe before it may exist. The `dispatch` schema is registered and intentionally empty today. A producer *can* now exist — if Crossfire feeds it through a legal seam.
3. **Dispatch stays static-first.** Its Vercel static hosting and performance profile are canon; the dead in-repo V1 rails must never be resumed (`AGENTS.md`).
4. **Crossfire has no public HTTP endpoint.** Nothing external can poll the pipeline directly.
5. **Secrets live in Doppler** — never in code, chat, or commits.
6. **No fabricated activity data.** The 2026-06-11 honesty repairs removed all fabricated engagement; displayed activity must be real.
7. **Privacy in the event stream.** The pipeline's internal records hold unapproved drafts, author provenance, error text, and operator identities. A public feed must carry **success-only, sanitized** data — matching industry practice, where scheduler logs (Buffer/Hootsuite/dlvr.it) keep failures/retries/queue state operator-only, never public (https://support.buffer.com/article/517-insights-on-shared-posts-within-your-publishing-dashboard; https://help.hootsuite.com/hc/en-us/articles/360007580233; https://support.dlvrit.com/hc/en-us/articles/115000031793).

**In-house precedent for one surface displaying another system's activity:**
- **Terra:** state is served by the owning runtime; the display never reads raw state stores.
- **BuildTicker:** Dispatch's only in-repo activity display — real data captured at build time from its own git log (`code/apps/microsite-astro/src/components/home/BuildTicker.tsx`).
- **tribe-engine:** the sole cross-system integration in Prime's registry is API-seam-shaped (remote authenticated API), never shared-DB-shaped.

**Industry precedent for the display itself** (researched, cited): the canonical static-hosting pattern for live editorial surfaces is **client-side polling of CDN-cached JSON** — NYT election needle/results pages poll static JSON off `static01.nyt.com` behind the CDN (https://source.opennews.org/articles/ny-times-results-loader/); Guardian live blogs auto-fetch new blocks client-side (https://pressgazette.co.uk/publishers/digital-journalism/live-blogging-mastery-tips-for-publishers-from-guardians-andrew-sparrow/). The event shape is the POSSE syndication-link + Buffer sent-log schema: platform, permalink (the click-through is the proof), absolute timestamp, short excerpt, success-only status (https://indieweb.org/POSSE; https://indieweb.org/syndication-link-use-cases; https://developers.buffer.com/guides/posts-and-scheduling.html), plus a standing automation-attribution label mirroring X's "Automated by @owner" (https://devcommunity.x.com/t/automated-by-label/235210). Industry public-feed freshness expectation is "recent," not sub-second — commercial social walls refresh per-source on 6–48h intervals; Micro.blog cross-posts land in minutes-to-30 (https://walls.io/features/social-media-aggregator; https://help.micro.blog/t/automatic-cross-posting-to-mastodon-and-other-services/860).

---

## Alternatives considered

### Alternative A — Direct cross-schema read (Dispatch reads Crossfire's publish record at build or runtime)

**How it would work:** Dispatch's build (or a serverless endpoint) connects with a DSN and SELECTs from Crossfire's publish record.

**Evidence:** Forbidden by construction. Dispatch's role is denied on sibling schemas, proven by the live negative-probe matrix. Granting it would breach the one-schema-one-role Lane-P invariant and would make Dispatch's build depend on Crossfire's private schema shape — coupling the two repos Prime law explicitly decouples. Smuggling Crossfire's own credentials into Dispatch's runtime instead would directly violate role-per-app isolation and Crossfire repo law.

**Consequences:** Rejected outright. Recorded because it is the naive first idea and the negative-probe matrix exists precisely to kill it. No precedent supports it; the only cross-system integration in the registry is API-seam-shaped.

---

### Alternative B — Crossfire publishes a sanitized public activity ledger; Dispatch polls it as CDN-cached JSON ("Dispatch feed as a syndication target")

**How it would work:** Crossfire — the owner of the state — gains a small, journaled **feed-publish step** after distribution: it reads its own publish record (its own schema, its own role, fully legal), builds a sanitized `activity.json` (success-only, five fields per event: platform, live-post permalink, ISO timestamp, 1–2 line excerpt, source title), and PUTs it to object storage behind a CDN (Vercel Blob or equivalent; token in Doppler, mirrored to the pipeline host's environment). Dispatch ships fully static; a small client island polls the JSON every 30–60s with Page Visibility pause and renders the ticker. A Crossfire-side regeneration script can rebuild the full ledger from the authoritative publish record at any time (idempotent by construction).

**Evidence:**
- This is the **Terra pattern applied across the tenant boundary**: the owning runtime serves the projection; the display never reads raw state.
- It is the **NYT/Guardian pattern** verbatim: static page + client-polled, CDN-cached JSON — the choice of the highest-traffic editorial live surfaces in production, chosen *because* the CDN absorbs the thundering herd at ~zero cost (https://source.opennews.org/articles/ny-times-results-loader/; https://rxdb.info/articles/websockets-sse-polling-webrtc-webtransport.html).
- The write is exactly-once by Crossfire's existing machinery: the step runs inside the pipeline's journaled execution, and regeneration-from-the-record makes it self-healing.
- Fits Crossfire's own architecture as a near-adapter: it already models "publish this content to an external surface" for each platform it serves; the feed is one more, lower-stakes surface.
- **No `dispatch` table is created at all**, so constitution Principle II is satisfied vacuously; the `dispatch` schema stays intentionally empty exactly as documented. No database API key is introduced on either side.
- Sanitization boundary sits in Crossfire, the party that knows what is private — matching the industry rule that error/retry/draft surfaces are never public (Buffer/Hootsuite/dlvr.it citations above).

**Consequences:** (+) Dispatch remains 100% static — no adapter, no serverless, no schema change; deploy pipeline untouched. (+) Crossfire independence preserved; the feed writer lives in Crossfire's repo, governed by Crossfire's law. (+) Legal under every clause of docking law without exception requests. (+) Freshness = publish-time push + poll interval (~30–60s to visible), well inside the industry "recent" norm. (−) Requires a Crossfire repo change, and Crossfire's engine is currently paused — until resume, the feed shows real historical publishes only (which the regeneration script can produce today). (−) Introduces one new secret (blob write token) and one new external dependency (object storage). (−) The JSON is public by design — the sanitization step is load-bearing and must be probed.

---

### Alternative C — API seam: Dispatch-owned ingest endpoint + `dispatch.activity` table + cached JSON function (tribe-engine shape)

**How it would work:** Dispatch adds exactly two `prerender = false` Astro routes via `@astrojs/vercel` (Astro 5 default-static mode allows per-route opt-out — https://docs.astro.build/en/guides/on-demand-rendering/; https://vercel.com/docs/frameworks/frontend/astro): (1) `POST /api/crossfire-events` — authenticated by a shared Doppler secret, called by Crossfire's distribute step; it INSERTs into a new `dispatch.activity` table via Dispatch's own role, own schema, DML-only — legal under docking law; (2) `GET /api/activity.json` — reads that table, served with `Cache-Control: s-maxage` so the CDN absorbs the audience and the function runs ~once per window. The table ships as a Dispatch-repo migration with explicit GRANTs and satisfies Principle II: producer = Crossfire-via-seam, probe = the webhook round-trip.

**Evidence:** This is the **tribe-engine precedent** — cross-boundary integration via a remote authenticated API exposed by/for the consuming system, zero shared DSN. It is also the idiomatic Vercel answer when the source is private ("one route becomes dynamic, CDN absorbs load" — https://vercel.com/docs/frameworks/frontend/astro; ISR/s-maxage economics per https://www.shawn.so/blog/isr-astro-vercel-on-demand-incremental-static-regeneration/). Crossfire's side is a plain journaled HTTP POST — the same shape as its existing adapter calls.

**Consequences:** (+) Dispatch gains a durable, queryable activity record it owns — a real foundation if the display ever grows (filtering, per-article pages, history depth). (+) Fully legal; first non-vacuous use of the `dispatch` schema, done by the book. (−) **Breaks Dispatch's pure-static build**: the `@astrojs/vercel` adapter enters a previously static-only pipeline — the largest canon cost of any legal option, and against "static is the substrate" only-just (the *site* stays 99% prerendered, but the deploy artifact changes class). (−) Most moving parts of any option: endpoint auth, a table + migration + probe + CI orphan check, function cold starts, cache tuning (misconfigured `s-maxage` silently hammers the function — Vercel/Astro docs above). (−) Two repos change in lockstep. (−) Serverless + DB is strictly more operational surface than a static JSON file for the same rendered pixels.

---

### Alternative D — Build-time capture + scheduled rebuild (BuildTicker pattern extended; POSSE links baked in)

**How it would work:** A script in the Dispatch build (or a GitHub Actions cron) reads the sanitized feed source and bakes activity into the prerendered HTML — the same mechanism as BuildTicker's git-log capture. Per-dispatch-article "Also on: [Bluesky] [Hashnode] …" syndication links render from frontmatter/JSON at build, per the IndieWeb u-syndication pattern (https://indieweb.org/POSSE; https://indieweb.org/posts-elsewhere). Rebuilds fire on a schedule or on a deploy hook per publish (https://dev.to/chantastic/schedule-netlify-builds-with-github-actions-chron-and-webhooks-17n7; https://aaronsaray.com/2021/github-actions-pages-scheduled-data-updates/).

**Evidence:** Purest static fit philosophically — zero runtime infra, and the strongest in-repo precedent (BuildTicker was itself the honesty-repair pattern). POSSE is the canonical public representation of cross-posting (indieweb.org citations). But: GitHub cron is best-effort and lags under load; honest latency is 5–15 minutes *minimum*, and each event costs a full build + deploy — while Dispatch deploys are **ask-first manual CLI** (`AGENTS.md`), so automated rebuild-per-publish contradicts a standing operational gate unless AK changes that rule.

**Consequences:** (+) Zero new runtime surface; forever-static. (+) The per-article POSSE links are valuable *regardless of the live ticker* and cost almost nothing. (−) "Live" is honestly minutes-to-hours, not seconds — the ticker would feel like a log, not a wire. (−) Rebuild-per-publish collides with the ask-first deploy law; scheduled rebuilds churn deploys for a site whose content otherwise changes rarely. (−) Still needs the same sanitized feed source as B, so it is mostly B minus the freshness.

---

### Ruled out without full write-up

- **SSE / streaming function:** impossible from static files; on Vercel it inverts the cost model (duration-billed long-held connections; 300s edge cap, deprecated standalone Edge Functions — https://vercel.com/changelog/new-execution-duration-limit-for-edge-functions; https://vercel.com/blog/streaming-for-serverless-node-js-and-edge-runtimes-with-vercel-functions). Sub-second push is not a requirement for a publish ticker whose upstream cadence is human-approved posts.
- **WebSockets via vendor (Ably/Pusher/Durable Objects):** bidirectional machinery a read-only ticker never uses; new vendor + connection-priced billing for no UX gain (https://ably.com/blog/websockets-vs-sse; https://github.com/tldraw/tldraw-sync-cloudflare). Remains a compatible bolt-on later — choosing polling now bans nothing (decision is conditional, not binary).
- **Third-party embed widgets (ProveSource/Fomo/Tickaroo/Walls.io):** wrong register (commerce social-proof) or wrong design authority (vendor styling vs the locked CD1–5 canon); real refresh intervals are 6–48h anyway (https://walls.io/features/social-media-aggregator; https://provesrc.com/).

---

## Scored comparison

Scale 1–5 (5 best). Weights reflect the binding constraints: law compliance and independence are gates, not preferences.

| Criterion | A · Cross-schema read | B · Crossfire-published ledger + poll | C · API seam + `dispatch` table | D · Build-time + cron |
|---|---|---|---|---|
| Prime/Lane-P law compliance | 1 — forbidden by probe matrix | 5 — no exception needed, no new table | 5 — legal, by-the-book Principle II | 4 — legal; deploy-law tension |
| Crossfire independence (owns its data, its repo, its law) | 1 — couples schemas | 5 — Crossfire serves its own projection (Terra pattern) | 4 — Crossfire calls out to a foreign endpoint | 5 — read-only consumption |
| Dispatch static-first fidelity (`AGENTS.md`, canon) | 3 | 5 — zero adapter, zero server | 2 — adapter enters the pipeline | 5 — purest static |
| Freshness vs "live" intent (industry norm: recent, not sub-second) | — | 4 — seconds-to-a-minute | 4 — same, after cache window | 2 — minutes-to-hours |
| Operational cost / new surface | — | 4 — one storage bucket + one token | 2 — endpoint auth + table + function + cache tuning | 3 — CI cron + deploy churn vs ask-first law |
| Privacy control (success-only, sanitized) | 2 — raw schema exposure risk | 5 — sanitizer lives with the data owner | 4 — sanitizer at the seam | 5 — same source as B |
| Industry precedent strength (cited) | 0 | 5 — NYT/Guardian + POSSE + Buffer schema | 4 — tribe-engine + Vercel first-party docs | 3 — GH-Pages cron patterns |
| Build effort to walking skeleton | — | 4 — script + JSON + one island | 2 — two routes, migration, probe, auth | 4 — script + component |
| **Total (gates bold)** | **eliminated** | **37** | **27** | **31** |

---

## Recommendation

**Adopt Alternative B — Crossfire publishes a sanitized public activity ledger (`activity.json`) to CDN-backed object storage as a journaled post-distribution step; Dispatch renders it with a client-polled ticker island — and fold in D's POSSE per-article syndication links at build time as a later phase.**

Rationale, front-loaded:

1. **It is the only option that satisfies every gate with zero exceptions.** No cross-schema access (the writer reads only its own schema under its own role), no new table (Principle II vacuously satisfied; the `dispatch` schema stays empty as documented), Dispatch stays 100% static (no adapter, no function), Crossfire stays sovereign (the feed step lives in Crossfire's repo, governed by its own law), and the one new secret lives in Doppler alongside the pipeline's existing secrets.
2. **It has the strongest precedent on both axes.** Internally it is the Terra invariant — the owning runtime serves the projection — extended across the tenant boundary. Externally it is the exact production pattern of the highest-stakes static live surfaces (NYT election JSON off a static CDN host — https://source.opennews.org/articles/ny-times-results-loader/) and the POSSE/Buffer event schema for what each event shows and hides (https://indieweb.org/POSSE; https://developers.buffer.com/guides/posts-and-scheduling.html).
3. **It is decision-shaped, not a dead end** (conditional per the conduct mandate): if Dispatch later needs queryable history, filtering, or per-article activity pages → promote to Alternative C (the seam + `dispatch.activity` table), which this choice does not foreclose. If sub-second push or reader interaction ever becomes real → SSE/WebSocket vendors bolt onto the same JSON contract. If AK wants the permanent per-article record → Phase 4's POSSE links are additive.
4. **Honesty properties are structural.** The feed derives exclusively from the authoritative, append-controlled record of real live publishes — so fabricated activity is impossible by construction, honoring the 2026-06-11 honesty-repair law. Failures, retries, quarantines, drafts, and operator identities never enter the feed, matching the operator-only norm for error surfaces.
5. **The engine-paused state is handled, not hidden.** The regeneration script produces the real historical ledger today, so the walking skeleton ships against real data before the engine resumes; the display carries honest absolute timestamps and a "last updated" stamp rather than a fake pulse.

**Event contract (v1)** — five fields per entry plus feed metadata, per the researched schema:

```json
{
  "generated_at": "ISO-8601",
  "attribution": "Posted automatically by Crossfire",
  "events": [{
    "platform": "bluesky",
    "url": "https://bsky.app/profile/…",
    "published_at": "ISO-8601",
    "title": "…",
    "excerpt": "1–2 lines, from the approved variant only"
  }]
}
```

Success-only; no status field needed (presence = success). The standing "posted automatically" attribution mirrors the platform-level disclosure norm (https://devcommunity.x.com/t/automated-by-label/235210).

---

## Phased build plan (walking skeleton first; probe-before-harden)

**Phase 0 — Probe (Crossfire repo, read-only, no engine change).**
A one-off export script: connect via Crossfire's own credentials (Doppler), SELECT from the publish record for title/excerpt, emit `activity.json` per the v1 contract, PUT to the chosen storage, `curl` the public URL green. This is the load-bearing probe: it proves the sanitization boundary, the storage choice, and the CDN path before any prose hardens. Honors Crossfire repo law (read-only; no publish-path touch).

**Phase 1 — Walking skeleton (Dispatch repo).**
One client island (working name `LiveWire`) polling the JSON every 30–60s with Page Visibility pause (NYT/Guardian pattern), rendering the five-field entries with absolute timestamps + page-level "last updated," empty/paused state included. Placement + treatment minimal — real data, real links, zero styling ambition yet. Gates: `pnpm exec tsc --noEmit` clean; deploy is **ask-first** with the mandatory post-deploy `curl -sI https://dispatchmag.dev/` 200 check (`AGENTS.md`).

**Phase 2 — Durable writer (Crossfire repo, engine-adjacent; sequenced with the engine resume).**
Promote the Phase-0 export into a journaled step after distribution (exactly-once via the pipeline's journal), regenerating the full feed from the publish record on each publish (idempotent by construction). The storage token rides Doppler into the pipeline host's environment. The export script stays as the manual backfill/repair path. This phase touches the engine and therefore waits for, or rides with, "the engine resume" — AK sequences it.

**Phase 3 — Editorial treatment (Dispatch repo, ask-first on canon).**
GSAP/motion ticker treatment per the JS-first doctrine and Tier-1 stack (`.claude/CLAUDE.md`), 12px legibility floor, letterpress classes on the cartographic substrate, wordmark rule respected. Visual canon is locked (CD1–5) — treatment proposals go to AK before shipping.

**Phase 4 — POSSE per-article record (Dispatch repo, additive).**
Bake "Also on: [platform] [platform]" u-syndication links into each dispatch article page at build time from the same ledger (https://indieweb.org/syndication-link-use-cases) — the permanent, crawlable record that outlives the ticker's window.

**Explicitly out of scope:** any `dispatch` schema table (no producer chosen — Alternative C is the recorded upgrade path); any pipeline exposure; any failure/retry/queue display; engagement metrics.

---

## Consequences

**Positive.** Dispatch gets a real, honest, near-live showcase of Crossfire — both products fulfilling their Prime-canon showcase roles — with zero new server surface on Dispatch and zero governance exceptions. The feed contract becomes a stable public seam either side can evolve behind. The regeneration script doubles as disaster recovery.

**Negative / accepted costs.** Crossfire's repo takes on a small public-output responsibility (a new class of consumer for its data, gated by the sanitizer); one new Doppler secret and one storage dependency; the ticker's liveness is poll-bounded (~1 min), not push; until the engine resumes, the wire shows history, not motion. The sanitizer is now load-bearing: a regression there is a privacy leak, so Phase 0's probe and a feed-shape check belong in Crossfire CI (fail-loud).

**Supersession.** If AK later selects Alternative C (table + seam), this ADR is marked superseded and linked, per Principle V — no silent overwrite.

---

## Decided questions (all nine resolved)

1. **Storage seam:** Vercel Blob public store — Addendum D1. (AK, 2026-08-17)
2. **Placement:** both surfaces — homepage ticker + `/wire` page. (AK, 2026-08-17)
3. **Excerpt exposure:** rich-but-compact card, excerpt included — Addendum D3. (AK, 2026-08-17)
4. **History depth:** rolling 50 events / 30 days. (AK, 2026-08-17)
5. **Substack:** the feed carries only entries with a real live URL — filter `external_url` non-empty. Platforms whose flow completes manually stay out until a real link exists; each platform appears the moment a real URL does. (AK, 2026-08-17, kickoff gate)
6. **Engine-paused messaging:** silent — honest timestamps only. Cards carry absolute/relative timestamps; the feed level shows "updated Xm ago" from `generatedAt`. No cadence commentary; the live surface carries current truth only. (AK, 2026-08-17, kickoff gate)
7. **Phase-2 sequencing:** the journaled feed-writer step rides WITH the engine resume — one engine-touch event, one verification pass. Until then the export script is the manual refresh path. (AK, 2026-08-17, kickoff gate)
8. **Poll cadence:** 60s homepage ticker · 30s `/wire`. (AK, 2026-08-17, kickoff gate)
9. **Future fork:** Alternative C (API seam + `dispatch.activity` table) is pre-approved as the upgrade path if per-article activity pages or queryable history become wanted — that session builds directly and marks this ADR superseded per Principle V. (AK, 2026-08-17, kickoff gate)

---

*Status: **Accepted** (AK, 2026-08-17; the Addendum below holds the researched decisions; all nine questions are decided — 5–9 resolved at the build-session kickoff gate, 2026-08-17). Every architectural claim above carries its citation; the Phase-0 probe is the next artifact — not more prose.*

---

## Addendum — researched decisions (2026-08-17)

> Status: **accepted** (AK, 2026-08-17). Supplements ADR-0001 "Dispatch Live Wire." AK's standing decisions honored: both surfaces (homepage ticker + `/wire` page) · rolling 50-event/30-day window · Crossfire writes sanitized `activity.json`, Dispatch polls. Three research questions resolved below; each carries its citations.

---

### D1 — Storage + delivery rail: **Vercel Blob (public store)**

**Decision.** Crossfire writes the ledger with `put(path, json, { access: 'public', allowOverwrite: true, cacheControlMaxAge: 60, contentType: 'application/json' })` using `BLOB_READ_WRITE_TOKEN` (Vercel's documented off-platform credential); Dispatch polls the public blob URL directly.

**Load-bearing rationale.**
- **Freshness fits the contract.** Blob's `cacheControlMaxAge` floor is exactly 60s — "the maximum time needed for our cache to update content behind a blob URL"; overwrites propagate ≤60s. The 30–60s polling contract is honored at its 60s bound, no purge API needed. ([vercel.com/docs/vercel-blob/public-storage](https://vercel.com/docs/vercel-blob/public-storage), [vercel.com/docs/vercel-blob](https://vercel.com/docs/vercel-blob))
- **The exact pattern is vendor-sanctioned:** a mutable JSON file at a stable URL, refreshed on a schedule, via `allowOverwrite: true`. ([vercel.com/docs/vercel-blob](https://vercel.com/docs/vercel-blob))
- **Atomic + consistent.** Blob is S3-backed; S3 has strong read-after-write consistency on overwrite PUTs (since Dec 2020), and object-store PUTs are whole-object atomic — a reader can never observe a half-written ledger. `ifMatch` ETag conditional writes exist if writers ever multiply. ([aws.amazon.com/s3/consistency](https://aws.amazon.com/s3/consistency/), [vercel.com/docs/vercel-blob](https://vercel.com/docs/vercel-blob))
- **CORS is zero-config.** Verified first-hand by curl: public blob URLs ship `access-control-allow-origin: *` + ETag; the CDN answers `If-None-Match` with 304s automatically. (curl vs. public blob URL; [vercel.com/docs/vercel-blob/public-storage](https://vercel.com/docs/vercel-blob/public-storage))
- **~$0 at this scale; zero new vendors.** Cache HITs are free; the reader is already on Vercel; the writer needs one env var + `@vercel/blob`. Single-vendor per 12-factor backing-services + Choose Boring Technology — don't spend an innovation token on a second cloud for a 100KB file. ([vercel.com/docs/vercel-blob/usage-and-pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing), [12factor.net/backing-services](https://12factor.net/backing-services), [mcfunley.com/choose-boring-technology](https://mcfunley.com/choose-boring-technology))

**Conditionals (not bans).**
- If the contract tightens to a hard 30s → same-origin Vercel Function wrapper on dispatchmag.dev (`get()` with `useCache: false`, respond `s-maxage=30, stale-while-revalidate`) — Vercel's own escalation path, still one vendor. ([vercel.com/docs/vercel-blob/public-storage](https://vercel.com/docs/vercel-blob/public-storage), [RFC 5861](https://www.rfc-editor.org/rfc/rfc5861))
- If the account is Hobby AND writes exceed ~10K puts/month → Hobby hard-blocks Advanced Operations; the runner-up (JSON endpoint on the pipeline's existing host, `Cache-Control: public, max-age=30` + explicit CORS) becomes correct.

**Rejected.**
- **Cloudflare R2 + custom domain** — best cache semantics, but requires dispatchmag.dev's DNS in a Cloudflare zone that doesn't exist in this stack, plus a cache rule (JSON uncached by default) and a rate-limited dev fallback. A second vendor + DNS migration to beat 60s by 30s. Conditional: front-runner if Cloudflare ever enters the stack. ([developers.cloudflare.com/r2/buckets/public-buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/))
- **S3 + CloudFront** — AWS's own docs recommend against invalidation-per-write for frequently updated files; versioned filenames defeat a stable polled URL; heaviest ops surface (IAM, bucket policy, distribution, CORS config) for a 100KB file. ([docs.aws.amazon.com — Invalidation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html))
- **Commit-to-repo / redeploy** — turns a data plane into a deploy plane; violates 12-factor build/run separation; deploy latency alone breaks freshness. ([12factor.net/build-release-run](https://12factor.net/build-release-run))
- **Pipeline-origin endpoint** — legitimate runner-up (exact freshness, self-set CORS), rejected as default because it couples feed availability to pipeline-host uptime/redeploys and puts no CDN in front. Activates under the Hobby conditional above.

---

### D2 — Dual-surface architecture: **one contract, one data layer, two islands**

**Decision.** ONE versioned JSON feed contract + ONE module-scope polling store shared via `useSyncExternalStore` + TWO presentation islands (`WireTicker` on the homepage, `WirePage` on `/wire`). Both Astro pages prerender the last-known feed at build; islands hydrate over the snapshot.

**Load-bearing rationale.**
- **One-contract-N-surfaces is the production norm:** NYT election "Results-as-a-Service" (one JSON API, many boards), Statuspage (page and embed widget both wrap the same `/api/v2` endpoints — summary slice vs. history slice), Guardian live blogs (one `?lastUpdate=` contract polled by a client island). ([source.opennews.org — NYT results loader](https://source.opennews.org/articles/ny-times-results-loader/), [metastatuspage.com/api](https://metastatuspage.com/api), [guardian/dotcom-rendering — Liveness.island.tsx](https://github.com/guardian/dotcom-rendering))
- **Polling discipline has documented defaults:** pause when `document.hidden` (MDN names it the canonical Page Visibility use case), revalidate on focus/reconnect (SWR defaults), exponential backoff with full jitter on failure (AWS), cheap steady-state via ETag/`If-None-Match` → 304. ([MDN Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), [swr.vercel.app/docs/revalidation](https://swr.vercel.app/docs/revalidation), [AWS backoff+jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/), [MDN conditional requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests))
- **Prerender is an SEO/failure floor, not decoration:** Google's render queue defers JS-fetched content; Astro renders islands to HTML at build for free — the snapshot guarantees real first-paint HTML and a non-empty page with JS off or feed down. ([docs.astro.build/en/concepts/islands](https://docs.astro.build/en/concepts/islands/), [Google JS SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics))
- **Failure UX = stale + honest timestamp**, never blank or spinner: keep last-good entries rendered, show "updated Xm ago", flip a quiet "reconnecting" state only after K consecutive failures (Guardian degrades silently; SWR keeps last-good through failed revalidations). ([Liveness.island.tsx](https://github.com/guardian/dotcom-rendering), [swr.vercel.app/docs/revalidation](https://swr.vercel.app/docs/revalidation))

**Rejected.**
- **Per-surface fetch logic** — doubles requests, lets surfaces disagree mid-poll, contradicts every studied precedent. Slice in the component, not the network.
- **WebSockets/SSE** — static site on CDN; persistent connections need an always-on origin; wire cadence (minutes) doesn't justify sockets.
- **Client-only `/wire`** — SEO liability, spinner first paint, blank failure state; the build snapshot is free.
- **Polling hidden tabs** — Guardian's breaking-news override, waste for a microsite; revalidate-on-focus recovers instantly.
- **SWR/TanStack as a dependency** — the needed subset is ~100 lines, and Astro islands are separate React roots, so SWR's in-tree dedup doesn't apply; a module-singleton store is what actually shares one in-flight request. Keep SWR's defaults as the spec, not the dependency.
- **iframe embed of the wire** — Statuspage's widget is for third-party sites; Dispatch owns both surfaces in one repo. Copy the one-contract idea, not the delivery mechanism.

---

### D3 — Card design: **rich-but-compact card** (AK's lean confirmed by research)

**Decision.** Rich card in a static stacked feed — never a marquee/auto-scrolling ticker. The excerpt stays: for a pipeline showcase, the excerpt IS the proof-of-quality; a bare row looks like a log, not a magazine.

**Load-bearing rationale.**
- **Marquee is the documented anti-pattern:** auto-moving UI reads as advertising and gets ignored; animation's hypnotic effect reduces retention; frequent animation must be subtle and short — favoring a one-shot staggered entrance. ([nngroup.com/articles/auto-forwarding](https://www.nngroup.com/articles/auto-forwarding/), [animation-usability](https://www.nngroup.com/articles/animation-usability/))
- **WCAG 2.2.2 (Level A):** auto-updating content has NO 5-second grace — pause/stop/hide required from the first update; resume must jump to CURRENT data, never replay stale items. ([w3.org — pause-stop-hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html))
- **Canonical markup exists:** WAI-ARIA APG Feed pattern — `role="feed"` + `aria-busy`, items as `<article>` with `aria-posinset`/`aria-setsize`/`aria-labelledby`/`aria-describedby`. ([w3.org/WAI/ARIA/apg/patterns/feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/))
- **Excerpt earns its place:** a short snippet adjacent to a link augments information scent and click-through when it adds detail the title lacks; ~79% of users scan — clamp to 1–2 lines, front-load. ([nngroup.com/articles/information-scent](https://www.nngroup.com/articles/information-scent/), [writing-links](https://www.nngroup.com/articles/writing-links/))
- **Card anatomy is design-system consensus** (badge → verb → title → excerpt → timestamp): Primer Timeline, SLDS Activity Timeline, Material 3 cards converge on it. ([primer.style — timeline](https://primer.style/product/components/timeline/), [SLDS activity timeline](https://v1.lightningdesignsystem.com/components/activity-timeline/), [m3.material.io/components/cards](https://m3.material.io/components/cards/guidelines))
- **Timestamps:** relative display wrapped in `<time datetime="ISO">` with absolute on hover; switch to absolute past ~7 days. ([cloudscape.design/patterns/general/timestamps](https://cloudscape.design/patterns/general/timestamps/))

**Rejected.** Continuous marquee (NN/g + WCAG cost, no benefit) · minimal row (discards scent; log-not-magazine) · full rich-media card with thumbnails (slows scanning; invites banned placeholder media) · `aria-live="assertive"` (MDN: disruptive; publishes are status, not emergencies) · ticking timestamps inside the live region (screen-reader spam) · whole-card anonymous click target (breaks link rotor; a real `<a>` on the title, JS wrap allowed but never replaced).

---

### Revised Phase 1 scope (supersedes the prior single-surface scope)

**Rail (Crossfire side).**
1. Vercel Blob public store connected to the dispatch project. Public access at creation (access mode is immutable after).
2. Writer step: `@vercel/blob` `put('activity/ledger.json', …, { access: 'public', allowOverwrite: true, cacheControlMaxAge: 60, contentType: 'application/json' })`. Token in Doppler → the pipeline host's env, never code.
3. Write-frequency gate checked against plan (Hobby: 10K puts/month, blocks on overrun).
4. Empirical fidelity gate: overwrite, curl the public URL every 10s, confirm new ETag ≤60s — before "done."

**Contract + data layer (Dispatch side).**
5. One feed contract (shape in "v1 event contract" below), newest-first, capped at 50 entries / 30 days per AK's window. Build-time snapshot module imported by both pages; the poll URL is a single constant (swap-able later without touching consumers).
6. `src/lib/wire/store.ts` — module-scope singleton `{ snapshot, status: 'live'|'stale'|'paused'|'reconnecting', lastFetched }`, `subscribe`/`getSnapshot` for React 19 `useSyncExternalStore`. Poll: `fetch(url, { cache: 'no-cache' })` (browser sends `If-None-Match`; CDN 304s are free); base 60s ticker-page / 30–45s on `/wire`; pause on `document.hidden`, immediate revalidate on `visibilitychange`/`focus`/`online`; on failure `min(cap, base·2ⁿ)·random()` full jitter, reset on success. No cache-busting query params (forces billed MISSes).

**Surfaces.**
7. `WireTicker.tsx` — homepage, `client:idle`, motion/GSAP cycle of latest 3–5, transform+opacity only.
8. `WirePage.tsx` — `/wire`, `client:load`; full 50-entry history grouped by day, platform filter pills, `id={entry.id}` anchor permalinks, "updated Xm ago" line, Guardian-style "N new updates" toast when scrolled below fold.
9. Both pages prerender the build snapshot (same feed module in frontmatter); islands hydrate over identical HTML. `<noscript>` keeps the list. Empty state only when the snapshot itself is empty.
10. Failure UX: never unmount rendered entries; "reconnecting" pill (12px emboss, no alarm styling) only after 3 consecutive failures; timestamp derives from `lastFetched`, never a spinner.
11. Verification gates: `pnpm exec tsc --noEmit`; Interceptor pass on both surfaces (confirm 304s on second poll, confirm pause on hidden tab in the network log); grep `global.css` tag selectors before any `<section>`/`<header>` wrapper.

### Card spec + motion/accessibility — build requirements

**Card content (top→bottom, per publish).**
1. Platform badge: icon + visible text label + brand-color accent rail — color reinforcement only, never sole indicator (WCAG 1.4.1). Verify icons exist in lucide-react v1.14 (no Linkedin/Instagram — text or custom SVG).
2. Verb line: "Published to {platform}" — 12px caps, `.dispatch-emboss`.
3. Title = the card's single real `<a>` to the platform post, keyword-first, `rel="noopener"`; platform via `aria-describedby`, not repeated in link text.
4. Excerpt: optional, 1–2 lines, plain text (markdown stripped), `line-clamp: 2`, only when it adds scent beyond the title.
5. Timestamp: `<time datetime="ISO-8601" title="absolute">4 min ago</time>`; absolute past ~7 days.
6. Optional provenance chip: "via Crossfire" — this IS the story.

**Markup.** Container `role="feed"` + `aria-labelledby` + `aria-busy`; items `<article tabindex="0" aria-posinset aria-setsize aria-labelledby aria-describedby>`. PageDown/PageUp traversal + Ctrl+Home/End escape on `/wire` (>5 items). Prefer `div`/`article` over semantic tags (global.css cascade).

**Live updates.** Visually-hidden announcer `aria-live="polite" aria-relevant="additions" aria-atomic="false"`, present in initial HTML. One sentence per new publish; NEVER announce timestamp re-ticks. Visible "Pause updates" `<button>` (≥24px target); resume shows CURRENT state with "{n} new publishes" affordance — never replays backlog (WCAG 2.2.2).

**Motion.** Entrance opacity 0→1 + y 12→0, 0.35–0.45s, stagger 0.06–0.09s, once on scroll-into-view or prepend — never looping. New-item badge pulse ≤600ms, transform-safe props. transform+opacity ONLY. Gate via `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` / `useReducedMotion`; reduced branch = instant or opacity-only ≤0.2s. No `pin:true` + `pinSpacing:false` on full-viewport variants.

**Type/color.** All text ≥12px (house floor), sized in rem (WCAG 1.4.4 — 200% resize must hold); brand colors 4.5:1 as text, 3:1 as rail against the substrate — brand hue stays on the icon, compliant tint for text where it fails. Per-cycle accent tokens hardcoded in `@theme inline` AND overridden in `[data-prime-cycle]`.

**Verify before done.** tsc clean · VoiceOver pass (feed nav, one polite announcement per item, no timestamp chatter) · macOS Reduce Motion toggle · keyboard-only pass · 200% zoom reflow.

### v1 event contract — updated (supersedes prior draft)

The card spec and dual-surface architecture require fields beyond the prior `platform/url/published_at/title/excerpt`:

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-08-17T14:03:00-05:00",
  "entries": [
    {
      "id": "2026-08-17-x-prime-cell-proof",
      "ts": "2026-08-17T14:03:00-05:00",
      "platform": "x",
      "kind": "publish",
      "title": "Prime passes the Cell Proof",
      "url": "https://x.com/...",
      "excerpt": "First 180 chars, plain text, markdown stripped, generated at publish time…",
      "pipeline_run": "crossfire-run-0042"
    }
  ]
}
```

New vs. prior draft: **`schemaVersion`** (contract evolution without breaking pollers) · **`generatedAt`** (feed-level "updated Xm ago" + staleness honesty) · **`id`** (stable slug — `/wire#{id}` anchor permalinks, React keys, announcer dedup) · **`kind`** (enum, extensible beyond `publish`) · **`pipeline_run`** (provenance chip). Constraints: `ts` ISO-8601 with offset; `excerpt` optional, ≤~180 chars plain text, emitted by Crossfire at publish time (never scraped at render); entries newest-first, capped 50 / 30 days; Crossfire owns sanitization before write. `permalink` is derivable (`'/wire#' + id`) — computed client-side, not stored.
