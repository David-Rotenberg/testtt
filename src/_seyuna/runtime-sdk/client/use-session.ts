// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
'use client';

import { useQuery } from '@tanstack/react-query';
import type { Session } from '../types.js';

interface UseSessionReturn {
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Read the current Better Auth session via `/api/auth/get-session`. Cached by TanStack
 * Query for the lifetime of the page; invalidate explicitly after sign-in/sign-out by
 * calling `queryClient.invalidateQueries({ queryKey: ['session'] })`.
 */
export function useSession(): UseSessionReturn {
  const { data, isPending, error } = useQuery({
    queryKey: ['session'],
    queryFn: async ({ signal }) => {
      const res = await fetch('/api/auth/get-session', { credentials: 'include', signal });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Session | null;
    },
    staleTime: 30_000,
  });
  return {
    session: data ?? null,
    loading: isPending,
    error: error ?? null,
  };
}
