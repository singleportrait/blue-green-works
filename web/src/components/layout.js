import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Header from "./header";
import Container from "./container";
import Footer from "./footer";

import "../styles/base.scss";

const layoutQuery = graphql`
  query LayoutQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      backgroundColor
    }
  }
`;

const Layout = ({ children }) => (
  <Container>
    <Helmet>
      <script async src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=UdV4LN" />
      <meta name="theme-color" content="#F2FFF8" />
    </Helmet>
    <StaticQuery
      query={layoutQuery}
      render={({ site }) => {
        const css = `
          :root {
            --bg-color: ${site.backgroundColor || ""};
          }
        `;
        return <>{site && site.backgroundColor && <style>{css}</style>}</>;
      }}
    />

    <Header />
    <div>{children}</div>
    <Footer />
  </Container>
);

export default Layout;
