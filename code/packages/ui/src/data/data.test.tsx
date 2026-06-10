import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { createPrimeQueryClient, PRIME_QUERY_DEFAULTS } from "./query-client";
import { useStubQuery, type StubItem } from "./use-stub-query";
import { stubKeys, articleKeys } from "./query-keys";

function makeWrapper(client = createPrimeQueryClient()) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe("createPrimeQueryClient", () => {
  it("applies Prime editorial-register defaults", () => {
    const client = createPrimeQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.staleTime).toBe(60_000);
    expect(defaults.queries?.gcTime).toBe(300_000);
    expect(defaults.queries?.retry).toBe(2);
    expect(defaults.queries?.refetchOnWindowFocus).toBe(false);
  });

  it("permits per-app overrides while preserving non-overridden defaults", () => {
    const client = createPrimeQueryClient({
      defaultOptions: { queries: { staleTime: 0 } },
    });
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.staleTime).toBe(0);
    // Untouched defaults preserved
    expect(defaults.queries?.refetchOnWindowFocus).toBe(false);
    expect(defaults.queries?.gcTime).toBe(300_000);
  });

  it("exports PRIME_QUERY_DEFAULTS as a sealed reference", () => {
    expect(PRIME_QUERY_DEFAULTS.defaultOptions?.queries?.staleTime).toBe(60_000);
  });
});

describe("query-key factory pattern", () => {
  it("articleKeys hierarchy supports parent-based invalidation", () => {
    expect(articleKeys.all).toEqual(["articles"]);
    expect(articleKeys.lists()).toEqual(["articles", "list"]);
    expect(articleKeys.list({ lane: "editorial" })).toEqual([
      "articles",
      "list",
      { lane: "editorial" },
    ]);
    expect(articleKeys.detail("dispatch-week-3")).toEqual([
      "articles",
      "detail",
      "dispatch-week-3",
    ]);
  });

  it("stubKeys factory produces structurally stable keys", () => {
    expect(stubKeys.one(42)).toEqual(["__stub", 42]);
    // Same input → equal key (structural equality is what TanStack hashes)
    expect(stubKeys.one(42)).toEqual(stubKeys.one(42));
  });
});

describe("useStubQuery (typed query hook)", () => {
  it("fetches data and exposes typed result", async () => {
    const fetcher = vi.fn(
      async (id: number): Promise<StubItem> => ({
        id,
        cycle: "dawn",
        fetchedAt: "2026-05-11T00:00:00Z",
      }),
    );
    const wrapper = makeWrapper();
    const { result } = renderHook(() => useStubQuery(42, fetcher), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      id: 42,
      cycle: "dawn",
      fetchedAt: "2026-05-11T00:00:00Z",
    });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("dedupes concurrent renders against the same key (cache hit)", async () => {
    const fetcher = vi.fn(
      async (id: number): Promise<StubItem> => ({
        id,
        cycle: "dusk",
        fetchedAt: "2026-05-11T00:00:00Z",
      }),
    );
    const client = createPrimeQueryClient();
    const wrapper = makeWrapper(client);
    const { result: first } = renderHook(() => useStubQuery(7, fetcher), {
      wrapper,
    });
    await waitFor(() => expect(first.current.isSuccess).toBe(true));
    const { result: second } = renderHook(() => useStubQuery(7, fetcher), {
      wrapper,
    });
    await waitFor(() => expect(second.current.isSuccess).toBe(true));
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(second.current.data?.cycle).toBe("dusk");
  });

  it("invalidates and refetches via parent key", async () => {
    let invocation = 0;
    const fetcher = vi.fn(async (id: number): Promise<StubItem> => {
      const cycle: StubItem["cycle"] = invocation === 0 ? "dawn" : "night";
      invocation += 1;
      return { id, cycle, fetchedAt: `t-${invocation}` };
    });
    const client = createPrimeQueryClient();
    const wrapper = makeWrapper(client);
    const { result } = renderHook(() => useStubQuery(99, fetcher), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.cycle).toBe("dawn");
    await client.invalidateQueries({ queryKey: stubKeys.all });
    await waitFor(() => expect(result.current.data?.cycle).toBe("night"));
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("surfaces fetcher errors as typed Error result", async () => {
    const fetcher = vi.fn(async (_id: number): Promise<StubItem> => {
      throw new Error("stub-failed");
    });
    const wrapper = makeWrapper();
    const { result } = renderHook(() => useStubQuery(13, fetcher), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("stub-failed");
  });
});
