import React from "react";
import Container from './container';

import "../styles/base.scss";

import * as styles from './layout.module.css';

const EmptyLayout = ({ children, fullPage }) => (
  <div className={fullPage && styles.fullpage}>{children}</div>
);

export default EmptyLayout;

