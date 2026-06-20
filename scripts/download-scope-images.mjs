/**
 * Builds scope images from scripts/scope-images.json
 * - "local": copies from public/ (RocketSingh service images — guaranteed match)
 * - "pexels": downloads topic-specific stock photo
 *
 * Run: node scripts/download-scope-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "../public");
const OUTPUT_BASE = path.join(PUBLIC_DIR, "services/scope");
const CONFIG_PATH = path.join(__dirname, "scope-images.json");

const SCOPE_IMAGES = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

function pexelsUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=480&fit=crop`;
}

async function fetchBuffer(url) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function resolveImage(source) {
  if (source.local) {
    const localPath = path.join(PUBLIC_DIR, source.local);
    if (!fs.existsSync(localPath)) {
      throw new Error(`Missing local file: ${source.local}`);
    }
    return fs.readFileSync(localPath);
  }
  if (source.pexels) {
    return fetchBuffer(pexelsUrl(source.pexels));
  }
  throw new Error("Image source must have 'local' or 'pexels'");
}

function removeScopeFolder() {
  if (fs.existsSync(OUTPUT_BASE)) {
    fs.rmSync(OUTPUT_BASE, { recursive: true, force: true });
    console.log("Removed old scope images\n");
  }
}

async function main() {
  const onlySlugs = process.argv.slice(2);
  const wipeAll = onlySlugs.length === 0;
  if (wipeAll) removeScopeFolder();

  let ok = 0;
  let failed = 0;

  for (const [slug, files] of Object.entries(SCOPE_IMAGES)) {
    if (onlySlugs.length > 0 && !onlySlugs.includes(slug)) continue;

    const dir = path.join(OUTPUT_BASE, slug);
    fs.mkdirSync(dir, { recursive: true });

    for (const [filename, source] of Object.entries(files)) {
      const dest = path.join(dir, filename);
      const label = source.local ? `local:${source.local}` : `pexels:${source.pexels}`;
      try {
        const buffer = await resolveImage(source);
        fs.writeFileSync(dest, buffer);
        ok++;
        console.log(`OK  ${slug}/${filename} (${source.topic}) [${label}]`);
      } catch (err) {
        failed++;
        console.error(`FAIL ${slug}/${filename}: ${err.message}`);
      }
    }
  }

  console.log(`\nDone: ${ok} saved, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
