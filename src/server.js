const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.static('public'));

const nunjucks = require('nunjucks');

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

server.use(routes);

server.listen(3333);