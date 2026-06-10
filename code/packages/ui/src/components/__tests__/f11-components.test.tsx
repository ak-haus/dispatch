import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  LiveTicker,
  SearchPalette,
  CodeBlockCopyButton,
  MetroMapMarker,
  ReceptionHero,
  EditorialDigest,
  DistrictMap,
  CrossPost,
  VirgilChat,
  LiveRoom,
  CartographyCanvas,
} from "../../index";

const FIXED_DATE = new Date(2026, 4, 11, 12, 0, 0);

describe("F11 — LiveTicker", () => {
  it("renders region role with aria-live + entries", () => {
    render(
      <LiveTicker
        entries={[
          { id: "a", kind: "commit", text: "feat(ui): land F11", at: FIXED_DATE },
          { id: "b", kind: "deploy", text: "vercel deploy succeeded", at: FIXED_DATE },
        ]}
      />,
    );
    const region = screen.getByRole("region", { name: "Live updates from Prime" });
    expect(region).toBeInTheDocument();
    expect(region.getAttribute("aria-live")).toBe("polite");
    expect(screen.getByText("feat(ui): land F11")).toBeInTheDocument();
  });
});

describe("F11 — SearchPalette", () => {
  it("renders Dialog when open + filters via cmdk", () => {
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();
    render(
      <SearchPalette
        open
        onOpenChange={onOpenChange}
        groups={[
          {
            heading: "Articles",
            items: [
              { id: "1", label: "Dispatch · Week 3", onSelect },
              { id: "2", label: "Signal 001", onSelect },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Search Prime DISpatch")).toBeInTheDocument();
    expect(screen.getByText("Dispatch · Week 3")).toBeInTheDocument();
  });
});

describe("F11 — CodeBlockCopyButton", () => {
  it("renders pre/code + copy button with aria-label", () => {
    render(
      <CodeBlockCopyButton
        code="const prime = true;"
        language="typescript"
        filename="prime.ts"
      />,
    );
    expect(screen.getByText("const prime = true;")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("prime.ts")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copy code to clipboard" }),
    ).toBeInTheDocument();
  });
});

describe("F11 — MetroMapMarker", () => {
  it("renders SVG group with name label + circle markers", () => {
    const { container } = render(
      <svg viewBox="0 0 1440 900">
        <MetroMapMarker x={100} y={200} name="Letterpress" />
      </svg>,
    );
    expect(screen.getByLabelText("Letterpress station")).toBeInTheDocument();
    expect(container.querySelectorAll("circle").length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector("text")?.textContent).toBe("Letterpress");
  });

  it("toggles button role + tabIndex when onActivate provided", () => {
    render(
      <svg>
        <MetroMapMarker
          x={100}
          y={200}
          name="Hub"
          onActivate={() => undefined}
        />
      </svg>,
    );
    const marker = screen.getByLabelText("Hub station");
    expect(marker.getAttribute("role")).toBe("button");
    // SVG attributes are lowercase per XML; happy-dom serializes accordingly.
    expect(marker.getAttribute("tabindex")).toBe("0");
  });
});

describe("F11 — ReceptionHero", () => {
  it("renders feature-story link with title + deck + byline", () => {
    render(
      <ReceptionHero
        slug="dispatch-week-3"
        title="Dispatch · Week 3"
        deck="On building the cartography substrate."
        lane="editorial"
        publishedAt={FIXED_DATE}
        author="AK ALMoumen"
      />,
    );
    expect(
      screen.getByRole("link", { name: "Read Dispatch · Week 3" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dispatch · Week 3")).toBeInTheDocument();
    expect(screen.getByText("By AK ALMoumen")).toBeInTheDocument();
    expect(screen.getByText("EDITORIAL · 2026-05-11")).toBeInTheDocument();
  });
});

describe("F11 — EditorialDigest", () => {
  it("renders sectioned entries with lane indicators + datelines", () => {
    render(
      <EditorialDigest
        sections={[
          {
            heading: "Latest",
            entries: [
              {
                slug: "a",
                title: "Article A",
                lane: "editorial",
                publishedAt: FIXED_DATE,
              },
              {
                slug: "b",
                title: "Article B",
                lane: "dispatch",
                publishedAt: FIXED_DATE,
                status: "coming-soon",
              },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Latest" })).toBeInTheDocument();
    expect(screen.getByText("Article A")).toBeInTheDocument();
    expect(screen.getByText("EDITORIAL")).toBeInTheDocument();
    // coming-soon does NOT render an anchor
    expect(screen.queryByRole("link", { name: /Article B/ })).toBeNull();
    // published renders an anchor
    expect(screen.getByRole("link", { name: /Article A/ })).toBeInTheDocument();
  });
});

describe("F11 — DistrictMap (CartographyCanvas specialization)", () => {
  it("inherits CartographyCanvas SVG with homepage-low dial", () => {
    render(<DistrictMap />);
    const svg = screen.getByRole("img", {
      name: "Editorial District map — homepage navigation",
    });
    expect(svg.getAttribute("data-prime-surface")).toBe("homepage");
    expect(svg.getAttribute("data-prime-dial")).toBe("low");
  });

  it("composes children inside the cartography canvas", () => {
    render(
      <DistrictMap>
        <MetroMapMarker x={100} y={100} name="Stub" />
      </DistrictMap>,
    );
    expect(screen.getByLabelText("Stub station")).toBeInTheDocument();
  });
});

describe("F11 — CrossPost", () => {
  it("lists syndication entries with platform labels + external links", () => {
    render(
      <CrossPost
        entries={[
          { platform: "hashnode", url: "https://hashnode.com/post/123" },
          { platform: "dev-to", url: "https://dev.to/post/123" },
        ]}
      />,
    );
    expect(screen.getByText("Hashnode")).toBeInTheDocument();
    expect(screen.getByText("DEV.to")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link").every(
        (a) => a.getAttribute("rel") === "noopener noreferrer",
      ),
    ).toBe(true);
  });
});

describe("F11 — VirgilChat", () => {
  it("renders empty-state when no turns + form for input", () => {
    const onSend = vi.fn();
    render(<VirgilChat turns={[]} onSend={onSend} />);
    expect(screen.getByLabelText("Virgil chat")).toBeInTheDocument();
    expect(
      screen.getByText("Virgil is the guide. Ask anything about the dispatch."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Message Virgil")).toBeInTheDocument();
  });

  it("renders turns with speaker labels", () => {
    const onSend = vi.fn();
    render(
      <VirgilChat
        onSend={onSend}
        turns={[
          { id: "1", speaker: "user", body: "Where is the dispatch?", at: FIXED_DATE },
          { id: "2", speaker: "virgil", body: "On the canvas.", at: FIXED_DATE },
        ]}
      />,
    );
    expect(screen.getByText("Where is the dispatch?")).toBeInTheDocument();
    expect(screen.getByText("On the canvas.")).toBeInTheDocument();
    expect(screen.getByLabelText("user said:")).toBeInTheDocument();
    expect(screen.getByLabelText("virgil said:")).toBeInTheDocument();
  });
});

describe("F11 — LiveRoom", () => {
  it("renders empty-state when room is quiet", () => {
    render(<LiveRoom presence={[]} activity={[]} />);
    expect(
      screen.getByText("The room is quiet. Check back during dispatch hours."),
    ).toBeInTheDocument();
  });

  it("renders presence + activity when room is active", () => {
    render(
      <LiveRoom
        presence={[
          { name: "AK ALMoumen", status: "active", lane: "dispatch" },
          { name: "Repo Code", status: "idle", lane: "institutional" },
        ]}
        activity={[
          {
            id: "x",
            kind: "commit",
            citizen: "AK",
            text: "feat: F11 components",
            at: FIXED_DATE,
          },
        ]}
      />,
    );
    expect(screen.getByText("In the room")).toBeInTheDocument();
    expect(screen.getByText("2 present")).toBeInTheDocument();
    expect(screen.getByText("AK ALMoumen")).toBeInTheDocument();
    expect(screen.getByText("feat: F11 components")).toBeInTheDocument();
  });
});

describe("F11 — Re-export from main barrel works", () => {
  it("CartographyCanvas re-export from main barrel matches /cartography export", () => {
    render(<CartographyCanvas />);
    expect(
      screen.getByRole("img", { name: "Editorial District cartography" }),
    ).toBeInTheDocument();
  });
});
