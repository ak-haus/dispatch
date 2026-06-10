import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

/**
 * Prime DISpatch QueryClient defaults.
 *
 * Editorial-register sensible defaults:
 * - staleTime 60s: editorial content rarely shifts; avoid aggressive refetch
 * - gcTime 5min: keep data warm for typical article reading sessions
 * - retry 2: graceful failure handling without thrashing
 * - refetchOnWindowFocus false: respects reading-sanctuary register
 *   (CD1 thesis §3 — "the article is not a dashboard"); user-driven
 *   refresh only
 */
export const PRIME_QUERY_DEFAULTS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
};

/**
 * Creates a QueryClient with Prime DISpatch defaults. Apps mount one
 * instance via QueryClientProvider at the app shell; cross-app primitives
 * import this factory + accept the QueryClient via React context.
 *
 * Per-app overrides may extend defaults but should justify deviation in
 * the call-site comment (per Mayor 2026-05-11 ethos: explain choices).
 */
export function createPrimeQueryClient(
  overrides?: Partial<QueryClientConfig>,
): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        ...PRIME_QUERY_DEFAULTS.defaultOptions?.queries,
        ...overrides?.defaultOptions?.queries,
      },
      mutations: {
        ...PRIME_QUERY_DEFAULTS.defaultOptions?.mutations,
        ...overrides?.defaultOptions?.mutations,
      },
    },
  });
}
