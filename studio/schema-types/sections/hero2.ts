import { defineField, defineType } from "sanity";

export const hero2 = defineType({
  name: "hero2",
  title: "Hero 2",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheader",
      title: "Subheader",
      type: "text",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Href",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Href",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "subheader",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Hero 2",
        subtitle: subtitle || undefined,
      };
    },
  },
});
