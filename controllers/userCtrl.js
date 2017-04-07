`use strict`

const User = require('../models/userModel')

module.exports.show = (req, res) => {
  res.render('register', {page: 'Register'})
}

module.exports.create = ({body: {email, password, confirmation}}, res) => {
  if(password === confirmation) {
    User.findOneByEmail(email)
    .then((user) => {
      if (user) return res.render('register', {msg: 'Email is already registered'})
      return User.forge({email, password})
      .save()
      .then(() => {
        res.redirect('/')
      })
      //catch for save
      .catch((err) => res.render('register', {msg: 'Try Again. Now.'}))
    })
    //catch for findOneByEmail
    .catch(() => res.render('register', {msg: 'Try Again. Now.'}))
  } else {
    res.render('register', {msg: 'Password and Confirmation do not match. Try again. Now.'})
  }
}
