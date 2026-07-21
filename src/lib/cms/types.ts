/**
 * Types mirroring Strapi v5 REST API responses.
 *
 * Strapi v5 returns "flat" entities (no `.attributes` wrapper like v4) —
 * fields sit directly on the object alongside `id` and `documentId`.
 */

export type StrapiMedia = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
  mime: string;
};

export type StrapiEntity = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T | null;
  meta: Record<string, never>;
};

/* ---------------------------- Components ---------------------------- */

export type CmsFeatureCard = {
  id: number;
  title: string;
  image: StrapiMedia | null;
  alt: string | null;
  description: string | null;
  href: string;
};

export type CmsLink = {
  id: number;
  label: string;
  href: string;
};

export type CmsValueCard = {
  id: number;
  title: string;
  description: string;
  icon: "seal" | "flame" | "cup" | "gear";
  image: StrapiMedia | null;
  alt: string | null;
  accent: string | null;
};

export type CmsTourismCard = {
  id: number;
  title: string;
  description: string;
  icon: "mask" | "island" | "wave" | "track" | "peak" | "bird";
  image: StrapiMedia | null;
  alt: string | null;
  accent: string | null;
};

export type CmsSocialLink = {
  id: number;
  platform: string;
  url: string;
};

/* ---------------------------- Content types ---------------------------- */

export type CmsCategory = StrapiEntity & {
  name: string;
  slug: string;
  description: string | null;
  image: StrapiMedia | null;
};

export type CmsProduct = StrapiEntity & {
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  category: CmsCategory | null;
  region: string | null;
  province: string | null;
  farmer: string | null;
  coffeeType: string | null;
  roastLevel: string | null;
  weight: string | null;
  price: number;
  salePrice: number | null;
  stock: number;
  sku: string | null;
  featuredImage: StrapiMedia | null;
  galleryImages: StrapiMedia[];
  pdfDatasheet: StrapiMedia | null;
  featuredProduct: boolean;
  newProduct: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsHomepage = {
  heroEyebrow: string | null;
  heroHeadline: string;
  heroBody: string | null;
  heroCta: string | null;
  bannerLineOne: string | null;
  bannerLineTwo: string | null;
  featureCards: CmsFeatureCard[];
  featuredProducts: CmsProduct[];
  testimonials: CmsTestimonial[];
  instagramHandle: string | null;
  newsletterHeadline: string | null;
  newsletterSubtext: string | null;
  footerText: string | null;
  footerSocialLinks: CmsSocialLink[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsAboutUs = {
  storyHeading: string | null;
  storyParagraphs: string | null;
  exploreLinks: CmsLink[];
  missionHeading: string | null;
  missionTagline: string | null;
  missionParagraph: string | null;
  valueCards: CmsValueCard[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsPngCoffeePage = {
  heroTitle: string | null;
  heroParagraphs: string | null;
  backgroundImage: StrapiMedia | null;
  tourismCards: CmsTourismCard[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsOurCoffeePage = {
  heroTitle: string | null;
  heroParagraphs: string | null;
  valueAddedTitle: string | null;
  valueAddedIntro: string | null;
  valueAddedItems: string[] | null;
  valueAddedOutro: string | null;
  featuredCategories: CmsCategory[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsContactPage = {
  phone: string | null;
  email: string | null;
  address: string | null;
  googleMapEmbedUrl: string | null;
  businessHours: { id: number; day: string; hours: string }[];
  socialLinks: CmsSocialLink[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsBlogPost = StrapiEntity & {
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: StrapiMedia | null;
  gallery: StrapiMedia[];
  publishDate: string | null;
  category: { id: number; name: string; slug: string } | null;
  tags: { id: number; name: string; slug: string }[];
  seoTitle: string | null;
  seoDescription: string | null;
};

export type CmsTestimonial = StrapiEntity & {
  customerName: string;
  location: string | null;
  photo: StrapiMedia | null;
  rating: number;
  review: string;
};

export type CmsFaq = StrapiEntity & {
  question: string;
  answer: string;
  category: { id: number; name: string } | null;
};
