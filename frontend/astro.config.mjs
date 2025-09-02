/* eslint-env node */
import { defineConfig, envField } from "astro/config";
import process from "node:process";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

const SITE_URL = process.env.SITE_URL;

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: true,
  },
  prefetch: {
    defaultStrategy: "hover",
  },
  trailingSlash: "ignore",
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true,
    },
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: SITE_URL || "http://localhost:4321",
  image: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [{ protocol: "https" }],
  },
  integrations: [sitemap(), mdx()],
  env: {
    schema: {
      SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321",
      }),
      SANITY_STUDIO_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      SANITY_STUDIO_DATASET: envField.string({
        context: "client",
        access: "public",
        default: "production",
      }),
    },
  },
});
