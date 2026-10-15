import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { getSanityClient } from "@/sanity/lib/client";

export function urlForImage(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) {
    return null;
  }

  return createImageUrlBuilder(client).image(source);
}
