import type { Meta, StoryObj } from "@storybook/react-vite";
import { VirgilChat, type VirgilChatTurn } from "./VirgilChat";

/**
 * Storybook 9 stories for VirgilChat.
 *
 * Bound to the shipped shell prop surface (VirgilChatProps — turns + onSend
 * via props; streaming + AI orchestration is app-level wiring per the source
 * header) and to the CD4 spec at
 * representation/visual-system/components/VirgilChat/spec.md. The Field 2
 * panel-chrome variants (default-floating / minimized / mobile-bottom-sheet /
 * closed) carry no props in the shipped shell — app-level wiring deferred per
 * spec Field 2 + master plan §11 Q8 — so no stories are invented for them.
 * Lifecycle states the prop surface CAN express (empty / streaming-turn /
 * awaiting-input) are covered below.
 */

/** Relative-to-render timestamps keep any host-side formatting stable. */
const minutesAgo = (m: number): Date => new Date(Date.now() - m * 60_000);

/** Reader + Virgil turns in the editorial register (spec Field 8 fixture shape). */
const conversation: VirgilChatTurn[] = [
  {
    id: "turn-1",
    speaker: "user",
    body: "Where does the cartographic substrate live on the homepage?",
    at: minutesAgo(6),
  },
  {
    id: "turn-2",
    speaker: "virgil",
    body: "Beneath the writing. The Editorial District renders at a low dial — felt while you read, present when you look up. Scroll past the reception hero and the map forms around the components.",
    at: minutesAgo(5),
  },
  {
    id: "turn-3",
    speaker: "user",
    body: "And the three lane colors — what do they mean?",
    at: minutesAgo(2),
  },
  {
    id: "turn-4",
    speaker: "virgil",
    body: "Three semantic channels: editorial carries the writing track, institutional carries civic prose, dispatch belongs to the wordmark's own register. Local accents only — never wallpaper.",
    at: minutesAgo(1),
  },
];

const streamingConversation: VirgilChatTurn[] = [
  ...conversation.slice(0, 2),
  {
    id: "turn-streaming",
    speaker: "virgil",
    body: "Tracing the district boundary — landmark hints, not polygon borders…",
    at: minutesAgo(0),
    streaming: true,
  },
];

const meta: Meta<typeof VirgilChat> = {
  title: "Patterns / VirgilChat",
  component: VirgilChat,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "In-page Virgil chatbot — the Inferno-guide for navigating DISpatch (CD1 Concept 7 naming; CD4 spec). Each turn hosts the META × NARRATIVE marriage of registers (spec Field 10): Body serif prose with Meta-code segments inline and Nav chrome; shell-level per the source header — turns + onSend arrive via props, streaming orchestration is app-level.",
      },
    },
  },
  argTypes: {
    isSending: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
    emptyMessage: { control: { type: "text" } },
    ariaLabel: { control: { type: "text" } },
  },
  args: {
    turns: conversation,
    // Host wires the AI backend; the shell only calls this handler.
    onSend: () => undefined,
    isSending: false,
    ariaLabel: "Virgil chat",
  },
};

export default meta;
type Story = StoryObj<typeof VirgilChat>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Open conversation, `awaiting-input` lifecycle (spec Field 3): Reader and Virgil turns alternate in the aria-live polite log; the composer is enabled with the send button disabled until input is non-empty.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: { turns: [] },
  parameters: {
    docs: {
      description: {
        story:
          "No turns yet: the `emptyMessage` prop renders in the conversation region (shipped default shown) with the composer ready for the first question.",
      },
    },
  },
};

export const Streaming: Story = {
  args: {
    turns: streamingConversation,
    isSending: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`streaming-turn` lifecycle (spec Field 3): the in-progress Virgil turn renders the responding indicator, and `isSending` disables the composer + send button until the turn completes.",
      },
    },
  },
};

export const SystemDisclosure: Story = {
  args: {
    turns: [
      {
        id: "turn-sys",
        speaker: "system",
        body: "Virgil reads what you read. Availability is opt-in per surface.",
        at: minutesAgo(9),
      },
      ...conversation.slice(0, 2),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "System speaker turn from the source union — carries the 'Virgil reads what you read' disclosure (spec Field 1 footer; §11 Q8 production opt-in transparency) in the chrome metadata register.",
      },
    },
  },
};

export const WithCodeSegment: Story = {
  args: {
    turns: [
      {
        id: "turn-code-q",
        speaker: "user",
        body: "How do I use the editorial lane color in a component?",
        at: minutesAgo(3),
      },
      {
        id: "turn-code-a",
        speaker: "virgil",
        body: (
          <>
            Consume it through its token, never a literal:{" "}
            <code>var(--lane-editorial)</code> resolves per active cycle, and
            every accent placement carries its justification comment.
          </>
        ),
        at: minutesAgo(2),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Turn body as ReactNode with an inline code segment — the per-turn marriage of registers (CD4 §3.1 #19): Virgil prose in the Body serif, code in the Meta-code monospace.",
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
          "Chiaroscuro walnut study: the conversation reads by lamplight — warm-cream ink over the deep walnut substrate, gilded-copper composer chrome, lit-ember accents on the guide's turns.",
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
          "True-black void: restrained HUD register — ember-and-gold accents over the void; the turn log reads as a quiet terminal conversation, never neon.",
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
          "Spec Field 5 reduced-motion contract: turn-by-turn animation and streaming-typing motion removed — turns appear instantly at completion (WCAG 2.1 SC 2.3.3 launch floor).",
      },
    },
  },
};
