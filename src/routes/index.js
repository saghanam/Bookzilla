import { Router } from "express";
const router = Router();

import bookRouter from "./books.js"

// import storeRouter from "./store.js"

router.use("/", bookRouter);

// router.use('/store',storeRouter)

export default router;
