// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
'use client';

import { type UseQueryResult, useQuery } from '@tanstack/react-query';

export type Where = Record<string, string | number | boolean | null>;

interface UseDataReturn<T> {
  data: T[] | undefined;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * Read rows from a generated model. Backed by TanStack Query (peer dep) so consumers
 * get caching, deduping, and revalidation for free without bundling Query into the SDK.
 *
 * The hook hits `/api/models/<model>/list` with `where` serialized as a JSON query param.
 * The generator's `hono` emitter wires that route to `db.<model>.findMany(...)` with RLS
 * applied via `applyRls(...)` before returning.
 */
export function useData<T>(model: string, where?: Where): UseDataReturn<T> {
  const result: UseQueryResult<T[], Error> = useQuery({
    queryKey: ['model', model, where ?? null],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams();
      if (where) params.set('where', JSON.stringify(where));
      const qs = params.toString();
      const res = await fetch(`/api/models/${model}/list${qs ? `?${qs}` : ''}`, {
        credentials: 'include',
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as
        | { ok: true; data: T[] }
        | { ok: false; error: { message: string } };
      if (!json.ok) throw new Error(json.error.message);
      return json.data;
    },
  });

  return {
    data: result.data,
    loading: result.isPending,
    error: result.error,
    refresh: () => {
      void result.refetch();
    },
  };
}
