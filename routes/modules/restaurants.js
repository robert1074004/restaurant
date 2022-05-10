const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new',(req,res) => {
    return res.render('new')
})

router.post('/',(req,res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
router.get('/:id',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('show',{restaurant}))
        .catch(error => console.log(error))
})

router.get('/:id/edit',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit',{restaurant}))
        .catch(error => console.log(error))
})

router.put('/:id',(req,res) => {
    const id = req.params.id
    const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body
    console.log(typeof(Restaurant.findById(id)))
    return Restaurant.findById(id)
        .then(restaurants => {
           restaurants.name = name
           restaurants.name_en = name_en
           restaurants.category = category
           restaurants.image = image
           restaurants.location = location
           restaurants.phone = phone
           restaurants.google_map = google_map
           restaurants.rating = rating
           restaurants.description = description
            return restaurants.save() 
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.delete('/:id',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
module.exports = router