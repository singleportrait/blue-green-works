import React from 'react';

import { cn } from "../lib/helpers";

import SanityImage from './sanityImage';
import Button from './button';
import BlockContent from '../components/block-content';
import HomepageSeriesProduct from './homepageSeriesProduct';

import * as styles from './homepage.module.scss';

const Homepage = ({site, homepage, productsPage}) => {
  if (!site || !homepage || !productsPage) return;

  return (
    <>
      <div className="mt-1 mb-2">
        <SanityImage
          image={homepage.headerImage.image}
          alt={homepage.headerImage.alt}
          containerClassName={cn(styles.headerImageContainer, styles.headerImageWide)}
          fullHeight
        />
        <SanityImage
          image={homepage.headerImageNarrow.image}
          alt={homepage.headerImageNarrow.alt}
          containerClassName={cn(styles.headerImageContainer, styles.headerImageNarrow)}
          fullHeight
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

      <div className={cn("my-4", styles.productsButtonContainer)}>
        <Button
          text={ productsPage.productsCTA || "View All Lighting" }
          link={`/${productsPage.slug.current}`}
          light
          internalLink
          className={styles.productsButton}
        />
      </div>
    </>
  );
}

export default Homepage;
