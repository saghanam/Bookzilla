import { Router } from "express";
import StoreController from "../controllers/store.js";
import Joi from "joi";
import * as Errors from "../middleware/errorHandling.js";

const router = Router();

const bookStoreSchema = Joi.object({
  data: Joi.array()
    .items(
      Joi.object().keys({
        store_name: Joi.string().required(),
        location: Joi.string().required(),
      })
    )
    .required(),
});

const id = Joi.number().required();
router.post("/add", async (req, res) => {
  try {
    const { error } = bookStoreSchema.validate(req.body);
    if (error) throw new Errors.BadRequestError(error.message);
    let data = req.body.data;
    const store = await StoreController.createBookstore(data);
    return res.status(200).send(store);
  } catch (err) {
    return res.status(err.statusCode).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { error } = id.validate(req.params.id);
    if (error) throw new Errors.BadRequestError(error.message);
    const books = await StoreController.fetchBooksFromBookstore(req.params.id);
    return res.status(200).send(books);
  } catch (err) {
    console.log(err)
    return res.status(err.statusCode).send(err.message);
  }
});

export default router;
