import { z } from "zod";

/**
 * Prime DISpatch article schema (canonical contract).
 *
 * Source canon:
 *   - master plan §3.C content schema (Astro Content Layer + Zod)
 *   - master plan §1.4 multimedia at schema level (discriminated media[])
 *   - master plan §1.5 distribution (canonical_url + per-platform hooks)
 *   - CD4 §3.1 #9/#10 META × NARRATIVE opener distinction
 *   - voice/lane-schema.md (DLDS lane taxonomy)
 *
 * Used by:
 *   - microsite-astro/src/content.config.ts → Astro Content Collections
 *   - any future cross-Building consumer (server endpoints, RSS, etc.)
 */

export const LaneEnum = z.enum(["editorial", "institutional", "dispatch"]);
export type Lane = z.infer<typeof LaneEnum>;

export const AiRoleEnum = z.enum([
  "human-only",
  "human-led-AI-assisted",
  "AI-led-human-supervised",
  "system-generated",
]);
export type AiRole = z.infer<typeof AiRoleEnum>;

export const OpenerTypeEnum = z.enum(["meta", "narrative"]);
export type OpenerType = z.infer<typeof OpenerTypeEnum>;

export const AuthorshipSchema = z.object({
  citizen: z.string().min(1),
  aiRole: AiRoleEnum.optional(),
});

export const ChapterSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

export const FootnoteSchema = z.object({
  markerNumber: z.number().int().positive(),
  content: z.string().min(1),
});

const MediaImageSchema = z.object({
  type: z.literal("image"),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  credit: z.string().optional(),
});

const MediaVideoSchema = z.object({
  type: z.literal("video"),
  src: z.string().min(1),
  poster: z.string().optional(),
  caption: z.string().optional(),
  duration: z.number().int().positive().optional(),
});

const MediaGifSchema = z.object({
  type: z.literal("gif"),
  src: z.string().min(1),
  alt: z.string().min(1),
});

const MediaAudioSchema = z.object({
  type: z.literal("audio"),
  src: z.string().min(1),
  caption: z.string().optional(),
});

const MediaEmbedSchema = z.object({
  type: z.literal("embed"),
  url: z.string().url(),
  provider: z.string().min(1),
  caption: z.string().optional(),
});

export const MediaSchema = z.discriminatedUnion("type", [
  MediaImageSchema,
  MediaVideoSchema,
  MediaGifSchema,
  MediaAudioSchema,
  MediaEmbedSchema,
]);
export type Media = z.infer<typeof MediaSchema>;

export const DistributionSchema = z.object({
  canonicalUrl: z.string().url(),
  socialHook: z.string().max(280).optional(),
  linkedinHook: z.string().max(700).optional(),
  newsletterExcerpt: z.string().max(500).optional(),
});

export const ArticleSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug-must-be-kebab-case"),
  title: z.string().min(1),
  description: z.string().min(1).max(280),
  lane: LaneEnum,
  openerType: OpenerTypeEnum,
  author: AuthorshipSchema,
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  chapters: z.array(ChapterSchema).default([]),
  footnotes: z.array(FootnoteSchema).default([]),
  media: z.array(MediaSchema).default([]),
  distribution: DistributionSchema.optional(),
  draft: z.boolean().default(false),
});
export type Article = z.infer<typeof ArticleSchema>;
