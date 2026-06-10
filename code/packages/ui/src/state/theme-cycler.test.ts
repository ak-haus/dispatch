import { describe, it, expect, beforeEach } from "vitest";
import {
  useThemeCyclerStore,
  themeCycler,
  type PrimeCycle,
} from "./theme-cycler";
import { themeCyclerBlockingScript } from "./theme-cycler-blocking-script";

describe("theme-cycler store", () => {
  beforeEach(() => {
    useThemeCyclerStore.setState({ cycle: themeCycler.DEFAULT_CYCLE });
    localStorage.clear();
  });

  it("defaults to dawn", () => {
    expect(useThemeCyclerStore.getState().cycle).toBe<PrimeCycle>("dawn");
  });

  it("setCycle assigns the canonical cycle value", () => {
    useThemeCyclerStore.getState().setCycle("night");
    expect(useThemeCyclerStore.getState().cycle).toBe<PrimeCycle>("night");
  });

  it("cycleNext advances dawn → dusk → night → dawn (wrap)", () => {
    const { cycleNext } = useThemeCyclerStore.getState();
    cycleNext();
    expect(useThemeCyclerStore.getState().cycle).toBe<PrimeCycle>("dusk");
    cycleNext();
    expect(useThemeCyclerStore.getState().cycle).toBe<PrimeCycle>("night");
    cycleNext();
    expect(useThemeCyclerStore.getState().cycle).toBe<PrimeCycle>("dawn");
  });

  it("reset returns to default cycle", () => {
    useThemeCyclerStore.getState().setCycle("night");
    useThemeCyclerStore.getState().reset();
    expect(useThemeCyclerStore.getState().cycle).toBe<PrimeCycle>("dawn");
  });

  it("persists cycle to localStorage under prime-cycle key", () => {
    useThemeCyclerStore.getState().setCycle("dusk");
    const raw = localStorage.getItem(themeCycler.STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw ?? "{}") as {
      state?: { cycle?: PrimeCycle };
    };
    expect(parsed.state?.cycle).toBe<PrimeCycle>("dusk");
  });

  it("CYCLE_ORDER is the canonical 3-cycle sequence", () => {
    expect(themeCycler.CYCLE_ORDER).toEqual<readonly PrimeCycle[]>([
      "dawn",
      "dusk",
      "night",
    ]);
  });
});

describe("themeCyclerBlockingScript", () => {
  it("emits a synchronous IIFE that sets data-prime-cycle on documentElement", () => {
    const script = themeCyclerBlockingScript();
    expect(script).toMatch(/^\(function\(\)\{/);
    expect(script).toContain("data-prime-cycle");
    expect(script).toContain("documentElement.setAttribute");
    expect(script).toContain("prime-cycle"); // localStorage key
    expect(script).toContain("dawn"); // fallback default
  });

  it("script falls back to default cycle when localStorage is empty", () => {
    localStorage.clear();
    const script = themeCyclerBlockingScript();
    document.documentElement.removeAttribute("data-prime-cycle");
    // Run the IIFE in jsdom environment.
    new Function(script)();
    expect(
      document.documentElement.getAttribute("data-prime-cycle"),
    ).toBe<PrimeCycle>("dawn");
  });

  it("script reads persisted cycle from localStorage and applies it", () => {
    useThemeCyclerStore.getState().setCycle("night");
    const script = themeCyclerBlockingScript();
    document.documentElement.removeAttribute("data-prime-cycle");
    new Function(script)();
    expect(
      document.documentElement.getAttribute("data-prime-cycle"),
    ).toBe<PrimeCycle>("night");
  });

  it("script falls back to default when localStorage value is invalid", () => {
    localStorage.setItem(themeCycler.STORAGE_KEY, '{"state":{"cycle":"INVALID"}}');
    const script = themeCyclerBlockingScript();
    document.documentElement.removeAttribute("data-prime-cycle");
    new Function(script)();
    expect(
      document.documentElement.getAttribute("data-prime-cycle"),
    ).toBe<PrimeCycle>("dawn");
  });
});
