import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "kactc55z";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "filimonova-makeup",
  deployment: {
    appId: "z42fjvrm90a6hvrv56gohev9",
  },
});
