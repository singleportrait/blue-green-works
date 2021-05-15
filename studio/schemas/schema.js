// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import category from './documents/category'
import person from './documents/person'
import sampleProject from './documents/sampleProject'

import siteSettings from './documents/siteSettings'
import previewHomepage from './documents/previewHomepage'
import homepage from './documents/homepage'
import product from './documents/product'
import about from './documents/about'
import option from './documents/option'
import series from './documents/series'

// Object types
import bioPortableText from './objects/bioPortableText'
import projectMember from './objects/projectMember'
import projectPortableText from './objects/projectPortableText'
import simplePortableText from './objects/simplePortableText'

import figure from './objects/figure'
import homepageSeries from './objects/homepageSeries'
import seriesHighlight from './objects/seriesHighlight'
import tearSheet from './objects/tearSheet'
import optionOption from './objects/optionOption'
import siteFooter from './objects/siteFooter'
import seo from './objects/seo'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    bioPortableText,
    figure,
    projectMember,
    projectPortableText,
    simplePortableText,
    // The following are document types which will appear
    // in the studio.
    person,
    sampleProject,
    siteSettings,

    previewHomepage,
    homepage,
    product,
    about,
    option,
    series,
    category,

    homepageSeries,
    seriesHighlight,
    tearSheet,
    optionOption,
    siteFooter,
    seo,
  ])
})
