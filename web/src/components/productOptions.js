import React from 'react';
import ProductOptionType from './productOptionType';

import * as styles from './productOptions.module.scss';

const ProductOptions = ({options}) => {
  if (!options) return;

  return (
    <>
      { options.map((option, i) =>
        <React.Fragment key={option && option._id}>
          { option &&
            <div className="lightText">
              <h3 className={styles.title}>{option.title}:</h3>
              <div className={styles.productTypes}>
                {option.types.map((type, i) =>
                  <ProductOptionType type={type} key={type._key} />
                )}
              </div>
            </div>
          }
        </React.Fragment>
      )}
    </>
  )
}

export default ProductOptions;
