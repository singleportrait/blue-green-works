import React from 'react';
import Header from './header';
import PreviewHeader from './previewHeader';
import Container from './container';
import Footer from './footer';
import PreviewFooter from './previewFooter';

import "../styles/base.scss";

import * as styles from './layout.module.css';

const Layout = ({ children, fullPage, previewPage }) => (
  <Container noFixedHeader={previewPage}>
    { previewPage && <PreviewHeader /> }
    { !previewPage && <Header /> }
    <div className={fullPage && styles.fullpage}>{children}</div>
    { previewPage && <PreviewFooter /> }
    { !previewPage && <Footer /> }
  </Container>
);

export default Layout;
