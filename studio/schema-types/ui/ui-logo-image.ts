import { defineField, defineType } from "sanity";

export const uiLogoImage = defineType({
  name: "uiLogoImage",
  title: "UI Logo Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      description:
        "Upload or select a logo image. Alt text is required when an image is set.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "iconTitle",
      title: "Icon title",
      type: "string",
      description: "Optional title to display under the icon.",
    }),
    defineField({
      name: "class",
      title: "CSS Classes",
      type: "string",
      description: "Optional extra CSS classes for the rendered <img>.",
    }),
    defineField({
      name: "loading",
      title: "Loading",
      type: "string",
      options: {
        list: [
          { title: "Lazy", value: "lazy" },
          { title: "Eager", value: "eager" },
        ],
      },
      initialValue: "lazy",
    }),
  ],
  preview: {
    select: {
      media: "image",
      iconTitle: "iconTitle",
    },
    prepare({ media, iconTitle }) {
      return {
        title: iconTitle || "UI Logo Image",
        media: (media as any) ?? null,
      };
    },
  },
});
