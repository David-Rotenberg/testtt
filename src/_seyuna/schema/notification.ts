// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { slug } from './primitives.js';

export const channel = z.enum(['email', 'push', 'in-app', 'sms']);
export type Channel = z.infer<typeof channel>;

export const notification = z.object({
  name: slug,
  channels: z.array(channel).min(1),
  template: z.string(),
  /** field on the User model that holds preferences */
  preferenceField: z.string().optional(),
});
export type Notification = z.infer<typeof notification>;
