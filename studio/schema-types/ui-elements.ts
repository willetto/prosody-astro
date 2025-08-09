import { defineType } from "sanity";

export const uiElements = defineType({
  name: "uiElements",
  title: "UI Elements",
  type: "array",
  of: [
    { type: "uiButton" },
    { type: "uiLink" },
    { type: "uiText" },
    { type: "uiShareButtons" },
    { type: "uiImage" },
  ],
});
