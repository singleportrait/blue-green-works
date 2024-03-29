export default {
  name: 'press',
  type: 'document',
  title: 'Press',
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
      name: 'articles',
      type: 'array',
      title: 'Articles',
      of: [{type: 'article'}],
      validation: Rule => Rule.min(4)
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Site Info'
    }
  ]
}
