import React from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Homepage from "../components/homepage";

export const query = graphql`
  query PreviewHomepagePageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      email
      seriesDisplayName
    }
    homepage: sanityHomepage(_id: { regex: "/(drafts.|)homepage/" }) {
      title
      _rawDescription
      buttonText
      buttonUrl
      ...HomepageHeaderImageQuery
      ...HomepageHeaderImageNarrowQuery
      seriesHighlights {
        _key
        series {
          _key
          title
          description
        }
        products {
          _id
          title
          slug {
            current
          }
          ...ProductFirstImageNarrowQuery
        }
      }
    }
    productsPage: sanityProductsPage(_id: { regex: "/(drafts.|)productsPage/" }) {
      title
      slug {
        current
      }
    }
  }
`;

const PreviewHomepagePage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const homepage = (data || {}).homepage;
  const productsPage = (data || {}).productsPage;

  // console.log(site);
  // console.log(homepage);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  if (!homepage) {
    throw new Error(
      'Missing "Homepage". Open the studio at http://localhost:3333 and add some content to "Homepage" and restart the development server.'
    );
  }

  if (!productsPage) {
    throw new Error(
      'Missing "Products Page". Open the studio at http://localhost:3333 and add some content to "Products page" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} />
      <Homepage site={site} homepage={homepage} productsPage={productsPage} />
    </Layout>
  );
};

export default PreviewHomepagePage;
