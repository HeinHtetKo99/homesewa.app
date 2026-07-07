import { NextResponse } from "next/server";
import { MAX_JOIN_EXPERTISE_SELECTIONS } from "@/app/data/servicesCatalog";
import { isWebsiteServiceTitle } from "@/lib/website-services";
import { emailValidationError } from "@/lib/form-validation";
import { splitFullName } from "@/lib/split-full-name";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  formatSupabaseEnvError,
  getSupabaseEnv,
} from "@/lib/supabase-env";
import { uploadFormFile } from "@/lib/supabase-storage";
import { WORKFORCE_STATUS } from "@/lib/workforce-status";

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

export type JoinProfessionalPayload = {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  expertise: string[];
  yearsExperience: string;
  preferredCity: string;
  preferredAreas: string[];
  insurancePolicyNumber: string;
  emergencyContact: string;
  referralPhone: string;
  coverLetter: string;
  message: string;
  idProof: File | null;
  headshot: File | null;
  resume: File | null;
};

/** @deprecated Use JoinProfessionalPayload */
export type CareerPayload = JoinProfessionalPayload;

async function parseMultipart(
  request: Request,
): Promise<JoinProfessionalPayload | null> {
  const form = await request.formData();
  const idRaw = form.get("idProof");
  const headshotRaw = form.get("headshot");
  const resumeRaw = form.get("resume");

  return {
    fullName: String(form.get("fullName") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    gender: String(form.get("gender") ?? "").trim(),
    expertise: parseStringArray(form.get("expertise")),
    yearsExperience: String(form.get("yearsExperience") ?? "").trim(),
    preferredCity: String(form.get("preferredCity") ?? "").trim(),
    preferredAreas: parseStringArray(form.get("preferredAreas")),
    insurancePolicyNumber: String(
      form.get("insurancePolicyNumber") ?? "",
    ).trim(),
    emergencyContact: String(form.get("emergencyContact") ?? "").trim(),
    referralPhone: String(form.get("referralPhone") ?? "").trim(),
    coverLetter: String(form.get("coverLetter") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
    idProof: idRaw instanceof File && idRaw.size > 0 ? idRaw : null,
    headshot:
      headshotRaw instanceof File && headshotRaw.size > 0 ? headshotRaw : null,
    resume: resumeRaw instanceof File && resumeRaw.size > 0 ? resumeRaw : null,
  };
}

function validatePayload(payload: JoinProfessionalPayload): string | null {
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
  if (payload.referralPhone && !/^\d{10}$/.test(payload.referralPhone)) {
    return "Referral phone must be a 10-digit number.";
  }
  if (payload.expertise.length === 0) {
    return "Please select at least one area of expertise.";
  }
  if (payload.expertise.length > MAX_JOIN_EXPERTISE_SELECTIONS) {
    return `Please select at most ${MAX_JOIN_EXPERTISE_SELECTIONS} areas of expertise.`;
  }
  if (!payload.expertise.every((title) => isWebsiteServiceTitle(title))) {
    return "Please select valid services from the services page.";
  }
  return null;
}

export async function handleJoinProfessionalSubmission(
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
  let payload: JoinProfessionalPayload | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      payload = await parseMultipart(request);
    } else {
      return validationError(
        "Join as a Professional must use multipart/form-data.",
      );
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
      idProofUrl = await uploadFormFile("join/id-proof", payload.idProof);
      idProofFilename = payload.idProof.name;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      warnings.push(
        `ID proof could not be uploaded: ${payload.idProof.name}: ${msg}.`,
      );
    }
  }

  let headshotUrl: string | null = null;
  if (payload.headshot) {
    try {
      headshotUrl = await uploadFormFile("join/headshot", payload.headshot);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      warnings.push(
        `Headshot could not be uploaded: ${payload.headshot.name}: ${msg}.`,
      );
    }
  }

  let resumeUrl: string | null = null;
  let resumeFilename: string | null = null;
  if (payload.resume) {
    try {
      resumeUrl = await uploadFormFile("join/resume", payload.resume);
      resumeFilename = payload.resume.name;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      warnings.push(
        `Resume could not be uploaded: ${payload.resume.name}: ${msg}.`,
      );
    }
  }

  const { firstName, middleName, lastName } = splitFullName(payload.fullName);
  const expertise = [...new Set(payload.expertise.map((s) => s.trim()).filter(Boolean))];
  const now = new Date().toISOString();

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("workforce")
      .insert({
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        headshot_url: headshotUrl,
        phone: payload.phone,
        email: payload.email || null,
        gender: payload.gender || null,
        expertise,
        services: expertise,
        years_experience: payload.yearsExperience || null,
        preferred_city: payload.preferredCity || null,
        working_areas:
          payload.preferredAreas.length > 0 ? payload.preferredAreas : [],
        insurance_policy_number: payload.insurancePolicyNumber || null,
        emergency_contact: payload.emergencyContact || null,
        referral_phone: payload.referralPhone || null,
        cover_letter: payload.coverLetter || null,
        issues: payload.message || null,
        government_issued_id_filename: idProofFilename,
        government_issued_id_url: idProofUrl,
        resume_filename: resumeFilename,
        resume_url: resumeUrl,
        profile_status: WORKFORCE_STATUS.waiting,
        created_date: now,
        submitted_at: now,
      })
      .select("uin")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ok: true as const,
      uin: data.uin,
      id: String(data.uin),
      ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Submission failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

/** @deprecated Use handleJoinProfessionalSubmission */
export const handleCareerSubmission = handleJoinProfessionalSubmission;
