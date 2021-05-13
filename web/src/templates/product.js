import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from "../containers/layout";
import SEO from '../components/seo';
import BlockContent from '../components/block-content';
import Button from '../components/button';

import * as styles from './product.module.scss';
import { cn } from "../lib/helpers";

export const imageQuery = graphql`
  fragment ImagesQuery on SanityProduct {
    firstImage {
      _key
      image {
        asset {
          _id
          gatsbyImageData(fit: FILLMAX)
        }
      }
      alt
    }
    images {
      _key
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
          gatsbyImageData(fit: FILLMAX)
          url
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
  }
`;

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      email
      productContactText
    }
    product: sanityProduct(id: { eq: $id }) {
      id
      title
      ...ImagesQuery
      options {
        _id
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
      series {
        title
      }
    }
  }
`;

const ProductTemplate = props => {
  const { data, errors } = props;
  const product = data && data.product;
  const site = data && data.site;

  const firstImage = (product.firstImage && product.firstImage.image && product.firstImage.image.asset) && product.firstImage;

  // console.log(product);

  if (product.series) {
    product.fullTitle = `${product.series.title} ${product.title}`;
  } else {
    product.fullTitle = product.title
  }

  return (
    <Layout>
      <SEO title={product.title} description={product.description} />
      <div className={cn(styles.product, 'row')}>
        <div className={cn(
          "col-lg-start-1-span-2",
          "col-md-start-1-span-3",
          styles.productInfo,
          styles.description
        )}>
          <div className={styles.lightText}>
            <h2>
              { product.series && product.series.title }
              <br />
              { product.title }
            </h2>
            { product._rawDescription &&
              <BlockContent blocks={product._rawDescription || []} />
            }
          </div>
          <br />
          <Button
            text={site.productContactText || "Contact Us"}
            link={`mailto:${site.email}`}
            targetBlank
            fullWidth
            light
          />
          { product.tearSheet && product.tearSheet.PDF && product.tearSheet.PDF.asset &&
            <Button
              text="Download Tear Sheet"
              link={product.tearSheet.PDF.asset.url}
              targetBlank
              fullWidth
              light
              className="mt-1"
            />
          }
        </div>
        <div className="col-lg-start-3-span-6 col-md-start-4-span-5">
          { firstImage &&
            <GatsbyImage
              image={firstImage.image.asset.gatsbyImageData}
              alt={firstImage.alt}
              className={cn(styles.firstImage, styles.image)}
              style={{display: 'block'}}
            />
          }
          { product.images.map((figure, i) =>
            <React.Fragment key={figure._key}>
              { figure.image && figure.image.asset &&
                <GatsbyImage
                  key={figure._key}
                  image={figure.image.asset.gatsbyImageData}
                  alt={figure.alt}
                  className={cn(!product.firstImage ? styles.firstImage : '', styles.image)}
                  style={{display: 'block'}}
                />
              }
            </React.Fragment>
          )}
        </div>
        <div className={cn("col-md-start-9-span-2", styles.productInfo)}>
          { product._rawMaterials &&
            <>
              <br />
              <h3 className="label">Materials:</h3>
              <BlockContent className={styles.lightText} blocks={product._rawMaterials} />
            </>
          }
          <br />
          { product.options.length > 0 &&
            <>
              <h3 className="label">Options:</h3>
              { product.options.map((option, i) =>
                <React.Fragment key={option && option._id}>
                  { option &&
                    <div className={styles.lightText}>
                      <h3>{option.title}:</h3>
                      {option.types.map((type, i) =>
                        <p key={type._key}>
                          - {type.title}
                        </p>
                      )}
                    </div>
                  }
                </React.Fragment>
              )}
            </>
          }
          { product._rawDimensions &&
            <>
              <br />
              <h3 className="label">Dimensions:</h3>
              <BlockContent className={styles.lightText} blocks={product._rawDimensions} />
            </>
          }
        </div>
      </div>
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  )
}

export default ProductTemplate;
