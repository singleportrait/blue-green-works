export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
    {
      name: 'description',
      title: 'Description',
      type: 'simplePortableText',
    },
    {
      name: 'tearSheet',
      title: 'Tear Sheet',
      type: 'tearSheet',
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'simplePortableText',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'option'}]
      }]
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'simplePortableText',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'figure' }],
      validation: Rule => Rule.error('You must have at least 1 image').min(1)
    },
    {
      name: 'series',
      type: 'reference',
      title: 'Series (Optional)',
      to: [{type: 'series'}]
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category (Optional)',
      to: [{type: 'category'}]
    }
  ]
}
