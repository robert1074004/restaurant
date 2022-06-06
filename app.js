const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')
const port = 3000
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs',exphbs({defaultLayout:'main',extname:'hbs'}))
app.set('view engine','hbs')

app.use(session({
    secret:'ThisIsMySecret',
    resave:false,
    saveUninitialized:true
}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)



app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})