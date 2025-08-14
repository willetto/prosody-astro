import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema-types";
import { media } from "sanity-plugin-media";
import { lucideIconPicker } from "sanity-plugin-lucide-icon-picker";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Studio",
  projectId,
  dataset,
  plugins: [
    lucideIconPicker(),
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
    media(),
  ],
  schema: {
    types: schemaTypes,
  },
});
