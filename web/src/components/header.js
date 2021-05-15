import React from "react";
import { Link } from "gatsby";
import { cn } from "../lib/helpers";

import Logo from './logo';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';

import * as styles from "./header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <Link to={`/previewHomepage`} className={cn(styles.text, 'label')}>
      Home
    </Link>
    <Link className={styles.logoContainer} to={`/previewHomepage`}>
      <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
      <Logo className={styles.logo} />
    </Link>
    <Link to={`/about`} className={cn(styles.text, 'label')}>
      About
    </Link>
  </div>
);

export default Header;
