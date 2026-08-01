import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({
      name: 'address',
      type: 'text',
      description: 'One line per address line.',
    }),
    defineField({
      name: 'googleMapEmbedUrl',
      title: 'Google Map Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [{ type: 'businessHours' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
