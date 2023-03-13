import express from "express";
import router from "./src/routes/index.js";
const app = express();
import error from './src/middleware/error.js'
import cronServices from './src/services/cronService.js';

import * as dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";


const port = process.env.PORT;
import cron from 'node-cron';
console.log(process.env.PORT)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", router);
app.use('*', (req, res) => {
    return res.status(404).send({
      message: `Path ${req.originalUrl} not found`,
      statusCode: 404,
    });
  });
  app.use(error)


process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      debug('HTTP server closed')
    })
  })


  cron.schedule('* * * * *', () => {
    cronServices.notifyBookStatus();
  });

app.listen(port, () => console.log("Listening on port 3000"));
