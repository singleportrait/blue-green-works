export default {
  name: 'member',
  type: 'object',
  title: 'Team Member',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
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
      title: 'name',
      subtitle: 'title'
    }
  }
}
