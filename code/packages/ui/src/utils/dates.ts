import { format, formatISO, parseISO, formatDistanceToNow } from "date-fns";

/**
 * Prime DISpatch date formatters (date-fns wrappers).
 *
 * Per CD1 Concept 3 + log-dating discipline: every article carries a
 * chronological wayfinding date. Format choices honor editorial register:
 *   - publishedAt   → "May 11, 2026"  (long form for masthead)
 *   - dateline      → "2026-05-11"     (ISO compact for kickers)
 *   - relative      → "3 days ago"     (live-ticker / digest cards)
 *
 * All formatters accept Date OR ISO string for resilience to schema
 * coercion (see ArticleSchema.publishedAt z.coerce.date).
 */

function ensureDate(input: Date | string): Date {
  return typeof input === "string" ? parseISO(input) : input;
}

export function formatPublishedAt(input: Date | string): string {
  return format(ensureDate(input), "MMMM d, yyyy");
}

export function formatDateline(input: Date | string): string {
  return formatISO(ensureDate(input), { representation: "date" });
}

export function formatRelative(input: Date | string): string {
  return formatDistanceToNow(ensureDate(input), { addSuffix: true });
}

export function formatKicker(input: Date | string, lane: string): string {
  return `${lane.toUpperCase()} · ${formatDateline(input)}`;
}
