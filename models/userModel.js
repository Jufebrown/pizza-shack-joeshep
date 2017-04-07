`use strict`

const {bookshelf} = require('../db/database')
const {compare} = require('bcryptjs')

const User = bookshelf.Model.extend({
  tableName: 'customers',
  bcrypt: {field: 'password'},
  comparePass: function (passwordStr) {
    console.log('password String from user', passwordStr)
    return compare(passwordStr, this.attributes.password)
  }
})
