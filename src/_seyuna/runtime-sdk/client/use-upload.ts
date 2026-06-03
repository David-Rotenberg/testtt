// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
'use client';

import { useCallback, useState } from 'react';

interface UseUploadReturn {
  upload: (file: File) => Promise<{ url: string }>;
  progress: number;
  loading: boolean;
  error: Error | null;
  reset: () => void;
}

interface PresignResponse {
  ok: true;
  data: {
    /** PUT target — pre-signed R2 URL. */
    uploadUrl: string;
    /** Final canonical URL the user references after upload completes. */
    publicUrl: string;
    /** Optional headers (e.g. Content-Type) that must be sent on the PUT. */
    headers?: Record<string, string>;
  };
}

interface UploadError {
  ok: false;
  error: { code: string; message: string };
}

/**
 * Pre-signed URL upload flow:
 *   1. POST `/api/uploads/<slot>` with `{ filename, size, type }` to mint a pre-signed PUT URL.
 *   2. PUT the file body straight to R2 — bytes never touch the Worker.
 *   3. Return the canonical public URL the caller stores in the model.
 *
 * Progress is reported via `XMLHttpRequest`'s `upload.onprogress`. `fetch` would be cleaner
 * but doesn't expose progress events on Workers/browser without a streams polyfill.
 */
export function useUpload(slot: string): UseUploadReturn {
  const [state, setState] = useState({ progress: 0, loading: false, error: null as Error | null });

  const upload = useCallback(
    async (file: File): Promise<{ url: string }> => {
      setState({ progress: 0, loading: true, error: null });
      try {
        const presignRes = await fetch(`/api/uploads/${slot}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ filename: file.name, size: file.size, type: file.type }),
        });
        const presign = (await presignRes.json()) as PresignResponse | UploadError;
        if (!presignRes.ok || !presign.ok) {
          const message = presign.ok ? `HTTP ${presignRes.status}` : presign.error.message;
          throw new Error(message);
        }
        await putWithProgress(presign.data.uploadUrl, file, presign.data.headers, (p) => {
          setState((s) => ({ ...s, progress: p }));
        });
        setState({ progress: 1, loading: false, error: null });
        return { url: presign.data.publicUrl };
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setState({ progress: 0, loading: false, error: e });
        throw e;
      }
    },
    [slot],
  );

  const reset = useCallback(() => {
    setState({ progress: 0, loading: false, error: null });
  }, []);

  return { upload, ...state, reset };
}

function putWithProgress(
  url: string,
  file: File,
  headers: Record<string, string> | undefined,
  onProgress: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    if (headers) {
      for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    } else if (file.type) {
      xhr.setRequestHeader('Content-Type', file.type);
    }
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed: HTTP ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error('Upload network error'));
    xhr.send(file);
  });
}
