import { type Editor, createShapeId, type TLShapeId, toRichText } from 'tldraw'

const SERIF = 'serif'
const SANS = 'sans'
const DRAW = 'draw'
const MONO = 'mono'

type AnyShape = any

function frame(id: TLShapeId, x: number, y: number, w: number, h: number, name: string): AnyShape {
	return { id, type: 'frame', x, y, props: { w, h, name } }
}

function note(
	parentId: TLShapeId,
	x: number,
	y: number,
	color: string,
	body: string,
	size: 's' | 'm' | 'l' | 'xl' = 'm',
): AnyShape {
	return {
		id: createShapeId(),
		type: 'note',
		parentId,
		x,
		y,
		props: {
			color,
			size,
			richText: toRichText(body),
			font: DRAW,
			align: 'start',
			verticalAlign: 'start',
		},
	}
}

function rect(
	parentId: TLShapeId,
	x: number,
	y: number,
	w: number,
	h: number,
	opts: {
		color?: string
		fill?: 'none' | 'semi' | 'solid' | 'pattern'
		dash?: 'draw' | 'solid' | 'dashed' | 'dotted'
		text?: string
		labelColor?: string
		font?: string
		size?: 's' | 'm' | 'l' | 'xl'
	} = {},
): AnyShape {
	return {
		id: createShapeId(),
		type: 'geo',
		parentId,
		x,
		y,
		props: {
			geo: 'rectangle',
			w,
			h,
			color: opts.color ?? 'black',
			fill: opts.fill ?? 'none',
			dash: opts.dash ?? 'draw',
			richText: toRichText(opts.text ?? ''),
			labelColor: opts.labelColor ?? 'black',
			font: opts.font ?? SANS,
			align: 'middle',
			verticalAlign: 'middle',
			size: opts.size ?? 'm',
		},
	}
}

function text(
	parentId: TLShapeId,
	x: number,
	y: number,
	t: string,
	opts: {
		size?: 's' | 'm' | 'l' | 'xl'
		font?: string
		color?: string
		w?: number
		align?: 'start' | 'middle' | 'end'
	} = {},
): AnyShape {
	const hasWidth = opts.w !== undefined
	return {
		id: createShapeId(),
		type: 'text',
		parentId,
		x,
		y,
		props: {
			richText: toRichText(t),
			color: opts.color ?? 'black',
			size: opts.size ?? 'm',
			font: opts.font ?? SERIF,
			w: opts.w ?? 400,
			textAlign: opts.align ?? 'start',
			autoSize: !hasWidth,
		},
	}
}

export function seedBoard(editor: Editor) {
	const existing = editor.getCurrentPageShapes()
	if (existing.length > 0) return

	const shapes: AnyShape[] = []

	// ===== Layout grid =====
	const COL_W = 1600
	const ROW_H = 1900
	const GAP = 200
	const colX = (i: number) => i * (COL_W + GAP)
	const rowY = (i: number) => i * (ROW_H + GAP)

	// ===== Legend =====
	const legendId = createShapeId()
	shapes.push(frame(legendId, colX(0), rowY(0), 1100, 1550, 'Board Legend'))
	shapes.push(
		text(legendId, 40, 60, 'Read the board by color and shape.', {
			size: 'm',
			font: SANS,
			w: 1020,
		}),
	)
	const legendRows: [string, string, string][] = [
		['green', 'GREEN FRAME', 'use or preserve'],
		['red', 'RED FRAME', 'avoid or reject'],
		['blue', 'BLUE NOTE', 'implementation requirement'],
		['yellow', 'YELLOW NOTE', 'open decision / uncertainty'],
		['violet', 'PURPLE NOTE', 'Claude Code instruction'],
		['black', 'HEAVY BLACK', 'canonical token or component'],
		['grey', 'GRAY LINE', 'structure / layout relationship'],
		['red', 'RED PULSE', 'dispatch / infra activity'],
	]
	let ly = 180
	for (const [c, lbl, body] of legendRows) {
		shapes.push(rect(legendId, 40, ly, 60, 60, { color: c, fill: 'solid' }))
		shapes.push(text(legendId, 120, ly + 12, lbl, { size: 's', font: SANS, w: 280 }))
		shapes.push(text(legendId, 420, ly + 12, body, { size: 's', font: SERIF, w: 600 }))
		ly += 130
	}
	shapes.push(
		note(
			legendId,
			40,
			ly + 30,
			'orange',
			'Warm cream background = Vellum atmospheric substrate.',
			'm',
		),
	)

	// ===== Zone 1: Existing DISpatch DNA =====
	const z1 = createShapeId()
	shapes.push(frame(z1, colX(1), rowY(0), COL_W, ROW_H - 100, 'Zone 1 — Existing DISpatch DNA'))
	shapes.push(
		text(z1, 40, 40, 'Non-negotiable visual system. Read this before looking at new references.', {
			size: 'l',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	shapes.push(text(z1, 40, 160, 'Color tokens', { size: 'm', font: SANS }))
	const tokens = [
		'--sky-high',
		'--sky-low',
		'--reflect',
		'--window-warm',
		'--lane-editorial',
		'--lane-institutional',
		'--lane-dispatch',
		'--accent-prime',
		'--asset-cartography-pulse',
		'--wordmark-dis',
		'--wordmark-patch',
	]
	shapes.push(text(z1, 40, 220, tokens.join('\n'), { size: 's', font: MONO, w: 600 }))

	shapes.push(text(z1, 740, 160, 'Typography slots', { size: 'm', font: SANS }))
	const typeSlots = [
		'Title — Vollkorn / Editorial New',
		'Body — Inter / Crimson Pro (TBD)',
		'Nav — Pangram Sans / Inter',
		'Code — JetBrains Mono',
		'Civic / Dante — IM Fell English',
		'Wordmark — Editorial New / Vollkorn',
	]
	shapes.push(text(z1, 740, 220, typeSlots.join('\n'), { size: 's', font: SERIF, w: 780 }))

	shapes.push(text(z1, 40, 820, 'Existing principles', { size: 'm', font: SANS }))
	const principles = [
		'• Warm paper, not glossy SaaS.',
		'• Cartography is the subtle hero.',
		'• Red is infra surfacing, not generic decoration.',
		'• Lanes are local semantic accents, not page-wide gradients.',
		'• META and NARRATIVE coexist but do not blend.',
		'• Components consume tokens, not invent colors.',
	]
	shapes.push(text(z1, 40, 880, principles.join('\n'), { size: 's', font: SERIF, w: COL_W - 80 }))

	shapes.push(
		note(
			z1,
			40,
			1280,
			'green',
			'PRESERVE:\n• Vellum warm-paper substrate.\n• DIS red + patch dark split wordmark.\n• Restrained component chrome — typography and rails do the work.\n• Cartography as living substrate, not hero illustration only.',
			'l',
		),
	)
	shapes.push(
		note(
			z1,
			760,
			1280,
			'red',
			'AVOID:\n• Generic dark cyberpunk.\n• Random gradients.\n• Glassmorphism.\n• SaaS-blue cards.',
			'l',
		),
	)

	// ===== Zone 2: North Star references =====
	const z2 = createShapeId()
	shapes.push(frame(z2, colX(2), rowY(0), COL_W, ROW_H - 100, 'Zone 2 — North Star References'))
	shapes.push(
		text(z2, 40, 40, '3–5 strongest references that define overall feel. Mood / atmosphere / light / city texture / editorial warmth.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	const ssCols = 2
	const ssW = (COL_W - 80 - 40) / ssCols
	const ssH = 540
	for (let i = 0; i < 4; i++) {
		const cx = (i % ssCols) * (ssW + 40) + 40
		const cy = Math.floor(i / ssCols) * (ssH + 80) + 160
		shapes.push(
			rect(z2, cx, cy, ssW, ssH, {
				color: 'grey',
				fill: 'pattern',
				dash: 'dashed',
				text: `Drop image ${i + 1}`,
			}),
		)
	}
	shapes.push(
		note(
			z2,
			40,
			1420,
			'yellow',
			'For each image:\nUse for: …\nDo not use: …\nApplies to: …\nPriority: low | med | high',
			'm',
		),
	)
	shapes.push(
		note(
			z2,
			760,
			1420,
			'blue',
			'Example:\nUse for: atmospheric depth, city-as-substrate, warm contour.\nDo not use: literal fantasy UI, neon glow, HUD chrome.\nApplies to: CartographyCanvas, DistrictMap, homepage bg.\nPriority: high.',
			'm',
		),
	)

	// ===== Zone 3: Color & atmosphere =====
	const z3 = createShapeId()
	shapes.push(frame(z3, colX(0), rowY(1), COL_W, ROW_H - 100, 'Zone 3 — Color & Atmosphere'))
	shapes.push(
		text(z3, 40, 40, 'Semantic roles, not arbitrary palette. Color behavior matters more than hex.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	shapes.push(text(z3, 40, 140, 'Vellum scale', { size: 'm', font: SANS }))
	const vellums: [string, string, string][] = [
		['vellum-25', 'lightest printed paper', 'light-violet'],
		['vellum-100', 'warm-white ambient page', 'orange'],
		['vellum-200', 'reflect / micro-reflection', 'light-red'],
		['vellum-300', 'window-warm card edges', 'red'],
	]
	for (let i = 0; i < vellums.length; i++) {
		const [name, role, col] = vellums[i]
		shapes.push(rect(z3, 40 + i * 360, 200, 320, 180, { color: col, fill: 'solid' }))
		shapes.push(
			text(z3, 40 + i * 360, 400, `${name}\n${role}`, {
				size: 's',
				font: MONO,
				w: 320,
			}),
		)
	}
	shapes.push(text(z3, 40, 560, 'Lane colors', { size: 'm', font: SANS }))
	const lanes: [string, string, string][] = [
		['Editorial', 'terracotta / warm-earth', 'orange'],
		['Institutional', 'graphite-blue / cool-mineral', 'blue'],
		['Dispatch', 'accent-prime red', 'red'],
	]
	for (let i = 0; i < lanes.length; i++) {
		const [name, role, col] = lanes[i]
		shapes.push(rect(z3, 40 + i * 480, 620, 440, 180, { color: col, fill: 'semi' }))
		shapes.push(text(z3, 40 + i * 480, 820, `${name}\n${role}`, { size: 's', font: MONO, w: 440 }))
	}
	shapes.push(text(z3, 40, 980, 'Asset color', { size: 'm', font: SANS }))
	shapes.push(rect(z3, 40, 1040, 440, 180, { color: 'red', fill: 'solid' }))
	shapes.push(
		text(z3, 40, 1240, 'cartography-pulse\ndarker infra red for map activity', {
			size: 's',
			font: MONO,
			w: 440,
		}),
	)
	shapes.push(
		note(
			z3,
			740,
			980,
			'violet',
			'Claude:\nUse these as semantic roles, not arbitrary colors. If you need a new color, first map it to an existing role. Only propose a new token if no existing role fits.',
			'l',
		),
	)

	// ===== Zone 4: Typography =====
	const z4 = createShapeId()
	shapes.push(
		frame(z4, colX(1), rowY(1), COL_W, ROW_H - 100, 'Zone 4 — Typography (five-contained-typeface system)'),
	)
	// Wordmark
	shapes.push(text(z4, 40, 40, 'WORDMARK', { size: 's', font: SANS, color: 'grey' }))
	shapes.push(text(z4, 40, 80, 'DIS', { size: 'xl', font: SERIF, color: 'red' }))
	shapes.push(text(z4, 260, 80, 'patch', { size: 'xl', font: SERIF, color: 'black' }))
	shapes.push(
		text(z4, 40, 220, 'No ornament, no card, no background.', {
			size: 's',
			font: SANS,
			color: 'grey',
		}),
	)
	// Title
	shapes.push(text(z4, 40, 300, 'TITLE', { size: 's', font: SANS, color: 'grey' }))
	shapes.push(text(z4, 40, 340, 'Editorial District', { size: 'xl', font: SERIF }))
	shapes.push(
		text(z4, 40, 460, 'Article titles, mastheads, district names.', {
			size: 's',
			font: SANS,
			color: 'grey',
		}),
	)
	// Body
	shapes.push(text(z4, 40, 540, 'BODY', { size: 's', font: SANS, color: 'grey' }))
	shapes.push(
		text(
			z4,
			40,
			580,
			'The page breathes through three-cycle theme transitions and through scroll-revealed cartography. Reading intimacy is the contract.',
			{ size: 'm', font: SERIF, w: COL_W - 80 },
		),
	)
	// Nav
	shapes.push(text(z4, 40, 780, 'NAV', { size: 's', font: SANS, color: 'grey' }))
	shapes.push(text(z4, 40, 820, 'HOME · ARTICLES · DISTRICTS · ARCHIVE', { size: 'm', font: SANS }))
	shapes.push(
		text(z4, 40, 880, 'Small uppercase wayfinding.', {
			size: 's',
			font: SANS,
			color: 'grey',
		}),
	)
	// Code / meta
	shapes.push(text(z4, 40, 950, 'CODE / META', { size: 's', font: SANS, color: 'grey' }))
	shapes.push(
		text(z4, 40, 990, 'commit 9e46960  lane=hybrid  dlds=ok', {
			size: 'm',
			font: MONO,
		}),
	)
	shapes.push(
		text(z4, 40, 1050, 'Terminal, provenance, DLDS, live tickers.', {
			size: 's',
			font: SANS,
			color: 'grey',
		}),
	)
	// Civic / Dante
	shapes.push(text(z4, 40, 1120, 'CIVIC / DANTE', { size: 's', font: SANS, color: 'grey' }))
	shapes.push(
		text(z4, 40, 1160, 'Editorial District · Civic-Dante · Inferno', {
			size: 'l',
			font: SERIF,
		}),
	)
	shapes.push(
		text(z4, 40, 1240, 'Cartography labels only. Never regular site chrome.', {
			size: 's',
			font: SANS,
			color: 'grey',
		}),
	)
	shapes.push(
		note(
			z4,
			40,
			1340,
			'violet',
			'Claude:\nDo not merge the type roles. The system works because each typeface is contained. If a component feels wrong, check whether it is using the wrong typography slot.',
			'l',
		),
	)

	// ===== Zone 5: Component inventory (double-wide) =====
	const z5 = createShapeId()
	const z5w = COL_W * 2 + GAP
	shapes.push(frame(z5, colX(2), rowY(1), z5w, ROW_H - 100, 'Zone 5 — Component Inventory (20 cards)'))
	shapes.push(
		text(
			z5,
			40,
			40,
			'20 canonical components grouped by editorial role. Card schema: Role · Code path · Visual archetype · States · Refs · Claude task.',
			{ size: 's', font: SERIF, w: z5w - 80 },
		),
	)
	const components: { name: string; role: string; group: string }[] = [
		{ name: 'MastheadWordmark', role: 'split-color wordmark', group: 'Foundation' },
		{ name: 'SiteNav', role: 'wayfinding signage', group: 'Foundation' },
		{ name: 'ChapterRail', role: 'article position rail', group: 'Foundation' },
		{ name: 'ReadingProgress', role: 'progress meter', group: 'Foundation' },
		{ name: 'Footnote', role: 'in-flow annotation', group: 'Foundation' },
		{ name: 'CodeBlockCopyButton', role: 'Shiki + one-click copy', group: 'Foundation' },
		{ name: 'DldsPanel', role: 'lane-provenance display', group: 'Article' },
		{ name: 'MetroMapMarker', role: 'cartography junction', group: 'Article' },
		{ name: 'MetaArticleOpener', role: 'compressed data-forward opener', group: 'Article' },
		{ name: 'NarrativeArticleOpener', role: 'literary opener', group: 'Article' },
		{ name: 'InstitutionalFixture', role: 'Paradiso seed-mandate fixture', group: 'Cross' },
		{ name: 'CartographyCanvas', role: 'cartography substrate', group: 'Cross' },
		{ name: 'ReceptionHero', role: 'feature story surface', group: 'Reception' },
		{ name: 'EditorialDigest', role: 'today + coming soon', group: 'Reception' },
		{ name: 'LiveTicker', role: 'rolling Inferno activity', group: 'Reception' },
		{ name: 'DistrictMap', role: 'cartographic orientation', group: 'Reception' },
		{ name: 'CrossPost', role: 'cross-Building syndication', group: 'Utility' },
		{ name: 'SearchPalette', role: 'cmdk editorial search', group: 'Utility' },
		{ name: 'VirgilChat', role: 'AI editorial companion', group: 'Utility' },
		{ name: 'LiveRoom', role: 'real-time collaboration', group: 'Utility' },
	]
	const cardCols = 5
	const cardW = (z5w - 80 - (cardCols - 1) * 30) / cardCols
	const cardH = 280
	for (let i = 0; i < components.length; i++) {
		const c = components[i]
		const cx = (i % cardCols) * (cardW + 30) + 40
		const cy = Math.floor(i / cardCols) * (cardH + 30) + 140
		shapes.push(rect(z5, cx, cy, cardW, cardH, { color: 'black', fill: 'none', dash: 'solid' }))
		shapes.push(
			text(z5, cx + 16, cy + 16, c.name, {
				size: 's',
				font: SANS,
				w: cardW - 32,
			}),
		)
		shapes.push(
			text(z5, cx + 16, cy + 70, c.role, {
				size: 's',
				font: SERIF,
				color: 'grey',
				w: cardW - 32,
			}),
		)
		shapes.push(
			text(z5, cx + 16, cy + cardH - 60, `[${c.group}]`, {
				size: 's',
				font: MONO,
				color: 'grey',
				w: cardW - 32,
			}),
		)
	}
	shapes.push(
		note(
			z5,
			40,
			140 + 4 * (cardH + 30) + 80,
			'blue',
			'Card schema (fill per component):\nComponent: …\nRole: …\nExisting code path: …\nVisual archetype: …\nStates / variants: …\nReferences to use: …\nReferences to avoid: …\nClaude task: …',
			'xl',
		),
	)
	shapes.push(
		note(
			z5,
			1100,
			140 + 4 * (cardH + 30) + 80,
			'green',
			'Example — ChapterRail:\nRole: article wayfinding rail\nCode: code/packages/ui/src/components/custom/ChapterRail\nArchetype: thin structural rail, not a card\nStates: default, collapsed, reception-condensed, mobile-bottom-sheet\nUse: quiet editorial side nav, magazine page furniture\nAvoid: Roman numerals, ornamental dividers, heavy boxed nav\nTask: refine spacing + responsive while preserving rail archetype',
			'xl',
		),
	)

	// ===== Zone 6: Homepage reception =====
	const z6 = createShapeId()
	shapes.push(frame(z6, colX(0), rowY(2), COL_W, ROW_H - 100, 'Zone 6 — Homepage = DISpatch reception'))
	shapes.push(
		text(
			z6,
			40,
			40,
			"The homepage should feel like walking into the building's reception. Not a SaaS hero page. The front of a magazine-building.",
			{ size: 'm', font: SERIF, w: COL_W - 80 },
		),
	)
	const stack: [string, string, number][] = [
		['MastheadWordmark', 'top — DIS / patch split', 100],
		['ReceptionHero', 'feature story', 320],
		['EditorialDigest', 'today + coming soon', 280],
		['LiveTicker', 'office activity window', 140],
		['DistrictMap', 'cartographic orientation (subtle)', 280],
		['VirgilChat', 'optional guide (corner)', 100],
		['InstitutionalFixture', 'quiet mandate (footer)', 100],
	]
	let sy = 200
	for (const [name, role, h] of stack) {
		shapes.push(rect(z6, 40, sy, COL_W - 80, h, { color: 'grey', fill: 'none', dash: 'dashed' }))
		shapes.push(text(z6, 60, sy + 12, name, { size: 's', font: SANS }))
		shapes.push(text(z6, 60, sy + 56, role, { size: 's', font: SERIF, color: 'grey' }))
		sy += h + 20
	}

	// ===== Zone 7: Article surfaces =====
	const z7 = createShapeId()
	shapes.push(frame(z7, colX(1), rowY(2), COL_W, ROW_H - 100, 'Zone 7 — Article Surfaces (META | NARRATIVE)'))
	shapes.push(
		text(z7, 40, 40, 'Two reader contracts. Do not collapse them into one generic ArticleHeader.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	const halfW = (COL_W - 100) / 2
	// META
	const metaX = 40
	shapes.push(rect(z7, metaX, 120, halfW, 1380, { color: 'blue', fill: 'none', dash: 'solid' }))
	shapes.push(text(z7, metaX + 16, 140, 'META', { size: 'l', font: SANS, color: 'blue' }))
	shapes.push(
		text(
			z7,
			metaX + 16,
			220,
			'Compressed layout\nMetadata band prominent\nDLDS / provenance visible\nCode/meta typography allowed\nDataviz or structured media high',
			{ size: 's', font: SERIF, w: halfW - 32 },
		),
	)
	shapes.push(
		rect(z7, metaX + 16, 520, halfW - 32, 80, {
			color: 'grey',
			fill: 'semi',
			dash: 'solid',
			text: 'metadata band',
		}),
	)
	shapes.push(
		rect(z7, metaX + 16, 620, halfW - 32, 100, {
			color: 'black',
			fill: 'none',
			dash: 'solid',
			text: 'title',
		}),
	)
	shapes.push(
		rect(z7, metaX + 16, 740, halfW - 32, 380, {
			color: 'grey',
			fill: 'none',
			dash: 'dashed',
			text: 'data / code blocks',
		}),
	)
	// NARRATIVE
	const narrX = 40 + halfW + 20
	shapes.push(rect(z7, narrX, 120, halfW, 1380, { color: 'orange', fill: 'none', dash: 'solid' }))
	shapes.push(text(z7, narrX + 16, 140, 'NARRATIVE', { size: 'l', font: SANS, color: 'orange' }))
	shapes.push(
		text(
			z7,
			narrX + 16,
			220,
			'Spacious layout\nLarge editorial title\nStandfirst or epigraph\nMetadata restrained below opening\nArticle-as-sanctuary',
			{ size: 's', font: SERIF, w: halfW - 32 },
		),
	)
	shapes.push(
		rect(z7, narrX + 16, 520, halfW - 32, 180, {
			color: 'black',
			fill: 'none',
			dash: 'solid',
			text: 'title',
		}),
	)
	shapes.push(
		rect(z7, narrX + 16, 720, halfW - 32, 60, {
			color: 'grey',
			fill: 'none',
			dash: 'dotted',
			text: 'standfirst / epigraph',
		}),
	)
	shapes.push(
		rect(z7, narrX + 16, 800, halfW - 32, 80, {
			color: 'grey',
			fill: 'semi',
			dash: 'solid',
			text: 'metadata (restrained, below)',
		}),
	)
	shapes.push(
		rect(z7, narrX + 16, 900, halfW - 32, 220, {
			color: 'grey',
			fill: 'none',
			dash: 'dashed',
			text: 'prose',
		}),
	)
	shapes.push(
		note(
			z7,
			40,
			1540,
			'violet',
			'Claude:\nMETA and NARRATIVE are separate reader contracts. Do not collapse them into one generic ArticleHeader unless explicitly asked.',
			'l',
		),
	)

	// ===== Zone 8: Cartography =====
	const z8 = createShapeId()
	shapes.push(frame(z8, colX(2), rowY(2), COL_W, ROW_H - 100, 'Zone 8 — Cartography is the MVP hero, subtly.'))
	shapes.push(
		text(z8, 40, 40, 'Most important visual thesis. The map should feel alive, not busy.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	const mapRefs = [
		'District map',
		'D&D map',
		'GTA-style world',
		'Modern fictional city',
		'Contour / paper-grain',
		'Red pulse markers',
	]
	for (let i = 0; i < mapRefs.length; i++) {
		const cx = (i % 3) * 500 + 40
		const cy = Math.floor(i / 3) * 380 + 140
		shapes.push(
			rect(z8, cx, cy, 460, 340, {
				color: 'grey',
				fill: 'pattern',
				dash: 'dashed',
				text: mapRefs[i],
			}),
		)
	}
	shapes.push(text(z8, 40, 940, 'Cartography dial', { size: 'm', font: SANS }))
	const dials: [string, string, string][] = [
		['Low', 'barely present substrate behind article', 'light-violet'],
		['Medium', 'homepage DistrictMap visible, not overwhelming', 'violet'],
		['High', 'focused map exploration surface', 'blue'],
	]
	for (let i = 0; i < dials.length; i++) {
		const [name, role, col] = dials[i]
		shapes.push(rect(z8, 40 + i * 500, 1000, 460, 180, { color: col, fill: 'solid' }))
		shapes.push(text(z8, 40 + i * 500, 1200, `${name}\n${role}`, { size: 's', font: MONO, w: 460 }))
	}
	shapes.push(
		note(
			z8,
			40,
			1420,
			'violet',
			'Claude:\nIf the cartography feels too complicated, simplify visible elements to make the system feel deeper. Do not add noise. The map should feel alive, not busy.',
			'l',
		),
	)

	// ===== Zone 9: External asset drop zone =====
	const z9 = createShapeId()
	shapes.push(frame(z9, colX(0), rowY(3), COL_W, ROW_H - 100, 'Zone 9 — External Asset Drop Zone'))
	shapes.push(
		text(z9, 40, 40, 'Drop Midjourney / Figma Make / v0 / Framer / Lucidchart references here. Every item gets a label.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	const cols9 = ['Mood only', 'Layout only', 'Component only', 'Interaction only', 'Asset candidate', 'Anti-reference']
	const col9W = (COL_W - 80 - (cols9.length - 1) * 20) / cols9.length
	for (let i = 0; i < cols9.length; i++) {
		const cx = i * (col9W + 20) + 40
		shapes.push(
			rect(z9, cx, 140, col9W, 60, {
				color: i === cols9.length - 1 ? 'red' : 'black',
				fill: 'semi',
				dash: 'solid',
				text: cols9[i],
			}),
		)
		shapes.push(rect(z9, cx, 220, col9W, 880, { color: 'grey', fill: 'pattern', dash: 'dashed' }))
	}
	shapes.push(
		note(
			z9,
			40,
			1160,
			'yellow',
			'Per item:\nUse for: …\nIgnore: …\nApply to: …\nConfidence: low | med | high',
			'm',
		),
	)
	shapes.push(
		note(
			z9,
			760,
			1160,
			'blue',
			'Example A:\nUse for: hero mood and atmospheric depth.\nIgnore: literal typography and subject matter.\nApply to: CartographyCanvas background.\nConfidence: high.',
			'm',
		),
	)
	shapes.push(
		note(
			z9,
			40,
			1420,
			'blue',
			'Example B:\nUse for: card spacing and information hierarchy.\nIgnore: color palette, rounded SaaS style.\nApply to: EditorialDigest cards.\nConfidence: medium.',
			'm',
		),
	)

	// ===== Zone 10: Claude Code task queue =====
	const z10 = createShapeId()
	shapes.push(frame(z10, colX(1), rowY(3), COL_W, ROW_H - 100, 'Zone 10 — Claude Code Task Queue'))
	shapes.push(
		text(z10, 40, 40, 'Convert visual decisions into implementation tasks.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	shapes.push(
		note(
			z10,
			40,
			120,
			'blue',
			'Task schema:\nTask:\nTarget component / page:\nCurrent issue:\nDesired change:\nVisual references:\nTokens to preserve:\nFiles likely involved:\nAcceptance criteria:\nDo not change:',
			'xl',
		),
	)
	shapes.push(
		note(
			z10,
			40,
			900,
			'green',
			'Example — Refine homepage reception hero\nTarget: ReceptionHero + homepage composition\nIssue: too generic, not enough magazine-building reception\nChange: stronger editorial feature-story hierarchy with warmer Vellum substrate, subtle cartography behind\nRefs: North Star 1, DistrictMap ref 2\nTokens: --sky-low, --window-warm, --lane-editorial, --accent-prime\nFiles:\n• code/packages/ui/src/components/patterns/ReceptionHero\n• code/apps/microsite-astro/src\n• code/apps/microsite-next/app/page.tsx (if mirrored)\nAccept: still feels like DISpatch, no SaaS gradient, mobile works, consumes tokens.\nDo not change: wordmark split, type slot containment.',
			'xl',
		),
	)

	// ===== Zone 11: Do-not-use wall =====
	const z11 = createShapeId()
	shapes.push(frame(z11, colX(2), rowY(3), COL_W, ROW_H - 100, 'Zone 11 — Do-Not-Use Wall'))
	shapes.push(
		text(z11, 40, 40, 'Binding negative context. Do not borrow from these references even if they look polished.', {
			size: 'm',
			font: SERIF,
			w: COL_W - 80,
		}),
	)
	const rejects = [
		'Generic gradient SaaS hero',
		'Heavy glassmorphism',
		'Neon cyberpunk',
		'Random map HUD overlays',
		'Decorative icons with no semantic role',
		'Full-page lane gradients',
		'Typefaces escaping their slots',
		'Card-heavy dashboard look',
		'Over-ornamented medieval / Dante motifs',
		'Literal "AI robot" imagery',
	]
	for (let i = 0; i < rejects.length; i++) {
		const cx = (i % 2) * 760 + 40
		const cy = Math.floor(i / 2) * 240 + 140
		shapes.push(note(z11, cx, cy, 'red', rejects[i], 'm'))
	}
	shapes.push(
		note(
			z11,
			40,
			1380,
			'violet',
			'Claude:\nTreat this wall as binding negative context. Do not borrow from these references even if they look polished.',
			'l',
		),
	)

	// ===== Zone 12: Final build brief (full-width, bottom) =====
	const z12 = createShapeId()
	const z12w = COL_W * 3 + GAP * 2
	shapes.push(frame(z12, colX(0), rowY(4), z12w, 1700, 'Zone 12 — Final Build Brief'))
	shapes.push(text(z12, 40, 40, 'Build brief — read this before touching code.', { size: 'l', font: SERIF }))
	const brief = `Project:
DISpatch — Prime City dev-diary microsite.

Visual thesis:
Architectural / editorial / neo-vintage / AI-forward magazine-building.
Warm-paper Vellum substrate. Cartography is the subtle living hero.
META and NARRATIVE registers coexist through strict typography containment.

Preserve:
• Vellum warm paper atmosphere
• DIS red + patch dark wordmark
• Red as infra/dispatch signal
• Local lane pigments
• Restrained chrome
• Typographic hierarchy
• Subtle cartography substrate

Avoid:
• Generic SaaS
• Neon cyberpunk
• Glassmorphism
• Decorative map noise
• Invented colors or type roles

Implement next:
1. [specific task]
2. [specific task]
3. [specific task]

Before coding:
Summarize interpretation, list files you plan to touch, identify any uncertain visual decisions, then wait for confirmation unless I say to proceed.`
	shapes.push(text(z12, 40, 120, brief, { size: 's', font: SERIF, w: 2000 }))

	const handoff = `You are implementing against this tldraw visual brief for DISpatch.

Read by zone:
1. Existing DISpatch DNA is canonical.
2. North Star references = mood only unless labeled otherwise.
3. Color + typography zones define token & type-slot constraints.
4. Component inventory cards map visual decisions to code paths.
5. External assets only per their labels.
6. The do-not-use wall is binding negative context.
7. The final build brief is the implementation summary.

Non-negotiables:
• Use existing design tokens when possible.
• Don't invent colors without proposing a token role.
• Preserve wordmark split: DIS red, patch dark.
• Preserve type containment: title, body, nav, code/meta, civic, wordmark.
• Cartography is subtle living substrate, not decorative noise.
• META = compressed/data-forward. NARRATIVE = spacious/literary.
• Lanes are local semantic accents, not page-wide gradients.

Before editing code, respond with:
1. design interpretation
2. target components / pages
3. files likely touched
4. risks or ambiguities
5. acceptance criteria

Only then implement.`
	shapes.push(note(z12, 2160, 120, 'violet', handoff, 'xl'))

	// ===== Apply =====
	editor.createShapes(shapes)
	editor.zoomToFit()
}
