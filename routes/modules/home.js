const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/',(req,res) => {
    Restaurant.find()
        .lean()
        .sort({name:'asc'})
        .then(restaurant => res.render('index',{restaurant}) )
        .catch(error => console.log(error))
})
router.get('/desc',(req,res) => {
    Restaurant.find()
        .lean()
        .sort({name:'desc'})
        .then(restaurant => res.render('index',{restaurant}) )
        .catch(error => console.log(error))
})
router.get('/category',(req,res) => {
    Restaurant.find()
        .lean()
        .sort({category:'asc'})
        .then(restaurant => res.render('index',{restaurant}) )
        .catch(error => console.log(error))
})
router.get('/search',(req,res) => {
    const keyword = req.query.keyword
    Restaurant.find()
        .lean()
        .then(restaurant => {
            const restaurants = restaurant.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
            res.render('index',{restaurant:restaurants,keyword:keyword})
        })
        .catch(error => console.log(error))
})
module.exports = router