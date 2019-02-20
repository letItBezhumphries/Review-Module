const express = require('express');
const app = express();
const db = require('./db.js');

app.use(express.static('./public/dist'));

app.get('/api/users', (req, res) => {
  db.User.findAll()
    .then((users) => {
      res.send(users);
    });
});

app.get('/api/restaurants/:restaurantId/reviews', (req, res) => {
  db.Review.findAll({
    where: {
      restaurantId: req.params.restaurantId
    }
  })
    .then((reviews) => {
      res.send(reviews);
    });
});

app.get('/api/restaurants/reviews', (req, res) => {
  db.Review.findAll()
    .then((reviews) => {
      res.send(reviews);
    });
});

app.get('*', function(req, res){
  res.status(404).send(`Use endpoints '/api/users', or '/api/restaurants/[restaurant ID]/reviews', or '/api/restaurants/reviews'`);
});

module.exports = app;