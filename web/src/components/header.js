import React, { useState } from "react";
import { Link } from "gatsby";
import { cn } from "../lib/helpers";

import HamburgerIcon from './hamburgerIcon';
import Logo from './logo';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';

import * as styles from "./header.module.scss";

const Header = (props) => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <Link to={`/previewHomepage`} className={cn(styles.text, 'label')}>
          Home
        </Link>
        <Link className={styles.logoContainer} to={`/previewHomepage`}>
          <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
          <Logo className={cn(styles.logo, styles.wideLogo)} />
        </Link>
        <Link to={`/about`} className={cn(styles.text, 'label')}>
          About
        </Link>
      </div>
      <div className={cn(
          styles.mobileHeader,
          showLinks && styles.mobileHeaderOpen
        )}
      >
        <div className={styles.mobileLogoContainer}>
          <Link to={`/previewHomepage`}>
            <Logo className={styles.logo} />
          </Link>
          <div
            onClick={() => setShowLinks(!showLinks)}
            className={styles.hamburgerMenu}
          >
            <HamburgerIcon />
          </div>
        </div>
        { showLinks &&
          <div className={styles.mobileHeaderLinks}>
            <Link to={`/previewHomepage`} className={cn(styles.text, 'label')}>
              Home
            </Link>
            <Link to={`/about`} className={cn(styles.text, 'label', styles.aboutLink)}>
              About
            </Link>
          </div>
        }
      </div>
    </>
  )
};

export default Header;
