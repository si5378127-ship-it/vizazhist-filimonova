import {
  about as fallbackAbout,
  additional as fallbackAdditional,
  cta,
  externalLinks,
  finalCta as fallbackFinalCta,
  footer as fallbackFooter,
  hero as fallbackHero,
  links as fallbackLinks,
  makeupLesson as fallbackLesson,
  nav,
  portfolio as fallbackPortfolio,
  reviews as fallbackReviews,
  services as fallbackServices,
  site,
  socials as fallbackSocials,
  studio as fallbackStudio,
  type Review,
  type SiteImage,
} from "@/data/siteContent";
import type {
  SanityLandingContent,
  SanityNamedPrice,
  SanitySiteImage,
} from "@/sanity/types";

export type ResolvedSiteContent = {
  source: "sanity" | "siteContent";
  site: typeof site;
  nav: typeof nav;
  cta: typeof cta;
  links: typeof fallbackLinks;
  footer: {
    address: string;
    email: string;
    contactTitle: string;
  };
  hero: {
    h1: string;
    subtitle: string;
    extra: string;
    priceLabel: string;
    primaryCta: string;
    primaryNote: string;
    secondaryCta: string;
    secondaryHref: string;
    image: SiteImage;
  };
  portfolio: {
    id: string;
    title: string;
    intro: string;
    images: Array<SiteImage & { size: "tall" | "portrait" | "square" | "wide" }>;
  };
  services: typeof fallbackServices;
  about: {
    id: string;
    title: string;
    paragraphs: string[];
    images: SiteImage[];
  };
  reviews: {
    id: string;
    title: string;
    items: Review[];
    yandexCta: string;
    dikidiNote: string;
  };
  makeupLesson: {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    duration: string;
    includesTitle: string;
    includes: string[];
    highlights: string[];
    cta: string;
    images: SiteImage[];
  };
  additional: {
    id: string;
    title: string;
    text: string;
    priceLine: string;
    images: SiteImage[];
  };
  studio: {
    id: string;
    title: string;
    addressLines: string[];
    mapCta: string;
    images: SiteImage[];
  };
  socials: typeof fallbackSocials;
  finalCta: typeof fallbackFinalCta;
};

function pickString(
  value: string | null | undefined,
  fallback: string,
): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function pickStringArray(
  value: Array<string | null | undefined> | null | undefined,
  fallback: string[],
): string[] {
  if (!value?.length) return fallback;
  const cleaned = value.map((item) => item?.trim() || "").filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
}

function hasImageUrl(image: SanitySiteImage | undefined): boolean {
  return Boolean(image?.image?.asset?.url);
}

function mapImage(
  image: SanitySiteImage | undefined,
  fallback: SiteImage,
): SiteImage {
  if (!hasImageUrl(image)) {
    return fallback;
  }

  const width =
    image?.image?.asset?.metadata?.dimensions?.width ?? fallback.width;
  const height =
    image?.image?.asset?.metadata?.dimensions?.height ?? fallback.height;

  return {
    src: image!.image!.asset!.url!,
    alt: pickString(image?.alt, fallback.alt),
    width,
    height,
    ready: true,
    objectPosition:
      image?.objectPosition?.trim() || fallback.objectPosition,
  };
}

function mapImageList(
  images: SanitySiteImage[] | null | undefined,
  fallback: SiteImage[],
): SiteImage[] {
  if (!images?.length) return fallback;

  const mapped = images
    .map((image, index) => {
      const fb = fallback[index] ?? fallback[0];
      if (!fb || !hasImageUrl(image)) return null;
      return mapImage(image, fb);
    })
    .filter((item): item is SiteImage => Boolean(item));

  return mapped.length > 0 ? mapped : fallback;
}

function mapPortfolioImages(
  images: SanitySiteImage[] | null | undefined,
): typeof fallbackPortfolio.images {
  if (!images?.length) return fallbackPortfolio.images;

  const mapped = images
    .map((image, index) => {
      const fb = fallbackPortfolio.images[index] ?? fallbackPortfolio.images[0];
      if (!fb || !hasImageUrl(image)) return null;
      const base = mapImage(image, fb);
      const size =
        image?.size === "tall" ||
        image?.size === "portrait" ||
        image?.size === "square" ||
        image?.size === "wide"
          ? image.size
          : fb.size;
      return { ...base, size };
    })
    .filter(
      (
        item,
      ): item is SiteImage & {
        size: "tall" | "portrait" | "square" | "wide";
      } => Boolean(item),
    );

  return mapped.length > 0 ? mapped : fallbackPortfolio.images;
}

function mapNamedPrice(
  item: SanityNamedPrice | undefined,
  fallback: { name: string; price: string; note?: string; notes?: string[] },
) {
  if (!item?.name?.trim() || !item?.price?.trim()) {
    return fallback;
  }

  return {
    name: item.name.trim(),
    price: item.price.trim(),
    note: item.note?.trim() || fallback.note,
    notes: item.notes?.filter(Boolean).length
      ? item.notes.filter((note): note is string => Boolean(note?.trim()))
      : fallback.notes,
  };
}

/**
 * Собирает полный контент лендинга.
 * Пустые разделы Sanity не публикуются — подставляется siteContent.ts.
 */
export function mapLandingContentToSite(
  doc: SanityLandingContent,
): ResolvedSiteContent {
  if (!doc) {
    return {
      source: "siteContent",
      site,
      nav,
      cta,
      links: fallbackLinks,
      footer: fallbackFooter,
      hero: fallbackHero,
      portfolio: fallbackPortfolio,
      services: fallbackServices,
      about: fallbackAbout,
      reviews: fallbackReviews,
      makeupLesson: fallbackLesson,
      additional: fallbackAdditional,
      studio: fallbackStudio,
      socials: fallbackSocials,
      finalCta: fallbackFinalCta,
    };
  }

  const dikidi = pickString(doc.linkDikidi, externalLinks.dikidi);
  const yandex = pickString(doc.linkYandex, externalLinks.yandex);
  const vkPortfolio = pickString(
    doc.linkVkPortfolio,
    externalLinks.vkPortfolio,
  );
  const vkMessage = pickString(doc.linkVkMessage, externalLinks.vkMessage);
  const instagram = pickString(doc.linkInstagram, externalLinks.instagram);
  const telegram = pickString(doc.linkTelegram, externalLinks.telegram);
  const max = pickString(doc.linkMax, externalLinks.max);
  const emailAddress = pickString(
    doc.footerEmail,
    fallbackFooter.email,
  );

  const links = {
    ...fallbackLinks,
    dikidi,
    yandex,
    vkPortfolio,
    vkMessage,
    vk: vkPortfolio,
    instagram,
    telegram,
    max,
    email: `mailto:${emailAddress}`,
    contact: `mailto:${emailAddress}`,
  };

  const secondaryFallback = fallbackServices.secondary;
  const secondaryServices =
    doc.secondaryServices?.length === secondaryFallback.length
      ? doc.secondaryServices.map((item, index) => {
          const fb = secondaryFallback[index];
          const mapped = mapNamedPrice(item, fb);
          if ("notes" in fb && fb.notes) {
            return {
              name: mapped.name,
              price: mapped.price,
              notes: mapped.notes ?? fb.notes,
            };
          }
          return {
            name: mapped.name,
            price: mapped.price,
            note: mapped.note ?? ("note" in fb ? fb.note : undefined),
          };
        })
      : doc.secondaryServices?.length
        ? doc.secondaryServices
            .map((item, index) => {
              const fb = secondaryFallback[index] ?? {
                name: "",
                price: "",
                note: "",
              };
              if (!item?.name?.trim() || !item?.price?.trim()) return null;
              if (item.notes?.length) {
                return {
                  name: item.name.trim(),
                  price: item.price.trim(),
                  notes: item.notes.filter(Boolean) as string[],
                };
              }
              return {
                name: item.name.trim(),
                price: item.price.trim(),
                note: item.note?.trim() || ("note" in fb ? fb.note : ""),
              };
            })
            .filter(Boolean)
        : null;

  const reviewsItems: Review[] =
    doc.reviewsItems?.length
      ? doc.reviewsItems
          .map((item, index): Review | null => {
            if (!item?.name?.trim() || !item?.text?.trim()) return null;
            return {
              id: String(index + 1),
              name: item.name.trim(),
              rating:
                typeof item.rating === "number" && item.rating >= 1
                  ? Math.min(5, Math.round(item.rating))
                  : 5,
              text: item.text.trim(),
              source: pickString(
                item.source,
                fallbackReviews.items[index]?.source || "Отзыв",
              ),
            };
          })
          .filter((item): item is Review => Boolean(item))
      : [];

  return {
    source: "sanity",
    site,
    nav,
    cta,
    links,
    footer: {
      address: pickString(doc.footerAddress, fallbackFooter.address),
      email: emailAddress,
      contactTitle: pickString(
        doc.footerContactTitle,
        fallbackFooter.contactTitle,
      ),
    },
    hero: {
      ...fallbackHero,
      h1: pickString(doc.heroH1, fallbackHero.h1),
      subtitle: pickString(doc.heroSubtitle, fallbackHero.subtitle),
      extra: pickString(doc.heroExtra, fallbackHero.extra),
      priceLabel: pickString(doc.heroPriceLabel, fallbackHero.priceLabel),
      primaryCta: pickString(doc.heroPrimaryCta, fallbackHero.primaryCta),
      primaryNote: pickString(doc.heroPrimaryNote, fallbackHero.primaryNote),
      secondaryCta: pickString(
        doc.heroSecondaryCta,
        fallbackHero.secondaryCta,
      ),
      image: mapImage(doc.heroImage, fallbackHero.image),
    },
    portfolio: {
      ...fallbackPortfolio,
      title: pickString(doc.portfolioTitle, fallbackPortfolio.title),
      intro: pickString(doc.portfolioIntro, fallbackPortfolio.intro),
      images: mapPortfolioImages(doc.portfolioImages),
    },
    services: {
      ...fallbackServices,
      title: pickString(doc.servicesTitle, fallbackServices.title),
      featured: {
        name: pickString(
          doc.featuredServiceName,
          fallbackServices.featured.name,
        ),
        price: pickString(
          doc.featuredServicePrice,
          fallbackServices.featured.price,
        ),
        note: pickString(
          doc.featuredServiceNote,
          fallbackServices.featured.note,
        ),
        cta: pickString(doc.featuredServiceCta, fallbackServices.featured.cta),
      },
      secondary:
        (secondaryServices?.length
          ? secondaryServices
          : fallbackServices.secondary) as typeof fallbackServices.secondary,
      compact:
        doc.compactServices?.length
          ? doc.compactServices
              .map((item, index) => {
                const fb = fallbackServices.compact[index] ?? {
                  name: "",
                  price: "",
                };
                if (!item?.name?.trim() || !item?.price?.trim()) return null;
                return {
                  name: item.name.trim(),
                  price: item.price.trim(),
                };
              })
              .filter(Boolean).length
            ? (doc.compactServices
                .map((item, index) => {
                  const fb = fallbackServices.compact[index] ?? {
                    name: "",
                    price: "",
                  };
                  if (!item?.name?.trim() || !item?.price?.trim()) return null;
                  return {
                    name: item.name.trim(),
                    price: item.price.trim(),
                  };
                })
                .filter(Boolean) as typeof fallbackServices.compact)
            : fallbackServices.compact
          : fallbackServices.compact,
      brows: {
        name: pickString(doc.browsTitle, fallbackServices.brows.name),
        items:
          doc.browsItems?.length
            ? (doc.browsItems
                .map((item) => {
                  if (!item?.name?.trim() || !item?.price?.trim()) return null;
                  return {
                    name: item.name.trim(),
                    price: item.price.trim(),
                  };
                })
                .filter(Boolean) as typeof fallbackServices.brows.items)
            : fallbackServices.brows.items,
      },
      extra: {
        name: pickString(doc.extraServiceName, fallbackServices.extra.name),
        price: pickString(doc.extraServicePrice, fallbackServices.extra.price),
      },
      afterCta: pickString(doc.servicesAfterCta, fallbackServices.afterCta),
    },
    about: {
      ...fallbackAbout,
      title: pickString(doc.aboutTitle, fallbackAbout.title),
      paragraphs: pickStringArray(doc.aboutParagraphs, fallbackAbout.paragraphs),
      images: mapImageList(doc.aboutImages, fallbackAbout.images),
    },
    reviews: {
      ...fallbackReviews,
      title: pickString(doc.reviewsTitle, fallbackReviews.title),
      items: reviewsItems.length > 0 ? reviewsItems : fallbackReviews.items,
      yandexCta: pickString(doc.reviewsYandexCta, fallbackReviews.yandexCta),
      dikidiNote: pickString(
        doc.reviewsDikidiNote,
        fallbackReviews.dikidiNote,
      ),
    },
    makeupLesson: {
      ...fallbackLesson,
      title: pickString(doc.lessonTitle, fallbackLesson.title),
      subtitle: pickString(doc.lessonSubtitle, fallbackLesson.subtitle),
      price: pickString(doc.lessonPrice, fallbackLesson.price),
      duration: pickString(doc.lessonDuration, fallbackLesson.duration),
      includesTitle: pickString(
        doc.lessonIncludesTitle,
        fallbackLesson.includesTitle,
      ),
      includes: pickStringArray(doc.lessonIncludes, fallbackLesson.includes),
      highlights: pickStringArray(
        doc.lessonHighlights,
        fallbackLesson.highlights,
      ),
      cta: pickString(doc.lessonCta, fallbackLesson.cta),
      images: mapImageList(doc.lessonImages, fallbackLesson.images),
    },
    additional: {
      ...fallbackAdditional,
      title: pickString(doc.additionalTitle, fallbackAdditional.title),
      text: pickString(doc.additionalText, fallbackAdditional.text),
      priceLine: pickString(
        doc.additionalPriceLine,
        fallbackAdditional.priceLine,
      ),
      images: mapImageList(doc.additionalImages, fallbackAdditional.images),
    },
    studio: {
      ...fallbackStudio,
      title: pickString(doc.studioTitle, fallbackStudio.title),
      addressLines: pickStringArray(
        doc.studioAddressLines,
        fallbackStudio.addressLines,
      ),
      mapCta: pickString(doc.studioMapCta, fallbackStudio.mapCta),
      images: mapImageList(doc.studioImages, fallbackStudio.images),
    },
    socials: fallbackSocials,
    finalCta: fallbackFinalCta,
  };
}
