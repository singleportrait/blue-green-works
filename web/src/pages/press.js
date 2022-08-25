import React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';

import { cn } from '../lib/helpers';

import SEO from '../components/seo';
import Layout from '../containers/layout';
import BlockContent from '../components/block-content';
import SanityImage from '../components/sanityImage';
import Button from '../components/button';

import * as styles from './press.module.scss';

export const query = graphql`
  query PressPageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      keywords
      email
      seo {
        metaDescription
      }
    },
    press: sanityPress(_id: { regex: "/(drafts.|)press/" }) {
      title
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

const PressPage = props => {
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
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  if (!press) {
    throw new Error(
      'Missing "Press". Open the studio at http://localhost:3333 and add some content to "Press" and restart the development server.',
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
        <div className={cn('col-md-start-1-span-2', styles.info)}>
          <h1 className="mobileH2">{ press.title || 'Press' }</h1>
        </div>
        <div className={cn('col-md-start-3-span-7')}>
        </div>
      </div>
    </Layout>
  )
}

export default PressPage;
