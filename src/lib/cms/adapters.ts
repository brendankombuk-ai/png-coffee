import { strapiFetch, mediaUrl, CmsFetchError } from "./client";
import type {
  StrapiCollectionResponse,
  StrapiSingleResponse,
  CmsHomepage,
  CmsAboutUs,
  CmsPngCoffeePage,
  CmsOurCoffeePage,
  CmsContactPage,
  CmsCategory,
  CmsProduct,
  CmsBlogPost,
  CmsTestimonial,
  CmsFaq,
} from "./types";
import * as fallback from "@/data/content";
import type {
  FeatureCard,
  ValueCard,
  TourismCard,
  ProductCategory,
  ProductPlaceholder,
  ProductCategoryPageData,
} from "@/data/content";

/**
 * ---------------------------------------------------------------------------
 * Resilience note
 * ---------------------------------------------------------------------------
 * Every function below tries Strapi first and falls back to the static
 * content in `src/data/content.ts` if the CMS request fails (network error,
 * CMS down, entry not yet created, etc). This means the site stays up even
 * during CMS downtime, at the cost of possibly showing stale/placeholder
 * copy until the CMS comes back. If you'd rather the page fail loudly when
 * Strapi is unreachable (e.g. to catch mistakes during development), remove
 * the try/catch and let `strapiFetch` throw.
 * ---------------------------------------------------------------------------
 */

function logCmsFallback(where: string, err: unknown) {
  const msg = err instanceof CmsFetchError ? err.message : String(err);
  console.warn(`[cms] ${where}: falling back to static content — ${msg}`);
}

/** Split a Strapi richtext blob into paragraphs (blank-line separated). */
function splitParagraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/* ============================== Homepage ============================== */

export async function getHero(): Promise<typeof fallback.hero> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsHomepage>>("/homepage", {
      query: "populate=*",
      tags: ["homepage"],
    });
    const d = res.data;
    if (!d) throw new CmsFetchError("Homepage entry not found");
    return {
      eyebrow: d.heroEyebrow ?? fallback.hero.eyebrow,
      headline: d.heroHeadline ?? fallback.hero.headline,
      body: splitParagraphs(d.heroBody).length ? splitParagraphs(d.heroBody) : fallback.hero.body,
      cta: d.heroCta ?? fallback.hero.cta,
    };
  } catch (err) {
    logCmsFallback("getHero", err);
    return fallback.hero;
  }
}

export async function getBanner(): Promise<typeof fallback.banner> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsHomepage>>("/homepage", {
      tags: ["homepage"],
    });
    const d = res.data;
    if (!d) throw new CmsFetchError("Homepage entry not found");
    return {
      lineOne: d.bannerLineOne ?? fallback.banner.lineOne,
      lineTwo: d.bannerLineTwo ?? fallback.banner.lineTwo,
    };
  } catch (err) {
    logCmsFallback("getBanner", err);
    return fallback.banner;
  }
}

export async function getFeatureCards(): Promise<FeatureCard[]> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsHomepage>>("/homepage", {
      query: "populate[featureCards][populate]=image",
      tags: ["homepage"],
    });
    const cards = res.data?.featureCards;
    if (!cards || cards.length === 0) throw new CmsFetchError("No feature cards in CMS");
    return cards.map((c, i) => ({
      id: c.href.replace(/\//g, "") || `card-${i}`,
      index: String(i + 1).padStart(2, "0"),
      title: c.title,
      image: mediaUrl(c.image?.url),
      alt: c.alt ?? c.title,
      description: c.description ?? "",
      href: c.href,
    }));
  } catch (err) {
    logCmsFallback("getFeatureCards", err);
    return fallback.featureCards;
  }
}

/* ============================== About page ============================== */

export async function getStoryIntro(): Promise<typeof fallback.storyIntro> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsAboutUs>>("/about-us");
    const d = res.data;
    if (!d) throw new CmsFetchError("About Us entry not found");
    const paragraphs = splitParagraphs(d.storyParagraphs);
    return {
      heading: d.storyHeading ?? fallback.storyIntro.heading,
      paragraphs: paragraphs.length ? paragraphs : fallback.storyIntro.paragraphs,
    };
  } catch (err) {
    logCmsFallback("getStoryIntro", err);
    return fallback.storyIntro;
  }
}

export async function getExploreLinks(): Promise<typeof fallback.exploreLinks> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsAboutUs>>("/about-us", {
      query: "populate=exploreLinks",
    });
    const links = res.data?.exploreLinks;
    if (!links || links.length === 0) throw new CmsFetchError("No explore links in CMS");
    return links.map((l) => ({ label: l.label, href: l.href }));
  } catch (err) {
    logCmsFallback("getExploreLinks", err);
    return fallback.exploreLinks;
  }
}

export async function getMissionSection(): Promise<typeof fallback.missionSection> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsAboutUs>>("/about-us");
    const d = res.data;
    if (!d) throw new CmsFetchError("About Us entry not found");
    return {
      heading: d.missionHeading ?? fallback.missionSection.heading,
      tagline: d.missionTagline ?? fallback.missionSection.tagline,
      paragraph: d.missionParagraph ?? fallback.missionSection.paragraph,
    };
  } catch (err) {
    logCmsFallback("getMissionSection", err);
    return fallback.missionSection;
  }
}

export async function getValueCards(): Promise<ValueCard[]> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsAboutUs>>("/about-us", {
      query: "populate[valueCards][populate]=image",
    });
    const cards = res.data?.valueCards;
    if (!cards || cards.length === 0) throw new CmsFetchError("No value cards in CMS");
    return cards.map((c, i) => ({
      id: `value-card-${i}`,
      title: c.title,
      description: c.description,
      icon: c.icon,
      image: mediaUrl(c.image?.url),
      alt: c.alt ?? c.title,
      accent: c.accent ?? "from-ember-600 to-ember-800",
    }));
  } catch (err) {
    logCmsFallback("getValueCards", err);
    return fallback.valueCards;
  }
}

/* ============================== PNG page ============================== */

export async function getPngTourism(): Promise<typeof fallback.pngTourism> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsPngCoffeePage>>("/png-coffee-page");
    const d = res.data;
    if (!d) throw new CmsFetchError("PNG Coffee Page entry not found");
    const paragraphs = splitParagraphs(d.heroParagraphs);
    return {
      title: d.heroTitle ?? fallback.pngTourism.title,
      paragraphs: paragraphs.length ? paragraphs : fallback.pngTourism.paragraphs,
    };
  } catch (err) {
    logCmsFallback("getPngTourism", err);
    return fallback.pngTourism;
  }
}

export async function getTourismCards(): Promise<TourismCard[]> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsPngCoffeePage>>("/png-coffee-page", {
      query: "populate[tourismCards][populate]=image",
    });
    const cards = res.data?.tourismCards;
    if (!cards || cards.length === 0) throw new CmsFetchError("No tourism cards in CMS");
    return cards.map((c, i) => ({
      id: `tourism-card-${i}`,
      title: c.title,
      description: c.description,
      icon: c.icon,
      image: mediaUrl(c.image?.url),
      alt: c.alt ?? c.title,
      accent: c.accent ?? "from-ember-700 to-void-900",
    }));
  } catch (err) {
    logCmsFallback("getTourismCards", err);
    return fallback.tourismCards;
  }
}

/* ============================== Products page ============================== */

export async function getProductsHero(): Promise<typeof fallback.productsHero> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsOurCoffeePage>>("/our-coffee-page");
    const d = res.data;
    if (!d) throw new CmsFetchError("Our Coffee Page entry not found");
    const paragraphs = splitParagraphs(d.heroParagraphs);
    return {
      title: d.heroTitle ?? fallback.productsHero.title,
      paragraphs: paragraphs.length ? paragraphs : fallback.productsHero.paragraphs,
    };
  } catch (err) {
    logCmsFallback("getProductsHero", err);
    return fallback.productsHero;
  }
}

export async function getProductsValueAdded(): Promise<typeof fallback.productsValueAdded> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsOurCoffeePage>>("/our-coffee-page");
    const d = res.data;
    if (!d) throw new CmsFetchError("Our Coffee Page entry not found");
    return {
      title: d.valueAddedTitle ?? fallback.productsValueAdded.title,
      intro: d.valueAddedIntro ?? fallback.productsValueAdded.intro,
      items:
        d.valueAddedItems && d.valueAddedItems.length
          ? d.valueAddedItems
          : fallback.productsValueAdded.items,
      outro: d.valueAddedOutro ?? fallback.productsValueAdded.outro,
    };
  } catch (err) {
    logCmsFallback("getProductsValueAdded", err);
    return fallback.productsValueAdded;
  }
}

/** Categories for the 4-card grid on /products (falls back to static list). */
export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<CmsCategory>>("/categories", {
      query: "populate=image&sort=name:asc",
      tags: ["categories"],
    });
    if (!res.data.length) throw new CmsFetchError("No categories in CMS");
    return res.data.map((c) => ({
      id: c.slug,
      slug: c.slug,
      label: c.name,
      image: mediaUrl(c.image?.url),
      alt: c.image?.alternativeText ?? c.name,
    }));
  } catch (err) {
    logCmsFallback("getProductCategories", err);
    return fallback.productCategories;
  }
}

function mapCmsProductToPlaceholder(p: CmsProduct): ProductPlaceholder {
  return {
    id: p.slug,
    name: p.name,
    description: p.shortDescription ?? "",
    price: p.salePrice ?? p.price ?? 0,
    image: mediaUrl(p.featuredImage?.url),
    alt: p.featuredImage?.alternativeText ?? p.name,
  };
}

/**
 * Full data for a /products/[slug] category detail page: title, description,
 * and every published product in that category. Falls back to the static
 * `productCategoryPages` map (including its placeholder products) if the
 * category doesn't exist in Strapi yet.
 */
export async function getProductCategoryPageData(
  slug: string
): Promise<ProductCategoryPageData | null> {
  try {
    const catRes = await strapiFetch<StrapiCollectionResponse<CmsCategory>>("/categories", {
      query: `filters[slug][$eq]=${encodeURIComponent(slug)}`,
      tags: [`category:${slug}`],
    });
    const category = catRes.data[0];
    if (!category) throw new CmsFetchError(`Category "${slug}" not found in CMS`);

    const prodRes = await strapiFetch<StrapiCollectionResponse<CmsProduct>>("/products", {
      query: `filters[category][slug][$eq]=${encodeURIComponent(slug)}&populate=featuredImage&sort=name:asc`,
      tags: [`category:${slug}`],
    });

    return {
      slug: category.slug,
      title: category.name,
      description: category.description ?? "",
      products: prodRes.data.map(mapCmsProductToPlaceholder),
    };
  } catch (err) {
    logCmsFallback(`getProductCategoryPageData(${slug})`, err);
    return fallback.productCategoryPages[slug] ?? null;
  }
}

/* ============================== Contact page ============================== */

export async function getContactPageData(): Promise<
  typeof fallback.contactPage & { seoTitle?: string | null; seoDescription?: string | null }
> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<CmsContactPage>>("/contact-page", {
      query: "populate=*",
      tags: ["contact-page"],
    });
    const d = res.data;
    if (!d) throw new CmsFetchError("Contact Page entry not found");

    return {
      // Hero/intro copy isn't in the Strapi schema (marketing copy, not
      // treated as CMS-editable content) — always from static content.
      heroTitle: fallback.contactPage.heroTitle,
      heroSubtitle: fallback.contactPage.heroSubtitle,
      introHeading: fallback.contactPage.introHeading,
      introText: fallback.contactPage.introText,
      phone: d.phone ?? fallback.contactPage.phone,
      email: d.email ?? fallback.contactPage.email,
      address: d.address ? d.address.split(/\n+/).filter(Boolean) : fallback.contactPage.address,
      businessHours: d.businessHours.length ? d.businessHours : fallback.contactPage.businessHours,
      socialLinks: d.socialLinks.length
        ? (d.socialLinks as typeof fallback.contactPage.socialLinks)
        : fallback.contactPage.socialLinks,
      mapEmbedUrl: d.googleMapEmbedUrl ?? fallback.contactPage.mapEmbedUrl,
      seoTitle: d.seoTitle,
      seoDescription: d.seoDescription,
    };
  } catch (err) {
    logCmsFallback("getContactPageData", err);
    return fallback.contactPage;
  }
}

/* ============================== Blog ============================== */

export async function getBlogPosts(): Promise<CmsBlogPost[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<CmsBlogPost>>("/blog-posts", {
      query: "populate=featuredImage,category,tags&sort=publishDate:desc",
      tags: ["blog-posts"],
    });
    return res.data;
  } catch (err) {
    logCmsFallback("getBlogPosts", err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<CmsBlogPost>>("/blog-posts", {
      query: `filters[slug][$eq]=${encodeURIComponent(slug)}&populate=featuredImage,gallery,category,tags,relatedProducts`,
      tags: [`blog-post:${slug}`],
    });
    return res.data[0] ?? null;
  } catch (err) {
    logCmsFallback(`getBlogPostBySlug(${slug})`, err);
    return null;
  }
}

/* ============================== Testimonials & FAQ ============================== */

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<CmsTestimonial>>("/testimonials", {
      query: "populate=photo",
      tags: ["testimonials"],
    });
    return res.data;
  } catch (err) {
    logCmsFallback("getTestimonials", err);
    return [];
  }
}

export async function getFaqs(): Promise<CmsFaq[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<CmsFaq>>("/faqs", {
      query: "populate=category",
      tags: ["faqs"],
    });
    return res.data;
  } catch (err) {
    logCmsFallback("getFaqs", err);
    return [];
  }
}
