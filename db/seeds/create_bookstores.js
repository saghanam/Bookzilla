/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('bookstore').insert([
    {id: 1, store_name: 'Lib1',location:'Montreal'},
    {id: 2, store_name: 'Lib2',location: 'New York'},
    {id: 3, store_name: 'Lib3',location: 'Toronto'}
  ]);
};
