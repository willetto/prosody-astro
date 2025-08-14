import { createClient } from "@sanity/client";
import type { Hero } from ".";

// Use variables defined in `astro.config.mjs` env schema
const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = "2024-01-01";

export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
});

export async function fetchHeroByType(
  type: "hero1" | "hero2"
): Promise<Hero | null> {
  const query = `*[_type == $type][0]{
    _type,
    header,
    subheader,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    image{ asset, alt }
  }`;
  try {
    const result = await sanityClient.fetch(query, { type });
    console.debug("[Sanity] fetchHeroByType result:", {
      hasImage: !!result?.image?.asset?._ref,
      hasResult: !!result,
      type,
    });
    return result;
  } catch (err: any) {
    console.error("[Sanity] fetchHeroByType error:", type, err?.message || err);
    return null;
  }
}
