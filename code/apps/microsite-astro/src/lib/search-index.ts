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
 * The pure types + query helpers live WITH the palette in the library
 * (B16 fork retirement): @prime-dispatch/ui/custom/SearchPalette, imported
 * by subpath, never the barrel.
 */

import { getCollection } from 'astro:content'
import type { SearchRecord } from '@prime-dispatch/ui/custom/SearchPalette'

export type {
	SearchRecord,
	SearchRecordType,
	SearchRecordLane,
} from '@prime-dispatch/ui/custom/SearchPalette'

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
			// Each dispatch resolves to its own page via the /dispatch/[id]
			// dynamic route.
			href: `/dispatch/${entry.id}`,
			lane: entry.data.provenance.lane,
			kicker: entry.data.kicker,
			tags: entry.data.tags,
		}
	})
}
