import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Services Glossary",
  description:
    "A glossary of cleaning and home service terms — understand deep cleaning, sanitization, upholstery care, and more with HomeSewa.",
  path: "/glossary",
});

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
