import S from '@sanity/desk-tool/structure-builder'
import { MdSettings } from "react-icons/md";
import React from 'react';
import Emoji from "react-emoji-render";

const hiddenDocTypes = listItem =>
  !['category', 'person', 'sampleProject', 'siteSettings', 'previewHomepage', 'homepage', 'product', 'about', 'option', 'series', 'productsPage'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Homepage')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🏠" />)
        .child(
          S.editor()
            .id('homepage')
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('Products')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="✨" />)
        .schemaType('product')
        .child(
          S.documentTypeList('product')
          .title('Products')
        ),
      S.listItem()
        .title('Product Options')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🎨" />)
        .schemaType('option')
        .child(S.documentTypeList('option').title('Options')),
      S.listItem()
        .title('Product Series')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📂" />)
        .schemaType('series')
        .child(S.documentTypeList('series').title('Series')),
      S.listItem()
        .title('Product Categories')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🗄" />)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Products Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="💡" />)
        .child(
          S.editor()
            .id('productsPage')
            .schemaType('productsPage')
            .documentId('productsPage')
        ),
      S.listItem()
        .title('About')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📝" />)
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about')
        ),
      S.divider(),
      S.listItem()
        .title('Sample projects')
        .schemaType('sampleProject')
        .child(S.documentTypeList('sampleProject').title('Sample projects')),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
