import knex from "knex";
import config from "../../config/config.js";
const db = knex(config);

class bookController {
  async fetchAllBooks() {
    let dataArr = [];
    return db
      .select()
      .from("books")
      .leftJoin("catalog", "books.id", "catalog.book_id")
      .leftJoin("bookstore", "bookstore.id", "catalog.store_id")
      .then((result) => {
        result
          .forEach((val) => {
            dataArr.push(val);
          })
          .catch((err) => {
            return err;
          });
        return dataArr;
      });
  }

  async fetchBooksFromBookstore(store_id) {
    let dataArr = [];
    return db
      .select()
      .from("books")
      .leftJoin("catalog", "books.id", "catalog.book_id")
      .leftJoin("bookstore", "bookstore.id", "catalog.store_id")
      .where({ "catalog.store_id": store_id })
      .then((result) => {
        result
          .forEach((val) => {
            dataArr.push(val);
          })
          .catch((err) => {
            return err;
          });
        return dataArr;
      });
  }

  async createBookstore(store) {
    await db("bookstore")
      .returning(["id", "store_name", "location"])
      .insert(store)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  // add promise.all for this
  async addBooks(data) {
    let store_id = data.store_id;
    let books = data.data;
    books.map(async (val) => {
      let book_name = val.book_name;
      let status = await this.checkStock(val.quantity);
      const [{ id }] = await db("books").returning("id").insert({ book_name });
      await db("catalog").insert({
        book_id: id,
        store_id,
        quantity: val.quantity,
        status,
      });
    });
    return books;
  }

  checkStock(quantity) {
    try {
      if (quantity < 0) throw new Error("Quantity cannot be less than 0");
      let status = quantity > 0 ? "in_stock" : "out_of_stock";
      return status;
    } catch (err) {
      return err;
    }
  }

  async editBook(book) {
    let status = await this.checkStock(book.quantity);
    await db("catalog")
      .returning(["book_id", "quantity", "status"])
      .where({ book_id: book.book_id, store_id: book.store_id })
      .update({ status, quantity: book.quantity })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  editBooks(books) {
    try {
      const { store_id } = books;
      books.data.map(async (val) => {
        let status = await this.checkStock(val.quantity);
        await db("catalog")
          .returning(["book_id", "quantity", "status"])
          .where({ book_id: val.book_id, store_id })
          .update({ status, quantity: val.quantity })
          .catch((err) => {
            return err;
          });
      });
      const data = { data: "Updated" };
      return data;
    } catch (err) {
      return err;
    }
  }

  async deleteBook(id) {
    await db("books")
      .where({ id })
      .del()
      .catch((err) => {
        return err;
      });
    await db("catalog")
      .where({ book_id: id })
      .del()
      .catch((err) => {
        return err;
      });
    const data = { data: "Deleted" };
    return data;
  }

  async deleteBooks(books) {
    books.data.map(async (val) => {
      await db("books")
        .where({ id: val.book_id })
        .del()
        .catch((err) => {
          return err;
        });
      await db("catalog")
        .where({ book_id: val.book_id })
        .del()
        .catch((err) => {
          return err;
        });
    });
    const data = { data: "Deleted" };
    return data;
  }

  async updateStatus() {
    var dataArr = [];
    return db
      .select()
      .from("catalog")
      .where({ quantity: 0 })
      .then((result) => {
        result.forEach(async (val) => {
          dataArr.push(val);
          await db("catalog")
            .returning(["book_id", "quantity", "status"])
            .where({ quantity: 0 })
            .update({ status: "out_of_stock" })
            .catch((err) => {
              return err;
            });
          return dataArr;
        });
      });
  }
}

export default new bookController();
