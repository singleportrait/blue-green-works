import React from "react";
import { cn } from "../lib/helpers";

import Logo from './logo';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';

import * as styles from "./header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <div className={cn(styles.text, 'label')}>
      Coming Soon
    </div>
    <div className={styles.logoContainer}>
      <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
      <Logo className={styles.logo} />
    </div>
    <div className={cn(styles.text, 'label')}>
      May 2021
    </div>
  </div>
);

export default Header;
