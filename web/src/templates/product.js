import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import Product from "../components/product";

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      email
      productSettings {
        contactText
        tearSheetText
        materialsLabel
        optionsLabel
        dimensionsLabel
      }
    }
    product: sanityProduct(id: { eq: $id }) {
      id
      title
      ...ProductFirstImageQuery
      ...ProductFirstImageNarrowQuery
      ...ProductImagesQuery
      options {
        _id
        title
        types {
          _key
          title
          image {
            _key
            caption
            alt
            image {
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
                    height
                    width
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
        }
      }
      tearSheet {
        PDF {
          asset {
            url
          }
        }
        title
      }
      _rawDescription
      _rawDimensions
      _rawMaterials
      materials {
        _key
      }
      series {
        title
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

const ProductTemplate = (props) => {
  const { data, errors } = props;
  const product = data && data.product;
  const site = data && data.site;

  if (product.series) {
    product.fullTitle = `${product.series.title} ${product.title}`;
  } else {
    product.fullTitle = product.title;
  }

  const shareImageUrl =
    (product.seo && product.seo.openGraphImage && product.seo.openGraphImage.asset.url) ||
    (product.firstImage && product.firstImage.image.asset.url);

  return (
    <Layout>
      <SEO
        title={product.fullTitle}
        description={product.seo && product.seo.metaDescription}
        imageUrl={shareImageUrl}
        htmlClassName="product"
      />
      <Product product={product} site={site} />
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default ProductTemplate;
