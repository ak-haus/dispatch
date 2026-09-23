import { describe, expect, it } from 'vitest'
import { pullQuotePlugin, readPullQuote } from './pull-quote'

const el = (name: string | null, value: unknown, type = 'mdxJsxFlowElement') => ({
	type,
	name,
	attributes: [{ type: 'mdxJsxAttribute', name: 'text', value }],
})
const astroCtx = (frontmatter: Record<string, unknown> = {}) => ({ data: { astro: { frontmatter } } })

describe('readPullQuote — the text a <PullQuote> carries', () => {
	it('reads the authored text', () => {
		expect(readPullQuote(el('PullQuote', 'Draft cheap, certify slow.'))).toBe('Draft cheap, certify slow.')
	})

	it('ignores other components, fragments, an empty text and an unreadable expression', () => {
		expect(readPullQuote(el('Figure', 'no'))).toBeUndefined()
		expect(readPullQuote(el(null, 'no'))).toBeUndefined()
		expect(readPullQuote(el('PullQuote', '   '))).toBeUndefined()
		expect(readPullQuote(el('PullQuote', { type: 'mdxJsxAttributeValueExpression', value: 'q' }))).toBeUndefined()
		expect(readPullQuote({ type: 'mdxJsxFlowElement', name: 'PullQuote', attributes: [] })).toBeUndefined()
	})
})

describe('pullQuotePlugin — writes the first quote into Astro frontmatter', () => {
	it("sets ctx.data.astro.frontmatter.pullQuote, keeping what's there", () => {
		const ctx = astroCtx({ title: 'T' })
		pullQuotePlugin.mdxJsxFlowElement(el('PullQuote', 'A token is a vow that has been compiled.'), ctx)
		expect(ctx.data.astro.frontmatter).toEqual({ title: 'T', pullQuote: 'A token is a vow that has been compiled.' })
	})

	it('keeps the first in document order, block or inline', () => {
		const ctx = astroCtx()
		pullQuotePlugin.mdxJsxTextElement(el('PullQuote', 'First, inline.', 'mdxJsxTextElement'), ctx)
		pullQuotePlugin.mdxJsxFlowElement(el('PullQuote', 'Second.'), ctx)
		expect(ctx.data.astro.frontmatter.pullQuote).toBe('First, inline.')
	})

	it('never quotes anything else — no PullQuote, no pullQuote', () => {
		const ctx = astroCtx()
		pullQuotePlugin.mdxJsxFlowElement(el('Figure', 'DISpatch publishes as a magazine…'), ctx)
		expect(ctx.data.astro.frontmatter).toEqual({})
	})

	it("writes nothing when Astro's bag is absent", () => {
		const ctx = { data: {} as Record<string, unknown> }
		pullQuotePlugin.mdxJsxFlowElement(el('PullQuote', 'x'), ctx)
		expect(ctx.data).toEqual({})
	})
})
