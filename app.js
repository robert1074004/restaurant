const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')
const routes = require('./routes')
const flash = require('connect-flash')

require('dotenv').config()

require('./config/mongoose')
console.log(process.env.MONGODB_URI)

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

app.use(flash())

app.use((req,res,next) => {
    res.locals.isAuthenticated = req.isAuthenticated
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

app.use(routes)



app.listen(process.env.PORT,() => {
    console.log(`Express is running on http://localhost:${process.env.PORT}`)
})