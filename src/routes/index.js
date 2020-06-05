const { Router } = require('express');

const routes = Router();

routes.get('/', (request, response) => { 
  return response.render('index.html');
});

routes.get('/create-point', (request, response) => { 
  return response.render('create-point.html');
});

routes.get('/search', (request, response) => { 
  return response.render('search-results.html');
});

module.exports = routes;