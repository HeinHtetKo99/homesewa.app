import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handlePartnershipSubmission } from "@/lib/submit-partnership";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handlePartnershipSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
