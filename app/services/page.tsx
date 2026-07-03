import type { Metadata } from "next";
import ServicesExplorer from "./ServicesExplorer";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "All Home Services in Kathmandu, Nepal",
  description:
    "Browse all HomeSewa services — cleaning, salon at home, spa, massage, physiotherapy, repairs, and more. Verified professionals, transparent pricing, superfast booking across Nepal.",
  path: "/services",
  keywords: [
    "home services Kathmandu",
    "cleaning services Nepal",
    "salon at home Nepal",
    "on demand services Kathmandu",
  ],
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-b from-white via-teal-50 to-white pt-20 pb-8 px-4 sm:px-6 lg:px-0">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-teal-900 animate-rise-fade">
              Our Services
            </h1>
            <p className="text-gray-700 mt-4 animate-rise-fade [animation-delay:120ms]">
              Complete on-demand home services platform.
            </p>
          </div>

          <ServicesExplorer />
        </div>
      </section>
    </div>
  );
}
