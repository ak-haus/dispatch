import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChapterRail, type ChapterRailItem } from "./ChapterRail";

/* W3-S-A Cycle 2 — chapter labels no longer pre-prefixed with Roman numerals;
 * the ChapterRail component itself generates Roman-numeral markers via the
 * Cinzel typographic marker span. Labels are the chapter title text only. */
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

export const LightTheme: Story = {
  globals: { theme: "light" },
  parameters: {
    docs: {
      description: {
        story:
          "Drafting-paper register: rail edge is a paper-weight hairline; current chapter copper-dot sits on the rail. Anchor: Sanborn map margin annotations + Tufte sidenote pattern.",
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
          "Dusk / sepia register (Cycle 2 substitution): rail edge in mid-sepia (#5a4a38); double-rule shadow rail at 0.4 opacity; Roman-numeral chapter markers in Cinzel on warm cream. Current-chapter marker reads as candlelight-gilt copper on aged paper.",
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
          "Video-game-menu register: rail edge becomes a subtle HUD grid line (#3a3a4a); indicator dot reads as a HUD waypoint marker. Anchor: GTA-5 minimap pattern (restrained, not neon).",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { theme: "light", reducedMotion: "reduce" },
};
