const express = require('express')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/restaurant?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})

const exphbs = require('express-handlebars')
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res) => {
    Restaurant.find()
        .lean()
        .then(restaurant => res.render('index',{restaurant}) )
        .catch(error => console.log(error))
})

app.get('/restaurants/new',(req,res) => {
    return res.render('new')
})

app.post('/restaurants',(req,res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.get('/search',(req,res) => {
    const keyword = req.query.keyword
    const Restaurants = restaurants.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    res.render('index',{restaurant:Restaurants,keyword:keyword})
})

app.get('/restaurants/:id',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('show',{restaurant}))
        .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit',{restaurant}))
        .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit',(req,res) => {
    const id = req.params.id
    const restaurant_info = req.body
    return Restaurant.findById(id)
        .then(restaurants => {
           restaurants.name = restaurant_info.name
           restaurants.name_en = restaurant_info.name_en
           restaurants.category = restaurant_info.category
           restaurants.image = restaurant_info.image
           restaurants.location = restaurant_info.location
           restaurants.phone = restaurant_info.phone
           restaurants.google_map = restaurant_info.google_map
           restaurants.rating = restaurant_info.rating
           restaurants.description = restaurant_info.description
            return restaurants.save() 
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})