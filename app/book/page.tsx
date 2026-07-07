import { Suspense } from "react";
import FormPageLayout from "../../components/FormPageLayout";
import JsonLd from "../../components/JsonLd";
import BookForm from "./BookForm";
import { absoluteUrl, pageMetadata, SITE_URL } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Book a Home Service in Kathmandu",
  description:
    "Book HomeSewa on-demand home services in Kathmandu, Nepal — cleaning, salon at home, repairs, and more. Pick a service, choose a time, and confirm in minutes.",
  path: "/book",
  keywords: ["HomeSewa booking Kathmandu", "book home service Nepal", "online service booking Kathmandu"],
});

const bookPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Book a Home Service with HomeSewa",
  url: absoluteUrl("/book"),
  description:
    "Book HomeSewa on-demand home services in Kathmandu, Nepal — cleaning, salon at home, repairs, and more.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  potentialAction: {
    "@type": "ReserveAction",
    target: absoluteUrl("/book"),
    name: "Book a Home Service",
  },
};

export default function BookPage() {
  return (
    <>
      <JsonLd data={bookPageJsonLd} />
      <FormPageLayout
        breadcrumb="Book"
        title="Book a Service with HomeSewa"
      >
        <Suspense fallback={null}>
          <BookForm />
        </Suspense>
      </FormPageLayout>
    </>
  );
}
