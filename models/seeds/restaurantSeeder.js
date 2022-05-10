
const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json')

const db = require('../../config/mongoose')


db.once('open',() => {
    restaurants.results.forEach(restaurant => {
        Restaurant.create(restaurant)
    });
})