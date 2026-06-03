// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { camelCase, fieldType, pascalCase } from './primitives.js';

export const field = z.object({
  name: camelCase,
  type: fieldType,
  required: z.boolean().default(true),
  unique: z.boolean().default(false),
  default: z.unknown().optional(),
  /** for type === 'ref' */
  ref: pascalCase.optional(),
  /** for type === 'enum' */
  values: z.array(z.string()).optional(),
  /** indexed for search/lookups */
  indexed: z.boolean().default(false),
});
export type Field = z.infer<typeof field>;

export const relation = z.object({
  name: camelCase,
  kind: z.enum(['hasMany', 'hasOne', 'belongsTo', 'manyToMany']),
  target: pascalCase,
  through: pascalCase.optional(),
  foreignKey: camelCase.optional(),
});

const access = z.enum(['anyone', 'authenticated', 'owner', 'org-members', 'admin', 'never']);

export const rowLevelPolicy = z.object({
  /** which user can read */
  read: access.default('owner'),
  /** which user can write (create/update) */
  write: access.default('owner'),
  /** which user can delete */
  delete: access.default('owner'),
  /** field that holds the owner reference */
  ownerField: camelCase.default('userId'),
});

const defaultRls = {
  read: 'owner',
  write: 'owner',
  delete: 'owner',
  ownerField: 'userId',
} as const;

export const model = z.object({
  name: pascalCase,
  description: z.string().optional(),
  fields: z.array(field).min(1),
  relations: z.array(relation).default([]),
  rls: rowLevelPolicy.default(defaultRls),
  /** include createdAt/updatedAt automatically */
  timestamps: z.boolean().default(true),
});
export type Model = z.infer<typeof model>;
