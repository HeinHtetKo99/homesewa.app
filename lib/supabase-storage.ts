import { getSupabaseAdmin } from "@/lib/supabase";

/** Matches existing booking photo URLs in the project. */
const BUCKET = "uploads";
let bucketReady: Promise<void> | null = null;

async function ensureBucket(): Promise<void> {
  if (bucketReady) return bucketReady;

  bucketReady = (async () => {
    const supabase = getSupabaseAdmin();
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();
    if (listError) {
      throw new Error(`Could not list storage buckets: ${listError.message}`);
    }

    const exists = buckets?.some((b) => b.name === BUCKET);
    if (exists) return;

    const { error: createError } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
    });
    if (createError && !/already exists/i.test(createError.message)) {
      throw new Error(`Could not create storage bucket: ${createError.message}`);
    }
  })();

  try {
    await bucketReady;
  } catch (err) {
    bucketReady = null;
    throw err;
  }
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120) || "file";
}

/** Upload a file to public storage. Returns public URL. */
export async function uploadFormFile(
  folder: string,
  file: File,
): Promise<string> {
  await ensureBucket();
  const supabase = getSupabaseAdmin();
  const bytes = Buffer.from(await file.arrayBuffer());
  const path = `${folder}/${Date.now()}-${safeFilename(file.name)}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadFormFiles(
  folder: string,
  files: File[],
): Promise<{ urls: string[]; failures: string[] }> {
  const urls: string[] = [];
  const failures: string[] = [];

  for (const file of files) {
    if (!file?.size) continue;
    try {
      urls.push(await uploadFormFile(folder, file));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      failures.push(`${file.name}: ${msg}`);
    }
  }

  return { urls, failures };
}
