import FormPageLayout from "../../components/FormPageLayout";
import FeedbackForm from "./FeedbackForm";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Feedback",
  description:
    "Share your feedback with HomeSewa — help us improve our professional home services in Nepal.",
  path: "/feedback",
  keywords: ["HomeSewa feedback", "cleaning service review", "customer feedback"],
});

export default function FeedbackPage() {
  return (
    <FormPageLayout
      breadcrumb="Feedback"
      title="Share Your Feedback with HomeSewa"
    >
      <FeedbackForm />
    </FormPageLayout>
  );
}
