import { defineField, defineType } from "sanity";

export const feature3 = defineType({
  name: "feature3",
  title: "Feature 3 - Image",
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
      name: "image",
      title: "Feature Image",
      type: "imageWithAlt",
      description: "Image to display in the feature section",
    }),
    defineField({
      name: "customerTestimonial",
      title: "Customer Testimonial",
      type: "reference",
      to: [{ type: "customer" }],
      description:
        "Optional customer testimonial to display alongside the feature image",
    }),
  ],
  preview: {
    select: {
      title: "header",
      image: "image",
      customer: "customerTestimonial.title",
    },
    prepare({ title, image, customer }) {
      return {
        title: title || "Feature 3 - Image",
        subtitle: customer ? `with ${customer}` : "Image only",
        media: image,
      };
    },
  },
});
