#!/usr/bin/env bun
/**
 * ideate-visual — the Dispatch ideation rail (ADR-0003 §Stage 1, board S7).
 *
 * Turns a one-line need into contract-aware image ideation. The whole point of
 * the stage is that the prompt is assembled FROM canon rather than typed from
 * memory: palette, typography, cycle ground and the tombstoned-invention list
 * are read out of DESIGN.md at run time, so ideation cannot drift from the
 * brand contract the way a hand-written prompt does.
 *
 * Every run writes its artifacts into `design/ideation/<slug>/` together with a
 * `provenance.json` recording prompt + model + date + cost + the SHA-256 of the
 * contract it consumed. That file is not documentation — `check-ideation-
 * provenance.ts` fails the `ideation` CI gate closed without it. Commit with
 * provenance or discard; there is no third state (ADR-0003 §Stage 1: "without
 * the commit-or-discard rule this stage produces orphan mocks").
 *
 * Nothing here ships. `design/ideation/` is a landing zone, and the same gate
 * forbids `code/` from referencing it — promotion of a plate into
 * `public/banners/` is a deliberate copy under AK's content review, never an
 * automated step.
 *
 * Zero dependencies by design: it lives outside the `code/` pnpm workspace, so
 * no build, typecheck, or lint gate compiles it (ADR-0003 §Stage 1: "excluded
 * from build/lint gates").
 *
 *   doppler run -p prime-city -c dev -- bun scripts/ideate-visual.ts \
 *     --slug dispatch-01-banner \
 *     --brief "..." \
 *     --need "F13 — dispatch-01 ships the banner placeholder to production"
 *
 * `--dry-run` prints the assembled prompt and spends nothing.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DESIGN_MD = join(REPO_ROOT, 'DESIGN.md')
const HOUSE_REGISTER = join(REPO_ROOT, 'design', 'ideation', 'house-register.md')
const LANDING_ZONE = join(REPO_ROOT, 'design', 'ideation')

/* ── Model rail ───────────────────────────────────────────────────────────
 * Nano Banana Pro is the ADR's primary (register §5, "lean $0" — pay-per-use
 * only, no subscription). Prices are per output image, fetched from
 * https://ai.google.dev/gemini-api/docs/pricing on 2026-08-19; re-fetch before
 * trusting them for a spend decision. The ADR's $10/month ceiling is the rule
 * these numbers are checked against.
 * ───────────────────────────────────────────────────────────────────────── */
const MODELS = {
	'gemini-3-pro-image': { label: 'Nano Banana Pro', usd: { '1K': 0.134, '2K': 0.134, '4K': 0.24 } },
	'gemini-3.1-flash-image': { label: 'Nano Banana 2', usd: { '1K': 0.067, '2K': 0.101, '4K': 0.151 } },
	// The pricing page publishes only a 1K figure for Lite. Rather than infer the
	// others, they are null and the run refuses: an unpriced image cannot be
	// checked against the ADR's $10/month ceiling, and a guessed cost in a
	// provenance record is worse than no record at all.
	'gemini-3.1-flash-lite-image': { label: 'Nano Banana 2 Lite', usd: { '1K': 0.0336, '2K': null, '4K': null } },
} as const satisfies Record<string, { label: string; usd: Record<ImageSize, number | null> }>

type ModelId = keyof typeof MODELS
type ImageSize = '1K' | '2K' | '4K'
type Cycle = 'dawn' | 'dusk' | 'night'

const ASPECTS = ['1:1', '3:2', '2:3', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9'] as const
type Aspect = (typeof ASPECTS)[number]

/* ── Arguments ────────────────────────────────────────────────────────── */

interface Options {
	slug: string
	brief: string
	need: string
	model: ModelId
	size: ImageSize
	aspect: Aspect
	cycle: Cycle
	count: number
	dryRun: boolean
}

function fail(message: string): never {
	console.error(`ideate-visual: ${message}`)
	process.exit(1)
}

function parseArgs(argv: string[]): Options {
	const raw = new Map<string, string>()
	let dryRun = false

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i]!
		if (arg === '--dry-run') {
			dryRun = true
			continue
		}
		if (!arg.startsWith('--')) fail(`unexpected argument "${arg}"`)
		const value = argv[++i]
		if (value === undefined) fail(`${arg} needs a value`)
		raw.set(arg.slice(2), value)
	}

	const slug = raw.get('slug') ?? fail('--slug is required (kebab-case; becomes the run directory)')
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
		fail(`--slug "${slug}" must be kebab-case — the naming gate (ls-lint) governs this directory`)
	}

	// `@path` reads the brief from a file, so a long brief need not survive shell quoting.
	const briefArg = raw.get('brief') ?? fail('--brief is required (what to ideate; prefix @ to read a file)')
	const brief = briefArg.startsWith('@') ? readFileSync(resolve(briefArg.slice(1)), 'utf8').trim() : briefArg

	const model = (raw.get('model') ?? 'gemini-3-pro-image') as ModelId
	if (!(model in MODELS)) fail(`--model must be one of: ${Object.keys(MODELS).join(', ')}`)

	// 1K by default: on Nano Banana Pro it costs exactly the same as 2K
	// ($0.134 either way) and lands near the shipped banner dimension
	// (1232×928), so the default does not quietly grow the repo. A 2K plate is
	// ~3.5 MB of permanent git history per image; ask for it deliberately.
	const size = (raw.get('size') ?? '1K') as ImageSize
	if (!['1K', '2K', '4K'].includes(size)) fail('--size must be 1K, 2K, or 4K')

	const aspect = (raw.get('aspect') ?? '4:3') as Aspect
	if (!ASPECTS.includes(aspect)) fail(`--aspect must be one of: ${ASPECTS.join(', ')}`)

	const cycle = (raw.get('cycle') ?? 'dawn') as Cycle
	if (!['dawn', 'dusk', 'night'].includes(cycle)) fail('--cycle must be dawn, dusk, or night')

	const count = Number(raw.get('n') ?? '1')
	if (!Number.isInteger(count) || count < 1 || count > 6) fail('--n must be an integer 1–6')

	return {
		slug,
		brief,
		need: raw.get('need') ?? fail('--need is required — name the real need this run serves (a flag, an OQ, a gap)'),
		model,
		size,
		aspect,
		cycle,
		count,
		dryRun,
	}
}

/* ── Canon extraction ─────────────────────────────────────────────────────
 * DESIGN.md is a generated build artifact whose token block is emitted from
 * the same DTCG source that compiles tokens.css, so reading it here is reading
 * the shipped values — not a second copy that can drift.
 * ───────────────────────────────────────────────────────────────────────── */

interface Contract {
	sha256: string
	colors: Record<string, string>
	typography: Record<string, { fontFamily?: string; fontWeight?: number }>
	cycleColors: Record<Cycle, Record<string, string>>
	donts: string[]
}

/**
 * Convert an OKLCH declaration to an sRGB hex string.
 *
 * Canon is OKLCH-native, but an image model reads hex and ignores OKLCH — a
 * prompt carrying `oklch(0.96 0.015 88)` silently loses the palette. This is
 * the published OKLab matrix pipeline (Ottosson), gamma-encoded and clamped
 * into gamut. It converts a value; it does not choose one.
 */
function oklchToHex(value: string): string | null {
	const match = value.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/i)
	if (!match) return null
	const [lightness, chroma, hueDegrees] = match.slice(1).map(Number) as [number, number, number]

	const hue = (hueDegrees * Math.PI) / 180
	const a = chroma * Math.cos(hue)
	const b = chroma * Math.sin(hue)

	const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
	const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
	const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3

	const linear = [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	]

	const channels = linear.map((channel) => {
		const encoded = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055
		return Math.round(Math.min(1, Math.max(0, encoded)) * 255)
			.toString(16)
			.padStart(2, '0')
	})

	return `#${channels.join('')}`
}

/** Resolve `{colors.foo}` / `var(--foo)` aliases down to a literal value. */
function resolveAlias(value: string, table: Record<string, string>, depth = 0): string {
	if (depth > 8) return value
	const curly = value.match(/^\{colors\.([a-z0-9-]+)\}$/i)
	if (curly) {
		const next = table[curly[1]!]
		return next ? resolveAlias(next, table, depth + 1) : value
	}
	const cssVar = value.match(/^var\(--([a-z0-9-]+)\)$/i)
	if (cssVar) {
		const next = table[cssVar[1]!]
		return next ? resolveAlias(next, table, depth + 1) : value
	}
	return value
}

/**
 * Read the dusk/night override table out of the §Cycles prose. The table is
 * generated from the DTCG source alongside the dawn values, and "—" means the
 * dawn declaration is an alias that re-resolves at runtime.
 */
function parseCycleTable(body: string, dawn: Record<string, string>): Record<Cycle, Record<string, string>> {
	const dusk: Record<string, string> = {}
	const night: Record<string, string> = {}

	const section = body.split('### Cycles')[1]?.split('\n## ')[0] ?? ''
	for (const line of section.split('\n')) {
		const cells = line.match(/^\|\s*`--([a-z0-9-]+)`\s*\|([^|]*)\|([^|]*)\|/i)
		if (!cells) continue
		const [, token, duskCell, nightCell] = cells
		const clean = (cell: string) => cell.trim().replace(/^`|`$/g, '').trim()
		const duskValue = clean(duskCell!)
		const nightValue = clean(nightCell!)
		dusk[token!] = duskValue === '—' ? (dawn[token!] ?? duskValue) : duskValue
		night[token!] = nightValue === '—' ? (dawn[token!] ?? nightValue) : nightValue
	}

	return { dawn, dusk, night }
}

function readContract(): Contract {
	if (!existsSync(DESIGN_MD)) fail('DESIGN.md not found — run from the repo root')
	const file = readFileSync(DESIGN_MD, 'utf8')

	const frontmatter = file.match(/^---\n([\s\S]*?)\n---\n/)
	if (!frontmatter) fail('DESIGN.md has no frontmatter — the brand contract cannot be read')
	const meta = Bun.YAML.parse(frontmatter[1]!) as {
		colors?: Record<string, string>
		typography?: Record<string, { fontFamily?: string; fontWeight?: number }>
	}
	if (!meta.colors || !meta.typography) fail('DESIGN.md frontmatter is missing colors or typography')

	const dawn: Record<string, string> = {}
	for (const [token, value] of Object.entries(meta.colors)) {
		dawn[token] = resolveAlias(String(value), meta.colors)
	}

	// The tombstoned-invention list — the half of the contract that says what a
	// generated plate must never contain.
	const dontsBlock = file.split('**Don\'t**')[1]?.split('\n## ')[0] ?? ''
	const donts = dontsBlock
		.split(/\n- /)
		.slice(1)
		.map((entry) => entry.replace(/\s+/g, ' ').replace(/[.\s]+$/, '').trim())
		.filter(Boolean)

	return {
		sha256: new Bun.CryptoHasher('sha256').update(file).digest('hex'),
		colors: dawn,
		typography: meta.typography,
		cycleColors: parseCycleTable(file, dawn),
		donts,
	}
}

/* ── Prompt assembly ──────────────────────────────────────────────────── */

/** The ground and ink a plate must sit on, per the active cycle. */
const CYCLE_GROUND: Record<Cycle, { ground: string; ink: string; note: string }> = {
	dawn: {
		ground: 'dispatch-vellum-100',
		ink: 'platform-text-body-strong',
		note: 'warm pale vellum paper — the default published surface',
	},
	dusk: {
		ground: 'dispatch-vellum-100',
		ink: 'platform-text-body-strong',
		note: 'deep warm-brown paper, ink inverted to a warm near-white',
	},
	night: {
		ground: 'dispatch-vellum-100',
		ink: 'platform-text-body-strong',
		note: 'near-black neutral ground, ink inverted to a cool near-white',
	},
}

/** Palette rows worth naming to an image model, in the order they matter. */
const PALETTE_ROLES: Array<[token: string, role: string]> = [
	['dispatch-vellum-100', 'the paper ground — everything sits on this'],
	['dispatch-vellum-300', 'the deepest paper tone, for shadow and weight'],
	['platform-text-body-strong', 'the ink — line work and hatching'],
	['platform-accent-prime', 'wine — dispatch-precious, a rare small accent, NEVER a wash or gradient'],
	['dispatch-lane-editorial-strong', 'terracotta — the editorial lane accent'],
	['dispatch-lane-institutional-strong', 'graphite-blue — the institutional lane accent'],
	['platform-copper', 'copper — wayfinding marks and fine annotation'],
]

function assemblePrompt(options: Options, contract: Contract, register: string): string {
	const cycle = CYCLE_GROUND[options.cycle]
	const palette = contract.cycleColors[options.cycle]

	const swatches = PALETTE_ROLES.map(([token, role]) => {
		const value = resolveAlias(palette[token] ?? contract.colors[token] ?? '', palette)
		return `  - ${oklchToHex(value) ?? value}  — ${role}`
	}).join('\n')

	// Type is set in code over the plate, never drawn into it. Naming the actual
	// families is what makes the no-lettering rule a contract term rather than
	// an assertion — these are the faces the plate has to sit quietly beneath.
	const faces = ['title', 'body', 'nav', 'mono']
		.map((slot) => contract.typography[slot]?.fontFamily?.split(',')[0]?.replace(/'/g, '').trim())
		.filter(Boolean)

	// Only the tombstones an illustration can actually violate. The rest of the
	// Don't list governs component code — a type slot or a CSS band means
	// nothing to an image model, and negations it cannot act on dilute the ones
	// it can.
	const relevantDonts = contract.donts.filter((entry) => /cartograph|street.view|literal cosmology/i.test(entry))

	return `You are illustrating a plate for PRIME DISpatch, an editorial scrollytelling magazine
documenting the construction of Prime City. Produce ONE finished editorial illustration.

THE BRIEF
${options.brief}

THE HOUSE REGISTER (read off the shipped banner corpus — match it)
${register}

THE PALETTE — use these values and essentially nothing else (${options.cycle} cycle)
${swatches}
  Ground: ${cycle.note}.
  The palette is deliberately narrow and low-chroma. Chrome is never vivid. Wine is
  precious: at most a few small marks, never a field, never a gradient, never a wash.

COMPOSITION
  - Aspect ratio ${options.aspect}. The plate is cropped with object-fit: cover inside a tall
    column on desktop and a wide strip on mobile, so keep the subject centred and leave the
    outer eighth of every edge free of anything load-bearing.
  - Flat or axonometric. Architectural, drafted, top-down or elevated — never a street-level
    eye-line, never a first-person view.

HARD CONSTRAINTS — a plate violating any of these is discarded
  - NO lettering of any kind. No words, no captions, no signage, no numerals, no logos, no
    wordmark. The publication sets its own type over this plate in ${faces.join(', ')} — a
    drawn word would collide with it, and a drawn "DISpatch" would break the wordmark split
    rule that governs every rendering of that word without exception. Leave the type quiet
    room; do not draw the type.
  - NO photorealism, no 3D render, no glossy or cinematic lighting, no lens flare, no bokeh.
    This is ink and printed paper.
  - NO neon, no cyberpunk teal-and-magenta, no glow, no chrome gradients.
  - NO UI mockups, no dashboards, no browser windows, no device frames.
  - NO human faces in focus. Figures, if any, are small, silhouetted, and incidental.
${relevantDonts.map((entry) => `  - Canon tombstone: ${entry}`).join('\n')}

The result should read as a hand-drawn plate from a small editorial press — an architectural
document that happens to be beautiful. Restrained, warm, quiet, and precise.`
}

/* ── Generation ───────────────────────────────────────────────────────── */

interface GeneratedImage {
	bytes: Uint8Array
	mimeType: string
	commentary: string
}

async function generate(prompt: string, options: Options, apiKey: string): Promise<GeneratedImage> {
	const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${options.model}:generateContent`

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
		body: JSON.stringify({
			contents: [{ role: 'user', parts: [{ text: prompt }] }],
			generationConfig: {
				responseModalities: ['TEXT', 'IMAGE'],
				imageConfig: { aspectRatio: options.aspect, imageSize: options.size },
			},
		}),
	})

	if (!response.ok) {
		fail(`${options.model} returned ${response.status}\n${(await response.text()).slice(0, 1200)}`)
	}

	const payload = (await response.json()) as {
		candidates?: Array<{
			finishReason?: string
			content?: { parts?: Array<{ text?: string; inlineData?: { mimeType?: string; data?: string } }> }
		}>
	}

	const candidate = payload.candidates?.[0]
	const parts = candidate?.content?.parts ?? []
	const image = parts.find((part) => part.inlineData?.data)

	if (!image?.inlineData?.data) {
		// A refusal or a safety stop lands here — surface it rather than writing a zero-byte file.
		const reason = candidate?.finishReason ?? 'no candidate'
		const text = parts.map((part) => part.text).filter(Boolean).join(' ').slice(0, 600)
		fail(`${options.model} returned no image (finishReason: ${reason})${text ? `\n${text}` : ''}`)
	}

	return {
		bytes: Buffer.from(image.inlineData.data, 'base64'),
		mimeType: image.inlineData.mimeType ?? 'image/png',
		commentary: parts.map((part) => part.text).filter(Boolean).join('\n').trim(),
	}
}

/* ── Main ─────────────────────────────────────────────────────────────── */

const options = parseArgs(process.argv.slice(2))
const contract = readContract()

if (!existsSync(HOUSE_REGISTER)) fail(`house register not found at ${relative(REPO_ROOT, HOUSE_REGISTER)}`)
const registerFile = readFileSync(HOUSE_REGISTER, 'utf8')
// The register file's prose is for humans; the fenced block is what the model reads.
const register = registerFile.match(/```register\n([\s\S]*?)```/)?.[1]?.trim()
if (!register) fail('house-register.md has no ```register fenced block')

const prompt = assemblePrompt(options, contract, register)
const priced = MODELS[options.model]
const unitCost = priced.usd[options.size]
if (unitCost === null) {
	fail(
		`${options.model} has no published price at ${options.size} — an unpriced run cannot be checked ` +
			"against the ADR's $10/month ceiling. Use --size 1K, or re-fetch the pricing page and update MODELS.",
	)
}

console.log(`model    ${options.model} (${priced.label})`)
console.log(`output   ${options.count} × ${options.size} ${options.aspect}, ${options.cycle} cycle`)
console.log(`cost     $${unitCost.toFixed(4)}/image → $${(unitCost * options.count).toFixed(4)} this run`)
console.log(`contract DESIGN.md @ ${contract.sha256.slice(0, 12)}`)
console.log(`\n${'─'.repeat(78)}\n${prompt}\n${'─'.repeat(78)}\n`)

if (options.dryRun) {
	console.log('dry run — nothing generated, nothing spent.')
	process.exit(0)
}

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
	fail('GEMINI_API_KEY is not set — run under `doppler run -p prime-city -c dev --` (never hardcode a key)')
}

const runDir = join(LANDING_ZONE, options.slug)
mkdirSync(runDir, { recursive: true })

const stamp = new Date().toISOString().slice(0, 10)
const artifacts: Array<{ file: string; sha256: string; bytes: number; commentary?: string }> = []

for (let i = 1; i <= options.count; i++) {
	process.stdout.write(`generating plate ${i}/${options.count}… `)
	const image = await generate(prompt, options, apiKey)
	const extension = image.mimeType.includes('jpeg') ? 'jpg' : 'png'
	const name = `${options.slug}-${String(i).padStart(2, '0')}.${extension}`
	writeFileSync(join(runDir, name), image.bytes)
	artifacts.push({
		file: name,
		sha256: new Bun.CryptoHasher('sha256').update(image.bytes).digest('hex'),
		bytes: image.bytes.byteLength,
		...(image.commentary ? { commentary: image.commentary } : {}),
	})
	console.log(`${name} (${(image.bytes.byteLength / 1024).toFixed(0)} KB)`)
}

/* The provenance record is written in the same pass that writes the artifacts,
 * so a kept plate cannot exist without one. This is the law the `ideation` gate
 * enforces — see scripts/check-ideation-provenance.ts. */
const provenance = {
	run: options.slug,
	need: options.need,
	generated: stamp,
	model: options.model,
	modelLabel: priced.label,
	imageSize: options.size,
	aspectRatio: options.aspect,
	cycle: options.cycle,
	costUsdPerImage: unitCost,
	costUsdTotal: Number((unitCost * options.count).toFixed(4)),
	contract: { file: 'DESIGN.md', sha256: contract.sha256 },
	brief: options.brief,
	prompt,
	artifacts,
	status: 'candidate',
	promotedTo: null,
}

writeFileSync(join(runDir, 'provenance.json'), `${JSON.stringify(provenance, null, '\t')}\n`)

console.log(`\nwrote ${relative(REPO_ROOT, runDir)}/ — ${artifacts.length} plate(s) + provenance.json`)
console.log(`spent $${provenance.costUsdTotal.toFixed(4)}`)
console.log('\nThese are candidates. Promotion into public/banners/ is AK\'s content review,')
console.log('never an automated step — the ideation gate forbids code/ referencing this zone.')
