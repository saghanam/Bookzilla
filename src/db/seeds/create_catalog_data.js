/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex("catalog").insert([
    { id: 1, book_id: 1, store_id: 1, quantity: 10, status: "in_stock" },
    { id: 2, book_id: 1, store_id: 2, quantity: 15, status: "in_stock" },
    { id: 3, book_id: 1, store_id: 3, quantity: 20, status: "in_stock" },
    { id: 4, book_id: 2, store_id: 2, quantity: 30, status: "in_stock" },
    { id: 5, book_id: 2, store_id: 1, quantity: 5, status: "in_stock" },
    { id: 6, book_id: 3, store_id: 3, quantity: 0, status: "out_of_stock" },
    { id: 7, book_id: 3, store_id: 2, quantity: 0, status: "out_of_stock" },
  ]);
};
