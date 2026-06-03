// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { authLevel, camelCase, fieldType, pascalCase } from './primitives.js';

export const inputField = z.object({
  type: fieldType,
  required: z.boolean().default(true),
  ref: pascalCase.optional(),
  values: z.array(z.string()).optional(),
});

export const dbInsertEffect = z.object({
  kind: z.literal('db.insert'),
  model: pascalCase,
  /** mapping from input fields to model fields; if omitted, names match */
  map: z.record(z.string(), z.string()).optional(),
});

export const dbUpdateEffect = z.object({
  kind: z.literal('db.update'),
  model: pascalCase,
  where: z.record(z.string(), z.string()).default({ id: 'input.id' }),
  map: z.record(z.string(), z.string()).optional(),
});

export const dbDeleteEffect = z.object({
  kind: z.literal('db.delete'),
  model: pascalCase,
  where: z.record(z.string(), z.string()).default({ id: 'input.id' }),
});

export const dbQueryEffect = z.object({
  kind: z.literal('db.query'),
  model: pascalCase,
  where: z.record(z.string(), z.string()).optional(),
  limit: z.number().int().positive().optional(),
  orderBy: z.array(z.string()).optional(),
});

export const aiGenerateEffect = z.object({
  kind: z.literal('ai.generate'),
  prompt: z.string(),
  /** which AI provider to use */
  provider: z.enum(['workers-ai', 'anthropic', 'openai']).default('workers-ai'),
  model: z.string().optional(),
});

export const httpFetchEffect = z.object({
  kind: z.literal('http.fetch'),
  url: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('GET'),
  headers: z.record(z.string(), z.string()).optional(),
  /** secret name to include as Authorization */
  authSecret: z.string().optional(),
});

export const customEffect = z.object({
  kind: z.literal('custom'),
  /** path within the project to a hand-written function */
  module: z.string(),
});

export const effect = z.discriminatedUnion('kind', [
  dbInsertEffect,
  dbUpdateEffect,
  dbDeleteEffect,
  dbQueryEffect,
  aiGenerateEffect,
  httpFetchEffect,
  customEffect,
]);
export type Effect = z.infer<typeof effect>;

export const emailTrigger = z.object({
  to: z.string(),
  template: z.string(),
  data: z.record(z.string(), z.string()).optional(),
});

export const notificationTrigger = z.object({
  name: z.string(),
  to: z.string(),
  data: z.record(z.string(), z.string()).optional(),
});

export const action = z.object({
  name: camelCase,
  description: z.string().optional(),
  input: z.record(z.string(), inputField).default({}),
  output: z.record(z.string(), inputField).optional(),
  auth: authLevel.default('required'),
  rateLimit: z
    .object({
      requests: z.number().int().positive(),
      windowSeconds: z.number().int().positive(),
    })
    .optional(),
  effect,
  emails: z.array(emailTrigger).default([]),
  notifications: z.array(notificationTrigger).default([]),
});
export type Action = z.infer<typeof action>;
