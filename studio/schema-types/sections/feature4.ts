import { defineField, defineType } from "sanity";
import { ALLOWED_ICONS } from "../allowed-icons";
import { InlineIcon } from "@sanity/icons";

export const feature4 = defineType({
  name: "feature4",
  title: "50-50",
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
      name: "firstFeature",
      title: "Feature",
      type: "object",
      fields: [
        defineField({
          name: "icon",
          title: "Icon",
          type: "lucide-icon",
          description: "Search from Lucide Icons",
          options: {
            allowedIcons: ALLOWED_ICONS,
          },
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          description: "Image to display alongside the feature content",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "portableText",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
        }),
        defineField({
          name: "ctaHref",
          title: "CTA Link",
          type: "string",
        }),
        defineField({
          name: "imagePosition",
          title: "Image Position",
          type: "string",
          options: {
            list: [
              { title: "Image Left", value: "left" },
              { title: "Image Right", value: "right" },
            ],
          },
          validation: (rule) => rule.required(),
          initialValue: "right",
        }),
      ],
      preview: {
        select: {
          title: "title",
          imagePosition: "imagePosition",
        },
        prepare({ title, imagePosition }) {
          return {
            title: title || "Feature",
            subtitle: `Image ${imagePosition || "right"}`,
          };
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "header",
      firstFeature: "firstFeature.title",
      imagePosition: "firstFeature.imagePosition",
      image: "firstFeature.image",
    },
    prepare({ title, firstFeature, imagePosition, image }) {
      return {
        title: firstFeature || "Feature 4 - Split Features",
        subtitle: "50-50 Section",
        media: image || InlineIcon,
      };
    },
  },
});
