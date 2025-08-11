import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description:
        "Will override the global asset-level alt text managed via the Media plugin.",
      // Local alt is optional. If omitted, the frontend will fall back to the
      // global asset-level alt text managed via the Media plugin.
    }),
  ],
  options: {
    hotspot: true,
  },
  validation: (rule) =>
    rule.required().custom(async (value, context) => {
      try {
        const assetRef = (value as any)?.asset?._ref;
        if (!assetRef) return true;
        const client =
          (context as any).getClient?.({ apiVersion: "2024-05-01" }) ??
          (context as any).getClient?.();
        if (!client) return true;
        const asset = await client.fetch(`*[_id == $id][0]{ altText }`, {
          id: assetRef,
        });
        if (!asset?.altText) {
          return "This image's asset is missing global alt text. Open Media and set Alt text on the asset.";
        }
        return true;
      } catch (_) {
        return true;
      }
    }),
  preview: {
    select: {
      alt: "alt",
      image: "image",
    },
    prepare({ alt, image }) {
      return {
        media: image ?? null,
      };
    },
  },
});
