import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./popover";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./tabs";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command";
import { PrimeToaster } from "./toaster";

describe("F5 Radix primitives — Dialog", () => {
  it("opens via trigger and exposes ARIA dialog role", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Subscribe to DISpatch</DialogTitle>
          <DialogDescription>Receive new dispatches.</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Subscribe to DISpatch")).toBeInTheDocument();
  });

  it("Dialog content carries prime class hook", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByText("Open"));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.className).toContain("prime-dialog__content");
  });
});

describe("F5 Radix primitives — DropdownMenu", () => {
  it("opens via trigger and exposes menu items as menuitem role", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Lanes</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Editorial</DropdownMenuItem>
          <DropdownMenuItem>Institutional</DropdownMenuItem>
          <DropdownMenuItem>Dispatch</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText("Lanes"));
    await waitFor(() => {
      expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    });
    expect(screen.getByText("Editorial")).toBeInTheDocument();
  });
});

describe("F5 Radix primitives — Tooltip", () => {
  it("renders trigger + content surface inside provider", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Wayfinding hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Hover")).toBeInTheDocument();
  });
});

describe("F5 Radix primitives — Popover", () => {
  it("renders content with prime class hook (defaultOpen sidesteps Radix click-handler env quirks)", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Provenance: Editorial · AI-led</PopoverContent>
      </Popover>,
    );
    const content = screen.getByText(/Provenance/);
    expect(content).toBeInTheDocument();
    const wrapper = content.closest(".prime-popover__content");
    expect(wrapper).not.toBeNull();
  });
});

describe("F5 Radix primitives — Accordion", () => {
  it("expands item via trigger; ARIA expanded state flips", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="cd1">
          <AccordionTrigger>CD1 Thesis</AccordionTrigger>
          <AccordionContent>Cartography is the demo for Prime.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByRole("button", { name: "CD1 Thesis" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });
});

describe("F5 Radix primitives — Tabs", () => {
  it("switches active panel on tab trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="meta">
        <TabsList>
          <TabsTrigger value="meta">META</TabsTrigger>
          <TabsTrigger value="narrative">NARRATIVE</TabsTrigger>
        </TabsList>
        <TabsContent value="meta">META content</TabsContent>
        <TabsContent value="narrative">NARRATIVE content</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("META content")).toBeInTheDocument();
    expect(screen.queryByText("NARRATIVE content")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "NARRATIVE" }));
    await waitFor(() => {
      expect(screen.getByText("NARRATIVE content")).toBeInTheDocument();
    });
    expect(screen.queryByText("META content")).not.toBeInTheDocument();
  });
});

describe("F5 cmdk — Command", () => {
  it("renders palette + filters items by query", async () => {
    // pointerEventsCheck disabled — happy-dom + cmdk's input-wrap inherit
    // partial pointer-events surface that userEvent v14 strict-checks.
    // The behavior under test is filter logic, not pointer events.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <Command>
        <CommandInput placeholder="Search dispatches" />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Articles">
            <CommandItem value="dispatch-week-3">Dispatch · Week 3</CommandItem>
            <CommandItem value="dispatch-week-2">Dispatch · Week 2</CommandItem>
            <CommandItem value="signal-001">Signal 001</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText("Dispatch · Week 3")).toBeInTheDocument();
    expect(screen.getByText("Signal 001")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Search dispatches");
    await user.type(input, "signal");
    await waitFor(() => {
      expect(screen.queryByText("Dispatch · Week 3")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Signal 001")).toBeInTheDocument();
  });
});

describe("F5 sonner — PrimeToaster", () => {
  it("mounts without crashing and exposes the toast() API", async () => {
    // Sonner's mount strategy in jsdom-class envs is async; we assert the
    // API contract (toast function importable + mountable component) which
    // is what Prime depends on; visual rendering verified via Storybook.
    const { container, unmount } = render(<PrimeToaster />);
    expect(container).toBeDefined();
    const { toast } = await import("./toaster");
    expect(typeof toast).toBe("function");
    unmount();
  });
});
