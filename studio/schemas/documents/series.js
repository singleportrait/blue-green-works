export default {
  name: 'series',
  type: 'document',
  title: 'Series',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Series Title'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
  ]
}
