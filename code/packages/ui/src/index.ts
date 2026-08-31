// @prime-dispatch/ui — barrel re-export for the 20 V1 component library.
//
// W3-S-A scaffolded Phase 1+2 (9 components in /custom). Stream 1 F11
// (2026-05-11) lands the remaining 11 components per CD4 §3.1 inventory
// (Phase 2 remaining + Phase 3 + cartography substrate already at /cartography).
//
// Three-layer organization per CD4 §3.1:
//   - components/ui       : shadcn-equivalent Radix primitive wrappers (F5)
//   - components/custom   : Prime extensions (chrome / opener / ticker / palette)
//   - components/patterns : business compositions (cartography-coupled / chat / digest)

// --- Phase 1 (W3-S-A 2026-05-10): chrome components ---
export { MastheadWordmark } from "./components/custom/MastheadWordmark";
export type { MastheadWordmarkProps } from "./components/custom/MastheadWordmark";
export { SiteNav, navPages, useMagnetic } from "./components/custom/SiteNav";
export type {
  SiteNavLink,
  SiteNavProps,
  SiteNavVariant,
  UseMagneticOptions,
} from "./components/custom/SiteNav";
export { ChapterRail } from "./components/custom/ChapterRail";
export type {
  ChapterRailItem,
  ChapterRailProps,
} from "./components/custom/ChapterRail";
export { ReadingProgress } from "./components/custom/ReadingProgress";
export type { ReadingProgressProps } from "./components/custom/ReadingProgress";
export { Footnote, FootnoteMarker } from "./components/custom/Footnote";
export type {
  FootnoteProps,
  FootnoteMarkerProps,
} from "./components/custom/Footnote";

// --- Phase 2 (W3-S-A 2026-05-11): /custom components batch 1 ---
export { DldsPanel } from "./components/custom/DldsPanel";
export type {
  DldsPanelProps,
  DldsLane,
  DldsAuthorship,
} from "./components/custom/DldsPanel";
export { MetaArticleOpener } from "./components/custom/MetaArticleOpener";
export type { MetaArticleOpenerProps } from "./components/custom/MetaArticleOpener";
export { NarrativeArticleOpener } from "./components/custom/NarrativeArticleOpener";
export type { NarrativeArticleOpenerProps } from "./components/custom/NarrativeArticleOpener";
export { InstitutionalFixture } from "./components/custom/InstitutionalFixture";
export type { InstitutionalFixtureProps } from "./components/custom/InstitutionalFixture";

// --- Phase 2 remaining (Stream 1 F11 2026-05-11): LiveTicker + SearchPalette ---
export { LiveTicker } from "./components/custom/LiveTicker";
export type {
  LiveTickerProps,
  LiveTickerEntry,
} from "./components/custom/LiveTicker";
export { SearchPalette, searchIndex, highlightMatches } from "./components/custom/SearchPalette";
export type {
  SearchPaletteProps,
  SearchRecord,
  SearchRecordType,
  SearchRecordLane,
} from "./components/custom/SearchPalette";

// --- Phase 3 (Stream 1 F11 2026-05-11): /patterns components ---
// CartographyCanvas + SubstrateLayer live at /cartography (F7 substrate);
// re-export here for component-library consumer convenience.
export {
  CartographyCanvas,
  SubstrateLayer,
} from "./cartography";
export type { CartographyCanvasProps } from "./cartography";

export { CodeBlockCopyButton } from "./components/patterns/CodeBlockCopyButton";
export type { CodeBlockCopyButtonProps } from "./components/patterns/CodeBlockCopyButton";
export { MetroMapMarker } from "./components/patterns/MetroMapMarker";
export type { MetroMapMarkerProps } from "./components/patterns/MetroMapMarker";
export { ReceptionHero } from "./components/patterns/ReceptionHero";
export type { ReceptionHeroProps } from "./components/patterns/ReceptionHero";
export { EditorialDigest } from "./components/patterns/EditorialDigest";
export type {
  EditorialDigestProps,
  EditorialDigestSection,
  EditorialDigestEntry,
} from "./components/patterns/EditorialDigest";
export { DistrictMap } from "./components/patterns/DistrictMap";
export type { DistrictMapProps } from "./components/patterns/DistrictMap";
export { CrossPost } from "./components/patterns/CrossPost";
export type {
  CrossPostProps,
  CrossPostEntry,
  CrossPostPlatform,
} from "./components/patterns/CrossPost";
export { VirgilChat } from "./components/patterns/VirgilChat";
export type {
  VirgilChatProps,
  VirgilChatTurn,
} from "./components/patterns/VirgilChat";
export { LiveRoom } from "./components/patterns/LiveRoom";
export type {
  LiveRoomProps,
  LiveRoomCitizen,
  LiveRoomActivity,
} from "./components/patterns/LiveRoom";

// --- Stream 1 cycle 2026-05-11: editorial-grade custom components ---
export { PullQuote } from "./components/custom/PullQuote";
export type { PullQuoteProps } from "./components/custom/PullQuote";
export { DropCap } from "./components/custom/DropCap";
export type { DropCapProps } from "./components/custom/DropCap";
export { CartographyStrip } from "./components/custom/CartographyStrip";
export type { CartographyStripProps } from "./components/custom/CartographyStrip";
export { AuthorByline } from "./components/custom/AuthorByline";
export type {
  AuthorBylineProps,
  AuthorBylineAuthor,
} from "./components/custom/AuthorByline";
export { ComparisonGrid } from "./components/custom/ComparisonGrid";
export type {
  ComparisonGridProps,
  ComparisonGridItem,
} from "./components/custom/ComparisonGrid";
export { AgentTraceCallout } from "./components/custom/AgentTraceCallout";
export type { AgentTraceCalloutProps } from "./components/custom/AgentTraceCallout";
export { PlotChart } from "./components/custom/PlotChart";
export type { PlotChartProps } from "./components/custom/PlotChart";
export { ArticleDateline } from "./components/custom/ArticleDateline";
export type { ArticleDatelineProps } from "./components/custom/ArticleDateline";

// --- CD7 multimedia extensions (S4 design-intent-to-code lane, 2026-08-19) ---
// #24 ImageWithCaption — the first component built through the Stage-3 lane
// from the contract alone (DESIGN.md + tokens + CD7 §3.4), no Figma artifact.
export { ImageWithCaption } from "./components/custom/ImageWithCaption";
export type {
  ImageWithCaptionProps,
  ImageWithCaptionProvenance,
  ImageWithCaptionVariant,
} from "./components/custom/ImageWithCaption";

export { LIBRARY_VERSION } from "./version";
