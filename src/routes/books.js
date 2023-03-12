import { Router } from 'express';
import bookController from '../controllers/books.js'

const router = Router();

console.log("Inside routes");

router.get('/fetchBooks', async (req, res) => {
    console.log("Inside route");
    const books = await bookController.fetchBooks();
    return res.status(200).send(books);
});

  export default router;
