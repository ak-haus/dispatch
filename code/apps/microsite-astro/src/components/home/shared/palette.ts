/* eslint-disable no-restricted-syntax --
 * Sanctioned tokens-lint exemption (ADR-0003 §Stage 5 gate). THIS FILE IS THE
 * DECLARED HOME for the surface's cycle-independent values, and that is the
 * whole reason the exemption sits here rather than on the components.
 *
 * Canon tokens CYCLE: --platform-accent-prime resolves to #8e2532 in dawn,
 * oklch(0.63 0.185 25) in dusk, oklch(0.66 0.210 26) in night. The values
 * below are deliberately FIXED — they sit on dark editorial chrome that does
 * not cycle, so re-pointing them at a token would not be a governance fix, it
 * would be a design change to locked canon (CD1-5).
 *
 * The rule the exemption buys: components may carry no raw literal; a fixed
 * value must be named here, where one diff shows every one of them. Whether
 * these should become cycle-independent canon tokens is a CANON decision and
 * therefore AK's — filed, not decided here.
 */
/**
 * Color canon for the homepage spreads + article surfaces.
 *
 * Locked 2026-05-13 by Mayor:
 *
 *   1. Wordmark red (--platform-accent-prime) — the brand anchor.
 *      Used for: drop caps, first letters of paragraphs, accent dots,
 *      pulse markers, the "DIS" letters. ALWAYS the highest-emphasis
 *      typographic flourish on any page.
 *
 *   2. Copper (--platform-copper) — Prime City's color.
 *      Used for: kicker labels (OPERATOR LOG, CONSTRUCTION NOTES, etc.),
 *      section labels (FROM THE DISPATCH, etc.), filled CTA pills,
 *      block-fill callouts. The "warm yellow" tier.
 *
 *   3. Lane pigments (institutional / editorial / dispatch) — provenance.
 *      Editor's notes, lane indicator dots, lane-aware borders.
 *
 *   4. Blue / Green — flourishes ONLY. Marginalia, optional accents.
 *      NEVER replace red or copper on first-class typographic elements.
 *
 * Token references resolve at runtime so theme cycles (dawn/dusk/night)
 * cascade through tokens.css automatically.
 */

export const PALETTE = {
	// ── Tier 1: brand anchor ────────────────────────────────────────────
	/** Wordmark red — drop caps, first letters, pulse dots, DIS letters. */
	accent: 'var(--platform-accent-prime)',
	/** Slightly darker red for hover/active interactive states. */
	accentActive: 'var(--platform-accent-prime-active)',

	// ── Tier 2: Prime City's color ──────────────────────────────────────
	/** Copper — DISPLAY-size text, icon affordances, borders. Size-scoped
	 *  per F5 (ADR-0003 register §10): below the WCAG large-text threshold
	 *  use copperLabel, never this. */
	copper: 'var(--platform-copper)',
	/** Copper at label sizes — the F5 AA variant (4.66:1 on sky-low). Kicker
	 *  labels, section labels, 12-13px links, and filled pills that carry
	 *  light label text. */
	copperLabel: 'var(--platform-copper-label)',
	/** Deeper copper for hover/active interactive states. */
	copperDeep: 'var(--platform-copper-deep)',
	/** Text on copperLabel fills (pills, CTA hover) — resolves to vellum-25. */
	onCopper: 'var(--platform-on-copper)',

	// ── Tier 3: surface fills (gold/copper, NEVER pale-yellow) ───────
	/** Block-fill at saturated-copper tier. 80% platform-copper + 20%
	 *  vellum lift — reads as gold/copper of the same family as the
	 *  pills and the nav, not as the previous washed-out wheat-cream.
	 *  Use for: pull-quote blocks, banner substrate tints, marginalia
	 *  plates. Text on top of this surface uses `oklch(0.18 0.02 60)`
	 *  (warm ink) which holds APCA Lc ≥ 60 contrast. */
	wheat: 'color-mix(in oklch, var(--platform-copper) 80%, var(--sky-low) 20%)',

	// ── Tier 3b: fixed ink on tinted fills ─────────────────────────────
	/** Warm ink — the text color on `wheat` fills and other copper-tinted
	 *  plates, holding APCA Lc ≥ 60. Fixed rather than cycling, because the
	 *  fill it sits on is a tint rather than a substrate. Consolidated here
	 *  2026-08-20 from five call sites across ArticleSpread, WirePage and
	 *  ArticlesBrowser, which each carried the literal inline. */
	warmInk: 'oklch(0.18 0.02 60)',
	/** Paper white — the lifted highlight used for letterpress text shadows
	 *  and light-on-dark captions. Also previously inline in two files. */
	paper: 'oklch(0.99 0.005 75)',
	/** Cartographic viewport ground — the atlas map plate. Cartographic
	 *  substrate is locked canon (CD3), so this value is fixed by decision,
	 *  not by omission. */
	cartographyPaper: 'oklch(0.88 0.022 78)',

	// ── Tier 4: flourishes (NEVER replace tier 1 or 2) ─────────────────
	/** Ink-blue accent — flourish only, never first-class. */
	ink: 'oklch(0.42 0.14 240)',
	/** Engraver's green — flourish only, never first-class. */
	verdant: 'oklch(0.52 0.10 156)',

	// ── Tier 5: lane pigments (driven by provenance lane) ──────────────
	laneHuman: 'var(--dispatch-lane-institutional-strong)',
	laneHybrid: 'var(--platform-accent-prime)',
	laneAI: 'var(--dispatch-lane-editorial-strong)',
} as const

export type PaletteKey = keyof typeof PALETTE

/** Resolve a lane label ("Human-led" / "Hybrid" / "AI-led") to its tint. */
export function laneTint(lane: string): string {
	if (lane === 'Human-led') return PALETTE.laneHuman
	if (lane === 'AI-led') return PALETTE.laneAI
	return PALETTE.laneHybrid // default: Hybrid
}
