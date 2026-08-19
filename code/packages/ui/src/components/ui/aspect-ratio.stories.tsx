import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { AspectRatio } from "./aspect-ratio";

/**
 * Storybook 9 stories for the AspectRatio primitive (F5 thin Radix wrapper).
 *
 * The primitive is a bare Radix Root re-export — its whole surface is the
 * numeric `ratio` prop plus div props. Stories cover exactly the ratios the
 * source header ratifies: 21/9 cinemascope for the cartography strip, 16/9
 * for hero imagery, plus the Radix intrinsic default (ratio omitted → 1).
 *
 * Media args reference the real launch assets under
 * apps/microsite-astro/public/ (never a colored rectangle — DESIGN.md
 * §Don'ts); the Storybook app must serve that directory via `staticDirs`
 * for them to resolve.
 */

const mediaStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const captionStyle: CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "0.75rem",
  color: "var(--text-muted)",
};

const meta: Meta<typeof AspectRatio> = {
  title: "Primitives / AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Thin Radix AspectRatio wrapper (F5). Holds proportion for the cartography strip (typically 21/9 cinemascope), hero images (16/9), and any inline imagery that should keep its ratio across breakpoints (source header).",
      },
    },
  },
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.5, max: 3, step: 0.01 },
    },
  },
  args: {
    ratio: 16 / 9,
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: "40rem" }}>
      <AspectRatio {...args}>
        <img
          src="/banners/dispatch-02.webp"
          alt="Dispatch No. 02 banner"
          style={mediaStyle}
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "16/9 hero-image proportion — the ratio holds while the container reflows across breakpoints.",
      },
    },
  },
};

export const CinemascopeStrip: Story = {
  args: { ratio: 21 / 9 },
  render: (args) => (
    <div style={{ maxWidth: "40rem" }}>
      <AspectRatio {...args}>
        <img
          src="/cartography/district.webp"
          alt="Editorial District cartography strip"
          style={mediaStyle}
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "21/9 cinemascope — the cartography-strip proportion named in the source header, holding the substrate imagery wide and low.",
      },
    },
  },
};

export const IntrinsicDefault: Story = {
  render: () => (
    <div style={{ maxWidth: "20rem" }}>
      <AspectRatio>
        <img
          src="/cartography/district.webp"
          alt="Editorial District cartography, square crop"
          style={mediaStyle}
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`ratio` omitted — the Radix default of 1 yields a square frame (the primitive's own baseline, not a house variant).",
      },
    },
  },
};

export const RatioMatrix: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "40rem",
      }}
    >
      <figure style={{ margin: 0 }}>
        <AspectRatio ratio={16 / 9}>
          <img
            src="/banners/dispatch-02.webp"
            alt="Dispatch No. 02 banner"
            style={mediaStyle}
          />
        </AspectRatio>
        <figcaption style={captionStyle}>16 / 9 — hero imagery</figcaption>
      </figure>
      <figure style={{ margin: 0 }}>
        <AspectRatio ratio={21 / 9}>
          <img
            src="/cartography/district.webp"
            alt="Editorial District cartography strip"
            style={mediaStyle}
          />
        </AspectRatio>
        <figcaption style={captionStyle}>
          21 / 9 — cartography strip (cinemascope)
        </figcaption>
      </figure>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The two source-ratified proportions side by side: hero 16/9 above the 21/9 cinemascope cartography strip.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: (args) => (
    <div style={{ maxWidth: "40rem" }}>
      <AspectRatio {...args}>
        <img
          src="/cartography/district.webp"
          alt="Editorial District cartography strip"
          style={mediaStyle}
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the frame itself is cycle-inert layout; the vellum drafting-paper substrate behind it deepens into the chiaroscuro walnut study while the media holds its own color.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: (args) => (
    <div style={{ maxWidth: "40rem" }}>
      <AspectRatio {...args}>
        <img
          src="/cartography/district.webp"
          alt="Editorial District cartography strip"
          style={mediaStyle}
        />
      </AspectRatio>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Night — the surrounding substrate resolves to the true-black void; the ratio frame contributes no chrome of its own (construction rule 6: when in doubt, less chrome).",
      },
    },
  },
};
