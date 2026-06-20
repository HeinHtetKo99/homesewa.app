import { NextResponse } from "next/server";
import {
  createRecordInTable,
  getRecordAttachments,
  listAirtableTableSummaries,
  resolveAttachmentField,
  resolveServiceRecordIds,
  setAttachmentUrls,
  uploadAttachmentToField,
} from "@/lib/airtable";
import { formatAirtableEnvError, getAirtableEnv } from "@/lib/airtable-env";
import {
  assertStagedAttachmentAvailable,
  publishFilesForAirtable,
} from "@/lib/attachment-staging";
import { emailValidationError } from "@/lib/form-validation";

const HEADSHOT_FIELD = "Headshot";

function readFeedbackTableName(): string {
  const nameRaw = process.env["AIRTABLE_FEEDBACK_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Feedback";
}

function readFeedbackTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_FEEDBACK_TABLE_ID"];
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

function readFeedbackTablePath(
  configuredName: string,
  tables: { id: string; name: string }[],
): string {
  const tableId = readFeedbackTableIdFallback();
  if (tableId) return tableId;
  const resolved = resolveTableIdByName(tables, configuredName);
  if (resolved) return resolved.id;
  return configuredName;
}

function wrongBaseHint(
  tables: { id: string; name: string }[],
  configuredName: string,
  configuredBaseId: string,
): string {
  const list = formatTableList(tables);
  const tableIdHint = readFeedbackTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_FEEDBACK_TABLE_ID to the tbl… id for the Feedback table.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}". ` +
    `Ensure AIRTABLE_BASE_ID matches your HomeSewa base.${tableIdHint}`
  );
}

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

async function createFeedbackRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<{ id: string } | { error: string }> {
  const env = getAirtableEnv();
  if (!env.ok) return { error: formatAirtableEnvError(env.missing) };

  const tableIdFallback = readFeedbackTableIdFallback();
  if (tableIdFallback) {
    try {
      const id = await createRecordInTable(tableIdFallback, fields);
      return { id };
    } catch (e) {
      return {
        error:
          e instanceof Error ? e.message : "Failed to create feedback record",
      };
    }
  }

  try {
    const id = await createRecordInTable(configuredName, fields);
    return { id };
  } catch {
    /* try resolve by name */
  }

  let tables: { id: string; name: string }[];
  try {
    tables = await listAirtableTableSummaries();
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not list Airtable tables",
    };
  }

  const byName = resolveTableIdByName(tables, configuredName);
  if (!byName) {
    return {
      error: wrongBaseHint(tables, configuredName, env.config.baseId),
    };
  }

  try {
    const id = await createRecordInTable(byName.id, fields);
    return { id };
  } catch (e) {
    return {
      error:
        e instanceof Error ? e.message : "Failed to create feedback record",
    };
  }
}

async function buildAirtableFields(
  payload: FeedbackPayload,
): Promise<{ fields: Record<string, unknown>; warnings: string[] }> {
  const warnings: string[] = [];
  const fields: Record<string, unknown> = {
    "First Name": payload.firstName,
    "Middle Name": payload.middleName,
    "Last Name": payload.lastName,
    Country: payload.country,
    Organization: payload.organization,
    Designation: payload.designation,
    Phone: payload.phone,
    Email: payload.email,
    Feedback: payload.message,
  };

  if (payload.service) {
    const { ids, unmatched } = await resolveServiceRecordIds([payload.service]);
    if (ids.length > 0) fields["Service"] = ids;
    if (unmatched.length > 0) {
      warnings.push(
        `Service "${unmatched.join(", ")}" was not found in the Services table.`,
      );
    }
  }

  return { fields, warnings };
}

async function uploadHeadshotViaUrl(
  request: Request,
  recordId: string,
  tablePath: string,
  file: File,
): Promise<void> {
  const [url] = await publishFilesForAirtable([file], request);
  assertStagedAttachmentAvailable(url);
  let existing: Awaited<ReturnType<typeof getRecordAttachments>> = [];
  try {
    existing = await getRecordAttachments(recordId, HEADSHOT_FIELD, tablePath);
  } catch {
    /* still try URL-only upload */
  }
  await setAttachmentUrls(recordId, HEADSHOT_FIELD, [url], existing, tablePath);
}

async function uploadHeadshot(
  request: Request,
  recordId: string,
  tablePath: string,
  file: File | null,
): Promise<string | null> {
  if (!file?.size) return null;

  const resolved = await resolveAttachmentField(tablePath, HEADSHOT_FIELD);
  const fieldKey = resolved?.id ?? resolved?.name ?? HEADSHOT_FIELD;

  try {
    try {
      await uploadAttachmentToField(recordId, fieldKey, file);
      return null;
    } catch {
      /* fall back to public URL attachment (ngrok / production) */
    }
    await uploadHeadshotViaUrl(request, recordId, tablePath, file);
    return null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return `${file.name}: ${msg}`;
  }
}

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

  return null;
}

export async function handleFeedbackSubmission(
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

  const { fields, warnings: fieldWarnings } = await buildAirtableFields(payload);
  const configuredName = readFeedbackTableName();
  const result = await createFeedbackRecord(configuredName, fields);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  const warnings = [...fieldWarnings];
  let tables: { id: string; name: string }[] = [];
  try {
    tables = await listAirtableTableSummaries();
  } catch {
    /* use configured name / table id fallback */
  }
  const tablePath = readFeedbackTablePath(configuredName, tables);

  const headshotFail = await uploadHeadshot(
    request,
    result.id,
    tablePath,
    payload.headshot,
  );
  if (headshotFail) {
    warnings.push(`Headshot could not be uploaded: ${headshotFail}.`);
  }

  return NextResponse.json({
    ok: true as const,
    id: result.id,
    ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
  });
}
