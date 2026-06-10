import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "./use-reduced-motion";
import { PRIME_DEFAULT_TRANSITION } from "./motion-config";

type MqlListener = (event: { matches: boolean }) => void;

function installMatchMediaMock(initialMatches = false) {
  const listeners = new Set<MqlListener>();
  const mql = {
    matches: initialMatches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: (_event: string, l: MqlListener) => listeners.add(l),
    removeEventListener: (_event: string, l: MqlListener) => listeners.delete(l),
    dispatchEvent: () => true,
    addListener: () => {},
    removeListener: () => {},
  } as unknown as MediaQueryList;

  window.matchMedia = vi.fn(() => mql);

  return {
    mql,
    setMatches(next: boolean) {
      (mql as { matches: boolean }).matches = next;
      listeners.forEach((l) => l({ matches: next } as MediaQueryListEvent));
    },
  };
}

describe("useReducedMotion", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when prefers-reduced-motion: no-preference", () => {
    installMatchMediaMock(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when prefers-reduced-motion: reduce", () => {
    installMatchMediaMock(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates reactively when user toggles preference at runtime", () => {
    const probe = installMatchMediaMock(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    act(() => {
      probe.setMatches(true);
    });
    expect(result.current).toBe(true);
    act(() => {
      probe.setMatches(false);
    });
    expect(result.current).toBe(false);
  });
});

describe("PRIME_DEFAULT_TRANSITION", () => {
  it("is calibrated to CD5 §3.1 substrate-breathing register (320ms ease-out)", () => {
    expect(PRIME_DEFAULT_TRANSITION.type).toBe("tween");
    expect(PRIME_DEFAULT_TRANSITION.duration).toBe(0.32);
    expect(Array.isArray(PRIME_DEFAULT_TRANSITION.ease)).toBe(true);
    expect(PRIME_DEFAULT_TRANSITION.ease).toEqual([0.16, 1, 0.3, 1]);
  });
});
