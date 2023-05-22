export default {
  name: 'option',
  title: 'Option',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      description: 'This is only used in the admin, not on the website'
    },
    {
      name: 'types',
      title: 'Options',
      type: 'array',
      of: [{type: 'optionOption'}],
      validation: Rule => Rule.error('You must have at least 1 option').min(1)
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}
