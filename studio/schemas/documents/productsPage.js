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
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'seriesHighlights',
      title: 'Series Highlights',
      type: 'array',
      of: [{type: 'seriesHighlight'}]
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Page Info'
    }
  ]
}
