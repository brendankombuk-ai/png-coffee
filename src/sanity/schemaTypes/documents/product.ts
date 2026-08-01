import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'string' }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({ name: 'region', type: 'string' }),
    defineField({ name: 'province', type: 'string' }),
    defineField({ name: 'farmer', type: 'string' }),
    defineField({ name: 'coffeeType', title: 'Coffee Type', type: 'string' }),
    defineField({
      name: 'roastLevel',
      title: 'Roast Level',
      type: 'string',
      options: { list: ['Light', 'Medium', 'Medium-Dark', 'Dark'] },
    }),
    defineField({ name: 'weight', type: 'string' }),
    defineField({ name: 'price', type: 'number', validation: (R) => R.required().positive() }),
    defineField({ name: 'salePrice', title: 'Sale Price', type: 'number' }),
    defineField({ name: 'stock', type: 'number', initialValue: 0 }),
    defineField({ name: 'sku', title: 'SKU', type: 'string' }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'featuredProduct', title: 'Featured Product', type: 'boolean', initialValue: false }),
    defineField({ name: 'newProduct', title: 'New Product', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
  preview: {
    select: { title: 'name', media: 'featuredImage', subtitle: 'sku' },
  },
})
