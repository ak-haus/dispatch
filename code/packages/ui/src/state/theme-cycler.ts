import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Prime DISpatch theme cycle (per CD2 §2.5 + W3-S-A canon-reconciliation amend-1).
 *
 * Three substrate cycles canon-restored from CD3 FORMULA §2.1 + §2.2 + §1.5:
 *   - dawn  : warm-paper substrate (default)
 *   - dusk  : interpolated warm-sepia continuum
 *   - night : inverted-Dawn deep ink-warm
 *
 * Cycle is controlled by Mayor-articulated UI cycler; persists per-user via
 * localStorage. Substrate-bound elements transition over 320ms ease-out per
 * CD5 §3.1 substrate-breathing motion category.
 */
export type PrimeCycle = "dawn" | "dusk" | "night";

const CYCLE_ORDER: readonly PrimeCycle[] = ["dawn", "dusk", "night"] as const;
const STORAGE_KEY = "prime-cycle";
const DEFAULT_CYCLE: PrimeCycle = "dawn";

type ThemeCyclerState = {
  cycle: PrimeCycle;
  setCycle: (cycle: PrimeCycle) => void;
  cycleNext: () => void;
  reset: () => void;
};

export const useThemeCyclerStore = create<ThemeCyclerState>()(
  persist(
    (set, get) => ({
      cycle: DEFAULT_CYCLE,
      setCycle: (cycle) => set({ cycle }),
      cycleNext: () => {
        const idx = CYCLE_ORDER.indexOf(get().cycle);
        const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length] ?? DEFAULT_CYCLE;
        set({ cycle: next });
      },
      reset: () => set({ cycle: DEFAULT_CYCLE }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

export const themeCycler = {
  CYCLE_ORDER,
  STORAGE_KEY,
  DEFAULT_CYCLE,
} as const;
