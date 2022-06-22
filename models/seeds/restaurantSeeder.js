
const Restaurant = require('../restaurant')
const restaurants = require('./restaurant.json')
let mongoose=require('mongoose')

const db = require('../../config/mongoose')


db.once('open',() => {
    restaurants.results.filter(restaurant => restaurant.id<4 ).forEach(restaurant => {
        restaurant['userId'] = mongoose.Types.ObjectId("629e1504b276d955c00ca482")
        Restaurant.create(restaurant)
    });
    console.log('done')
})