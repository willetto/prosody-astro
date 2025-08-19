import { defineField, defineType } from "sanity";

export const logoCloud3 = defineType({
  name: "logoCloud3",
  title: "Logo Cloud 3",
  type: "object",
  fields: [
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
      imagesCount: "images",
    },
    prepare({ imagesCount }) {
      const count = Array.isArray(imagesCount) ? imagesCount.length : 0;
      return {
        title: "Logo Cloud 3",
        subtitle: `${count} image${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
