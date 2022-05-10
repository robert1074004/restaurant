const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const port = 3000
const routes = require('./routes')

require('./config/mongoose')

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