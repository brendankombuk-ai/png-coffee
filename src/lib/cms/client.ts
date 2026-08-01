import 'server-only'
import { createClient } from 'next-sanity'

const _projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

// Only instantiate when the project ID is present — avoids a hard throw at
// module load time before adapters.ts can catch it and fall back to static content.
export const sanityClient = _projectId
  ? createClient({
      projectId: _projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2025-01-01',
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_TOKEN,
    })
  : null

export class CmsFetchError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CmsFetchError'
  }
}

export async function cmsQuery<T>(
  query: string,
  {
    params,
    tags,
    revalidate = 60,
  }: {
    params?: Record<string, unknown>
    tags?: string[]
    revalidate?: number | false
  } = {}
): Promise<T> {
  if (!sanityClient) {
    throw new CmsFetchError(
      'NEXT_PUBLIC_SANITY_PROJECT_ID is not set — add it to .env.local to connect Sanity'
    )
  }
  return sanityClient.fetch<T>(query, params ?? {}, {
    next: {
      revalidate,
      ...(tags ? { tags } : {}),
    },
  })
}
