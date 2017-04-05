
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('sizes', (table) => {
      table.increments()
      table.string('sizes_name').notNullable().unique()
      table.string('sizes_inches').notNullable()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('sizes')
};
