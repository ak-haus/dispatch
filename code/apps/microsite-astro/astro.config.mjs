// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

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
		plugins: [tailwindcss()],
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
