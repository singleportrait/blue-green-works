import React from "react";
import { graphql } from "gatsby";

export const homepageHeaderImageQuery = graphql`
  fragment HomepageHeaderImageQuery on SanityHomepage {
    headerImage {
      image {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        asset {
          _id
          metadata {
            dimensions {
              aspectRatio
              width
              height
            }
            palette {
              dominant {
                background
              }
            }
          }
        }
      }
      alt
    }
  }
`;

export const homepageHeaderImageNarrowQuery = graphql`
  fragment HomepageHeaderImageNarrowQuery on SanityHomepage {
    headerImageNarrow {
      image {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        asset {
          _id
          metadata {
            dimensions {
              aspectRatio
              width
              height
            }
            palette {
              dominant {
                background
              }
            }
          }
        }
      }
      alt
    }
  }
`;

export const productFirstImageQuery = graphql`
  fragment ProductFirstImageQuery on SanityProduct {
    firstImage {
      _key
      image {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        asset {
          _id
          url # Used as fallback SEO image on product pages
          metadata {
            hasAlpha
            dimensions {
              aspectRatio
              width
              height
            }
            palette {
              dominant {
                background
              }
            }
          }
        }
      }
      alt
    }
  }
`;

export const productFirstImageNarrowQuery = graphql`
  fragment ProductFirstImageNarrowQuery on SanityProduct {
    firstImageNarrow {
      _key
      image {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        asset {
          _id
          metadata {
            hasAlpha
            dimensions {
              aspectRatio
              width
              height
            }
            palette {
              dominant {
                background
              }
            }
          }
        }
      }
      alt
    }
  }
`;

export const productImagesQuery = graphql`
  fragment ProductImagesQuery on SanityProduct {
    images {
      _key
      image {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        asset {
          _id
          metadata {
            hasAlpha
            dimensions {
              aspectRatio
              height
              width
            }
            palette {
              dominant {
                background
              }
            }
          }
        }
        _key
      }
      alt
      caption
    }
  }
`;
