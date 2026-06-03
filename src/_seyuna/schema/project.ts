// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';
import { action } from './action.js';
import {
  aiProvider,
  defaultAiProvider,
  defaultStorage,
  integrationId,
  storage,
} from './integration.js';
import { model } from './model.js';
import { notification } from './notification.js';
import { page } from './page.js';
import { slug } from './primitives.js';
import { scheduled } from './scheduled.js';
import { upload } from './upload.js';
import { SCHEMA_VERSION } from './version.js';
import { webhook } from './webhook.js';

/** Authentication providers a generated app exposes on its sign-in / sign-up flow. */
export const authProvider = z.enum([
  'email',
  'magic-link',
  'passkey',
  'google',
  'github',
  'apple',
  'microsoft',
  'slack',
]);
export type AuthProvider = z.infer<typeof authProvider>;

export const projectAuth = z.object({
  providers: z
    .array(authProvider)
    .min(1)
    .default(() => ['email'] as AuthProvider[]),
  requireEmailVerification: z.boolean().default(false),
});
export type ProjectAuth = z.infer<typeof projectAuth>;

/** Plan tier — used to feature-gate and size limits in the generated app's wrangler config. */
export const runtimeTier = z.enum(['free', 'hobby', 'pro', 'team']);
export type RuntimeTier = z.infer<typeof runtimeTier>;

export const projectRuntime = z.object({
  tier: runtimeTier.default('free'),
  /**
   * KV namespace id for the app cache (`CACHE` binding). Defaults to undefined so
   * `wrangler` auto-provisions a per-tenant namespace on first deploy — works for
   * exported tenants. Override to a shared namespace id (with `t:<tenant>:` key
   * prefixes) when Seyuna hosts the tenant; one CACHE namespace per CF shard then
   * serves all tenants on that shard, bypassing the ~1000-namespace-per-account cap.
   */
  cacheKvId: z.string().optional(),
  /**
   * KV namespace id for Astro's session store (`SESSION` binding). Same rationale
   * and override pattern as `cacheKvId`. Astro's @astrojs/cloudflare adapter merges
   * the binding by name, so setting an id here propagates through `astro build`.
   */
  sessionKvId: z.string().optional(),
});
export type ProjectRuntime = z.infer<typeof projectRuntime>;

/** D1 / R2 location hint. `auto` = Cloudflare picks. */
export const projectRegion = z.enum(['auto', 'wnam', 'enam', 'weur', 'eeur', 'apac', 'oc']);
export type ProjectRegion = z.infer<typeof projectRegion>;

/** ISO date (YYYY-MM-DD) — pinned compatibility date for the emitted Worker. */
export const compatibilityDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'compatibilityDate must be YYYY-MM-DD');

/** Fallback baked into the schema when a project doesn't pin one explicitly. */
export const DEFAULT_COMPATIBILITY_DATE = '2026-05-01' as const;

export const project = z
  .object({
    $schema: z.literal(SCHEMA_VERSION).default(SCHEMA_VERSION),
    /** kebab-case project identifier; used for D1 db name and slug */
    id: slug,
    name: z.string().min(1).max(80),
    description: z.string().max(280).optional(),

    /** Pinned compatibility_date emitted into the generated wrangler.jsonc. */
    compatibilityDate: compatibilityDate.default(DEFAULT_COMPATIBILITY_DATE),

    /** Plan tier — sizes limits and toggles features in the generated app. */
    runtime: projectRuntime.default(() => ({ tier: 'free' as RuntimeTier })),

    /** D1 / R2 location hint. Optional — generator defaults to `auto` when absent. */
    region: projectRegion.optional(),

    /** Authentication providers exposed on the generated app's sign-in flow. */
    auth: projectAuth.default(() => ({
      providers: ['email'] as AuthProvider[],
      requireEmailVerification: false,
    })),

    pages: z.array(page).default([]),
    models: z.array(model).default([]),
    actions: z.array(action).default([]),
    webhooks: z.array(webhook).default([]),
    uploads: z.array(upload).default([]),
    notifications: z.array(notification).default([]),
    scheduled: z.array(scheduled).default([]),
    integrations: z.array(integrationId).default([]),

    storage: storage.default(defaultStorage),
    ai: aiProvider.default(defaultAiProvider),

    /** generation metadata */
    meta: z
      .object({
        createdAt: z.string().datetime().optional(),
        updatedAt: z.string().datetime().optional(),
        generator: z.string().optional(),
      })
      .default(() => ({})),
  })
  .strict();

export type Project = z.infer<typeof project>;
