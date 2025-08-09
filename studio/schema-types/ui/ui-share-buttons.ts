import { defineField, defineType } from "sanity";

export const uiShareButtons = defineType({
  name: "uiShareButtons",
  title: "UI Share Buttons",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Overrides the current page URL when sharing.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional share title.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Generic", value: "generic" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
      contentType: "contentType",
    },
    prepare({ title, url, contentType }) {
      return {
        title: title || "Share Buttons",
        subtitle: [contentType, url].filter(Boolean).join(" • "),
      };
    },
  },
});
