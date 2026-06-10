/**
 * Barrel re-exports for the homepage spreads.
 *
 * Lets consumers import any spread from '@/components/home' instead of
 * the deep file path. We re-export named symbols only (no namespace
 * imports, no `export *`) so tree-shaking can drop unused spreads.
 *
 * Note: barrel files can hurt code-splitting if you re-export from a
 * file that has side effects at module-load time. None of our spreads
 * do — they're all pure component declarations — so the barrel is safe.
 */

export { Marginalia } from './shared/Marginalia'
export { CoverSpread } from './CoverSpread'
export { ArticleSpread } from './ArticleSpread'
export { BuildTicker } from './BuildTicker'
export { CrossfireSpread } from './CrossfireSpread'
export { SpheresSpread } from './SpheresSpread'
export { DLDSSpread } from './DLDSSpread'
export { Colophon } from './Colophon'

// Shared constants — consumed by future spreads + future tests.
export { PALETTE } from './shared/palette'
export type { PaletteKey } from './shared/palette'
export { LANE_COLORS } from './shared/lane-colors'
