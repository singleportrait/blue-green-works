import React from "react";
import { Link } from "gatsby";

import { cn } from "../lib/helpers";

import SanityImage from "./sanityImage";
import LineArrow from "./lineArrow";

import * as styles from "./homepageSeriesProduct.module.scss";

const HomepageSeriesProduct = ({ product, series }) => {
  if (!product || !series) return;
  const imageColor =
    product.firstImageNarrow?.image?.asset?.metadata?.palette?.darkVibrant?.background;

  return (
    <React.Fragment>
      <Link
        className={cn(
          styles.seriesImageContainer,
          series.products.length === 1 ? styles.seriesImageFull : "",
          series.products.length === 2 ? styles.seriesImageHalves : "",
          series.products.length === 3 ? styles.seriesImageThirds : "",
          series.products.length === 4 ? styles.seriesImageQuarters : ""
        )}
        to={`/products/${product.slug.current}`}
        style={{
          "--image-color": imageColor,
        }}
      >
        {series.products.length === 1 && product.firstImage && product.firstImage.image.asset && (
          <SanityImage
            image={product.firstImage.image}
            alt={product.firstImage.alt}
            containerClassName={cn(styles.seriesImage, styles.showOnMedium)}
            fullHeight
          />
        )}
        {product.firstImageNarrow && product.firstImageNarrow.image.asset && (
          <SanityImage
            image={product.firstImageNarrow.image}
            alt={product.firstImageNarrow.alt}
            containerClassName={cn(
              styles.seriesImage,
              series.products.length === 1 ? styles.hideOnMedium : ""
            )}
            fullHeight
          />
        )}
        <div className={cn(styles.seriesImageCaption)}>
          <div>
            {series.series.title} {product.title}
          </div>
          <LineArrow />
        </div>
      </Link>
    </React.Fragment>
  );
};

export default HomepageSeriesProduct;
