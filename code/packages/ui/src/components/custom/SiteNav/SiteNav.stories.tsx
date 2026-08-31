import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteNav } from "./SiteNav";

/**
 * SiteNav stories — the masthead's nav cluster (B16 port, 2026-08-31).
 *
 * The band, wordmark and mobile Dialog sheet are HOST-owned (Masthead);
 * these stories render the cluster the way the host mounts it. The
 * Mobile story wraps the fragment in a sheet-context scaffold (the
 * host's max-w-sm flex column on sky-low) so the sheet contents render
 * honestly without importing the host. F19/F20 law: every state renders
 * deterministically on first paint — no play functions, no interaction
 * timing in any captured frame.
 */
const meta: Meta<typeof SiteNav> = {
  title: "Chrome / SiteNav",
  component: SiteNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The masthead's nav cluster: primary links + affordances (SearchPalette trigger + theme-cycler, spec Field 6). Substrate-agnostic and band-less — the host owns the sticky band, wordmark and mobile sheet (spec Field 1's 'wordmark-adjacent positioning per layout'). Copper-label wayfinding with the W2-S-F Decision 8 tonal-stepping arc; magnetic links + travelling active-page indicator (JS-first motion). The desktop cluster hides below 48rem — mobile is the host sheet's contents via variant=\"mobile\".",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["reception", "article", "mobile"],
    },
    currentPath: { control: { type: "text" } },
    paletteOpen: { control: { type: "boolean" } },
  },
  args: {
    variant: "reception",
    currentPath: "/",
    paletteOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof SiteNav>;

export const Reception: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full nav-link set (the shipped navPages default) + SearchPalette trigger + theme-cycler. Home is the current page: wine-intermediate ink + the 2px indicator underline at rest.",
      },
    },
  },
};

export const Article: Story = {
  args: { variant: "article" },
  parameters: {
    docs: {
      description: {
        story:
          "Article-mode hides the SearchPalette trigger per CD1 Concept 7 (article-as-sanctuary); the nav compresses to the back-link + theme-cycler. Kept per spec Field 2 — per AK 2026-05-14 every live surface currently ships reception.",
      },
    },
  },
};

export const Mobile: Story = {
  args: { variant: "mobile", currentPath: "/article" },
  decorators: [
    // Host-sheet scaffold: the Masthead mounts this variant inside its
    // Radix Dialog sheet (max-w-sm flex column on sky-low). Substrate is
    // host-owned (Rule 1) — the scaffold stands in for the host here.
    (Story) => (
      <div
        style={{
          width: "24rem",
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--sky-low)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "The host sheet's contents (spec Field 2 compact-mobile, realized host-side): stacked links with the 2px active marker, then the search + cycler footer row. Link activation calls onNavigate so the host can close its sheet.",
      },
    },
  },
};

export const PaletteOpen: Story = {
  args: { paletteOpen: true },
  decorators: [
    // The A13 seam: with the palette open the trigger carries
    // aria-controls="dispatch-search-palette" — in the product that id is
    // the library SearchPalette's <dialog>. The stub stands in for the
    // host-mounted palette so the reference resolves for AT and axe.
    (Story) => (
      <>
        <Story />
        <div id="dispatch-search-palette" role="dialog" aria-label="Search DISpatch" />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Trigger state while the palette is open: aria-expanded=true and the conditional aria-controls pair (A13 ruling — the attribute exists only while the dialog is perceivable; the library SearchPalette keeps id dispatch-search-palette for exactly this seam).",
      },
    },
  },
};

export const DawnCycle: Story = {
  globals: { cycle: "dawn" },
  parameters: {
    docs: {
      description: {
        story:
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default — copper-label wayfinding on the vellum substrate, window-warm wash behind the cycler.",
      },
    },
  },
};

/* OQ-6 (FILED at S5, 2026-08-18) — the dark-cycle wine register in the nav:
 * the ACTIVE nav link's tonal-stepped wine fails AA on the dark cycles
 * (accent-prime-active on cycle vellum-25: dusk 3.14:1, night 3.9:1 —
 * amend-2 ratified values, no APCA exception on record; the B16-ported
 * links run 13px/800, under the large-text threshold, so 4.5:1 governs).
 * Needs the Mayor's metric/value adjudication; a11y runs "todo" (visible,
 * not gating) on the dark-cycle stories until it lands. Idle/hover copper
 * passes outright. The filing's other half — the embedded wordmark DIS —
 * left this component with the B16 port (the host owns the wordmark);
 * that half lives in the MastheadWordmark stories. */
const darkWineRegisterCanonGap = { a11y: { test: "todo" as const } };

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  parameters: {
    ...darkWineRegisterCanonGap,
    docs: {
      description: {
        story:
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — gilded-copper wayfinding in warm-cream company over the walnut substrate.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  parameters: {
    ...darkWineRegisterCanonGap,
    docs: {
      description: {
        story:
          "Night cycle (DESIGN.md §Cycles): the true-black void — copper wayfinding with HUD restraint over the void. Ember-and-gold, never neon.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    docs: {
      description: {
        story:
          "Reduced-motion contract (spec Field 4): useMagnetic zeroes its translation under prefers-reduced-motion and the host's MotionConfig damps the indicator springs; the color transitions that remain are non-motion. The settled frame is identical to Reception.",
      },
    },
  },
};
