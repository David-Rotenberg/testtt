// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { camelCase, cron, slug } from './primitives.js';

export const scheduled = z.object({
  name: slug,
  cron,
  action: camelCase,
  /** if true, use Workflows for durable multi-step execution */
  durable: z.boolean().default(false),
});
export type Scheduled = z.infer<typeof scheduled>;
