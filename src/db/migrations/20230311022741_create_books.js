exports.up = function (knex) {
  return knex.schema.createTable("books", function (table) {
    table.increments("id").primary();
    table.string("book_name", 255).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("books");
};

exports.config = { transaction: false };
