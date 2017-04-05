
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('customers', (table) => {
      table.increments()
      table.string('order_email').notNullable()
      table.string('order_password').notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('customers')
};
