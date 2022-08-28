export default {
  name: 'article',
  type: 'object',
  title: 'Article',
  fields: [
    {
      name: 'source',
      type: 'string',
      title: 'Source Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      type: 'url',
      title: 'Article URL',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image'
    }
  ],
  preview: {
    select: {
      title: 'source',
      subtitle: 'url'
    }
  }
}
