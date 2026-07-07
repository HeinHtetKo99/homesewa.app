import { NextResponse } from "next/server";
import { bookingScheduleValidationError } from "@/lib/booking-datetime";
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

export type BookingPayload = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  area: string;
  street: string;
  zip: string;
  landmark: string;
  propertyType: string;
  services: string[];
  startDate: string;
  deadlineDate: string;
  deadlineTime: string;
  shift: string;
  budget: string;
  priority: string;
  workDescription: string;
  referralSource: string;
  photos: File[];
};

export type BookingJsonBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  area?: string;
  street?: string;
  zip?: string;
  landmark?: string;
  propertyType?: string;
  services?: unknown;
  startDate?: string;
  deadlineDate?: string;
  deadlineTime?: string;
  shift?: string;
  budget?: string;
  priority?: string;
  workDescription?: string;
  referralSource?: string;
};

function parseServices(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v ?? "").trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((v) => String(v ?? "").trim()).filter(Boolean);
      }
    } catch {
      return trimmed
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function parseZip(zip: string): number | null {
  const digits = zip.replace(/\D/g, "");
  if (!digits) return null;
  const num = Number(digits);
  return Number.isFinite(num) ? num : null;
}

async function parseMultipart(request: Request): Promise<BookingPayload | null> {
  const form = await request.formData();
  const photos = form
    .getAll("photos")
    .filter((v): v is File => v instanceof File && v.size > 0);

  return {
    fullName: String(form.get("fullName") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    city: String(form.get("city") ?? "Kathmandu").trim() || "Kathmandu",
    area: String(form.get("area") ?? "").trim(),
    street: String(form.get("street") ?? "").trim(),
    zip: String(form.get("zip") ?? "").trim(),
    landmark: String(form.get("landmark") ?? "").trim(),
    propertyType: String(form.get("propertyType") ?? "").trim(),
    services: parseServices(form.get("services")),
    startDate: String(form.get("startDate") ?? "").trim(),
    deadlineDate: String(form.get("deadlineDate") ?? "").trim(),
    deadlineTime: String(form.get("deadlineTime") ?? "").trim(),
    shift: String(form.get("shift") ?? "").trim(),
    budget: String(form.get("budget") ?? "").trim(),
    priority: String(form.get("priority") ?? "").trim(),
    workDescription: String(form.get("workDescription") ?? "").trim(),
    referralSource: String(form.get("referralSource") ?? "").trim(),
    photos,
  };
}

function parseJsonBody(raw: BookingJsonBody): BookingPayload {
  return {
    fullName: String(raw.fullName ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    phone: String(raw.phone ?? "").trim(),
    city: String(raw.city ?? "Kathmandu").trim() || "Kathmandu",
    area: String(raw.area ?? "").trim(),
    street: String(raw.street ?? "").trim(),
    zip: String(raw.zip ?? "").trim(),
    landmark: String(raw.landmark ?? "").trim(),
    propertyType: String(raw.propertyType ?? "").trim(),
    services: parseServices(raw.services),
    startDate: String(raw.startDate ?? "").trim(),
    deadlineDate: String(raw.deadlineDate ?? "").trim(),
    deadlineTime: String(raw.deadlineTime ?? "").trim(),
    shift: String(raw.shift ?? "").trim(),
    budget: String(raw.budget ?? "").trim(),
    priority: String(raw.priority ?? "").trim(),
    workDescription: String(raw.workDescription ?? "").trim(),
    referralSource: String(raw.referralSource ?? "").trim(),
    photos: [],
  };
}

function validatePayload(payload: BookingPayload): string | null {
  if (
    !payload.fullName ||
    !payload.phone ||
    !payload.area ||
    !payload.propertyType ||
    payload.services.length === 0 ||
    !payload.startDate ||
    !payload.shift ||
    !payload.budget ||
    !payload.priority
  ) {
    return "Please fill in all required fields.";
  }

  if (!/^\d{10}$/.test(payload.phone)) {
    return "Enter a valid 10-digit phone number.";
  }

  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;

  const scheduleErr = bookingScheduleValidationError({
    startDate: payload.startDate,
    deadlineDate: payload.deadlineDate,
    deadlineTime: payload.deadlineTime,
    shift: payload.shift,
  });
  if (scheduleErr) return scheduleErr;

  if (!payload.services.every((title) => isWebsiteServiceTitle(title))) {
    return "Please select valid services from the services page.";
  }

  return null;
}

export async function handleBookingSubmission(
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
  let payload: BookingPayload | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      payload = await parseMultipart(request);
    } else {
      const raw = (await request.json()) as BookingJsonBody;
      payload = parseJsonBody(raw);
    }
  } catch {
    return validationError("Invalid request body");
  }

  if (!payload) return validationError("Invalid request body");

  const validationMsg = validatePayload(payload);
  if (validationMsg) return validationError(validationMsg);

  const warnings: string[] = [];
  let photoUrls: string[] = [];
  if (payload.photos.length > 0) {
    const uploaded = await uploadFormFiles("bookings", payload.photos);
    photoUrls = uploaded.urls;
    if (uploaded.failures.length > 0) {
      warnings.push(
        `Booking photos could not be uploaded: ${uploaded.failures.join(", ")}.`,
      );
    }
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("booking")
      .insert({
        full_name: payload.fullName,
        phone: payload.phone,
        email: payload.email || null,
        city: payload.city,
        area: payload.area,
        street: payload.street || null,
        zip: parseZip(payload.zip),
        nearest_landmark: payload.landmark || null,
        services: payload.services,
        select_shift: payload.shift,
        work_description: payload.workDescription || null,
        priority: payload.priority,
        budget: payload.budget,
        property_type: payload.propertyType || null,
        how_did_you_know_about_us: payload.referralSource || null,
        add_photos:
          photoUrls.length > 0 ? JSON.stringify(photoUrls) : null,
        starting_date: payload.startDate || null,
        deadline: payload.deadlineDate || null,
        status: "New / Open",
      })
      .select("booking_id")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      ok: true as const,
      id: String(data.booking_id),
      ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Submission failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
