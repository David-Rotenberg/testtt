// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
import type { ActionContext, ActionHandler, ActionSpec, Session } from '../types.js';

export interface ServerActionRoute {
  /** Path under `/api/actions/`, e.g. `'createTask'` registered at `/api/actions/createTask`. */
  name: string;
  /** Hono-compatible handler: `(c) => Response | Promise<Response>`. */
  fetch: (req: Request, env: Record<string, unknown>, session: Session | null) => Promise<Response>;
}

/**
 * Wrap a typed `ActionSpec` + handler into a route handler the emitted Hono app mounts at
 * `/api/actions/<name>`. The generator's `hono` emitter calls `serverAction(...)` once per
 * `project.actions[*]` and registers the returned route.
 *
 * Errors thrown by the handler become 400 responses with `{ error: string }`. Auth failures
 * surface as 401. Schema-validation failures surface as 400 with the Zod issue list.
 */
export function serverAction<I, O>(
  spec: ActionSpec<I, O>,
  handler: ActionHandler<I, O>,
): ServerActionRoute {
  return {
    name: spec.name,
    async fetch(req, env, session): Promise<Response> {
      const raw = req.method === 'POST' ? await safeJson(req) : {};
      let input: I;
      try {
        input = spec.parseInput(raw);
      } catch (err) {
        return jsonError(400, 'invalid_input', err);
      }

      const ctx: ActionContext = { session, env, request: req };
      try {
        const result = await handler(input, ctx);
        const output = spec.parseOutput ? spec.parseOutput(result) : result;
        return Response.json({ ok: true, data: output });
      } catch (err) {
        if (err instanceof ActionError) {
          return jsonError(err.status, err.code, err);
        }
        return jsonError(500, 'internal_error', err);
      }
    },
  };
}

/** Throw from an action handler to return a non-200 response with a stable code. */
export class ActionError extends Error {
  override readonly name = 'ActionError';
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

async function safeJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

function jsonError(status: number, code: string, err: unknown): Response {
  const message = err instanceof Error ? err.message : String(err);
  return Response.json({ ok: false, error: { code, message } }, { status });
}
