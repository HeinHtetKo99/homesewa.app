export type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
};

function readEnv(name: string): string | null {
  const raw = process.env[name];
  if (typeof raw !== "string") return null;
  const value = raw.trim().replace(/^['"]|['"]$/g, "");
  return value || null;
}

export function getSupabaseEnv():
  | { ok: true; config: SupabaseConfig }
  | { ok: false; missing: string[] } {
  const url =
    readEnv("NEXT_PUBLIC_SUPABASE_URL") ?? readEnv("SUPABASE_URL");
  const serviceRoleKey =
    readEnv("SUPABASE_SERVICE_ROLE_KEY") ?? readEnv("SUPABASE_SERVICE_KEY");

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length > 0) return { ok: false, missing };
  return { ok: true, config: { url: url!, serviceRoleKey: serviceRoleKey! } };
}

export function formatSupabaseEnvError(missing: string[]): string {
  return (
    `Supabase is not configured. Set ${missing.join(" and ")} in .env.local ` +
    `(Project Settings → API in the Supabase dashboard).`
  );
}
