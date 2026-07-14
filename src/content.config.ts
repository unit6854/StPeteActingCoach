import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog / resources posts authored through Decap CMS (markdown in src/content/resources)
const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // used as the meta description — keep 150-160 chars
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    featuredImage: z.string().optional(), // /images/... path
    imageAlt: z.string().optional(), // required at the CMS level for accessibility/SEO
    draft: z.boolean().default(false),
  }),
});

export const collections = { resources };
