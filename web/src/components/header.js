import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { cn } from '../lib/helpers';

import HamburgerIcon from './hamburgerIcon';
import Logo from './logo';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';

import * as styles from './header.module.scss';

const headerQuery = graphql`
  query DefaultHeaderQuery {
    productsPage: sanityProductsPage(_id: { regex: "/(drafts.|)productsPage/" }) {
      title
      slug {
        current
      }
    }
  }
`;

const Header = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <StaticQuery
      query={headerQuery}
      render={data => {

        const productsPage = data.productsPage;

        return (
          <>
            <div className={styles.header}>
              <div className={cn(styles.linksContainer, styles.leftLinksContainer)}>
                {productsPage.slug && productsPage.slug.current &&
                  <Link to={`/${productsPage.slug.current}`} className={cn(styles.text, 'label')}>
                    {productsPage.title}
                  </Link>
                }
                <Link to={'/about'} className={cn(styles.text, 'label')}>
                  About
                </Link>
              </div>
              <Link className={styles.logoContainer} to={'/'}>
                <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
                <Logo className={cn(styles.logo, styles.wideLogo)} />
              </Link>
              <div className={cn(styles.linksContainer, styles.rightLinksContainer)}>
                <Link to={'/press'} className={cn(styles.text, 'label')}>
                  Press
                </Link>
                <Link to={'/press'} className={cn(styles.text, 'label')}>
                  Book
                </Link>
              </div>
            </div>
            <div className={cn(
              styles.mobileHeader,
              showLinks && styles.mobileHeaderOpen,
            )}
            >
              <div className={styles.mobileLogoContainer}>
                <Link to={'/'}>
                  <Logo className={styles.logo} />
                </Link>
                <div
                  onClick={() => setShowLinks(!showLinks)}
                  className={styles.hamburgerMenu}
                >
                  <HamburgerIcon />
                </div>
              </div>
              {showLinks &&
                <div className={styles.mobileHeaderLinks}>
                  {productsPage.slug && productsPage.slug.current &&
                    <Link to={`/${productsPage.slug.current}`} className={cn(styles.text, 'label', styles.firstLink)}>
                      {productsPage.title}
                    </Link>
                  }
                  <Link to={'/about'} className={cn(styles.text, 'label')}>
                    About
                  </Link>
                  <Link to={'/press'} className={cn(styles.text, 'label')}>
                    Press
                  </Link>
                  <Link to={'/press'} className={cn(styles.text, 'label', styles.lastLink)}>
                    Book
                  </Link>
                </div>
              }
            </div>
          </>
        )
      }}
    />
  )
};

export default Header;
