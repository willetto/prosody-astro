import { createClient } from "@sanity/client";
import type { Hero } from ".";
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDY_LIST_QUERY } from "./groq";

// Minimal, linter-safe logging helpers (no-op in production)
const debugLog: (message: string, detail?: unknown) => void = () => {};
const errorLog: (message: string, detail?: unknown) => void = () => {};

// Use variables defined in `astro.config.mjs` env schema
const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = "2025-08-19";

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
    const hasImage = Boolean(
      (result as { image?: { asset?: { _ref?: string } } } | null | undefined)
        ?.image?.asset?._ref
    );
    debugLog("[Sanity] fetchHeroByType result:", {
      hasImage,
      hasResult: Boolean(result),
      type,
    });
    return result;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("[Sanity] fetchHeroByType error:", { message, type });
    return null;
  }
}

export type CaseStudyListItem = {
  _id: string;
  title: string;
  slug: string;
  socialImage?: {
    asset?: { _ref?: string };
    alt?: string;
    assetAltText?: string;
  };
};

export type CaseStudyDetail = {
  _id: string;
  title: string;
  slug: string;
  socialImage?: {
    asset?: { _ref?: string };
    alt?: string;
    assetAltText?: string;
  };
  sections?: import(".").Section[];
};

export async function fetchAllCaseStudies(): Promise<CaseStudyListItem[]> {
  try {
    debugLog("[Sanity] fetchAllCaseStudies query:", CASE_STUDY_LIST_QUERY);
    const result = await sanityClient.fetch<CaseStudyListItem[]>(
      CASE_STUDY_LIST_QUERY
    );
    debugLog(
      "[Sanity] fetchAllCaseStudies result count:",
      Array.isArray(result) ? result.length : 0
    );
    if (Array.isArray(result)) {
      debugLog(
        "[Sanity] fetchAllCaseStudies slugs:",
        result.map((r) => r.slug)
      );
    }
    return Array.isArray(result) ? result : [];
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("[Sanity] fetchAllCaseStudies error:", message);
    return [];
  }
}

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<CaseStudyDetail | null> {
  try {
    debugLog("[Sanity] fetchCaseStudyBySlug query:", CASE_STUDY_BY_SLUG_QUERY);
    debugLog("[Sanity] fetchCaseStudyBySlug params:", { slug });
    const result = await sanityClient.fetch<CaseStudyDetail>(
      CASE_STUDY_BY_SLUG_QUERY,
      { slug }
    );
    debugLog(
      "[Sanity] fetchCaseStudyBySlug found:",
      result ? { id: result._id, slug: result.slug, title: result.title } : null
    );
    return result ?? null;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    errorLog("[Sanity] fetchCaseStudyBySlug error:", { message, slug });
    return null;
  }
}
