export default {
  name: 'about',
  type: 'document',
  title: 'About',
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
      name: 'description',
      type: 'simplePortableText',
      title: 'Description',
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image',
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Email Button Text',
      description: "If blank, this will fall back to 'Contact Us'"
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Site Info'
    },
  ]
}
