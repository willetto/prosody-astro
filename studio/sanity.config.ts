import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema-types";
import { definePlugin } from "sanity";
import { SecretsToolbar } from "./components/secret-toolbar";
import { media } from "sanity-plugin-media";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export const secretsToolbar = definePlugin({
  name: "secrets-toolbar",
  studio: {
    components: {
      toolMenu: SecretsToolbar,
    },
  },
});

export default defineConfig({
  name: "default",
  title: "Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items(
            S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== "media.tag"
            )
          ),
    }),
    visionTool(),
    secretsToolbar(),
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
});
