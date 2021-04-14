import React from "react";

import PortfolioLayout from "../components/portfolioLayout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <PortfolioLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </PortfolioLayout>
);

export default NotFoundPage;
