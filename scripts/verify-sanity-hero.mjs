import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

const hero = await client.fetch(`*[_id == "landingContent"][0]{
  heroImage{
    alt,
    "filename": image.asset->originalFilename,
    "url": image.asset->url
  },
  "heroAssetExists": count(*[_type=="sanity.imageAsset" && originalFilename == "makeup-hero.jpg"])
}`);

console.log(JSON.stringify(hero, null, 2));
