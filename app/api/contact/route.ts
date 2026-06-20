import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleContactSubmission } from "@/lib/submit-contact";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleContactSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
