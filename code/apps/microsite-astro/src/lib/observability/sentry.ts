/**
 * The vendor module — the only file that imports @sentry/browser.
 *
 * WHY IT IS A SEPARATE FILE, and why its imports are static and named. The
 * obvious shape, `const Sentry = await import('@sentry/browser')` inside the
 * lazy path, does not tree-shake: a dynamic import resolves to a namespace
 * object whose properties can be read at runtime, so rollup must retain every
 * export the barrel re-exports. Measured on the built chunk before this file
 * existed — replay (rrweb), user feedback, profiling and tracing all shipped,
 * 435KB raw / 144KB gzipped, and the posture's "rrweb is not in the bundle"
 * claim was FALSE. Destructuring the awaited namespace does not fix it either;
 * the destructure happens at runtime.
 *
 * Static named imports in a module that is ITSELF dynamically imported is what
 * gives both properties at once: the vendor code stays off the critical path,
 * and rollup can see exactly which bindings are reachable.
 *
 * The custom `BrowserClient` (rather than `Sentry.init`) is Sentry's own
 * documented minimal-bundle setup: `init()` calls `getDefaultIntegrations()`,
 * which references the full default set and pulls it in. Naming the
 * integrations is what leaves the rest behind.
 */

import {
	BrowserClient,
	breadcrumbsIntegration,
	captureException,
	dedupeIntegration,
	defaultStackParser,
	eventFiltersIntegration,
	functionToStringIntegration,
	getCurrentScope,
	globalHandlersIntegration,
	httpContextIntegration,
	linkedErrorsIntegration,
	makeFetchTransport,
} from '@sentry/browser'
import type { PrimeSentryConfig } from '@prime-dispatch/ui/observability'
import {
	SENTRY_DATA_COLLECTION,
	SENTRY_DENY_URLS,
	SENTRY_IGNORE_ERRORS,
	SENTRY_REPLAY_RATES,
	SENTRY_SAMPLE_RATE,
} from './posture'

/**
 * The integration set, chosen one at a time rather than inherited.
 *
 *   · eventFilters      — applies `ignoreErrors` + `denyUrls`. Without it the
 *                         quota posture is inert: the lists would be config
 *                         nothing reads.
 *   · globalHandlers    — Sentry's own window error/rejection handlers. This is
 *                         what takes over from the first-party trap in boot.ts
 *                         once the SDK is live.
 *   · dedupe            — collapses repeats. Protects the 5K/mo tier from a
 *                         single error in a rAF loop, and backstops the
 *                         handoff in boot.ts.
 *   · linkedErrors      — unwraps `error.cause` chains, so a rethrow still
 *                         reports the original fault.
 *   · breadcrumbs       — what happened before the throw. The difference
 *                         between a stack trace and a reproduction.
 *   · httpContext       — which URL broke. On an editorial site the route IS
 *                         the report's subject.
 *   · functionToString  — keeps wrapped functions readable in stacks.
 *
 * Deliberately ABSENT: `browserSessionIntegration` (release-health sessions are
 * extra events against a 5K tier for a question A6's uptime cron already
 * answers), `browserApiErrors` (monkey-patches setTimeout/addEventListener —
 * main-thread cost on a motion-heavy page for stack detail the first-party trap
 * already provides), and every replay/feedback/profiling/tracing integration.
 */
function integrations() {
	return [
		eventFiltersIntegration(),
		globalHandlersIntegration(),
		dedupeIntegration(),
		linkedErrorsIntegration(),
		breadcrumbsIntegration(),
		httpContextIntegration(),
		functionToStringIntegration(),
	]
}

/**
 * Bind a client to the current scope and start it.
 *
 * The config object comes from `getPrimeSentryConfig` — the caller owns that
 * decision (see client.ts); this file owns only the vendor translation.
 */
export function startSentry(config: PrimeSentryConfig): void {
	const client = new BrowserClient({
		dsn: config.dsn,
		environment: config.environment,
		release: config.release,
		transport: makeFetchTransport,
		stackParser: defaultStackParser,
		integrations: integrations(),
		sampleRate: SENTRY_SAMPLE_RATE,
		// Copied, not passed by reference: the posture object is frozen (it is
		// the value the test asserts), and the SDK's `httpBodies` is typed
		// mutable. The copy is what keeps the source of truth immutable.
		dataCollection: { ...SENTRY_DATA_COLLECTION, httpBodies: [...SENTRY_DATA_COLLECTION.httpBodies] },
		...SENTRY_REPLAY_RATES,
		ignoreErrors: [...SENTRY_IGNORE_ERRORS],
		denyUrls: [...SENTRY_DENY_URLS],
	})

	getCurrentScope().setClient(client)
	client.init()
}

/** Report one error through the bound client. */
export function reportToSentry(error: unknown): void {
	captureException(error)
}
