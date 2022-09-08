import React from "react";

import { cn } from "../lib/helpers";

import BlockContent from "./block-content";
import Button from "./button";
import SanityImage from "./sanityImage";
import ProductDetails from "./productDetails";

import * as styles from "./product.module.scss";

const Buttons = ({ className = "", contactText, email, tearSheet, tearSheetText }) => {
  return (
    <div className={cn(styles.buttons, className)}>
      <Button
        text={contactText || "Contact Us"}
        link={`mailto:${email}`}
        targetBlank
        fullWidth
        light
      />
      {tearSheet && tearSheet.PDF && tearSheet?.PDF?.asset && (
        <Button
          text={tearSheetText || "Download Tear Sheet"}
          link={tearSheet.PDF.asset.url}
          targetBlank
          fullWidth
          light
          className="mt-1"
        />
      )}
    </div>
  );
};

const Product = ({ product, site }) => {
  if (!product || !site) return;

  const firstImage =
    product.firstImage &&
    product.firstImage.image &&
    product.firstImage.image.asset &&
    product.firstImage;
  const firstImageNarrow =
    product.firstImageNarrow &&
    product.firstImageNarrow.image &&
    product.firstImageNarrow.image.asset &&
    product.firstImageNarrow;

  // console.log(product);

  return (
    <div className={cn(styles.product, "row")}>
      {firstImageNarrow && (
        <div className={styles.mobileHeaderImageContainer}>
          <SanityImage
            image={firstImageNarrow.image}
            alt={firstImageNarrow.alt}
            className={styles.mobileHeaderImage}
            fullHeight
          />
        </div>
      )}
      <div
        className={cn(
          "col-lg-start-1-span-2",
          "col-md-start-1-span-3",
          styles.productInfo,
          styles.description
        )}
      >
        <div>
          <h2 className={styles.title}>
            {product.series && product.series.title}
            {product.series && <br />}
            {product.title}
          </h2>
          {product._rawDescription && <BlockContent blocks={product._rawDescription} />}
        </div>
        <Buttons
          className={styles.desktopButtons}
          contactText={site.productSettings && site.productSettings.contactText}
          email={site.email}
          tearSheet={product.tearSheet}
          tearSheetText={site.productSettings && site.productSettings.tearSheetText}
        />
      </div>
      <div className={cn("col-lg-start-3-span-6 col-md-start-4-span-5", styles.images)}>
        {firstImage && (
          <div className={cn(styles.firstImageContainer, styles.image)}>
            <SanityImage image={firstImage.image} alt={firstImage.alt} fullHeight />
          </div>
        )}
        {firstImageNarrow && (
          <div className={cn(styles.firstImageNarrowContainer, styles.image)}>
            <SanityImage image={firstImageNarrow.image} alt={firstImageNarrow.alt} fullHeight />
          </div>
        )}
        {product.images.map((figure) => (
          <div
            key={figure._key}
            className={cn(!product.firstImage ? styles.firstImageContainer : "", styles.image)}
          >
            {figure.image && figure.image.asset && (
              <SanityImage image={figure.image} alt={figure.alt} />
            )}
          </div>
        ))}
      </div>
      <div className={cn("col-md-start-9-span-2", styles.productInfo, styles.details)}>
        {site.productSettings && (
          <ProductDetails productSettings={site.productSettings} product={product} />
        )}
        <Buttons
          className={styles.mobileButtons}
          contactText={site.productSettings && site.productSettings.contactText}
          email={site.email}
          tearSheet={product.tearSheet}
          tearSheetText={site.productSettings && site.productSettings.tearSheetText}
        />
      </div>
    </div>
  );
};

export default Product;
