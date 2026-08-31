import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  highlightMatches,
  searchIndex as runSearch,
  type SearchRecordLane,
  type SearchRecord,
  type SearchRecordType,
} from "./search";
import "./SearchPalette.css";

/**
 * SearchPalette — site-wide cmd-K palette.
 *
 * Canon source: representation/visual-system/components/SearchPalette/spec.md
 *  + CD4 §3.1 #18 + CD1 Concept 3 page furniture as civic wayfinding.
 *
 * PORTED AT B16 (fork retirement, 2026-08-30). The microsite carried the
 * production implementation of this component as a 384-LOC fork; the diff
 * ruled its architecture DELIBERATE — it implements spec Field 1's native
 * `<dialog>` structure, Field 4's combobox/listbox ARIA contract, and
 * Field 5's motion verbatim, where the prior library twin (Radix Dialog +
 * cmdk) implemented none of them. The fork's implementation therefore
 * became the library component, hooks renamed to the library's
 * `prime-search-palette__*` inventory (styles co-located in
 * ./SearchPalette.css). "cmd-K palette" in CD4 names the affordance, not
 * the cmdk library — the composition claim in ui/command.tsx's header was
 * its author's gloss, superseded by this port.
 *
 * Architecture:
 *   - Native <dialog role="dialog" aria-modal="true"> per spec Field 1.
 *     Modern browsers (Chrome 37+, Safari 15.4+, Firefox 98+) provide
 *     automatic focus-trap, automatic aria-modal application, native
 *     Escape handling via the `cancel` event, and ::backdrop pseudo.
 *   - Open/close motion via CSS @starting-style + transition-behavior:
 *     allow-discrete (the 2024 pattern for animating display transitions
 *     on <dialog>). 250ms ease-out enter, 200ms ease-in exit per spec
 *     Field 5. Reduced-motion via @media query collapses to instant.
 *   - Substrate: --window-warm (warm-paper printed-search-card per
 *     spec Field 5 atmospheric chrome). Backdrop: --sky-low at 40%.
 *   - Search is a pure function over the server-rendered index passed
 *     as prop. Debounced via useDeferredValue (React 19 primitive).
 *
 * Accessibility (spec Field 4):
 *   - aria-modal="true" automatic via showModal()
 *   - aria-labelledby points to <h2> with visually-hidden title
 *   - input has aria-label, aria-controls, aria-expanded, aria-activedescendant
 *   - <ul role="listbox" id="match-list"> of <li role="option" aria-selected>
 *   - Match-count announced via aria-live="polite"
 *   - Focus returns to trigger on close (tracked + restored)
 *
 * Keyboard (spec Field 3):
 *   - cmd-K / ctrl-K opens (listener lives in the HOST — the affordance is
 *     global per spec §10; the microsite's Masthead owns it)
 *   - Escape closes (native dialog `cancel` event)
 *   - ArrowUp / ArrowDown navigates matches
 *   - Enter activates current match (navigates to href)
 *   - Tab cycles within dialog (native focus trap)
 */

export interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
  index: readonly SearchRecord[];
  variant?: "default" | "mobile" | "district-scoped" | "cosmology-scoped";
  scopeLabel?: string;
  /** Uncontrolled initial query (spec Field 8's `query` arg) — lets stories
   *  and hosts open the palette pre-searched without owning input state.
   *  Matches render on first paint, so snapshot lanes see the loaded state
   *  deterministically, with no interaction timing in the capture. */
  initialQuery?: string;
}

export function SearchPalette({
  open,
  onClose,
  index,
  variant = "default",
  scopeLabel,
  initialQuery = "",
}: SearchPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const listId = useId();
  const liveRegionId = useId();

  const [query, setQuery] = useState(initialQuery);
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);

  const matches = useMemo(
    () => runSearch(index, deferredQuery),
    [index, deferredQuery],
  );
  const hasResults = matches.length > 0;
  const isEmpty = !deferredQuery.trim();
  const isNoMatch = deferredQuery.trim() && matches.length === 0;

  // Open / close lifecycle. Native <dialog> showModal() activates focus
  // trap + aria-modal="true" automatically.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    if (open && !dlg.open) {
      triggerRef.current = (document.activeElement as HTMLElement) ?? null;
      dlg.showModal();
      // Focus input after the open paint settles
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dlg.open) {
      dlg.close();
      triggerRef.current?.focus?.();
    }
  }, [open]);

  // Reset state on each close so the next open starts fresh
  useEffect(() => {
    if (!open) {
      setQuery(initialQuery);
      setActiveIndex(0);
    }
  }, [open, initialQuery]);

  // Bridge native dialog's `cancel` event (Escape) to our onClose callback,
  // AND add a fallback document keydown handler so Escape always closes —
  // covers cases where the cancel event doesn't fire (synthetic events,
  // some browser quirks).
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // we close via React state, not browser default
      onClose();
    };
    const handleDocumentEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    dlg.addEventListener("cancel", handleCancel);
    document.addEventListener("keydown", handleDocumentEscape);
    return () => {
      dlg.removeEventListener("cancel", handleCancel);
      document.removeEventListener("keydown", handleDocumentEscape);
    };
  }, [onClose, open]);

  // Clamp activeIndex when matches list shrinks (query refined)
  useEffect(() => {
    if (activeIndex >= matches.length)
      setActiveIndex(Math.max(0, matches.length - 1));
  }, [matches.length, activeIndex]);

  const activate = useCallback(
    (record: SearchRecord) => {
      onClose();
      // Use a microtask delay so the close animation can begin before navigation
      queueMicrotask(() => {
        window.location.href = record.href;
      });
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const target = matches[activeIndex];
        if (target) {
          e.preventDefault();
          activate(target);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(Math.max(0, matches.length - 1));
      }
    },
    [matches, activeIndex, activate],
  );

  const matchCountAnnouncement = isEmpty
    ? ""
    : isNoMatch
      ? `No matches for "${deferredQuery}".`
      : `${matches.length} match${matches.length === 1 ? "" : "es"} for "${deferredQuery}".`;

  const isMobile = variant === "mobile";
  const isScoped = variant === "district-scoped" || variant === "cosmology-scoped";

  return (
    <dialog
      ref={dialogRef}
      /* The id is a DOM contract with the host: the SiteNav trigger's
         aria-controls names it (spec Field 10 SiteNav coupling). */
      id="dispatch-search-palette"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="prime-search-palette"
      data-variant={variant}
    >
      <div role="document" onKeyDown={handleKeyDown}>
        <h2 id={titleId} className="prime-search-palette__sr">
          Search DISpatch
        </h2>

        {/* Input row */}
        <div className="prime-search-palette__input-row">
          <span aria-hidden="true" className="prime-search-palette__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18"
              height="18"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-label="Search DISpatch"
            aria-autocomplete="list"
            /* aria-controls only while the list exists: with no matches the
               <ul> is unmounted, and a reference to a missing id is an axe
               incomplete (aria-valid-attr-value) — the same A13 ruling the
               SiteNav trigger carries for this dialog's own id. ARIA 1.2
               requires the pair only while expanded. */
            aria-controls={hasResults ? listId : undefined}
            aria-expanded={hasResults}
            aria-activedescendant={
              hasResults ? `${listId}-option-${matches[activeIndex]?.id}` : undefined
            }
            placeholder={
              isScoped ? `Search within ${scopeLabel ?? "scope"}…` : "Search DISpatch…"
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="prime-search-palette__close"
          >
            <kbd>esc</kbd>
          </button>
        </div>

        {/* Live region for screen-reader match-count announcement */}
        <div
          id={liveRegionId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="prime-search-palette__sr"
        >
          {matchCountAnnouncement}
        </div>

        {/* Match list / empty / no-match states */}
        {hasResults && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Search results"
            className="prime-search-palette__list"
          >
            {matches.map((m, i) => {
              const isSelected = i === activeIndex;
              return (
                <li
                  key={m.id}
                  id={`${listId}-option-${m.id}`}
                  role="option"
                  aria-selected={isSelected}
                  data-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => activate(m)}
                  className="prime-search-palette__match"
                >
                  <div className="prime-search-palette__match-type">
                    <MatchTypeBadge type={m.type} />
                    {m.lane && <LanePigment lane={m.lane} />}
                  </div>
                  <div className="prime-search-palette__match-body">
                    <p className="prime-search-palette__match-title">
                      {highlightMatches(m.title, deferredQuery).map((seg, idx) =>
                        seg.match ? (
                          <mark key={idx}>{seg.text}</mark>
                        ) : (
                          <span key={idx}>{seg.text}</span>
                        ),
                      )}
                    </p>
                    <p className="prime-search-palette__match-snippet">
                      {highlightMatches(m.snippet, deferredQuery).map((seg, idx) =>
                        seg.match ? (
                          <mark key={idx}>{seg.text}</mark>
                        ) : (
                          <span key={idx}>{seg.text}</span>
                        ),
                      )}
                    </p>
                    {m.kicker && (
                      <p className="prime-search-palette__match-kicker">{m.kicker}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {isEmpty && (
          <div className="prime-search-palette__hint">
            <p className="prime-search-palette__hint-title">Search DISpatch</p>
            <p className="prime-search-palette__hint-body">
              Articles, districts, dispatches, footnotes — the city's index.
            </p>
          </div>
        )}

        {isNoMatch && (
          <div className="prime-search-palette__hint">
            <p className="prime-search-palette__hint-title">No matches</p>
            <p className="prime-search-palette__hint-body">
              Nothing in the city's index matches <code>{deferredQuery}</code>.
              Try a shorter or different term.
            </p>
          </div>
        )}

        {/* Footer with keyboard hints (Meta-code typography per spec Field 7) */}
        <div className="prime-search-palette__footer" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>enter</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
          {isMobile ? null : (
            <span className="prime-search-palette__footer-spacer">
              {matches.length > 0
                ? `${matches.length} result${matches.length === 1 ? "" : "s"}`
                : "Search civic index"}
            </span>
          )}
        </div>
      </div>
    </dialog>
  );
}

/* ============================================================================
 * Match-type badge — small Pangram Sans label
 * ========================================================================== */

function MatchTypeBadge({ type }: { type: SearchRecordType }) {
  return (
    <span className="prime-search-palette__type-badge" data-type={type}>
      {type}
    </span>
  );
}

/* ============================================================================
 * Lane pigment indicator — small dot in lane color per DLDS
 *
 * Maps DLDS lane → lane pigment per color.md §4.3:
 *   Human-led → lane-institutional-strong (cool mineral, slate)
 *   Hybrid    → accent-prime (dispatch lane = Inferno red)
 *   AI-led    → lane-editorial-strong (warm earth, terracotta)
 * ========================================================================== */

function LanePigment({ lane }: { lane: SearchRecordLane }) {
  return (
    <span
      className="prime-search-palette__lane-pigment"
      data-lane={lane}
      aria-label={`${lane} lane`}
      title={`DLDS · ${lane} lane`}
    />
  );
}
