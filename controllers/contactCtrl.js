`use strict`

const Contact = require('../models/contactModel')

module.exports.show = (req, res, next) => {
  res.render('contact', {page: 'Contact'})
}

module.exports.addContact = ({body}, res, err) => {
  Contact.forge(body)
  .save()
  .then(() => {
    res.redirect('/')
  })
  .catch(err)
}
