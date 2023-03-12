import express from "express";
import router from "./src/routes/index.js";
const app = express();

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
import * as dotenv from 'dotenv'
dotenv.config({path: `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}`})

const port = process.env.PORT;
console.log(port)

// app.get('/',(req,res)=> console.log("Hello world. The app is running"))
app.use(express.json());
app.use(express.urlencoded());
app.use("/", router);

app.listen(port, () => console.log("Listening on port 3000"));
