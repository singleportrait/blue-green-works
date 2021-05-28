const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
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
      name: 'email',
      type: 'string',
      title: 'Contact Email',
      validation: Rule => Rule.regex(emailRegex, {name: 'email'}).required()
    },
    {
      name: 'productContactText',
      type: 'string',
      title: 'Product Contact Button Text',
      description: "If blank, this will fall back to 'Contact Us'",
      hidden: true
    },
    {
      name: 'seriesDisplayName',
      type: 'string',
      title: 'Series Display Name',
      description: "If blank, this will fall back to 'SERIES'"
    },
    {
      name: 'instagram',
      type: 'url',
      title: 'Instagram URL',
    },
    {
      name: 'instagramHandle',
      type: 'string',
      title: 'Instagram Handle',
      description: "This gets used in the site footer. Don't include the @ symbol. If blank, this will fall back to 'Instagram'",
    },
    {
      name: 'productSettings',
      type: 'productSettings',
      title: 'Product Settings',
      description: 'Override the default UI text for product pages'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color Override',
      description: 'Include the hash at the beginning of the hex number. If blank, this falls back to #8A7342'
    },
    {
      name: 'footer',
      type: 'siteFooter',
      title: 'Site Footer',
      description: 'Use shift+enter to make 1 line break, and enter to make a paragraph break'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes the site for search engines.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Default Site Info',
      description: "This is the homepage social media share info, and the fallback share info for any pages' missing SEO"
    }
  ]
}
