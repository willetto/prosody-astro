import { defineField, defineType } from "sanity";

const textVariants = [
  { title: "display6XL", value: "display6XL" },
  { title: "display5XL", value: "display5XL" },
  { title: "display4XL", value: "display4XL" },
  { title: "display3XL", value: "display3XL" },
  { title: "display2XL", value: "display2XL" },
  { title: "displayXL", value: "displayXL" },
  { title: "displayLG", value: "displayLG" },
  { title: "displayMD", value: "displayMD" },
  { title: "displaySM", value: "displaySM" },
  { title: "displayXS", value: "displayXS" },
  { title: "textXL", value: "textXL" },
  { title: "textLG", value: "textLG" },
  { title: "textBase", value: "textBase" },
  { title: "textSM", value: "textSM" },
  { title: "textXS", value: "textXS" },
];

const tagOptions = [
  { title: "p", value: "p" },
  { title: "span", value: "span" },
  { title: "a", value: "a" },
  { title: "em", value: "em" },
  { title: "small", value: "small" },
  { title: "strong", value: "strong" },
  { title: "blockquote", value: "blockquote" },
  { title: "h1", value: "h1" },
  { title: "h2", value: "h2" },
  { title: "h3", value: "h3" },
  { title: "h4", value: "h4" },
  { title: "h5", value: "h5" },
  { title: "h6", value: "h6" },
];

export const uiText = defineType({
  name: "uiText",
  title: "UI Text",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: textVariants },
      initialValue: "textBase",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      options: { list: tagOptions },
      initialValue: "p",
    }),
    defineField({
      name: "href",
      title: "URL (for anchor tag)",
      type: "url",
      hidden: ({ parent }) => parent?.tag !== "a",
    }),
    defineField({
      name: "rel",
      title: "rel",
      type: "string",
      hidden: ({ parent }) => parent?.tag !== "a",
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
      hidden: ({ parent }) => parent?.tag !== "a",
    }),
    defineField({
      name: "title",
      title: "Title (for anchor tag)",
      type: "string",
      hidden: ({ parent }) => parent?.tag !== "a",
    }),
    defineField({
      name: "id",
      title: "id",
      type: "string",
    }),
    defineField({
      name: "style",
      title: "Inline Style",
      type: "string",
    }),
    defineField({
      name: "class",
      title: "CSS Classes",
      type: "string",
    }),
    defineField({
      name: "ariaLabel",
      title: "Aria Label",
      type: "string",
    }),
  ],
  preview: {
    select: {
      text: "text",
      variant: "variant",
      tag: "tag",
    },
    prepare({ text, variant, tag }) {
      return {
        title: text || "Text",
        subtitle: [tag, variant].filter(Boolean).join(" • "),
      };
    },
  },
});
