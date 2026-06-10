/**
 * Lane pigment lookup ─ resolves DLDS provenance lanes to canonical
 * dispatch tokens declared in src/styles/tokens.css. Centralized so
 * sections render lane indicators consistently (dot color, border
 * accent, etc.) without each section redeclaring the map.
 */

export const LANE_COLORS: Record<string, string> = {
	'Human-led': 'var(--dispatch-lane-institutional-strong)',
	Hybrid: 'var(--platform-accent-prime)',
	'AI-led': 'var(--dispatch-lane-editorial-strong)',
}
