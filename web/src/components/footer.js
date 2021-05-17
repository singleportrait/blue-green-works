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
                <h3 className={cn("lightText", styles.footerSectionTitle)}>
                  { site.footer.firstSectionTitle || "Address" }
                </h3>
                { site.footer._rawText &&
                  <BlockContent blocks={site.footer._rawText} />
                }
              </div>
              <div className={cn(styles.footerSection, styles.contactSection)}>
                <h3 className={cn("lightText", styles.footerSectionTitle)}>
                  { site.footer.secondSectionTitle || "Contact" }
                </h3>
                { site.email &&
                  <Button
                    text={site.email}
                    link={`mailto:${site.email}`}
                    targetBlank
                  />
                }
                { site.instagram &&
                  <a
                    className={cn(styles.link, "label")}
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Instagram Link"
                  >
                    <img src={instagram} className={styles.linkImage} />
                    { site.instagramHandle && `@${site.instagramHandle}` || "@BLUEGREENWORKS" }
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
