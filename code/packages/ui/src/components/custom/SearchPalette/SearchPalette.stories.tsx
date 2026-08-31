import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchPalette } from "./SearchPalette";
import type { SearchRecord } from "./search";

/**
 * Storybook 9 stories for SearchPalette — site-wide cmd-K palette
 * (spec.md Field 1; CD1 Concept 3 search as civic wayfinding).
 *
 * REBASELINED AT B16 (fork retirement, 2026-08-30): the microsite's
 * production implementation became the library component (native <dialog>
 * per spec Field 1 — the prior Radix + cmdk composition is retired), so
 * every story here is new against the ported render. Story args follow
 * spec Field 8: `variant` (enum) + `initialQuery` (the Field 8 `query`
 * arg) + the index fixture; lifecycle states are driven through
 * `initialQuery` so each state renders deterministically on first paint —
 * no interaction timing in any captured frame (F19/F20 flake law).
 *
 * The shipped surface is fully controlled: `open` / `onClose` are
 * host-owned (the Masthead's cmd-K shortcut or the SiteNav reception
 * trigger — spec Field 10 SiteNav coupling). Native <dialog>.showModal()
 * renders in the top layer from within the story subtree; the preview
 * decorator drives [data-prime-cycle] on <html>, which the top layer
 * inherits — no portal bridge needed.
 */

const noteClose = (): void => {
  // The host owns open-state; stories render the palette held open.
};

/** Civic search-index fixture — every record type + all three DLDS lanes,
 *  so the match anatomy (type badge · lane pigment · title · snippet ·
 *  kicker · query-highlight) baselines in one frame. */
const civicIndex: readonly SearchRecord[] = [
  {
    id: "d-w3",
    type: "article",
    title: "Dispatch · Week 3",
    snippet: "The cartography substrate lands — the district map becomes navigable.",
    href: "/dispatch/week-3",
    lane: "Hybrid",
    kicker: "editorial · narrative office",
    tags: ["cartography", "substrate"],
  },
  {
    id: "d-w2",
    type: "article",
    title: "Dispatch · Week 2",
    snippet: "Marriage of the registers: the three-typeface discipline holds.",
    href: "/dispatch/week-2",
    lane: "Human-led",
    kicker: "editorial · letterpress",
    tags: ["typography"],
  },
  {
    id: "dist-editorial",
    type: "district",
    title: "Editorial District",
    snippet: "Homepage — the low dial. Page furniture as civic wayfinding.",
    href: "/",
    tags: ["district", "reception"],
  },
  {
    id: "b-archive",
    type: "building",
    title: "The Archive",
    snippet: "Every dispatch, indexed. The city's institutional memory.",
    href: "/articles",
    lane: "AI-led",
  },
  {
    id: "fn-12",
    type: "footnote",
    title: "On provenance bands",
    snippet: "Why every plate discloses its authorship taxonomy.",
    href: "/dispatch/week-3#fn-12",
    kicker: "footnote · week 3",
  },
  {
    id: "dlds-lanes",
    type: "DLDS",
    title: "DLDS lanes",
    snippet: "Human-led, Hybrid, AI-led — the disclosure taxonomy.",
    href: "/about#dlds",
    lane: "Hybrid",
  },
];

const meta: Meta<typeof SearchPalette> = {
  title: "Chrome / SearchPalette",
  component: SearchPalette,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site-wide cmd-K palette — search as civic wayfinding (spec.md Field 1; CD1 Concept 3). Native <dialog> in the top layer: showModal() supplies the focus trap, aria-modal and Escape-close; open/close motion is @starting-style + allow-discrete per spec Field 5. Search is a pure ranked-substring function over the server-rendered index the host passes as a prop (spec Field 10); the host owns `open` via the cmd-K shortcut or the SiteNav reception trigger.",
      },
    },
  },
  argTypes: {
    open: { control: { type: "boolean" } },
    variant: {
      control: { type: "select" },
      options: ["default", "mobile", "district-scoped", "cosmology-scoped"],
    },
    initialQuery: { control: { type: "text" } },
    scopeLabel: { control: { type: "text" } },
  },
  args: {
    open: true,
    onClose: noteClose,
    index: civicIndex,
    variant: "default",
    initialQuery: "",
  },
};

export default meta;
type Story = StoryObj<typeof SearchPalette>;

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Open with an empty query (spec Field 3 `idle`): the hint panel invites the search on the warm-paper printed-search-card substrate (--window-warm), input in the Meta-code terminal register.",
      },
    },
  },
};

export const Loaded: Story = {
  args: { initialQuery: "dispatch" },
  parameters: {
    docs: {
      description: {
        story:
          "Loaded (spec Field 3): ranked matches over the civic index — type badge + DLDS lane pigment per match (color.md §4.3), Nav-slot titles, Body-slot snippets, Meta-code kickers, query-highlight via <mark> on accent-prime.",
      },
    },
  },
};

export const Empty: Story = {
  args: { initialQuery: "zeppelin" },
  parameters: {
    docs: {
      description: {
        story:
          "Empty lifecycle state (spec Field 3): no record matches — the no-match panel echoes the query in Meta-code and suggests a shorter term.",
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
          "Closed state (spec Field 3): the native <dialog> is present but not shown — nothing renders until the host flips `open` via cmd-K or the SiteNav trigger.",
      },
    },
  },
};

export const Mobile: Story = {
  args: { variant: "mobile", initialQuery: "district" },
  parameters: {
    docs: {
      description: {
        story:
          "Mobile variant (spec Field 2): full-screen overlay — square corners, no border, list height follows the viewport; the footer result-count spacer is suppressed for the on-screen keyboard.",
      },
    },
  },
};

export const DistrictScoped: Story = {
  args: { variant: "district-scoped", scopeLabel: "Editorial District" },
  parameters: {
    docs: {
      description: {
        story:
          "District-scoped variant (spec Field 2, W3 alternative): the placeholder names the scope; the host passes a pre-filtered index.",
      },
    },
  },
};

export const DuskCycle: Story = {
  args: { initialQuery: "dispatch" },
  globals: { cycle: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: palette chrome shifts to gilded copper, match labels read as warm-cream ink. The var() slots route through tokens.css [data-prime-cycle] blocks, which the top layer inherits from <html>.",
      },
    },
  },
};

export const NightCycle: Story = {
  args: { initialQuery: "dispatch" },
  globals: { cycle: "night" },
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the palette renders as a restrained HUD, ember-and-gold wayfinding over the void.",
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
          "Reduced-motion contract (spec Fields 4-5): open/close transitions removed, instant appearance-toggle, no backdrop fade.",
      },
    },
  },
};
