/**
 * SpheresSpread — "A way forward" + the Prime cosmology.
 *
 * Locked 2026-05-14:
 *   - Right column: real production code (the Crossfire GSAP timeline that
 *     drives the homepage), rendered as a layered terminal panel with
 *     PowerShell-style syntax colors and elevation depth.
 *   - Cosmology table: each row carries a Divine-Comedy reference set in
 *     IM Fell English italic (the civic-Dante slot per CD2 §5.3).
 *   - Empyrean role tightened to "1 Mayor".
 */

'use client'

import { motion } from 'motion/react'
import { PALETTE } from './shared/palette'

type Layer = {
	name: string
	count: string
	role: string
	folder: string
}

const COSMOLOGY: Layer[] = [
	{
		name: 'Empyrean',
		count: '1 Mayor',
		role: 'Mayor and their staff',
		folder: 'empyrean/',
	},
	{
		name: 'Paradiso',
		count: '9 Charter Spheres',
		role: 'Aspiration · the bar',
		folder: 'paradiso/',
	},
	{
		name: 'Eden',
		count: '1 (with per-allied subfolders)',
		role: 'Allied AI surfaces customized for Prime + worker liaisons (Claude, Notion, Linear, etc.)',
		folder: 'eden/',
	},
	{
		name: 'Purgatorio',
		count: '7 Organizational Terraces',
		role: 'Brand · Roads · Districts · Neighborhoods · Offices · Citizens · Leisure',
		folder: 'purgatorio/',
	},
	{
		name: 'Inferno',
		count: '9 Infra Layers',
		role: 'Foundational infrastructure',
		folder: 'inferno/',
	},
	{
		name: 'Pillars',
		count: '5 Construction Pillars',
		role: 'Constitutive components encoded in every citizen',
		folder: 'pillars/',
	},
	{
		name: 'Histories',
		count: 'Archive',
		role: 'Living history — archived + tombstoned content',
		folder: 'histories/',
	},
]

export function SpheresSpread() {
	return (
		<section
			aria-label="A way forward — the Prime cosmology"
			className="relative border-t border-body-strong/15"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			<div className="mx-auto max-w-[1880px] px-6 py-20 md:px-12 md:py-28">
				{/* ── Section header ─────────────────────────────────────────── */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7 }}
					className="flex items-baseline justify-between gap-6 border-b border-body-strong/25 pb-3"
				>
					<div className="flex items-baseline gap-4">
						<span
							className="font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copperDeep }}
						>
							A Way Forward
						</span>
						<span className="font-narrative italic text-[clamp(1.5rem,4vw,3rem)] leading-[0.95] tracking-[-0.018em] text-body-strong">
							The Prime cosmology
						</span>
					</div>
					<span className="hidden font-mono text-[12px] uppercase tracking-[0.32em] text-body-muted md:inline">
						Registered · 7 layers
					</span>
				</motion.div>

				{/* ── Lede + Terminal ────────────────────────────────────────── */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] lg:gap-16"
				>
					<div>
						<p className="font-narrative text-[1.0625rem] leading-[1.65] text-body-strong md:text-[1.1875rem]">
							<span
								className="float-left mr-3 mt-1 font-wordmark font-bold leading-[0.85] tracking-[-0.04em]"
								style={{
									fontSize: 'clamp(3rem, 5vw, 4.5rem)',
									color: PALETTE.accent,
								}}
							>
								P
							</span>
							rime City is being built layer by layer. The cosmology IS the repo —
							every layer is a folder, every folder a domain. The terminal beside
							this paragraph shows the actual GSAP timeline driving the Crossfire
							dossier deck on the homepage. Real code, not a sample.
						</p>
						<p className="mt-5 font-narrative text-[0.9375rem] leading-relaxed text-body-muted">
							Nothing about this cosmology is aspirational. It is the working
							structure already in production, and every dispatch DISpatch
							publishes is filed against one of these seven layers.
						</p>
					</div>

					{/* Terminal — premium elevation, PowerShell colors */}
					<TerminalPanel />
				</motion.div>

				{/* ── Cosmology table — IM Fell + Divine Comedy ──────────────── */}
				<div className="mt-20 border-t border-body-strong/25 pt-4">
					<p
						className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.42em]"
						style={{ color: PALETTE.copperLabel }}
					>
						Canonical Prime cosmology · 7 layers registered
					</p>

					<motion.ol
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
						className="divide-y divide-body-strong/15"
					>
						{COSMOLOGY.map((layer, i) => (
							<motion.li
								key={layer.name}
								variants={{
									hidden: { opacity: 0, y: 12 },
									visible: { opacity: 1, y: 0 },
								}}
								transition={{ duration: 0.5, delay: i * 0.06 }}
								className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 py-6 md:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.6fr)_auto] md:gap-8"
							>
								{/* Roman numeral in IM Fell English */}
								<span
									className="leading-none italic"
									style={{
										fontFamily: 'var(--font-civic)',
										fontSize: 'clamp(1.625rem, 2.4vw, 2rem)',
										color: PALETTE.copperDeep,
									}}
								>
									{ROMAN[i]}
								</span>

								{/* Name + count */}
								<div>
									<p
										className="font-narrative font-bold leading-tight tracking-[-0.018em] text-body-strong"
										style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)' }}
									>
										{layer.name}
									</p>
									<p
										className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em]"
										style={{ color: PALETTE.copperDeep }}
									>
										{layer.count}
									</p>
								</div>

								{/* Role description — set in IM Fell English italic */}
								<p
									className="hidden italic leading-[1.45] text-body-strong md:block"
									style={{
										fontFamily: 'var(--font-civic)',
										fontSize: 'clamp(1rem, 1.2vw, 1.1875rem)',
										color: 'oklch(0.32 0.04 60)',
									}}
								>
									{layer.role}
								</p>

								{/* Folder — typographic, no box */}
								<code
									className="hidden font-mono text-[12px] uppercase tracking-[0.18em] md:inline"
									style={{ color: PALETTE.copperLabel }}
								>
									{layer.folder}
								</code>
							</motion.li>
						))}
					</motion.ol>
				</div>

				{/* ── Footnote ───────────────────────────────────────────────── */}
				<motion.p
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-10 max-w-[60ch] font-narrative italic text-[0.9375rem] leading-relaxed text-body-muted"
				>
					— City Charters will be published into{' '}
					<code className="not-italic font-mono text-[0.875em] text-body-strong">
						paradiso/
					</code>{' '}
					as they are drafted. Each charter ratifies one sphere of how Prime behaves;
					DISpatch will dispatch the ratification.
				</motion.p>
			</div>
		</section>
	)
}

/* ── Roman numerals ───────────────────────────────────────────────────────── */
const ROMAN = ['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.', 'VII.'] as const

/* ────────────────────────────────────────────────────────────────────────────
 * TerminalPanel — premium code surface
 *
 * Visual: layered surface (outer shadow + inner highlight + status bars).
 * Window chrome with traffic lights. JetBrains Mono in PowerShell-style
 * colors. Real GSAP timeline from the Crossfire deck.
 * ────────────────────────────────────────────────────────────────────────── */

const PWSH = {
	bg: 'oklch(0.16 0.02 50)',
	bgElev: 'oklch(0.20 0.018 55)',
	bgChrome: 'oklch(0.13 0.02 50)',
	border: 'oklch(0.32 0.018 55)',
	gutter: 'oklch(0.42 0.015 60)',
	text: 'oklch(0.92 0.02 90)',
	muted: 'oklch(0.62 0.02 60)',
	comment: 'oklch(0.55 0.10 145)',     // green
	keyword: 'oklch(0.74 0.18 320)',     // magenta-pink
	string: 'oklch(0.82 0.16 85)',       // gold/yellow
	number: 'oklch(0.78 0.13 200)',      // cyan
	fn: 'oklch(0.86 0.16 78)',           // bright yellow (functions)
	prop: 'oklch(0.82 0.10 200)',        // soft blue
	red: 'oklch(0.66 0.20 25)',          // red
}

function TerminalPanel() {
	return (
		<div
			className="relative overflow-hidden rounded-[6px]"
			style={{
				/* Layered elevation: large soft outer shadow + inner highlight + border */
				boxShadow:
					'0 40px 80px -30px rgba(0,0,0,0.55), 0 14px 28px -10px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px ' +
					PWSH.border,
				background: PWSH.bg,
			}}
		>
			{/* ── Title bar (window chrome) ──────────────────────────────── */}
			<div
				className="flex items-center justify-between px-4 py-2.5 border-b"
				style={{
					background: PWSH.bgChrome,
					borderColor: PWSH.border,
				}}
			>
				<div className="flex items-center gap-2">
					{/* Traffic lights */}
					<span className="block h-3 w-3 rounded-full" style={{ background: '#ff5f56', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)' }} />
					<span className="block h-3 w-3 rounded-full" style={{ background: '#ffbd2e', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)' }} />
					<span className="block h-3 w-3 rounded-full" style={{ background: '#27c93f', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)' }} />
					<span
						className="ml-3 font-mono text-[11px] uppercase tracking-[0.18em]"
						style={{ color: PWSH.muted }}
					>
						code/components/home/CrossfireSpread.tsx — gsap timeline
					</span>
				</div>
				<span
					className="hidden font-mono text-[10px] uppercase tracking-[0.18em] sm:inline"
					style={{ color: PWSH.muted }}
				>
					● JetBrains Mono · UTF-8 · LF
				</span>
			</div>

			{/* ── Code area ──────────────────────────────────────────────── */}
			<div
				className="relative flex font-mono text-[12.5px] leading-[1.7]"
				style={{ background: PWSH.bg }}
			>
				{/* Line numbers gutter */}
				<div
					className="select-none border-r py-4 px-3 text-right tabular-nums"
					style={{
						color: PWSH.gutter,
						background: PWSH.bgElev,
						borderColor: PWSH.border,
						minWidth: '2.5rem',
					}}
				>
					{Array.from({ length: 22 }, (_, i) => (
						<div key={i}>{String(i + 1).padStart(2, '0')}</div>
					))}
				</div>

				{/* Code */}
				<pre
					className="flex-1 overflow-x-auto py-4 pl-5 pr-4 whitespace-pre"
					style={{ color: PWSH.text }}
				>
{/* Real Crossfire timeline — syntax-highlighted by hand */}
<><span style={{ color: PWSH.comment }}>{'// Crossfire dossier deck — Lenis ↔ ScrollTrigger bridge'}</span>{'\n'}
<span style={{ color: PWSH.keyword }}>const</span>{' '}<span style={{ color: PWSH.text }}>ctx</span>{' = '}<span style={{ color: PWSH.fn }}>gsap</span>{'.'}<span style={{ color: PWSH.fn }}>context</span>{'(() => {'}{'\n'}
{'  '}<span style={{ color: PWSH.keyword }}>const</span>{' '}<span style={{ color: PWSH.text }}>cards</span>{' = '}<span style={{ color: PWSH.fn }}>gsap</span>{'.'}<span style={{ color: PWSH.prop }}>utils</span>{'.'}<span style={{ color: PWSH.fn }}>toArray</span>{'<'}<span style={{ color: PWSH.prop }}>HTMLElement</span>{'>('}<span style={{ color: PWSH.string }}>{"'.dossier-card'"}</span>{')'}{'\n'}
{'  '}<span style={{ color: PWSH.keyword }}>const</span>{' '}<span style={{ color: PWSH.text }}>N</span>{' = '}<span style={{ color: PWSH.text }}>cards</span>{'.'}<span style={{ color: PWSH.prop }}>length</span>{'\n'}
{'\n'}
{'  '}<span style={{ color: PWSH.fn }}>gsap</span>{'.'}<span style={{ color: PWSH.fn }}>set</span>{'('}<span style={{ color: PWSH.text }}>cards</span>{', { '}<span style={{ color: PWSH.prop }}>clipPath</span>{': '}<span style={{ color: PWSH.string }}>{"'inset(0% 0% 0% 0%)'"}</span>{' })'}{'\n'}
{'\n'}
{'  '}<span style={{ color: PWSH.keyword }}>const</span>{' '}<span style={{ color: PWSH.text }}>tl</span>{' = '}<span style={{ color: PWSH.fn }}>gsap</span>{'.'}<span style={{ color: PWSH.fn }}>timeline</span>{'({'}{'\n'}
{'    '}<span style={{ color: PWSH.prop }}>scrollTrigger</span>{': {'}{'\n'}
{'      '}<span style={{ color: PWSH.prop }}>trigger</span>{': '}<span style={{ color: PWSH.text }}>pinRef</span>{'.'}<span style={{ color: PWSH.prop }}>current</span>{','}{'\n'}
{'      '}<span style={{ color: PWSH.prop }}>start</span>{': '}<span style={{ color: PWSH.string }}>{"'top top'"}</span>{','}{'\n'}
{'      '}<span style={{ color: PWSH.prop }}>end</span>{': () => '}<span style={{ color: PWSH.string }}>{'`+='}</span><span style={{ color: PWSH.red }}>{'${'}</span><span style={{ color: PWSH.text }}>{'(N - '}</span><span style={{ color: PWSH.number }}>1</span><span style={{ color: PWSH.text }}>{') * window.'}</span><span style={{ color: PWSH.prop }}>innerHeight</span><span style={{ color: PWSH.red }}>{'}'}</span><span style={{ color: PWSH.string }}>{'`'}</span>{','}{'\n'}
{'      '}<span style={{ color: PWSH.prop }}>pin</span>{': '}<span style={{ color: PWSH.text }}>pinRef</span>{'.'}<span style={{ color: PWSH.prop }}>current</span>{','}{'\n'}
{'      '}<span style={{ color: PWSH.prop }}>scrub</span>{': '}<span style={{ color: PWSH.number }}>0.8</span>{','}{'\n'}
{'      '}<span style={{ color: PWSH.prop }}>anticipatePin</span>{': '}<span style={{ color: PWSH.number }}>1</span>{','}{'\n'}
{'    },'}{'\n'}
{'  })'}{'\n'}
{'\n'}
{'  '}<span style={{ color: PWSH.comment }}>{'// Each card flips away after a 45% dwell window'}</span>{'\n'}
{'  '}<span style={{ color: PWSH.keyword }}>for</span>{' ('}<span style={{ color: PWSH.keyword }}>let</span>{' '}<span style={{ color: PWSH.text }}>i</span>{' = '}<span style={{ color: PWSH.number }}>0</span>{'; '}<span style={{ color: PWSH.text }}>i</span>{' < '}<span style={{ color: PWSH.text }}>N</span>{' - '}<span style={{ color: PWSH.number }}>1</span>{'; '}<span style={{ color: PWSH.text }}>i</span>{'++) {'}{'\n'}
{'    '}<span style={{ color: PWSH.text }}>tl</span>{'.'}<span style={{ color: PWSH.fn }}>to</span>{'('}<span style={{ color: PWSH.text }}>cards</span>{'['}<span style={{ color: PWSH.text }}>i</span>{'], { '}<span style={{ color: PWSH.prop }}>yPercent</span>{': '}<span style={{ color: PWSH.number }}>-120</span>{', '}<span style={{ color: PWSH.prop }}>rotateX</span>{': '}<span style={{ color: PWSH.number }}>-28</span>{', '}<span style={{ color: PWSH.prop }}>opacity</span>{': '}<span style={{ color: PWSH.number }}>0</span>{', '}<span style={{ color: PWSH.prop }}>ease</span>{': '}<span style={{ color: PWSH.text }}>flipEase</span>{', '}<span style={{ color: PWSH.prop }}>duration</span>{': '}<span style={{ color: PWSH.number }}>0.55</span>{' }, '}<span style={{ color: PWSH.text }}>i</span>{' + '}<span style={{ color: PWSH.number }}>0.45</span>{')'}{'\n'}
{'  }'}{'\n'}
{'}, '}<span style={{ color: PWSH.text }}>sectionRef</span>{')'}</>
				</pre>
			</div>

			{/* ── Status bar ─────────────────────────────────────────────── */}
			<div
				className="flex items-center justify-between border-t px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em]"
				style={{
					background: PWSH.bgChrome,
					borderColor: PWSH.border,
					color: PWSH.muted,
				}}
			>
				<div className="flex items-center gap-3">
					<span style={{ color: PWSH.fn }}>● main</span>
					<span>·</span>
					<span>22 lines</span>
					<span>·</span>
					<span>tsx</span>
				</div>
				<span style={{ color: PWSH.string }}>0 errors · 0 warnings</span>
			</div>
		</div>
	)
}
