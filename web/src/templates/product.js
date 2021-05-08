import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

import Layout from "../containers/layout";
import SEO from '../components/seo';
import BlockContent from '../components/block-content';
import Button from '../components/button';

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      email
      productContactText
    }
    product: sanityProduct(id: { eq: $id }) {
      id
      title
      images {
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
            metadata {
              dimensions {
                aspectRatio
              }
              palette {
                dominant {
                  foreground
                }
              }
            }
          }
          _key
        }
        alt
        caption
      }
      options {
        _key
        title
        types {
          _key
          title
          image {
            _key
            _type
            caption
            alt
            _rawImage
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
    }
  }
`;

const ProductTemplate = props => {
  const { data, errors } = props;
  const product = data && data.product;
  const site = data && data.site;

  return (
    <Layout>
      <SEO title={product.title} description={product.description} />
      <h1>{product.title}</h1>
      { product._rawDescription &&
        <BlockContent blocks={product._rawDescription || []} />
      }
      <Button
        text={site.productContactText || "Contact Us"}
        link={`mailto:${site.email}`}
        targetBlank
      />
      <br /><br />
      { product.tearSheet &&
        <Button
          text="Download Tear Sheet"
          link={product.tearSheet.PDF.asset.url}
          targetBlank
        />
      }
      <hr />
      Add'l info (if there is):
      <br />
      { product._rawMaterials &&
        <>
          <br />
          <h3>Materials:</h3>
          <BlockContent blocks={product._rawMaterials} />
        </>
      }
      <br />
      { product.options.length > 0 && <h3>Options:</h3> }
      { product.options && product.options.map((option, i) =>
        <div key={option._key}>
          <h3>{option.title}:</h3>
          {option.types.map((type, i) =>
          <p key={type._key}>
            {type.title}
          </p>
          )}
        </div>
      )}
      { product._rawDimensions &&
        <>
          <br />
          <h3>Dimensions:</h3>
          <BlockContent blocks={product._rawDimensions} />
        </>
      }
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  )
}

export default ProductTemplate;
