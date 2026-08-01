import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({ name: 'storyHeading', title: 'Story Heading', type: 'string' }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'text',
      description: 'Separate paragraphs with a blank line.',
    }),
    defineField({
      name: 'exploreLinks',
      title: 'Explore Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
    defineField({ name: 'missionHeading', title: 'Mission Heading', type: 'string' }),
    defineField({ name: 'missionTagline', title: 'Mission Tagline', type: 'string' }),
    defineField({ name: 'missionParagraph', title: 'Mission Paragraph', type: 'text' }),
    defineField({
      name: 'valueCards',
      title: 'Value Cards',
      type: 'array',
      of: [{ type: 'valueCard' }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
