import { NextResponse } from "next/server";
import { emailValidationError } from "@/lib/form-validation";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  formatSupabaseEnvError,
  getSupabaseEnv,
} from "@/lib/supabase-env";

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

export type ContactJsonBody = Partial<ContactPayload>;

function parseJsonBody(raw: ContactJsonBody): ContactPayload {
  return {
    fullName: String(raw.fullName ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    phone: String(raw.phone ?? "").trim(),
    city: String(raw.city ?? "").trim(),
    message: String(raw.message ?? "").trim(),
  };
}

function validatePayload(payload: ContactPayload): string | null {
  if (!payload.fullName || payload.fullName.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (!payload.email) {
    return "Email is required.";
  }

  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;

  if (!payload.phone) {
    return "Phone number is required.";
  }

  if (!/^\d{7,15}$/.test(payload.phone.replace(/\s/g, ""))) {
    return "Phone must be 7-15 digits (numbers only).";
  }

  if (!payload.message || payload.message.length < 10) {
    return "Message must be at least 10 characters.";
  }

  return null;
}

export async function handleContactSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getSupabaseEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatSupabaseEnvError(env.missing) },
      { status: 500 },
    );
  }

  let payload: ContactPayload | null = null;

  try {
    const raw = (await request.json()) as ContactJsonBody;
    payload = parseJsonBody(raw);
  } catch {
    return validationError("Invalid request body");
  }

  if (!payload) return validationError("Invalid request body");

  const validationMsg = validatePayload(payload);
  if (validationMsg) return validationError(validationMsg);

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contact")
      .insert({
        full_name: payload.fullName,
        email: payload.email,
        phone_number: payload.phone,
        city: payload.city || null,
        message: payload.message,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ok: true as const,
      id: String(data.id),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Submission failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
