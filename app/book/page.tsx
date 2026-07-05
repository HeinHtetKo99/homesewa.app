import { Suspense } from "react";
import FormPageLayout from "../../components/FormPageLayout";
import BookForm from "./BookForm";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Book a Home Service in Kathmandu",
  description:
    "Book HomeSewa on-demand home services in Kathmandu, Nepal — cleaning, salon at home, repairs, and more. Pick a service, choose a time, and confirm in minutes.",
  path: "/book",
  keywords: ["HomeSewa booking Kathmandu", "book home service Nepal", "online service booking Kathmandu"],
});

export default function BookPage() {
  return (
    <FormPageLayout
      breadcrumb="Book"
      title="Book a Service with HomeSewa"
    >
      <Suspense fallback={null}>
        <BookForm />
      </Suspense>
    </FormPageLayout>
  );
}
