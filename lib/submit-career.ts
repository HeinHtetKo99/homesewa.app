import { NextResponse } from "next/server";
import { emailValidationError } from "@/lib/form-validation";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  formatSupabaseEnvError,
  getSupabaseEnv,
} from "@/lib/supabase-env";
import { uploadFormFile } from "@/lib/supabase-storage";

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function parseStringArray(raw: FormDataEntryValue | null): string[] {
  if (!raw) return [];
  const text = String(raw).trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((v) => String(v).trim()).filter(Boolean);
    }
  } catch {
    /* single value */
  }
  return [text];
}

export type CareerPayload = {
  fullName: string;
  phone: string;
  email: string;
  positions: string[];
  expertise: string[];
  yearsExperience: string;
  preferredAreas: string[];
  insurancePolicyNumber: string;
  emergencyContact: string;
  coverLetter: string;
  message: string;
  idProof: File | null;
  resume: File | null;
};

export type CareerJsonBody = Partial<CareerPayload>;

async function parseMultipart(request: Request): Promise<CareerPayload | null> {
  const form = await request.formData();
  const idRaw = form.get("idProof");
  const resumeRaw = form.get("resume");

  return {
    fullName: String(form.get("fullName") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    positions: parseStringArray(form.get("positions")),
    expertise: parseStringArray(form.get("expertise")),
    yearsExperience: String(form.get("yearsExperience") ?? "").trim(),
    preferredAreas: parseStringArray(form.get("preferredAreas")),
    insurancePolicyNumber: String(
      form.get("insurancePolicyNumber") ?? "",
    ).trim(),
    emergencyContact: String(form.get("emergencyContact") ?? "").trim(),
    coverLetter: String(form.get("coverLetter") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
    idProof: idRaw instanceof File && idRaw.size > 0 ? idRaw : null,
    resume: resumeRaw instanceof File && resumeRaw.size > 0 ? resumeRaw : null,
  };
}

function validatePayload(payload: CareerPayload): string | null {
  if (!payload.fullName || !payload.phone) {
    return "Please fill in all required fields (marked with *).";
  }
  if (!/^\d{10}$/.test(payload.phone)) {
    return "Enter a valid 10-digit mobile number.";
  }
  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;
  if (payload.emergencyContact && !/^\d{10}$/.test(payload.emergencyContact)) {
    return "Emergency contact must be a 10-digit number.";
  }
  return null;
}

export async function handleCareerSubmission(
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
  let payload: CareerPayload | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      payload = await parseMultipart(request);
    } else {
      return validationError("Career applications must use multipart/form-data.");
    }
  } catch {
    return validationError("Invalid request body");
  }

  if (!payload) return validationError("Invalid request body");

  const validationMsg = validatePayload(payload);
  if (validationMsg) return validationError(validationMsg);

  const warnings: string[] = [];

  let idProofUrl: string | null = null;
  let idProofFilename: string | null = null;
  if (payload.idProof) {
    try {
      idProofUrl = await uploadFormFile("career/id-proof", payload.idProof);
      idProofFilename = payload.idProof.name;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      warnings.push(
        `ID proof could not be uploaded: ${payload.idProof.name}: ${msg}.`,
      );
    }
  }

  let resumeUrl: string | null = null;
  let resumeFilename: string | null = null;
  if (payload.resume) {
    try {
      resumeUrl = await uploadFormFile("career/resume", payload.resume);
      resumeFilename = payload.resume.name;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      warnings.push(
        `Resume could not be uploaded: ${payload.resume.name}: ${msg}.`,
      );
    }
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("career")
      .insert({
        full_name: payload.fullName,
        phone: payload.phone,
        email: payload.email || null,
        positions: payload.positions.length > 0 ? payload.positions : null,
        expertise: payload.expertise.length > 0 ? payload.expertise : null,
        years_experience: payload.yearsExperience || null,
        preferred_areas:
          payload.preferredAreas.length > 0 ? payload.preferredAreas : null,
        insurance_policy_number: payload.insurancePolicyNumber || null,
        emergency_contact: payload.emergencyContact || null,
        cover_letter: payload.coverLetter || null,
        message: payload.message || null,
        id_proof_filename: idProofFilename,
        id_proof_url: idProofUrl,
        resume_filename: resumeFilename,
        resume_url: resumeUrl,
        status: "New",
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
