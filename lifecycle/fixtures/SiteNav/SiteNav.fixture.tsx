import { SiteNav } from "@prime-dispatch/ui";

export const SiteNavFixtures = {
  Reception: () => (
    <SiteNav
      links={[
        { label: "Articles", href: "/articles", isActive: true },
        { label: "Archive", href: "/archive" },
        { label: "About", href: "/about" },
        { label: "Subscribe", href: "/subscribe" },
      ]}
    />
  ),
  Article: () => (
    <SiteNav variant="article" links={[{ label: "Back to DISpatch", href: "/" }]} />
  ),
  CompactMobile: () => <SiteNav variant="compact-mobile" />,
};
