import React from "react";
import Header from "./header";

import "../styles/portfolioLayout.css";
import * as styles from "./portfolioLayout.module.css";

const PortfolioLayout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          © {new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a> &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
  </>
);

export default PortfolioLayout;
