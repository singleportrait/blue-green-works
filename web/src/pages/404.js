import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout fullPage>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p className="richText">Sorry, we couldn't find that page. <Link to={`/`}>Go back home</Link>.</p>
  </Layout>
);

export default NotFoundPage;
