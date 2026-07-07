import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about HomeSewa — booking, pricing, services, staff training, refunds, and more for home services in Nepal.",
  path: "/faq",
  keywords: [
    "HomeSewa FAQ",
    "home service questions Nepal",
    "booking help Kathmandu",
    "cleaning service pricing Nepal",
  ],
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
