import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Events Calendar",
  description:
    "Stay up to date with HomeSewa events, campaigns, and important dates on our events calendar.",
  path: "/calendar",
});

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
