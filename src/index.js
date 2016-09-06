import prerender from './prerender';
import autorecache from './autorechache';
import clc from 'cli-color';

const server = prerender({
  workers: process.env.PRERENDER_NUM_WORKERS || 1,
  softIterations: 30,
});

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

server.start(() => {
  console.log(clc.green('[+] started'));

  setTimeout(autorecache, 4000);
});
