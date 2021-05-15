export default{
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'openGraphImage',
      title: 'OpenGraph Image',
      type: 'figure',
      description: 'Recommended size is 1200x630. No larger than 1mb.',
    }
  ]
}
