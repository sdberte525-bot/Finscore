// Downloads the campaign photos and video posters listed in media.json and writes
// two WebP sizes of each into theme/assets (media-<key>-sm.webp, media-<key>-lg.webp),
// so every image on the storefront is served from Shopify's CDN.
// Run once before `npm run build` (needs internet access to the source URLs).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const assets = path.join(root, "../theme/assets");
const { images } = JSON.parse(await readFile(path.join(root, "media.json"), "utf8"));
const SIZES = { sm: 800, lg: 1800 };

await mkdir(assets, { recursive: true });
const force = process.argv.includes("--force");

const failed = [];
for (const img of images) {
  const out = (s) => path.join(assets, `media-${img.key}-${s}.webp`);
  if (!force && existsSync(out("sm")) && existsSync(out("lg"))) continue;
  let input;
  try {
    if (img.src.startsWith("http")) {
      const res = await fetch(img.src);
      if (!res.ok) throw new Error(`${res.status}`);
      input = Buffer.from(await res.arrayBuffer());
    } else {
      input = await readFile(path.join(root, "..", img.src));
    }
  } catch (err) {
    failed.push(`${img.key} (${err.message || err})`);
    continue;
  }
  for (const [name, width] of Object.entries(SIZES)) {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: name === "sm" ? 82 : 86, effort: 6, smartSubsample: true })
      .toFile(out(name));
  }
  console.log("media", img.key);
}
if (failed.length) {
  console.error(`Could not fetch ${failed.length} image(s):\n  ${failed.join("\n  ")}`);
  process.exitCode = 1;
}
