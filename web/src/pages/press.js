import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

import { cn } from "../lib/helpers";

import SEO from "../components/seo";
import Layout from "../containers/layout";
import Article from "../components/article";

import * as styles from "./press.module.scss";

export const query = graphql`
  query PressPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      keywords
      email
      seo {
        metaDescription
      }
    }
    press: sanityPress(_id: { regex: "/(drafts.|)press/" }) {
      title
      articles {
        _key
        source
        url
        image {
          _key
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            asset {
              _id
              metadata {
                hasAlpha
                dimensions {
                  aspectRatio
                }
                palette {
                  dominant {
                    background
                  }
                }
              }
            }
          }
          alt
        }
      }
      seo {
        metaDescription
        openGraphImage {
          asset {
            url
          }
        }
      }
    }
  }
`;

const PressPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const press = (data || {}).press;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  if (!press) {
    throw new Error(
      'Missing "Press". Open the studio at http://localhost:3333 and add some content to "Press" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={press.title || site.title}
        description={press.seo?.metaDescription || site.seo.metaDescription}
        keywords={site.keywords}
        imageUrl={press.seo?.openGraphImage && press.seo.openGraphImage.asset.url}
      />
      <div className="row">
        <div className="col-md-start-1-span-2">
          <h1 className={cn("mobileH2", styles.title)}>{press.title || "Press"}</h1>
        </div>
        <div className={cn("col-md-start-3-span-8", styles.articles)}>
          {press.articles?.map((article) => (
            <Article key={article._key} article={article} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PressPage;
