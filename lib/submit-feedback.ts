import { NextResponse } from "next/server";
import { emailValidationError } from "@/lib/form-validation";
import { isWebsiteServiceTitle } from "@/lib/website-services";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  formatSupabaseEnvError,
  getSupabaseEnv,
} from "@/lib/supabase-env";
import { uploadFormFile } from "@/lib/supabase-storage";

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export type FeedbackPayload = {
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  organization: string;
  designation: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  headshot: File | null;
};

async function parseMultipart(
  request: Request,
): Promise<FeedbackPayload | null> {
  const form = await request.formData();
  const headshotRaw = form.get("headshot");

  return {
    firstName: String(form.get("firstName") ?? "").trim(),
    middleName: String(form.get("middleName") ?? "").trim(),
    lastName: String(form.get("lastName") ?? "").trim(),
    country: String(form.get("country") ?? "").trim(),
    organization: String(form.get("organization") ?? "").trim(),
    designation: String(form.get("designation") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    service: String(form.get("service") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
    headshot:
      headshotRaw instanceof File && headshotRaw.size > 0 ? headshotRaw : null,
  };
}

function validatePayload(payload: FeedbackPayload): string | null {
  if (
    !payload.firstName ||
    !payload.middleName ||
    !payload.lastName ||
    !payload.country ||
    !payload.organization ||
    !payload.designation ||
    !payload.phone ||
    !payload.email ||
    !payload.service ||
    !payload.message ||
    !payload.headshot
  ) {
    return "Please fill in all required fields (marked with *).";
  }

  if (!/^\d{10}$/.test(payload.phone)) {
    return "Enter a valid 10-digit mobile number.";
  }

  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;
  if (!payload.email.trim()) return "Email is required.";

  if (!isWebsiteServiceTitle(payload.service)) {
    return "Please select a valid service from the services page.";
  }

  return null;
}

export async function handleFeedbackSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatSupabaseEnvError(env.missing) },
      { status: 500 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  let payload: FeedbackPayload | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      payload = await parseMultipart(request);
    } else {
      return validationError("Feedback must use multipart/form-data.");
    }
  } catch {
    return validationError("Invalid request body");
  }

  if (!payload) return validationError("Invalid request body");

  const validationMsg = validatePayload(payload);
  if (validationMsg) return validationError(validationMsg);

  const warnings: string[] = [];
  let headshotUrl: string | null = null;

  if (payload.headshot) {
    try {
      headshotUrl = await uploadFormFile("feedback", payload.headshot);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      warnings.push(
        `Headshot could not be uploaded: ${payload.headshot.name}: ${msg}.`,
      );
    }
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("feedback")
      .insert({
        first_name: payload.firstName,
        middle_name: payload.middleName,
        last_name: payload.lastName,
        feedback: payload.message,
        services: payload.service ? [payload.service] : null,
        country: payload.country,
        organization: payload.organization,
        designation: payload.designation,
        phone: payload.phone,
        email: payload.email,
        headshot: headshotUrl,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ok: true as const,
      id: String(data.id),
      ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Submission failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
