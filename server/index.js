const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect.js');

dbConnect();

const cors = require('cors');


app.use(cors());
app.use(express.json());



const router = require("./routes/index.js");
app.use("/app", router);

/*
app.listen(PORT, ()=>{
    console.log("Hi, :D listening server on port: ", PORT);
})*/

app.get("/", (req, res) => {
    res.send("API funcionando en Vercel 🚀");
  });

app.get("/hola", (req, res) => {
    res.send("HOLA, probando la ruta");
  });

  module.exports = app;