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
fd.append("fullName", "Photo upload test");
fd.append("phone", "9876543220");
fd.append("city", "Kathmandu");
fd.append("area", "Thamel");
fd.append("propertyType", "High-rise apartments");
fd.append("services", JSON.stringify(["Cleaning & Deep Cleaning"]));
fd.append("startDate", "2026-06-15");
fd.append("shift", "Morning");
fd.append("budget", "1000-2000");
fd.append("priority", "Normal");
fd.append("photos", new Blob([png], { type: "image/png" }), "phone.png");

const headers = {};
if (base.includes("ngrok")) {
  headers["ngrok-skip-browser-warning"] = "1";
}

const res = await fetch(`${base.replace(/\/$/, "")}/api/bookings`, {
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
  console.log("\nOK: booking created (no .env.local to verify Airtable)");
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

const recRes = await fetch(
  `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_BOOKINGS_TABLE_ID}/${json.id}`,
  { headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}` } },
);
const rec = await recRes.json();
const photos = rec.fields?.["Add photos/ picture"];

if (Array.isArray(photos) && photos.length > 0) {
  console.log("\nPASS: photo on Airtable Add photos/ picture");
  console.log(photos.map((p) => p.filename ?? p.url).join(", "));
  process.exit(0);
}

if (base.includes("localhost") || base.includes("127.0.0.1")) {
  console.log(
    "\nPARTIAL PASS: API upload succeeded; Airtable cannot fetch localhost URLs.",
  );
  console.log("Test production: node scripts/test-booking-photo.mjs https://homesewa.app");
  process.exit(0);
}

console.log("\nFAIL: booking saved but Add photos/ picture is empty on Airtable");
process.exit(1);
