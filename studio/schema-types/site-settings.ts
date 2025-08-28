import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Global Site Settings",
    }),
    defineField({
      name: "mainNav",
      title: "Main Navigation",
      description:
        "Manage primary navigation items. Links can point to any Page and include presentation options.",
      type: "array",
      of: [
        defineField({
          name: "navItem",
          title: "Navigation Item",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description:
                "Text to display. Defaults to the referenced Page title if left empty.",
            }),
            defineField({
              name: "page",
              title: "Page",
              type: "reference",
              to: [{ type: "page" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "component",
              title: "Component",
              type: "string",
              options: {
                list: [
                  { title: "Link", value: "InlineLink" },
                  { title: "Button", value: "Link" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "InlineLink",
            }),
            // InlineLink options
            defineField({
              name: "inlineLinkOptions",
              title: "Link Options",
              type: "object",
              fields: [
                defineField({
                  name: "target",
                  title: "Target",
                  type: "string",
                  options: {
                    list: [
                      { title: "Self", value: "_self" },
                      { title: "Blank", value: "_blank" },
                      { title: "Parent", value: "_parent" },
                      { title: "Top", value: "_top" },
                    ],
                  },
                  initialValue: "_self",
                }),
                defineField({ name: "rel", title: "Rel", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "variant",
                  title: "Text Variant",
                  type: "string",
                  options: {
                    list: [
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
                    ],
                  },
                  initialValue: "textSM",
                }),
                defineField({
                  name: "hoverColor",
                  title: "Hover Color",
                  type: "string",
                  options: {
                    list: [
                      { title: "Base", value: "base" },
                      { title: "Accent", value: "accent" },
                      { title: "Blue", value: "blue" },
                      { title: "Sand", value: "sand" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "blue",
                }),
                defineField({
                  name: "weight",
                  title: "Weight",
                  type: "string",
                  options: {
                    list: [
                      { title: "thin", value: "thin" },
                      { title: "extralight", value: "extralight" },
                      { title: "light", value: "light" },
                      { title: "normal", value: "normal" },
                      { title: "medium", value: "medium" },
                      { title: "semibold", value: "semibold" },
                      { title: "bold", value: "bold" },
                      { title: "extrabold", value: "extrabold" },
                      { title: "black", value: "black" },
                    ],
                    layout: "dropdown",
                  },
                  initialValue: "light",
                }),
                defineField({
                  name: "hideUnderline",
                  title: "Hide Underline until hover/focus",
                  type: "boolean",
                  initialValue: true,
                }),
                defineField({ name: "class", title: "Class", type: "string" }),
                defineField({
                  name: "ariaLabel",
                  title: "Aria Label",
                  type: "string",
                }),
              ],
              hidden: ({ parent }) => parent?.component !== "InlineLink",
            }),
            // Button Link options
            defineField({
              name: "linkOptions",
              title: "Link (Button) Options",
              type: "object",
              fields: [
                defineField({
                  name: "variant",
                  title: "Variant",
                  type: "string",
                  options: {
                    list: [
                      { title: "default", value: "default" },
                      { title: "accent", value: "accent" },
                      { title: "muted", value: "muted" },
                      { title: "link", value: "link" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "muted",
                }),
                defineField({
                  name: "size",
                  title: "Size",
                  type: "string",
                  options: {
                    list: [
                      { title: "xxs", value: "xxs" },
                      { title: "xs", value: "xs" },
                      { title: "sm", value: "sm" },
                      { title: "base", value: "base" },
                      { title: "md", value: "md" },
                      { title: "lg", value: "lg" },
                      { title: "xl", value: "xl" },
                    ],
                  },
                  initialValue: "sm",
                }),
                defineField({
                  name: "gap",
                  title: "Gap",
                  type: "string",
                  options: {
                    list: [
                      { title: "xs", value: "xs" },
                      { title: "sm", value: "sm" },
                      { title: "base", value: "base" },
                      { title: "md", value: "md" },
                      { title: "lg", value: "lg" },
                    ],
                  },
                }),
                defineField({ name: "rel", title: "Rel", type: "string" }),
                defineField({
                  name: "target",
                  title: "Target",
                  type: "string",
                }),
                defineField({
                  name: "ariaLabel",
                  title: "Aria Label",
                  type: "string",
                }),
                defineField({ name: "class", title: "Class", type: "string" }),
              ],
              hidden: ({ parent }) => parent?.component !== "Link",
            }),
          ],
          preview: {
            select: {
              title: "label",
              pageTitle: "page.title",
              component: "component",
            },
            prepare({ title, pageTitle, component }) {
              return {
                title: title || pageTitle || "(untitled)",
                subtitle: component || "InlineLink",
              };
            },
          },
        }),
      ],
    }),
  ],
});
