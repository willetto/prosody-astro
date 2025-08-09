import { defineField, defineType } from "sanity";

export const uiImage = defineType({
  name: "uiImage",
  title: "UI Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      description:
        "Upload or select an image. Alt text is required when an image is set.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      title: "Width (px)",
      type: "number",
      description:
        "Rendered width in pixels (required by Astro Image for remote images).",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "height",
      title: "Height (px)",
      type: "number",
      description:
        "Rendered height in pixels (required by Astro Image for remote images).",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "class",
      title: "CSS Classes",
      type: "string",
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
      width: "width",
      height: "height",
    },
    prepare({ media, width, height }) {
      const subtitle = [width && `${width}px`, height && `${height}px`]
        .filter(Boolean)
        .join(" × ");
      return {
        title: "UI Image",
        media: (media as any) ?? null,
        subtitle: subtitle || undefined,
      };
    },
  },
});
