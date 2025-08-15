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

export type Hero = {
  _type: "hero1" | "hero2";
  header?: string;
  subheader?: any[]; // Portable Text blocks
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

export type Section = Hero | Testimonial1Section | Testimonial2Section;
