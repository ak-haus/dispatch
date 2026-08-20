// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// Source-map upload for A6's error tracking. ARMS ON THE TOKEN and on nothing
// else: `SENTRY_AUTH_TOKEN` is set on the Vercel project for PRODUCTION only, so
// preview builds and every CI gate run with it absent — the plugin is `disable`d,
// no map is emitted, and CI stays hermetic (no network, no credentials, byte
// output unchanged). Same arms-on-token posture as the DSN, PostHog and Chromatic.
//
// Without uploaded maps Sentry still reports every error; the frames just read
// `t is not a function at chunk-abc.js:1:4823`. With them, the trace names the
// source line.
//
// ONE HONEST CONSEQUENCE, measured 2026-08-20. The plugin stamps a debug ID into
// every emitted chunk, so a production build is slightly heavier than the one CI
// measures: +2,504 bytes gzipped across all 30 chunks, ~83 bytes each, +0.74%.
// A page fetches a handful of chunks, not all 30, so the real per-page cost is a
// few hundred bytes against budgets of 3MB / 600KB / 1MB. It is noise — but it
// does mean `lighthouse (budget ratchet)` measures a build marginally lighter
// than the one readers get. The floor stays STABLE (every CI run is tokenless,
// so the offset is constant), which is what a ratchet needs; it is simply
// optimistic by a known 0.74%.
const SENTRY_UPLOAD = Boolean(process.env.SENTRY_AUTH_TOKEN)

// Prime DISpatch — Astro 6 editorial surface.
// Lives at code/apps/microsite-astro (pnpm workspace member).
//
// Workspace-runtime correctness:
//  - `dedupe` prevents pnpm peer-dep hoisting from producing two copies of React,
//    which would error at island hydration with 'createRoot not exported from
//    react-dom/client.js'.
//  - `optimizeDeps.include` pre-bundles React 19's ESM build so client islands
//    hydrate cleanly in dev.
//
// MDX is enabled so articles can embed inline components (PullQuote, Figure,
// MapReveal, etc.) at exact paragraph anchors — the editorial primitive for
// scroll-orchestrated narrative content.
//
// https://astro.build/config
export default defineConfig({
	site: 'https://dispatchmag.dev',
	integrations: [
		react(),
		mdx(),
		// /preview/* are internal QA + design-system reference surfaces (the
		// token canon and the S4 figure proving ground), never public IA — so
		// they stay out of the sitemap we hand crawlers. They also carry
		// noindex via StackLayout. The e2e + judge specs still reach them by
		// direct path; only article discovery reads the sitemap.
		sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/preview/') }),
	],
	vite: {
		plugins: [
			tailwindcss(),
			// LAST in the list on purpose — the plugin has to see the final bundle
			// to stamp its debug IDs into it.
			sentryVitePlugin({
				org: 'prime-city',
				// Verified against the Sentry API at wiring rather than assumed: with
				// this token's `project:releases` scope, `javascript-astro` answers 200
				// and `dispatch`/`prime-dispatch`/`dispatchmag` all 404. It is Sentry's
				// default name from project creation; renaming it is AK's click and
				// would need this string changed with it.
				project: 'javascript-astro',
				authToken: process.env.SENTRY_AUTH_TOKEN,
				disable: !SENTRY_UPLOAD,
				// No build-time telemetry to the vendor. The stage is costed at $0 and
				// nothing here needs to phone home about our CI.
				telemetry: false,
				sourcemaps: {
					// Upload, then DELETE. The maps exist for the length of the build and
					// never reach the CDN, so the deploy carries no extra weight and the
					// A4 byte ratchet is untouched. Sentry matches events to maps by the
					// debug IDs stamped into both — not by URL — so nothing needs the
					// files to remain reachable, and no `release` has to be threaded
					// through the runtime for the trace to resolve.
					filesToDeleteAfterUpload: ['./dist/**/*.map'],
				},
			}),
		],
		// Sentry's tree-shaking levers (Golden Board A6, error-tracking half).
		// The SDK ships tracing and debug-logging code that error monitoring does
		// not need; these two globals are the documented way to have the bundler
		// drop them. A6 is the ERROR row — field performance is not in scope, and
		// the lab floor is A4's Lighthouse ratchet — so tracing goes.
		//
		// This is also the seam that makes `client.ts` deliberately NOT pass the
		// `tracesSampleRate` the observability primitive computes: with tracing
		// shaken out, passing it would be dead config reading as a live decision.
		// Turning field tracing on later means undefining this AND passing that
		// field — one line each, in that order.
		define: {
			__SENTRY_DEBUG__: 'false',
			__SENTRY_TRACING__: 'false',
		},
		build: {
			// 'hidden' emits the maps but omits the `//# sourceMappingURL=` comment,
			// so no browser ever asks for them — the upload is the only consumer, and
			// it deletes them afterwards. Gated on the token so a build without one
			// (every CI gate, every preview) emits byte-identical output to before
			// this plugin existed.
			sourcemap: SENTRY_UPLOAD ? 'hidden' : false,
		},
		resolve: {
			dedupe: ['react', 'react-dom'],
		},
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-dom/client'],
		},
	},
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark-dimmed',
			},
			wrap: true,
		},
	},
})
