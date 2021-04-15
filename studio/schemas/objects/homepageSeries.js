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
    },
    {
      name: 'tearSheets',
      type: 'array',
      title: 'Tear Sheets Dropdown',
      of: [{ type: 'tearSheet' }],
    }
  ]
}
