/**
 * Lighthouse budget (Golden Board A4) — a RATCHET, not an aspiration.
 *
 * Ceilings sit ~15–30% above the measured baseline, so CI blocks REGRESSIONS
 * from today's floor. Re-baselined 2026-09-19 at Build 25 on the job's own
 * figures, which the run now prints (scripts/lighthouse-figures.mjs), with
 * the licensed PP faces hydrated — before F40 this job built fontless and its
 * article CLS read 0.2326 against production's 0.0000.
 *
 * BASELINE — CI, Lighthouse 12.6.1, Chrome 152, mobile, simulated, 3 runs,
 * median (min–max), PP faces served:
 *   /            perf 70 · LCP 6994 (6489–7827) · CLS 0.0000 · TBT 89 · 2009KB
 *   /wire/       perf 93 · LCP 3017 (2867–3033) · CLS 0.0007 · TBT 0 ·  365KB
 *   /dispatch/…  perf 73 · LCP 6330 (6187–6348) · CLS 0.0008 · TBT 0 ·  884KB
 *
 * Production the same day, before the B12 repair (dispatchmag.dev, same
 * Lighthouse, 3 runs, canonical no-slash URLs): / LCP 12.70s · CLS 0.0000 ·
 * 2435KB · /wire LCP 1.69s · CLS 0.0006 · 453KB · article LCP 6.49s · CLS
 * 0.0285 · 970KB. Byte weights match this job to within 0.3% once
 * production's analytics module (PostHog, ~84KB, keyed only in Vercel) is
 * subtracted — the evidence that both now measure the same page. The
 * post-repair production figures are in the Build 25 record.
 *
 * Two instrument limits, stated so nobody reads more into these numbers:
 *   - LCP here is a Lantern ESTIMATE whose graph holds every request that
 *     finished before the observed paint. Served from localhost that is
 *     always every request, so this LCP tracks eager bytes and the critical
 *     path — it moved not at all when B12 made the cover's text paint at
 *     first paint instead of after hydration (13.6s both ways) and fell to
 *     7.0s only when the below-the-fold images went lazy. Render delay is
 *     therefore guarded in e2e/home.spec.ts, not here.
 *   - Reader truth is production Lighthouse, not this job (F40).
 *
 * Lab metrics: LCP/CLS/TBT (TBT is the lab proxy for INP; INP is field-only).
 * Hermetic: static dist served locally, no feed URL, no credentials; the PP
 * faces come from their public rail at build time, as the visual lanes' do.
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
						'categories:performance': ['error', { minScore: 0.62 }],
						'largest-contentful-paint': ['error', { maxNumericValue: 9000 }],
						'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
						'total-blocking-time': ['error', { maxNumericValue: 300 }],
						// 2.5MiB: 27% over the measured 2009KB, and above the 2345KB a
						// run costs when Chrome cannot estimate the connection and so
						// fetches lazy images within 3000px instead of 1250px (B12).
						'total-byte-weight': ['error', { maxNumericValue: 2621440 }],
					},
				},
				{
					matchingUrlPattern: '/wire/$',
					assertions: {
						'categories:performance': ['error', { minScore: 0.9 }],
						'largest-contentful-paint': ['error', { maxNumericValue: 3600 }],
						'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
						'total-blocking-time': ['error', { maxNumericValue: 150 }],
						'total-byte-weight': ['error', { maxNumericValue: 450560 }],
					},
				},
				{
					matchingUrlPattern: '/dispatch/',
					assertions: {
						'categories:performance': ['error', { minScore: 0.65 }],
						'largest-contentful-paint': ['error', { maxNumericValue: 7300 }],
						// 0.05, the ceiling F40 said the article could reach once the
						// faces were hydrated: CI reads 0.0008 with them, and the worst
						// reading anywhere (local Windows, production) is 0.0285.
						'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
						'total-blocking-time': ['error', { maxNumericValue: 200 }],
						'total-byte-weight': ['error', { maxNumericValue: 1048576 }],
					},
				},
			],
		},
	},
}
