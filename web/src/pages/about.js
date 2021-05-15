import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';
import GraphQLErrorList from "../components/graphql-error-list";

import { cn } from "../lib/helpers";

import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import SanityImage from '../components/sanityImage';
import Button from '../components/button';

import * as styles from './about.module.scss';

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      description
      keywords
      email
    },
    about: sanityAbout(_id: { regex: "/(drafts.|)about/" }) {
      title
      _rawDescription
      buttonText
      seo {
        metaDescription
      }
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
  }
`;

const AboutPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const about = (data || {}).about;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  if (!about) {
    throw new Error(
      'Missing "About". Open the studio at http://localhost:3333 and add some content to "About" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={about.title || site.title}
        description={about.seo.metaDescription || site.description}
        keywords={site.keywords}
      />
      <div className="row">
        <div className={cn("col-md-start-1-span-7", styles.imageContainer)}>
          <SanityImage
            image={about.image.image}
            alt={about.image.alt}
            fullHeight
          />
        </div>
        <div className={cn("col-md-start-8-span-3", styles.info)}>
          <h2 className="lightText">{ about.title || "About" }</h2>
          { about._rawDescription &&
            <BlockContent className="lightText" blocks={about._rawDescription} />
          }
          <Button
            text={about.buttonText || "Contact Us"}
            link={`mailto:${site.email}`}
            className="mt-1"
            targetBlank
            fullWidth
            light
          />
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage;
