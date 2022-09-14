import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

import Container from "../components/container";
import SEO from "../components/seo";

import * as styles from "./instructions.module.scss";

export const query = graphql`
  query InstructionsTemplateQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      id
      title
      instructionsFile {
        asset {
          url
        }
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

const InstructionsTemplate = (props) => {
  const { data, errors } = props;
  const product = data && data.product;
  // console.log("Data", data);

  if (product.series) {
    product.fullTitle = `${product.series.title} ${product.title} Instructions`;
  } else {
    product.fullTitle = `${product.title} Instructions`;
  }

  const shareImageUrl =
    (product.seo && product.seo.openGraphImage && product.seo.openGraphImage.asset.url) ||
    (product.firstImage && product.firstImage.image.asset.url);

  return (
    <>
      <SEO
        title={product.fullTitle}
        description={product?.seo?.metaDescription}
        imageUrl={shareImageUrl}
        htmlClassName="product"
      />
      <iframe
        src={product?.instructionsFile?.asset?.url}
        title={product.fullTitle}
        className={styles.iframe}
        width="100"
        height="500"
      />
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </>
  );
};

export default InstructionsTemplate;
