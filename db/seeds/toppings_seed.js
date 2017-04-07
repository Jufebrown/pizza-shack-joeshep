`use strict`
const toppings = require('./toppings')

exports.seed = function(knex, Promise) {
  let toppingsPromises = toppings.map(({name}) => {
    return knex('toppings').insert({name: name})
  })

  // Deletes ALL existing entries
  return knex('toppings').del()
    .then(() => {
      return Promise.all(toppingsPromises)
    });
};
