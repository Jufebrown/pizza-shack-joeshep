`use strict`

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const KnexSessionStore = require('connect-session-knex')(session)
const {knex} = require('./db/database')

const routes = require('./routes/')

app.set('view engine', 'pug')

app.locals.company = `💩☠️😈🔥Pizza Shack`
app.locals.body = {}
app.locals.errors = {}
app.locals.body.magic = `Foooooo!`


/**************Middlewares************/
app.use(cookieParser('secretpizza'))
app.use(session({cookie: {maxAge: 60000}, secret: 'secretpizza', resave: true, saveUninitialized: false}))
app.use(flash())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  store: new KnexSessionStore({
    knex,
    tablename: 'sessions'
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'pizzashacksupersecretkey'
}))


app.use(express.static('public'))
app.use(routes)


app.get('/login', (req, res, next) => {
  res.render('login', {page: 'Login'})
})

app.get('/register', (req, res, next) => {
  res.render('register', {page: 'Register'})
})

app.use((req, res) => {
  res.render('404')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
