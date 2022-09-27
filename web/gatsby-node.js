/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProductAndInstructionsPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProduct(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            title
            slug {
              current
            }
            instructionsFile {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const productEdges = (result.data.allSanityProduct || {}).edges || [];

  productEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/products/${slug}`;

    createPage({
      path: path,
      component: require.resolve("./src/pageTemplates/product.js"),
      context: { id },
    });

    // Make instructions pages
    if (!edge.node.instructionsFile) return;

    const instructionsPath = `/products/${slug}/instructions`;
    createPage({
      path: instructionsPath,
      component: require.resolve("./src/pageTemplates/instructions.js"),
      context: { id },
    });
  });
}

async function createProductsPage(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProductsPage(filter: { slug: { current: { ne: null } } }, limit: 1) {
        edges {
          node {
            id
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const productsPageNode = (result.data.allSanityProductsPage || {}).edges[0].node || [];

  const id = productsPageNode.id;
  const slug = productsPageNode.slug.current;
  const path = `/${slug}`;

  createPage({
    path: path,
    component: require.resolve("./src/pageTemplates/productsPage.js"),
    context: { id },
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createProductAndInstructionsPages(graphql, actions);
  await createProductsPage(graphql, actions);
};
