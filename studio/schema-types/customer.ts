import { defineField, defineType } from "sanity";

export const customer = defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Customer Name",
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
      name: "image",
      title: "Customer Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "portableText",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      company: "company",
      role: "role",
    },
    prepare({ title, company, role }) {
      return {
        title: title || "Customer",
        subtitle: company && role ? `${role} at ${company}` : company || role,
      };
    },
  },
});
