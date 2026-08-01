import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tourismCard',
  title: 'Tourism Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', type: 'text', validation: (R) => R.required() }),
    defineField({
      name: 'icon',
      type: 'string',
      options: { list: ['mask', 'island', 'wave', 'track', 'peak', 'bird'] },
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({ name: 'accent', type: 'string' }),
  ],
})
