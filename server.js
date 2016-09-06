#!/usr/bin/env node
var prerender = require('./lib');
var autorecache = require('./autorechache');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS || 1,
    softIterations: 30
});

const sitemap = process.env.SITEMAP ||'http://www.chatel-properties.com/sitemap.xml';

// server.use(require('prerender-mongo'));
// server.use(require('prerender-mongodb-cache'));
server.use(prerender.mongoCache());
server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start(function () {
  console.log('[+] started');

  autorecache({
    configPath: './data/config.json'
  });
});
