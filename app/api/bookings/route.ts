import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleBookingSubmission } from "@/lib/submit-booking";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleBookingSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
