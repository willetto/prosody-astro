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
          ],
          preview: {
            select: {
              title: "caseStudy.title",
              subtitle: "caseStudy.listingDescription",
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
