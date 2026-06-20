import FormPageLayout from "../../components/FormPageLayout";
import PartnershipForm from "../../components/PartnershipForm";

export const metadata = {
  title: "Partnership | RocketSingh",
  description:
    "Partner with RocketSingh — professional cleaning services partnership opportunities in India.",
  keywords: "cleaning partnership India, RocketSingh partner",
};

export default function PartnershipPage() {
  return (
    <FormPageLayout
      breadcrumb="Become a Partner"
      title="Partnership Opportunity with RocketSingh"
    >
      <PartnershipForm />
    </FormPageLayout>
  );
}
