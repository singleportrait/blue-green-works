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
      type: 'string'
    },
    {
      name: 'headerImage',
      title: 'Header Image - Horizontal',
      type: 'figure'
    },
    {
      name: 'headerImageNarrow',
      title: 'Header Image - Vertical',
      type: 'figure'
    },
    {
      name: 'description',
      type: 'simplePortableText',
      title: 'Description'
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      description: "When linking from other pages, what the button should say. If blank, this will default to 'View All Lighting'"
    },
    {
      name: 'buttonUrl',
      type: 'url',
      title: 'Button URL',
      description: 'Leave this blank if you want to go to the products page. If you add a link, it will open in a new window'
    },
    {
      name: 'contactHeader',
      type: 'string',
      title: 'Contact Button Header',
      description: "If blank, this will default to 'Contact Us:'. Include a colon at the end if you want one.",
      hidden: true
    },
    {
      name: 'seriesHighlights',
      title: 'Series Highlights',
      type: 'array',
      of: [{type: 'seriesHighlight'}]
    }
  ]
}
