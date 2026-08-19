import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArticleDateline } from "./ArticleDateline";

/**
 * Storybook 9 stories for ArticleDateline.
 *
 * Prop surface = the exported ArticleDatelineProps interface in
 * ArticleDateline.tsx (no CD4 spec exists; the source interface is the
 * variant authority). Cycle stories use the canon cycle global
 * (dawn / dusk / night via [data-prime-cycle]).
 */

const meta: Meta<typeof ArticleDateline> = {
  title: "Article / ArticleDateline",
  component: ArticleDateline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Minimal editorial dateline above the article title — [lane-dot] TYPE · AUTHOR · DATE set in the Nav voice with tracked-out caps; no box, no chrome (construction Rule 6). The dateline is the SIGNATURE; the deep DLDS provenance (AI role, multi-author credits) lives with AuthorByline below the standfirst.",
      },
    },
  },
  argTypes: {
    lane: {
      control: { type: "radio" },
      options: ["editorial", "institutional", "dispatch"],
    },
    author: { control: { type: "text" } },
    date: { control: { type: "text" } },
  },
  args: {
    lane: "editorial",
    author: "Lena Marchetti",
    date: "2026-08-18",
  },
};

export default meta;
type Story = StoryObj<typeof ArticleDateline>;

export const Editorial: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Editorial lane dot — writing-track content signed by a human author.",
      },
    },
  },
};

export const Institutional: Story = {
  args: {
    lane: "institutional",
    author: "Prime Records Office",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Institutional lane dot — records and civic-institutional content.",
      },
    },
  },
};

export const Dispatch: Story = {
  args: {
    lane: "dispatch",
    author: "Conductor",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dispatch lane dot — dispatch-typed content, the agent-activity channel.",
      },
    },
  },
};

export const DateObjectInput: Story = {
  args: {
    date: new Date("2026-08-18T23:30:00Z"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `date` prop accepts a Date instance as well as an ISO string. The component parses the date-only portion, so the dateline shows the editorial publish date as authored regardless of viewer timezone.",
      },
    },
  },
};

export const LaneMatrix: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <ArticleDateline {...args} lane="editorial" author="Lena Marchetti" />
      <ArticleDateline
        {...args}
        lane="institutional"
        author="Prime Records Office"
      />
      <ArticleDateline {...args} lane="dispatch" author="Conductor" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The three lane dots side-by-side. Lanes are semantic channels applied as local accents — never interchangeable, ONE OKLCH per lane (Rule 2).",
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
          "Chiaroscuro walnut study: warm-cream ink over the walnut substrate, lane dot re-resolved to its lit-ember dusk value by the cascade — the component authors no theme variants (Rule 5).",
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
          "True-black void: the dateline's tracked-out caps read in the restrained HUD register; ink lifts to near-white and the lane dot carries its ember night value via the data-prime-cycle cascade.",
      },
    },
  },
};
