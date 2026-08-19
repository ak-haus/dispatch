import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Skeleton } from "./skeleton";

/**
 * Storybook 9 stories for the Skeleton primitive (F5; shadcn-canonical).
 *
 * NOTE (Storybook-app quirk): the Storybook app has no Tailwind pipeline —
 * `@prime-dispatch/tokens/css` ships custom properties only — so the
 * primitive's own `animate-pulse bg-surface-inset` utilities are inert here.
 * The inline style MIRRORS the shipped surface class token-for-token
 * (surface-inset); the pulse animation exists only where the consuming app's
 * Tailwind compile provides `animate-pulse`. No radius is applied: no
 * ratified radius scale exists in canon (DESIGN.md frontmatter, omitted
 * Shapes).
 */

const inset = (size: CSSProperties): CSSProperties => ({
  backgroundColor: "var(--surface-inset)",
  ...size,
});

const meta: Meta<typeof Skeleton> = {
  title: "Primitives / Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Loading placeholder with a subtle pulse — Vellum atmospheric tokens (surface-inset) keep it in the warm-paper register, not on a gaudy gray (source header). cn()-composable className surface; dimensions come from the consumer.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <Skeleton aria-hidden="true" style={inset({ height: "1rem", width: "18rem" })} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A single prose-line placeholder on the inset surface — a calm shadow where a line of Body serif will land.",
      },
    },
  },
};

/** Shared composition: a dispatch card mid-load — dateline, headline, prose. */
const articleCardLoading: Story["render"] = () => (
  <div
    role="status"
    aria-label="Loading dispatch"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      width: "24rem",
    }}
  >
    {/* dateline slot */}
    <Skeleton aria-hidden="true" style={inset({ height: "0.75rem", width: "9rem" })} />
    {/* headline slot — two display lines */}
    <Skeleton aria-hidden="true" style={inset({ height: "1.5rem", width: "100%" })} />
    <Skeleton aria-hidden="true" style={inset({ height: "1.5rem", width: "82%" })} />
    {/* prose slot — three body lines */}
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
      <Skeleton aria-hidden="true" style={inset({ height: "0.875rem", width: "100%" })} />
      <Skeleton aria-hidden="true" style={inset({ height: "0.875rem", width: "96%" })} />
      <Skeleton aria-hidden="true" style={inset({ height: "0.875rem", width: "64%" })} />
    </div>
  </div>
);

export const ArticleCardLoading: Story = {
  render: articleCardLoading,
  parameters: {
    docs: {
      description: {
        story:
          "A dispatch card mid-load: dateline, headline, and prose slots as stacked placeholders. The wrapper carries role=status with an accessible label; the bars themselves are aria-hidden.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: articleCardLoading,
  parameters: {
    docs: {
      description: {
        story:
          "Chiaroscuro walnut study: the placeholder re-resolves to the deep inset of the walnut substrate — a calm shadow where warm-cream ink arrives after load.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: articleCardLoading,
  parameters: {
    docs: {
      description: {
        story:
          "True-black void: the inset placeholder barely lifts off the void — restrained HUD calm. Ember-and-gold accents never announce loading.",
      },
    },
  },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  render: articleCardLoading,
  parameters: {
    docs: {
      description: {
        story:
          "Reduced-motion review state: the placeholder must read as a calm static inset — the ratified reduced-motion floor clamps every vector to static or an opacity-only crossfade of at most 200ms (motion.reduced-motion.max-duration, DESIGN.md §Motion).",
      },
    },
  },
};
