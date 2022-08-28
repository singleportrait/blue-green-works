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
      title: 'Title'
    },
    {
      name: 'description',
      type: 'simplePortableText',
      title: 'Description'
    },
    {
      name: 'additionalDescription',
      type: 'simplePortableText',
      title: 'Additional Description (2nd column on wide screens)'
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image'
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Email Button Text',
      description: "If blank, this will fall back to 'Contact Us'"
    },
    {
      name: 'teamTitle',
      type: 'string',
      title: 'Team Section Title',
      description: "If blank, this will fall back to 'The Team'"
    },
    {
      name: 'members',
      type: 'array',
      title: 'Team Members',
      of: [{type: 'member'}]
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Site Info'
    }
  ]
}
