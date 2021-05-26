import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import PreviewHeader from './previewHeader';
import Container from './container';
import Footer from './footer';
import PreviewFooter from './previewFooter';

import "../styles/base.scss";

import * as styles from './layout.module.css';

const layoutQuery = graphql`
  query LayoutQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      backgroundColor
    }
  }
`;

const Layout = ({ children, fullPage, previewPage }) => (
  <Container noFixedHeader={previewPage}>
    <StaticQuery
      query={layoutQuery}
      render={({site}) => {
        const css = `
          html {
            background-color: ${site.backgroundColor || ''};
          }
        `;
        return (
          <>
            { site && site.backgroundColor &&
              <style>{css}</style>
            }
          </>
        )
      }}
    />

    { previewPage && <PreviewHeader /> }
    { !previewPage && <Header /> }
    <div className={fullPage && styles.fullpage}>{children}</div>
    { previewPage && <PreviewFooter /> }
    { !previewPage && <Footer /> }
  </Container>
);

export default Layout;
