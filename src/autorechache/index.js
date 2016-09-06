import config from 'config';

function sitemapToPages(sitemapUrl) {
  // TODO
}

function cacheAllPages(pages) {
  // TODO
}

function runCron(ttl) {
  // TODO
}

export default () => {

  const sitemapUrls = config.get('sitemaps');

  console.log(sitemapUrls);

  // const pages = sitemapToPages(sitemapUrl);
  //
  // cacheAllPages(pages, function () {
  //   runCron(ttl);
  // });
};
