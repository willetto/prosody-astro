import { defineField, defineType } from "sanity";

export const testimonial2 = defineType({
  name: "testimonial2",
  title: "Testimonial 2 - Without Header",
  type: "object",
  fields: [
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
  ],
  preview: {
    select: {
      testimonialsCount: "testimonials",
    },
    prepare({ testimonialsCount }) {
      const count = Array.isArray(testimonialsCount)
        ? testimonialsCount.length
        : 0;
      return {
        title: "Testimonial 2 - Without Header",
        subtitle: `${count} testimonial${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
