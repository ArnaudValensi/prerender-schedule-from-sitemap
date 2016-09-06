import config from 'config';
import fetch from 'node-fetch';
import { parseString } from 'xml2js';
import _ from 'underscore';
import clc from 'cli-color';

function getSitemap(sitemapUrl) {
  return fetch(sitemapUrl)
    .then((res) => res.text());
}

function xmlTojs(xmlSitemap) {
  return new Promise((resolve, reject) => {
    parseString(xmlSitemap, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

function jsSitemapToUrls(jsSitemap) {
  return new Promise((resolve, reject) => {
    const { urlset } = jsSitemap;
    const { url } = urlset;

    if (!urlset) {
      return reject(new Error('Invalid sitemap'));
    }

    if (!url) {
      console.warn('[!] no url in sitemap');
      return resolve();
    }

    resolve(_.pluck(url, 'loc').reduce((memo, url) => memo.concat(url), []));
  });
}

// Iterate over urls, make requests to update cache.
// It waits for the previous url to finish before starting a new one, in
// purpose of keeping phantomjs stable.
function cacheAllPages(urls) {
  return urls.reduce((p, url) => {
    return p.then(() => {
      const cacheUrl = `http://localhost:3000/${url}`;

      console.log(clc.blue(`[@] recache: PUT ${cacheUrl}`));

      return fetch(cacheUrl, { method: 'POST' });
    });
  }, Promise.resolve());
}

function cache() {
  const sitemapUrls = config.get('sitemaps');

  getSitemap(sitemapUrls)
    .then(xmlTojs)
    .then(jsSitemapToUrls)
    .then(cacheAllPages)
    .then(() => console.log(clc.green('[+] done')))
    .catch((err) => {
      console.error(clc.red('[!] error: '));
    });
}

export default () => {
  cache();
};
