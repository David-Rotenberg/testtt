// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
/**
 * Runtime SDK — what every generated user app imports.
 *
 * Subpath exports keep client code out of server bundles:
 *   - `@seyuna/runtime-sdk/server` — Hono helpers, webhook verifiers, RLS, requireAuth
 *   - `@seyuna/runtime-sdk/client` — React 19 hooks (useAction, useData, useUpload, useSession)
 *   - `@seyuna/runtime-sdk`        — shared types (this file)
 *
 * Client bundle budget: < 5KB gzipped, enforced in CI in Phase 2.
 */

export const RUNTIME_VERSION = 'seyuna.v0.1' as const;

export type {
  ActionContext,
  ActionHandler,
  ActionSpec,
  AuthLevel,
  FieldType,
  RlsPolicy,
  Session,
  WebhookVerification,
} from './types.js';
