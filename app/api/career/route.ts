import { corsPreflightResponse, withCors } from "@/lib/api-cors";
import { handleCareerSubmission } from "@/lib/submit-career";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return withCors(await handleCareerSubmission(request));
}

export async function OPTIONS() {
  return corsPreflightResponse();
}
