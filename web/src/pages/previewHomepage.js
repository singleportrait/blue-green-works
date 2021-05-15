import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from "gatsby";

import { cn } from "../lib/helpers";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Dropdown from '../components/dropdown';
import SanityImage from '../components/sanityImage';

import * as styles from './previewHomepage.module.scss';

export const query = graphql`
  query PreviewHomepagePageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      description
      keywords
    }
    homepage: sanityHomepage(_id: { regex: "/(drafts.|)homepage/" }) {
      title,
      headerImage {
        image {
          asset {
            _id
            gatsbyImageData(fit: FILLMAX)
          }
        }
        alt
      }
      headerImageNarrow {
        image {
          asset {
            _id
            gatsbyImageData(fit: FILLMAX)
          }
        }
        alt
      }
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
                url
                metadata {
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
        }
      }
    }
  }
`;

const PreviewHomepagePage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <PortfolioLayout>
        <GraphQLErrorList errors={errors} />
      </PortfolioLayout>
    );
  }

  const site = (data || {}).site;
  const homepage = (data || {}).homepage;

  // console.log(homepage);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const isEven = (i) => {
    return (i % 2) !== 0;
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <div className="mt-1 mb-2">
        <GatsbyImage
          image={homepage.headerImage.image.asset.gatsbyImageData}
          alt={homepage.headerImage.alt}
          className={cn(styles.headerImageContainer, styles.headerImageWide)}
          style={{display: 'block'}}
        />
        <GatsbyImage
          image={homepage.headerImageNarrow.image.asset.gatsbyImageData}
          alt={homepage.headerImageNarrow.alt}
          className={cn(styles.headerImageContainer, styles.headerImageNarrow)}
          style={{display: 'block'}}
        />
      </div>

      <hr />

      <div>
        {homepage.seriesHighlights && homepage.seriesHighlights.map((series, i) =>
          <div key={series._key} className={cn(styles.series, 'my-2')}>
            <div className={styles.seriesImages}>
              {series.products && series.products.map((product, i) =>
                <React.Fragment key={product && product._id}>
                  { product &&
                    <Link
                      className={cn(
                        styles.seriesImageContainer,
                        series.products.length == 3 ? styles.seriesImageThirds : '',
                        series.products.length == 4 ? styles.seriesImageQuarters : '',
                      )}
                      to={`/products/${product.slug.current}`}
                    >
                      { product.firstImageNarrow && product.firstImageNarrow.image.asset &&
                        <SanityImage
                          image={product.firstImageNarrow.image}
                          alt={product.firstImageNarrow.alt}
                          containerClassName={styles.seriesImage}
                          fullHeight
                        />
                      }
                      <div className={cn(styles.seriesImageCaptionSpacer, 'smallLabel')}>
                        { series.series.title } { product.title }
                      </div>
                    </Link>
                  }
                </React.Fragment>
              )}
            </div>
            <div className={styles.seriesInfo}>
              <div className={styles.seriesText}>
                <h2>{series.series.title} SERIES</h2>
                <p>{series.series.description}</p>
              </div>
              <div className={styles.seriesImageCaptionSpacer}></div>
            </div>
            { i !== (homepage.seriesHighlights.length - 1) &&
              <hr className={cn(styles.divider, 'my-0 mt-1')} />
            }
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PreviewHomepagePage;
