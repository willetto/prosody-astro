import { defineField, defineType } from "sanity";

export const feature3 = defineType({
  name: "feature3",
  title: "Feature 3 - Image",
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
    defineField({
      name: "image",
      title: "Feature Image",
      type: "imageWithAlt",
      description: "Image to display in the feature section",
    }),
  ],
  preview: {
    select: {
      title: "header",
      image: "image",
    },
    prepare({ title, image }) {
      return {
        title: title || "Feature 3 - Image",
        subtitle: "Image feature",
        media: image,
      };
    },
  },
});
