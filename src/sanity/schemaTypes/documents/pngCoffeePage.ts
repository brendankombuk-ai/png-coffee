import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pngCoffeePage',
  title: 'PNG Coffee Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({
      name: 'heroParagraphs',
      title: 'Hero Paragraphs',
      type: 'text',
      description: 'Separate paragraphs with a blank line.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tourismCards',
      title: 'Tourism Cards',
      type: 'array',
      of: [{ type: 'tourismCard' }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
