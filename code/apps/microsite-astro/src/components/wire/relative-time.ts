/**
 * Timestamp presentation per ADR-0001 Addendum D3 (cloudscape pattern):
 * relative display under ~7 days, absolute beyond; the absolute form always
 * rides along for <time title> hovers and screen readers.
 */

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const RELATIVE_CUTOFF = 7 * DAY

export function absoluteTime(iso: string): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC',
		timeZoneName: 'short',
	}).format(new Date(iso))
}

export function dayLabel(iso: string): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(iso))
}

export function relativeTime(iso: string, now: number): string {
	const then = new Date(iso).getTime()
	const delta = Math.max(0, now - then)
	if (delta >= RELATIVE_CUTOFF) {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			timeZone: 'UTC',
		}).format(new Date(iso))
	}
	if (delta < MINUTE) return 'just now'
	if (delta < HOUR) return `${Math.floor(delta / MINUTE)} min ago`
	if (delta < DAY) return `${Math.floor(delta / HOUR)} hr ago`
	return `${Math.floor(delta / DAY)}d ago`
}

/** Feed-level freshness line: "updated 2 min ago" from the last successful poll. */
export function updatedAgo(lastFetched: number | null, now: number): string | null {
	if (lastFetched === null) return null
	const delta = Math.max(0, now - lastFetched)
	if (delta < MINUTE) return 'updated just now'
	if (delta < HOUR) return `updated ${Math.floor(delta / MINUTE)} min ago`
	return `updated ${Math.floor(delta / HOUR)} hr ago`
}
