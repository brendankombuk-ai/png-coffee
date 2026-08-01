import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'customerName', title: 'Customer Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'rating',
      type: 'number',
      validation: (R) => R.required().min(1).max(5),
    }),
    defineField({ name: 'review', type: 'text', validation: (R) => R.required() }),
  ],
  preview: {
    select: { title: 'customerName', subtitle: 'review', media: 'photo' },
  },
})
