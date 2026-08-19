import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthorByline, type AuthorBylineAuthor } from "./AuthorByline";

/**
 * Storybook 9 stories for AuthorByline.
 *
 * Prop surface = the exported AuthorBylineProps + AuthorBylineAuthor
 * interfaces in AuthorByline.tsx (no CD4 spec exists; the source interface
 * is the variant authority). The lane chip, bio, and model attribution only
 * surface inside the HoverCard — hover or focus a contributor name to open
 * it. Cycle stories use the canon cycle global (dawn / dusk / night via
 * [data-prime-cycle]).
 */

const editorInChief: AuthorBylineAuthor = {
  id: "citizen-lena-marchetti",
  name: "Lena Marchetti",
  lane: "editorial",
  role: "Editor-in-Chief",
  bio: "Runs the DISpatch editorial desk — assigns the writing track, signs off every standfirst, and keeps the civic register honest.",
};

const conductorAgent: AuthorBylineAuthor = {
  id: "agent-conductor",
  name: "Conductor",
  lane: "dispatch",
  role: "Conductor agent",
  modelAttribution: "claude-opus-4-7[1m]",
  bio: "Orchestrates the agentic newsroom — routes drafts between desks and surfaces every decision it makes into the trace record.",
};

const recordsClerk: AuthorBylineAuthor = {
  id: "agent-records-clerk",
  name: "Records Clerk",
  lane: "institutional",
  role: "Provenance agent",
  bio: "Audits citations and amendment history so every claim in the piece carries its provenance.",
};

const meta: Meta<typeof AuthorByline> = {
  title: "Article / AuthorByline",
  component: AuthorByline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Citizen/agent attribution row with HoverCard preview — every contributor (human citizen + agentic staff) renders inline-flow; hovering or focusing a name pops the full bio, role, lane chip, and optional model attribution. The DLDS co-authored editorial commitment made visible per contributor.",
      },
    },
  },
  argTypes: {
    authors: { control: { type: "object" } },
  },
  args: {
    authors: [editorInChief, conductorAgent],
  },
};

export default meta;
type Story = StoryObj<typeof AuthorByline>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Human citizen + agent co-byline, middot-separated. No avatarSrc is supplied, so each Avatar falls back to initials — the source's fallback path.",
      },
    },
  },
};

export const SingleAuthor: Story = {
  args: { authors: [editorInChief] },
  parameters: {
    docs: {
      description: {
        story:
          "One human contributor, no separator. Hover or focus the name to open the bio card with the editorial lane chip.",
      },
    },
  },
};

export const AgentWithModelAttribution: Story = {
  args: { authors: [conductorAgent] },
  parameters: {
    docs: {
      description: {
        story:
          "An agentic contributor — the optional modelAttribution string renders in the monospace meta voice inside the hover card, beside the dispatch lane chip.",
      },
    },
  },
};

export const FullRoster: Story = {
  args: { authors: [editorInChief, conductorAgent, recordsClerk] },
  parameters: {
    docs: {
      description: {
        story:
          "Three contributors covering all three lanes — editorial (human), dispatch (agent), institutional (agent). The row wraps inline-flow; each hover card carries its own lane chip (Rule 2: lanes are semantic, never interchangeable).",
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
          "Chiaroscuro walnut study: contributor names in warm-cream ink over the walnut substrate; the hover card's rail-edge hairline and lane chips re-resolve via the cascade — the component authors no theme variants (Rule 5).",
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
          "True-black void: the byline reads in the restrained HUD register — near-white ink, ember-and-gold accents on hover, lane pigments re-resolved at bridge level via the data-prime-cycle cascade.",
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
          "Simulates prefers-reduced-motion via the toolbar global — the hover card's open/close fade must clamp to static or an opacity-only crossfade within the ratified reduced-motion floor.",
      },
    },
  },
};
