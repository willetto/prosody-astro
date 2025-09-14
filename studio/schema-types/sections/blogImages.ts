import { defineField, defineType } from "sanity";

export const blogImages = defineType({
  name: "blogImages",
  title: "Blog Images",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      description: "Optional header text.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "Up to four images. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "imageItem",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "imageWithAlt",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
            defineField({
              name: "preview",
              title: "Use as section preview image",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { image: "image", caption: "caption" },
            prepare({ image, caption }) {
              return {
                title: caption || "Image",
                media: image || null,
              } as { title: string; media?: any };
            },
          },
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(4)
          .custom((images) => {
            if (!Array.isArray(images)) return true;
            const selected = images.filter(
              (it) => (it as any)?.preview === true
            ).length;
            if (selected > 1)
              return "Only one image can be selected as the preview.";
            return true;
          }),
    }),
    defineField({
      name: "showBottomBorder",
      title: "Show bottom border",
      type: "boolean",
      description: "Display a bottom border under this section.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { header: "header", images: "images" },
    prepare({ header, images }) {
      const count = Array.isArray(images) ? images.length : 0;
      const selected = Array.isArray(images)
        ? images.find((it: any) => it?.preview)
        : null;
      const first = Array.isArray(images) ? images[0] : null;
      const media = (selected?.image || first?.image) ?? null;
      return {
        title: header || "Blog Images",
        subtitle: `${count} image${count === 1 ? "" : "s"}`,
        media,
      } as { title: string; subtitle?: string; media?: any };
    },
  },
});
