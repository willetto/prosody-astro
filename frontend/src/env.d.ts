/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.svg?url" {
  const src: string;
  export default src;
}
