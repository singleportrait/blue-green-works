import React from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from './sanityImage.module.scss';

const SanityImage = ({image, alt, className = "", fullHeight}) => {
  // const aspectRatio = image.asset.metadata.dimensions.aspectRatio;
  const backgroundColor = image.asset.metadata.palette.dominant.background;

  const sizes = [800, 1200, 1600, 2000, null];
  const htmlSizes = "(max-width: 600px) 800px, (min-width: 601px) 1200px, (min-width: 1000px) 1600px, 2400";

  const getImageUrl = (size) => {
    let imageUrl;
    if (!size) {
      imageUrl = imageUrlFor(buildImageObj(image)).fit("crop").url();
    } else {
      imageUrl = imageUrlFor(buildImageObj(image)).width(size).fit("crop").url();
    }

    // console.log(imageUrl);
    return imageUrl;
  }

  const imageUrls = sizes.map((size) => {
    const url = getImageUrl(size);
    const width = size ? ` ${size}w` : '';
    return url + width;
  });

  // console.log(imageUrls);

  return (
    <div
      className={cn(
        styles.container,
        fullHeight ? styles.fullHeight : ''
      )}
      style={{
        backgroundColor: backgroundColor,
        // paddingBottom: `${aspectRatio * 100}%`
      }}
    >
      <img
        sizes={htmlSizes}
        // data-sizes="auto"
        data-srcset={imageUrls}
        src={getImageUrl(600)}
        alt={alt}
        className={cn(styles.image, className, 'lazyload')}
      />
    </div>
  );
}

export default SanityImage;
