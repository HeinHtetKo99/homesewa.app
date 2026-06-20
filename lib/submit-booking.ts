import { NextResponse } from "next/server";
import {
  createRecordInTable,
  getRecordAttachments,
  listAirtableTableSummaries,
  resolveBookingPhotoField,
  resolveServiceRecordIds,
  setAttachmentUrls,
  uploadAttachmentToField,
} from "@/lib/airtable";
import { formatAirtableEnvError, getAirtableEnv } from "@/lib/airtable-env";
import {
  assertStagedAttachmentAvailable,
  publishFilesForAirtable,
} from "@/lib/attachment-staging";
import { BOOKING_PHOTO_FIELD } from "@/lib/book-form-options";
import { bookingScheduleValidationError } from "@/lib/booking-datetime";
import { emailValidationError } from "@/lib/form-validation";

/**
 * HomeSewa base (appcaAplIBD3UYYKu) → **Booking** table (form view: HomeSewa).
 * Field names match the Airtable schema exactly (see Meta API / Booking table).
 * Select Services links to rows in the **Services** table by record id.
 */

const DEFAULT_STATUS = "New / Open";

function readBookingsTableName(): string {
  const nameRaw = process.env["AIRTABLE_BOOKINGS_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Booking";
}

function readBookingsTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_BOOKINGS_TABLE_ID"];
  if (typeof raw !== "string") return null;
  const id = raw.trim().replace(/^['"]|['"]$/g, "");
  return /^tbl[a-zA-Z0-9]+$/i.test(id) ? id : null;
}

function resolveTableIdByName(
  tables: { id: string; name: string }[],
  name: string,
): { id: string } | null {
  const exact = tables.find((t) => t.name === name);
  if (exact) return { id: exact.id };
  const lower = name.toLowerCase();
  const folded = tables.find((t) => t.name.toLowerCase() === lower);
  if (folded) return { id: folded.id };
  return null;
}

function formatTableList(tables: { id: string; name: string }[]): string {
  return tables.map((t) => `"${t.name}"`).join(", ") || "(none)";
}

function wrongBaseHint(
  tables: { id: string; name: string }[],
  configuredName: string,
  configuredBaseId: string,
): string {
  const list = formatTableList(tables);
  const tableIdHint = readBookingsTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_BOOKINGS_TABLE_ID to the tbl… id from the URL when the "${configuredName}" tab is open.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}". ` +
    `Ensure AIRTABLE_BASE_ID matches appcaAplIBD3UYYKu from your form URL.${tableIdHint}`
  );
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

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

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

function buildDeadlineIso(deadlineDate: string, deadlineTime: string): string {
  if (!deadlineDate) return "";
  const time = deadlineTime || "00:00";
  return `${deadlineDate}T${time}:00`;
}

async function buildAirtableFields(
  payload: BookingPayload,
): Promise<{ fields: Record<string, unknown>; warnings: string[] }> {
  const warnings: string[] = [];
  const deadline = buildDeadlineIso(payload.deadlineDate, payload.deadlineTime);

  const { ids: serviceIds, unmatched } = await resolveServiceRecordIds(
    payload.services,
  );
  if (unmatched.length > 0) {
    warnings.push(
      `These services were not found in the Services table: ${unmatched.join(", ")}.`,
    );
  }

  const fields: Record<string, unknown> = {
    "Full name": payload.fullName,
    Phone: payload.phone,
    City: payload.city,
    Area: payload.area,
    Street: payload.street || undefined,
    Zip: payload.zip || undefined,
    "Nearest Landmark": payload.landmark || undefined,
    "Property Type": payload.propertyType,
    "Starting Date": payload.startDate,
    Deadline: deadline || undefined,
    "Select Shift": payload.shift,
    Budget: payload.budget,
    Priority: payload.priority,
    "Work Description": payload.workDescription || undefined,
    "How did you know about us?": payload.referralSource || undefined,
    Status: DEFAULT_STATUS,
  };

  if (payload.email) fields["eMail"] = payload.email;
  if (serviceIds.length > 0) fields["Select Services"] = serviceIds;

  return {
    fields: Object.fromEntries(
      Object.entries(fields).filter(([, v]) => v !== undefined && v !== ""),
    ),
    warnings,
  };
}

async function tryCreate(
  tablePathSegment: string,
  fields: Record<string, unknown>,
): Promise<{ ok: true; id: string } | { error: string }> {
  try {
    const id = await createRecordInTable(tablePathSegment, fields);
    return { ok: true, id };
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Submission failed. Please try again.";
    return { error: message };
  }
}

async function createBookingRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<{ ok: true; id: string } | { error: string }> {
  const env = getAirtableEnv();
  const configuredBaseId = env.ok ? env.config.baseId : "";

  let tables: { id: string; name: string }[] = [];
  try {
    tables = await listAirtableTableSummaries();
  } catch (metaErr) {
    const metaMsg =
      metaErr instanceof Error ? metaErr.message : String(metaErr);
    const tableId = readBookingsTableIdFallback();
    if (tableId) {
      const r = await tryCreate(tableId, fields);
      if ("ok" in r) return r;
    }
    const byName = await tryCreate(configuredName, fields);
    if ("ok" in byName) return byName;
    return {
      error:
        `Could not load Airtable schema (${metaMsg}). ${byName.error} ` +
        "Ensure the token has schema.bases:read and data.records:write.",
    };
  }

  const resolved = resolveTableIdByName(tables, configuredName);
  if (resolved) {
    const r = await tryCreate(resolved.id, fields);
    if ("ok" in r) return r;
    return {
      error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
    };
  }

  const tableId = readBookingsTableIdFallback();
  if (tableId) {
    const r = await tryCreate(tableId, fields);
    if ("ok" in r) return r;
    return {
      error: `${r.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
    };
  }

  const byName = await tryCreate(configuredName, fields);
  if ("ok" in byName) return byName;

  return {
    error: `${byName.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
  };
}

function readBookingsTablePath(
  configuredName: string,
  tables: { id: string; name: string }[],
): string {
  const tableId = readBookingsTableIdFallback();
  if (tableId) return tableId;
  const resolved = resolveTableIdByName(tables, configuredName);
  if (resolved) return resolved.id;
  return configuredName;
}

async function uploadPhotoViaUrl(
  request: Request,
  recordId: string,
  tablePath: string,
  file: File,
): Promise<void> {
  const [url] = await publishFilesForAirtable([file], request);
  assertStagedAttachmentAvailable(url);
  let existing: Awaited<ReturnType<typeof getRecordAttachments>> = [];
  try {
    existing = await getRecordAttachments(
      recordId,
      BOOKING_PHOTO_FIELD,
      tablePath,
    );
  } catch {
    /* still try URL-only upload */
  }
  await setAttachmentUrls(
    recordId,
    BOOKING_PHOTO_FIELD,
    [url],
    existing,
    tablePath,
  );
}

async function uploadPhotos(
  request: Request,
  recordId: string,
  tablePath: string,
  photos: File[],
): Promise<string[]> {
  const photoField = await resolveBookingPhotoField(tablePath);
  const fieldKey = photoField?.id ?? photoField?.name ?? BOOKING_PHOTO_FIELD;
  const failures: string[] = [];

  for (const file of photos) {
    try {
      try {
        await uploadAttachmentToField(recordId, fieldKey, file);
        continue;
      } catch {
        /* fall back to public URL attachment */
      }
      await uploadPhotoViaUrl(request, recordId, tablePath, file);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      failures.push(`${file.name}: ${msg}`);
    }
  }

  return failures;
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

  return null;
}

export async function handleBookingSubmission(
  request: Request,
): Promise<NextResponse> {
  const env = getAirtableEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatAirtableEnvError(env.missing) },
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

  const { fields, warnings: fieldWarnings } = await buildAirtableFields(payload);
  const configuredName = readBookingsTableName();
  const result = await createBookingRecord(configuredName, fields);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  const warnings = [...fieldWarnings];
  if (payload.photos.length > 0) {
    let tables: { id: string; name: string }[] = [];
    try {
      tables = await listAirtableTableSummaries();
    } catch {
      /* use configured name / table id fallback */
    }
    const tablePath = readBookingsTablePath(configuredName, tables);
    const failures = await uploadPhotos(
      request,
      result.id,
      tablePath,
      payload.photos,
    );
    if (failures.length > 0) {
      warnings.push(
        `Booking saved, but these photos could not be uploaded: ${failures.join(", ")}.`,
      );
    }
  }

  return NextResponse.json({
    ok: true as const,
    id: result.id,
    ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
  });
}
