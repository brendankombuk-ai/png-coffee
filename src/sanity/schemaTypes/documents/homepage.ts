import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body',
      type: 'text',
      description: 'Separate paragraphs with a blank line.',
    }),
    defineField({ name: 'heroCta', title: 'Hero CTA', type: 'string' }),
    defineField({ name: 'bannerLineOne', title: 'Banner Line One', type: 'string' }),
    defineField({ name: 'bannerLineTwo', title: 'Banner Line Two', type: 'string' }),
    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [{ type: 'featureCard' }],
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string' }),
    defineField({ name: 'newsletterHeadline', title: 'Newsletter Headline', type: 'string' }),
    defineField({ name: 'newsletterSubtext', title: 'Newsletter Subtext', type: 'string' }),
    defineField({ name: 'footerText', title: 'Footer Text', type: 'text' }),
    defineField({
      name: 'footerSocialLinks',
      title: 'Footer Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
