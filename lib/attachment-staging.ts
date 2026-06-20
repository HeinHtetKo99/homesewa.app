const TTL_MS = 10 * 60 * 1000;
const MAX_BYTES = 5 * 1024 * 1024;

type StagedFile = {
  bytes: Buffer;
  contentType: string;
  filename: string;
  expiresAt: number;
};

/** Shared across warm serverless invocations (same pattern as nepalmotor in-memory staging). */
const cache: Map<string, StagedFile> = (() => {
  const g = globalThis as typeof globalThis & {
    __HomeSewaAttachmentCache?: Map<string, StagedFile>;
  };
  if (!g.__HomeSewaAttachmentCache) {
    g.__HomeSewaAttachmentCache = new Map();
  }
  return g.__HomeSewaAttachmentCache;
})();

function pruneExpired() {
  const now = Date.now();
  for (const [id, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(id);
  }
}

function releaseStagedFile(id: string) {
  cache.delete(id);
}

function scheduleRelease(id: string, delayMs = 120_000) {
  setTimeout(() => releaseStagedFile(id), delayMs);
}

export function stageFile(
  bytes: Buffer,
  contentType: string,
  filename: string,
): string {
  pruneExpired();
  const id = crypto.randomUUID();
  cache.set(id, {
    bytes,
    contentType,
    filename,
    expiresAt: Date.now() + TTL_MS,
  });
  return id;
}

export function getStagedFile(id: string): StagedFile | undefined {
  const entry = cache.get(id);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(id);
    return undefined;
  }
  return entry;
}

function stagedAttachmentIdFromUrl(publicUrl: string): string | null {
  try {
    const match = new URL(publicUrl).pathname.match(
      /\/api\/attachments\/([^/]+)$/,
    );
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

/** Confirms the in-memory staging cache still holds the file (no HTTP self-fetch). */
export function assertStagedAttachmentAvailable(publicUrl: string): void {
  const id = stagedAttachmentIdFromUrl(publicUrl);
  if (!id || !getStagedFile(id)) {
    throw new Error(
      "Staged photo is missing or expired. Submit again. On localhost, set NEXT_PUBLIC_SITE_URL to a public URL (e.g. ngrok) so Airtable can download photos.",
    );
  }
}

function mimeTypeForFile(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
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
  return map[ext ?? ""] ?? "application/octet-stream";
}

function assertFileSize(file: File): void {
  if (file.size > MAX_BYTES) {
    throw new Error(
      `${file.name} is too large (max ${MAX_BYTES / (1024 * 1024)} MB per file)`,
    );
  }
}

function getPublicOrigin(request: Request): string {
  const fromEnv = process.env["NEXT_PUBLIC_SITE_URL"]?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercelUrl = process.env["VERCEL_URL"];
  if (vercelUrl) return `https://${vercelUrl}`;

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  if (host && !host.includes("localhost") && !host.startsWith("127.0.0.1")) {
    return `${proto}://${host}`;
  }
  return new URL(request.url).origin;
}

function isPublicOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return hostname !== "localhost" && hostname !== "127.0.0.1";
  } catch {
    return false;
  }
}

function canSelfHostAttachments(request: Request): boolean {
  if (process.env["VERCEL_URL"]) return true;

  const host = new URL(request.url).hostname;
  if (host === "localhost" || host === "127.0.0.1") return true;

  if (isPublicOrigin(new URL(request.url).origin)) return true;

  const configuredOrigin = process.env["NEXT_PUBLIC_SITE_URL"]?.replace(
    /\/$/,
    "",
  );
  if (configuredOrigin && isPublicOrigin(configuredOrigin)) return true;

  return false;
}

export async function publishFilesForAirtable(
  files: File[],
  request: Request,
): Promise<string[]> {
  if (!canSelfHostAttachments(request)) {
    throw new Error(
      "Photo uploads on localhost need a public URL. Run `npx ngrok http 3000`, " +
        "add NEXT_PUBLIC_SITE_URL=<that-url> to .env.local, restart `npm run dev`, " +
        "then submit again. On the live site this works automatically.",
    );
  }

  const origin = getPublicOrigin(request);
  const urls: string[] = [];

  for (const file of files) {
    assertFileSize(file);
    const bytes = Buffer.from(await file.arrayBuffer());
    const id = stageFile(bytes, mimeTypeForFile(file), file.name);
    scheduleRelease(id);
    urls.push(`${origin}/api/attachments/${id}`);
  }

  return urls;
}
