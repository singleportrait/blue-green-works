import React from 'react';
import { StaticQuery, graphql } from "gatsby";
import { cn } from '../lib/helpers';

import BlockContent from './block-content';
import Button from './button';
import EmailIcon from './emailIcon';
import InstagramIcon from './instagramIcon';

import * as styles from './footer.module.scss';

const footerQuery = graphql`
  query FooterQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      email
      instagram
      instagramHandle
      footer {
        firstSectionTitle
        _rawText
        secondSectionTitle
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
              <div className={styles.footerSection}>
                <h3 className={cn("accentText", styles.footerSectionTitle)}>
                  { site.footer.firstSectionTitle || "Address" }
                </h3>
                { site.footer._rawText &&
                  <BlockContent blocks={site.footer._rawText} />
                }
              </div>
              <div className={cn(styles.footerSection, styles.contactSection)}>
                <h3 className={cn("accentText", styles.footerSectionTitle)}>
                  { site.footer.secondSectionTitle || "Contact" }
                </h3>
                { site.email &&
                  <a
                    className={cn(styles.link, "label")}
                    href={`mailto:${site.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Email Link"
                  >
                    <EmailIcon className={styles.linkImage} />
                    { site.email }
                  </a>
                }
                { site.instagram &&
                  <a
                    className={cn(styles.link, "label")}
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Instagram Link"
                  >
                    <InstagramIcon className={styles.linkImage} />
                    { site.instagramHandle && `@${site.instagramHandle}` || "Instagram" }
                  </a>
                }
              </div>
            </div>
          )
        }}
      />
    </>
  );
}

export default Footer;
