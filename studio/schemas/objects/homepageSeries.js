export default {
  name: 'homepageSeries',
  type: 'object',
  title: 'Homepage Series',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'figure' }],
      validation: Rule => Rule.error('You must have between 1 and 4 images').min(1).max(4)
    },
    {
      name: 'tearSheets',
      type: 'array',
      title: 'Tear Sheets Dropdown',
      of: [{ type: 'tearSheet' }],
    }
  ]
}
