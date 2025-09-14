export type UiButton = {
  _type: "uiButton";
  label: string;
  variant?: "default" | "accent" | "muted";
  size?: "xs" | "sm" | "base" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "base" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  onlyIconSize?: "xs" | "sm" | "md" | "lg";
  ariaLabel?: string;
  class?: string;
};

export type UiLink = {
  _type: "uiLink";
  label: string;
  href: string;
  variant?: "default" | "accent" | "muted" | "link";
  size?: "xxs" | "xs" | "sm" | "base" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "base" | "md" | "lg";
  rel?: string;
  target?: "" | "_blank" | "_parent" | "_self" | "_top";
  ariaLabel?: string;
  class?: string;
};

export type UiText = {
  _type: "uiText";
  text: string;
  variant?:
    | "display6XL"
    | "display5XL"
    | "display4XL"
    | "display3XL"
    | "display2XL"
    | "displayXL"
    | "displayLG"
    | "displayMD"
    | "displaySM"
    | "displayXS"
    | "textXL"
    | "textLG"
    | "textBase"
    | "textSM"
    | "textXS";
  tag?:
    | "a"
    | "p"
    | "em"
    | "span"
    | "small"
    | "strong"
    | "blockquote"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  id?: string;
  rel?: string;
  style?: string;
  target?: string;
  href?: string;
  title?: string;
  class?: string;
  ariaLabel?: string;
};

export type UiShareButtons = {
  _type: "uiShareButtons";
  url?: string;
  title?: string;
  description?: string;
  contentType?: "blog" | "generic";
};

export type UiImage = {
  _type: "uiImage";
  image: {
    asset: { _ref: string };
    alt?: string;
  };
  width?: number;
  height?: number;
  class?: string;
  loading?: "lazy" | "eager";
};

export type UiElement = UiButton | UiLink | UiText | UiShareButtons | UiImage;

// Portable Text type for better type safety
export type PortableTextBlock = {
  _type: "block";
  style?: string;
  listItem?: string;
  markDefs?: unknown[];
  children?: unknown[];
  [key: string]: unknown;
};

export type Hero = {
  _type: "hero1" | "hero2";
  header?: string;
  subheader?: PortableTextBlock[]; // Portable Text blocks
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: {
    asset: { _ref: string };
    alt?: string;
  };
};

export type Testimonial = {
  _id: string;
  testimony: string;
  name: string;
  nameLink?: string;
  jobTitle?: string;
  company?: string;
  companyLink?: string;
};

export type Testimonial1Section = {
  _type: "testimonial1";
  header?: string;
  testimonials: Testimonial[];
};

export type Testimonial2Section = {
  _type: "testimonial2";
  testimonials: Testimonial[];
};

export type ContactFormSection = {
  _type: "contactForm";
  header?: string;
  subheading?: PortableTextBlock[]; // Portable Text blocks
  backgroundImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  desaturateImage?: boolean;
  successMessage?: string;
};

export type Section =
  | Hero
  | Testimonial1Section
  | Testimonial2Section
  | ContactFormSection
  | Cta1Section
  | ProjectListingsSection
  | RichTextSection
  | BlogImagesSection;

export type ProjectListingsSection = {
  _type: "projectListings";
  items?: Array<{
    caseStudy?: {
      _id: string;
      title: string;
      slug: string;
      socialImage?: {
        asset?: { _ref?: string };
        alt?: string;
        assetAltText?: string;
      };
      listingDescription?: string;
      listingCtaLabel?: string;
      listingBadges?: string[];
    } | null;
  }>;
};

export type Cta1Section = {
  _type: "cta1";
  header?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  alignment?: "center" | "left";
};

export type RichTextSection = {
  _type: "richText";
  header?: string;
  content?: PortableTextBlock[];
  showBottomBorder?: boolean;
};

export type BlogImagesSection = {
  _type: "blogImages";
  header?: string;
  images?: Array<{
    image?: {
      asset?: { _ref?: string };
      alt?: string;
      assetAltText?: string;
    };
    caption?: string;
  }>;
  showBottomBorder?: boolean;
};

// Navigation types from Site Settings
export type InlineLinkOptions = {
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
  title?: string;
  variant?:
    | "display6XL"
    | "display5XL"
    | "display4XL"
    | "display3XL"
    | "display2XL"
    | "displayXL"
    | "displayLG"
    | "displayMD"
    | "displaySM"
    | "displayXS"
    | "textXL"
    | "textLG"
    | "textBase"
    | "textSM"
    | "textXS";
  hoverColor?: "base" | "accent" | "blue" | "sand";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  hideUnderline?: boolean;
  class?: string;
  ariaLabel?: string;
};

export type LinkOptions = {
  variant?: "default" | "accent" | "muted" | "link";
  size?: "xxs" | "xs" | "sm" | "base" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "base" | "md" | "lg";
  rel?: string;
  target?: "" | "_blank" | "_parent" | "_self" | "_top";
  ariaLabel?: string;
  class?: string;
};

export type SiteNavItem = {
  label?: string;
  component?: "InlineLink" | "Link";
  page?: { slug?: string; title?: string } | null;
  inlineLinkOptions?: InlineLinkOptions;
  linkOptions?: LinkOptions;
};

export type SiteSettingsNav = {
  mainNav?: SiteNavItem[];
};
