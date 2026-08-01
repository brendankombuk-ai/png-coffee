import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'answer', type: 'text', validation: (R) => R.required() }),
    defineField({
      name: 'category',
      type: 'object',
      fields: [defineField({ name: 'name', type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'question' },
  },
})
