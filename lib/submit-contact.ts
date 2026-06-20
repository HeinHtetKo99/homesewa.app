import { NextResponse } from "next/server";
import {
  createRecordInTable,
  listAirtableTableSummaries,
} from "@/lib/airtable";
import { formatAirtableEnvError, getAirtableEnv } from "@/lib/airtable-env";
import { emailValidationError } from "@/lib/form-validation";

function readContactTableName(): string {
  const nameRaw = process.env["AIRTABLE_CONTACT_TABLE_NAME"];
  if (typeof nameRaw === "string") {
    const v = nameRaw.trim().replace(/^['"]|['"]$/g, "");
    if (v) return v;
  }
  return "Contact";
}

function readContactTableIdFallback(): string | null {
  const raw = process.env["AIRTABLE_CONTACT_TABLE_ID"];
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
  const tableIdHint = readContactTableIdFallback()
    ? ""
    : ` Or set AIRTABLE_CONTACT_TABLE_ID to the tbl… id for the Contact table.`;
  return (
    `Tables visible to the API for base ${configuredBaseId}: ${list}. ` +
    `Could not use "${configuredName}". ` +
    `Ensure AIRTABLE_BASE_ID matches your RocketSingh base.${tableIdHint}`
  );
}

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

function buildAirtableFields(
  payload: ContactPayload,
): Record<string, unknown> {
  const fields: Record<string, unknown> = {
    "Full name": payload.fullName,
    Message: payload.message,
  };

  if (payload.email) fields["Email"] = payload.email;
  if (payload.phone) fields["Phone number"] = payload.phone;
  if (payload.city) fields["City"] = payload.city;

  return fields;
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

async function createContactRecord(
  configuredName: string,
  fields: Record<string, unknown>,
): Promise<{ ok: true; id: string } | { error: string }> {
  const env = getAirtableEnv();
  const configuredBaseId = env.ok ? env.config.baseId : "";

  const tableId = readContactTableIdFallback();
  if (tableId) {
    const r = await tryCreate(tableId, fields);
    if ("ok" in r) return r;
  }

  try {
    const id = await createRecordInTable(configuredName, fields);
    return { ok: true, id };
  } catch {
    /* try resolve by name */
  }

  let tables: { id: string; name: string }[] = [];
  try {
    tables = await listAirtableTableSummaries();
  } catch (metaErr) {
    const metaMsg =
      metaErr instanceof Error ? metaErr.message : String(metaErr);
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

  const byName = await tryCreate(configuredName, fields);
  if ("ok" in byName) return byName;

  return {
    error: `${byName.error} ${wrongBaseHint(tables, configuredName, configuredBaseId)}`,
  };
}

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

  const emailErr = emailValidationError(payload.email);
  if (emailErr) return emailErr;

  if (payload.phone && !/^\d{7,15}$/.test(payload.phone.replace(/\s/g, ""))) {
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
  const env = getAirtableEnv();
  if (!env.ok) {
    return NextResponse.json(
      { error: formatAirtableEnvError(env.missing) },
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

  const fields = buildAirtableFields(payload);
  const configuredName = readContactTableName();
  const result = await createContactRecord(configuredName, fields);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true as const,
    id: result.id,
  });
}
