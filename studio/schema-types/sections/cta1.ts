import { defineField, defineType } from "sanity";

export const cta1 = defineType({
  name: "cta1",
  title: "CTA 1",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Text",
      type: "text",
      rows: 3,
      description: "Supporting copy shown under the header.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "ctaLabel",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "CTA 1",
        subtitle: subtitle ? `CTA: ${subtitle}` : "",
      } as { title: string; subtitle?: string };
    },
  },
});
