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
import {
  COMPANY_CERTIFICATES_FIELD,
  COMPANY_PHOTOS_FIELD,
} from "@/lib/partnership-form-options";
import { emailValidationError } from "@/lib/form-validation";

function readPartnershipTableName(): string {
  const nameRaw = process.env["AIRTABLE_PARTNERSHIP_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Partnership";
}

function readPartnershipTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_PARTNERSHIP_TABLE_ID"];
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

function readPartnershipTablePath(
  configuredName: string,
  tables: { id: string; name: string }[],
): string {
  const tableId = readPartnershipTableIdFallback();
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
  const tableIdHint = readPartnershipTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_PARTNERSHIP_TABLE_ID to the tbl… id for the Partnership table.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}". ` +
    `Ensure AIRTABLE_BASE_ID matches appcaAplIBD3UYYKu from your form URL.${tableIdHint}`
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

async function createPartnershipRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<{ id: string } | { error: string }> {
  const env = getAirtableEnv();
  if (!env.ok) return { error: formatAirtableEnvError(env.missing) };

  const tableIdFallback = readPartnershipTableIdFallback();
  if (tableIdFallback) {
    try {
      const id = await createRecordInTable(tableIdFallback, fields);
      return { id };
    } catch (e) {
      return {
        error:
          e instanceof Error ? e.message : "Failed to create partnership record",
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
        e instanceof Error ? e.message : "Failed to create partnership record",
    };
  }
}

async function buildAirtableFields(
  payload: PartnershipPayload,
): Promise<{ fields: Record<string, unknown>; warnings: string[] }> {
  const warnings: string[] = [];
  const fields: Record<string, unknown> = {
    "Full Name": payload.fullName,
    "Phone Number": payload.phone,
  };

  if (payload.organizationName) {
    fields["Name of Organisation"] = payload.organizationName;
  }
  if (payload.email) fields["eMail"] = payload.email;
  if (payload.city) fields["City"] = payload.city;
  if (payload.businessType) fields["Business Type"] = payload.businessType;
  if (payload.partnershipInterests) {
    fields["Partnership Interests"] = payload.partnershipInterests;
  }
  if (payload.hearAbout) {
    fields["How did you hear about us?"] = payload.hearAbout;
  }
  if (payload.message) fields["Message"] = payload.message;

  const employees = payload.numberOfEmployees.replace(/\D/g, "");
  if (employees) {
    const num = Number(employees);
    if (!Number.isNaN(num) && num >= 0) {
      fields["Number of Employees"] = num;
    }
  }

  if (payload.services.length > 0) {
    const { ids, unmatched } = await resolveServiceRecordIds(payload.services);
    if (ids.length > 0) fields["Services Offered"] = ids;
    if (unmatched.length > 0) {
      warnings.push(
        `These services were not found in Services: ${unmatched.join(", ")}.`,
      );
    }
  }

  return { fields, warnings };
}

async function uploadFileViaUrl(
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

async function uploadFiles(
  request: Request,
  recordId: string,
  tablePath: string,
  fieldName: string,
  files: File[],
): Promise<string[]> {
  const resolved = await resolveAttachmentField(tablePath, fieldName);
  const fieldKey = resolved?.id ?? resolved?.name ?? fieldName;
  const failures: string[] = [];

  for (const file of files) {
    try {
      try {
        await uploadAttachmentToField(recordId, fieldKey, file);
        continue;
      } catch {
        /* fall back to public URL attachment */
      }
      await uploadFileViaUrl(request, recordId, tablePath, fieldName, file);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      failures.push(`${file.name}: ${msg}`);
    }
  }

  return failures;
}

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
  return null;
}

export async function handlePartnershipSubmission(
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

  const { fields, warnings: fieldWarnings } =
    await buildAirtableFields(payload);
  const configuredName = readPartnershipTableName();
  const result = await createPartnershipRecord(configuredName, fields);
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
  const tablePath = readPartnershipTablePath(configuredName, tables);

  if (payload.companyPhotos.length > 0) {
    const failures = await uploadFiles(
      request,
      result.id,
      tablePath,
      COMPANY_PHOTOS_FIELD,
      payload.companyPhotos,
    );
    if (failures.length > 0) {
      warnings.push(
        `Company photos could not be uploaded: ${failures.join(", ")}.`,
      );
    }
  }

  if (payload.registrationCerts.length > 0) {
    const failures = await uploadFiles(
      request,
      result.id,
      tablePath,
      COMPANY_CERTIFICATES_FIELD,
      payload.registrationCerts,
    );
    if (failures.length > 0) {
      warnings.push(
        `Registration certificates could not be uploaded: ${failures.join(", ")}.`,
      );
    }
  }

  return NextResponse.json({
    ok: true as const,
    id: result.id,
    ...(warnings.length > 0 ? { warning: warnings.join(" ") } : {}),
  });
}
