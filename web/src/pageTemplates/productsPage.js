import React from "react";
import { graphql } from "gatsby";

import { cn } from "../lib/helpers";

import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../components/layout";
import SEO from "../components/seo";
import HomepageSeriesProduct from "../components/homepageSeriesProduct";

import * as styles from "./productsPage.module.scss";
import SanityImage from "../components/sanityImage";

export const query = graphql`
  query ProductsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      seriesDisplayName
    }
    productsPage: sanityProductsPage(_id: { regex: "/(drafts.|)productsPage/" }) {
      title
      seriesHighlights {
        _key
        series {
          _key
          title
          description
          image {
            _key
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            asset {
              _id
              metadata {
                hasAlpha
                dimensions {
                  aspectRatio
                }
                palette {
                  dominant {
                    background
                  }
                }
              }
            }
          }
        }
        products {
          _id
          title
          slug {
            current
          }
          ...ProductFirstImageNarrowQuery
          ...ProductFirstImageQuery
        }
      }
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

const ProductsPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const productsPage = (data || {}).productsPage;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  if (!productsPage) {
    throw new Error(
      'Missing "Products Page". Open the studio at http://localhost:3333 and add some content to "Products page" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={productsPage.title}
        description={productsPage.seo && productsPage.seo.metaDescription}
        imageUrl={
          productsPage.seo &&
          productsPage.seo.openGraphImage &&
          productsPage.seo.openGraphImage.asset.url
        }
        htmlClassName="products"
      />

      <div>
        {productsPage.seriesHighlights &&
          productsPage.seriesHighlights.map((series, i) => (
            <React.Fragment key={series._key}>
              <div className={cn("mt-4", styles.info)}>
                <h2 className={cn("h1 my-0", styles.title)}>
                  {series.series.title} {site.seriesDisplayName || ""}
                </h2>
                <h3 className={cn("h3sans", styles.description)}>{series.series?.description}</h3>
              </div>
              {series.series?.image && (
                <SanityImage
                  image={series.series.image}
                  alt={series.series.title}
                  containerClassName={cn("mt-1", styles.imageContainer)}
                  paddingBottom="55%"
                />
              )}
              <div className="mt-1 mb-4">
                <div
                  className={cn(
                    styles.seriesImages,
                    series.products.length > 2 ? styles.seriesImagesGrid : "",
                    series.products.length === 2 ? styles.seriesImagesTwo : "",
                    series.products.length === 1 ? styles.seriesImagesOne : "",
                    series.products.length > 4 ? styles.seriesImagesMany : ""
                  )}
                >
                  {series.products &&
                    series.products.map(
                      (product) =>
                        product._id && (
                          <HomepageSeriesProduct
                            product={product}
                            series={series}
                            key={product && product._id}
                          />
                        )
                    )}
                </div>
                {i !== productsPage.seriesHighlights.length - 1 && (
                  <hr className={cn(styles.divider, "my-0 mt-4")} />
                )}
              </div>
            </React.Fragment>
          ))}
      </div>
    </Layout>
  );
};

export default ProductsPage;
