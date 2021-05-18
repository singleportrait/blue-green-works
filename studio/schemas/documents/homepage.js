export default {
  name: 'homepage',
  title: 'Homepage',
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
      title: 'Header Image - Horizontal',
      type: 'figure',
    },
    {
      name: 'headerImageNarrow',
      title: 'Header Image - Vertical',
      type: 'figure',
    },
    {
      name: 'description',
      type: 'simplePortableText',
      title: 'Description',
    },
    {
      name: 'contactHeader',
      type: 'string',
      title: 'Contact Button Header',
      description: "If blank, this will default to 'Contact Us:'. Include a colon at the end if you want one.",
    },
    {
      name: 'seriesHighlights',
      title: 'Series Highlights',
      type: 'array',
      of: [{ type: 'seriesHighlight' }]
    }
  ]
}
