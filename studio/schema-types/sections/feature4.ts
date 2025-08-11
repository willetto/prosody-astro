import { defineField, defineType } from "sanity";

export const feature4 = defineType({
  name: "feature4",
  title: "Feature 4 - Split Features",
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
      name: "firstFeature",
      title: "First Feature",
      type: "object",
      fields: [
        defineField({
          name: "icon",
          title: "Icon",
          type: "iconSelector",
          description: "Select from available icons or upload custom SVG/PNG",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "portableText",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
        }),
        defineField({
          name: "ctaHref",
          title: "CTA Link",
          type: "string",
        }),
      ],
      preview: {
        select: {
          title: "title",
        },
        prepare({ title }) {
          return {
            title: title || "First Feature",
          };
        },
      },
    }),
    defineField({
      name: "secondFeature",
      title: "Second Feature",
      type: "object",
      fields: [
        defineField({
          name: "icon",
          title: "Icon",
          type: "iconSelector",
          description: "Select from available icons or upload custom SVG/PNG",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "portableText",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
        }),
        defineField({
          name: "ctaHref",
          title: "CTA Link",
          type: "string",
        }),
      ],
      preview: {
        select: {
          title: "title",
        },
        prepare({ title }) {
          return {
            title: title || "Second Feature",
          };
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "header",
      firstFeature: "firstFeature.title",
      secondFeature: "secondFeature.title",
    },
    prepare({ title, firstFeature, secondFeature }) {
      return {
        title: title || "Feature 4 - Split Features",
        subtitle: `${firstFeature || "No title"}, ${secondFeature || "No title"}`,
      };
    },
  },
});
