import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'valueCard',
  title: 'Value Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', type: 'text', validation: (R) => R.required() }),
    defineField({
      name: 'icon',
      type: 'string',
      options: { list: ['seal', 'flame', 'cup', 'gear'] },
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({
      name: 'accent',
      type: 'string',
      description: 'Tailwind gradient classes, e.g. from-ember-600 to-ember-800',
    }),
  ],
})
