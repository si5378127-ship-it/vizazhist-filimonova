import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

const doc = await client.fetch(`*[_id == "landingContent"][0]{
  _id,
  _type,
  heroH1,
  heroPriceLabel,
  portfolioTitle,
  "portfolioCount": count(portfolioImages),
  "aboutImages": count(aboutImages),
  "lessonImages": count(lessonImages),
  "additionalImages": count(additionalImages),
  "studioImages": count(studioImages),
  "reviewsCount": count(reviewsItems),
  featuredServiceName,
  featuredServicePrice,
  lessonTitle,
  lessonPrice,
  footerEmail,
  aboutTitle,
  studioTitle
}`);

const assets = await client.fetch(
  `count(*[_type == "sanity.imageAsset"])`,
);
const files = await client.fetch(
  `*[_type == "sanity.imageAsset"]|order(originalFilename asc){originalFilename}`,
);

console.log(
  JSON.stringify(
    {
      doc,
      assets,
      files: files.map((f) => f.originalFilename),
    },
    null,
    2,
  ),
);
