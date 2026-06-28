import FormPageLayout from "../../components/FormPageLayout";
import BookForm from "./BookForm";

export const metadata = {
  title: "Book a HomeSewa in Kathmandu | HomeSewa",
  description: "Book HomeSewa on demand home services in Kathmandu, Nepal.",
  keywords: "HomeSewa booking Kathmandu, book home service, HomeSewa",
};

export default function BookPage() {
  return (
    <FormPageLayout
      breadcrumb="Book"
      title="Book a Service with HomeSewa"
    >
      <BookForm />
    </FormPageLayout>
  );
}
