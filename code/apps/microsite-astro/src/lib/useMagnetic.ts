/**
 * useMagnetic — premium hover microinteraction (ouro-labs / feedagency pattern).
 *
 * When the cursor is over the target, the element follows the cursor with
 * damped translation. On leave, the element springs back to its origin.
 *
 * Usage:
 *   const m = useMagnetic({ strength: 0.35, lockY: false })
 *   <motion.a ref={m.ref} onMouseMove={m.onMouseMove} onMouseLeave={m.onMouseLeave}
 *             animate={{ x: m.x, y: m.y }}
 *             transition={{ type: 'spring', stiffness: 220, damping: 22 }} />
 *
 * Options:
 *   strength   — how strongly the element follows the cursor (0–1).
 *                0.3 ≈ subtle agency feel; 0.6 ≈ playful. Default 0.3.
 *   lockY      — if true, only x translates (good for inline nav links so
 *                vertical baseline is preserved). Default false.
 *   maxOffset  — cap on offset in px so element never escapes its slot.
 *                Default 12.
 *
 * Reduced-motion: hooks-up automatically. When prefers-reduced-motion is
 * set, x/y stay 0 — the element never translates.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

export type UseMagneticOptions = {
	strength?: number
	lockY?: boolean
	maxOffset?: number
}

export function useMagnetic<T extends HTMLElement = HTMLElement>({
	strength = 0.3,
	lockY = false,
	maxOffset = 12,
}: UseMagneticOptions = {}) {
	const ref = useRef<T | null>(null)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const [reduced, setReduced] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
		const sync = () => setReduced(mq.matches)
		sync()
		mq.addEventListener('change', sync)
		return () => mq.removeEventListener('change', sync)
	}, [])

	const onMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (reduced) return
			const el = ref.current
			if (!el) return
			const rect = el.getBoundingClientRect()
			const cx = rect.left + rect.width / 2
			const cy = rect.top + rect.height / 2
			const rawX = (e.clientX - cx) * strength
			const rawY = (e.clientY - cy) * strength
			const x = Math.max(-maxOffset, Math.min(maxOffset, rawX))
			const y = lockY ? 0 : Math.max(-maxOffset, Math.min(maxOffset, rawY))
			setPos({ x, y })
		},
		[reduced, strength, lockY, maxOffset],
	)

	const onMouseLeave = useCallback(() => {
		setPos({ x: 0, y: 0 })
	}, [])

	return { ref, x: pos.x, y: pos.y, onMouseMove, onMouseLeave }
}
