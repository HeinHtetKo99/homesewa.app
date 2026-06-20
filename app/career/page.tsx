import FormPageLayout from "../../components/FormPageLayout";
import CareerForm from "../../components/CareerForm";

export const metadata = {
  title: "Career | RocketSingh",
  description:
    "Join RocketSingh — career opportunities in professional cleaning services in Chennai, India.",
  keywords: "cleaning jobs India, RocketSingh career, Chennai cleaning jobs",
};

export default function CareerPage() {
  return (
    <FormPageLayout
      breadcrumb="Career"
      title="Career Opportunity with RocketSingh"
    >
      <CareerForm />
    </FormPageLayout>
  );
}
