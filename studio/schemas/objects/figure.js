export default {
  name: 'figure',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.error('You must add an image').required(),
      options: {
        hotspot: true
      },
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      title: 'caption'
    }
  }
}
