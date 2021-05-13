import client from 'part:@sanity/base/client';

export default {
  name: 'seriesHighlight',
  type: 'object',
  title: 'Series Highlight',
  fields: [
    {
      name: 'series',
      type: 'reference',
      title: 'Series',
      to: [{ type: 'series' }],
      description: 'Pick a series',
      validation: Rule => Rule.required(),
      options: {
        filter: "!(_id in path('drafts.**'))"
      }
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      description: 'Products to include',
      of: [{
        type: 'reference',
        to: [{type: 'product'}],
        options: {
          filter: ({document, parent, parentPath}) => {
            const parentPathKey = parentPath[1]._key;
            const matchingSeriesHighlight = document.seriesHighlights.filter(obj => obj._key == parentPathKey)[0]

            // console.log("Document", document);
            // console.log("Parent", parent);
            // console.log("Parent path key", parentPathKey);
            // console.log("Matching series?", matchingSeriesHighlight);

            if (!document.seriesHighlights) {
              return {
                filter: '',
                params: ''
              }
            }

            return {
              filter: "!(_id in path('drafts.**')) && series._ref == $ref",
              params: {
                ref: matchingSeriesHighlight.series._ref
              }
            }
          }
        }
      }],
      validation: Rule => Rule.min(1).required()
    }
  ],
  preview: {
    select: {
      title: 'series.title',
      products: 'products'
    },
    prepare: ({title, products}) => {
      return {
        title: title,
        subtitle: `${products.length} products`
      }
    }
  }
}
