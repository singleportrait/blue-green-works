export default {
  name: 'tearSheet',
  title: 'Tear Sheet',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.error('The title is required!').required()
    },
    {
      name: 'PDF',
      title: 'PDF Tear Sheet',
      type: 'file',
      validation: Rule => Rule.error('The file is required!').required(),
      options: {
        accept: '.pdf',
      },
    }
  ]
}
