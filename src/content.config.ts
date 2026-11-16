import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    outcome: z.string(),
    services: z.array(z.string()),
    year: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    business: z.string(),
    location: z.string().default('Gujarat, India'),
  }),
});

export const collections = {
  work,
  testimonials,
};
