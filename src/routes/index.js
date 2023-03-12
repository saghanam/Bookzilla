import {Router} from 'express';
const router = Router();

import bookRouter from './books.js';

router.use('/book',bookRouter);

export default Router