import FormPageLayout from "../../components/FormPageLayout";
import CareerForm from "../../components/CareerForm";

export const metadata = {
  title: "Career | HomeSewa",
  description:
    "Join HomeSewa — career opportunities in professional cleaning services in Kathmandu, Nepal.",
  keywords: "cleaning jobs Nepal, HomeSewa career, Kathmandu cleaning jobs",
};

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
