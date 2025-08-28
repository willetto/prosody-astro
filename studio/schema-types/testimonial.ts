import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  title: "Testimonials",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "testimony",
      type: "text",
      title: "Testimony",
      description: "The testimonial content",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "The name of the person giving the testimonial",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameLink",
      type: "url",
      title: "Name Link",
      description:
        "Optional link for the person's name (e.g., personal website, LinkedIn)",
    }),
    defineField({
      name: "jobTitle",
      type: "string",
      title: "Job Title",
      description: "Optional job title",
    }),
    defineField({
      name: "company",
      type: "string",
      title: "Company",
      description: "Optional company name",
    }),
    defineField({
      name: "companyLink",
      type: "url",
      title: "Company Link",
      description: "Optional link for the company (e.g., company website)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "testimony",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Untitled Testimonial",
        subtitle: subtitle || "No Company",
      };
    },
  },
});
