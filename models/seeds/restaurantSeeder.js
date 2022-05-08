const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json')
mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/restaurant?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
    restaurants.results.forEach(restaurant => {
        Restaurant.create(restaurant)
    });
})