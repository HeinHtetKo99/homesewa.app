import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase-env";

let cached: SupabaseClient | null = null;

/** Server-only client (service role). Bypasses RLS for form inserts. */
export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const env = getSupabaseEnv();
  if (!env.ok) {
    throw new Error(
      `Missing Supabase env: ${env.missing.join(", ")}`,
    );
  }

  cached = createClient(env.config.url, env.config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return cached;
}
