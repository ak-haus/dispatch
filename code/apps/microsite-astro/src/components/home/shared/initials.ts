/**
 * The monogram a platform depiction draws in its avatar — the initials of the
 * name printed beside it (F61). The dossier cards hardcoded "AK" and "DP", so
 * the deck showed an "AK" avatar beside the byline "Claude". Up to two
 * letters, one from each of the first two words; a leading "@" and any
 * punctuation separate words ("@ak-almoumen" → "AA", "dispatch.prime" → "DP").
 */
export function initials(name: string): string {
	return name
		.split(/[^\p{L}\p{N}]+/u)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]!.toUpperCase())
		.join('')
}
