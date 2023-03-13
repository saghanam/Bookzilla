import express from "express";
import router from "./src/routes/index.js";
const app = express();

import * as dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";


const port = process.env.PORT;
console.log(process.env.PORT)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", router);


process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      debug('HTTP server closed')
    })
  })

app.listen(port, () => console.log("Listening on port 3000"));
