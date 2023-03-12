import { Router } from "express";
import bookController from "../controllers/books.js";

const router = Router();

console.log("Inside routes");

router.get("/book/fetchAllBooks", async (req, res) => {
  console.log("Inside route");
  const books = await bookController.fetchAllBooks();
  return res.status(200).send(books);
});

router.get("/book/fetchAllBooks", async (req, res) => {
  console.log("Inside route");
  const books = await bookController.fetchAllBooks();
  return res.status(200).send(books);
});

router.get("/book/fetchBook", async (req, res) => {
  console.log(req.params);
  const books = await bookController.fetchBooksFromBookstore(
    req.headers.store_id
  );
  return res.status(200).send(books);
});

router.post("/addBookstore", async (req, res) => {
  let data = req.body.data;
  console.log(data);
  const store = await bookController.createBookstore(data);
  return res.status(200).send(store);
});

router.post("/book/addBooks", async (req, res) => {
  const books = await bookController.addBooks(req.body);
  return res.status(200).send(books);
});

router.put("/book/edit/:id", async (req, res) => {
  const { quantity, store_id } = req.body;
  const { id } = req.params;
  const data = { quantity, book_id: id, store_id };
  const book = await bookController.editBook(data);
  return res.status(200).send(book);
});

router.put("/book/editBooks", async (req, res) => {
  const books = await bookController.editBooks(req.body);
  return res.status(200).send(books);
});

router.delete("/book/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const book = await bookController.deleteBook(id);
  return res.status(200).send(book);
});

router.delete("/book/deleteBooks", async (req, res) => {
  const books = await bookController.deleteBooks(req.body);
  return res.status(200).send(books);
});

export default router;
