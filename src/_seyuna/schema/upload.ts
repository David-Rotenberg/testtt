// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { mimeType, sizeString, slug } from './primitives.js';

export const uploadAccess = z.enum(['public', 'authenticated', 'owner-only', 'shared']);
export type UploadAccess = z.infer<typeof uploadAccess>;

export const uploadTransform = z.enum(['raw', 'cloudflare-images', 'cloudflare-stream']);
export type UploadTransform = z.infer<typeof uploadTransform>;

export const upload = z.object({
  name: slug,
  maxSize: sizeString.default('5MB'),
  allowedTypes: z.array(mimeType).default(['*/*']),
  transform: uploadTransform.default('raw'),
  access: uploadAccess.default('owner-only'),
});
export type Upload = z.infer<typeof upload>;
