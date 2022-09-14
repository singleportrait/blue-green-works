import React from "react";

import { cn } from "../lib/helpers";

import BlockContent from "../components/block-content";
import ProductOptions from "../components/productOptions";

import * as styles from "./productDetails.module.scss";
import { Link } from "gatsby";

const ProductDetails = ({ product, productSettings }) => {
  if (!product || !productSettings) return;

  return (
    <>
      {product._rawMaterials && (
        <>
          <h4 className={cn("label", styles.detailTitle)}>
            {productSettings.materialsLabel || "Materials"}
          </h4>
          <BlockContent className="smallBodyText textLeft" blocks={product._rawMaterials} />
        </>
      )}
      <br />
      {product.options.length > 0 && (
        <>
          <h4 className={cn("label", styles.detailTitle)}>
            {productSettings.optionsLabel || "Options"}
          </h4>
          <ProductOptions options={product.options} />
        </>
      )}
      {product._rawDimensions && (
        <>
          <h4 className={cn("label", styles.detailTitle)}>
            {productSettings.dimensionsLabel || "Dimensions"}
          </h4>
          <BlockContent className="smallBodyText textLeft" blocks={product._rawDimensions} />
          {product?.slug?.current && product?.instructionsFile?.asset?.url && (
            <Link
              to={`/products/${product.slug.current}/instructions`}
              className={cn("smallBodyText underline", styles.instructionsLink)}
            >
              Setup instructions
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
