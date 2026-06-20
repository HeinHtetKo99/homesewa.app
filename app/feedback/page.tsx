import FormPageLayout from "../../components/FormPageLayout";
import FeedbackForm from "../../components/FeedbackForm";

export const metadata = {
  title: "Feedback | RocketSingh",
  description:
    "Share your feedback with RocketSingh — help us improve our professional cleaning services.",
  keywords: "RocketSingh feedback, cleaning service review, customer feedback",
};

export default function FeedbackPage() {
  return (
    <FormPageLayout
      breadcrumb="Feedback"
      title="Share Your Feedback with RocketSingh"
    >
      <FeedbackForm />
    </FormPageLayout>
  );
}
