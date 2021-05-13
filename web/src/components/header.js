import React from "react";
import { Link } from "gatsby";
import { cn } from "../lib/helpers";

import Logo from './logo';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';

import * as styles from "./header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <div className={cn(styles.text, 'label')}>
      Coming Soon
    </div>
    <Link className={styles.logoContainer} to={`/previewHomepage`}>
      <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
      <Logo className={styles.logo} />
    </Link>
    <div className={cn(styles.text, 'label')}>
      May 2021
    </div>
  </div>
);

export default Header;
