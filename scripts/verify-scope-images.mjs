/**
 * Validates scope-images.json — local files exist, pexels URLs work, 3 unique per service.
 * Run: node scripts/verify-scope-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "../public");
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "scope-images.json"), "utf8"));

function pexelsUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop`;
}

async function main() {
  let issues = 0;

  for (const [slug, files] of Object.entries(CONFIG)) {
    const keys = new Set();

    for (const [filename, source] of Object.entries(files)) {
      const key = source.local ?? `pexels:${source.pexels}`;
      if (keys.has(key)) {
        console.error(`DUPLICATE in ${slug}: ${filename} shares source with another step (${key})`);
        issues++;
      }
      keys.add(key);

      if (source.local) {
        const p = path.join(PUBLIC_DIR, source.local);
        if (!fs.existsSync(p)) {
          console.error(`MISSING local: ${source.local} (${slug}/${filename})`);
          issues++;
        } else {
          console.log(`OK  ${slug}/${filename} — ${source.topic}`);
        }
      } else if (source.pexels) {
        try {
          const r = await fetch(pexelsUrl(source.pexels), { method: "HEAD", redirect: "follow" });
          if (!r.ok) {
            console.error(`FAIL pexels:${source.pexels} (${slug}/${filename}) HTTP ${r.status}`);
            issues++;
          } else {
            console.log(`OK  ${slug}/${filename} — ${source.topic}`);
          }
        } catch {
          console.error(`FAIL pexels:${source.pexels} (${slug}/${filename})`);
          issues++;
        }
      }
    }
  }

  console.log(`\n${issues === 0 ? "All checks passed" : `${issues} issue(s) found`}`);
  if (issues > 0) process.exit(1);
}

main();
