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

const ID_PROOF_FIELD = "ID Proof";
const RESUME_FIELD = "Resume/CV";

function readCareerTableName(): string {
  const nameRaw = process.env["AIRTABLE_CAREER_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "workForce";
}

function readCareerTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_CAREER_TABLE_ID"];
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

function readCareerTablePath(
  configuredName: string,
  tables: { id: string; name: string }[],
): string {
  const tableId = readCareerTableIdFallback();
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
  const tableIdHint = readCareerTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_CAREER_TABLE_ID to the tbl… id for the workForce table.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}". ` +
    `Ensure AIRTABLE_BASE_ID matches your HomeSewa base.${tableIdHint}`
  );
}

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

async function createCareerRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<{ id: string } | { error: string }> {
  const env = getAirtableEnv();
  if (!env.ok) return { error: formatAirtableEnvError(env.missing) };

  const tableIdFallback = readCareerTableIdFallback();
  if (tableIdFallback) {
    try {
      const id = await createRecordInTable(tableIdFallback, fields);
      return { id };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Failed to create career record",
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
      error: e instanceof Error ? e.message : "Failed to create career record",
    };
  }
}

async function buildAirtableFields(
  payload: CareerPayload,
): Promise<{ fields: Record<string, unknown>; warnings: string[] }> {
  const warnings: string[] = [];
  const fields: Record<string, unknown> = {
    "Full Name": payload.fullName,
    Phone: payload.phone,
  };

  if (payload.email) fields["Email"] = payload.email;
  if (payload.positions.length > 0) {
    fields["Position Applied For"] = payload.positions;
  }
  if (payload.preferredAreas.length > 0) {
    fields["Preferred Working Area"] = payload.preferredAreas;
  }
  if (payload.coverLetter) fields["Cover Letter"] = payload.coverLetter;
  if (payload.message) fields["Message"] = payload.message;
  if (payload.emergencyContact) {
    fields["Emergency Contact Number"] = payload.emergencyContact;
  }

  if (payload.yearsExperience) {
    fields["Years of Experience"] = payload.yearsExperience;
  }

  const insurance = payload.insurancePolicyNumber.replace(/\D/g, "");
  if (insurance) {
    const num = Number(insurance);
    if (!Number.isNaN(num)) fields["Insurance Policy Number"] = num;
  }

  fields["Application Date"] = new Date().toISOString();

  if (payload.expertise.length > 0) {
    const { ids, unmatched } = await resolveServiceRecordIds(payload.expertise);
    if (ids.length > 0) fields["Area of Expertise"] = ids;
    if (unmatched.length > 0) {
      warnings.push(
        `These expertise areas were not found in Services: ${unmatched.join(", ")}.`,
      );
    }
  }

  return { fields, warnings };
}

async function uploadCareerFileViaUrl(
  request: Request,
  recordId: string,
  tablePath: string,
  fieldName: string,
  file: File,
): Promise<void> {
  const [url] = await publishFilesForAirtable([file], request);
  assertStagedAttachmentAvailable(url);
  let existing: Awaited<ReturnType<typeof getRecordAttachments>> = [];
  try {
    existing = await getRecordAttachments(recordId, fieldName, tablePath);
  } catch {
    /* still try URL-only upload */
  }
  await setAttachmentUrls(recordId, fieldName, [url], existing, tablePath);
}

async function uploadCareerFile(
  request: Request,
  recordId: string,
  tablePath: string,
  fieldName: string,
  file: File | null,
): Promise<string | null> {
  if (!file?.size) return null;

  const resolved = await resolveAttachmentField(tablePath, fieldName);
  const fieldKey = resolved?.id ?? resolved?.name ?? fieldName;

  try {
    try {
      await uploadAttachmentToField(recordId, fieldKey, file);
      return null;
    } catch {
      /* fall back to public URL attachment (ngrok / production) */
    }
    await uploadCareerFileViaUrl(request, recordId, tablePath, fieldName, file);
    return null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return `${file.name}: ${msg}`;
  }
}

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
  const env = getAirtableEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatAirtableEnvError(env.missing) },
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

  const { fields, warnings: fieldWarnings } = await buildAirtableFields(payload);
  const configuredName = readCareerTableName();
  const result = await createCareerRecord(configuredName, fields);
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
  const tablePath = readCareerTablePath(configuredName, tables);

  const idFail = await uploadCareerFile(
    request,
    result.id,
    tablePath,
    ID_PROOF_FIELD,
    payload.idProof,
  );
  if (idFail) warnings.push(`ID proof could not be uploaded: ${idFail}.`);
  const resumeFail = await uploadCareerFile(
    request,
    result.id,
    tablePath,
    RESUME_FIELD,
    payload.resume,
  );
  if (resumeFail) warnings.push(`Resume could not be uploaded: ${resumeFail}.`);

  return NextResponse.json({
    ok: true as const,
    id: result.id,
    ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
  });
}
