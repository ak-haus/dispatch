import { Footnote } from "@prime-dispatch/ui";

const SAMPLE_PROSE =
  "Per CD1 Concept 5, footnotes participate in the multi-voice typographic system. Three voices, one composition.";

export const FootnoteFixtures = {
  SidebarPopover: () => (
    <Footnote markerNumber={1}>{SAMPLE_PROSE}</Footnote>
  ),
  MobileBottomSheet: () => (
    <Footnote variant="mobile-bottom-sheet" markerNumber={2}>
      {SAMPLE_PROSE}
    </Footnote>
  ),
  Endnote: () => (
    <Footnote variant="endnote" markerNumber={3}>
      {SAMPLE_PROSE}
    </Footnote>
  ),
  InlineAside: () => (
    <Footnote variant="inline-aside" markerNumber={4}>
      {SAMPLE_PROSE}
    </Footnote>
  ),
};
