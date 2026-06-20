import FormPageLayout from "../../components/FormPageLayout";
import FeedbackForm from "../../components/FeedbackForm";

export const metadata = {
  title: "Feedback | HomeSewa",
  description:
    "Share your feedback with HomeSewa — help us improve our professional cleaning services.",
  keywords: "HomeSewa feedback, cleaning service review, customer feedback",
};

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
