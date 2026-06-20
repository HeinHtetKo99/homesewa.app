import FormPageLayout from "../../components/FormPageLayout";
import BookForm from "../../components/BookForm";

export const metadata = {
  title: "Book a RocketSingh in Chennai | RocketSingh",
  description: "Book RocketSingh on demand home services in Chennai, India.",
  keywords: "RocketSingh booking Chennai, book home service, RocketSingh",
};

export default function BookPage() {
  return (
    <FormPageLayout
      breadcrumb="Book"
      title="Book a Service with RocketSingh"
    >
      <BookForm />
    </FormPageLayout>
  );
}
