import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
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
        // Normalize common mistakes: remove leading '/', remove 'our-work/' prefix, kebab-case
        slugify: (input: string) =>
          input
            .toString()
            .trim()
            .toLowerCase()
            .replace(/^\/+/, "") // remove leading slashes
            .replace(/^our-work\/+/, "") // remove route prefix if typed
            .replace(/[^a-z0-9/]+/g, "-") // non-url chars to '-'
            .replace(/-+/g, "-") // collapse dashes
            .replace(/\/{2,}/g, "/") // collapse multiple '/'
            .replace(/^-|-$/g, ""), // trim leading/trailing '-'
      },
      description:
        "Plain segment(s) only. Do NOT include a leading '/' or the 'our-work/' prefix. Use kebab-case.",
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = (value as { current?: string } | undefined)?.current;
          if (!current) return "Slug is required";
          if (/^\//.test(current)) return "Remove leading '/' from slug";
          if (/^our-work\//.test(current))
            return "Remove 'our-work/' prefix; the route adds it automatically";
          if (!/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(current))
            return "Use lowercase letters, numbers, and hyphens;";
          return true;
        }),
    }),
    defineField({
      name: "socialImage",
      title: "Social / Listing Image",
      type: "imageWithAlt",
      description: "Used for social share cards and the Our Work listing page.",
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
      ],
      description:
        "Add sections to compose this case study. Sections will be rendered in the order they appear here.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "socialImage",
    },
  },
});
