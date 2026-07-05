import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Browse the HomeSewa gallery — photos of our professional cleaning and home service work across Kathmandu and Nepal.",
  path: "/gallery",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
