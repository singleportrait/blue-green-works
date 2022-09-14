import React from "react";

import SanityImage from "./sanityImage";
import LineArrow from "./lineArrow";

import * as styles from "./article.module.scss";

const Article = ({ key, article }) => {
  const imageColor = article.image?.image?.asset?.metadata?.palette?.dominant?.background;

  return (
    <a
      key={key}
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className={styles.article}
      style={{
        "--image-color": imageColor,
      }}
    >
      <SanityImage
        image={article.image.image}
        alt={article.image.alt}
        containerClassName={styles.articleImageContainer}
      />
      <div className={styles.source}>
        <h4 className="label">{article.source}</h4>
        <LineArrow />
      </div>
    </a>
  );
};

export default Article;
