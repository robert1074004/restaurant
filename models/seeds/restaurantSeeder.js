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

    SEED_USERS.forEach(USER => {
        bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(USER.password, salt))
            .then(hash => User.create({
                name: USER.name,
                email: USER.email,
                password: hash
            }))
            .then(user => {
                const userId = user._id
                const userName = user.name
                console.log(userName === 'user1')
                if (userName === "user1") {
                    const restaurant = restaurants.results.filter(restaurant => restaurant.id < 4)
                    return Promise.all(Array.from(restaurant, (SEED_RESTAURANT) => {
                        const {
                            name,
                            name_en,
                            category,
                            image,
                            location,
                            phone,
                            google_map,
                            rating,
                            description
                        } = SEED_RESTAURANT
                        Restaurant.create({
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

                    }))
                }
                const restaurant = restaurants.results.filter(restaurant => restaurant.id > 3 && restaurant.id < 7)
                return Promise.all(Array.from(restaurant, (SEED_RESTAURANT) => {
                    const {
                        name,
                        name_en,
                        category,
                        image,
                        location,
                        phone,
                        google_map,
                        rating,
                        description
                    } = SEED_RESTAURANT
                    Restaurant.create({
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
                }))
            })
            .then(() => {
                console.log('done')
            })
    })
})