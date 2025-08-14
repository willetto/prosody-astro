// UPDATE ICON LIST IN STUDIO SCHEMA TYPES ALSO:
// studio/schema-types/allowed-icons.ts

export const ALLOWED_ICONS = [
  "brain-circuit",
  "pencil-ruler",
  "heart-handshake",
  "handshake",
  "map-pinned",
  "brush-cleaning",
  "award",
  "shield-check",
  "lock-keyhole",
  "hat-glasses",
  "flask-conical",
  "activity",
  "gauge",
  "image-up",
  "wand-sparkles",
  "film",
  "hand-platter",
  "cable",
  "send",
  "sprout",
  "scroll-text",
  "app-window",
  "party-popper",
  "star",
  "library-big",
  "earth",
  "palette",
  "tablet-smartphone",
] as const;
export type AllowedIcon = (typeof ALLOWED_ICONS)[number];
