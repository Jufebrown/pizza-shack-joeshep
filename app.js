`use strict`

const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.locals.company = `💩☠️Pizza Shack`
app.locals.body = {}
app.locals.body.magic = `Foooooo!`


/**************Middlewares************/
app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.render('index')
})

app.get('/about', (req, res, next) => {
  res.render('about')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
