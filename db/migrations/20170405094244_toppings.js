
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('toppings', (table) => {
      table.increments()
      table.string('toppings_name').notNullable().unique()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('toppings')
};
