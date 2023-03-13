import knex from "knex";
import config from "../../config/config.js";
import * as Errors from "../middleware/errorHandling.js";
const db = knex(config);

class StoreController {
  async createBookstore(store) {
    try {
      await db("bookstore")
        .insert(store)
        .onConflict("store_name")
        .ignore()
        .catch((err) => {
          throw err;
        });

      const stores = store.map((val) => (val = val.store_name));
      return db("bookstore")
        .select("store_name", "location")
        .whereNotIn("store_name", stores)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetchBooksFromBookstore(store_id) {
    try {
      let dataArr = [];
      return db
        .select()
        .from("books")
        .leftJoin("catalog", "books.id", "catalog.book_id")
        .leftJoin("bookstore", "bookstore.id", "catalog.store_id")
        .where({ "catalog.store_id": store_id })
        .then((result) => {
          result.forEach((val) => {
            dataArr.push(val);
          });
          return dataArr;
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default new StoreController();
