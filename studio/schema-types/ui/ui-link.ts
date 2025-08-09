import { defineField, defineType } from "sanity";

export const uiLink = defineType({
  name: "uiLink",
  title: "UI Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Accent", value: "accent" },
          { title: "Muted", value: "muted" },
          { title: "Link (unstyled)", value: "link" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "XXS", value: "xxs" },
          { title: "XS", value: "xs" },
          { title: "SM", value: "sm" },
          { title: "Base", value: "base" },
          { title: "MD", value: "md" },
          { title: "LG", value: "lg" },
          { title: "XL", value: "xl" },
        ],
      },
      initialValue: "base",
    }),
    defineField({
      name: "gap",
      title: "Gap",
      type: "string",
      options: {
        list: [
          { title: "XS", value: "xs" },
          { title: "SM", value: "sm" },
          { title: "Base", value: "base" },
          { title: "MD", value: "md" },
          { title: "LG", value: "lg" },
        ],
      },
      initialValue: "base",
    }),
    defineField({
      name: "rel",
      title: "rel",
      type: "string",
    }),
    defineField({
      name: "target",
      title: "target",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "" },
          { title: "New tab", value: "_blank" },
          { title: "Parent", value: "_parent" },
          { title: "Self", value: "_self" },
          { title: "Top", value: "_top" },
        ],
      },
    }),
    defineField({
      name: "ariaLabel",
      title: "Aria Label",
      type: "string",
    }),
    defineField({
      name: "class",
      title: "CSS Classes",
      type: "string",
    }),
  ],
  preview: {
    select: {
      label: "label",
      href: "href",
      variant: "variant",
    },
    prepare({ label, href, variant }) {
      return {
        title: label || "Link",
        subtitle: [variant, href].filter(Boolean).join(" • "),
      };
    },
  },
});
