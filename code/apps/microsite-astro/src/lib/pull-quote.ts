/**
 * The featured dispatch's pull quote, derived from the dispatch itself (F61).
 *
 * The home's "From the dispatch" block was a literal: dispatch-01's opening
 * sentence, rendered under whichever dispatch happened to be featured. The
 * quote a dispatch actually pulls is authored in its body, at its paragraph
 * anchor, as `<PullQuote text="…" />` — the authoring contract's documented
 * mechanism (AGENTS.md), used by all six dispatches. So there is a field; it
 * is content rather than frontmatter, and the contract is not widened.
 *
 * This is a Sätteri mdast plugin — Astro 7's Markdown pipeline and its
 * documented extension point (`markdown.processor: satteri({ mdastPlugins })`;
 * remark plugins no longer run on it). It reads the quote off the syntax tree
 * at compile time and writes it to `ctx.data.astro.frontmatter.pullQuote`,
 * which Astro returns from `render(entry)` as
 * `remarkPluginFrontmatter.pullQuote`. Reading the tree rather than the source
 * text means the value is exactly what the dispatch's own page renders: the
 * parser has already resolved the attribute. It reads; it changes no node.
 */

/** The slice of an MDX JSX element this plugin reads (mdast's shape, which
 *  Sätteri reuses). Typed structurally: `satteri` is not a direct dependency. */
export interface MdxJsxElementLike {
	type: string
	name: string | null
	attributes: ReadonlyArray<{ type: string; name?: string; value?: unknown }>
}

interface VisitorContext {
	/** Sätteri's document-level data bag; Astro keeps `astro.frontmatter` in it. */
	data: object
}

type AstroData = { astro?: { frontmatter?: Record<string, unknown> } }

/**
 * The quote a `<PullQuote>` element carries: its `text` attribute when that is
 * a non-empty string. `undefined` for any other element, a missing or empty
 * text, or a text written as an expression, which cannot be read without
 * evaluating the module.
 */
export function readPullQuote(node: MdxJsxElementLike): string | undefined {
	if (node.name !== 'PullQuote') return undefined
	const text = node.attributes.find((a) => a.type === 'mdxJsxAttribute' && a.name === 'text')?.value
	return typeof text === 'string' && text.trim() !== '' ? text : undefined
}

function capture(node: MdxJsxElementLike, ctx: VisitorContext): void {
	const frontmatter = (ctx.data as AstroData).astro?.frontmatter
	// First in document order wins; nothing is written outside Astro's bag.
	if (!frontmatter || frontmatter.pullQuote !== undefined) return
	const quote = readPullQuote(node)
	if (quote !== undefined) frontmatter.pullQuote = quote
}

export const pullQuotePlugin = {
	name: 'dispatch-pull-quote',
	mdxJsxFlowElement(node: MdxJsxElementLike, ctx: VisitorContext) {
		capture(node, ctx)
	},
	mdxJsxTextElement(node: MdxJsxElementLike, ctx: VisitorContext) {
		capture(node, ctx)
	},
}
