const { Router } = require('express');
const db = require('../database/db');

const routes = Router();

routes.get('/', (request, response) => { 
  return response.render('index.html');
});

routes.get('/create-point', (request, response) => {

  return response.render('create-point.html');
});

routes.post('/savepoint', (request, response) => {
  const { image, name, address, address2, state, city, items } = request.body;
  console.log(address2, address, name)
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
    image,
    name,
    address,
    address2,
    state,
    city,
    items,
  ];

  function afterInsertData(err) {

    if(err) {  
      return response.render('create-point.html', { error: true });
    }

    return response.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

routes.get('/search', async (request, response) => { 

  const search = request.query.search;

  if(search == '') {
    return response.render('search-results.html', { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {

    if(err) {
      return console.log(err);
    }
  
    const totalPlaces = rows.length;

    return response.render('search-results.html', { places: rows, totalPlaces });
  });
});

module.exports = routes;