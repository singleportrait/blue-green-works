import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from "gatsby";

import { cn } from "../lib/helpers";

import SanityImage from './sanityImage';
import Button from './button';
import BlockContent from '../components/block-content';

import * as styles from './homepage.module.scss';

const Homepage = ({site, homepage}) => {
  if (!site || !homepage) return;

  return (
    <>
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

      <div className={cn("row", styles.descriptionRow)}>
        <div className={cn("col-md-start-2-span-3", styles.descriptionSection)}>
          { homepage._rawDescription &&
            <BlockContent blocks={homepage._rawDescription} />
          }
        </div>
        { site.email &&
          <div className={cn("col-md-start-7-span-3", styles.descriptionSection)}>
            <h2 className={cn("lightText", styles.descriptionHeader)}>{ homepage.contactHeader || "Contact Us:" }</h2>
            <Button
              text={site.email}
              link={`mailto:${site.email}`}
              targetBlank
              fullWidth
            />
          </div>
        }
      </div>

      <hr />

      <div>
        {homepage.seriesHighlights && homepage.seriesHighlights.map((series, i) =>
          <React.Fragment key={series._key}>
            <h2 className="h1 lightText centeredText mt-4">THE {series.series.title} SERIES</h2>
            <div className="mt-2 mb-4">
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
              { i !== (homepage.seriesHighlights.length - 1) &&
                <hr className={cn(styles.divider, 'my-0 mt-4')} />
              }
            </div>
            </React.Fragment>
          )}
      </div>
    </>
  );
}

export default Homepage;
