export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '60762c1774eee51314ae8445',
                  title: 'Sanity Studio',
                  name: 'blue-green-works-studio',
                  apiId: '0d9228cb-a2d5-4d94-abc1-110d11474e6c'
                },
                {
                  buildHookId: '60762c18546dc6128a477380',
                  title: 'Website',
                  name: 'blue-green-works-web',
                  apiId: '5bb61685-1db2-4ae9-a6e8-5aeafb7dcc09'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/singleportrait/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://blue-green-works-web.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
