export default {
  name: 'productsPage',
  type: 'document',
  title: 'Products Page',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'productsCTA',
      type: 'string',
      title: 'Products Button CTA',
      description: "When linking from other pages, what the button should say. If blank, this will default to 'View All Lighting'",
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Page Info'
    }
  ]
}
