import FormPageLayout from "../../components/FormPageLayout";
import PartnershipForm from "../../components/PartnershipForm";

export const metadata = {
  title: "Partnership | HomeSewa",
  description:
    "Partner with HomeSewa — professional cleaning services partnership opportunities in Nepal.",
  keywords: "cleaning partnership Nepal, HomeSewa partner",
};

export default function PartnershipPage() {
  return (
    <FormPageLayout
      breadcrumb="Become a Partner"
      title="Partnership Opportunity with HomeSewa"
    >
      <PartnershipForm />
    </FormPageLayout>
  );
}
