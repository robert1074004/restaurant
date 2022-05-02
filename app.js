const express = require('express')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json')

const exphbs = require('express-handlebars')
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('index',{restaurant:restaurants.results})
})

app.get('/search',(req,res) => {
    const keyword = req.query.keyword
    const Restaurants = restaurants.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    res.render('index',{restaurant:Restaurants,keyword:keyword})
})

app.get('/restaurants/:restaurant_id',(req,res) => {
    res.render('show',{restaurant:restaurants.results[req.params.restaurant_id-1]})
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})