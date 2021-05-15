import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

import { cn } from "../lib/helpers";

import Layout from "../containers/layout";
import SEO from '../components/seo';
import BlockContent from '../components/block-content';
import Button from '../components/button';
import SanityImage from '../components/sanityImage';
import ProductOptions from '../components/productOptions';

import * as styles from './product.module.scss';

export const imageQuery = graphql`
  fragment ImagesQuery on SanityProduct {
    firstImage {
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
      alt
    }
    firstImageNarrow {
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
            }
            palette {
              dominant {
                background
              }
            }
          }
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

const Buttons = ({ className = '', productContactText, email, tearSheet }) => {
  return (
    <div className={cn(styles.buttons, className)}>
      <Button
        text={productContactText || "Contact Us"}
        link={`mailto:${email}`}
        targetBlank
        fullWidth
        light
      />
      { tearSheet && tearSheet.PDF && tearSheet.PDF.asset &&
        <Button
          text="Download Tear Sheet"
          link={tearSheet.PDF.asset.url}
          targetBlank
          fullWidth
          light
          className="mt-1"
        />
      }
    </div>
  );
}

const ProductTemplate = props => {
  const { data, errors } = props;
  const product = data && data.product;
  const site = data && data.site;

  const firstImage = (product.firstImage && product.firstImage.image && product.firstImage.image.asset) && product.firstImage;
  const firstImageNarrow = (product.firstImageNarrow && product.firstImageNarrow.image && product.firstImageNarrow.image.asset) && product.firstImageNarrow;

  // console.log(product);

  if (product.series) {
    product.fullTitle = `${product.series.title} ${product.title}`;
  } else {
    product.fullTitle = product.title
  }

  return (
    <Layout>
      <SEO
        title={product.title}
        description={product.seo && product.seo.metaDescription}
        imageUrl={product.seo && product.seo.openGraphImage.asset.url}
      />
      <div className={cn(styles.product, 'row')}>
        { firstImageNarrow &&
          <div className={styles.mobileHeaderImageContainer}>
            <SanityImage
              image={firstImageNarrow.image}
              alt={firstImageNarrow.alt}
              className={styles.mobileHeaderImage}
              fullHeight
            />
          </div>
        }
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
          <Buttons
            className={styles.desktopButtons}
            productContactText={site.productContactText}
            email={site.email}
            tearSheet={product.tearSheet}
          />
        </div>
        <div className={cn(
          "col-lg-start-3-span-6 col-md-start-4-span-5",
          styles.images
        )}>
          { firstImage &&
            <div className={cn(styles.firstImageContainer, styles.image)}>
              <SanityImage
                image={firstImage.image}
                alt={firstImage.alt}
                fullHeight
              />
            </div>
          }
          { firstImageNarrow &&
            <div className={cn(styles.firstImageNarrowContainer, styles.image)}>
              <SanityImage
                image={firstImageNarrow.image}
                alt={firstImageNarrow.alt}
                fullHeight
              />
            </div>
          }
          { product.images.map((figure, i) =>
            <div
              key={figure._key}
              className={cn(!product.firstImage ? styles.firstImageContainer : '', styles.image)}
            >
              { figure.image && figure.image.asset &&
                <SanityImage
                  image={figure.image}
                  alt={figure.alt}
                />
              }
            </div>
          )}
        </div>
        <div className={cn("col-md-start-9-span-2", styles.productInfo, styles.details)}>
          { product._rawMaterials &&
            <>
              <h3 className="label">Materials:</h3>
              <BlockContent className={styles.lightText} blocks={product._rawMaterials} />
            </>
          }
          <br />
          { product.options.length > 0 &&
            <>
              <h3 className="label">Options:</h3>
              <ProductOptions options={product.options} />
            </>
          }
          { product._rawDimensions &&
            <>
              <h3 className="label">Dimensions:</h3>
              <BlockContent className={styles.lightText} blocks={product._rawDimensions} />
            </>
          }
          <Buttons
            className={styles.mobileButtons}
            productContactText={site.productContactText}
            email={site.email}
            tearSheet={product.tearSheet}
          />
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
