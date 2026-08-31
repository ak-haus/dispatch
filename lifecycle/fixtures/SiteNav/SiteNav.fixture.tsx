import { SiteNav } from "@prime-dispatch/ui";

export const SiteNavFixtures = {
  Reception: () => <SiteNav currentPath="/" />,
  Article: () => <SiteNav currentPath="/dispatch/week-3" variant="article" />,
  Mobile: () => <SiteNav currentPath="/" variant="mobile" />,
};
