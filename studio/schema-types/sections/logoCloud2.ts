import { defineField, defineType } from "sanity";

export const logoCloud2 = defineType({
  name: "logoCloud2",
  title: "Logo Cloud 2 - With Optional Heading",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Heading",
      type: "string",
      description: "Optional heading text. Leave empty to hide.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "uiLogoImage" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "header",
      imagesCount: "images",
    },
    prepare({ title, imagesCount }) {
      const count = Array.isArray(imagesCount) ? imagesCount.length : 0;
      return {
        title: title || "Logo Cloud 2",
        subtitle: `${count} image${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
