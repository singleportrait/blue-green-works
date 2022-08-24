export default function generatePreviewUrl (document) {
  if (!document) return;

  const type = document._type;

  let slug;
  const baseUrl = 'https://preview-bluegreenworks.gtsb.io';

  if (type === 'about') {
    console.log('About page!');
    slug = '/about';
  } else if (type === 'homepage') {
    console.log('Homepage!');
    slug = '/';
  } else if (type === 'product') {
    slug = `/products/${document.slug.current}`;
  } else if (type === 'productsPage') {
    slug = `/${document.slug.current}`;
  } else {
    slug = null;
  }

  if (slug) {
    // console.log("We built a slug");
    // console.log(baseUrl + slug);

    return baseUrl + slug;
  } else {

  }
}
