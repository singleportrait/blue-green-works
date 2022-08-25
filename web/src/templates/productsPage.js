import React from 'react';
import { graphql } from 'gatsby';

import { cn } from '../lib/helpers';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import HomepageSeriesProduct from '../components/homepageSeriesProduct';

import * as styles from './productsPage.module.scss';

export const query = graphql`
  query ProductsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      seriesDisplayName
    }
    homepageSeries: sanityHomepage(_id: { regex: "/(drafts.|)homepage/" }) {
      seriesHighlights {
        _key
        series {
          _key
          title
          description
        }
        products {
          _id
          title
          slug {
            current
          }
          ...ProductFirstImageNarrowQuery
        }
      }
    }
    productsPage: sanityProductsPage(_id: { regex: "/(drafts.|)productsPage/" }) {
      title
      seo {
        metaDescription
        openGraphImage {
          asset {
            url
          }
        }
      }
    }
  }
`;

const ProductsPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const homepageSeries = (data || {}).homepageSeries;
  const productsPage = (data || {}).productsPage;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  if (!homepageSeries) {
    throw new Error(
      'Missing "Homepage". Open the studio at http://localhost:3333 and add some content to "Homepage" and restart the development server.',
    );
  }

  if (!productsPage) {
    throw new Error(
      'Missing "Products Page". Open the studio at http://localhost:3333 and add some content to "Products page" and restart the development server.',
    );
  }

  return (
    <Layout>
      <SEO
        title={productsPage.title}
        description={productsPage.seo && productsPage.seo.metaDescription}
        imageUrl={productsPage.seo && productsPage.seo.openGraphImage && productsPage.seo.openGraphImage.asset.url}
        htmlClassName="products"
      />

      <hr className={cn(styles.divider, 'my-0')} />
      <div>
        {homepageSeries.seriesHighlights && homepageSeries.seriesHighlights.map((series, i) =>
          <React.Fragment key={series._key}>
            <h2 className="h1 centeredText mt-4">
              {series.series.title} {site.seriesDisplayName || 'Series' }
            </h2>
            <div className="mt-2 mb-4">
              <div className={styles.seriesImages}>
                {series.products && series.products.map((product) =>
                  <HomepageSeriesProduct
                    product={product}
                    series={series}
                    key={product && product._id}
                  />,
                )}
              </div>
              { i !== (homepageSeries.seriesHighlights.length - 1) &&
                <hr className={cn(styles.divider, 'my-0 mt-4')} />
              }
            </div>
          </React.Fragment>,
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
