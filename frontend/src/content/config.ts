import { defineCollection, z } from "astro:content";

const integrations = defineCollection({
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      details: z.array(
        z.object({
          title: z.string(),
          url: z.optional(z.string()),
          value: z.string(),
        })
      ),
      email: z.string(),
      integration: z.string(),
      logo: z.object({
        alt: z.string(),
        url: image(),
      }),
      permissions: z.array(z.string()),
      tags: z.array(z.string()),
    }),
});
const helpcenter = defineCollection({
  schema: z.object({
    category: z.string().optional(),
    description: z.string(),
    faq: z
      .array(
        z.object({
          answer: z.string(),
          question: z.string(),
        })
      )
      .optional(),
    iconId: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    lastUpdated: z.string().optional(),
    page: z.string(),
  }),
});
const changelog = defineCollection({
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      image: z.object({
        alt: z.string(),
        url: image(),
      }),
      page: z.string(),
      pubDate: z.date(),
    }),
});

const infopages = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});
const team = defineCollection({
  schema: ({ image }) =>
    z.object({
      bio: z.string().optional(),
      image: z.object({
        alt: z.string(),
        url: image(),
      }),
      name: z.string(),
      role: z.string().optional(),
      socials: z
        .object({
          email: z.string().optional(),
          linkedin: z.string().optional(),
          twitter: z.string().optional(),
          website: z.string().optional(),
        })
        .optional(),
    }),
});

const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      image: z.object({
        alt: z.string(),
        url: image(),
      }),
      pubDate: z.date(),
      tags: z.array(z.string()),
      team: z.string(),
      title: z.string(),
    }),
});

export const collections = {
  changelog: changelog,
  helpcenter: helpcenter,
  infopages: infopages,
  integrations: integrations,
  posts: postsCollection,
  team: team,
};
