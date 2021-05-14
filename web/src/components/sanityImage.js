import React from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from './sanityImage.module.scss';

const SanityImage = ({image, alt, className = "", containerClassName = "", fullHeight}) => {

  /* Get image metadata if it exists */
  let aspectRatio = image.asset.metadata.dimensions.aspectRatio || null;
  const backgroundColor = image.asset.metadata.palette.dominant.background || null;

  /* Check for transparency in the image */
  let hasAlpha;
  if (typeof image.asset.metadata.hasAlpha == "undefined") {
    hasAlpha = false;
  } else {
    hasAlpha = image.asset.metadata.hasAlpha;
  }
  // console.log(alt, image.asset.metadata, hasAlpha);

  /* Check for any crop values to accurately calculate aspect ratio */
  const crop = image.crop;
  const height = image.asset.metadata.dimensions.height || null;
  const width = image.asset.metadata.dimensions.width || null;

  if (crop && height && width && !fullHeight) {
    let finalHeight = height;
    let finalWidth = width;
    if (crop.bottom || crop.top) {
      const topCrop = height * crop.top;
      const bottomCrop = height * crop.bottom;
      finalHeight = height - topCrop - bottomCrop;
    }

    if (crop.left || crop.right) {
      const leftCrop = width * crop.left;
      const rightCrop = width * crop.right;
      finalWidth = width - leftCrop - rightCrop;
    }

    aspectRatio = finalWidth / finalHeight;
    // console.log("Cropped aspect ratio", aspectRatio);
    // console.log("Cropped reversed aspect ratio", 1 / aspectRatio);
  }

  /* Sizes to use for lazysizes */
  const sizes = [800, 1200, 1600, 2000, null];
  const htmlSizes = "(max-width: 600px) 800px, (min-width: 601px) 1200px, (min-width: 1000px) 1600px, 2400";

  const getImageUrl = (size) => {
    let imageUrl;
    if (!size) {
      imageUrl = imageUrlFor(buildImageObj(image)).fit("crop").url();
    } else {
      imageUrl = imageUrlFor(buildImageObj(image)).width(size).fit("crop").url();
    }

    return imageUrl;
  }

  const imageUrls = sizes.map((size) => {
    const url = getImageUrl(size);
    const width = size ? ` ${size}w` : '';
    return url + width;
  });

  // console.log(image);
  // console.log(imageUrls);

  const backgroundStyle = (!hasAlpha && backgroundColor) && backgroundColor;
  const paddingStyle = (!fullHeight && aspectRatio) && `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      className={cn(
        styles.container,
        fullHeight ? styles.fullHeight : '',
        containerClassName
      )}
      style={{
        backgroundColor: backgroundStyle,
        paddingBottom: paddingStyle
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
