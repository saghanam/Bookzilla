import { Router } from "express";
import BookController from "../controllers/books.js";

import Joi from "joi";
import * as Errors from "../middleware/errorHandling.js";

const router = Router();
const bookSchema = Joi.object({
  store_id: Joi.number().required(),
  data: Joi.array()
    .items(
      Joi.object().keys({
        book_name: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});

const editId = Joi.number().required();

const editBookSchema = Joi.object({
  store_id: Joi.number().required(),
  quantity: Joi.number().required(),
});
const multipleBookSchema = Joi.object({
  store_id: Joi.number().required(),
  data: Joi.array()
    .items(
      Joi.object().keys({
        book_id: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});

const deleteBookSchema = Joi.object({
  data: Joi.array().items(
    Joi.object({
      book_id: Joi.number().required(),
    })
  ),
});

const EditEvent = (body, id) => {
  console.log(body, id);
  const { error } = editId.validate(id);
  console.log(error);
  const { error: editSchemaError } = editBookSchema.validate(body);
  return error || editSchemaError;
};

router.get("/", async (req, res) => {
  console.log("Inside route");
  const books = await BookController.fetchAllBooks();
  return res.status(200).send(books);
});

router.post("/addToStore", async (req, res,next) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) throw new Errors.BadRequestError(error.message);
    const books = await BookController.addBooks(req.body);
    return res.status(200).send(books);
  } catch (error) {
    next(error)
  }
});

router.put("/edit/:id", async (req, res,next) => {
  try {
    const error = EditEvent(req.body, req.params.id);
    if (error) throw new Errors.BadRequestError(error.message);
    const { quantity, store_id } = req.body;
    const { id } = req.params;
    const data = { quantity, book_id: id, store_id };
    const book = await BookController.editBook(data);
    return res.status(200).send(book);
  } catch (error) {
    next(error)
  }
});

router.put("/editBooks", async (req, res,next) => {
  try {
    const { error } = multipleBookSchema.validate(req.body);
    if (error) throw new Errors.BadRequestError(error.message);
    const books = await BookController.editBooks(req.body);
    return res.status(200).send(books);
  } catch (error) {
    next(error)
  }
});

router.delete("/delete/:id", async (req, res,next) => {
  try {
    const { error } = editId.validate(req.params.id);
    if (error) throw new Errors.BadRequestError(error.message);
    const { id } = req.params;
    const book = await BookController.deleteBook(id);
    return res.status(200).send(book);
  } catch (error) {
    next(error)
  }
});

router.delete("/deleteBooks", async (req, res,next) => {
  try {
    const { error } = deleteBookSchema.validate(req.body);
    if (error) throw new Errors.BadRequestError(error.message);
    const books = await BookController.deleteBooks(req.body);
    return res.status(200).send(books);
  } catch (error) {
    next(error)
  }
});


router.post("/updateStatus", async (req, res,next) => {
  try {
    await BookController.updateStatus();
    return res.status(200).send("Status updated");
  } catch (error) {
    next(error)
  }
});



export default router;
