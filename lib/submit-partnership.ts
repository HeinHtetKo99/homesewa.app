import { NextResponse } from "next/server";
import { emailValidationError } from "@/lib/form-validation";
import { isWebsiteServiceTitle } from "@/lib/website-services";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  formatSupabaseEnvError,
  getSupabaseEnv,
} from "@/lib/supabase-env";
import { uploadFormFiles } from "@/lib/supabase-storage";

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

export type PartnershipPayload = {
  fullName: string;
  organizationName: string;
  phone: string;
  email: string;
  city: string;
  numberOfEmployees: string;
  businessType: string;
  services: string[];
  partnershipInterests: string;
  hearAbout: string;
  message: string;
  companyPhotos: File[];
  registrationCerts: File[];
};

async function parseMultipart(
  request: Request,
): Promise<PartnershipPayload | null> {
  const form = await request.formData();
  const companyPhotos = form
    .getAll("companyPhotos")
    .filter((v): v is File => v instanceof File && v.size > 0);
  const registrationCerts = form
    .getAll("registrationCerts")
    .filter((v): v is File => v instanceof File && v.size > 0);

  return {
    fullName: String(form.get("fullName") ?? "").trim(),
    organizationName: String(form.get("organizationName") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    city: String(form.get("city") ?? "").trim(),
    numberOfEmployees: String(form.get("numberOfEmployees") ?? "").trim(),
    businessType: String(form.get("businessType") ?? "").trim(),
    services: parseStringArray(form.get("services")),
    partnershipInterests: String(form.get("partnershipInterests") ?? "").trim(),
    hearAbout: String(form.get("hearAbout") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
    companyPhotos,
    registrationCerts,
  };
}

function validatePayload(payload: PartnershipPayload): string | null {
  if (!payload.fullName || !payload.phone) {
    return "Please fill in all required fields (marked with *).";
  }
  if (!/^\d{10}$/.test(payload.phone)) {
    return "Enter a valid 10-digit mobile number.";
  }
  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;
  if (
    payload.services.length > 0 &&
    !payload.services.every((title) => isWebsiteServiceTitle(title))
  ) {
    return "Please select valid services from the services page.";
  }
  return null;
}

function parseEmployeeCount(value: string): number | null {
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const num = Number(digits);
  return Number.isFinite(num) ? num : null;
}

export async function handlePartnershipSubmission(
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
  let payload: PartnershipPayload | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      payload = await parseMultipart(request);
    } else {
      return validationError(
        "Partnership applications must use multipart/form-data.",
      );
    }
  } catch {
    return validationError("Invalid request body");
  }

  if (!payload) return validationError("Invalid request body");

  const validationMsg = validatePayload(payload);
  if (validationMsg) return validationError(validationMsg);

  const warnings: string[] = [];

  let photoUrls: string[] = [];
  if (payload.companyPhotos.length > 0) {
    const uploaded = await uploadFormFiles(
      "partnership/photos",
      payload.companyPhotos,
    );
    photoUrls = uploaded.urls;
    if (uploaded.failures.length > 0) {
      warnings.push(
        `Company photos could not be uploaded: ${uploaded.failures.join(", ")}.`,
      );
    }
  }

  let certUrls: string[] = [];
  if (payload.registrationCerts.length > 0) {
    const uploaded = await uploadFormFiles(
      "partnership/certs",
      payload.registrationCerts,
    );
    certUrls = uploaded.urls;
    if (uploaded.failures.length > 0) {
      warnings.push(
        `Registration certificates could not be uploaded: ${uploaded.failures.join(", ")}.`,
      );
    }
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("partnership")
      .insert({
        full_name: payload.fullName,
        phone_number: payload.phone,
        email: payload.email || null,
        name_of_organisation: payload.organizationName || null,
        city: payload.city || null,
        number_of_employees: parseEmployeeCount(payload.numberOfEmployees),
        business_type: payload.businessType || null,
        partnership_interests: payload.partnershipInterests || null,
        how_did_you_hear: payload.hearAbout || null,
        message: payload.message || null,
        services: payload.services.length > 0 ? payload.services : null,
        company_photos:
          photoUrls.length > 0 ? JSON.stringify(photoUrls) : null,
        company_reg_certs:
          certUrls.length > 0 ? JSON.stringify(certUrls) : null,
      })
      .select("partner_id")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ok: true as const,
      id: String(data.partner_id),
      ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Submission failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
