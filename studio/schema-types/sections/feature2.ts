import { defineField, defineType } from "sanity";
import { ALLOWED_ICONS } from "../allowed-icons";

export const feature2 = defineType({
  name: "feature2",
  title: "Feature 2 - Features Grid",
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
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            defineField({
              name: "id",
              title: "Feature ID",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineType({
              name: "icon",
              title: "Icon",
              type: "lucide-icon",
              description: "Search from Lucide Icons",
              options: {
                allowedIcons: ALLOWED_ICONS,
              },
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "id",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Feature",
                subtitle: subtitle,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "header",
      featuresCount: "features",
    },
    prepare({ title, featuresCount }) {
      const count = Array.isArray(featuresCount) ? featuresCount.length : 0;
      return {
        title: title || "Feature 2 - Features Grid",
        subtitle: `${count} feature${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
