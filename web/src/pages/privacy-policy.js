import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

// import { cn } from "../lib/helpers";

import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";

// import * as styles from "./privacyPolicy.module.scss";

export const query = graphql`
  query PrivacyPolicyPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      keywords
      email
      seo {
        metaDescription
      }
    }
    privacyPolicy: sanityPrivacyPolicy(_id: { regex: "/(drafts.|)privacyPolicy/" }) {
      title
      _rawText
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

const PrivacyPolicyPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const privacyPolicy = (data || {}).privacyPolicy;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  if (!privacyPolicy) {
    throw new Error(
      'Missing "PrivacyPolicy". Open the studio at http://localhost:3333 and add some content to "PrivacyPolicy" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={privacyPolicy.title || site.title}
        description={privacyPolicy?.seo?.metaDescription || site.seo.metaDescription}
        keywords={site.keywords}
        imageUrl={privacyPolicy?.seo?.openGraphImage?.asset?.url}
      />
      <h1 className="h2">{privacyPolicy.title || "Privacy Policy"}</h1>
      {privacyPolicy._rawText && <BlockContent blocks={privacyPolicy._rawText} />}
      {/* <div className="row">
        <div className={cn("col-md-start-1-span-7 col-lg-start-1-span-4", styles.imageContainer)}>
        </div>
        <div className={cn("col-md-start-8-span-3 col-lg-start-5-span-3", styles.info)}>
        </div>

      </div> */}
    </Layout>
  );
};

export default PrivacyPolicyPage;
