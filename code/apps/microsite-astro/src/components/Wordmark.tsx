/**
 * DISpatch wordmark — split-color publication mark.
 *
 * Composition per color.md §5.2 Option C (cosmology-encoded):
 *   - DIS portion renders in --platform-wordmark-dis (resolves to
 *     --platform-accent-prime: #8e2532 Atlantic-pigment editorial red).
 *     The City of Dis from Inferno — Inferno-cosmology surfaced.
 *   - "patch" portion renders in --platform-wordmark-patch (resolves to
 *     --platform-text-body-strong, warm-bias near-black). The institutional
 *     publication portion — the magazine word that comes from the front.
 *
 * Optical balance (amendment §1.2): patch portion sized at 1.08em relative
 * to DIS portion. Capital DIS optically dominates lowercase patch at equal
 * point size; +8% upsize restores perceptual weight parity and tips the
 * reading hierarchy toward patch-as-primary, DIS-as-cosmology-marker.
 *
 * Per-pair kern adjustment at the S→p boundary: -0.02em negative margin on
 * the patch span. Tailwind's tracking-* is uniform across all glyph pairs
 * and can't see pair-kerns; this restores the kerning judgment a type
 * designer would make at this specific letter pair.
 *
 * Sizes:
 *   - 'masthead'      → 24px / 30px / 36px (responsive). Top-of-page chrome.
 *   - 'hero'          → 72px / 96px. Home-page wordmark-as-page-hero.
 *   - 'sheet'         → 24px. Mobile sheet header echo.
 *   - 'inline'        → 16px. Inline mentions (about page, footer wordmark).
 */

import type { CSSProperties } from 'react'

interface Props {
	size?: 'masthead' | 'hero' | 'sheet' | 'inline'
	as?: 'span' | 'a'
	href?: string
	ariaLabel?: string
	className?: string
	style?: CSSProperties
}

const SIZE_CLASSES: Record<NonNullable<Props['size']>, string> = {
	/* Masthead — slimmed per AK 2026-05-13: chrome should feel editorial-rail,
	   not banner. 18px → 22px scales to viewport without dominating. */
	masthead: 'text-[1.0625rem] sm:text-[1.1875rem] md:text-[1.375rem]',
	hero: 'text-7xl sm:text-8xl',
	sheet: 'text-2xl',
	inline: 'text-base',
}

export function Wordmark({
	size = 'masthead',
	as = 'span',
	href,
	ariaLabel,
	className = '',
	style,
}: Props) {
	const Tag = as as 'a' | 'span'
	const props: React.ComponentPropsWithoutRef<'a'> = {
		className: [
			'font-wordmark font-bold leading-none tracking-[-0.025em]',
			SIZE_CLASSES[size],
			className,
		]
			.filter(Boolean)
			.join(' '),
		style,
	}

	if (as === 'a' && href) {
		props.href = href
		props['aria-label'] = ariaLabel
	}

	return (
		<Tag {...props}>
			<span className="text-wordmark-dis">DIS</span>
			<span className="text-wordmark-patch text-[1.08em] -ml-[0.02em]">patch</span>
		</Tag>
	)
}
