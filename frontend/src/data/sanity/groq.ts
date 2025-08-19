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
    icon {
      asset,
      "assetUrl": asset->url,
      alt
    },
    title,
    subheading,
    ctaLabel,
    ctaHref
  },
  secondFeature {
    icon {
      asset,
      "assetUrl": asset->url,
      alt
    },
    title,
    subheading,
    ctaLabel,
    ctaHref
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
  content
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
  ${RICH_TEXT_FIELDS}
`;
