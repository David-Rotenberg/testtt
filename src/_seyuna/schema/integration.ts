// Vendored from @seyuna/schema. Do not edit — regenerate to update.
import { z } from 'zod';

export const integrationId = z.enum([
  'stripe',
  'resend',
  'google-oauth',
  'github-oauth',
  'apple-oauth',
  'microsoft-oauth',
  'slack',
  'discord',
  'notion',
  'linear',
  'airtable',
  'twilio',
  'sendgrid',
  'plaid',
  'algolia',
  'mapbox',
  'cloudflare-images',
  'cloudflare-stream',
  'cloudflare-calls',
  'cloudflare-browser-rendering',
]);
export type IntegrationId = z.infer<typeof integrationId>;

export const storage = z.object({
  /**
   * Database engine for tenant data. `turso` is the default — libsql/SQLite over HTTP,
   * provisioned via the Turso Platform API. Pivoted from D1 on 2026-05-13 to remove the
   * 50k-DBs-per-CF-account scaling ceiling (Turso supports millions of DBs per account).
   * `d1` remains as an explicit opt-in for tenants that want direct wrangler tooling.
   * `hyperdrive` is the Phase 11 BYO-Postgres escape valve.
   */
  engine: z.enum(['turso', 'd1', 'hyperdrive']).default('turso'),
  /**
   * R2 bucket name the generated app uses for uploads. Defaults to `app-<project.id>`
   * (one bucket per tenant). Override only for platform-internal purposes.
   */
  bucket: z.string().optional(),
});
export type Storage = z.infer<typeof storage>;

export const defaultStorage = { engine: 'turso' } as const;

export const aiProvider = z.object({
  provider: z.enum(['workers-ai', 'anthropic', 'openai']).default('workers-ai'),
  fallback: z.enum(['workers-ai', 'anthropic', 'openai', 'none']).default('none'),
  /** model id; if omitted, uses our default per-provider */
  model: z.string().optional(),
});
export type AiProvider = z.infer<typeof aiProvider>;

export const defaultAiProvider = { provider: 'workers-ai', fallback: 'none' } as const;
