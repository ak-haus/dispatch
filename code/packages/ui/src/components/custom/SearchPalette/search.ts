/**
 * SearchPalette query engine — client + server safe.
 *
 * Pure types + pure functions for querying a pre-built index. Nothing here
 * touches a framework or the DOM, so hosts may import it on either side of
 * the render boundary.
 *
 * The index BUILDER is host-owned and stays app-side (the microsite's
 * `src/lib/search-index.ts` reads the content collection at Astro
 * page-render time — `astro:content` is server-only and must never reach a
 * React island). Per spec.md Field 10: the search index is server-rendered
 * and passed to the palette as a prop; the palette queries it with these
 * helpers and performs no runtime fetches.
 *
 * Ported at B16 (2026-08-30) from the microsite's `src/lib/search.ts`,
 * verbatim — the fork retirement moved the engine with the component.
 */

export type SearchRecordType =
  | "article"
  | "district"
  | "building"
  | "footnote"
  | "DLDS";
/* The DLDS disclosure taxonomy (content.config.ts `provenance.lane`).
 * Named SearchRecordLane, NOT DldsLane: library canon already binds
 * `DldsLane` to the pigment lanes (editorial / institutional / dispatch,
 * DldsPanel.tsx:21) — the fork's reuse of that name for the disclosure
 * taxonomy was a collision, converged at B16. */
export type SearchRecordLane = "Human-led" | "Hybrid" | "AI-led";

export interface SearchRecord {
  id: string;
  type: SearchRecordType;
  title: string;
  snippet: string;
  href: string;
  lane?: SearchRecordLane;
  kicker?: string;
  tags?: readonly string[];
}

/**
 * Pure-function query helper. Deterministic given (index, query).
 *
 * Match strategy V1: case-insensitive substring against title, snippet,
 * tags, kicker. Ranked by where the match occurs. Caps at 8 results.
 */
export function searchIndex(
  index: readonly SearchRecord[],
  query: string,
): SearchRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: Array<{ record: SearchRecord; score: number }> = [];

  for (const record of index) {
    let score = 0;
    const title = record.title.toLowerCase();
    const snippet = record.snippet.toLowerCase();
    const kicker = (record.kicker ?? "").toLowerCase();
    const tagsJoined = (record.tags ?? []).join(" ").toLowerCase();

    if (title.includes(q)) score += 100;
    if (title.startsWith(q)) score += 50;
    if (kicker.includes(q)) score += 30;
    if (tagsJoined.includes(q)) score += 20;
    if (snippet.includes(q)) score += 10;

    if (score > 0) scored.push({ record, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map((s) => s.record);
}

/**
 * Highlight query occurrences in a string. Returns an array of segments
 * tagged with `match: boolean` so the renderer can wrap matches in <mark>.
 *
 * Case-insensitive but preserves original casing in output.
 */
export function highlightMatches(
  text: string,
  query: string,
): Array<{ text: string; match: boolean }> {
  const q = query.trim();
  if (!q) return [{ text, match: false }];

  const segments: Array<{ text: string; match: boolean }> = [];
  const lower = text.toLowerCase();
  const lowerQ = q.toLowerCase();

  let cursor = 0;
  let next = lower.indexOf(lowerQ, cursor);
  while (next !== -1) {
    if (next > cursor) segments.push({ text: text.slice(cursor, next), match: false });
    segments.push({ text: text.slice(next, next + q.length), match: true });
    cursor = next + q.length;
    next = lower.indexOf(lowerQ, cursor);
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), match: false });

  return segments;
}
