import { cmsQuery, CmsFetchError } from './client'
import { slugify } from '@/lib/slugify'
import type { CmsBlogPost, CmsTestimonial, CmsFaq } from './types'
import * as fallback from '@/data/content'
import type {
  FeatureCard,
  ValueCard,
  ValueCardDetail,
  TourismCard,
  ProductCategory,
  ProductCategoryPageData,
} from '@/data/content'

function logCmsFallback(where: string, err: unknown) {
  const msg = err instanceof CmsFetchError ? err.message : String(err)
  console.warn(`[cms] ${where}: falling back to static content — ${msg}`)
}

function splitParagraphs(text: string | null | undefined): string[] {
  if (!text) return []
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/* ============================== Homepage ============================== */

export async function getHero(): Promise<typeof fallback.hero> {
  try {
    const doc = await cmsQuery<{
      heroEyebrow: string | null
      heroHeadline: string | null
      heroBody: string | null
      heroCta: string | null
    } | null>(`*[_type == "homepage"][0] { heroEyebrow, heroHeadline, heroBody, heroCta }`, {
      tags: ['homepage'],
    })
    if (!doc) throw new CmsFetchError('Homepage document not found')
    return {
      eyebrow: doc.heroEyebrow ?? fallback.hero.eyebrow,
      headline: doc.heroHeadline ?? fallback.hero.headline,
      body: splitParagraphs(doc.heroBody).length
        ? splitParagraphs(doc.heroBody)
        : fallback.hero.body,
      cta: doc.heroCta ?? fallback.hero.cta,
    }
  } catch (err) {
    logCmsFallback('getHero', err)
    return fallback.hero
  }
}

export async function getBanner(): Promise<typeof fallback.banner> {
  try {
    const doc = await cmsQuery<{
      bannerLineOne: string | null
      bannerLineTwo: string | null
    } | null>(`*[_type == "homepage"][0] { bannerLineOne, bannerLineTwo }`, {
      tags: ['homepage'],
    })
    if (!doc) throw new CmsFetchError('Homepage document not found')
    return {
      lineOne: doc.bannerLineOne ?? fallback.banner.lineOne,
      lineTwo: doc.bannerLineTwo ?? fallback.banner.lineTwo,
    }
  } catch (err) {
    logCmsFallback('getBanner', err)
    return fallback.banner
  }
}

export async function getFeatureCards(): Promise<FeatureCard[]> {
  try {
    const doc = await cmsQuery<{
      featureCards: {
        title: string
        imageUrl: string | null
        alt: string | null
        description: string | null
        href: string
      }[]
    } | null>(
      `*[_type == "homepage"][0] {
        "featureCards": featureCards[] {
          title,
          "imageUrl": image.asset->url,
          alt,
          description,
          href
        }
      }`,
      { tags: ['homepage'] }
    )
    const cards = doc?.featureCards
    if (!cards || cards.length === 0) throw new CmsFetchError('No feature cards in CMS')
    return cards.map((c, i) => ({
      id: c.href.replace(/\//g, '') || `card-${i}`,
      index: String(i + 1).padStart(2, '0'),
      title: c.title,
      image: c.imageUrl ?? '',
      alt: c.alt ?? c.title,
      description: c.description ?? '',
      href: c.href,
    }))
  } catch (err) {
    logCmsFallback('getFeatureCards', err)
    return fallback.featureCards
  }
}

/* ============================== About page ============================== */

export async function getStoryIntro(): Promise<typeof fallback.storyIntro> {
  try {
    const doc = await cmsQuery<{
      storyHeading: string | null
      storyParagraphs: string | null
    } | null>(`*[_type == "aboutUs"][0] { storyHeading, storyParagraphs }`, {
      tags: ['aboutUs'],
    })
    if (!doc) throw new CmsFetchError('About Us document not found')
    const paragraphs = splitParagraphs(doc.storyParagraphs)
    return {
      heading: doc.storyHeading ?? fallback.storyIntro.heading,
      paragraphs: paragraphs.length ? paragraphs : fallback.storyIntro.paragraphs,
    }
  } catch (err) {
    logCmsFallback('getStoryIntro', err)
    return fallback.storyIntro
  }
}

export async function getExploreLinks(): Promise<typeof fallback.exploreLinks> {
  try {
    const doc = await cmsQuery<{
      exploreLinks: { label: string; href: string }[]
    } | null>(
      `*[_type == "aboutUs"][0] { "exploreLinks": exploreLinks[] { label, href } }`,
      { tags: ['aboutUs'] }
    )
    const links = doc?.exploreLinks
    if (!links || links.length === 0) throw new CmsFetchError('No explore links in CMS')
    return links.map((l) => ({ label: l.label, href: l.href }))
  } catch (err) {
    logCmsFallback('getExploreLinks', err)
    return fallback.exploreLinks
  }
}

export async function getMissionSection(): Promise<typeof fallback.missionSection> {
  try {
    const doc = await cmsQuery<{
      missionHeading: string | null
      missionTagline: string | null
      missionParagraph: string | null
    } | null>(`*[_type == "aboutUs"][0] { missionHeading, missionTagline, missionParagraph }`, {
      tags: ['aboutUs'],
    })
    if (!doc) throw new CmsFetchError('About Us document not found')
    return {
      heading: doc.missionHeading ?? fallback.missionSection.heading,
      tagline: doc.missionTagline ?? fallback.missionSection.tagline,
      paragraph: doc.missionParagraph ?? fallback.missionSection.paragraph,
    }
  } catch (err) {
    logCmsFallback('getMissionSection', err)
    return fallback.missionSection
  }
}

export async function getValueCards(): Promise<ValueCard[]> {
  try {
    const doc = await cmsQuery<{
      valueCards: {
        title: string
        description: string
        icon: string
        imageUrl: string | null
        alt: string | null
        accent: string | null
      }[]
    } | null>(
      `*[_type == "aboutUs"][0] {
        "valueCards": valueCards[] {
          title,
          description,
          icon,
          "imageUrl": image.asset->url,
          alt,
          accent
        }
      }`,
      { tags: ['aboutUs'] }
    )
    const cards = doc?.valueCards
    if (!cards || cards.length === 0) throw new CmsFetchError('No value cards in CMS')
    return cards.map((c) => {
      const slug = slugify(c.title)
      const staticCard = fallback.valueCards.find((fc) => fc.slug === slug || fc.id === slug)
      return {
        id: slug,
        slug,
        title: c.title,
        description: c.description,
        icon: c.icon as ValueCard['icon'],
        image: c.imageUrl ?? '',
        alt: c.alt ?? c.title,
        accent: c.accent ?? 'from-ember-600 to-ember-800',
        href: staticCard?.href,
      }
    })
  } catch (err) {
    logCmsFallback('getValueCards', err)
    return fallback.valueCards
  }
}

export async function getValueCardDetail(
  slug: string
): Promise<(ValueCard & ValueCardDetail) | null> {
  const cards = await getValueCards()
  const card = cards.find((c) => c.slug === slug)
  if (!card) return null

  const detail = fallback.valueCardDetails[slug]
  if (detail) return { ...card, ...detail }

  return {
    ...card,
    eyebrow: card.title,
    intro: card.description,
    paragraphs: [card.description],
    highlights: [],
  }
}

/* ============================== PNG page ============================== */

export async function getPngTourism(): Promise<typeof fallback.pngTourism> {
  try {
    const doc = await cmsQuery<{
      heroTitle: string | null
      heroParagraphs: string | null
    } | null>(`*[_type == "pngCoffeePage"][0] { heroTitle, heroParagraphs }`, {
      tags: ['pngCoffeePage'],
    })
    if (!doc) throw new CmsFetchError('PNG Coffee Page document not found')
    const paragraphs = splitParagraphs(doc.heroParagraphs)
    return {
      title: doc.heroTitle ?? fallback.pngTourism.title,
      paragraphs: paragraphs.length ? paragraphs : fallback.pngTourism.paragraphs,
    }
  } catch (err) {
    logCmsFallback('getPngTourism', err)
    return fallback.pngTourism
  }
}

export async function getTourismCards(): Promise<TourismCard[]> {
  try {
    const doc = await cmsQuery<{
      tourismCards: {
        title: string
        description: string
        icon: string
        imageUrl: string | null
        alt: string | null
        accent: string | null
      }[]
    } | null>(
      `*[_type == "pngCoffeePage"][0] {
        "tourismCards": tourismCards[] {
          title,
          description,
          icon,
          "imageUrl": image.asset->url,
          alt,
          accent
        }
      }`,
      { tags: ['pngCoffeePage'] }
    )
    const cards = doc?.tourismCards
    if (!cards || cards.length === 0) throw new CmsFetchError('No tourism cards in CMS')
    return cards.map((c, i) => {
      const staticCard = fallback.tourismCards.find(
        (fc) => fc.title.toLowerCase() === c.title.toLowerCase()
      )
      return {
        id: `tourism-card-${i}`,
        title: c.title,
        description: c.description,
        icon: c.icon as TourismCard['icon'],
        image: c.imageUrl ?? '',
        alt: c.alt ?? c.title,
        accent: c.accent ?? 'from-ember-700 to-void-900',
        href: staticCard?.href,
      }
    })
  } catch (err) {
    logCmsFallback('getTourismCards', err)
    return fallback.tourismCards
  }
}

/* ============================== Products page ============================== */

export async function getProductsHero(): Promise<typeof fallback.productsHero> {
  try {
    const doc = await cmsQuery<{
      heroTitle: string | null
      heroParagraphs: string | null
    } | null>(`*[_type == "ourCoffeePage"][0] { heroTitle, heroParagraphs }`, {
      tags: ['ourCoffeePage'],
    })
    if (!doc) throw new CmsFetchError('Our Coffee Page document not found')
    const paragraphs = splitParagraphs(doc.heroParagraphs)
    return {
      title: doc.heroTitle ?? fallback.productsHero.title,
      paragraphs: paragraphs.length ? paragraphs : fallback.productsHero.paragraphs,
    }
  } catch (err) {
    logCmsFallback('getProductsHero', err)
    return fallback.productsHero
  }
}

export async function getProductsValueAdded(): Promise<typeof fallback.productsValueAdded> {
  try {
    const doc = await cmsQuery<{
      valueAddedTitle: string | null
      valueAddedIntro: string | null
      valueAddedItems: string[] | null
      valueAddedOutro: string | null
    } | null>(
      `*[_type == "ourCoffeePage"][0] { valueAddedTitle, valueAddedIntro, valueAddedItems, valueAddedOutro }`,
      { tags: ['ourCoffeePage'] }
    )
    if (!doc) throw new CmsFetchError('Our Coffee Page document not found')
    return {
      title: doc.valueAddedTitle ?? fallback.productsValueAdded.title,
      intro: doc.valueAddedIntro ?? fallback.productsValueAdded.intro,
      items: doc.valueAddedItems?.length ? doc.valueAddedItems : fallback.productsValueAdded.items,
      outro: doc.valueAddedOutro ?? fallback.productsValueAdded.outro,
    }
  } catch (err) {
    logCmsFallback('getProductsValueAdded', err)
    return fallback.productsValueAdded
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const categories = await cmsQuery<
      { slug: string; name: string; imageUrl: string | null; alt: string | null }[]
    >(
      `*[_type == "category"] | order(name asc) {
        "slug": slug.current,
        name,
        "imageUrl": image.asset->url,
        "alt": image.asset->altText
      }`,
      { tags: ['categories'] }
    )
    if (!categories.length) throw new CmsFetchError('No categories in CMS')
    return categories.map((c) => ({
      id: c.slug,
      slug: c.slug,
      label: c.name,
      image: c.imageUrl ?? '',
      alt: c.alt ?? c.name,
    }))
  } catch (err) {
    logCmsFallback('getProductCategories', err)
    return fallback.productCategories
  }
}

export async function getProductCategoryPageData(
  slug: string
): Promise<ProductCategoryPageData | null> {
  try {
    const category = await cmsQuery<{
      slug: string
      name: string
      description: string | null
      products: {
        slug: string
        name: string
        shortDescription: string | null
        price: number
        salePrice: number | null
        imageUrl: string | null
        alt: string | null
      }[]
    } | null>(
      `*[_type == "category" && slug.current == $slug][0] {
        "slug": slug.current,
        name,
        description,
        "products": *[_type == "product" && references(^._id)] | order(name asc) {
          "slug": slug.current,
          name,
          shortDescription,
          price,
          salePrice,
          "imageUrl": featuredImage.asset->url,
          "alt": featuredImage.asset->altText
        }
      }`,
      { params: { slug }, tags: [`category:${slug}`] }
    )
    if (!category) throw new CmsFetchError(`Category "${slug}" not found in CMS`)
    return {
      slug: category.slug,
      title: category.name,
      description: category.description ?? '',
      products: category.products.map((p) => ({
        id: p.slug,
        name: p.name,
        description: p.shortDescription ?? '',
        price: p.salePrice ?? p.price ?? 0,
        image: p.imageUrl ?? '',
        alt: p.alt ?? p.name,
      })),
    }
  } catch (err) {
    logCmsFallback(`getProductCategoryPageData(${slug})`, err)
    return fallback.productCategoryPages[slug] ?? null
  }
}

/* ============================== Contact page ============================== */

export async function getContactPageData(): Promise<
  typeof fallback.contactPage & { seoTitle?: string | null; seoDescription?: string | null }
> {
  try {
    const doc = await cmsQuery<{
      phone: string | null
      email: string | null
      address: string | null
      googleMapEmbedUrl: string | null
      businessHours: { day: string; hours: string }[]
      socialLinks: { platform: string; url: string }[]
      seoTitle: string | null
      seoDescription: string | null
    } | null>(
      `*[_type == "contactPage"][0] {
        phone,
        email,
        address,
        googleMapEmbedUrl,
        businessHours,
        socialLinks,
        seoTitle,
        seoDescription
      }`,
      { tags: ['contactPage'] }
    )
    if (!doc) throw new CmsFetchError('Contact Page document not found')
    return {
      heroTitle: fallback.contactPage.heroTitle,
      heroSubtitle: fallback.contactPage.heroSubtitle,
      introHeading: fallback.contactPage.introHeading,
      introText: fallback.contactPage.introText,
      phone: doc.phone ?? fallback.contactPage.phone,
      email: doc.email ?? fallback.contactPage.email,
      address: doc.address
        ? doc.address.split(/\n+/).filter(Boolean)
        : fallback.contactPage.address,
      businessHours: doc.businessHours?.length
        ? doc.businessHours
        : fallback.contactPage.businessHours,
      socialLinks: doc.socialLinks?.length
        ? (doc.socialLinks as typeof fallback.contactPage.socialLinks)
        : fallback.contactPage.socialLinks,
      mapEmbedUrl: doc.googleMapEmbedUrl ?? fallback.contactPage.mapEmbedUrl,
      seoTitle: doc.seoTitle,
      seoDescription: doc.seoDescription,
    }
  } catch (err) {
    logCmsFallback('getContactPageData', err)
    return fallback.contactPage
  }
}

/* ============================== Page SEO ============================== */

/** Fetch seoTitle + seoDescription for any singleton page type. */
export async function getPageSeo(type: string): Promise<{
  seoTitle: string | null
  seoDescription: string | null
}> {
  try {
    const doc = await cmsQuery<{ seoTitle: string | null; seoDescription: string | null } | null>(
      `*[_type == $type][0] { seoTitle, seoDescription }`,
      { params: { type }, revalidate: 3600 }
    )
    return { seoTitle: doc?.seoTitle ?? null, seoDescription: doc?.seoDescription ?? null }
  } catch {
    return { seoTitle: null, seoDescription: null }
  }
}

/* ============================== Blog ============================== */

export async function getBlogPosts(): Promise<CmsBlogPost[]> {
  try {
    return await cmsQuery<CmsBlogPost[]>(
      `*[_type == "blogPost"] | order(publishDate desc) {
        _id,
        title,
        "slug": slug.current,
        content,
        excerpt,
        "featuredImage": { "url": featuredImage.asset->url },
        publishDate,
        category,
        tags,
        seoTitle,
        seoDescription
      }`,
      { tags: ['blogPosts'] }
    )
  } catch (err) {
    logCmsFallback('getBlogPosts', err)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  try {
    return await cmsQuery<CmsBlogPost | null>(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        content,
        excerpt,
        "featuredImage": { "url": featuredImage.asset->url },
        publishDate,
        category,
        tags,
        seoTitle,
        seoDescription
      }`,
      { params: { slug }, tags: [`blogPost:${slug}`] }
    )
  } catch (err) {
    logCmsFallback(`getBlogPostBySlug(${slug})`, err)
    return null
  }
}

/* ============================== Testimonials & FAQ ============================== */

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  try {
    return await cmsQuery<CmsTestimonial[]>(
      `*[_type == "testimonial"] {
        _id,
        customerName,
        location,
        "photo": { "url": photo.asset->url },
        rating,
        review
      }`,
      { tags: ['testimonials'] }
    )
  } catch (err) {
    logCmsFallback('getTestimonials', err)
    return []
  }
}

export async function getFaqs(): Promise<CmsFaq[]> {
  try {
    return await cmsQuery<CmsFaq[]>(
      `*[_type == "faq"] {
        _id,
        question,
        answer,
        category
      }`,
      { tags: ['faqs'] }
    )
  } catch (err) {
    logCmsFallback('getFaqs', err)
    return []
  }
}
