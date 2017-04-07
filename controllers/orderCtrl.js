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

module.exports.show = (req, res, err) =>
  Promise.all([getToppings(), getSizes()])
  .then(([toppings, sizes]) =>
    res.render('order', {page: 'Order', sizes, toppings})
  ).catch(err)


module.exports.create = (req, res, err) => {
  console.log('body', req.body)
  const toppings = req.body.toppings
  req.body.toppings = toppings && typeof(toppings) === 'string' ? [toppings] : toppings
  Order.forge(req.body)
  .save()
  .then((orderObj) => {
    console.log('order saved')
    req.flash('orderMsg', 'Thanks for your order! Good luck getting it!')
    res.redirect('/')
  })
  .catch((err) => {
    console.log('order did not work')
    Promise.all([
      Promise.resolve(err),
      getSizes(),
      getToppings()
    ])
    .then(([errors, sizes, toppings]) => {
      let body = req.body
      return res.render('order', {page: 'Order', sizes, toppings, errors, body})
    })
  })
  .catch(err)
}
