import FormPageLayout from "../../components/FormPageLayout";
import PartnershipForm from "../../components/PartnershipForm";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Partnership",
  description:
    "Partner with HomeSewa — grow your business with professional home service partnership opportunities in Nepal.",
  path: "/partnership",
  keywords: ["cleaning partnership Nepal", "HomeSewa partner"],
});

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
