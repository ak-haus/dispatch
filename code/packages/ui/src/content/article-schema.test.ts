import { describe, it, expect } from "vitest";
import {
  ArticleSchema,
  MediaSchema,
  LaneEnum,
  OpenerTypeEnum,
  type Article,
  type Media,
} from "./article-schema";

const VALID_ARTICLE: Article = {
  slug: "dispatch-week-3",
  title: "Dispatch · Week 3",
  description: "On building DISpatch as Prime's editorial substrate.",
  lane: "editorial",
  openerType: "meta",
  author: {
    citizen: "AK ALMoumen",
    aiRole: "human-led-AI-assisted",
  },
  publishedAt: new Date("2026-05-11T00:00:00Z"),
  chapters: [
    { id: "preamble", label: "Preamble" },
    { id: "method", label: "The method" },
  ],
  footnotes: [{ markerNumber: 1, content: "See CD1 §2." }],
  media: [],
  draft: false,
};

describe("ArticleSchema", () => {
  it("accepts a complete valid article", () => {
    const result = ArticleSchema.safeParse(VALID_ARTICLE);
    expect(result.success).toBe(true);
  });

  it("rejects non-kebab-case slug", () => {
    const result = ArticleSchema.safeParse({
      ...VALID_ARTICLE,
      slug: "Dispatch_Week_3",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(JSON.stringify(result.error)).toContain("slug-must-be-kebab-case");
    }
  });

  it("rejects unknown lane", () => {
    const result = ArticleSchema.safeParse({
      ...VALID_ARTICLE,
      lane: "marketing",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description exceeding 280 chars", () => {
    const result = ArticleSchema.safeParse({
      ...VALID_ARTICLE,
      description: "a".repeat(281),
    });
    expect(result.success).toBe(false);
  });

  it("coerces ISO-string publishedAt into Date", () => {
    const result = ArticleSchema.safeParse({
      ...VALID_ARTICLE,
      publishedAt: "2026-05-11T00:00:00Z",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.publishedAt).toBeInstanceOf(Date);
    }
  });

  it("supplies sensible defaults for chapters/footnotes/media/draft", () => {
    const result = ArticleSchema.safeParse({
      slug: "minimal",
      title: "Minimal",
      description: "Minimal description",
      lane: "editorial",
      openerType: "narrative",
      author: { citizen: "AK" },
      publishedAt: new Date(),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.chapters).toEqual([]);
      expect(result.data.footnotes).toEqual([]);
      expect(result.data.media).toEqual([]);
      expect(result.data.draft).toBe(false);
    }
  });

  it("LaneEnum carries the canonical 3 lanes", () => {
    expect(LaneEnum.options).toEqual([
      "editorial",
      "institutional",
      "dispatch",
    ]);
  });

  it("OpenerTypeEnum carries META × NARRATIVE distinction", () => {
    expect(OpenerTypeEnum.options).toEqual(["meta", "narrative"]);
  });
});

describe("MediaSchema discriminated union", () => {
  it("accepts image media", () => {
    const m: Media = { type: "image", src: "/img/x.png", alt: "diagram" };
    expect(MediaSchema.safeParse(m).success).toBe(true);
  });

  it("accepts video media", () => {
    const m: Media = {
      type: "video",
      src: "/v/x.mp4",
      duration: 120,
      caption: "demo",
    };
    expect(MediaSchema.safeParse(m).success).toBe(true);
  });

  it("accepts embed with valid URL", () => {
    const m: Media = {
      type: "embed",
      url: "https://example.com/embed",
      provider: "vimeo",
    };
    expect(MediaSchema.safeParse(m).success).toBe(true);
  });

  it("rejects embed with malformed URL", () => {
    const result = MediaSchema.safeParse({
      type: "embed",
      url: "not-a-url",
      provider: "vimeo",
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown media type via discriminator", () => {
    const result = MediaSchema.safeParse({
      type: "podcast",
      src: "/p/x.mp3",
    });
    expect(result.success).toBe(false);
  });
});
