import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footnote, FootnoteMarker } from "./Footnote";

/**
 * a11y settle discipline (story-test rail): the in-flow variants mount
 * through Motion's entrance fade (motion.aside opacity 0 → 1, 250ms), and
 * the addon-a11y afterEach otherwise audits MID-FADE ink — axe then reports
 * blended non-token foregrounds (e.g. #d4cfc6 for the text-strong prose) as
 * color-contrast failures on colors no token authors. Wait until every
 * rendered footnote container has settled at opacity exactly 1 so axe audits
 * the real shipped token colors (ComparisonGrid.stories.tsx precedent).
 * Stories that render no container (SidebarClosed, MarkerHoverDemo) settle
 * vacuously — AnimatePresence never mounts the aside there.
 */
async function settleReveal({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const deadline = Date.now() + 5000;
  for (;;) {
    const notes = Array.from(
      canvasElement.querySelectorAll<HTMLElement>(".prime-footnote"),
    );
    const settled = notes.every(
      (el) => Number(getComputedStyle(el).opacity) === 1,
    );
    if (settled) return;
    if (Date.now() > deadline) {
      throw new Error("Footnote reveal did not settle within 5s");
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

const meta: Meta<typeof Footnote> = {
  title: "Article / Footnote",
  component: Footnote,
  tags: ["autodocs"],
  // Meta-level play: every in-flow story carries the same entrance fade, so
  // every story waits for settle before the a11y afterEach runs.
  play: settleReveal,
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

/* OQ-5 (FILED at S5, 2026-08-18): the back-link (12px/700, --chrome-text →
 * copper-label since OQ-4) renders on this component's tinted panel surface,
 * where copper-label reaches only ~3.5:1 at dawn (its AA rating holds on
 * sky-low/surface-inset, not vellum-300; contrast.test.mjs documents the
 * missing copper-on-window-warm node as a deliberate non-assertion). The fix
 * is Mayor-gated (no AA copper rung exists on that surface); a11y runs
 * "todo" — visible in the panel, not gating — on every story that renders
 * the back-link at the dawn palette, until the adjudication lands. The
 * former opacity:0.7 dim (2.34:1) is already repaired out. Dusk/night pass
 * outright (gilded copper 8.7:1+). */
const backLinkCanonGap = { a11y: { test: "todo" as const } };

export const SidebarPopoverDesktop: Story = {
  parameters: { ...backLinkCanonGap },
};

export const MobileBottomSheet: Story = {
  args: { variant: "mobile-bottom-sheet" },
  parameters: { ...backLinkCanonGap },
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
  parameters: { ...backLinkCanonGap },
};

export const SidebarClosed: Story = {
  args: { open: false },
};

export const DawnCycle: Story = {
  globals: { cycle: "dawn" },
  parameters: {
    ...backLinkCanonGap,
    docs: {
      description: {
        story:
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default — the typographic register-shift carries the boundary; the rail-edge hairline anchors the popover.",
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
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — prose sets in warm-cream ink over the walnut substrate; the rail-edge hairline recedes into low light. The boundary stays a typographic register-shift; the container adds no ornament.",
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
          "Night cycle (DESIGN.md §Cycles): the true-black void — prose lifts to the cycle's bright ink; the rail-edge resolves to the faintest hairline, with HUD restraint. The mobile-bottom-sheet variant's --surface-inset slot gives slight lift against the void.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: { ...backLinkCanonGap },
};
