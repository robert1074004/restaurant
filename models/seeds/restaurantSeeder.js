
const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json')
let mongoose=require('mongoose')

const db = require('../../config/mongoose')


db.once('open',() => {
    let REstaurant =  restaurants.results.filter(restaurant => restaurant.id>3 && restaurant.id<7)
   REstaurant.forEach(restaurant => {
        restaurant['userId'] = mongoose.Types.ObjectId("629dbb2d56e866603c02d06d")
        Restaurant.create(restaurant)
    });
    console.log('done')
})