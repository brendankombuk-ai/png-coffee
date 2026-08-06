import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config that builds and deploys cleanly with no extra Cloudflare
// resources required.
//
// OPTIONAL — proper cross-edge ISR:
//   Your product pages use `export const revalidate = 60`. Without a shared
//   cache each Worker isolate revalidates on its own (fine for a small catalog,
//   but not "true" ISR). To enable an R2-backed incremental cache, create a
//   bucket, uncomment the r2_buckets binding in wrangler.jsonc, and pass the
//   R2 incremental-cache override here. See CLOUDFLARE_MIGRATION.md ("Optional:
//   ISR cache") for the exact, version-current steps.
export default defineCloudflareConfig();
