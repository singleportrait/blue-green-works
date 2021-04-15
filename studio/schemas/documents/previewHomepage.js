export default {
  name: 'previewHomepage',
  title: 'Preview Homepage',
  type: 'document',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'headerImage',
      title: 'Header Image',
      type: 'figure',
    },
    {
      name: 'series',
      title: 'Series',
      type: 'array',
      of: [{ type: 'homepageSeries' }]
    }
  ]
}
