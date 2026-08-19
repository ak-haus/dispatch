import type { Meta, StoryObj } from "@storybook/react-vite";
import { CrossPost, type CrossPostEntry } from "./CrossPost";

/**
 * Storybook 9 stories for CrossPost (CD4 spec Field 8 contract).
 *
 * The variant matrix is bounded by the CD4 spec Field 2 table (default /
 * subset / read-stats / compact-mobile) and the shipped prop surface
 * (entries + optional engagement + optional published flag). Cycle stories
 * drive the canon [data-prime-cycle] cascade via globals.cycle.
 */

const ARTICLE_SLUG = "the-charter-ledger";

/** Default fixture: the seven canonical platforms per master plan §11 Q13. */
const canonicalSeven: CrossPostEntry[] = [
  { platform: "hashnode", url: `https://dispatch.hashnode.dev/${ARTICLE_SLUG}` },
  { platform: "dev-to", url: `https://dev.to/dispatchmag/${ARTICLE_SLUG}` },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/pulse/the-charter-ledger-dispatch",
  },
  {
    platform: "substack",
    url: `https://dispatchmag.substack.com/p/${ARTICLE_SLUG}`,
  },
  { platform: "x", url: "https://x.com/dispatchmag/status/1956700000000000000" },
  {
    platform: "bluesky",
    url: "https://bsky.app/profile/dispatchmag.dev/post/3kzcharterledger",
  },
  {
    platform: "mastodon",
    url: "https://mastodon.social/@dispatchmag/112890000000000000",
  },
];

/** Subset fixture: per-article opt-in selective syndication (Field 2 `subset`). */
const longFormSubset: CrossPostEntry[] = [
  { platform: "hashnode", url: `https://dispatch.hashnode.dev/${ARTICLE_SLUG}` },
  { platform: "dev-to", url: `https://dev.to/dispatchmag/${ARTICLE_SLUG}` },
  {
    platform: "substack",
    url: `https://dispatchmag.substack.com/p/${ARTICLE_SLUG}`,
  },
];

/** Engagement fixture: quiet per-platform read-stat metadata (Field 2 `read-stats`). */
const withEngagement: CrossPostEntry[] = [
  {
    platform: "hashnode",
    url: `https://dispatch.hashnode.dev/${ARTICLE_SLUG}`,
    engagement: { kind: "reactions", count: 48 },
  },
  {
    platform: "dev-to",
    url: `https://dev.to/dispatchmag/${ARTICLE_SLUG}`,
    engagement: { kind: "reactions", count: 129 },
  },
  {
    platform: "medium",
    url: `https://medium.com/@dispatchmag/${ARTICLE_SLUG}`,
    engagement: { kind: "claps", count: 312 },
  },
  {
    platform: "x",
    url: "https://x.com/dispatchmag/status/1956700000000000000",
    engagement: { kind: "likes", count: 214 },
  },
];

/** State fixture: mixed published + pending syndication (prop surface `published`). */
const mixedPublication: CrossPostEntry[] = [
  {
    platform: "hashnode",
    url: `https://dispatch.hashnode.dev/${ARTICLE_SLUG}`,
    published: true,
  },
  {
    platform: "substack",
    url: `https://dispatchmag.substack.com/p/${ARTICLE_SLUG}`,
    published: false,
  },
  {
    platform: "bluesky",
    url: "https://bsky.app/profile/dispatchmag.dev/post/3kzcharterledger",
    published: false,
  },
];

/** Coverage fixture: every platform literal the shipped union supports. */
const fullRoster: CrossPostEntry[] = [
  ...canonicalSeven,
  { platform: "medium", url: `https://medium.com/@dispatchmag/${ARTICLE_SLUG}` },
  {
    platform: "beehiiv",
    url: `https://dispatchmag.beehiiv.com/p/${ARTICLE_SLUG}`,
  },
  {
    platform: "threads",
    url: "https://www.threads.net/@dispatchmag/post/C-charterledger",
  },
  {
    platform: "hacker-news",
    url: "https://news.ycombinator.com/item?id=41230000",
  },
  { platform: "daily-dev", url: `https://app.daily.dev/posts/${ARTICLE_SLUG}` },
];

const meta: Meta<typeof CrossPost> = {
  title: "Patterns / CrossPost",
  component: CrossPost,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Cross-platform syndication surface listing where an article is republished — positionally-controlled to the article-end footer only, so the sanctuary register survives reading (CD4 spec Field 1 mode-crossing; CD1 Concept 7 article-as-sanctuary). Each entry anchors the syndicated copy externally, preserving canonical_url discipline per master plan §1.5.",
      },
    },
  },
  argTypes: {
    heading: { control: { type: "text" } },
    entries: { control: { type: "object" } },
  },
  args: {
    heading: "Read this elsewhere",
    entries: canonicalSeven,
  },
};

export default meta;
type Story = StoryObj<typeof CrossPost>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `default` — the seven canonical syndication platforms per master plan §11 Q13 (Hashnode / DEV.to / LinkedIn / Substack / X / Bluesky / Mastodon). Every link opens the syndicated copy in a new tab with rel noopener noreferrer (Field 3 keyboard contract).",
      },
    },
  },
};

export const Subset: Story = {
  args: { entries: longFormSubset },
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `subset` — per-article opt-in selective syndication: only the platforms this article was actually republished to render; the rest are simply absent.",
      },
    },
  },
};

export const ReadStats: Story = {
  args: { entries: withEngagement },
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `read-stats` (W3-flagged in the spec; the shipped prop surface already carries it as optional `engagement` metadata) — per-platform counts render as quiet metadata beside the link, never dominating the platform name.",
      },
    },
  },
};

export const PendingSyndication: Story = {
  args: { entries: mixedPublication },
  parameters: {
    docs: {
      description: {
        story:
          "State story from the shipped prop surface: `published: false` marks a destination whose syndicated copy is still pending, rendered in the item's pending treatment alongside live entries.",
      },
    },
  },
};

export const FullPlatformRoster: Story = {
  args: { entries: fullRoster },
  parameters: {
    docs: {
      description: {
        story:
          "Prop-surface coverage: all twelve platform literals the shipped `CrossPostPlatform` union supports — a superset of the §11 Q13 canonical seven — documenting label rendering for every destination.",
      },
    },
  },
};

export const CompactMobile: Story = {
  render: (args) => (
    <div style={{ maxWidth: "20rem" }}>
      <CrossPost {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Field 2 `compact-mobile` — at the mobile breakpoint the platform links stack vertically; rendered here inside a narrow column to exercise the stacking behavior.",
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
          "Dusk cycle — the chiaroscuro walnut study: platform names read as warm-cream ink, wayfinding chrome resolves to gilded copper through the token cascade, and any lit-ember accent stays article-precious, never chrome wallpaper.",
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
          "Night cycle — the true-black void: syndication links sit as restrained HUD chrome with ember-and-gold accents; the list stays quiet metadata, never spectacle.",
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
          "Field 5 reduced-motion fallback: the hover color shift is retained (color is not motion); the glyph transition is removed and states toggle instantly.",
      },
    },
  },
};
