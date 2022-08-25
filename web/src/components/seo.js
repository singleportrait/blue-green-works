import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

function SEO({ description = '', lang = 'en', meta = [], keywords = [], title = '', imageUrl = '' }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.site && data.site.seo && data.site.seo.metaDescription) || '';
        const siteTitle = (data.site && data.site.title) || '';
        const metaImage = imageUrl ? `${imageUrl}?fm=jpg&w=1200&fit=max` : (data.site && data.site.seo && data.site.seo.openGraphImage && `${data.site.seo.openGraphImage.asset.url}?fm=jpg&w=1200&fit=max`);

        // console.log("Data");

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:image',
                content: metaImage,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      keywords
      seo {
        openGraphImage {
          asset {
            url
          }
        }
        metaDescription
      }
    }
  }
`;
