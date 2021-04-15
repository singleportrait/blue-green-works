export default {
  name: 'tearSheet',
  title: 'Tear Sheet',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'PDF',
      title: 'PDF Tear Sheet',
      type: 'file',
      options: {
        accept: '.pdf',
      }
    }
  ]
}
