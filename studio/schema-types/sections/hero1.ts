import { defineField, defineType } from "sanity";

export const hero1 = defineType({
  name: "hero1",
  title: "Hero 1",
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
    }),
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "subheader",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Hero 1",
        subtitle: subtitle || undefined,
      };
    },
  },
});
