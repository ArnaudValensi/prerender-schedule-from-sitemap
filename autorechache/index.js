
function getConfig(configPath) {

}

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
  configPath = options.configPath;

  if (!configPath) {
    throw new Error('configPath needed');
  }

  const config = getConfig(configPath);

  // const pages = sitemapToPages(sitemapUrl);
  //
  // cacheAllPages(pages, function () {
  //   runCron(ttl);
  // });
}
