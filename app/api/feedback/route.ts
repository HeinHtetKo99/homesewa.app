import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleFeedbackSubmission } from "@/lib/submit-feedback";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleFeedbackSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
