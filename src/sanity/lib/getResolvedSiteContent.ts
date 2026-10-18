import { cache } from "react";
import {
  about,
  additional,
  cta,
  finalCta,
  footer,
  hero,
  links,
  makeupLesson,
  nav,
  portfolio,
  quiz,
  reviews,
  services,
  site,
  socials,
  studio,
} from "@/data/siteContent";
import { fetchLandingContentFromSanity } from "@/sanity/lib/getLandingContent";
import {
  mapLandingContentToSite,
  type ResolvedSiteContent,
} from "@/sanity/lib/mapLandingContent";
import type { SanityLandingContent } from "@/sanity/types";

const fallbackContent: ResolvedSiteContent = {
  source: "siteContent",
  site,
  nav,
  cta,
  links,
  footer,
  hero,
  portfolio,
  services,
  about,
  reviews,
  makeupLesson,
  additional,
  studio,
  socials,
  finalCta,
  quiz,
};

/**
 * Контент лендинга для статической сборки.
 * Только published Sanity; при ошибке/пустоте — siteContent.ts.
 */
export const getResolvedSiteContent = cache(
  async (): Promise<ResolvedSiteContent> => {
    const raw = (await fetchLandingContentFromSanity()) as SanityLandingContent;

    if (!raw) {
      console.info(
        "[content] Источник: siteContent.ts (Sanity недоступен или пуст)",
      );
      return fallbackContent;
    }

    const resolved = mapLandingContentToSite(raw);

    // Защита: не отдаём «пустой» сайт, если ключевые поля пропали.
    if (!resolved.hero.h1.trim() || resolved.portfolio.images.length === 0) {
      console.warn(
        "[content] Sanity вернул неполные данные. Fallback: siteContent.ts",
      );
      return fallbackContent;
    }

    console.info(`[content] Источник: ${resolved.source}`);
    return resolved;
  },
);
