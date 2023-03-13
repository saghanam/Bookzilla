import { Router } from "express";
import BookController from "../controllers/books.js";

import Joi from 'joi';
import * as Errors from "../middleware/errorHandling.js"

const router = Router();
const bookStoreSchema = Joi.object({
  data: Joi.array().items(Joi.object().keys({
      store_name: Joi.string().required(),
      location: Joi.string().required()
  })).required()
})

router.get("/book/fetchAllBooks", async (req, res) => {
  console.log("Inside route");
  const books = await BookController.fetchAllBooks();
  return res.status(200).send(books);
});


router.post("/book/addBooks", async (req, res) => {
  const books = await BookController.addBooks(req.body);
  return res.status(200).send(books);
});

router.put("/book/edit/:id", async (req, res) => {
  const { quantity, store_id } = req.body;
  const { id } = req.params;
  const data = { quantity, book_id: id, store_id };
  const book = await BookController.editBook(data);
  return res.status(200).send(book);
});

router.put("/book/editBooks", async (req, res) => {
  const books = await BookController.editBooks(req.body);
  return res.status(200).send(books);
});

router.delete("/book/delete/:id", async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const book = await BookController.deleteBook(id);
  return res.status(200).send(book);
});

router.delete("/book/deleteBooks", async (req, res) => {
  const books = await BookController.deleteBooks(req.body);
  return res.status(200).send(books);
});

export default router;
