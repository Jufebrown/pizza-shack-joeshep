`use strict`

const Order = require('../models/orderModel')
const {knex} = require('../db/database')
const Size = () => knex('sizes')
const Topping = () => knex('toppings')

const getToppings = () =>
  Topping().select()
  .then(() => rows)
  .catch((error) => {
    throw error
  })

const getSizes = () =>
  Size().select()
  .then(() => rows)
  .catch((error) => {
    throw error
  })



  module.exports.create = ({body}, res, err) => {
    Order.forge(body)
    .save()
    .then((orderObj) => {
      res.render('index', {orderMsg: 'Thanks for your order! Good luck getting it!'})
    })
    .catch(({errors}) => {
      Promise.all([
        Promise.resolve(errors),
        getSizes(),
        getToppings()
      ])
    })
    .then(([errors, sizes, toppings]) => {
      res.render('order', {page: 'Order', sizes, toppings, errors, body})
    })
    .catch(err)
  }
