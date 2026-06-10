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
	/** Copper — kicker labels, section labels, filled CTA pills. */
	copper: 'var(--platform-copper)',
	/** Deeper copper for hover/active interactive states. */
	copperDeep: 'var(--platform-copper-deep)',

	// ── Tier 3: surface fills (gold/copper, NEVER pale-yellow) ───────
	/** Block-fill at saturated-copper tier. 80% platform-copper + 20%
	 *  vellum lift — reads as gold/copper of the same family as the
	 *  pills and the nav, not as the previous washed-out wheat-cream.
	 *  Use for: pull-quote blocks, banner substrate tints, marginalia
	 *  plates. Text on top of this surface uses `oklch(0.18 0.02 60)`
	 *  (warm ink) which holds APCA Lc ≥ 60 contrast. */
	wheat: 'color-mix(in oklch, var(--platform-copper) 80%, var(--sky-low) 20%)',

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
