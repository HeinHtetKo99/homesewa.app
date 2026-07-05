import FormPageLayout from "../../components/FormPageLayout";
import CareerForm from "../../components/CareerForm";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Join as a Professional",
  description:
    "Join HomeSewa as a professional — offer home services in Kathmandu, Nepal. Submit your profile for verification.",
  path: "/career",
  keywords: [
    "join HomeSewa professional",
    "home service jobs Nepal",
    "Kathmandu service professional",
  ],
});

export default function CareerPage() {
  return (
    <FormPageLayout
      breadcrumb="Join as a Professional"
      title="Join as a Professional"
    >
      <CareerForm />
    </FormPageLayout>
  );
}
