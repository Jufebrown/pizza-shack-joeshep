`use strict`

const express = require('express')
const app = express()



app.set('port', process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
