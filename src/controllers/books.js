import knex from "knex";
import config from "../../config/config.js";
const db = knex(config);

class BookController {
  async fetchAllBooks() {
    let dataArr = [];
    return db
      .select()
      .from("books")
      .leftJoin("catalog", "books.id", "catalog.book_id")
      .leftJoin("bookstore", "bookstore.id", "catalog.store_id")
      .then((result) => {
        result.forEach((val) => {
          dataArr.push(val);
        });
        return dataArr;
      })
      .catch((err) => {
        throw err;
      });
  }



  checkIfBookstoreExists(stores) {
    stores = stores.map((val) => (val = val.store_name));
    console.log(stores);
    return db("bookstore")
      .select("store_name")
      .whereIn("store_name", stores)
      .then((data) => {
        console.log(data);
        data = data.map((val) => (val = val.store_name));
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }



  async checkIfBookExists(book_name) {
    return await db("books")
      .select("id")
      .where({ book_name })
      .then((data) => {
        const status = data.length ? true : false;
        if (status) return data[0].id;
        else return null;
      })
      .catch((err) => {
        throw err;
      });
  }

  async checkBookInStore(bookDetails) {
    return await db("catalog")
      .select("id")
      .where({ book_id: bookDetails.book_id, store_id: bookDetails.store_id })
      .then((data) => {
        const status = data.length ? true : false;
        return status;
      })
      .catch((err) => {
        throw err;
      });
  }

  async checkBookDatabase(id) {
    return await db("books")
      .select("id")
      .where({ id })
      .then((data) => {
        let status = data.length ? true : false;
        return status;
      })
      .catch((err) => {
        throw err;
      });
  }

  async addBooks(bookData) {
    let { store_id, data } = bookData;
    data = Promise.all(
      data.map(async (val) => {
        let book_name = val.book_name;
        let status = await this.checkStock(val.quantity);
        let id = await this.checkIfBookExists(book_name);
        if (!id) {
          [{ id }] = await db("books").returning("id").insert({ book_name });
        }
        const bookExists = await this.checkBookInStore({
          book_id: id,
          store_id,
        });
        val["message"] = bookExists
          ? "Already exists in store"
          : "Added to store";
        if (!bookExists) {
          await db("catalog").insert({
            book_id: id,
            store_id,
            quantity: val.quantity,
            status,
          });
        }
        return val;
      })
    );
    return data;
  }

  checkStock(quantity) {
    try {
      if (quantity < 0) throw new Error("Quantity cannot be less than 0");
      let status = quantity > 0 ? "in_stock" : "out_of_stock";
      return status;
    } catch (err) {
      throw err;
    }
  }

  async editBook(book) {
    console.log(book)
    const bookExists = await this.checkBookInStore({
      book_id: book.book_id,
      store_id: book.store_id,
    });
    if (!bookExists) return "No book exists in store with current ID";
    let status = await this.checkStock(book.quantity);
    return await db("catalog")
      .returning(["book_id", "quantity", "status"])
      .where({ book_id: book.book_id, store_id: book.store_id })
      .update({ status, quantity: book.quantity })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }

  async editBooks(books) {
    const { store_id } = books;
    let data = { edited: [], nonExistentId: [], message: "Updated" };

    let bookId = books.data.map((val) => (val = val.book_id));
    await db("catalog")
      .returning("book_id")
      .whereIn("book_id", bookId)
      .then((val) => {
        console.log(val);
        val.map((id) => data.edited.push(id.book_id));
      })
      .catch((err) => {
        throw err;
      });
    books.data.map(async (val) => {
      let status = await this.checkStock(val.quantity);
      await db("catalog")
        .returning(["book_id", "quantity", "status"])
        .where({ book_id: val.book_id, store_id })
        .update({ status, quantity: val.quantity })
        .then((val) => {
          console.log(val);
        })
        .catch((err) => {
          throw err;
        });
    });

    bookId = books.data.filter(function (book) {
      return !data.edited.includes(book.book_id);
    });

    bookId.map((val) => data.nonExistentId.push(val.book_id));

    console.log(data);
    return data;
  }

  async deleteBook(id) {
    const bookExists = await this.checkBookDatabase(id);
    console.log(bookExists);
    if (!bookExists) return "No book exists in store with current ID";
    await db("books")
      .where({ id })
      .del()
      .catch((err) => {
        throw err;
      });
    await db("catalog")
      .where({ book_id: id })
      .del()
      .catch((err) => {
        throw err;
      });
    const data = { data: "Deleted" };
    return data;
  }

  async deleteBooks(books) {
    let data = { deleted: [], nonExistentId: [], message: "Deleted" };

    let bookId = books.data.map((val) => (val = val.book_id));
    await db("books")
      .returning("id")
      .whereIn("id", bookId)
      .then((val) => {
        console.log(val);
        val.map((id) => data.deleted.push(id.book_id));
      })
      .catch((err) => {
        throw err;
      });

    books.data.map(async (val) => {
      await db("books")
        .where({ id: val.book_id })
        .del()
        .catch((err) => {
          throw err;
        });
      await db("catalog")
        .where({ book_id: val.book_id })
        .del()
        .catch((err) => {
          throw err;
        });
    });

    bookId = books.data.filter(function (book) {
      return !data.deleted.includes(book.book_id);
    });

    bookId.map((val) => data.nonExistentId.push(val.book_id));
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
              throw err;
            });
          return dataArr;
        });
      });
  }
}

export default new BookController();
