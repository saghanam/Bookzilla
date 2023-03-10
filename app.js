const express = require("express")
const app = express();
const port = 3000

app.get('/',(req,res)=> console.log("Hello world. The app is running"))

app.listen(port,()=> console.log("Listening on port 3000"))