import { defineField, defineType } from "sanity";

export const contactForm = defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      description:
        "Optional header text for the contact form section. Leave empty to hide.",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "portableText",
      description:
        "Optional subheading text below the header. Leave empty to hide.",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      description: "Message shown after successful form submission.",
      initialValue: "Thank you for your message! We'll get back to you soon.",
      validation: (rule) =>
        rule.max(200).warning("Keep success message concise for better UX"),
    }),
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "successMessage",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact Form",
        subtitle: subtitle || "Contact form with default success message",
        media: () => "📧", // Email emoji as icon
      };
    },
  },
});
