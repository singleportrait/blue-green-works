/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProductPages (graphql, actions) {
  const {createPage} = actions;
  const result = await graphql(`
    {
      allSanityProduct(filter: {slug: {current: {ne: null}}}) {
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

  if (result.errors) throw result.errors

  const productEdges = (result.data.allSanityProduct || {}).edges || [];

  productEdges.forEach(edge => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/products/${slug}`;

    createPage({
      path: path,
      component: require.resolve('./src/templates/product.js'),
      context: {id}
    });
  });
}

async function createProductsPage (graphql, actions) {
  const {createPage} = actions;
  const result = await graphql(`
    {
      allSanityProductsPage(filter: {slug: {current: {ne: null}}}, limit: 1) {
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

  if (result.errors) throw result.errors

  const productsPageNode = (result.data.allSanityProductsPage || {}).edges[0].node || [];

  const id = productsPageNode.id;
  const slug = productsPageNode.slug.current;
  const path = `/${slug}`;

  createPage({
    path: path,
    component: require.resolve('./src/templates/productsPage.js'),
    context: {id}
  });
}

exports.createPages = async ({graphql, actions}) => {
  await createProductPages(graphql, actions)
  await createProductsPage(graphql, actions)
}
