import { defineField, defineType } from "sanity";

export const hero2 = defineType({
  name: "hero2",
  title: "Hero 2",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheader",
      title: "Subheader (Rich text)",
      type: "portableText",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Href",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Href",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "header",
      subheader: "subheader",
    },
    prepare({ title, subheader }) {
      let subtitle: string | undefined = undefined;
      if (Array.isArray(subheader) && subheader.length > 0) {
        const firstBlock = subheader.find((b: any) => b?._type === "block");
        if (firstBlock && Array.isArray(firstBlock.children)) {
          subtitle = firstBlock.children
            .map((c: any) => c?.text)
            .filter(Boolean)
            .join("")
            .slice(0, 120);
        }
      }
      return {
        title: title || "Hero 2",
        subtitle,
      };
    },
  },
});
