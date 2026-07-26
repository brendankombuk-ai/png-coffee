/**
 * Derives a stable, URL-safe slug from a title, e.g. "The Roastery" -> "the-roastery".
 *
 * Used for content types (like value cards) where Strapi doesn't yet have a
 * dedicated `slug` field — this keeps detail-page routing working today, and
 * keeps working unchanged if a real `slug` field is added to the CMS later.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
