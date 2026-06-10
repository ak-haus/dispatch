/**
 * Query-key factory pattern (TkDodo's blog: practical-react-query/effective-react-query-keys).
 *
 * Type-safe + invalidation-friendly + colocated with the data domain.
 *
 * Each factory exposes a hierarchy:
 *   - all          : parent key for every query in this domain
 *   - lists()      : parent for list queries
 *   - list(filters): specific list query, narrowed by filters
 *   - details()    : parent for detail queries
 *   - detail(id)   : specific detail query
 *
 * Invalidate by a parent key → invalidates every child query under it.
 * Example: `client.invalidateQueries({ queryKey: articleKeys.all })`
 * invalidates every list AND every detail query for articles.
 */

export const articleKeys = {
  all: ["articles"] as const,
  lists: () => [...articleKeys.all, "list"] as const,
  list: (filters: { lane?: string; year?: number } = {}) =>
    [...articleKeys.lists(), filters] as const,
  details: () => [...articleKeys.all, "detail"] as const,
  detail: (slug: string) => [...articleKeys.details(), slug] as const,
} as const;

export const districtKeys = {
  all: ["districts"] as const,
  lists: () => [...districtKeys.all, "list"] as const,
  detail: (id: string) => [...districtKeys.all, "detail", id] as const,
} as const;

export const liveKeys = {
  all: ["live"] as const,
  ticker: () => [...liveKeys.all, "ticker"] as const,
  presence: (room: string) => [...liveKeys.all, "presence", room] as const,
} as const;

// Smoke-test fixture — exercised by data.test.tsx; not consumed in production.
export const stubKeys = {
  all: ["__stub"] as const,
  one: (id: number) => [...stubKeys.all, id] as const,
} as const;
