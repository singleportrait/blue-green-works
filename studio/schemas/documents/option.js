export default {
  name: 'option',
  title: 'Option',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'types',
      title: 'Options',
      type: 'array',
      of: [{type: 'optionOption'}],
      validation: Rule => Rule.error('You must have at least 1 option').min(1)
    }
  ]
}
