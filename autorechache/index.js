
function sitemapToPages(sitemapUrl) {
  // TODO
}

function cacheAllPages(pages) {
  // TODO
}

function runCron(ttl) {
  // TODO
}

module.exports = function (options) {
  sitemapUrl = options.sitemapUrl;
  ttl = options.tll || 24; // TTL in hours

  if (!sitemapUrl) {
    throw new Error('sitemapUrl needed');
  }

  const pages = sitemapToPages(sitemapUrl);

  cacheAllPages(pages, function () {
    runCron(ttl);
  });
}
