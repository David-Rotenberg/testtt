// Vendored from @seyuna/runtime-sdk. Do not edit — regenerate to update.
import type { WebhookVerification } from '../types.js';

/**
 * Verify an incoming webhook against a shared secret. All verifiers use WebCrypto so the
 * code runs unmodified on Cloudflare Workers / Deno / Bun / Node 18+. No external deps.
 *
 * The 5 Phase-1 verifiers cover the integrations in `@seyuna/integrations`. Svix-style
 * verification (Resend signing v2, multi-secret rotation) ships in Phase 5.
 *
 * Each verifier reads its proof from the request headers and computes an HMAC over a
 * canonical signing string. Constant-time comparison guards against timing attacks.
 */
export async function verifyWebhook(
  req: Request,
  kind: WebhookVerification,
  secret: string,
): Promise<boolean> {
  const bodyText = await req.clone().text();
  switch (kind) {
    case 'stripe-signature':
      return verifyStripe(req, bodyText, secret);
    case 'github-signature':
      return verifyGithub(req, bodyText, secret);
    case 'resend-signature':
      return verifyResend(req, bodyText, secret);
    case 'slack-signature':
      return verifySlack(req, bodyText, secret);
    case 'hmac-sha256':
      return verifyGenericHmac(req, bodyText, secret);
  }
}

// ── Stripe: `Stripe-Signature: t=<unix>,v1=<hex>` ─────────────────────────
// Signing string: `<timestamp>.<body>`. Tolerance window: 5 minutes.
async function verifyStripe(req: Request, body: string, secret: string): Promise<boolean> {
  const header = req.headers.get('Stripe-Signature');
  if (!header) return false;
  const parts = parseKeyValueList(header);
  const t = parts['t'];
  const v1 = parts['v1'];
  if (!t || !v1) return false;
  if (!withinTolerance(Number(t), 300)) return false;
  const expected = await hmacHex(secret, `${t}.${body}`);
  return constantTimeEqual(expected, v1);
}

// ── GitHub: `X-Hub-Signature-256: sha256=<hex>` ───────────────────────────
async function verifyGithub(req: Request, body: string, secret: string): Promise<boolean> {
  const header = req.headers.get('X-Hub-Signature-256');
  if (!header || !header.startsWith('sha256=')) return false;
  const provided = header.slice('sha256='.length);
  const expected = await hmacHex(secret, body);
  return constantTimeEqual(expected, provided);
}

// ── Resend (Svix v1): `svix-id`, `svix-timestamp`, `svix-signature: v1,<b64>` ───
async function verifyResend(req: Request, body: string, secret: string): Promise<boolean> {
  const id = req.headers.get('svix-id');
  const ts = req.headers.get('svix-timestamp');
  const sigHeader = req.headers.get('svix-signature');
  if (!id || !ts || !sigHeader) return false;
  if (!withinTolerance(Number(ts), 300)) return false;

  // Resend signs `<id>.<timestamp>.<body>` with the secret (base64-decoded if prefixed `whsec_`).
  const keyBytes = secret.startsWith('whsec_')
    ? base64ToBytes(secret.slice('whsec_'.length))
    : new TextEncoder().encode(secret);
  const expected = await hmacBase64(keyBytes, `${id}.${ts}.${body}`);
  // Header may contain multiple `v1,<b64>` entries separated by spaces.
  for (const candidate of sigHeader.split(' ')) {
    const [version, b64] = candidate.split(',');
    if (version === 'v1' && b64 && constantTimeEqual(b64, expected)) return true;
  }
  return false;
}

// ── Slack: `X-Slack-Signature: v0=<hex>`, `X-Slack-Request-Timestamp: <unix>` ───
async function verifySlack(req: Request, body: string, secret: string): Promise<boolean> {
  const sig = req.headers.get('X-Slack-Signature');
  const ts = req.headers.get('X-Slack-Request-Timestamp');
  if (!sig || !ts || !sig.startsWith('v0=')) return false;
  if (!withinTolerance(Number(ts), 300)) return false;
  const expected = `v0=${await hmacHex(secret, `v0:${ts}:${body}`)}`;
  return constantTimeEqual(expected, sig);
}

// ── Generic HMAC-SHA256: `X-Signature: <hex>` ─────────────────────────────
async function verifyGenericHmac(req: Request, body: string, secret: string): Promise<boolean> {
  const provided = req.headers.get('X-Signature');
  if (!provided) return false;
  const expected = await hmacHex(secret, body);
  return constantTimeEqual(expected, provided);
}

// ── Crypto helpers ────────────────────────────────────────────────────────

async function hmacHex(secret: string | Uint8Array, data: string): Promise<string> {
  const keyBytes = typeof secret === 'string' ? new TextEncoder().encode(secret) : secret;
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return bytesToHex(new Uint8Array(sigBuf));
}

async function hmacBase64(secret: Uint8Array, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    secret as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return bytesToBase64(new Uint8Array(sigBuf));
}

function bytesToHex(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i] ?? 0;
    out += b.toString(16).padStart(2, '0');
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i] ?? 0);
  return btoa(bin);
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function parseKeyValueList(header: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const pair of header.split(',')) {
    const idx = pair.indexOf('=');
    if (idx === -1) continue;
    const k = pair.slice(0, idx).trim();
    const v = pair.slice(idx + 1).trim();
    if (k && v) out[k] = v;
  }
  return out;
}

function withinTolerance(timestamp: number, seconds: number): boolean {
  if (!Number.isFinite(timestamp)) return false;
  const now = Math.floor(Date.now() / 1000);
  return Math.abs(now - timestamp) <= seconds;
}

/**
 * Length-checking, branch-free string comparison. The two inputs must already be
 * the same length; if not, returns false. Loops over the full string regardless of
 * mismatch position to avoid timing leaks.
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
