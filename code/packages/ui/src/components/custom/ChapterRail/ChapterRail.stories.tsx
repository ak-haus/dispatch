import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChapterRail, type ChapterRailItem } from "./ChapterRail";

/**
 * a11y settle discipline (story-test rail): every story mounts the chapter
 * links through Motion's staggered entrance (motion.li opacity 0 → 1), and
 * the addon-a11y afterEach otherwise audits MID-FADE ink — axe then reports
 * blended non-token foregrounds (e.g. #d2cec5 on the vellum page) as
 * color-contrast failures on colors no token authors. Wait until every
 * rendered chapter item has settled at opacity exactly 1 so axe audits the
 * real shipped token colors (ComparisonGrid.stories.tsx precedent). Items
 * hidden by the collapsed variant (display:none list → offsetParent null)
 * are excluded by axe's visibility check and treated as settled here.
 */
async function settleReveal({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const deadline = Date.now() + 5000;
  for (;;) {
    const items = Array.from(
      canvasElement.querySelectorAll<HTMLElement>(".prime-chapter-rail__item"),
    );
    const settled =
      items.length > 0 &&
      items.every(
        (el) =>
          el.offsetParent === null ||
          Number(getComputedStyle(el).opacity) === 1,
      );
    if (settled) return;
    if (Date.now() > deadline) {
      throw new Error("ChapterRail reveal did not settle within 5s");
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

/* Chapter labels are the chapter title text only — no pre-prefixed numbering
 * in the data; the ChapterRail component owns its own typographic markers. */
const DEFAULT_CHAPTERS: ChapterRailItem[] = [
  { id: "preamble", label: "Preamble", isVisited: true },
  { id: "field-conditions", label: "Field conditions", isVisited: true },
  { id: "the-method", label: "The method", isCurrent: true },
  { id: "limits", label: "Limits & failure modes" },
  { id: "coda", label: "Coda" },
];

const meta: Meta<typeof ChapterRail> = {
  title: "Chrome / ChapterRail",
  component: ChapterRail,
  tags: ["autodocs"],
  // Meta-level play: every story in this file carries the same entrance
  // motion, so every story waits for settle before the a11y afterEach runs.
  play: settleReveal,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Vertical RAIL navigation — thin structural line carrying chapter indicator dots. Anchor reference: Stripe Press / Edward Tufte sidenote pattern (https://edwardtufte.github.io/tufte-css/). Substrate-agnostic root per Rule 1.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: [
        "article-default",
        "article-collapsed",
        "article-mobile-bottom-sheet",
        "reception-condensed",
      ],
    },
  },
  args: {
    chapters: DEFAULT_CHAPTERS,
    variant: "article-default",
  },
};

export default meta;
type Story = StoryObj<typeof ChapterRail>;

export const ArticleDefault: Story = {};

export const ArticleCollapsed: Story = {
  args: { variant: "article-collapsed" },
};

export const ArticleMobileBottomSheet: Story = {
  args: { variant: "article-mobile-bottom-sheet" },
};

export const ReceptionCondensed: Story = {
  args: { variant: "reception-condensed" },
};

/* Cycle 2 — story that triggers the pilcrow section-break ornament at the
 * 6th chapter (every 5th chapter break per Cycle 2 elevation Agent 4 softening). */
export const LongFormWithSectionBreak: Story = {
  args: {
    chapters: [
      { id: "preamble", label: "Preamble", isVisited: true },
      { id: "field-conditions", label: "Field conditions", isVisited: true },
      { id: "the-method", label: "The method", isVisited: true },
      { id: "limits", label: "Limits & failure modes", isVisited: true },
      { id: "case-study", label: "Case study: dispatch-week-3", isCurrent: true },
      { id: "interlude", label: "Interlude" },
      { id: "second-pass", label: "The second pass" },
      { id: "coda", label: "Coda" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Eight-chapter rail demonstrates pilcrow (¶) section-break ornament at the 6th chapter — every 5 chapters per Cycle 2 elevation Agent 4 softening (NYT Magazine section-end ornaments softened to editorial pilcrow per Anthropic register).",
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
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default — the rail edge is a paper-weight hairline; the current-chapter copper dot sits on the rail. Anchor: Tufte sidenote pattern.",
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
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — the rail edge recedes into low light; chapter labels set in warm-cream ink; the current-chapter indicator reads as gilded copper against the walnut substrate.",
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
          "Night cycle (DESIGN.md §Cycles): the true-black void — the rail edge falls to the faintest hairline; the current-chapter indicator carries the ember accent with HUD restraint. Wayfinding, never spectacle.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
};
