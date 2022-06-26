const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })

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