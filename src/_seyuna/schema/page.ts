// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { block } from './block.js';
import { authLevel, path } from './primitives.js';

export const layout = z.enum(['marketing', 'app', 'auth', 'dashboard', 'docs', 'minimal']);
export type Layout = z.infer<typeof layout>;

export const page = z.object({
  path,
  title: z.string().min(1),
  description: z.string().optional(),
  layout: layout.default('app'),
  auth: authLevel.default('none'),
  /** dynamic route segments e.g. ["id", "slug"] for /tasks/[id] */
  params: z.array(z.string()).default([]),
  blocks: z.array(block).default([]),
  /** SEO + OG */
  seo: z
    .object({
      noindex: z.boolean().default(false),
      ogImage: z.string().optional(),
    })
    .default({ noindex: false }),
});
export type Page = z.infer<typeof page>;
