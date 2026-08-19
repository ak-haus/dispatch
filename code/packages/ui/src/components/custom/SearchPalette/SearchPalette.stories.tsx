import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import {
  SearchPalette,
  type SearchPaletteProps,
  type SearchPaletteResultGroup,
  type SearchPaletteResultItem,
} from "./SearchPalette";

/**
 * Storybook 9 stories for SearchPalette — site-wide cmd-K palette
 * (spec.md Field 1; CD1 Concept 3 search as civic wayfinding).
 *
 * The shipped surface is fully controlled: `open` / `onOpenChange` are
 * host-owned (cmd-K shortcut or the SiteNav reception trigger — spec
 * Field 10 SiteNav coupling). Radix DialogPortal renders to
 * document.body — OUTSIDE the preview decorator's cycle wrapper — so a
 * story-file decorator bridges the active cycle global onto the
 * document root, letting the portaled dialog inherit the
 * [data-prime-cycle] cascade.
 */

const selectItem = (item: SearchPaletteResultItem): void => {
  // Selection navigates in the host app; the palette closes itself via
  // onOpenChange(false) after select (source behavior).
  void item;
};

const noteOpenChange = (nextOpen: boolean): void => {
  void nextOpen;
};

/** Civic search-index fixture — grouped the way the query hook returns results. */
const civicIndex: SearchPaletteResultGroup[] = [
  {
    heading: "Dispatches",
    items: [
      {
        id: "d-w3",
        label: "Dispatch · Week 3",
        description: "The cartography substrate lands",
        onSelect: selectItem,
      },
      {
        id: "d-w2",
        label: "Dispatch · Week 2",
        description: "Marriage of the registers",
        onSelect: selectItem,
      },
    ],
  },
  {
    heading: "Signals",
    items: [
      {
        id: "s-004",
        label: "Signal 004",
        description: "Reception window opens",
        onSelect: selectItem,
      },
      {
        id: "s-003",
        label: "Signal 003",
        description: "Register ledger reconciled",
        onSelect: selectItem,
      },
    ],
  },
  {
    heading: "Districts",
    items: [
      {
        id: "dist-editorial",
        label: "Editorial District",
        description: "Homepage — low dial",
        onSelect: selectItem,
      },
    ],
  },
];

/**
 * Bridges the active cycle onto the document root so DialogPortal
 * content (rendered on document.body) inherits the cycle cascade.
 * Dawn is the :root default, so the attribute is only set for
 * dusk/night — matching how the microsite drives the cascade.
 */
function CyclePortalBridge(props: {
  cycle: string;
  children: ReactNode;
}): ReactElement {
  const { cycle, children } = props;
  useEffect(() => {
    const root = document.documentElement;
    if (cycle === "dawn") {
      root.removeAttribute("data-prime-cycle");
    } else {
      root.setAttribute("data-prime-cycle", cycle);
    }
    return () => {
      root.removeAttribute("data-prime-cycle");
    };
  }, [cycle]);
  return <>{children}</>;
}

const withPortalCycle: Decorator = (Story, context) => {
  const cycle = (context.globals as { cycle?: string }).cycle ?? "dawn";
  return (
    <CyclePortalBridge cycle={cycle}>
      <Story />
    </CyclePortalBridge>
  );
};

const meta: Meta<typeof SearchPalette> = {
  title: "Chrome / SearchPalette",
  component: SearchPalette,
  tags: ["autodocs"],
  decorators: [withPortalCycle],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site-wide cmd-K palette — search as civic wayfinding (spec.md Field 1; CD1 Concept 3). Composes Radix Dialog (modal lifecycle, focus trap, aria-modal) with cmdk Command (filter logic, keyboard nav); the host owns `open` via the cmd-K shortcut or the SiteNav reception trigger (spec Field 10 SiteNav coupling).",
      },
    },
  },
  argTypes: {
    open: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
    emptyMessage: { control: { type: "text" } },
    groups: { control: { type: "object" } },
  },
  args: {
    open: true,
    onOpenChange: noteOpenChange,
    groups: civicIndex,
    placeholder: "Search dispatches, articles, signals…",
    emptyMessage: "No results — try a different query.",
  },
};

export default meta;
type Story = StoryObj<typeof SearchPalette>;

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dawn open state on the vellum drafting-paper substrate — grouped results with muted descriptions, focus trapped inside the dialog (spec Field 4).",
      },
    },
  },
};

export const Closed: Story = {
  args: { open: false },
  parameters: {
    docs: {
      description: {
        story:
          "Closed state (spec Field 3): the dialog is unmounted — nothing renders until the host flips `open` via cmd-K or the SiteNav trigger.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: { groups: [] },
  parameters: {
    docs: {
      description: {
        story:
          "Empty lifecycle state (spec Field 3): with no matching results, cmdk's CommandEmpty renders the `emptyMessage` prop.",
      },
    },
  },
};

function HostControlledPalette(props: SearchPaletteProps): ReactElement {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          font: "inherit",
          fontSize: "0.875rem",
          padding: "0.5rem 1rem",
          border: "1px solid var(--chrome-border)",
          background: "var(--surface-inset)",
          color: "var(--chrome-text)",
          cursor: "pointer",
        }}
      >
        Open search (host cmd-K stand-in)
      </button>
      <SearchPalette {...props} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export const HostControlled: Story = {
  render: (args) => <HostControlledPalette {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Full open/close lifecycle with real host-owned state — escape and overlay-click close the palette; the trigger button stands in for the host's cmd-K shortcut and SiteNav search affordance (spec Field 1 mode-crossing).",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: palette chrome shifts to gilded copper, match labels read as warm-cream ink, and the walnut substrate carries the modal without spectacle. The story decorator bridges the cycle onto the document root so the portaled dialog inherits the cascade.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the palette renders as a restrained HUD, ember-and-gold wayfinding over the void. Cycle attribute bridged to the document root for the portal.",
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
          "Reduced-motion contract (spec Field 4): open/close animations removed, instant appearance-toggle, backdrop fade removed.",
      },
    },
  },
};
