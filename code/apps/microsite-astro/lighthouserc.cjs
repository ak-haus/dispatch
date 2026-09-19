/**
 * Lighthouse budget (Golden Board A4) — a RATCHET, not an aspiration.
 *
 * Ceilings sit ~15–25% above the 2026-08-18 measured baseline so CI blocks
 * REGRESSIONS from today's floor; the two known defects stay visible on the
 * Golden Board as their own repair rows and tighten this file when fixed:
 *   /            perf 65 · LCP 13.2s (map-hero image cost) · 2.3MB
 *   /wire/       perf 95 · LCP 2.6s · 374KB
 *   /dispatch/…  perf 54 · LCP 5.4s · CLS 0.345 (article layout shift)
 * B13 re-measured 2026-09-19 (Lighthouse 12.6.1, mobile, simulated, 3 runs on a
 * local build): article CLS 0.0285, so the 0.42 ceiling tightens to 0.05 — the
 * home surface's ceiling. That leaves headroom for CI's hermetic build, which
 * renders without the licensed PP faces, until CI's own reading tightens it further.
 * Lab metrics: LCP/CLS/TBT (TBT is the lab proxy for INP; INP is field-only).
 * Hermetic: static dist served locally, no feed URL, no credentials.
 */

module.exports = {
	ci: {
		collect: {
			staticDistDir: './dist',
			url: [
				'http://localhost/',
				'http://localhost/wire/',
				'http://localhost/dispatch/dispatch-01/',
			],
			numberOfRuns: 3,
		},
		assert: {
			assertMatrix: [
				{
					matchingUrlPattern: '://localhost:\\d+/$',
					assertions: {
						'categories:performance': ['error', { minScore: 0.55 }],
						'largest-contentful-paint': ['error', { maxNumericValue: 17000 }],
						'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
						'total-blocking-time': ['error', { maxNumericValue: 400 }],
						'total-byte-weight': ['error', { maxNumericValue: 3145728 }],
					},
				},
				{
					matchingUrlPattern: '/wire/$',
					assertions: {
						'categories:performance': ['error', { minScore: 0.85 }],
						'largest-contentful-paint': ['error', { maxNumericValue: 4500 }],
						'cumulative-layout-shift': ['error', { maxNumericValue: 0.08 }],
						'total-blocking-time': ['error', { maxNumericValue: 300 }],
						'total-byte-weight': ['error', { maxNumericValue: 614400 }],
					},
				},
				{
					matchingUrlPattern: '/dispatch/',
					assertions: {
						'categories:performance': ['error', { minScore: 0.45 }],
						'largest-contentful-paint': ['error', { maxNumericValue: 8000 }],
						'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
						'total-blocking-time': ['error', { maxNumericValue: 300 }],
						'total-byte-weight': ['error', { maxNumericValue: 1048576 }],
					},
				},
			],
		},
	},
}
