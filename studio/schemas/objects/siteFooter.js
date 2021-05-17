export default {
  name: 'siteFooter',
  type: 'object',
  title: 'Site Footer',
  fields: [
    {
      name: 'firstSectionTitle',
      type: 'string',
      title: 'First Section Title',
      description: "This defaults to 'Address'",
    },
    {
      name: 'text',
      title: 'Text',
      type: 'simplePortableText',
    },
    {
      name: 'secondSectionTitle',
      type: 'string',
      title: 'Second Section Title',
      description: "This defaults to 'Contact'",
    }
  ]
}
