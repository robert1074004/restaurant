const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')
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

app.use(routes)

// app.get('/',(req,res) => {
//     Restaurant.find()
//         .lean()
//         .then(restaurant => res.render('index',{restaurant}) )
//         .catch(error => console.log(error))
// })







app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})