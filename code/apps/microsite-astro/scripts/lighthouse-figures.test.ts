/**
 * The ratchet's figures and its font guard (F40). The guard is the part that
 * matters: a Lighthouse run whose PP faces did not load measured a page no
 * reader sees, and the job must fail on it rather than report its numbers.
 */

import { describe, expect, it } from 'vitest'
import { figuresTable, fontlessRuns, median, ppFaceRequests } from './lighthouse-figures.mjs'

type Request = { url: string; statusCode: number }

function lhr(path: string, lcp: number, requests: Request[], score = 0.7) {
	return {
		requestedUrl: `http://localhost:4400${path}`,
		categories: { performance: { score } },
		audits: {
			'largest-contentful-paint': { numericValue: lcp },
			'first-contentful-paint': { numericValue: 1000 },
			'cumulative-layout-shift': { numericValue: 0.01 },
			'total-blocking-time': { numericValue: 20 },
			'total-byte-weight': { numericValue: 512 * 1024 },
			'network-requests': { details: { items: requests } },
			'largest-contentful-paint-element': {
				details: { items: [{ items: [{ node: { snippet: '<p class="dek">', nodeLabel: 'A dev-diary magazine' } }] }] },
			},
		},
	}
}

const served = (status = 200): Request[] => [
	{ url: 'http://localhost:4400/', statusCode: 200 },
	{ url: 'http://localhost:4400/fonts/PPEditorialNew-Bold.woff2', statusCode: status },
	{ url: 'http://localhost:4400/fonts/PPPangramSans-Extrabold.woff2', statusCode: status },
	{ url: 'http://localhost:4400/fonts/body/crimson-pro-400.woff2', statusCode: 200 },
]

describe('the PP face guard', () => {
	it('passes runs that loaded both licensed faces', () => {
		expect(fontlessRuns([lhr('/', 2000, served()), lhr('/wire/', 1500, served())])).toEqual([])
	})

	it('fails a run whose licensed faces 404 (the fontless build)', () => {
		const runs = fontlessRuns([lhr('/', 2000, served()), lhr('/dispatch/dispatch-01/', 6000, served(404))])
		expect(runs.map((run: { surface: string }) => run.surface)).toEqual(['/dispatch/dispatch-01/'])
	})

	it('fails a run that never requested them', () => {
		const onlyOfl = served().filter((request) => !request.url.includes('/fonts/PP'))
		expect(fontlessRuns([lhr('/', 2000, onlyOfl)])).toHaveLength(1)
	})

	it('counts only the PP rail, not the committed OFL faces', () => {
		expect(ppFaceRequests(lhr('/', 2000, served())).map((face: { url: string }) => face.url)).toEqual([
			'http://localhost:4400/fonts/PPEditorialNew-Bold.woff2',
			'http://localhost:4400/fonts/PPPangramSans-Extrabold.woff2',
		])
	})
})

describe('the figures table', () => {
	it('reports the median with the range lhci asserts on', () => {
		const table = figuresTable([lhr('/', 8337, served()), lhr('/', 8339, served()), lhr('/', 8338, served())])
		expect(table).toContain('| / | 3 | 70 | 8338 (8337–8339) | 1000 | 0.0100 | 20 | 512 |')
		expect(table).toContain('`p` A dev-diary magazine')
	})

	it('writes one row per surface, sorted by path', () => {
		const table = figuresTable([lhr('/wire/', 1500, served()), lhr('/', 2000, served())])
		const surfaces = table.split('\n').slice(2).map((row: string) => row.split(' | ')[0])
		expect(surfaces).toEqual(['| /', '| /wire/'])
	})

	it('takes the median of an even count as the mean of the middle pair', () => {
		expect(median([4, 1, 3, 2])).toBe(2.5)
		expect(median([3, 1, 2])).toBe(2)
	})
})
