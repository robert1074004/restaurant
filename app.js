const express = require('express')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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

app.use(methodOverride('_method'))

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

app.put('/restaurants/:id',(req,res) => {
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

app.delete('/restaurants/:id',(req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})