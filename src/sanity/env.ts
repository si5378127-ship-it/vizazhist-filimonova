/**
 * Публичные идентификаторы Sanity.
 * Секретные токены сюда не кладём — только NEXT_PUBLIC_* и опциональный
 * read-токен через process.env на этапе сборки (не в клиентский бандл сайта).
 */

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

/** Публичный Project ID проекта Елены. Не является секретом. */
export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "kactc55z";

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-01-01";

/** Read-токен только для серверной/build-сборки. Не использовать в браузере. */
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN?.trim() || "";

export function isSanityConfigured(): boolean {
  return Boolean(sanityProjectId);
}
