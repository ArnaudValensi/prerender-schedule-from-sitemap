import config from 'config';
import fetch from 'node-fetch';
import { parseString } from 'xml2js';
import _ from 'underscore';

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

function cacheAllPages(urls) {
  // TODO
}

function runCron(ttl) {
  // TODO
}

export default () => {
  const sitemapUrls = config.get('sitemaps');

  getSitemap(sitemapUrls)
    .then(xmlTojs)
    .then(jsSitemapToUrls)
    // .then(cacheAllPages)
    .then((result) => {
      console.log(result);
      console.log(result.length);
    });
};
