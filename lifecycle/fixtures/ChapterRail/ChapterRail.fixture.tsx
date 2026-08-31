import { ChapterRail, type Chapter } from "@prime-dispatch/ui";

/* B16 port — the ported API: chapters are the host's h2 heading shape
 * ({slug,text,depth}); the active chapter is scroll-derived on the live
 * surface, pinned here via currentChapter for a deterministic fixture. */
const CHAPTERS: Chapter[] = [
  { slug: "preamble", text: "Preamble", depth: 2 },
  { slug: "field-conditions", text: "Field conditions", depth: 2 },
  { slug: "the-method", text: "The method", depth: 2 },
  { slug: "limits", text: "Limits & failure modes", depth: 2 },
];

export const ChapterRailFixtures = {
  ArticleDefault: () => (
    <ChapterRail chapters={CHAPTERS} currentChapter={1} progress={0.35} />
  ),
  Collapsed: () => (
    <ChapterRail variant="article-collapsed" chapters={CHAPTERS} currentChapter={1} />
  ),
  ReceptionCondensed: () => (
    <ChapterRail variant="reception-condensed" chapters={CHAPTERS} />
  ),
  MobileBottomSheet: () => (
    <ChapterRail
      variant="article-mobile-bottom-sheet"
      chapters={CHAPTERS}
      currentChapter={1}
    />
  ),
};
