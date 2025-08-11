import { defineField, defineType } from "sanity";

export const feature5 = defineType({
  name: "feature5",
  title: "Feature 5 - Simple Text",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      description: "Optional header text. Leave empty to hide.",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "portableText",
      description: "Optional subheading text. Leave empty to hide.",
    }),
  ],
  preview: {
    select: {
      title: "header",
    },
    prepare({ title }) {
      return {
        title: title || "Feature 5 - Simple Text",
        subtitle: "Text-only feature section",
      };
    },
  },
});
