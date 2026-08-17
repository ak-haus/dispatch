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
	integrations: [react(), mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
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
