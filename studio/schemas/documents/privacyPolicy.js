export default {
  name: 'privacyPolicy',
  type: 'document',
  title: 'Privacy Policy',
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
      name: 'text',
      type: 'bioPortableText',
      title: 'Text'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Site Info'
    }
  ]
}
