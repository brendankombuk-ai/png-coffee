/**
 * Static, client-side search index for the PNG Coffee site.
 *
 * The site is small and fully static, so there is no backend search: this
 * module hand-lists every page + product worth finding, and `searchSite()`
 * does simple case-insensitive token matching over the title + keywords.
 *
 * To extend later (e.g. real CMS product data), push more `SearchEntry`
 * objects into `SEARCH_INDEX` — ideally generated from the same source the
 * pages render from.
 */

import { PRODUCTS } from "@/lib/shipping/zones";
import { productCategories } from "@/data/content";

export type SearchEntryType = "Page" | "Product";

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  type: SearchEntryType;
  /** Extra terms to match against that don't appear in the title. */
  keywords?: string[];
};

const PAGE_ENTRIES: SearchEntry[] = [
  {
    title: "Home",
    description: "Small-batch roasted coffee beans grown in the highlands of Papua New Guinea.",
    href: "/",
    type: "Page",
    keywords: ["png coffee", "welcome", "start", "roasted", "beans", "swissxpresso"],
  },
  {
    title: "About",
    description: "Our journey, values and commitment to quality PNG coffee — farm to cup.",
    href: "/about",
    type: "Page",
    keywords: ["story", "mission", "values", "history", "who we are", "1996"],
  },
  {
    title: "PNG",
    description: "Born in the highlands of Papua New Guinea — the origin, the land and its people.",
    href: "/png",
    type: "Page",
    keywords: ["papua new guinea", "origin", "highlands", "regions", "tourism", "arabica"],
  },
  {
    title: "Products",
    description: "Our coffee: whole beans, ground, drip filter bags and Nespresso-compatible capsules.",
    href: "/products",
    type: "Page",
    keywords: ["shop", "our coffee", "buy", "store", "catalog", "roasts"],
  },
  {
    title: "Contact",
    description: "Get in touch — phone, email, address, business hours and wholesale enquiries.",
    href: "/contact",
    type: "Page",
    keywords: ["email", "phone", "address", "port moresby", "wholesale", "support", "get in touch"],
  },
  {
    title: "Value Added",
    description: "Downstream processing — roasting and packaging green beans into finished coffee products.",
    href: "/value-added",
    type: "Page",
    keywords: ["processing", "packaging", "cic", "roasting", "export", "downstream"],
  },
  {
    title: "The Roastery",
    description: "Our state-of-the-art roastery on Gabaka Street, Gordons, Port Moresby, with a glass-cube coffee showroom.",
    href: "/the-roastery",
    type: "Page",
    keywords: ["roasting", "showroom", "de-stoner", "colour sorter", "equipment", "gordons"],
  },
  {
    title: "Barista Training",
    description: "Australian-qualified baristas and short courses for aspiring coffee professionals.",
    href: "/barista-training",
    type: "Page",
    keywords: ["training", "courses", "barista", "coffee making", "skills"],
  },
  {
    title: "Coffee Equipment Service",
    description: "Comprehensive servicing for all coffee equipment by qualified technicians.",
    href: "/coffee-equipment-service",
    type: "Page",
    keywords: ["repair", "service", "espresso machine", "grinder", "maintenance", "technician"],
  },
  {
    title: "The Heart of Papua New Guinea",
    description: "A tapestry of tradition — culture, ceremonies, art, sing-sings and spirituality of PNG.",
    href: "/png/heart-of-papua-new-guinea",
    type: "Page",
    keywords: ["culture", "tradition", "sing-sing", "kastom", "festivals", "diversity", "languages"],
  },
];

const CATEGORY_ENTRIES: SearchEntry[] = productCategories.map((c) => ({
  title: c.label.replace(/^The\s+/i, ""),
  description: `${c.label} — browse this range of PNG Coffee on the products page.`,
  href: `/products/${c.slug}`,
  type: "Page" as const,
  keywords: ["products", "category", c.slug.replace(/-/g, " "), "coffee"],
}));

const PRODUCT_ENTRIES: SearchEntry[] = PRODUCTS.map((p) => ({
  title: p.name,
  description: p.description,
  href: "/products",
  type: "Product" as const,
  keywords: [p.roast, p.grind, "coffee", "beans", "250g", "buy", "shop"],
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...PAGE_ENTRIES,
  ...CATEGORY_ENTRIES,
  ...PRODUCT_ENTRIES,
];

function haystack(entry: SearchEntry): string {
  return [entry.title, entry.description, ...(entry.keywords ?? [])]
    .join(" ")
    .toLowerCase();
}

/**
 * Case-insensitive token search. Every whitespace-separated token in the
 * query must appear (as a substring) somewhere in the entry's title,
 * description or keywords. Results are lightly ranked so title matches and
 * products surface first.
 */
export function searchSite(query: string, limit = 8): SearchEntry[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];

  for (const entry of SEARCH_INDEX) {
    const hay = haystack(entry);
    const title = entry.title.toLowerCase();
    if (!tokens.every((t) => hay.includes(t))) continue;

    let score = 0;
    for (const t of tokens) {
      if (title.includes(t)) score += 10;
      if (title.startsWith(t)) score += 5;
    }
    if (title === query.trim().toLowerCase()) score += 20;
    scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
