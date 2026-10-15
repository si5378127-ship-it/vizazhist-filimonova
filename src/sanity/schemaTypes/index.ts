import type { SchemaTypeDefinition } from "sanity";
import { landingContent } from "@/sanity/schemaTypes/documents/landingContent";
import { namedPrice } from "@/sanity/schemaTypes/objects/namedPrice";
import { reviewItem } from "@/sanity/schemaTypes/objects/reviewItem";
import { siteImage } from "@/sanity/schemaTypes/objects/siteImage";

export const schemaTypes: SchemaTypeDefinition[] = [
  landingContent,
  siteImage,
  namedPrice,
  reviewItem,
];
