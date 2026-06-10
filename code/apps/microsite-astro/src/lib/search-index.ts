/**
 * DISpatch search index builder — server-only.
 *
 * Reads the `dispatch` content collection at Astro page-render time and
 * produces a serializable SearchRecord[] that gets passed to the React
 * island as a prop.
 *
 * MUST NOT be imported from React islands — `astro:content` is server-only
 * and Vite will crash the client bundle if this module sneaks in.
 *
 * Client-side pure types + query helpers live in `./search.ts`.
 */

import { getCollection } from 'astro:content'
import type { SearchRecord } from './search'

export type { SearchRecord, SearchRecordType, DldsLane } from './search'

export async function buildSearchIndex(): Promise<SearchRecord[]> {
	const dispatches = await getCollection('dispatch')

	return dispatches.map((entry): SearchRecord => {
		const dek = entry.data.dek
		const snippet = dek.length > 180 ? dek.slice(0, 177).trimEnd() + '…' : dek

		return {
			id: entry.id,
			type: 'article',
			title: entry.data.title,
			snippet,
			// Single article surface for V1; switches to /dispatch/[slug] when
			// the dynamic route lands.
			href: '/article',
			lane: entry.data.provenance.lane,
			kicker: entry.data.kicker,
			tags: entry.data.tags,
		}
	})
}
