// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { camelCase, path } from './primitives.js';

export const verification = z.enum([
  'stripe-signature',
  'github-signature',
  'resend-signature',
  'slack-signature',
  'svix-signature',
  'hmac-sha256',
  'none',
]);
export type Verification = z.infer<typeof verification>;

export const webhook = z.object({
  path,
  verify: verification.default('none'),
  /** name of secret holding the signing key */
  secret: z.string().optional(),
  /** action to dispatch */
  action: camelCase,
  /** make this idempotent based on a header value */
  idempotencyHeader: z.string().optional(),
});
export type Webhook = z.infer<typeof webhook>;
