import React from 'react';
import { Link } from "gatsby";

import { cn } from "../lib/helpers";

import SanityImage from './sanityImage';

import * as styles from './homepageSeriesProduct.module.scss';

const HomepageSeriesProduct = ({product, series}) => {
  if (!product || !series) return;

  return (
    <React.Fragment>
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
          <div className={cn(styles.seriesImageCaption, 'smallLabel')}>
            { series.series.title } { product.title }
          </div>
        </Link>
      }
    </React.Fragment>
  );
}

export default HomepageSeriesProduct;
