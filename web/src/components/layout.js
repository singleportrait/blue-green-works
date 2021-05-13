import React from 'react';
import Header from './header';
import PreviewHeader from './previewHeader';
import Container from './container';
import Footer from './footer';

import "../styles/base.scss";

import * as styles from './layout.module.css';

const Layout = ({ children, fullPage, previewHeader }) => (
  <Container noFixedHeader={previewHeader}>
    { previewHeader && <PreviewHeader /> }
    { !previewHeader && <Header /> }
    <div className={fullPage && styles.fullpage}>{children}</div>
    <Footer />
  </Container>
);

export default Layout;
