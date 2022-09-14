import React, { Fragment } from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";

import { cn } from "../lib/helpers";

import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import SanityImage from "../components/sanityImage";
import Button from "../components/button";

import * as styles from "./about.module.scss";

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      keywords
      email
      seo {
        metaDescription
      }
    }
    about: sanityAbout(_id: { regex: "/(drafts.|)about/" }) {
      title
      _rawDescription
      _rawAdditionalDescription
      buttonText
      seo {
        metaDescription
        openGraphImage {
          asset {
            url
          }
        }
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
      teamTitle
      members {
        _key
        name
        title
        description
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
  }
`;

const AboutPage = (props) => {
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
        description={about.seo.metaDescription || site.seo.metaDescription}
        keywords={site.keywords}
        imageUrl={about.seo && about.seo.openGraphImage && about.seo.openGraphImage.asset.url}
      />
      <div className="row">
        <div className={cn("col-md-start-1-span-7 col-lg-start-1-span-4", styles.imageContainer)}>
          <SanityImage image={about.image.image} alt={about.image.alt} fullHeight />
        </div>
        <div className={cn("col-md-start-8-span-3 col-lg-start-5-span-3", styles.info)}>
          <h1 className="h2">{about.title || "About"}</h1>
          {about._rawDescription && <BlockContent blocks={about._rawDescription} />}
        </div>
        <div
          className={cn(
            "col-md-start-8-span-3 col-lg-start-9-span-3",
            styles.info,
            styles.additionalInfo
          )}
        >
          {about._rawAdditionalDescription && (
            <BlockContent blocks={about._rawAdditionalDescription} className="sans" />
          )}
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
      {about.members.length > 0 && (
        <>
          <hr />
          <h2>{about.teamTitle || "The Team"}</h2>
          <div className={cn("row", styles.members)}>
            {about?.members.map((member, i) => (
              <Fragment key={member._key}>
                <div
                  className={cn(
                    i % 2 === 0 && "col-md-start-1-span-2",
                    i % 2 !== 0 && "col-md-start-6-span-2",
                    styles.memberImage
                  )}
                >
                  <SanityImage image={member.image.image} alt={member.image.alt} />
                </div>
                <div
                  className={cn(
                    i % 2 === 0 && "col-md-start-3-span-3",
                    i % 2 !== 0 && "col-md-start-8-span-3",
                    styles.memberInfo
                  )}
                >
                  <h3 className="h3sans my-0">{member.name}</h3>
                  {member.title && <p>{member.title}</p>}
                  {member.description && (
                    <p className={styles.memberDescription}>{member.description}</p>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default AboutPage;
