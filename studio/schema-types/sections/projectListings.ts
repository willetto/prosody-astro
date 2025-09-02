import { defineField, defineType } from "sanity";

export const projectListings = defineType({
  name: "projectListings",
  title: "Project Listings",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Selected Projects",
      type: "array",
      of: [
        defineField({
          name: "projectItem",
          title: "Project",
          type: "object",
          fields: [
            defineField({
              name: "caseStudy",
              title: "Case Study",
              type: "reference",
              to: [{ type: "caseStudy" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Short description",
              description:
                "One sentence shown under the project title (recommend ≤ 140 characters)",
              type: "string",
              validation: (rule) => rule.max(200),
            }),
            defineField({
              name: "ctaLabel",
              title: "Button label",
              type: "string",
              initialValue: "View project",
            }),
            defineField({
              name: "badges",
              title: "Badges",
              description: "Technologies or tags to highlight (1–2 words each)",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.unique(),
            }),
          ],
          preview: {
            select: {
              title: "caseStudy.title",
              subtitle: "description",
              media: "caseStudy.socialImage",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Project Listings",
        subtitle: "Grid of selected case studies",
      };
    },
  },
});
