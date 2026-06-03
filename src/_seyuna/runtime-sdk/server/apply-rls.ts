// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
import type { RlsPolicy, Session } from '../types.js';

/**
 * Filter a row set down to what the current `session` is allowed to see.
 *
 * Phase 1 implements the simplest useful policy: ownership matching on a single field.
 * Phase 5 expands this to D1 row filters (pushed down to SQL) and richer policies like
 * org membership, role-based read scopes, and field-level masking.
 *
 * The generator's `hono` emitter calls `applyRls(rows, session, policy)` immediately after
 * a model `list`/`get` query, before returning the response. Mutations enforce the same
 * policy at write time inside `serverAction(...)`.
 */
export function applyRls<T extends Record<string, unknown>>(
  rows: T[],
  session: Session | null,
  policy: RlsPolicy,
): T[] {
  const denyAnonymous = policy.denyAnonymous ?? true;
  if (!session || session.user.id === 'anonymous') {
    return denyAnonymous ? [] : rows;
  }
  const ownerId = session.user.id;
  return rows.filter((row) => row[policy.ownerField] === ownerId);
}
