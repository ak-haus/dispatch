/**
 * DISpatch design tokens — Tailwind theme export.
 *
 * Canonical token values exposed as a typed JavaScript object so consumers
 * (Storybook, design-system docs, future Buildings, code generation) can
 * import without parsing CSS.
 *
 * Authority chain (matches tokens.css):
 *   1. representation/visual-system/color.md (CD2 ratified)
 *   2. cd2-color-amendment-proposal.md (Mayor-locked 2026-05-10) — amends §5,
 *      adds Decision 8 (tonal-stepping nav copper-default register)
 *
 * Tailwind v4 note: this site uses CSS-first `@theme inline` in global.css
 * to expose utilities; this TS export is the canonical artifact for tooling
 * that wants the values as data. Both stay in sync via the shared :root in
 * tokens.css.
 */

export const dispatchTokens = {
	platform: {
		'accent-prime': {
			value: '#8e2532',
			description:
				'Atlantic-pigment editorial red. Wordmark DIS color; focus-ring color; live-signal accent. Amended 2026-05-10 from #c8392b alarm vermilion.',
			usage: ['wordmark.dis', 'focus.ring', 'live.signal', 'dispatch.lane.strong'],
		},
		'accent-prime-active': {
			value: '#6b2520',
			description:
				'Wine intermediate for nav active state. Sits chromatically between copper and wordmark-red per illuminated-manuscript graduated discipline.',
			usage: ['nav.active'],
		},
		copper: {
			value: '#b87333',
			description:
				'Prime-platform-wide gilded identity. Nav default link color. Cross-Building DNA.',
			usage: ['nav.default'],
		},
		'copper-deep': {
			value: '#8b5224',
			description: 'Nav hover state — engagement deepening within copper register.',
			usage: ['nav.hover'],
		},
		'text-body-strong': {
			value: 'oklch(0.18 0.012 88)',
			description: 'Primary text. Warm-bias near-black paired with Vellum substrate.',
			usage: ['body.text', 'wordmark.patch', 'h1.h2.h3'],
		},
		'wordmark-dis': {
			value: 'var(--platform-accent-prime)',
			description: 'Wordmark DIS portion — Inferno-surfacing red (Option C §5.2).',
			usage: ['wordmark.dis'],
		},
		'wordmark-patch': {
			value: 'var(--platform-text-body-strong)',
			description: 'Wordmark patch portion — institutional dark serif.',
			usage: ['wordmark.patch'],
		},
	},
	dispatch: {
		'lane-editorial-strong': {
			value: 'oklch(0.55 0.16 41)',
			description: 'Editorial lane (warm-earth family). Filed-under labels, pull-quote borders.',
			usage: ['lane.editorial', 'pullquote.border'],
		},
		'lane-institutional-strong': {
			value: 'oklch(0.41 0.043 257)',
			description: 'Institutional lane (cool-mineral family). Hairlines, DLDS chrome.',
			usage: ['lane.institutional', 'hairlines', 'dlds.chrome'],
		},
		'lane-dispatch-strong': {
			value: 'var(--platform-accent-prime)',
			description: 'Dispatch lane inherits Prime accent-prime — Inferno cosmology link.',
			usage: ['lane.dispatch', 'kicker.color'],
		},
		'text-body-muted': {
			value: 'oklch(0.48 0.010 88)',
			description: 'Muted body text — dek, meta row, secondary copy.',
			usage: ['body.muted'],
		},
		'text-body-faint': {
			value: 'oklch(0.65 0.008 88)',
			description: 'Faint body text — captions, volume label, separators.',
			usage: ['body.faint'],
		},
		'vellum-25': {
			value: 'oklch(0.99 0.012 88)',
			description: 'Vellum-25: warmest, lightest. Aliased as --sky-high.',
			usage: ['sky-high'],
		},
		'vellum-50': {
			value: 'oklch(0.985 0.010 88)',
			description: 'Vellum-50: Tailwind interop step (reserved).',
			usage: [],
		},
		'vellum-100': {
			value: 'oklch(0.96 0.015 88)',
			description: 'Vellum-100: default page background. Aliased as --sky-low.',
			usage: ['sky-low', 'page.background'],
		},
		'vellum-200': {
			value: 'oklch(0.92 0.025 88)',
			description: 'Vellum-200: atmospheric reflectivity. Aliased as --reflect.',
			usage: ['reflect'],
		},
		'vellum-300': {
			value: 'oklch(0.87 0.035 88)',
			description:
				'Vellum-300: warm yellow shift of incandescent room light. Aliased as --window-warm.',
			usage: ['window-warm'],
		},
	},
	asset: {
		'cartography-pulse': {
			value: 'oklch(0.45 0.18 22)',
			description:
				'Cartography asset pulse — dispatch lights popping up on the city map. Inherits Prime accent at darker variant.',
			usage: ['cartography.markers'],
		},
	},
	// Nav state pattern (Decision 8 tonal-stepping).
	// Documented as a coherent state set so downstream consumers can validate
	// the gradient discipline (copper → copper-deep → wine → wordmark-red).
	navStatePattern: {
		default: 'var(--platform-copper)',
		hover: 'var(--platform-copper-deep)',
		active: 'var(--platform-accent-prime-active)',
		focusOutline: 'var(--platform-accent-prime)',
		disabled: 'opacity: 0.35',
		discipline: 'illuminated-manuscript graduated-red',
	},
} as const

export type DispatchTokens = typeof dispatchTokens
