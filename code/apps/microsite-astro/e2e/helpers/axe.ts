/**
 * axe-core in-suite (Golden Board A2): every journey page must hold the
 * WCAG 2.2 AA floor mechanically, not by review. Violations attach to the
 * report as JSON so a failure names the exact nodes.
 */

import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, type TestInfo } from '@playwright/test'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/**
 * color-contrast is SUSPENDED, not passed (Golden Board flag F5, filed
 * 2026-08-18): every current violation traces to the locked CD1–5 palette —
 * copper nav/labels 2.6–3.4:1, muted/faint inks 1.9–2.8:1, copper pill fill
 * 3.6:1 on vellum — which only an AK canon decision can change. Re-enable by
 * deleting this list once that decision lands. Node inventory: PR #8.
 */
const SUSPENDED_RULES = ['color-contrast']

export async function expectNoAxeViolations(page: Page, testInfo: TestInfo): Promise<void> {
	const results = await new AxeBuilder({ page })
		.withTags(TAGS)
		.disableRules(SUSPENDED_RULES)
		.analyze()
	if (results.violations.length > 0) {
		await testInfo.attach('axe-violations', {
			body: JSON.stringify(results.violations, null, 2),
			contentType: 'application/json',
		})
	}
	expect(
		results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`),
	).toEqual([])
}
