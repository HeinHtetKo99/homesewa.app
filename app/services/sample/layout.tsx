import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sample Service",
  description: "Sample service page template for HomeSewa.",
  path: "/services/sample",
  noindex: true,
});

export default function SampleServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
