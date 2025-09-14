export const HERO_FIELDS = `
  _type,
  header,
  subheader,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  image {
    asset,
    "assetAltText": asset->altText,
    alt
  }
`;

export const FEATURE1_FIELDS = `
  _type,
  header,
  subheading,
  codeTabs[] {
    id,
    label,
    icon {
      asset,
      "assetUrl": asset->url,
      alt
    },
    language,
    code
  }
`;

export const FEATURE2_FIELDS = `
  _type,
  header,
  subheading,
  features[] {
    id,
    title,
    description,
    icon
  }
`;

export const FEATURE3_FIELDS = `
  _type,
  header,
  subheading,
  image {
    asset,
    "assetAltText": asset->altText,
    alt
  }
`;

export const FEATURE4_FIELDS = `
  _type,
  header,
  subheading,
  firstFeature {
    icon,
    title,
    description,
    ctaLabel,
    ctaHref,
    imagePosition,
    image {
      asset,
      "assetAltText": asset->altText,
      alt
    }
  }
`;

export const FEATURE5_FIELDS = `
  _type,
  header,
  subheading
`;

export const FEATURE6_FIELDS = `
  _type,
  header,
  subheading,
  codeTabs[] {
    id,
    label,
    language,
    code
  }
`;

export const FEATURE7_FIELDS = `
  _type,
  header,
  subheading,
  features[] {
    id,
    title,
    description,
    icon
  }
`;

export const TESTIMONIAL1_FIELDS = `
  _type,
  header,
  testimonials[]-> {
    _id,
    testimony,
    name,
    nameLink,
    jobTitle,
    company,
    companyLink
  }
`;

export const TESTIMONIAL2_FIELDS = `
  _type,
  testimonials[]-> {
    _id,
    testimony,
    name,
    nameLink,
    jobTitle,
    company,
    companyLink
  }
`;

// Shared fields for UI Image objects
export const UI_LOGO_IMAGE_FIELDS = `
  image {
    asset,
    "assetAltText": asset->altText,
    alt
  },
  iconTitle,
  class,
  loading
`;

export const LOGO_CLOUD1_FIELDS = `
  _type,
  images[] {
    ${UI_LOGO_IMAGE_FIELDS}
  }
`;

export const LOGO_CLOUD2_FIELDS = `
  _type,
  header,
  images[] {
    ${UI_LOGO_IMAGE_FIELDS}
  }
`;

export const LOGO_CLOUD3_FIELDS = `
  _type,
  images[] {
    ${UI_LOGO_IMAGE_FIELDS}
  }
`;

export const RICH_TEXT_FIELDS = `
  _type,
  header,
  content,
  showBottomBorder
`;

export const BLOG_IMAGES_FIELDS = `
  _type,
  header,
  images[] {
    image {
      asset,
      "assetAltText": asset->altText,
      alt
    },
    caption
  },
  showBottomBorder
`;

export const CTA1_FIELDS = `
  _type,
  header,
  subheading,
  ctaLabel,
  ctaHref,
  alignment
`;

export const CONTACT_FORM_FIELDS = `
  _type,
  header,
  subheading,
  backgroundImage {
    asset,
    "assetAltText": asset->altText,
    alt
  },
  desaturateImage,
  successMessage
`;

export const PROJECT_LISTINGS_FIELDS = `
  _type,
  items[] {
    caseStudy-> {
      _id,
      title,
      "slug": slug.current,
      socialImage {
        asset,
        "assetAltText": asset->altText,
        alt
      },
      listingDescription,
      listingCtaLabel,
      listingBadges
    },
  }
`;

export const ALL_SECTION_FIELDS = `
  _type,
  ${HERO_FIELDS},
  ${FEATURE1_FIELDS},
  ${FEATURE2_FIELDS},
  ${FEATURE3_FIELDS},
  ${FEATURE4_FIELDS},
  ${FEATURE5_FIELDS},
  ${FEATURE6_FIELDS},
  ${FEATURE7_FIELDS},
  ${TESTIMONIAL1_FIELDS},
  ${TESTIMONIAL2_FIELDS},
  ${LOGO_CLOUD1_FIELDS},
  ${LOGO_CLOUD2_FIELDS},
  ${LOGO_CLOUD3_FIELDS},
  ${RICH_TEXT_FIELDS},
  ${BLOG_IMAGES_FIELDS},
  ${CTA1_FIELDS},
  ${CONTACT_FORM_FIELDS},
  ${PROJECT_LISTINGS_FIELDS}
`;

// Case Study documents
export const CASE_STUDY_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  socialImage {
    asset,
    "assetAltText": asset->altText,
    alt
  }
`;

export const CASE_STUDY_DETAIL_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  socialImage {
    asset,
    "assetAltText": asset->altText,
    alt
  },
  highlightedImage {
    asset,
    "assetAltText": asset->altText,
    alt
  },
  websiteLink,
  metafields[] {
    name,
    value
  },
  sections[] {
    ${ALL_SECTION_FIELDS}
  }
`;

export const CASE_STUDY_LIST_QUERY = `
  *[_type == "caseStudy"] | order(title asc) {
    ${CASE_STUDY_LIST_FIELDS}
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    ${CASE_STUDY_DETAIL_FIELDS}
  }
`;

// Site Settings Navigation
export const SITE_SETTINGS_NAV_FIELDS = `
  mainNav[] {
    label,
    component,
    inlineLinkOptions {
      target,
      rel,
      title,
      variant,
      hoverColor,
      weight,
      hideUnderline,
      class,
      ariaLabel
    },
    linkOptions {
      variant,
      size,
      gap,
      rel,
      target,
      ariaLabel,
      class
    },
    "page": page-> {
      "slug": slug.current,
      title
    }
  }
`;

export const SITE_SETTINGS_NAV_QUERY = `
  *[_type == "siteSettings"][0] {
    ${SITE_SETTINGS_NAV_FIELDS}
  }
`;

// Site Settings: Favicon
export const SITE_SETTINGS_FAVICON_FIELDS = `
  favicon {
    asset,
    "assetUrl": asset->url,
    "assetMimeType": asset->mimeType,
    "assetExt": asset->extension,
    alt
  }
`;

export const SITE_SETTINGS_FAVICON_QUERY = `
  *[_type == "siteSettings"][0] {
    ${SITE_SETTINGS_FAVICON_FIELDS}
  }
`;

// Pages
export const PAGE_SECTION_FIELDS = `
  sections[] {
    ${ALL_SECTION_FIELDS}
  }
`;

export const PAGE_LIST_QUERY = `
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const PAGE_BY_SLUG_QUERY = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    ${PAGE_SECTION_FIELDS}
  }
`;
