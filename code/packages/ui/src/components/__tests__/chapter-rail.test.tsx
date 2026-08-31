import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ChapterRail, type Chapter } from "../../index";

/**
 * ChapterRail contract tests (B16 port, 2026-08-31): the fork's shipped
 * behavior, now library-owned — the controlled currentChapter override
 * (aria-current="location" derivation), the chip's dialog trigger contract
 * (aria-haspopup / aria-expanded / aria-controls naming the sheet's id),
 * the native <dialog> open/close wiring, the reception mirror's
 * cross-page articleHref prefix, and the collapse toggle's
 * aria-controls/aria-expanded pair.
 */

const CHAPTERS: Chapter[] = [
  { slug: "preamble", text: "Preamble", depth: 2 },
  { slug: "the-method", text: "The method", depth: 2 },
  { slug: "coda", text: "Coda", depth: 2 },
];

afterEach(() => {
  cleanup();
});

describe("ChapterRail — article-default", () => {
  it("renders the chapters landmark with one aria-current location from the controlled index", () => {
    render(<ChapterRail chapters={CHAPTERS} currentChapter={1} progress={0.5} />);
    // article-default renders the rail nav + the sheet's list nav (mobile pair)
    const navs = screen.getAllByRole("navigation", { name: "Article chapters" });
    expect(navs.length).toBeGreaterThanOrEqual(1);
    const current = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("aria-current") === "location");
    // rail link + the mobile sheet's list link both mark the active chapter
    expect(current.length).toBeGreaterThanOrEqual(1);
    for (const link of current) {
      expect(link.getAttribute("href")).toContain("#the-method");
    }
  });
});

describe("ChapterRail — mobile chip + sheet", () => {
  it("chip carries the dialog trigger contract and opens the sheet via showModal", () => {
    render(
      <ChapterRail
        chapters={CHAPTERS}
        variant="article-mobile-bottom-sheet"
        currentChapter={0}
      />,
    );
    const chip = screen.getByRole("button", {
      name: "Chapters — currently: Preamble. Open chapter list.",
    });
    expect(chip).toHaveAttribute("aria-haspopup", "dialog");
    expect(chip).toHaveAttribute("aria-expanded", "false");
    expect(chip).toHaveAttribute("aria-controls", "chapter-rail-sheet");

    fireEvent.click(chip);
    expect(chip).toHaveAttribute("aria-expanded", "true");
    const dialog = document.getElementById("chapter-rail-sheet") as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog).toHaveAttribute("aria-labelledby", "chapter-rail-sheet-title");

    fireEvent.click(screen.getByRole("button", { name: "Close chapter list" }));
    expect(chip).toHaveAttribute("aria-expanded", "false");
    expect(dialog.open).toBe(false);
  });

  it("initialSheetOpen renders the sheet open on first paint (story-lifecycle affordance)", () => {
    render(
      <ChapterRail
        chapters={CHAPTERS}
        variant="article-mobile-bottom-sheet"
        currentChapter={0}
        initialSheetOpen
      />,
    );
    const dialog = document.getElementById("chapter-rail-sheet") as HTMLDialogElement;
    expect(dialog.open).toBe(true);
  });
});

describe("ChapterRail — article-collapsed", () => {
  it("toggle carries the aria-controls/aria-expanded pair and reveals the list", () => {
    render(
      <ChapterRail chapters={CHAPTERS} variant="article-collapsed" currentChapter={2} />,
    );
    // caret + dot are aria-hidden — the accessible name is the chapter alone
    const toggle = screen.getByRole("button", { name: "Coda" });
    expect(toggle).toHaveAttribute("aria-controls", "chapter-rail-collapsed");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("chapter-rail-collapsed")).not.toBeNull();
    const current = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("aria-current") === "location");
    expect(current.length).toBe(1);
    expect(current[0]).toHaveAttribute("href", "#coda");
  });
});

describe("ChapterRail — reception-condensed", () => {
  it("prefixes links with articleHref for cross-page navigation and tracks nothing", () => {
    render(
      <ChapterRail
        chapters={CHAPTERS}
        variant="reception-condensed"
        articleHref="/article"
      />,
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(CHAPTERS.length);
    expect(links[0]).toHaveAttribute("href", "/article#preamble");
    // reception has no progress coupling and no current-chapter state
    expect(
      links.filter((l) => l.getAttribute("aria-current") !== null).length,
    ).toBe(0);
  });
});
