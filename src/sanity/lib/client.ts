import { createClient, type SanityClient } from "@sanity/client";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "@/sanity/env";

let cachedClient: SanityClient | null = null;

/**
 * Клиент для чтения контента на этапе `next build`.
 * Без Project ID возвращает null — сайт продолжает брать данные из siteContent.ts.
 */
export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: true,
    perspective: "published",
    // Токен нужен только если dataset закрыт; на Free public dataset можно без него.
    token: sanityReadToken || undefined,
  });

  return cachedClient;
}
