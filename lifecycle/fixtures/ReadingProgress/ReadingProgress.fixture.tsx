import { ReadingProgress } from "@prime-dispatch/ui";

export const ReadingProgressFixtures = {
  LinearBarEarly: () => <ReadingProgress inline progress={12} />,
  LinearBarMid: () => <ReadingProgress inline progress={48} />,
  LinearBarNearEnd: () => <ReadingProgress inline progress={92} />,
  TypographicPercentage: () => (
    <ReadingProgress inline variant="typographic-percentage" progress={48} />
  ),
};
