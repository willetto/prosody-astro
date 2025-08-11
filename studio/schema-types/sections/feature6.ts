import { defineField, defineType } from "sanity";

export const feature6 = defineType({
  name: "feature6",
  title: "Feature 6 - React Email Templates",
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
      name: "codeTabs",
      title: "Code Tabs",
      type: "array",
      of: [
        {
          type: "object",
          name: "codeTab",
          title: "Code Tab",
          fields: [
            defineField({
              name: "id",
              title: "Tab ID",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Display Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "language",
              title: "Code Language",
              type: "string",
              options: {
                list: [
                  { title: "TypeScript React", value: "tsx" },
                  { title: "JavaScript", value: "js" },
                  { title: "TypeScript", value: "ts" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "code",
              title: "Code Content",
              type: "text",
              rows: 15,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "id",
              language: "language",
            },
            prepare({ title, subtitle, language }) {
              return {
                title: title || "Code Tab",
                subtitle: `${subtitle} (${language})`,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "header",
      tabsCount: "codeTabs",
    },
    prepare({ title, tabsCount }) {
      const count = Array.isArray(tabsCount) ? tabsCount.length : 0;
      return {
        title: title || "Feature 6 - React Email Templates",
        subtitle: `${count} code tab${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
