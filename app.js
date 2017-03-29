`use strict`

const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))




app.set('port', process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
