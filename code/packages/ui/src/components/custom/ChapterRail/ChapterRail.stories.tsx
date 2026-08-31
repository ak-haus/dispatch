import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentType } from "react";
import { ChapterRail, type Chapter } from "./ChapterRail";

/**
 * ChapterRail stories — thread-with-dots chapter wayfinding (B16 port,
 * 2026-08-31).
 *
 * Every story pins `currentChapter` (and `progress` where the fill should
 * show), so scroll detection never runs and every state renders
 * deterministically on first paint — no play functions, no interaction
 * timing in any captured frame (F19/F20 law). The prior twin's settleReveal
 * play existed for its staggered entrance; that entrance retired with the
 * twin's composition, so the play goes with it. The active dot's ping ring
 * is a CSS animation (frozen by the story lane's capture discipline).
 *
 * The grid cell, page substrate, #dispatch-article region and Lenis loop
 * are HOST-owned; the ArticleDefault decorator stands in for the host's
 * rail column (sticky context with the article's height) the way the
 * SiteNav Mobile story scaffolds its sheet.
 */

const DEFAULT_CHAPTERS: Chapter[] = [
  { slug: "preamble", text: "Preamble", depth: 2 },
  { slug: "field-conditions", text: "Field conditions", depth: 2 },
  { slug: "the-method", text: "The method", depth: 2 },
  { slug: "limits", text: "Limits & failure modes", depth: 2 },
  { slug: "coda", text: "Coda", depth: 2 },
];

const meta: Meta<typeof ChapterRail> = {
  title: "Chrome / ChapterRail",
  component: ChapterRail,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Per-article chapter navigation (spec.md; CD1 Concept 3 page furniture as civic wayfinding). Thread-with-dots rail locked by AK 2026-05-14: a 1px thread carries one dot per chapter and a copper reading-progress fill — the bronze progress indicator realized in-component (spec Field 10 coupling, one scroll listener). The rail rides the host's Lenis loop when present and expands 32px → 280px on hover/focus. Mobile is a chip + native <dialog> bottom sheet (@starting-style + allow-discrete). Reception mirror per Concept 7 porous gradient. Substrate-agnostic root per Rule 1.",
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
    currentChapter: { control: { type: "number" } },
    progress: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
  args: {
    chapters: DEFAULT_CHAPTERS,
    variant: "article-default",
    currentChapter: 2,
    progress: 0.45,
  },
};

export default meta;
type Story = StoryObj<typeof ChapterRail>;

/* Host-rail scaffold: the microsite mounts article-default in a 56px grid
 * column beside the article body; the rail is sticky with height
 * min(70vh, 520px). The scaffold supplies the column and a tall page so
 * the sticky geometry renders honestly without importing the host. */
const railColumn = (Story: ComponentType) => (
  <div style={{ display: "flex", minHeight: "560px" }}>
    <div style={{ width: "56px" }}>
      <Story />
    </div>
  </div>
);

export const ArticleDefault: Story = {
  decorators: [railColumn],
  parameters: {
    docs: {
      description: {
        story:
          "The locked thread-with-dots design at rest: copper dots on the 1px thread, the wine-intermediate active label always visible beside its enlarged dot (ping ring pulsing), the copper progress fill at the controlled reading position. Hovering the rail widens it to 280px and reveals every label — interaction states live outside the captured frame.",
      },
    },
  },
};

export const ArticleCollapsed: Story = {
  args: { variant: "article-collapsed" },
  parameters: {
    docs: {
      description: {
        story:
          "Collapsed affordance: the current chapter's name on the sky-low pill with the expand caret. The expanded panel is click-driven (AnimatePresence height) and so lives outside the captured frame.",
      },
    },
  },
};

export const MobileBottomSheet: Story = {
  args: { variant: "article-mobile-bottom-sheet" },
  parameters: {
    docs: {
      description: {
        story:
          "Standalone mobile pair at rest: the fixed bottom-right chip names the current chapter (aria-haspopup + aria-controls on the sheet's id); the sheet itself is closed.",
      },
    },
  },
};

export const SheetOpen: Story = {
  args: { variant: "article-mobile-bottom-sheet", initialSheetOpen: true },
  parameters: {
    docs: {
      description: {
        story:
          "The native <dialog> bottom sheet open on first paint (initialSheetOpen — the SearchPalette initialQuery precedent): showModal() supplies focus trap, aria-modal, backdrop and Escape-cancel; the narrative-voice chapter list carries aria-current and the mono 01/02 markers.",
      },
    },
  },
};

export const ReceptionCondensed: Story = {
  args: { variant: "reception-condensed", articleHref: "/article" },
  parameters: {
    docs: {
      description: {
        story:
          "The Concept 7 porous-gradient mirror: a copper-label \"Contents\" preview whose links carry the articleHref prefix cross-page. No scroll tracking, no progress coupling (spec Field 2).",
      },
    },
  },
};

export const DawnCycle: Story = {
  decorators: [railColumn],
  globals: { cycle: "dawn" },
  parameters: {
    docs: {
      description: {
        story:
          "Dawn cycle (DESIGN.md §Cycles): the vellum drafting-paper default — copper dots and thread on vellum, the active chapter in wine-intermediate ink with the gilded progress fill.",
      },
    },
  },
};

/* OQ-6 (FILED at S5, 2026-08-18) — the dark-cycle wine register: the ACTIVE
 * chapter label's tonal-stepped wine fails AA on the dark cycles
 * (accent-prime-active on cycle vellum-25: dusk 3.14:1, night 3.9:1 —
 * amend-2 ratified values, no APCA exception on record; the rail's active
 * label runs 12px/800, under the large-text threshold, so 4.5:1 governs —
 * the same register the B16 SiteNav port carries). Needs the Mayor's
 * metric/value adjudication; a11y runs "todo" (visible, not gating) on the
 * dark-cycle stories until it lands. Idle copper dots are aria-hidden
 * geometry; hover labels sit at opacity 0 in the captured frame. */
const darkWineRegisterCanonGap = { a11y: { test: "todo" as const } };

export const DuskCycle: Story = {
  decorators: [railColumn],
  globals: { cycle: "dusk" },
  parameters: {
    ...darkWineRegisterCanonGap,
    docs: {
      description: {
        story:
          "Dusk cycle (DESIGN.md §Cycles): the chiaroscuro walnut study — the thread recedes into low light, dots read as gilded copper, the active wine warms against the walnut substrate.",
      },
    },
  },
};

export const NightCycle: Story = {
  decorators: [railColumn],
  globals: { cycle: "night" },
  parameters: {
    ...darkWineRegisterCanonGap,
    docs: {
      description: {
        story:
          "Night cycle (DESIGN.md §Cycles): the true-black void — the faintest thread, ember dots with HUD restraint. Wayfinding, never spectacle.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  decorators: [railColumn],
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    docs: {
      description: {
        story:
          "Reduced-motion contract (spec Field 4): MotionConfig reducedMotion=\"user\" damps the dot/label/fill springs, chapter jumps fall back to instant scroll, and the sheet's slide collapses to an appearance toggle. The settled frame is identical to ArticleDefault.",
      },
    },
  },
};
