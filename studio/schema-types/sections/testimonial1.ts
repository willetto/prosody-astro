import { defineField, defineType } from "sanity";

export const testimonial1 = defineType({
  name: "testimonial1",
  title: "Testimonial 1 - With Header",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      description: "Optional header text. Leave empty to hide.",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
          title: "Testimonial",
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "showBottomBorder",
      title: "Show bottom border",
      type: "boolean",
      description: "Display a bottom border under this section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "header",
      testimonialsCount: "testimonials",
    },
    prepare({ title, testimonialsCount }) {
      const count = Array.isArray(testimonialsCount)
        ? testimonialsCount.length
        : 0;
      return {
        title: title || "Testimonial 1 - With Header",
        subtitle: `${count} testimonial${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
