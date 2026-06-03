// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
import type { AuthLevel, FieldType } from '@seyuna/schema';

export type { AuthLevel, FieldType };

/** Authenticated session as returned by Better Auth on the API. */
export interface Session {
  id: string;
  token: string;
  user: { id: string; email: string; name: string };
}

/** Row-level security policy for `applyRls`. Phase 1: filter rows by a single owner field. */
export interface RlsPolicy {
  /** Name of the field on `row` that stores the owner's user id. */
  ownerField: string;
  /** If `true`, an unauthenticated session sees no rows. Defaults to `true`. */
  denyAnonymous?: boolean;
}

/**
 * Spec for a server action — what input it expects and what output it returns.
 * The generator emits one of these per `project.actions[*]`. The client `useAction`
 * hook reads the spec name to know which endpoint to call.
 */
export interface ActionSpec<I, O> {
  name: string;
  parseInput: (raw: unknown) => I;
  parseOutput?: (raw: unknown) => O;
}

export type ActionHandler<I, O> = (input: I, ctx: ActionContext) => Promise<O> | O;

/**
 * Subset of the Hono context exposed to action handlers. The full context is available
 * inside the emitted route, but actions receive this trimmed view to keep the API surface
 * portable when we add other server runtimes.
 */
export interface ActionContext {
  session: Session | null;
  env: Record<string, unknown>;
  request: Request;
}

/** Verification scheme for an incoming webhook. */
export type WebhookVerification =
  | 'stripe-signature'
  | 'github-signature'
  | 'resend-signature'
  | 'slack-signature'
  | 'hmac-sha256';
