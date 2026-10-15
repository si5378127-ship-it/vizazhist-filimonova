import { getCliClient } from "sanity/cli";

const published = getCliClient({ apiVersion: "2025-01-01" }).withConfig({
  perspective: "published",
  useCdn: false,
});

const drafts = getCliClient({ apiVersion: "2025-01-01" }).withConfig({
  perspective: "previewDrafts",
  useCdn: false,
});

const projection = `{
  _id,
  _updatedAt,
  heroH1,
  heroSubtitle,
  heroExtra,
  heroPriceLabel,
  heroPrimaryCta,
  heroPrimaryNote,
  heroSecondaryCta,
  heroImage{alt, objectPosition, "file": image.asset->originalFilename, "url": image.asset->url, "w": image.asset->metadata.dimensions.width, "h": image.asset->metadata.dimensions.height},
  portfolioTitle,
  portfolioIntro,
  "portfolioCount": count(portfolioImages),
  portfolioImages[]{alt, objectPosition, size, "file": image.asset->originalFilename},
  servicesTitle,
  featuredServiceName,
  featuredServicePrice,
  featuredServiceNote,
  featuredServiceCta,
  "secondaryCount": count(secondaryServices),
  "compactCount": count(compactServices),
  browsTitle,
  "browsCount": count(browsItems),
  extraServiceName,
  extraServicePrice,
  servicesAfterCta,
  aboutTitle,
  "aboutParagraphs": count(aboutParagraphs),
  "aboutImages": count(aboutImages),
  aboutImages[]{alt, objectPosition, "file": image.asset->originalFilename},
  reviewsTitle,
  "reviewsCount": count(reviewsItems),
  reviewsItems[]{name, rating, source},
  reviewsYandexCta,
  reviewsDikidiNote,
  lessonTitle,
  lessonSubtitle,
  lessonPrice,
  lessonDuration,
  lessonIncludesTitle,
  "lessonIncludes": count(lessonIncludes),
  "lessonHighlights": count(lessonHighlights),
  lessonCta,
  "lessonImages": count(lessonImages),
  lessonImages[]{alt, objectPosition, "file": image.asset->originalFilename},
  additionalTitle,
  additionalText,
  additionalPriceLine,
  "additionalImages": count(additionalImages),
  studioTitle,
  studioAddressLines,
  studioMapCta,
  "studioImages": count(studioImages),
  footerAddress,
  footerEmail,
  footerContactTitle,
  linkDikidi,
  linkYandex,
  linkVkPortfolio,
  linkVkMessage,
  linkInstagram,
  linkTelegram,
  linkMax
}`;

const pub = await published.fetch(`*[_id == "landingContent"][0]${projection}`);
const draft = await drafts.fetch(
  `*[_id in ["landingContent", "drafts.landingContent"]] | order(_updatedAt desc)[0]{_id, _updatedAt, heroH1}`,
);
const draftDoc = await drafts.fetch(
  `*[_id == "drafts.landingContent"][0]{_id, _updatedAt, heroH1}`,
);

console.log(
  JSON.stringify(
    {
      publishedExists: Boolean(pub),
      draftExists: Boolean(draftDoc),
      draftSummary: draftDoc || null,
      published: pub,
    },
    null,
    2,
  ),
);
