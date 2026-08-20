/**
 * The analytics loop (ADR-0003 §Stage 6; register §9 cadence: weekly).
 *
 * The stage's whole point is a LOOP, not a dashboard: signal from real readers
 * has to come back and question the design, or the instrumentation is
 * decoration. So once a week this reads the editorial events with plain HogQL
 * and files what it found as a GitHub issue that names the DESIGN.md sections
 * the numbers bear on.
 *
 * THREE LAWS, all structural rather than advisory:
 *
 *   1. PROPOSALS ONLY. This script opens an issue. It has no write access to
 *      anything else and never edits a component, a token, or DESIGN.md.
 *      "Never autonomous design changes" is the ADR's wording; AK's sign-off
 *      is the only path from a finding to a change.
 *   2. PLAIN HogQL. Every query below is SQL this file contains in full. It
 *      never calls PostHog's AI-powered tools (the llma- and AI-observability
 *      families), which bill as PostHog AI spend — the stage is costed at $0
 *      and the ADR's $10/mo ceiling returns any spend to AK as a decision.
 *   3. READ-ONLY. A personal API key scoped to Query Read is all it needs.
 *
 * ARMING: needs POSTHOG_PERSONAL_API_KEY + POSTHOG_PROJECT_ID, both of which
 * follow AK's one-time signup. Until then the workflow skips loudly — the
 * cadence never silently reports nothing and calls it quiet.
 *
 * API shape verified against posthog.com/docs/api/queries (2026-08-19):
 * POST /api/projects/:project_id/query/ with {"query":{"kind":"HogQLQuery",
 * "query":"..."}}, personal API key as a Bearer token.
 */

const HOST = process.env.POSTHOG_HOST ?? 'https://eu.posthog.com'
const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY ?? ''
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID ?? ''
const WINDOW_DAYS = Number(process.env.POSTHOG_WINDOW_DAYS ?? 7)

if (!API_KEY || !PROJECT_ID) {
	console.error(
		'analytics loop: NOT ARMED — POSTHOG_PERSONAL_API_KEY and POSTHOG_PROJECT_ID are required. ' +
			'They follow AK\'s one-time PostHog signup (ADR-0003 register §9).',
	)
	process.exit(78) // EX_CONFIG: distinguishable from a query failure
}

/**
 * The questions, as HogQL. Each one is written to bear on a specific part of
 * the brand contract, because a finding that cannot name the section it
 * questions is an observation, not a proposal.
 */
const QUESTIONS = [
	{
		id: 'read-through',
		asks: 'Do readers finish a dispatch, and where do they stop?',
		bearsOn: ['DESIGN.md §Typography (measure, 12px floor)', 'DESIGN.md §Layout'],
		hogql: `
			SELECT
				properties.path AS path,
				countIf(event = 'dispatch_scroll_depth' AND properties.depth = 25) AS reached_25,
				countIf(event = 'dispatch_scroll_depth' AND properties.depth = 50) AS reached_50,
				countIf(event = 'dispatch_scroll_depth' AND properties.depth = 75) AS reached_75,
				countIf(event = 'dispatch_scroll_depth' AND properties.depth = 90) AS reached_90,
				countIf(event = 'dispatch_read_complete') AS completed,
				round(avg(if(event = 'dispatch_read_complete', toFloat(properties.dwell_seconds), NULL))) AS avg_dwell_s
			FROM events
			WHERE event IN ('dispatch_scroll_depth', 'dispatch_read_complete')
				AND properties.surface = 'dispatch'
				AND timestamp >= now() - INTERVAL ${WINDOW_DAYS} DAY
			GROUP BY path
			ORDER BY reached_25 DESC
			LIMIT 25
		`,
	},
	{
		id: 'cover-depth',
		asks: 'Does the cover carry readers into the page, or do they stop at the wordmark?',
		bearsOn: ['DESIGN.md §Typography (wordmark rule)', 'DESIGN.md §Motion'],
		hogql: `
			SELECT
				properties.depth AS depth,
				count() AS readers
			FROM events
			WHERE event = 'dispatch_scroll_depth'
				AND properties.surface = 'home'
				AND timestamp >= now() - INTERVAL ${WINDOW_DAYS} DAY
			GROUP BY depth
			ORDER BY depth ASC
		`,
	},
	{
		id: 'wire-engagement',
		asks: 'Is the Live Wire read, controlled, or ignored?',
		bearsOn: ['DESIGN.md §Components (Live Wire rail)'],
		hogql: `
			SELECT
				properties.action AS action,
				count() AS uses
			FROM events
			WHERE event = 'wire_engagement'
				AND timestamp >= now() - INTERVAL ${WINDOW_DAYS} DAY
			GROUP BY action
			ORDER BY uses DESC
		`,
	},
	{
		id: 'nav-reach',
		asks: 'Which surfaces does the masthead actually send people to?',
		bearsOn: ['DESIGN.md §Components (masthead / SiteNav)'],
		hogql: `
			SELECT
				properties.target AS target,
				count() AS clicks
			FROM events
			WHERE event = 'nav_engagement'
				AND timestamp >= now() - INTERVAL ${WINDOW_DAYS} DAY
			GROUP BY target
			ORDER BY clicks DESC
			LIMIT 20
		`,
	},
]

async function runHogQL(query) {
	const res = await fetch(`${HOST}/api/projects/${PROJECT_ID}/query/`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
		},
		// `refresh: force_blocking` is LOAD-BEARING, not a tuning knob. PostHog's
		// query API serves cached results by default, keyed on the query text —
		// and this script sends the SAME four queries every week. Without this,
		// a weekly run can file findings computed from a stale (or empty) cache
		// and present them as this week's signal. Found the hard way on
		// 2026-08-19: repeated identical queries kept returning zero rows while
		// the project's own `ingested_event` flag was already true.
		body: JSON.stringify({
			refresh: 'force_blocking',
			query: { kind: 'HogQLQuery', query: query.trim() },
		}),
	})
	if (!res.ok) {
		throw new Error(`PostHog query failed (${res.status}): ${(await res.text()).slice(0, 400)}`)
	}
	const body = await res.json()
	// Loud if the cache ever wins anyway — a findings issue must never quietly
	// report last week's numbers as this week's.
	if (body.is_cached) console.error(`analytics loop: WARNING — cached result returned despite force_blocking`)
	return body
}

function asTable(columns, results) {
	if (!results?.length) return '_No events in the window._'
	const head = `| ${columns.join(' | ')} |`
	const rule = `| ${columns.map(() => '---').join(' | ')} |`
	const rows = results.map((r) => `| ${r.map((cell) => (cell === null ? '—' : String(cell))).join(' | ')} |`)
	return [head, rule, ...rows].join('\n')
}

const sections = []
let anyData = false

for (const question of QUESTIONS) {
	try {
		const { columns, results } = await runHogQL(question.hogql)
		if (results?.length) anyData = true
		sections.push(
			[
				`### ${question.asks}`,
				'',
				asTable(columns ?? [], results ?? []),
				'',
				`Bears on: ${question.bearsOn.map((s) => `\`${s}\``).join(' · ')}`,
			].join('\n'),
		)
	} catch (error) {
		sections.push(`### ${question.asks}\n\n**Query failed** — \`${question.id}\`: ${error.message}`)
	}
}

const body = [
	`# Analytics loop — last ${WINDOW_DAYS} days`,
	'',
	'Signal from PostHog (EU Cloud, cookieless), read with plain HogQL. **These are proposals, not changes.**',
	'Nothing in the design stack moves without AK\'s sign-off (ADR-0003 §Stage 6).',
	'',
	'> Read these as engagement **shape**, never audience-size truth: cookieless mode re-hashes readers',
	'> daily, so a returning reader counts more than once. Trends and ratios are the signal; totals are not.',
	'',
	...sections,
	'',
	'---',
	'',
	'**What to do with this:** if a number questions a decision in `DESIGN.md`, the next step is a proposal',
	'that cites the section — not an edit. The contract is generated from canon; changing it means changing',
	'the canon and regenerating (see `code/packages/tokens/scripts/emit/layout-design-md.mjs`).',
	'',
	`_Filed by \`scripts/analytics-loop.mjs\` · window ${WINDOW_DAYS}d · plain HogQL only, $0 of PostHog AI spend._`,
].join('\n')

// stdout is the workflow's payload: it pipes this into `gh issue create`.
console.log(body)

if (!anyData) {
	console.error('analytics loop: every query returned zero rows — the site may have no traffic yet, or the key/project is wrong.')
}
