/**
 * The faces DISpatch is set in, derived from the type system itself (F61).
 *
 * The colophon read "Set in Pangram Editorial New & Vollkorn." — two faces of
 * the six the site ships and preloads. It was true once: the body slot was
 * Inter until the fonts restoration build set it in Crimson Pro (OQ-1,
 * 2026-08-18), and nothing tied the credit to the slots, so the credit stayed
 * where it was. A credit read from the token source — the same DTCG file that
 * compiles tokens.css and DESIGN.md — cannot fall behind a slot change again.
 *
 * Import it from a page, never from an island: the whole family table
 * (descriptions, ratification notes) would ship in the client bundle to print
 * six names. index.astro passes the list down as a prop.
 */

import typography from '@prime-dispatch/tokens/typography.json'

type FamilySlots = Record<string, { $value: readonly string[] }>

/** Each slot's primary family, in the canon's slot order, once each — the
 *  rest of each stack is fallback, which is not what a page is set in. */
export function typefacesOf(families: FamilySlots): string[] {
	const primaries = Object.values(families).map((slot) => slot.$value[0])
	return [...new Set(primaries.filter((face): face is string => typeof face === 'string' && face !== ''))]
}

export const TYPEFACES: readonly string[] = typefacesOf(typography.font.family)
