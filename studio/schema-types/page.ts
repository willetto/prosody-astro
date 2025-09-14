import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "hero1" },
        { type: "hero2" },
        { type: "feature1" },
        { type: "feature2" },
        { type: "feature3" },
        { type: "feature4" },
        { type: "feature5" },
        { type: "feature6" },
        { type: "feature7" },
        { type: "testimonial1" },
        { type: "testimonial2" },
        { type: "logoCloud1" },
        { type: "logoCloud2" },
        { type: "logoCloud3" },
        { type: "richText" },
        { type: "contactForm" },
        { type: "projectListings" },
        { type: "cta1" },
        { type: "blogImages" },
      ],
      description:
        "Add sections to compose this page. Sections will be rendered in the order they appear here.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
