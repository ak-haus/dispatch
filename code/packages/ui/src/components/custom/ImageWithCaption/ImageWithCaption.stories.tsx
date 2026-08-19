import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImageWithCaption } from "./ImageWithCaption";

/**
 * a11y + capture settle discipline (the ADR-0003 Stage-4 flake law): the
 * figure mounts through a Motion entrance (opacity 0 → 1, y 16 → 0), and both
 * the addon-a11y afterEach and the Chromatic story-lane capture would
 * otherwise read MID-FADE ink — axe flattens element opacity into its
 * computed colors and reports blended values no token authors (the Footnote /
 * ComparisonGrid precedent). Wait until every rendered figure holds opacity
 * exactly 1.
 *
 * whileInView adds a second race the older components do not have: the
 * viewport trigger only fires once the element intersects, so scroll it into
 * view first rather than trusting the story frame's initial layout.
 */
async function settleFigures({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> {
  const figures = Array.from(
    canvasElement.querySelectorAll<HTMLElement>(".prime-figure"),
  );
  // Per-figure, never as a batch: scrolling figure N into view can push
  // figure N-1 back out, so a single scroll pass plus one shared wait leaves
  // the earlier figures' viewport trigger unfired (observed on
  // TwoFiguresOneLane). Settle each one where it is, then move on — once
  // whileInView has fired with once:true it stays settled.
  for (const figure of figures) {
    figure.scrollIntoView({ block: "center" });
    const deadline = Date.now() + 5000;
    while (Number(getComputedStyle(figure).opacity) !== 1) {
      if (Date.now() > deadline) {
        throw new Error("ImageWithCaption entrance did not settle within 5s");
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}

/* Real shipped assets only (the no-placeholder-media law, AGENTS.md): these
 * resolve through Storybook's staticDirs → microsite-astro/public. */
const CARTOGRAPHY = "/cartography/district.webp";
const BANNER = "/banners/dispatch-02.webp";

const meta: Meta<typeof ImageWithCaption> = {
  title: "Article / ImageWithCaption",
  component: ImageWithCaption,
  tags: ["autodocs"],
  play: settleFigures,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "CD7 #24 — the article figure primitive: figure + img + figcaption + DLDS provenance band. A PLATE, not a card: no frame, matte or shadow (construction Rule 3 + Rule 6). The four canon variants differ by the caption's VOICE — Body / Meta-code / Civic-Dante+letterpress / Body+credit — which is C1 multi-voice typography made structural. Built through the S4 design-intent-to-code lane from DESIGN.md + tokens + CD7 §3.4, with no Figma artifact in the loop.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "meta-terminal", "cartography-frame", "photograph"],
    },
    loading: { control: { type: "radio" }, options: ["eager", "lazy"] },
  },
  args: {
    variant: "default",
    src: BANNER,
    alt: "Dispatch 02 banner illustration",
    loading: "eager",
    caption:
      "The Editorial District at first light — the cartographic substrate is a live grid layer, not a background image.",
  },
};

export default meta;
type Story = StoryObj<typeof ImageWithCaption>;

export const Default: Story = {};

export const MetaTerminal: Story = {
  args: {
    variant: "meta-terminal",
    caption: "$ prime citizens list --lane dispatch → 3 positions filled, 1 open",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Meta-code slot. The mono family is component-locked per CD1 Concept 1 — legal in a figcaption because a figcaption is neither chrome nor article prose.",
      },
    },
  },
};

export const CartographyFrame: Story = {
  args: {
    variant: "cartography-frame",
    src: CARTOGRAPHY,
    alt: "Editorial District cartographic plate",
    caption: "Plate I — the Editorial District, surveyed at dawn.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Civic/Dante slot (IM Fell English — NOT Cinzel, tombstoned 2026-05-10), asset-locked to cartography and signage, and pressed into the substrate with the page-owned .dispatch-emboss letterpress (DESIGN.md §Typography universal rule 3).",
      },
    },
  },
};

export const Photograph: Story = {
  args: {
    variant: "photograph",
    caption: "The masthead plate, photographed off the press sheet.",
    credit: "Prime DISpatch · Editorial",
  },
};

export const WithProvenanceBand: Story = {
  args: {
    provenance: {
      lane: "editorial",
      authorship: { citizen: "AK ALMoumen", aiRole: "human-led-AI-assisted" },
      c2paAttached: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The DLDS band is the ratified DldsPanel (#7), composed — not restyled. c2paAttached is a DECLARED flag; reading content credentials off the asset at runtime is OQ-7/OQ-8 territory, deliberately not built here.",
      },
    },
  },
};

export const TwoFiguresOneLane: Story = {
  args: { caption: undefined, provenance: undefined },
  render: () => (
    <>
      <ImageWithCaption
        src={BANNER}
        alt="Dispatch 02 banner illustration"
        loading="eager"
        caption="First plate."
        provenance={{ lane: "editorial", authorship: { citizen: "AK ALMoumen" } }}
      />
      <ImageWithCaption
        src={CARTOGRAPHY}
        alt="Editorial District cartographic plate"
        loading="eager"
        caption="Second plate, same lane."
        provenance={{ lane: "editorial", authorship: { citizen: "AK ALMoumen" } }}
      />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Regression guard for axe landmark-unique: DldsPanel names its complementary landmark after the LANE, so two same-lane figures on one page would collide. The figure overrides the label with its own alt-derived name.",
      },
    },
  },
};

export const NoCaption: Story = {
  args: { caption: undefined, alt: "Dispatch 02 banner illustration" },
  parameters: {
    docs: {
      description: {
        story:
          "A plate whose meaning is carried entirely by the alt text renders no figcaption at all — less chrome by default (Rule 6).",
      },
    },
  },
};

export const DawnCycle: Story = {
  globals: { cycle: "dawn" },
  args: { variant: "cartography-frame", src: CARTOGRAPHY, alt: "Editorial District cartographic plate", caption: "Plate I — surveyed at dawn." },
};

export const DuskCycle: Story = {
  globals: { cycle: "dusk" },
  args: { variant: "cartography-frame", src: CARTOGRAPHY, alt: "Editorial District cartographic plate", caption: "Plate I — surveyed at dusk." },
  parameters: {
    docs: {
      description: {
        story:
          "Dusk inverts the letterpress: multiply is dropped for a soft drop shadow (letterpress.css), because multiplying dark ink into a dark substrate reads as washed-out over the cartography's bright-red building shapes.",
      },
    },
  },
};

export const NightCycle: Story = {
  globals: { cycle: "night" },
  args: { variant: "cartography-frame", src: CARTOGRAPHY, alt: "Editorial District cartographic plate", caption: "Plate I — surveyed at night." },
};

export const ReducedMotion: Story = {
  globals: { cycle: "dawn", reducedMotion: "reduce" },
  parameters: {
    docs: {
      description: {
        story:
          "useReducedMotion() reads the real media query: the entrance is not authored at all, so the figure mounts at its settled values instead of animating to them.",
      },
    },
  },
};
