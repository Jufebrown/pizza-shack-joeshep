
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('sizes', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('inches').notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('sizes')
};
