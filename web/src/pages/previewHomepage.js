import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';

// import {
//   mapEdgesToNodes,
//   filterOutDocsWithoutSlugs,
//   filterOutDocsPublishedInTheFuture
// } from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
// import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import logo from '../images/blueGreenWorksComingSoon.svg';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';
import instagram from '../images/instagram.svg';
import email from '../images/email.svg';
import { cn } from "../lib/helpers";

import * as styles from './previewHomepage.module.css';

export const query = graphql`
  query PreviewHomepagePageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      subtitle
      description
      keywords
    }
    previewHomepage: sanityPreviewHomepage(_id: { regex: "/(drafts.|)previewHomepage/" }) {
      title,
      headerImage {
        image {
          asset {
            _id
            gatsbyImageData(fit: FILLMAX)
          }
        }
        alt
      }
      series {
        _key
        title
        description
        images {
          _key
          image {
            asset {
              _id
              gatsbyImageData(fit: FILLMAX)
            }
          }
          caption
          alt
        }
      }
    }
  }
`;

const SmallLabel = props => {
  return (
    <span className={styles.smallLabel}>{props.children}</span>
  );
}

const PreviewHomepagePage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <PortfolioLayout>
        <GraphQLErrorList errors={errors} />
      </PortfolioLayout>
    );
  }

  const site = (data || {}).site;
  const previewHomepage = (data || {}).previewHomepage;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className={styles.headerLink}>
          <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={cn(styles.headerImageContainer, 'largePaddingTop')}>
          <GatsbyImage image={previewHomepage.headerImage.image.asset.gatsbyImageData} width={1400} height={500} alt={previewHomepage.headerImage.alt} className={styles.headerImage} />
        </div>

        <hr />

        {previewHomepage.series.map((series, i) =>
          <div key={series._key} className={styles.series}>
            <div className={styles.seriesImages}>
              {series.images.map((figure, i) =>
                <div key={figure._key} className={styles.seriesImage}>
                  { figure.image &&
                    <GatsbyImage image={figure.image.asset.gatsbyImageData} alt={figure.alt} />
                  }
                  <SmallLabel>{figure.caption}</SmallLabel>
                  {figure.alt}
                  <hr />
                </div>
              )}
            </div>
            <div className={styles.seriesText}>
              <h2>{series.title}</h2>
              <p>{series.description}</p>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default PreviewHomepagePage;
