/**
 * The archive lane's capture discipline — the ADR-0003 §Stage 4 flake law
 * applied to the Chromatic e2e lane (F19, ruled by AK 2026-08-19: fix it,
 * the required-context seat stays).
 *
 * WHY THIS MODULE EXISTS. The lane used to archive by accident: fixtures.ts
 * bases the suite on @chromatic-com/playwright, whose fixture snapshots every
 * test's final DOM unless told otherwise — so all 39 tests shipped an archive
 * whether or not the test was ever about pixels, and a failing test shipped
 * one too (an assertion failure does not propagate through the fixture, so
 * teardown archives anyway).
 *
 * The cost was measured, not assumed: two runs of IDENTICAL code, archives
 * hashed and compared (2026-08-19) — 21 of the 39 differed. That is the
 * mechanism behind "changes on every commit, including a pure-CI one", and
 * why the lane's red carried no information. Two causes, both real:
 *
 *   - mid-motion inline styles (74 nodes) — Motion writes transform/opacity
 *     on the main thread, so a page archived a few frames early carries
 *     `translateY(7.99784px)` in one run and `7.93735px` in the next. The 404
 *     archive was shipping its masthead at `opacity: 0` — a page state the
 *     site never presents. settleMotion does NOT cover this: it waits on
 *     hydration, WAAPI animations and the masthead spring, and Motion's rAF
 *     writes on arbitrary elements are invisible to getAnimations().
 *   - genuinely live regions (40 nodes) — wire timestamps, freshness lines,
 *     and infinite decorative pulses that by definition never come to rest.
 *
 * THE LAW, in three parts, all owned here:
 *   1. auto-archiving is OFF (playwright.config.ts `disableAutoSnapshot`);
 *      an archive exists only where a test asked for one, by name.
 *   2. an archive is taken only after the page is at REST — settleMotion
 *      first, then a frame-stability probe over the inline styles Motion
 *      writes, and the probe FAILS THE TEST if the page never settles rather
 *      than archiving something nondeterministic quietly.
 *   3. regions that never rest are DECLARED in the markup, not chased:
 *      `data-live` excludes them from the probe here and from Chromatic's
 *      diff via `ignoreSelectors` in the config. One attribute, both uses.
 */

import { takeSnapshot } from '@chromatic-com/playwright'
import { expect, type Page, type TestInfo } from '@playwright/test'
import { settleMotion } from './axe'

/** Declared-live markup: never settles, never diffed. Both consumers of this
 *  selector — the rest probe below and `ignoreSelectors` in
 *  playwright.config.ts — must name the same thing, so it is defined once. */
export const LIVE_REGION_SELECTOR = '[data-live]'

/** Frames the probe will wait for rest (≈5s at 60fps) and how many
 *  consecutive identical samples count as settled. Five frames rather than
 *  the axe helper's three: an entrance easing out can hold a value across two
 *  frames while still moving in the third. */
const MAX_FRAMES = 300
const STABLE_FRAMES = 5

/**
 * Wait until every element Motion is driving has stopped changing.
 *
 * settleMotion's masthead probe, generalised: sample the inline transform /
 * opacity / filter of every styled element, advance a frame, resample, and
 * require N identical samples in a row. Declared-live regions are excluded or
 * the loop could never converge on a page carrying an infinite pulse.
 *
 * Returns the descriptors of anything still moving when the cap is reached —
 * empty means the page is at rest.
 */
async function elementsStillMoving(page: Page): Promise<string[]> {
	return page.evaluate(
		async ({ liveSelector, maxFrames, stableFrames }) => {
			const describe = (el: HTMLElement) => {
				const cls = el.getAttribute('class')?.slice(0, 60) ?? ''
				return `<${el.tagName.toLowerCase()}${cls ? ` class="${cls}"` : ''}>`
			}
			const sample = () =>
				Array.from(document.querySelectorAll<HTMLElement>('[style]'))
					.filter((el) => !el.closest(liveSelector))
					.map((el) => ({
						el,
						value: `${el.style.transform}|${el.style.opacity}|${el.style.filter}`,
					}))

			let prev = sample()
			let stable = 0
			for (let i = 0; i < maxFrames && stable < stableFrames; i++) {
				await new Promise((r) => requestAnimationFrame(() => r(null)))
				const cur = sample()
				// A length change means Motion added or removed a driven element
				// (a whileInView entrance starting): not settled by definition.
				const identical =
					cur.length === prev.length && cur.every((c, j) => c.el === prev[j].el && c.value === prev[j].value)
				stable = identical ? stable + 1 : 0
				prev = cur
			}
			if (stable >= stableFrames) return []

			// Never settled: name what is still moving so the failure is
			// actionable — either the animation is a defect or the region is
			// live and belongs behind data-live.
			const before = sample()
			await new Promise((r) => requestAnimationFrame(() => r(null)))
			const after = sample()
			const moving = new Set<string>()
			after.forEach((a, j) => {
				const b = before[j]
				if (!b || b.el !== a.el || b.value !== a.value) moving.add(describe(a.el))
			})
			return [...moving].slice(0, 10)
		},
		{ liveSelector: LIVE_REGION_SELECTOR, maxFrames: MAX_FRAMES, stableFrames: STABLE_FRAMES },
	)
}

/**
 * Archive this page for the Chromatic e2e lane, under the settle law.
 *
 * The ONE way into the archive. Auto-archiving is off, so a surface reaches
 * AK's review lane only by a call to this function — which makes the lane's
 * coverage a list someone chose, checkable by
 * `scripts/check-archive-coverage.mjs` and named in the e2e workflow.
 *
 * `name` becomes the snapshot's Chromatic identity and must stay stable
 * across commits — renaming one drops its baseline and manufactures exactly
 * the change-noise this module exists to remove.
 */
export async function archiveSnapshot(page: Page, name: string, testInfo: TestInfo): Promise<void> {
	await settleForArchive(page)
	await takeSnapshot(page, name, testInfo)
}

/** The settle half, exported for tests that must assert on a page already at
 *  rest before doing anything else. */
export async function settleForArchive(page: Page): Promise<void> {
	await settleMotion(page)
	const moving = await elementsStillMoving(page)
	expect(
		moving,
		'the page never came to rest, so archiving it would ship a mid-motion frame and the lane would cry wolf — ' +
			'either fix the animation or declare the region with data-live',
	).toEqual([])
}
