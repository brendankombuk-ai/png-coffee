import type { StructureResolver } from 'sanity/structure'

export const SINGLETON_TYPES = [
  'homepage',
  'aboutUs',
  'pngCoffeePage',
  'ourCoffeePage',
  'contactPage',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem()
        .title('About Us')
        .child(S.document().schemaType('aboutUs').documentId('aboutUs')),
      S.listItem()
        .title('PNG Coffee Page')
        .child(S.document().schemaType('pngCoffeePage').documentId('pngCoffeePage')),
      S.listItem()
        .title('Our Coffee Page')
        .child(S.document().schemaType('ourCoffeePage').documentId('ourCoffeePage')),
      S.listItem()
        .title('Contact Page')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faq').title('FAQs'),
    ])
