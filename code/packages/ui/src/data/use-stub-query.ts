import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { stubKeys } from "./query-keys";
import type { PrimeCycle } from "../state/theme-cycler";

/**
 * Smoke-test fixture for the F3 data layer.
 * Exercises the typed QueryClient + typed query-key factory + typed result.
 * Not exported from the package barrel; lives in /data only for tests.
 */
export type StubItem = {
  id: number;
  cycle: PrimeCycle;
  fetchedAt: string;
};

export function useStubQuery(
  id: number,
  fetcher: (id: number) => Promise<StubItem>,
): UseQueryResult<StubItem, Error> {
  return useQuery<StubItem, Error>({
    queryKey: stubKeys.one(id),
    queryFn: () => fetcher(id),
    retry: false, // smoke-test: no retry noise on intentional failures
  });
}
