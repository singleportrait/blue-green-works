# blue-green-works-studio

A portfolio using structured content and a static site builder. Built from sanity-gatsby-portfolio

Deployed from [sanity.io/create](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-portfolio).

## What you have

- A blazing fast portfolio with [Gatsby.js](https://gatsbyjs.org)
- Structured content using [Sanity.io](https://www.sanity.io)
- Global deployment on [Netlify](https://netlify.com)

## Quick start

1. Clone this repository from your GitHub account
2. `npm install` in the project root folder on local
3. `npm run dev` to start the Studio and frontend locally
   - Your Studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## Enable real-time content preview in development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/hontxz4x/settings/api) and create a token with read rights.
2. Copy `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to disable the preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## Making schema changes

- This has to be run before deploying any schema changes:
  - `cd studio/ && sanity graphql deploy` (or `cd studio/ && npm run graphql-deploy`)
- Deploying dangerous changes
  - These have to be pushed using the `--force` flag, otherwise it’ll keep you from doing it
- Updating Sanity documents/objects
  - You always have to redeploy Graph QL to get that in the front-end

## Copy production dataset
From `/studio` run the following:
```
sanity dataset export <dataset-to-copy> && sanity dataset import <dataset-to-copy>.tar.gz <dataset-to-create> --replace && rm <dataset-to-copy>.tar.gz
sanity dataset export production && sanity dataset import production.tar.gz websitev2 --replace && rm production.tar.gz
```

This will download one dataset and upload it as a new dataset, replacing any existing dataset with that name.

You can verify the changes are as expected by checking the datasets list in https://www.sanity.io/manage.

To use this new dataset in the studio and on web, you should update the dataset names in:
- `/studio/sanity.json`
- `/web/client-config.js`

When switching datasets, you'll also need to deploy the Sanity GraphQL API to use the new sets.

## Deploy changes

Netlify automatically deploys new changes commited to the `main` branch on GitHub. If you want to change the deployment branch you may do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

## Get help

[![Slack Community Button](https://slack.sanity.io/badge.svg)](https://slack.sanity.io/)

Join [Sanity’s developer community](https://slack.sanity.io) or ping us [on twitter](https://twitter.com/sanity_io).
