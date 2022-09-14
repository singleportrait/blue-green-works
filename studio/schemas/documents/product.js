import client from 'part:@sanity/base/client'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'series',
      type: 'reference',
      title: 'Series (Optional)',
      to: [{type: 'series'}]
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "Don't include the name of the series in the title, the front-end will do that",
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: async (doc) => {
          if (!doc.series) {
            return doc.title
          }
          const series = await client.getDocument(doc.series._ref)
          return `${series.title} ${doc.title}`
        },
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'simplePortableText'
    },
    {
      name: 'firstImage',
      title: 'First Product Image - Horizontal',
      type: 'figure',
      description: 'For wide screens'
    },
    {
      name: 'firstImageNarrow',
      title: 'First Product Image - Vertical',
      type: 'figure',
      description: 'For narrow screens, mobile, and the homepage'
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'figure'}],
      validation: Rule => Rule.error('You must have at least 1 image').min(1)
    },
    {
      name: 'tearSheet',
      title: 'Tear Sheet',
      type: 'tearSheet'
    },
    {
      name: 'instructionsFile',
      title: 'Instructions PDF',
      type: 'file',
      description: 'This will create a new URL that can be linked directly to the PDF, e.g. `/products/palm-pendant/instructions`',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'simplePortableText'
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'option'}],
        options: {
          filter: "!(_id in path('drafts.**'))"
        }
      }]
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'simplePortableText'
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category (Optional)',
      to: [{type: 'category'}],
      options: {
        filter: "!(_id in path('drafts.**'))"
      }
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Product Info'
    }
  ],
  preview: {
    select: {
      title: 'title',
      series: 'series.title',
      media: 'firstImage.image'
    },
    prepare (selection) {
      const {title, series, media} = selection
      return {
        title: title,
        subtitle: series ? `${series} Series` : '',
        media: media
      }
    }
  }
}
