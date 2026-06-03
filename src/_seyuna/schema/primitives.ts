// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';

export const slug = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z][a-z0-9-]*$/, 'must be kebab-case starting with a letter');

export const camelCase = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z][a-zA-Z0-9]*$/, 'must be camelCase');

export const pascalCase = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[A-Z][a-zA-Z0-9]*$/, 'must be PascalCase');

export const path = z
  .string()
  .min(1)
  .startsWith('/', 'paths must start with /')
  .regex(/^\/[a-zA-Z0-9\-_/[\]]*$/, 'invalid path characters');

export const cron = z
  .string()
  .regex(/^(\S+\s+){4}\S+$/, 'must be a 5-field cron expression (minute hour day month weekday)');

export const sizeString = z
  .string()
  .regex(/^\d+(B|KB|MB|GB)$/, 'must be a size like "5MB" or "100KB"');

export const mimeType = z
  .string()
  .regex(/^[a-z]+\/[\w\-+.]+$|^[a-z]+\/\*$/, 'must be a valid MIME type');

export const fieldType = z.enum([
  'id',
  'string',
  'text',
  'integer',
  'float',
  'boolean',
  'date',
  'datetime',
  'json',
  'ref',
  'enum',
]);
export type FieldType = z.infer<typeof fieldType>;

export const authLevel = z.enum(['none', 'optional', 'required', 'admin']);
export type AuthLevel = z.infer<typeof authLevel>;
