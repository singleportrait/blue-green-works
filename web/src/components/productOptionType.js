import React, { useState } from 'react';
import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from './productOptionType.module.scss';

const ProductOptionType = ({type}) => {
  const [showDetail, setShowDetail] = useState(false);

  const imageUrl = imageUrlFor(buildImageObj(type.image.image)).width("200").fit("crop").url();

  const aspectRatio = type.image.image.asset.metadata.dimensions.aspectRatio;
  const backgroundColor = type.image.image.asset.metadata.palette.dominant.background;

  return (
    <div
      className={styles.type}
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <img
        className={styles.thumbnail}
        src={imageUrl}
        alt={type.image.alt}
      />
      { showDetail &&
        <div className={styles.detail}>
          <h3 className="label">{type.title}</h3>
          <div
            className={styles.detailImageContainer}
            style={{
              paddingBottom: `${(1 / aspectRatio) * 100}%`,
              backgroundColor: backgroundColor
            }}
          >
            <img
              className={styles.detailImage}
              src={imageUrl}
              alt={type.image.alt}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default ProductOptionType;
