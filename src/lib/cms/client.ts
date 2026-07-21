import "server-only";

/**
 * Low-level Strapi REST client.
 *
 * Every content-facing page fetches through this file (directly or via
 * adapters.ts) rather than calling `fetch` ad hoc, so caching, error
 * handling, and the base URL are configured in exactly one place.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export class CmsFetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public path?: string
  ) {
    super(message);
    this.name = "CmsFetchError";
  }
}

type FetchOptions = {
  /** Extra query params, e.g. { populate: "*" } or a pre-built qs string via `query`. */
  query?: string;
  /** Next.js cache tag(s) for on-demand revalidation. */
  tags?: string[];
  /** Seconds before Next.js revalidates this request in the background. */
  revalidate?: number | false;
};

/**
 * Fetch raw JSON from the Strapi REST API. Returns the full Strapi response
 * envelope (`{ data, meta }`) — use the typed helpers in `adapters.ts` for
 * page-ready shapes instead of calling this directly where possible.
 */
export async function strapiFetch<T>(
  path: string,
  { query, tags, revalidate = 60 }: FetchOptions = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ""}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
      },
      next: { revalidate, ...(tags ? { tags } : {}) },
    });
  } catch (err) {
    throw new CmsFetchError(
      `Could not reach Strapi at ${url}. Is the CMS running and NEXT_PUBLIC_STRAPI_URL set correctly? (${
        err instanceof Error ? err.message : String(err)
      })`,
      undefined,
      path
    );
  }

  if (!res.ok) {
    throw new CmsFetchError(`Strapi request failed: ${res.status} ${res.statusText}`, res.status, path);
  }

  return res.json() as Promise<T>;
}

/** Resolve a Strapi media `url` (which may be relative) to an absolute URL. */
export function mediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}
