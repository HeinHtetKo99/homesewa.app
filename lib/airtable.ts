import { BOOKING_PHOTO_FIELD } from "@/lib/book-form-options";
import { formatAirtableEnvError, getAirtableEnv } from "@/lib/airtable-env";

const AIRTABLE_API = "https://api.airtable.com/v0";
const AIRTABLE_CONTENT_API = "https://content.airtable.com/v0";

type AirtableFieldMeta = { id: string; name: string; type: string };
type AirtableTableMeta = {
  id: string;
  name: string;
  fields?: AirtableFieldMeta[];
};

function requireAirtableConfig() {
  const env = getAirtableEnv();
  if (!env.ok) throw new Error(formatAirtableEnvError(env.missing));
  return env.config;
}

function authHeaders(): Record<string, string> {
  const { token } = requireAirtableConfig();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function baseId(): string {
  return requireAirtableConfig().baseId;
}

async function fetchTablesMeta(): Promise<AirtableTableMeta[]> {
  const { token } = requireAirtableConfig();
  const res = await fetch(`${AIRTABLE_API}/meta/bases/${baseId()}/tables`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = (await res.json()) as {
    tables?: AirtableTableMeta[];
    error?: { type: string; message: string };
  };

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        "Airtable base not found (404). Check AIRTABLE_BASE_ID is the app… id from your base URL.",
      );
    }
    if (res.status === 403) {
      throw new Error(
        "Airtable denied access (403). Recreate your token with data.records:read/write and schema.bases:read.",
      );
    }
    throw new Error(data.error?.message ?? `Airtable meta error (${res.status})`);
  }

  return data.tables ?? [];
}

async function fetchTablesMetaFull(): Promise<AirtableTableMeta[]> {
  return fetchTablesMeta();
}

export type AttachmentFieldRef = { id: string; name: string };

let bookingPhotoFieldCache: AttachmentFieldRef | null = null;
const attachmentFieldCache = new Map<string, AttachmentFieldRef>();

function findTableMeta(
  tables: AirtableTableMeta[],
  tableNameOrId: string,
): AirtableTableMeta | undefined {
  return (
    tables.find((t) => t.id === tableNameOrId) ??
    tables.find((t) => t.name === tableNameOrId) ??
    tables.find((t) => t.name.toLowerCase() === tableNameOrId.toLowerCase())
  );
}

/** Resolve an attachment column by display name (id + name for Content API uploads). */
export async function resolveAttachmentField(
  tableNameOrId: string,
  fieldName: string,
): Promise<AttachmentFieldRef | null> {
  const cacheKey = `${tableNameOrId}:${fieldName}`;
  const cached = attachmentFieldCache.get(cacheKey);
  if (cached) return cached;

  const tables = await fetchTablesMetaFull();
  const table = findTableMeta(tables, tableNameOrId);
  if (!table?.fields) return null;

  const field = table.fields.find(
    (f) => f.type === "multipleAttachments" && f.name === fieldName,
  );
  if (!field) return null;

  const ref = { id: field.id, name: field.name };
  attachmentFieldCache.set(cacheKey, ref);
  return ref;
}

/** Resolve the Booking table photo attachment column (id + display name). */
export async function resolveBookingPhotoField(
  tableNameOrId: string,
): Promise<AttachmentFieldRef | null> {
  if (bookingPhotoFieldCache) return bookingPhotoFieldCache;
  const ref = await resolveAttachmentField(tableNameOrId, BOOKING_PHOTO_FIELD);
  if (ref) bookingPhotoFieldCache = ref;
  return ref;
}

export async function listAirtableTableSummaries(): Promise<
  { id: string; name: string }[]
> {
  const tables = await fetchTablesMeta();
  return tables.map((t) => ({ id: t.id, name: t.name }));
}

export async function listRecordsInTable(
  tableNameOrId: string,
  options?: { filterByFormula?: string },
): Promise<{ id: string; fields: Record<string, unknown> }[]> {
  const rows: { id: string; fields: Record<string, unknown> }[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    if (offset) params.set("offset", offset);
    if (options?.filterByFormula) {
      params.set("filterByFormula", options.filterByFormula);
    }

    const res = await fetch(
      `${AIRTABLE_API}/${baseId()}/${encodeURIComponent(tableNameOrId)}?${params}`,
      { headers: { Authorization: authHeaders().Authorization } },
    );

    const data = (await res.json()) as {
      records?: { id: string; fields: Record<string, unknown> }[];
      offset?: string;
      error?: { message: string };
    };

    if (!res.ok) {
      throw new Error(data.error?.message ?? `Airtable error (${res.status})`);
    }

    rows.push(...(data.records ?? []));
    offset = data.offset;
  } while (offset);

  return rows;
}

let serviceNameToIdCache: Map<string, string> | null = null;

/** Resolve service display names → Services table record ids (linked field). */
export async function resolveServiceRecordIds(
  names: string[],
): Promise<{ ids: string[]; unmatched: string[] }> {
  if (!serviceNameToIdCache) {
    const rows = await listRecordsInTable("Services");
    serviceNameToIdCache = new Map();
    for (const row of rows) {
      const name = String(row.fields["Name"] ?? "").trim();
      if (name) serviceNameToIdCache.set(name.toLowerCase(), row.id);
    }
  }

  const ids: string[] = [];
  const unmatched: string[] = [];
  const seen = new Set<string>();

  for (const raw of names) {
    const name = raw.trim();
    if (!name) continue;
    const id = serviceNameToIdCache.get(name.toLowerCase());
    if (id) {
      if (!seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
    } else {
      unmatched.push(name);
    }
  }

  return { ids, unmatched };
}

/** Clear cached Services lookup (e.g. after base config change). */
export function clearServiceRecordCache(): void {
  serviceNameToIdCache = null;
}

export async function createRecordInTable(
  tableNameOrId: string,
  fields: Record<string, unknown>,
): Promise<string> {
  const res = await fetch(
    `${AIRTABLE_API}/${baseId()}/${encodeURIComponent(tableNameOrId)}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    },
  );

  const data = (await res.json()) as {
    records?: { id: string }[];
    error?: { type: string; message: string };
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? `Airtable error (${res.status})`);
  }

  const id = data.records?.[0]?.id;
  if (!id) throw new Error("Airtable did not return a record id");
  return id;
}

const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;

const ATTACHMENT_MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  bmp: "image/bmp",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function inferAttachmentMime(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ATTACHMENT_MIME_BY_EXT[ext] ?? "application/octet-stream";
}

export async function uploadAttachmentToField(
  recordId: string,
  fieldIdOrName: string,
  file: File,
): Promise<void> {
  if (file.size === 0) {
    throw new Error(`${file.name || "File"} is empty (0 bytes)`);
  }
  if (file.size > ATTACHMENT_MAX_BYTES) {
    throw new Error(
      `${file.name} is too large (max ${ATTACHMENT_MAX_BYTES / (1024 * 1024)} MB per file)`,
    );
  }

  const { token } = requireAirtableConfig();
  const bytes = Buffer.from(await file.arrayBuffer());

  const res = await fetch(
    `${AIRTABLE_CONTENT_API}/${baseId()}/${recordId}/${encodeURIComponent(fieldIdOrName)}/uploadAttachment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentType: inferAttachmentMime(file),
        filename: file.name,
        file: bytes.toString("base64"),
      }),
    },
  );

  const data = (await res.json().catch(() => ({}))) as {
    error?: { message?: string } | string;
  };
  if (!res.ok) {
    const msg =
      typeof data.error === "string"
        ? data.error
        : data.error?.message ?? `Airtable attachment upload failed (${res.status})`;
    throw new Error(msg);
  }
}

export type AirtableAttachmentRef = { id?: string; url?: string };

export async function getRecordAttachments(
  recordId: string,
  fieldName: string,
  tableNameOrId: string,
): Promise<AirtableAttachmentRef[]> {
  const res = await fetch(
    `${AIRTABLE_API}/${baseId()}/${encodeURIComponent(tableNameOrId)}/${recordId}`,
    { headers: { Authorization: authHeaders().Authorization } },
  );

  const data = (await res.json()) as {
    fields?: Record<string, Array<{ id?: string; url?: string }> | undefined>;
    error?: { message: string };
  };
  if (!res.ok) {
    throw new Error(
      data.error?.message ?? `Failed to read record (${res.status})`,
    );
  }

  const attachments = data.fields?.[fieldName];
  if (!Array.isArray(attachments)) return [];
  return attachments.filter((a) => a.id || a.url);
}

function attachmentPayload(
  existing: AirtableAttachmentRef[],
  newUrls: string[],
): Array<{ id: string } | { url: string }> {
  const payload: Array<{ id: string } | { url: string }> = [];
  for (const item of existing) {
    if (item.id) payload.push({ id: item.id });
    else if (item.url) payload.push({ url: item.url });
  }
  for (const url of newUrls) {
    payload.push({ url });
  }
  return payload;
}

/** Attach files via publicly reachable URLs (Airtable fetches and stores them). */
export async function setAttachmentUrls(
  recordId: string,
  fieldName: string,
  urls: string[],
  existing: AirtableAttachmentRef[] = [],
  tableNameOrId: string,
): Promise<void> {
  if (urls.length === 0 && existing.length === 0) return;

  const res = await fetch(
    `${AIRTABLE_API}/${baseId()}/${encodeURIComponent(tableNameOrId)}/${recordId}`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        fields: {
          [fieldName]: attachmentPayload(existing, urls),
        },
      }),
    },
  );

  const data = (await res.json()) as { error?: { message: string } };
  if (!res.ok) {
    throw new Error(
      data.error?.message ?? `Attachment update failed (${res.status})`,
    );
  }
}
