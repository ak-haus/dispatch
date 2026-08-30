import { useState, type ReactElement, type ReactNode } from "react";
import { clsx } from "clsx";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../ui";
import "./SearchPalette.css";

/**
 * SearchPalette — site-wide cmd-K palette (search as civic infrastructure).
 *
 * Canon: representation/visual-system/components/SearchPalette/spec.md
 *  + CD4 §3.1 #18 + CD1 Concept 3 page furniture as civic wayfinding.
 *
 * Composes Dialog (Radix; modal lifecycle + focus trap) + Command (cmdk;
 * filter logic + keyboard nav). Host opens via paletteOpen prop driven by
 * cmd+k keyboard shortcut OR SiteNav search button click.
 */

export type SearchPaletteResultGroup = {
  heading: string;
  items: SearchPaletteResultItem[];
};

export type SearchPaletteResultItem = {
  id: string;
  /** Display label */
  label: string;
  /** Secondary muted text (optional) */
  description?: string;
  /** Click/select handler — receives item */
  onSelect: (item: SearchPaletteResultItem) => void;
  /** Optional left-slot icon */
  icon?: ReactNode;
};

export type SearchPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Result groups (typically returned from a query hook) */
  groups: SearchPaletteResultGroup[];
  /** Placeholder for the search input */
  placeholder?: string;
  /** Empty-state message when no results match the query */
  emptyMessage?: string;
  className?: string;
};

export function SearchPalette(props: SearchPaletteProps): ReactElement {
  const {
    open,
    onOpenChange,
    groups,
    placeholder = "Search dispatches, articles, signals…",
    emptyMessage = "No results — try a different query.",
    className,
  } = props;

  const [query, setQuery] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="prime-search-palette__overlay" />
        <DialogContent
          className={clsx("prime-search-palette__dialog", className)}
        >
          <DialogTitle className="prime-search-palette__title">
            Search Prime DISpatch
          </DialogTitle>
          <DialogDescription className="prime-search-palette__description">
            Find articles, signals, and dispatches across the Editorial District.
          </DialogDescription>
          <Command
            className="prime-search-palette__command"
            shouldFilter
            value={query}
            onValueChange={setQuery}
          >
            <CommandInput
              placeholder={placeholder}
              className="prime-search-palette__input"
            />
            <CommandList className="prime-search-palette__list">
              {/* axe aria-required-children: cmdk hardcodes role="listbox" on
                  the list and role="presentation" on Empty (its own attributes
                  land after the props spread — see the CommandSeparator note
                  in ui/command.tsx), so in the empty lifecycle state the
                  listbox owns no option/group child and cannot be re-roled
                  via props. Per the WAI-ARIA APG listbox pattern the message
                  is therefore exposed as a single non-activatable option
                  (role="option" + aria-disabled), owned by the listbox
                  through the presentational wrappers. Visible DOM text and
                  visuals are unchanged; cmdk keyboard nav only walks
                  [cmdk-item] nodes, so the option is never selectable. */}
              <CommandEmpty>
                <div role="option" aria-disabled="true" aria-selected={false}>
                  {emptyMessage}
                </div>
              </CommandEmpty>
              {groups.map((group) => (
                <CommandGroup
                  key={group.heading}
                  heading={group.heading}
                  className="prime-search-palette__group"
                >
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.label} ${item.description ?? ""}`}
                      onSelect={() => {
                        item.onSelect(item);
                        onOpenChange(false);
                      }}
                      className="prime-search-palette__item"
                    >
                      {item.icon ? (
                        <span className="prime-search-palette__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="prime-search-palette__label">{item.label}</span>
                      {item.description ? (
                        <span className="prime-search-palette__description-text">
                          {item.description}
                        </span>
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
