/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('books').insert([
    {id: 1, book_name: 'HarryPotter'},
    {id: 2, book_name: 'Lord of the Rings'},
    {id: 3, book_name: 'Angels and Demons'}
  ]);
};
