import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const DEFAULT_CSV = "C:\\Users\\Woosky\\Downloads\\Dashboard.csv";
const BATCH_SIZE = 100;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const i = line.indexOf("=");
        if (i === -1) return null;
        const key = line.slice(0, i).trim();
        let value = line.slice(i + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [key, value];
      })
      .filter(Boolean),
  );
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
    } else if (ch !== "\r") {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

function cleanText(value) {
  if (value == null) return null;
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "-") return null;
  return trimmed;
}

function parseInteger(value) {
  const text = cleanText(value);
  if (!text) return null;
  const num = Number(text.replace(/[^\d-]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function parseHeadshot(value) {
  const text = cleanText(value);
  if (!text) return { headshot_url: null, headshot_filename: null };

  const match = text.match(/^(.+?)\s+\((https?:\/\/[^)]+)\)$/);
  if (match) {
    return {
      headshot_filename: cleanText(match[1]),
      headshot_url: cleanText(match[2]),
    };
  }

  return { headshot_filename: text, headshot_url: null };
}

function parseWhatsApp(value) {
  const text = cleanText(value);
  if (!text) return null;
  const lower = text.toLowerCase();
  if (lower === "yes" || lower === "true" || lower === "1") return true;
  if (lower === "no" || lower === "false" || lower === "0") return false;
  return null;
}

function parseDate(value) {
  const text = cleanText(value);
  if (!text) return null;

  const direct = new Date(text);
  if (!Number.isNaN(direct.getTime())) return direct.toISOString();

  const slashMatch = text.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?)?$/i,
  );
  if (slashMatch) {
    let [, month, day, year, hour = "0", minute = "0", second = "0", ampm] =
      slashMatch;
    let h = Number(hour);
    if (ampm) {
      const lower = ampm.toLowerCase();
      if (lower === "pm" && h < 12) h += 12;
      if (lower === "am" && h === 12) h = 0;
    }
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      h,
      Number(minute),
      Number(second),
    );
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }

  return null;
}

function parseDateOnly(value) {
  const iso = parseDate(value);
  if (!iso) return null;
  return iso.slice(0, 10);
}

function mapRow(record) {
  const headshot = parseHeadshot(record.Headshot);

  return {
    legacy_id: parseInteger(record.ID),
    uin: parseInteger(record.UIN),
    first_name: cleanText(record["First Name"]),
    middle_name: cleanText(record["Middle Name"]),
    last_name: cleanText(record["Last Name"]),
    headshot_url: headshot.headshot_url,
    headshot_filename: headshot.headshot_filename,
    phone: cleanText(record.Phone),
    profession: cleanText(record.Profession),
    city: cleanText(record.City),
    area: cleanText(record.Area),
    created_by: cleanText(record["Created By"]),
    created_date: parseDate(record["Created Date"]),
    issues: cleanText(record.Issues),
    gender: cleanText(record.Gender),
    dob: cleanText(record.D0B),
    bio: cleanText(record.Bio),
    updated_at: parseDate(record.Updated),
    whatsapp_available: parseWhatsApp(record["WhatsApp Ac"]),
    ward_number: cleanText(record["Ward #"]),
    valid_till: parseDate(record["Valid Till"]),
    date_of_birth: parseDateOnly(record["Date of Birth"]),
    blood_group: cleanText(record["Blood Group"]),
    profile_status: cleanText(record["Profile Status"]),
    police_report: cleanText(record["Police Report"]),
    training_certificate: cleanText(record["Training Certificate"]),
    payment_qr: cleanText(record["Payment QR"]),
    referred_by: cleanText(record["Referred By"]),
    government_issued_id: cleanText(record["Government issued ID"]),
    area_of_expertise: cleanText(record["Area of Expertise"]),
    working_area: cleanText(record["Working Area"]),
  };
}

function recordsFromCsv(csvPath) {
  const raw = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
  const table = parseCsv(raw);
  if (table.length < 2) {
    throw new Error(`CSV at ${csvPath} has no data rows`);
  }

  const headers = table[0].map((header) => header.replace(/^\uFEFF/, "").trim());
  const records = [];

  for (const row of table.slice(1)) {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    const mapped = mapRow(record);
    if (!mapped.legacy_id) {
      console.warn("Skipping row without legacy_id:", record);
      continue;
    }
    records.push(mapped);
  }

  return records;
}

function readSupabaseConfig(env) {
  const url = env.SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    env.SUPABASE_SERVICE_ROLE_KEY ??
    env.SUPABASE_SECRET_KEY ??
    env.SUPABASE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase credentials. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local",
    );
  }

  return { url, key };
}

async function upsertBatches(supabase, records) {
  let inserted = 0;
  const errors = [];

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("users")
      .upsert(batch, { onConflict: "legacy_id" });

    if (error) {
      errors.push({ batch: i / BATCH_SIZE + 1, message: error.message });
    } else {
      inserted += batch.length;
    }
  }

  return { inserted, errors };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const csvArg = args.find((arg) => !arg.startsWith("--"));
  const csvPath = path.resolve(csvArg ?? DEFAULT_CSV);

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV not found: ${csvPath}`);
    process.exit(1);
  }

  const env = {
    ...loadEnvFile(path.join(root, ".env")),
    ...loadEnvFile(path.join(root, ".env.local")),
  };

  const records = recordsFromCsv(csvPath);
  const withHeadshots = records.filter((row) => row.headshot_url).length;
  const professions = new Set(records.map((row) => row.profession).filter(Boolean));

  console.log(`CSV: ${csvPath}`);
  console.log(`Rows parsed: ${records.length}`);
  console.log(`Rows with headshot URLs: ${withHeadshots}`);
  console.log(`Professions: ${[...professions].sort().join(", ")}`);

  if (dryRun) {
    console.log("\nDry run sample (first 2 rows):");
    console.log(JSON.stringify(records.slice(0, 2), null, 2));
    console.log("\nDry run complete. No data was sent to Supabase.");
    return;
  }

  const { url, key } = readSupabaseConfig(env);
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { count, error: countError } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (countError) {
    throw new Error(
      `Could not reach public.users table. Run supabase/migrations/001_create_users_table.sql in the Supabase SQL editor first.\n${countError.message}`,
    );
  }

  console.log(`Existing users in Supabase: ${count ?? 0}`);

  const { inserted, errors } = await upsertBatches(supabase, records);

  if (errors.length > 0) {
    console.error("\nMigration finished with errors:");
    for (const item of errors) {
      console.error(`  Batch ${item.batch}: ${item.message}`);
    }
    process.exit(1);
  }

  const { count: finalCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  console.log(`\nMigration complete. Upserted ${inserted} rows.`);
  console.log(`Total users in Supabase: ${finalCount ?? inserted}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
