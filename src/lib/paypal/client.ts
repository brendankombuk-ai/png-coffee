import "server-only";

/**
 * PayPal REST client — fetch-based so it runs on both Cloudflare Workers
 * (workerd) and Node during local `next dev`. No SDK required.
 *
 * Required environment variables (set in Cloudflare + .env.local):
 *   PAYPAL_CLIENT_ID       — the app's Client ID (server side)
 *   PAYPAL_CLIENT_SECRET   — the app's Secret
 *   PAYPAL_ENV             — "sandbox" (testing) or "live" (real payments)
 *
 * The public NEXT_PUBLIC_PAYPAL_CLIENT_ID (used by the buttons on the client)
 * should hold the SAME Client ID; PAYPAL_CLIENT_ID here is accepted too so a
 * single value works if you only set the public one.
 */

const PAYPAL_ENV = process.env.PAYPAL_ENV === "live" ? "live" : "sandbox";

const BASE =
  PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const clientId =
  process.env.PAYPAL_CLIENT_ID ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

if ((!clientId || !clientSecret) && process.env.NODE_ENV !== "test") {
  // Warn (don't throw) so the build never crashes just because secrets aren't
  // present at build time. Real checkout attempts return a clear 503 instead.
  console.warn(
    "[paypal] PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET are not set. " +
      "Checkout will fail until they're added to your environment variables."
  );
}

/** True when the server has the credentials needed to talk to PayPal. */
export function paypalConfigured(): boolean {
  return Boolean(clientId && clientSecret);
}

/** Which PayPal environment the server is pointed at. */
export const paypalEnv = PAYPAL_ENV;

async function getAccessToken(): Promise<string> {
  if (!clientId || !clientSecret) {
    throw new Error(
      "PayPal is not configured (missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)."
    );
  }
  // btoa is available in both the Workers runtime and Node 18+.
  const auth = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Make an authenticated call to the PayPal REST API. */
export async function paypalFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}
