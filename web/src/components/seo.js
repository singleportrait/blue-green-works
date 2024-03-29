import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, htmlClassName, meta, keywords, title, imageUrl = "" }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || (data.site && data.site.seo && data.site.seo.metaDescription) || "";
        const siteTitle = (data.site && data.site.title) || "";
        const metaImage = imageUrl
          ? `${imageUrl}?fm=jpg&w=1200&fit=max`
          : data.site &&
            data.site.seo &&
            data.site.seo.openGraphImage &&
            `${data.site.seo.openGraphImage.asset.url}?fm=jpg&w=1200&fit=max`;

        // console.log("Data", data);

        const fullTitle = title === siteTitle ? siteTitle : `${title} | ${siteTitle}`;

        return (
          <Helmet
            htmlAttributes={{
              lang,
              class: htmlClassName,
            }}
            title={title}
            titleTemplate={fullTitle}
            meta={[
              {
                name: "description",
                content: metaDescription,
              },
              {
                property: "og:title",
                content: fullTitle,
              },
              {
                property: "og:description",
                content: metaDescription,
              },
              {
                property: "og:type",
                content: "website",
              },
              {
                property: "og:image",
                content: metaImage,
              },
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:title",
                content: fullTitle,
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", "),
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  className: "",
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      keywords
      seo {
        openGraphImage {
          asset {
            url
          }
        }
        metaDescription
      }
    }
  }
`;
