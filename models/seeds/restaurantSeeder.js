const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurants = require('./restaurant.json')
require('dotenv').config()
const db = require('../../config/mongoose')
console.log(process.env.MONGODB_URI)
const SEED_USERS = [{
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
}, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
}]

db.once('open', () => {
    Promise.all(Array.from(SEED_USERS,USER => {
       
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(USER.password, salt))
            .then(hash => User.create({
                name: USER.name,
                email: USER.email,
                password: hash
            }))
            .then(user => {
                console.log(user)
                return Promise.all(Array.from(restaurants.results,(restaurant) => {const {
                        name,
                        name_en,
                        category,
                        image,
                        location,
                        phone,
                        google_map,
                        rating,
                        description,
                        id
                    } = restaurant
                    if (user.name === 'user1' && id<4) {
                        const userId = user._id
                        return Restaurant.create({
                            name,
                            name_en,
                            category,
                            image,
                            location,
                            phone,
                            google_map,
                            rating,
                            description,
                            userId
                        })
                    } 
                    if (user.name === 'user2' && id>=4 && id<7) {
                        const userId = user._id
                        return Restaurant.create({
                            name,
                            name_en,
                            category,
                            image,
                            location,
                            phone,
                            google_map,
                            rating,
                            description,
                            userId
                        })
                    }
                }))   
            })
    }))
    .then(() => process.exit())
})