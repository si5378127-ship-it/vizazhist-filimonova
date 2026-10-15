import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

/** Публичный Project ID — не секрет. Переопределяется через .env.local. */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "kactc55z";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

/**
 * Sanity Studio для Елены Филимоновой.
 * Запуск: npm run sanity:dev
 * Studio не встраивается в статический GitHub Pages-сайт.
 */
export default defineConfig({
  name: "filimonova-makeup",
  title: "Сайт Елены Филимоновой",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Управление сайтом")
          .items([
            S.listItem()
              .title("Контент сайта")
              .id("landingContent")
              .child(
                S.document()
                  .schemaType("landingContent")
                  .documentId("landingContent")
                  .title("Контент сайта"),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
