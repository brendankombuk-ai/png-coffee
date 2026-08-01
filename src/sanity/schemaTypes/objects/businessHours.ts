import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'businessHours',
  title: 'Business Hours',
  type: 'object',
  fields: [
    defineField({ name: 'day', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'hours', type: 'string', validation: (R) => R.required() }),
  ],
})
