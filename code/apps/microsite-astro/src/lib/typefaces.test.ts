import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import { TYPEFACES, typefacesOf } from './typefaces'

describe('typefacesOf — primaries only, once each, in slot order', () => {
	it('takes the first family of each stack and drops the fallbacks', () => {
		expect(
			typefacesOf({
				title: { $value: ['Vollkorn', 'Georgia', 'serif'] },
				body: { $value: ['Crimson Pro', 'Georgia', 'serif'] },
				narrative: { $value: ['Vollkorn', 'Iowan Old Style', 'serif'] },
				empty: { $value: [] },
			}),
		).toEqual(['Vollkorn', 'Crimson Pro'])
	})
})

describe('TYPEFACES — the shipped type system, read from the token source', () => {
	// Read the DTCG file through the package's own export, independently of the
	// module under test, so this pins the wiring and not just the function.
	const require = createRequire(import.meta.url)
	const source = JSON.parse(readFileSync(require.resolve('@prime-dispatch/tokens/typography.json'), 'utf8'))

	it('credits every slot the canon declares, the body face included', () => {
		const slots = Object.values(source.font.family) as Array<{ $value: string[] }>
		// Detector: the source really has slots to credit.
		expect(slots.length).toBeGreaterThan(1)
		for (const slot of slots) expect(TYPEFACES).toContain(slot.$value[0])
		// The face the old literal left out (OQ-1 restored it 2026-08-18).
		expect(TYPEFACES).toContain('Crimson Pro')
	})
})
