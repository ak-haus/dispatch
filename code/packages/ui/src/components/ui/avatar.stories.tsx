import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

/**
 * Storybook 9 stories for the Avatar primitive (F5 thin Radix wrapper).
 *
 * The primitive carries no variant props — its surface is the composed
 * Root / Image / Fallback parts plus a className hook (source header:
 * default is the 32px byline size; larger sizes via className). The matrix
 * covers the subcomponents composed realistically: fallback initials (the
 * designed META-register signature), the Radix image→fallback load chain,
 * className sizing, and a byline composite.
 */

const captionStyle: CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "0.75rem",
  color: "var(--text-muted)",
};

const meta: Meta<typeof Avatar> = {
  title: "Primitives / Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin Radix Avatar wrapper (F5): 32px byline default with larger sizes via className; the fallback renders initials in the component-locked monospace — the META-register signature for \"this person was here\" (source header).",
      },
    },
  },
  argTypes: {
    className: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Byline default: 32px chip, initials set in the component-locked monospace over --surface-inset — the designed fallback register, not a degraded state.",
      },
    },
  },
};

export const WithImageChain: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="/authors/editor-in-chief.webp"
        alt="AK ALMoumen, editor-in-chief"
      />
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Radix load chain: the fallback holds the slot until the image resolves, and remains the rendered truth when it never does — always compose both parts.",
      },
    },
  },
};

export const SizeViaClassName: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
      <figure
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar>
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <figcaption style={captionStyle}>default · byline</figcaption>
      </figure>
      <figure
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar className="h-12 w-12">
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <figcaption style={captionStyle}>h-12 w-12 · profile</figcaption>
      </figure>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Sizing is a className surface, not a prop: the 32px default serves author bylines; larger contexts pass utility classes (source header — \"Larger sizes via className\").",
      },
    },
  },
};

export const BylineComposite: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Avatar>
        <AvatarImage src="/authors/editor-in-chief.webp" alt="" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}
      >
        <span style={{ fontWeight: 600 }}>AK ALMoumen</span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Editor-in-chief · Dispatch No. 12
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The editor-in-chief byline the source header names as the default consumer. The adjacent text carries the accessible name, so the image is decorative (empty alt) and the fallback is aria-hidden at source.",
      },
    },
  },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dusk — the chiaroscuro walnut study: the fallback chip's inset surface and muted ink re-resolve through the [data-prime-cycle] cascade toward warm-cream on walnut; the component authors no theme variants (construction rule 5).",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AK</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Night — the true-black void: the monospace initials read as restrained HUD ink over the inset surface, re-resolved at bridge level (construction rule 5).",
      },
    },
  },
};
