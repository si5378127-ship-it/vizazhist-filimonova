import { getSanityClient } from "@/sanity/lib/client";
import { landingContentQuery } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";
import type { SanityLandingContent } from "@/sanity/types";

/**
 * Читает только опубликованный документ landingContent на этапе сборки.
 * Черновики не используются. При ошибке возвращает null → siteContent.ts.
 */
export async function fetchLandingContentFromSanity(): Promise<SanityLandingContent> {
  if (!isSanityConfigured()) {
    return null;
  }

  const client = getSanityClient();
  if (!client) {
    return null;
  }

  try {
    const data = await client.fetch<SanityLandingContent>(landingContentQuery);
    return data ?? null;
  } catch (error) {
    console.warn(
      "[sanity] Не удалось загрузить опубликованный контент. Используется siteContent.ts.",
      error,
    );
    return null;
  }
}
