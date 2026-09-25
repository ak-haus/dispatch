import { describe, expect, it } from 'vitest'
import { dispatchNumber, formatDispatchDate, formatEditionDate, newestFirst } from './dispatch'

const entry = (id: string, day: string) => ({ id, data: { date: new Date(`${day}T00:00:00Z`) } })

describe('newestFirst — the feed order, shared', () => {
	it('puts the later day first', () => {
		const sorted = [entry('dispatch-01', '2026-05-12'), entry('dispatch-02', '2026-05-13')].sort(newestFirst)
		expect(sorted.map((e) => e.id)).toEqual(['dispatch-02', 'dispatch-01'])
	})

	it('breaks a same-day tie by id, newest number first — whatever order the collection arrived in', () => {
		const sameDay = ['dispatch-02', 'dispatch-06', 'dispatch-04', 'dispatch-03', 'dispatch-05']
		for (const order of [sameDay, [...sameDay].reverse()]) {
			const sorted = order.map((id) => entry(id, '2026-05-13')).sort(newestFirst)
			expect(sorted.map((e) => e.id)).toEqual(['dispatch-06', 'dispatch-05', 'dispatch-04', 'dispatch-03', 'dispatch-02'])
		}
	})

	it('lets the day outrank the id', () => {
		const sorted = [entry('dispatch-09', '2026-05-01'), entry('dispatch-02', '2026-05-13')].sort(newestFirst)
		expect(sorted[0]!.id).toBe('dispatch-02')
	})
})

describe("dispatchNumber — the number the id carries, or none", () => {
	it('reads the zero-padded number the dispatch page prints', () => {
		expect(dispatchNumber('dispatch-01')).toBe('01')
		expect(dispatchNumber('dispatch-06')).toBe('06')
		expect(dispatchNumber('dispatch-12')).toBe('12')
		expect(dispatchNumber('dispatch7')).toBe('07')
	})

	it('invents nothing for an id that carries no number', () => {
		expect(dispatchNumber('field-notes')).toBeUndefined()
		expect(dispatchNumber('dispatch-')).toBeUndefined()
		expect(dispatchNumber('dispatch-02-draft')).toBeUndefined()
	})
})

describe('dates — one format per datum', () => {
	const may13 = new Date('2026-05-13T00:00:00Z')

	it("prints a dispatch's date as ISO 8601, in UTC, as its own page does", () => {
		expect(formatDispatchDate(may13)).toBe('2026-05-13')
		// A calendar date is not shifted by the machine's zone.
		expect(formatDispatchDate(new Date('2026-05-13T23:59:59Z'))).toBe('2026-05-13')
	})

	it('prints the edition dateline in the long form', () => {
		expect(formatEditionDate(may13)).toBe('May 13, 2026')
	})
})
