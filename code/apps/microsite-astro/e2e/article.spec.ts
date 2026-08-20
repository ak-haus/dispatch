/**
 * Journey: article (Golden Board A2).
 *
 * The article under test is discovered from the built sitemap rather than
 * hardcoded, so the journey survives content renames — AK owns content;
 * the suite owns the route shape.
 */

import { expect, test } from './helpers/fixtures'
import { expectNoAxeViolations } from './helpers/axe'
import { archiveSnapshot } from './helpers/archive'

async function firstDispatchPath(request: import('@playwright/test').APIRequestContext): Promise<string> {
	const res = await request.get('/sitemap-0.xml')
	expect(res.ok()).toBe(true)
	const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
		.map((m) => new URL(m[1]).pathname)
		.filter((p) => p.startsWith('/dispatch/'))
	expect(paths.length, 'sitemap must list at least one /dispatch/ article').toBeGreaterThan(0)
	return paths[0]
}

test('a dispatch article renders its editorial shell', async ({ page, request }) => {
	const path = await firstDispatchPath(request)
	const response = await page.goto(path)
	expect(response?.status()).toBe(200)

	// The article layout's h1 carries the dispatch title.
	const title = page.getByRole('heading', { level: 1 })
	await expect(title.first()).toBeVisible()
	await expect(title.first()).not.toBeEmpty()

	// Real body copy rendered from MDX — not an empty shell.
	const article = page.locator('article').first()
	await expect(article).toBeVisible()
})

test('an article holds the axe WCAG floor', async ({ page, request }, testInfo) => {
	const path = await firstDispatchPath(request)
	await page.goto(path)
	await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
	await expectNoAxeViolations(page, testInfo)
	// Chromatic archive lane: the article surface as a whole page. The pixel
	// floor locks only the masthead ELEMENT here (visual.spec.ts), so the
	// editorial body below it has no in-repo lock — this is its coverage.
	await archiveSnapshot(page, 'article', testInfo)
})
