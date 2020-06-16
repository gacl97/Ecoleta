const express = require('express');
const routes = require('./routes');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('public'));

server.use(express.json());
server.use(express.urlencoded({ extended: true })); // habilitar o request.body

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

server.use(routes);

server.listen(3333);