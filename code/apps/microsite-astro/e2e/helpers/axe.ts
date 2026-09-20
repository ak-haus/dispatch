/**
 * axe-core in-suite (Golden Board A2): every journey page must hold the
 * WCAG 2.2 AA floor mechanically, not by review. Violations attach to the
 * report as JSON so a failure names the exact nodes.
 *
 * color-contrast is LIVE (F5 closed at S2, 2026-08-18): the size-scoped
 * copper split + AA ink variants landed as tokens (ADR-0003 register §10;
 * per-node math in packages/tokens/__tests__/contrast.test.mjs), so the
 * suspension list this helper carried since PR #8 is gone.
 *
 * Motion settle (the ADR-0003 Stage-4 flake law, applied to axe): axe
 * flattens element opacity into its computed colors, so a scan taken while
 * Motion entrance animations are mid-flight reads phantom low-contrast
 * "inks" that exist in no stylesheet (the PR #8 muted/faint readings were
 * exactly this). Finite animations must finish before analysis; infinite
 * ones (decorative pulses, aria-hidden chrome) are excluded — they never
 * settle by definition.
 */

import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, type TestInfo } from '@playwright/test'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

export async function settleMotion(page: Page): Promise<void> {
	// Hydration first: an island that hasn't hydrated yet has not STARTED its
	// entrance animation, so an animations-only wait passes vacuously and the
	// scan races the fade (nondeterministic across runs). `astro-island` sheds
	// its `ssr` attribute on hydration — the same oracle the uptime synthetic
	// uses.
	await page.waitForFunction(() => document.querySelectorAll('astro-island[ssr]').length === 0, undefined, {
		timeout: 10_000,
	})
	await page.waitForFunction(
		() =>
			document.getAnimations().every((a) => {
				if (a.playState !== 'running') return true
				const timing = a.effect?.getTiming()
				return timing?.iterations === Infinity
			}),
		undefined,
		{ timeout: 10_000 },
	)
	// The masthead enters on a Motion SPRING (JS-driven, not WAAPI — invisible
	// to getAnimations()), so probe it for frame-stability instead: computed
	// opacity+transform must hold for 3 consecutive frames. Covers both the
	// settled state (opacity 1) and home's intentionally-hidden hero header
	// (stable at 0). Capped, not swallowed: if chrome truly never settles the
	// scan runs anyway and axe fails loudly on the mid-flight colors.
	await page.evaluate(async () => {
		const h = document.querySelector('header')
		if (!h) return
		const snap = () => {
			const s = getComputedStyle(h)
			return `${s.opacity}|${s.transform}`
		}
		let prev = snap()
		let stable = 0
		for (let i = 0; i < 180 && stable < 3; i++) {
			await new Promise((r) => requestAnimationFrame(() => r(null)))
			const cur = snap()
			stable = cur === prev ? stable + 1 : 0
			prev = cur
		}
	})
	// Two paint frames so final animation values are committed before axe reads.
	await page.evaluate(
		() =>
			new Promise<void>((resolve) => {
				requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
			}),
	)
}

/**
 * Rules axe may leave in `incomplete` (A13): color-contrast is permanently
 * uncomputable on the letterpress chrome — `.dispatch-emboss`/`.dispatch-burnin`
 * pair text with `mix-blend-mode: multiply`, and axe cannot flatten blend
 * modes into an effective color pair. Those nodes are governed by the token
 * math in packages/tokens/__tests__/contrast.test.mjs instead. Every OTHER
 * rule must be fully determinate: a new entry in `incomplete` is an
 * undetermined accessibility question and fails the suite until it is either
 * fixed or added here with a reason.
 */
const INCOMPUTABLE_RULES = new Set(['color-contrast'])

/**
 * Node-level allowance (B27, F32) — deliberately NOT a new INCOMPUTABLE_RULES
 * entry, because `aria-valid-attr-value` catches real defects and blanket
 * grandfathering is what ADR-0004 forbids (the R1 precedent: named, never
 * blanket). One check result is allowed, matched on axe's own message.
 *
 * WHAT IT IS. A trigger for a popup that does not exist until it is opened —
 * the ARIA disclosure pattern — carries `aria-controls` pointing at an id
 * that is absent (or display:none) while closed. axe cannot statically decide
 * whether the author got the id right, so it answers `incomplete` rather than
 * pass or fail. That is a limit of static analysis over deferred markup, not
 * an open accessibility question about the page.
 *
 * WHO HITS IT. Two first-party triggers, both correct: the masthead's menu
 * button (Radix Dialog.Content, mounted only while open) and ChapterRail's
 * chapter chip (a <dialog> the UA keeps at display:none until showModal()).
 * Neither had ever been scanned before B27 — every axe floor in this suite
 * ran at 1280w, where both are hidden.
 *
 * WHY IT IS SAFE. The allowance is keyed to this one message, so any OTHER
 * aria-valid-attr-value finding — a typo'd role, a bad aria-live value, an
 * aria-labelledby pointing at nothing — still fails the suite. And the
 * OPEN-popup state is scanned too (chapter-navigation.spec.ts), where the
 * reference resolves and axe answers definitively: the pattern is proven
 * correct there rather than merely excused here.
 */
const DEFERRED_POPUP_INCOMPLETE =
	'Unable to determine if aria-controls referenced ID exists on the page while using aria-haspopup'

/** Every check message axe attached to a node, across all three buckets. */
function nodeMessages(node: { any?: { message?: string }[]; all?: { message?: string }[]; none?: { message?: string }[] }): string[] {
	return [...(node.any ?? []), ...(node.all ?? []), ...(node.none ?? [])]
		.map((c) => c.message ?? '')
		.filter(Boolean)
}

export async function expectNoAxeViolations(page: Page, testInfo: TestInfo): Promise<void> {
	await settleMotion(page)
	const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
	const undetermined = results.incomplete
		.filter((v) => !INCOMPUTABLE_RULES.has(v.id))
		// Drop only the allowed check result, node by node; a rule keeps failing
		// on every other node it flagged.
		// startsWith, not equality: axe appends the offending value to the
		// message (`...aria-haspopup: aria-controls="dispatch-mobile-menu"`), so
		// the prefix is the stable part and the suffix names the node.
		.map((v) => ({
			...v,
			nodes: v.nodes.filter((n) => !nodeMessages(n).some((m) => m.startsWith(DEFERRED_POPUP_INCOMPLETE))),
		}))
		.filter((v) => v.nodes.length > 0)
	if (results.violations.length > 0 || undetermined.length > 0) {
		await testInfo.attach('axe-violations', {
			body: JSON.stringify({ violations: results.violations, incomplete: undetermined }, null, 2),
			contentType: 'application/json',
		})
	}
	expect(
		results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`),
	).toEqual([])
	expect(
		undetermined.map((v) => `incomplete ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`),
	).toEqual([])
}
