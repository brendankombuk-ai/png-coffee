import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({ name: 'platform', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'url', type: 'url', validation: (R) => R.required() }),
  ],
})
