`use strict`

const Order = require('../models/orderModel')
const {knex} = require('../db/database')
const Size = () => knex('sizes')
const Topping = () => knex('toppings')

const getToppings = () =>
  Topping().select()
  .then((rows) => rows)
  .catch((error) => {
    throw error
  })

const getSizes = () =>
  Size().select()
  .then((rows) => rows)
  .catch((error) => {
    throw error
  })

module.exports.show = (req, res, err) => {
  Promise.all([getToppings(), getSizes()])
  .then(([toppings, sizes]) => {
    res.render('order', {page: 'Order', sizes, toppings})
  })
  .catch(err)
}

module.exports.create = ({body, flash}, res, err) => {
  console.log('body', body)
  Order.forge(body)
  .save()
  .then((orderObj) => {
    flash('orderMsg', 'Thanks for your order! Good luck getting it!')
    res.redirect('/')
  })
  .catch((err) => {
    Promise.all([
      Promise.resolve(err),
      getSizes(),
      getToppings()
    ])
    .then(([errors, sizes, toppings]) => {
      return res.render('order', {page: 'Order', sizes, toppings, errors, body})
    })
  })
  .catch(err)
}
