import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
fd.append("fullName", "Career file upload test");
fd.append("phone", "9876543211");
fd.append("email", "career-test@example.com");
fd.append("positions", JSON.stringify(["Deep Cleaner"]));
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
  console.log("\nOK: career record created (no .env.local to verify Airtable)");
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

const tableId = env.AIRTABLE_CAREER_TABLE_ID ?? "workForce";
const recRes = await fetch(
  `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${tableId}/${json.id}`,
  { headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}` } },
);
const rec = await recRes.json();
const idProof = rec.fields?.["ID Proof"];
const resume = rec.fields?.["Resume/CV"];

const okId = Array.isArray(idProof) && idProof.length > 0;
const okResume = Array.isArray(resume) && resume.length > 0;

if (okId && okResume) {
  console.log("\nPASS: ID Proof and Resume/CV on Airtable workForce");
  console.log("ID Proof:", idProof.map((p) => p.filename ?? p.url).join(", "));
  console.log("Resume/CV:", resume.map((p) => p.filename ?? p.url).join(", "));
  process.exit(0);
}

console.log("\nFAIL: record saved but attachments missing on Airtable");
console.log("ID Proof:", okId ? "ok" : "empty");
console.log("Resume/CV:", okResume ? "ok" : "empty");
process.exit(1);
