import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { cn } from '../lib/helpers';

import BlockContent from './block-content';
import Button from './button';
import instagram from '../images/instagram.svg';

import * as styles from './footer.module.scss';

const footerQuery = graphql`
  query FooterQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      email
      instagram
      footer {
        _rawText
      }
    }
  }
`;

const Footer = () => {
  return (
    <>
      <hr />
      <StaticQuery
        query={footerQuery}
        render={({site}) => {
          return (
            <div className={styles.footer}>
              <div className={styles.infoAndIcon}>
                { site.footer._rawText &&
                  <BlockContent blocks={site.footer._rawText || []} />
                }
                { site.instagram &&
                  <a
                    className={styles.link}
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Instagram Link"
                  >
                    <img src={instagram} className={styles.linkImage} />
                  </a>
                }
              </div>
              { site.email &&
                <div className={styles.centeredFooter}>
                  <div className={cn(styles.emailLabel, 'label')}>All Inquiries:</div>
                  <Button text={site.email} link={`mailto:${site.email}`} targetBlank />
                </div>
              }
            </div>
          )
        }}
      />
    </>
  );
}

export default Footer;
