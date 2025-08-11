import { defineField, defineType } from "sanity";

export const iconSelector = defineType({
  name: "iconSelector",
  title: "Icon",
  type: "image",
  options: {
    accept: ".svg,.png,.jpg,.jpeg",
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Alternative text for accessibility",
    }),
  ],
  preview: {
    select: {
      media: "asset",
      title: "alt",
    },
    prepare({ media, title }) {
      return {
        title: title || "Custom Icon",
        media,
      };
    },
  },
});
