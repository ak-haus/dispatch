import { describe, expect, it } from 'vitest'
import { initials } from './initials'

describe('initials — the monogram of the name beside it', () => {
	it('reads a single-word byline as one letter, not a borrowed pair', () => {
		expect(initials('Claude')).toBe('C')
	})

	it('takes one letter from each of the first two words', () => {
		expect(initials('AK Almoumen')).toBe('AA')
		expect(initials('Ada Lovelace Byron')).toBe('AL')
	})

	it('splits handles on their punctuation and drops the sigil', () => {
		expect(initials('@ak-almoumen')).toBe('AA')
		expect(initials('dispatch.prime')).toBe('DP')
		expect(initials('@dispatch_prime')).toBe('DP')
	})

	it('keeps non-Latin letters and returns nothing for nothing', () => {
		expect(initials('Émile Zola')).toBe('ÉZ')
		expect(initials('')).toBe('')
		expect(initials('@—')).toBe('')
	})
})
