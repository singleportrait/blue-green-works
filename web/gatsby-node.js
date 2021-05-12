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

// const {isFuture} = require('date-fns')

// async function createProjectPages (graphql, actions) {
//   const {createPage} = actions
//   const result = await graphql(`
//     {
//       allSanitySampleProject(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
//         edges {
//           node {
//             id
//             publishedAt
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) throw result.errors

//   const projectEdges = (result.data.allSanitySampleProject || {}).edges || []

//   projectEdges
//     .filter(edge => !isFuture(edge.node.publishedAt))
//     .forEach(edge => {
//       const id = edge.node.id
//       const slug = edge.node.slug.current
//       const path = `/project/${slug}/`

//       createPage({
//         path,
//         component: require.resolve('./src/templates/project.js'),
//         context: {id}
//       })
//     })
// }

exports.createPages = async ({graphql, actions}) => {
  // await createProjectPages(graphql, actions)
  await createProductPages(graphql, actions)
}
