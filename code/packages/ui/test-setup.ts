import "@testing-library/jest-dom/vitest";
import { beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// React Testing Library v16 + Vitest with `globals: false` requires
// explicit afterEach(cleanup). Without it, render() output from prior
// tests stays in the DOM, causing getByText() to find duplicates.
afterEach(() => {
  cleanup();
});

// happy-dom 18 + Node 22 quirk: env's localStorage surface is partial unless
// `--localstorage-file` is configured. This Map-backed Storage shim is a
// TEST-ONLY guard that activates when env localStorage is missing the
// Storage API methods. Production code uses real browser localStorage
// untouched. Track upstream fix at github.com/capricorn86/happy-dom.

// happy-dom defaults <body style="pointer-events: none"> which blocks
// userEvent pointer interactions. Reset to auto before each test so
// userEvent.click / .type can simulate real user input. TEST-ONLY guard.
beforeEach(() => {
  if (typeof document !== "undefined") {
    document.body.style.pointerEvents = "auto";
  }
});
if (
  typeof globalThis.localStorage === "undefined" ||
  typeof globalThis.localStorage.setItem !== "function"
) {
  const store = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    writable: true,
    configurable: true,
  });
}
