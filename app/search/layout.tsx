import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description: "Search HomeSewa services, blog posts, and pages.",
  path: "/search",
  noindex: true,
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
