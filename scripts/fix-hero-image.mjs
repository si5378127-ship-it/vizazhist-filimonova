/**
 * Точечное исправление главного фото без перезаписи всего документа.
 */
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const client = getCliClient({ apiVersion: "2025-01-01" }).withConfig({
  useCdn: false,
});

const absolute = path.join(root, "public", "images", "hero", "makeup-hero.jpg");
if (!existsSync(absolute)) {
  throw new Error(`Файл не найден: ${absolute}`);
}

const existing = await client.fetch(
  `*[_type == "sanity.imageAsset" && originalFilename == "makeup-hero.jpg"][0]{_id}`,
);

let assetRef;
if (existing?._id) {
  console.log("Ассет makeup-hero.jpg уже есть, используем его.");
  assetRef = { _type: "reference", _ref: existing._id };
} else {
  console.log("Загружаю makeup-hero.jpg…");
  const asset = await client.assets.upload("image", createReadStream(absolute), {
    filename: "makeup-hero.jpg",
    contentType: "image/jpeg",
  });
  assetRef = { _type: "reference", _ref: asset._id };
  console.log("Загружено:", asset.originalFilename, asset._id);
}

await client
  .patch("landingContent")
  .set({
    heroImage: {
      _type: "siteImage",
      _key: "hero-makeup-hero-jpg",
      alt: "Портрет с макияжем работы визажиста Елены Филимоновой",
      image: {
        _type: "image",
        asset: assetRef,
      },
    },
  })
  .commit();

const check = await client.fetch(`*[_id == "landingContent"][0]{
  heroImage{
    alt,
    "filename": image.asset->originalFilename,
    "url": image.asset->url
  }
}`);

console.log(JSON.stringify(check, null, 2));
