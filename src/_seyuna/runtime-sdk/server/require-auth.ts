// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
import type { AuthLevel, Session } from '../types.js';

/**
 * Reject the request unless the caller meets `level`. The generated app's middleware
 * resolves `Session` from Better Auth and stashes it on the Hono context as `c.var.session`
 * before calling this. Phase 1 treats `'admin'` as "session exists AND `user.email` is in
 * the `ADMIN_EMAILS` env var" — primitive but explicit.
 *
 * Throws `AuthError` so the route's onError handler can return 401/403. Returns the
 * session on success, narrowed to `Session` (non-null) by the throw path.
 */
export function requireAuth(
  session: Session | null,
  level: AuthLevel,
  env: { ADMIN_EMAILS?: string } = {},
): Session {
  if (level === 'none') {
    return session ?? anonymousSession();
  }
  if (level === 'optional') {
    return session ?? anonymousSession();
  }
  if (!session) {
    throw new AuthError(401, 'unauthorized', 'Authentication required.');
  }
  if (level === 'admin') {
    const allowed = (env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!allowed.includes(session.user.email)) {
      throw new AuthError(403, 'forbidden', 'Admin access required.');
    }
  }
  return session;
}

export class AuthError extends Error {
  override readonly name = 'AuthError';
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

function anonymousSession(): Session {
  return {
    id: 'anonymous',
    token: '',
    user: { id: 'anonymous', email: '', name: 'Guest' },
  };
}
