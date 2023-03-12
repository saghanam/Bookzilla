
import express from 'express';
const app = express();
const port = 3000;


// app.get('/',(req,res)=> console.log("Hello world. The app is running"))
app.use(express.json());
app.use(express.urlencoded());
// app.use('/', router);

import bookController from './src/controllers/books.js';

app.get('/book/fetchAllBooks', async (req, res) => {
    console.log("Inside route");
    const books = await bookController.fetchAllBooks();
    return res.status(200).send(books);
});

app.get('/book/fetchBook', async (req, res) => {
    console.log(req.params)
    const books = await bookController.fetchBooksFromBookstore(req.headers.store_id);
    return res.status(200).send(books);
});

app.post('/addBookstore',async(req,res)=>{
    let data = req.body.data
    console.log(data)
    const store = await bookController.createBookstore(data)
    return res.status(200).send(store)
})

app.post('/book/addBooks',async(req,res)=>{
    const books = await bookController.addBooks(req.body)
    return res.status(200).send(books)
})

app.put('/book/edit/:id',async(req,res)=>{
    const {quantity,store_id} = req.body;
    const {id} = req.params
    const data = {quantity,book_id:id,store_id}
    const book = await bookController.editBook(data)
    return res.status(200).send(book)
})

app.put('/book/editBooks',async(req,res)=>{
    const books = await bookController.editBooks(req.body)
    return res.status(200).send(books)
})

app.delete('/book/delete/:id',async(req,res)=>{
    console.log(req.params.id)
    const {id} = req.params;
    const book = await bookController.deleteBook(id)
    return res.status(200).send(book)
})

app.delete('/book/deleteBooks',async(req,res)=>{
    const books = await bookController.deleteBooks(req.body)
    return res.status(200).send(books)
})







app.listen(port,()=> console.log("Listening on port 3000"))