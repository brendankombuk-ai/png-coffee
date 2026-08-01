import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ourCoffeePage',
  title: 'Our Coffee Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({
      name: 'heroParagraphs',
      title: 'Hero Paragraphs',
      type: 'text',
      description: 'Separate paragraphs with a blank line.',
    }),
    defineField({ name: 'valueAddedTitle', title: 'Value Added Title', type: 'string' }),
    defineField({ name: 'valueAddedIntro', title: 'Value Added Intro', type: 'text' }),
    defineField({
      name: 'valueAddedItems',
      title: 'Value Added Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'valueAddedOutro', title: 'Value Added Outro', type: 'text' }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
