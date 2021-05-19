import React, { useState } from 'react';
import { Link } from "gatsby";

import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import SanityImage from './sanityImage';

import * as styles from './homepageSeriesProduct.module.scss';

const HomepageSeriesProduct = ({product, series}) => {
  if (!product || !series) return;

  const [showHoverImage, setShowHoverImage] = useState(false);

  const firstProductImage = product.images[0]

  const imageUrl = imageUrlFor(buildImageObj(product.firstImageNarrow.image)).width(1200).fit("crop").url();
  const hoverImageUrl = imageUrlFor(buildImageObj(firstProductImage.image)).width(1200).fit("crop").url();

  return (
    <React.Fragment>
      <Link
        className={cn(
          styles.seriesProductContainer,
          series.products.length == 3 ? styles.seriesProductThirds : '',
          series.products.length == 4 ? styles.seriesProductQuarters : '',
        )}
        to={`/products/${product.slug.current}`}
        // onClick={() => setShowHoverImage(!showHoverImage)}
        onMouseEnter={() => setShowHoverImage(true)}
        onMouseLeave={() => setShowHoverImage(false)}
      >
        { product.firstImageNarrow && product.firstImageNarrow.image.asset &&
          <div className={styles.seriesImageContainer}>
            <img
              src={imageUrl}
              alt={product.firstImageNarrow.alt}
              className={styles.seriesImage}
            />
          </div>
        }
        { firstProductImage && firstProductImage.image.asset &&
          <div className={cn(
            styles.seriesImageContainer,
            styles.seriesHoverImageContainer,
            showHoverImage && styles.seriesHoverImageVisible
          )}>
            <img
              src={hoverImageUrl}
              alt={firstProductImage.alt}
              className={styles.seriesImage}
            />
          </div>
        }
        <div className={cn(styles.seriesImageCaption, 'smallLabel')}>
          <div>{ series.series.title } { product.title }</div>
          { showHoverImage &&
            <div>View</div>
          }
        </div>
      </Link>
    </React.Fragment>
  )
}

export default HomepageSeriesProduct;
