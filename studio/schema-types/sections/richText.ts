import { defineField, defineType } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      description: "Optional header text.",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "portableText",
      description: "Rich text content rendered on the page.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "showBottomBorder",
      title: "Show bottom border",
      type: "boolean",
      description: "Display a bottom border under this section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "header",
    },
    prepare({ title }) {
      return {
        title: title || "Rich Text",
        subtitle: "Portable Text section",
      };
    },
  },
});
