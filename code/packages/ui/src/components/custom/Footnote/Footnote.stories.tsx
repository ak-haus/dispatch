import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footnote, FootnoteMarker } from "./Footnote";

const meta: Meta<typeof Footnote> = {
  title: "Article / Footnote",
  component: Footnote,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Multi-voice typographic footnote: Meta-code marker + Body prose + Nav back-link. Substrate-agnostic root per Rule 1 — only the mobile-bottom-sheet variant uses --surface-inset (theme-conditioned contained slot). Anchor reference: Tufte CSS sidenote pattern (https://edwardtufte.github.io/tufte-css/).",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["sidebar-popover", "mobile-bottom-sheet", "endnote", "inline-aside"],
    },
    markerNumber: { control: { type: "number", min: 1, max: 99 } },
    open: { control: { type: "boolean" } },
  },
  args: {
    variant: "sidebar-popover",
    markerNumber: 3,
    open: true,
    children:
      "Per CD1 Concept 5, footnotes participate in the multi-voice typographic system — citation marker uses Meta-code; prose uses Body; back-link uses Nav. The composition is structural; the reader experiences the voice shift as wayfinding.",
  },
};

export default meta;
type Story = StoryObj<typeof Footnote>;

export const SidebarPopoverDesktop: Story = {};

export const MobileBottomSheet: Story = {
  args: { variant: "mobile-bottom-sheet" },
};

export const Endnote: Story = {
  args: { variant: "endnote" },
};

export const InlineAside: Story = {
  args: { variant: "inline-aside" },
};

export const MarkerHoverDemo: Story = {
  render: () => (
    <p style={{ maxWidth: "32rem", lineHeight: 1.6 }}>
      In the field-conditions study of multi-voice typography
      <FootnoteMarker markerNumber={1} /> the citation marker shifts
      register to monospace so the reader registers "this is a sidebar pointer"
      without breaking the body-prose cadence
      <FootnoteMarker markerNumber={2} />. Three voices, one composition.
    </p>
  ),
};

export const SidebarOpen: Story = {
  args: { open: true },
};

export const SidebarClosed: Story = {
  args: { open: false },
};

export const LightTheme: Story = {
  globals: { theme: "light" },
  parameters: {
    docs: {
      description: {
        story:
          "Drafting-paper register: typographic register-shift carries the boundary; rail-edge hairline anchors the popover.",
      },
    },
  },
};

export const DuskTheme: Story = {
  globals: { theme: "dusk" },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk / sepia register (Cycle 2 substitution): prose paints warm cream over aged-paper substrate; rail-edge shifts to mid-sepia. Container label prefix renders in Cinzel with leading ❖ ornament + overline (illuminated-manuscript register).",
      },
    },
  },
};

export const BlackTheme: Story = {
  globals: { theme: "black" },
  parameters: {
    docs: {
      description: {
        story:
          "Video-game register: prose paints light-gray over deep near-black; rail-edge resolves to HUD grid line. The mobile-bottom-sheet variant uses --surface-inset for slight elevation against the pure-black substrate.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { theme: "light", reducedMotion: "reduce" },
};
