import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pngPath = path.join(root, "test.png");
const base = process.argv[2] ?? "http://localhost:3000";

if (!fs.existsSync(pngPath)) {
  console.error("Missing test.png in project root");
  process.exit(1);
}

const png = fs.readFileSync(pngPath);
const fd = new FormData();
fd.append("fullName", "Join professional file upload test");
fd.append("phone", "9876543211");
fd.append("email", "join-test@example.com");
fd.append("expertise", JSON.stringify(["Salon at Home"]));
fd.append("preferredAreas", JSON.stringify(["Baneshwor"]));
fd.append("emergencyContact", "9800000000");
fd.append("coverLetter", "Test cover letter");
fd.append("message", "Test message");
fd.append("idProof", new Blob([png], { type: "image/png" }), "id-proof.png");
fd.append("resume", new Blob([png], { type: "image/png" }), "resume.png");

const headers = {};
if (base.includes("ngrok")) {
  headers["ngrok-skip-browser-warning"] = "1";
}

const res = await fetch(`${base.replace(/\/$/, "")}/api/career`, {
  method: "POST",
  headers,
  body: fd,
});
const json = await res.json();
console.log("POST", res.status, JSON.stringify(json, null, 2));

if (!json.ok) process.exit(1);
if (json.warning) {
  console.log("\nFAIL: upload warning —", json.warning);
  process.exit(1);
}

const envPath = path.join(root, ".env.local");
if (!fs.existsSync(envPath)) {
  console.log("\nOK: workforce row created (no .env.local to verify Supabase)");
  process.exit(0);
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL ?? env.SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY ?? env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  console.log("\nOK: submission accepted (Supabase env missing for verification)");
  process.exit(0);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const uin = json.uin ?? Number(json.id);
const { data, error } = await supabase
  .from("workforce")
  .select(
    "uin, profile_status, government_issued_id_url, resume_url, services, working_areas",
  )
  .eq("uin", uin)
  .maybeSingle();

if (error) {
  console.error("\nFAIL: could not read workforce row:", error.message);
  process.exit(1);
}

if (!data) {
  console.error("\nFAIL: workforce row not found for uin", uin);
  process.exit(1);
}

const okStatus = data.profile_status === "Waiting for Verification";
const okId = Boolean(data.government_issued_id_url);
const okResume = Boolean(data.resume_url);

if (okStatus && okId && okResume) {
  console.log("\nPASS: workforce row with attachments and Waiting for Verification");
  console.log("UIN:", data.uin);
  console.log("Services:", data.services);
  console.log("Working areas:", data.working_areas);
  process.exit(0);
}

console.log("\nFAIL: workforce row saved but verification failed");
console.log("Status:", okStatus ? "ok" : data.profile_status);
console.log("ID proof:", okId ? "ok" : "missing");
console.log("Resume:", okResume ? "ok" : "missing");
process.exit(1);
