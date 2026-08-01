export type SanityDocument = {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
}

export type CmsBlogPost = {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featuredImage: { url: string | null } | null
  publishDate: string | null
  category: { name: string; slug: string } | null
  tags: { name: string; slug: string }[]
  seoTitle: string | null
  seoDescription: string | null
}

export type CmsTestimonial = {
  _id: string
  customerName: string
  location: string | null
  photo: { url: string | null } | null
  rating: number
  review: string
}

export type CmsFaq = {
  _id: string
  question: string
  answer: string
  category: { name: string } | null
}
