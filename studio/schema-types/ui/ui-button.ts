import { defineField, defineType } from "sanity";

export const uiButton = defineType({
  name: "uiButton",
  title: "UI Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
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
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Button", value: "button" },
          { title: "Submit", value: "submit" },
          { title: "Reset", value: "reset" },
        ],
        layout: "radio",
      },
      initialValue: "button",
    }),
    defineField({
      name: "onlyIconSize",
      title: "Only Icon Size",
      type: "string",
      description:
        "Optional icon-only size, if you render only an icon inside the button.",
      options: {
        list: [
          { title: "XS", value: "xs" },
          { title: "SM", value: "sm" },
          { title: "MD", value: "md" },
          { title: "LG", value: "lg" },
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
      variant: "variant",
      size: "size",
    },
    prepare({ label, variant, size }) {
      return {
        title: label || "Button",
        subtitle: [variant, size].filter(Boolean).join(" • "),
      };
    },
  },
});
