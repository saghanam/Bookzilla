
const config = require('../../knexfile.js');
const knex = require('knex')

exports.up = function(knex) {
    return knex.schema
      .createTable('bookstore',function(table){
          table.increments('id').primary();
          table.string('store_name',255).notNullable();
          table.string('location',255).notNullable();
      })
      .createTable('catalog',function(table){
        table.increments('id').primary();
        table.integer('book_id').references('books.id').onDelete('CASCADE');
        table.integer('store_id').references('bookstore.id').onDelete('CASCADE');
        table.integer('quantity')
        table.string('status',255).notNullable();
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('bookstore')
      .dropTable('catalog',{cascade:true})
  };
  
  exports.config = {transaction : false};
  