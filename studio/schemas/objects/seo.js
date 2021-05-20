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
      description: 'Describe this page for search engines and social media.',
      validation: Rule => Rule.min(50).max(150).warning("Descriptions between 50 and 150 characters show up best in search results")
    },
    {
      name: 'openGraphImage',
      title: 'OpenGraph Image',
      type: 'image',
      description: 'Recommended size is 1200x630.',
    }
  ]
}
