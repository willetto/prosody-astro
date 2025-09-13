import { createClient } from "@sanity/client";
import type { Hero } from ".";
import {
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_LIST_QUERY,
  SITE_SETTINGS_NAV_QUERY,
  SITE_SETTINGS_FAVICON_QUERY,
  PAGE_LIST_QUERY,
  PAGE_BY_SLUG_QUERY,
} from "./groq";
import type { SiteSettingsNav, SiteNavItem, Section } from ".";

// Minimal, linter-safe logging helpers (no-op in production)
const debugLog: (message: string, detail?: unknown) => void = () => {};
const errorLog: (message: string, detail?: unknown) => void = () => {};

// Use variables defined in `astro.config.mjs` env schema
const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || "production";
const apiVersion = "2025-02-19";

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
  highlightedImage?: {
    asset?: { _ref?: string };
    alt?: string;
    assetAltText?: string;
  };
  metafields?: Array<{
    name?: string;
    value?: unknown[];
  }>;
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

export type PageListItem = {
  _id: string;
  title: string;
  slug: string;
};

export type PageDetail = {
  _id: string;
  title: string;
  slug: string;
  sections?: Section[];
};

export async function fetchAllPages(): Promise<PageListItem[]> {
  try {
    const result = await sanityClient.fetch<PageListItem[]>(PAGE_LIST_QUERY);
    return Array.isArray(result) ? result.filter((r) => Boolean(r.slug)) : [];
  } catch {
    return [];
  }
}

export async function fetchPageBySlug(
  slug: string
): Promise<PageDetail | null> {
  try {
    const result = await sanityClient.fetch<PageDetail>(PAGE_BY_SLUG_QUERY, {
      slug,
    });
    return result ?? null;
  } catch {
    return null;
  }
}

export type ResolvedNavItem = {
  title: string;
  href: string;
  component: "InlineLink" | "Link";
  inlineLinkOptions?: import(".").InlineLinkOptions;
  linkOptions?: import(".").LinkOptions;
};

export async function fetchSiteSettingsNavigation(): Promise<
  ResolvedNavItem[]
> {
  try {
    const raw = await sanityClient.fetch<SiteSettingsNav | null>(
      SITE_SETTINGS_NAV_QUERY
    );
    const items = (raw?.mainNav || []) as SiteNavItem[];
    const normalized: ResolvedNavItem[] = items
      .map((item) => {
        const pageSlug = item?.page?.slug;
        const href = pageSlug ? `/${pageSlug}` : "";
        if (!href) return null;
        const title = item?.label || item?.page?.title || href;
        const component = item?.component === "Link" ? "Link" : "InlineLink";

        // Defaults to match Navigation.astro current selections
        const defaultInline: import(".").InlineLinkOptions = {
          hideUnderline: true,
          hoverColor: "blue",
          target: "_self",
          variant: "textSM",
          weight: "light",
        };
        const defaultLink: import(".").LinkOptions = {
          size: "sm",
          variant: "muted",
        };

        const inlineLinkOptions = {
          ...defaultInline,
          ...(item?.inlineLinkOptions || {}),
        };
        const linkOptions = { ...defaultLink, ...(item?.linkOptions || {}) };

        return {
          component,
          href,
          inlineLinkOptions,
          linkOptions,
          title,
        } satisfies ResolvedNavItem;
      })
      .filter(Boolean) as ResolvedNavItem[];
    return normalized;
  } catch {
    return [];
  }
}

export type SiteFavicon = {
  favicon?: {
    asset?: { _ref?: string };
    assetUrl?: string;
    assetMimeType?: string;
    assetExt?: string;
    alt?: string;
  };
};

export async function fetchSiteFavicon(): Promise<SiteFavicon | null> {
  try {
    const result = await sanityClient.fetch<SiteFavicon | null>(
      SITE_SETTINGS_FAVICON_QUERY
    );
    return result ?? null;
  } catch {
    return null;
  }
}
