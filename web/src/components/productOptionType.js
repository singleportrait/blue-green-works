import React, { useState, useRef } from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import { buildImageObj, cn } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

import * as styles from './productOptionType.module.scss';

const isDocument = typeof document !== `undefined`;

const ProductOptionType = ({type, i}) => {
  const [showDetail, setShowDetail] = useState(false);

  const imageUrl = imageUrlFor(buildImageObj(type.image.image)).width("200").fit("crop").url();

  const aspectRatio = type.image.image.asset.metadata.dimensions.aspectRatio;
  const backgroundColor = type.image.image.asset.metadata.palette.dominant.background;

  const ref = useRef(null);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      // console.log("You clicked outside of me!");
      setShowDetail(false);
    }

    if (isDocument) {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  const setupShowDetail = () => {
    setShowDetail(true);

    if (isDocument) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  };

  return (
    <div
      className={styles.type}
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
      onClick={() => setupShowDetail()}
      ref={ref}
    >
      <div
        className={styles.thumbnailContainer}
        style={{
          backgroundColor: backgroundColor
        }}
      >
        <img
          className={cn(styles.thumbnail, "lazyload")}
          src={imageUrl}
          alt={type.image.alt}
        />
      </div>
      { showDetail &&
        <div className={cn(
          styles.detail,
          i >=3 && styles.rightDetail
        )}>
          <h3 className={cn(styles.detailTitle, "label")}>{type.title}</h3>
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
