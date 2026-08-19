import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LiveRoom,
  type LiveRoomActivity,
  type LiveRoomCitizen,
} from "./LiveRoom";

/**
 * Storybook 9 stories for LiveRoom.
 *
 * Bound to the shipped shell prop surface (LiveRoomProps — presence +
 * activity via props; real-time wiring is app-level per the source header)
 * and to the CD4 spec at
 * representation/visual-system/components/LiveRoom/spec.md. The Field 2
 * panel-chrome variants (default-floating / minimized / mobile-bottom-sheet /
 * closed) carry no props in the shipped shell — they are app-level wiring
 * deferred per spec Field 2 + master plan §11 Q8 — so no stories are
 * invented for them. Occupancy variants the prop surface CAN express
 * (empty-room, single-author-mayor, multi-author) are covered below.
 */

/** Relative-to-render timestamps keep formatRelative output stable. */
const minutesAgo = (m: number): Date => new Date(Date.now() - m * 60_000);

const mayor: LiveRoomCitizen = {
  name: "AK ALMoumen",
  status: "active",
  lane: "dispatch",
  doing: "in the editorial office",
};

/** Sweeps every ratified status (active/idle/away) + all three lanes. */
const multiAuthorPresence: LiveRoomCitizen[] = [
  { name: "AK ALMoumen", status: "active", lane: "dispatch" },
  { name: "Forge", status: "active", lane: "institutional" },
  { name: "Copydesk", status: "idle", lane: "editorial" },
  { name: "Archivist", status: "away" },
];

/** Sweeps every activity kind the source union defines. */
const activityStream: LiveRoomActivity[] = [
  {
    id: "act-1",
    kind: "commit",
    citizen: "AK ALMoumen",
    text: "feat(cartography): letterpress labels on the district grid",
    at: minutesAgo(4),
  },
  {
    id: "act-2",
    kind: "dispatch",
    citizen: "AK ALMoumen",
    text: "Dispatch · Week 3 draft moved to review",
    at: minutesAgo(12),
  },
  {
    id: "act-3",
    kind: "signal",
    citizen: "Forge",
    text: "Signal 004 — the offices-window pattern, annotated",
    at: minutesAgo(26),
  },
  {
    id: "act-4",
    kind: "arrival",
    citizen: "Copydesk",
    text: "joined the editorial office",
    at: minutesAgo(41),
  },
  {
    id: "act-5",
    kind: "departure",
    citizen: "Archivist",
    text: "left for the archive stacks",
    at: minutesAgo(58),
  },
];

const meta: Meta<typeof LiveRoom> = {
  title: "Patterns / LiveRoom",
  component: LiveRoom,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Live-coworking presence panel — the offices-window of the walking metaphor (CD4 spec Field 1; CD1 Concept 7): who is in which office and what they are working on, with a per-citizen lane pigment per CD4 §3.1 #20. Shell-level per the source header — presence + activity arrive via props (real-time subscription is app-level wiring); the activity stream is an aria-live polite list per spec Field 4.",
      },
    },
  },
  argTypes: {
    activityLimit: {
      control: { type: "number", min: 1, max: 20 },
    },
    emptyMessage: { control: { type: "text" } },
    ariaLabel: { control: { type: "text" } },
  },
  args: {
    presence: multiAuthorPresence,
    activity: activityStream,
    ariaLabel: "Live coworking room",
  },
};

export default meta;
type Story = StoryObj<typeof LiveRoom>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multi-author room: the fixture sweeps every ratified presence status (active / idle / away), all three lane pigments, and every activity kind the source union defines (commit / dispatch / signal / arrival / departure).",
      },
    },
  },
};

export const EmptyRoom: Story = {
  args: { presence: [], activity: [] },
  parameters: {
    docs: {
      description: {
        story:
          "Spec Field 2 `empty-room` variant: no active citizens — the quiet placeholder renders with subdued visual weight; copy is the `emptyMessage` prop (shipped default shown).",
      },
    },
  },
};

export const SingleAuthorMayor: Story = {
  args: {
    presence: [mayor],
    activity: activityStream.slice(0, 2),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Spec Field 2 `single-author-mayor` variant — the common early-V1 case: only the Mayor active, full presence panel rendered ('Mayor is in the editorial office').",
      },
    },
  },
};

export const WithActivityPreviews: Story = {
  args: {
    presence: [
      {
        name: "AK ALMoumen",
        status: "active",
        lane: "dispatch",
        doing: "editing Dispatch · Week 3",
      },
      {
        name: "Forge",
        status: "active",
        lane: "institutional",
        doing: "reviewing the tokens drift gate",
      },
      {
        name: "Copydesk",
        status: "idle",
        lane: "editorial",
        doing: "marking up Signal 004",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Per-author activity-preview prose via the `doing` prop (spec Field 1 slot composition: one-line ambient snapshot of what the author is working on — Body register, never breaking confidentiality boundaries).",
      },
    },
  },
};

export const ActivityLimit: Story = {
  args: { activityLimit: 2 },
  parameters: {
    docs: {
      description: {
        story:
          "Prop-surface state: `activityLimit` trims the visible stream to the newest N entries — the host caps the log without mutating its feed.",
      },
    },
  },
};

export const RoomLadder: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
        gap: "2rem",
        alignItems: "start",
      }}
    >
      {/*
        axe landmark-unique: LiveRoom is a named-<section> landmark (region),
        so each matrix instance needs a distinct accessible name — set via
        the component's existing ariaLabel prop.
      */}
      <LiveRoom
        {...args}
        presence={[]}
        activity={[]}
        ariaLabel="Quiet coworking room"
      />
      <LiveRoom
        {...args}
        presence={[mayor]}
        activity={activityStream.slice(0, 1)}
        ariaLabel="Single-author coworking room"
      />
      <LiveRoom
        {...args}
        presence={multiAuthorPresence}
        activity={activityStream}
        ariaLabel="Multi-author coworking room"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Occupancy ladder side-by-side: quiet room → single-author Mayor → multi-author room (the three occupancy variants the shipped prop surface expresses, per spec Field 2).",
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
          "Chiaroscuro walnut study: the offices read by lamplight — gilded-copper chrome and lit-ember lane accents, warm-cream ink for the presence roster over the deep walnut substrate.",
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
          "True-black void: restrained HUD register — ember-and-gold accents over the void; presence reads as lights left on in the offices, never neon.",
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
          "Spec Field 5 reduced-motion contract: activity pulse removed, arrival/departure motion removed — presence renders as a static list (WCAG 2.1 SC 2.3.3 launch floor).",
      },
    },
  },
};
