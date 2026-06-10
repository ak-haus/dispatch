import { ChapterRail, type ChapterRailItem } from "@prime-dispatch/ui";

/* W3-S-A Cycle 2 — chapter labels no longer pre-prefixed with Roman numerals;
 * the ChapterRail component itself generates Roman-numeral markers via the
 * Cinzel typographic marker span (Agent 1 §3.1 elevation). */
const CHAPTERS: ChapterRailItem[] = [
  { id: "preamble", label: "Preamble", isVisited: true },
  { id: "field-conditions", label: "Field conditions", isCurrent: true },
  { id: "the-method", label: "The method" },
  { id: "limits", label: "Limits & failure modes" },
];

export const ChapterRailFixtures = {
  ArticleDefault: () => <ChapterRail chapters={CHAPTERS} />,
  Collapsed: () => <ChapterRail variant="article-collapsed" chapters={CHAPTERS} />,
  ReceptionCondensed: () => (
    <ChapterRail variant="reception-condensed" chapters={CHAPTERS} />
  ),
  MobileBottomSheet: () => (
    <ChapterRail variant="article-mobile-bottom-sheet" chapters={CHAPTERS} />
  ),
};
