import FormPageLayout from "../../components/FormPageLayout";
import CareerForm from "../../components/CareerForm";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Join HomeSewa — career and job opportunities in professional home services in Kathmandu, Nepal.",
  path: "/career",
  keywords: ["cleaning jobs Nepal", "HomeSewa career", "Kathmandu service jobs"],
});

export default function CareerPage() {
  return (
    <FormPageLayout
      breadcrumb="Career"
      title="Career Opportunity with HomeSewa"
    >
      <CareerForm />
    </FormPageLayout>
  );
}
